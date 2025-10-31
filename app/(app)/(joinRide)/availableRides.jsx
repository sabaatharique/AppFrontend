import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { StyledFauxSearch as Search } from '../../../components/StyledFauxSearch';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledDateTimePicker } from '../../../components/StyledDateTimePicker';
import { StyledButton as Button } from '../../../components/StyledButton';
import { StyledBorderView as BorderView } from '../../../components/StyledBorderView';
import RideCard from '../../../components/RideDisplayCard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import rides from '../../../data/rideData.json';
import { useSearch } from '../../../context/SearchContext';
import { useRouter } from 'expo-router';
import * as polyline from '@mapbox/polyline';

const toRad = (x) => (x * Math.PI) / 180;

function normLatLng(p) {
  if (!p) return null;
  return {
    latitude: p.latitude ?? p.lat,
    longitude: p.longitude ?? p.lng,
  };
}

function haversineKm(aIn, bIn) {
  const a = normLatLng(aIn);
  const b = normLatLng(bIn);
  if (!a || !b) return Infinity;

  const R = 6371;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function xyAt(refLat, pIn) {
  const p = normLatLng(pIn);
  const x = toRad(p.longitude) * Math.cos(toRad(refLat));
  const y = toRad(p.latitude);
  return { x, y };
}

// Project point P onto segment V->W 
function projectPointToSegment(pIn, vIn, wIn) {
  const p = normLatLng(pIn);
  const v = normLatLng(vIn);
  const w = normLatLng(wIn);
  if (!p || !v || !w) {
    return { distKm: Infinity, t: 0, proj: null, segLenKm: 0 };
  }

  const refLat = (v.latitude + w.latitude) / 2;
  const P = xyAt(refLat, p);
  const V = xyAt(refLat, v);
  const W = xyAt(refLat, w);

  const vx = W.x - V.x;
  const vy = W.y - V.y;
  const len2 = vx * vx + vy * vy;

  let t = 0;
  if (len2 > 0) {
    t = ((P.x - V.x) * vx + (P.y - V.y) * vy) / len2;
    t = Math.max(0, Math.min(1, t));
  }

  const proj = {
    latitude: v.latitude + t * (w.latitude - v.latitude),
    longitude: v.longitude + t * (w.longitude - v.longitude),
  };

  const distKm = haversineKm(p, proj);
  const segLenKm = haversineKm(v, w);

  return { distKm, t, proj, segLenKm };
}

// Location near polyline + cumulative position (km) along route 
function projectPointToRoute(locationIn, routePolyline, thresholdKm) {
  const location = normLatLng(locationIn);
  if (!location || !routePolyline) {
    return { onRoute: false, posKm: -1, minDistKm: Infinity };
  }

  const routeCoords = polyline
    .decode(routePolyline)
    .map(([lat, lng]) => ({ latitude: lat, longitude: lng }));

  if (routeCoords.length < 2) {
    return { onRoute: false, posKm: -1, minDistKm: Infinity };
  }

  let bestMinDist = Infinity;
  let bestPosKm = 0;
  let cumulative = 0;

  for (let i = 0; i < routeCoords.length - 1; i++) {
    const v = routeCoords[i];
    const w = routeCoords[i + 1];
    const { distKm, t, segLenKm } = projectPointToSegment(location, v, w);
    if (distKm < bestMinDist) {
      bestMinDist = distKm;
      bestPosKm = cumulative + t * segLenKm;
    }
    cumulative += segLenKm;
  }

  return {
    onRoute: bestMinDist <= thresholdKm,
    posKm: bestPosKm,
    minDistKm: bestMinDist,
  };
}


const AvailableRides = () => {
  const router = useRouter();
  const { searchData } = useSearch();
  const scrollRef = useRef(null);

  const [showSearch, setShowSearch] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [date, setDate] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [leaveNow, setLeaveNow] = useState(true);
  const [displayedRides, setDisplayedRides] = useState(rides);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filterRides = async (ridesList) => {
    const RADIUS_THRESHOLD_KM = 5; // near endpoints
    const ROUTE_THRESHOLD_KM = 2;  // near the route
    const ORDER_EPS_KM = 0.05;     // tolerance
    const { start, destination } = searchData;
    const startCoords = start?.coords;
    const destCoords = destination?.coords;
    let filtered = ridesList;
    if (startCoords && destCoords) {
      filtered = ridesList.filter((ride) => {
        const ridePolyline = ride.routePolyline;

        // 1) projections to route
        const startProj = projectPointToRoute(
          { latitude: startCoords.latitude ?? startCoords.lat, longitude: startCoords.longitude ?? startCoords.lng },
          ridePolyline,
          ROUTE_THRESHOLD_KM
        );
        const destProj = projectPointToRoute(
          { latitude: destCoords.latitude ?? destCoords.lat, longitude: destCoords.longitude ?? destCoords.lng },
          ridePolyline,
          ROUTE_THRESHOLD_KM
        );

        // 2) endpoint fallbacks
        const startNearStart = haversineKm(ride.start.coords, startCoords) <= RADIUS_THRESHOLD_KM;
        const destNearEnd   = haversineKm(ride.destination.coords, destCoords) <= RADIUS_THRESHOLD_KM;

        const startOK = startProj.onRoute || startNearStart;
        const destOK  = destProj.onRoute  || destNearEnd;

        // 3) ordering only when both points are on the route
        let orderOK = true;
        if (startProj.onRoute && destProj.onRoute) {
          orderOK = startProj.posKm <= destProj.posKm + ORDER_EPS_KM;
        }

        return startOK && destOK && orderOK;
      });
    } else if (startCoords || destCoords) {
      filtered = ridesList.filter((ride) => {
        const sMatch = startCoords
          ? haversineKm(ride.start.coords, startCoords) <= RADIUS_THRESHOLD_KM
          : true;
        const dMatch = destCoords
          ? haversineKm(ride.destination.coords, destCoords) <= RADIUS_THRESHOLD_KM
          : true;
        return sMatch && dMatch;
      });
    }

    // Transport and gender filters
    filtered = filtered.filter((ride) => {
      if (selectedTransport && ride.transport !== selectedTransport) return false;
      if (selectedGender  && ride.gender !== selectedGender)
        return false;
      return true;
    });

    return filtered;
  };

  useEffect(() => {
    (async () => {
      const filtered = await filterRides(rides);
      setDisplayedRides(filtered);

      if (scrollRef.current) {
        setTimeout(() => scrollRef.current.scrollToEnd({ animated: true }), 150);
      }
    })();
  }, [selectedTransport, selectedGender, searchData]);

  const onDateChange = (selectedDate) => {
    setDate(selectedDate || date);
    setShowDatePicker(false);
  };

  const toggleLeaveNow = () => {
    const newLeaveNow = !leaveNow;
    setLeaveNow(newLeaveNow);
    // Open date picker when switching to scheduled mode
    if (!newLeaveNow) {
      setShowDatePicker(true);
    } else {
      // Clear date when switching back to "leave now"
      setDate(null);
    }
  }

  const handleDatePickerCancel = () => {
    setShowDatePicker(false);
    // If user cancels and no date was set, switch back to "leave now"
    if (!date) {
      setLeaveNow(true);
    }
  }

  const clearFilters = () => {
    setSelectedTransport(null);
    setSelectedGender(null);
    setDisplayedRides(rides);
  };

  return (
    <ScrollView innerRef={scrollRef}>
      <Title>Search for a ride</Title>

      <Search title="Where to today?" onPress={() => router.push('/searchRoute')} />

      {/*
      {!showSearch && (
        <View style={styles.dropdownContainer}>
          <Search
            title={searchData.start?.name || 'Starting point'}
            onPress={() => router.push('/searchStart')}
          />
          <Search
            title={searchData.destination?.name || 'Destination'}
            onPress={() => router.push('/searchDest')}
          />
          <StyledDateTimePicker
            style={{ width: '100%' }}
            text="Date & time"
            value={date}
            mode="datetime"
            onChange={onDateChange}
          />
          <Button title="Ready to go" onPress={handleSearch} style={{ width: '100%' }} />
        </View>
      )}
      */}

      <View style={styles.controlsContainer}>
        <View style={styles.scheduleContainer}>
          <TouchableOpacity
            style={[styles.scheduleOption, leaveNow && styles.scheduleOptionActive]}
            onPress={() => {
              if (!leaveNow) toggleLeaveNow();
            }}>
            <Text style={[styles.scheduleOptionText, leaveNow && styles.scheduleOptionTextActive]}>
              Leave now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.scheduleOption, !leaveNow && styles.scheduleOptionActive]}
            onPress={() => {
              if (leaveNow) toggleLeaveNow();
            }}>
            <Text style={[styles.scheduleOptionText, !leaveNow && styles.scheduleOptionTextActive]}>
              Schedule
            </Text>
          </TouchableOpacity>
        </View>

        {!leaveNow && date && (
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}>
            <FontAwesome name="calendar" size={14} color="#e63e4c" />
            <Text style={styles.dateButtonText}>
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </Text>
            <FontAwesome name="chevron-right" size={12} color="#e63e4c" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.filterToggle, showFilters && styles.filterToggleActive]}
          onPress={() => setShowFilters(!showFilters)}>
          <FontAwesome6 name="sliders" size={14} color={showFilters ? "white" : "#333"} />
          <Text style={[styles.filterToggleText, showFilters && styles.filterToggleTextActive]}>
            Filters
          </Text>
          {(selectedTransport || selectedGender) && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {(selectedTransport ? 1 : 0) + (selectedGender ? 1 : 0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        date={date || new Date()}
        onConfirm={onDateChange}
        onCancel={handleDatePickerCancel}
      />

      {showFilters && (
        <BorderView style={styles.filtersContainer}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterHeaderText}>Filter by:</Text>
            {(selectedTransport || selectedGender) && (
              <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                <Text style={styles.clearButtonText}>Clear all</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Transport</Text>
            <View style={styles.filterOptions}>
              {['Car', 'CNG', 'Bus'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterChip,
                    selectedTransport === type && styles.filterChipActive,
                  ]}
                  onPress={() =>
                    setSelectedTransport(selectedTransport === type ? null : type)
                  }>
                  {type === 'CNG' ? (
                    <MaterialCommunityIcons
                      name="rickshaw"
                      size={18}
                      color={selectedTransport === type ? 'white' : '#666'}
                    />
                  ) : (
                    <FontAwesome
                      name={type === 'Car' ? 'car' : 'bus'}
                      size={14}
                      color={selectedTransport === type ? 'white' : '#666'}
                    />
                  )}
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedTransport === type && styles.filterChipTextActive,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Gender</Text>
            <View style={styles.filterOptions}>
              {['Any', 'Male', 'Female'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.filterChip,
                    selectedGender === g && styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedGender(selectedGender === g ? null : g)}>
                  <FontAwesome6
                    name={
                      g === 'Male' ? 'person' : g === 'Female' ? 'person-dress' : 'users'
                    }
                    size={14}
                    color={selectedGender === g ? 'white' : '#666'}
                  />
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedGender === g && styles.filterChipTextActive,
                    ]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </BorderView>
      )}

      <Title style={{marginTop: 10}}>Available rides</Title>

      {displayedRides.length > 0 ? (
        displayedRides.map((ride, index) => (
          <RideCard
            key={index}
            ride={ride}
            join={true}
            onPress={() => router.push(`/ride/${ride.id}`)}
          />
        ))
      ) : (
        <>
          <Text style={{ marginVertical: 10 }}>No rides found matching your criteria.</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/chooseRoute')}>
            <Text style={styles.buttonTitle}>Create a ride</Text>
            <FontAwesome name="chevron-right" size={14} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default AvailableRides;


const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#1f1f1f',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    width: '95%',
  },
  dropdownContainer: {
    borderColor: '#2a2a2a',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 15,
    alignContent: 'flex-start',
    width: '100%',
  },
  controlsContainer: {
    width: '100%',
    marginBottom: 10,
  },
  scheduleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderRadius: 14,
    marginBottom: 10,
  },
  scheduleOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleOptionActive: {
    backgroundColor: '#e63e4c',
  },
  scheduleOptionText: {
    fontSize: 14,
    color: '#000',
  },
  scheduleOptionTextActive: {
    color: '#fff',
    fontWeight: 'semibold',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e63e4c',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  dateButtonText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    position: 'relative',
  },
  filterToggleActive: {
    backgroundColor: '#1f1f1f',
    borderColor: '#1f1f1f',
  },
  filterToggleText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#000',
  },
  filterToggleTextActive: {
    color: 'white',
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#e63e4c',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  filtersContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterHeaderText: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#000',
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  filterChipActive: {
    backgroundColor: '#1f1f1f',
    borderColor: '#1f1f1f',
  },
  filterChipText: {
    marginLeft: 6,
    color: '#000',
    fontSize: 13,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: 'white',
  },
  clearButton: { 
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e63e4c',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
})