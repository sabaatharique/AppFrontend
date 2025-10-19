import { useRouter } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, ScrollView as RNScrollView } from 'react-native'; 
import { StyledFauxSearch as Search } from '../../../components/StyledFauxSearch'; 
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledDateTimePicker } from '../../../components/StyledDateTimePicker';
import { StyledButton as Button } from '../../../components/StyledButton';
import { StyledBorderView as BorderView } from '../../../components/StyledBorderView'; 
import RideCard from '../../../components/ActiveRideCard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import rides from '../../../data/rideData.json';
import { useSearch } from '../../../context/SearchContext';
import React, { useState, useEffect, useRef } from 'react';

function haversineDistance(coords1, coords2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const lat1 = coords1.lat;
  const lon1 = coords1.lng;
  const lat2 = coords2.lat;
  const lon2 = coords2.lng;
  const R = 6371; // km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
  const [displayedRides, setDisplayedRides] = useState(rides);

  const filterRides = (ridesList) => {
    const searchRadius = 5; // km
    const startCoords = searchData.start?.coords;
    const destCoords = searchData.destination?.coords;

    let filtered = ridesList;

    // Location-based filtering
    if (startCoords || destCoords) {
      filtered = filtered.filter((ride) => {
        const startDistance = startCoords
          ? haversineDistance(startCoords, ride.start.coords)
          : Infinity;
        const destDistance = destCoords
          ? haversineDistance(destCoords, ride.destination.coords)
          : Infinity;

        if (startCoords && destCoords)
          return startDistance <= searchRadius && destDistance <= searchRadius;
        else if (startCoords) return startDistance <= searchRadius;
        else if (destCoords) return destDistance <= searchRadius;
        else return true;
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

  // Auto reapply filters when data or filters change 
  useEffect(() => {
    const filtered = filterRides(rides);
    setDisplayedRides(filtered);

    // Scroll to "Available Rides" section when filters change
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollToEnd({ animated: true });
      }, 150);
    }
  }, [selectedTransport, selectedGender, searchData]);

  const onDateChange = (selectedDate) => {
    setDate(selectedDate || date);
  };

  const handleSearch = () => {
    setDisplayedRides(filterRides(rides));
    setShowSearch(true);
  };

  const clearFilters = () => {
    setSelectedTransport(null);
    setSelectedGender(null);
    setDisplayedRides(rides);
  };

  return (
    <ScrollView innerRef={scrollRef}>
      <Title>Search for a ride</Title>

      {showSearch && <Search title="Where to today?" onPress={() => setShowSearch(false)} />}

      {!showSearch && (
        <View style={styles.dropdownContainer}>
          <Search
            title={searchData.start.name || 'Starting point'}
            onPress={() => router.push('/searchStart')}
          />
          <Search
            title={searchData.destination.name || 'Destination'}
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

      {/* Filter toggle */}
      <TouchableOpacity
        style={styles.filterToggle}
        onPress={() => setShowFilters(!showFilters)}>
        <FontAwesome6 name="sliders" size={14} color="white" />
        <Text style={styles.filterToggleText}>Filters</Text>
      </TouchableOpacity>

      {/* Filters section */}
      {showFilters && (
        <BorderView style={{ width: '100%' }}>
          {/* Transport filters */}
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
                      size={22}
                      color={selectedTransport === type ? 'white' : '#444'}
                    />
                  ) : (
                    <FontAwesome
                      name={type === 'Car' ? 'car' : 'bus'}
                      size={14}
                      color={selectedTransport === type ? 'white' : '#444'}
                    />
                  )}
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedTransport === type && { color: 'white' },
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Gender filters */}
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
                    name={g === 'Male' ? 'person' : g === 'Female' ? 'person-dress' : 'users'}
                    size={14}
                    color={selectedGender === g ? 'white' : '#444'}
                  />
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedGender === g && { color: 'white' },
                    ]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={{ color: '#fff' }}>Clear</Text>
            <MaterialCommunityIcons name="close" size={14} color="#fff" />
          </TouchableOpacity>
        </BorderView>
      )}

      <Title>Available Rides</Title>

      {displayedRides.length > 0 ? (
        displayedRides.map((ride, index) => (
          <RideCard
            key={index}
            ride={ride}
            onPress={() => router.push(`/ride/${ride.id}`)}
            showRequestButton={true}
            onPressRequest={() => router.push('joinRequested')}
          />
        ))
      ) : (
        <Text style={{marginVertical: 10}}>No rides found matching your criteria.</Text>
      )}
    </ScrollView>
  );
};

export default AvailableRides;

const styles = StyleSheet.create({
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#222',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 6,
  },
  filterToggleText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 13,
  },
  filterGroup: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
    fontWeight: '500',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: 'white',
  },
  filterChipActive: {
    backgroundColor: '#1f1f1f',
    borderColor: '#1f1f1f',
  },
  filterChipText: {
    marginLeft: 6,
    color: '#333',
    fontSize: 13,
  },
  clearButton: { 
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end', 
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#888', 
    width: '30%', 
  },
})