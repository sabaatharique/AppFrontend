import { useRouter } from 'expo-router';
import { View, StyleSheet, TouchableOpacity } from 'react-native'; 
import { StyledFauxSearch as Search } from '../../components/StyledFauxSearch'; 
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView';
import { StyledTitle as Title } from '../../components/StyledTitle';
import { StyledText as Text } from '../../components/StyledText';
import { StyledDateTimePicker } from '../../components/StyledDateTimePicker';
import { StyledButton as Button } from '../../components/StyledButton';
import RideCard from '../../components/ActiveRideCard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import rides from '../../data/rideData.json';
import { useSearch } from '../../context/SearchContext';
import React, { useState } from 'react';

function haversineDistance(coords1, coords2) {
  const toRad = (x) => (x * Math.PI) / 180;

  const lat1 = coords1.lat;
  const lon1 = coords1.lng;
  const lat2 = coords2.lat;
  const lon2 = coords2.lng;

  const R = 6371; // km

  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
}

const AvailableRides = () => {
  const router = useRouter();
  
  const {searchData} = useSearch();
  const [showSearch, setShowSearch] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [date, setDate] = useState(null);
  const [displayedRides, setDisplayedRides] = useState(rides);

  const onDateChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const day = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    const time = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    setRideData({ ...rideData, date: { day, time } });
  };

  return (
    <ScrollView>
        <Title>Search for a ride</Title>

        {/* search field */}
        {showSearch && (
        <Search
          title="Where to today?"
          onPress={() => {
            setShowSearch(false);
            setShowAdvancedSearch(true);
          }}
        />
      )}

      {showFilters && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => console.log("Transport filter")}
            style={{ width: '15%' }}>
            <FontAwesome name="car" color='black' size={18} />    
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Gender filter")}
            style={{ width: '15%' }}>
            <FontAwesome6 name="person" size={15} color="black" />   
          </TouchableOpacity>

          <Button
            style={{ width: '30%' }}
            title='Clear'
            onPress={() =>{
              setShowFilters(false);
              setShowSearch(true);
            }}>
          </Button>   
      </View>
      )}
      
      {/* dropdown search fields */}
      {showAdvancedSearch && (
        <View style={styles.dropdownContainer}>
          <Search
            title={searchData.start.name ? searchData.start.name : "Starting point"}
            onPress={() => {
              router.push('/searchStart')
            }}
          />
          
          <Search
            title={searchData.destination.name ? searchData.destination.name : "Destination"}
            onPress={() => {
              router.push('/searchDest')
            }}
          />

          <StyledDateTimePicker
            style={{width: '100%'}}
            text = 'Date & time'
            value={date}
            mode="datetime"
            onChange={onDateChange}
          />
      
          <Button
            title="Ready to go"
            onPress={() => {
              const searchRadius = 5; // 5km radius

              const filteredRides = rides.filter((ride) => {
                const startCoords = searchData.start?.coords;
                const destCoords = searchData.destination?.coords;

                const startDistance = startCoords ? haversineDistance(startCoords, ride.start.coords) : Infinity;
                const destDistance = destCoords ? haversineDistance(destCoords, ride.destination.coords) : Infinity;

                if (startCoords && destCoords) {
                  return startDistance <= searchRadius && destDistance <= searchRadius;
                } else if (startCoords) {
                  return startDistance <= searchRadius;
                } else if (destCoords) {
                  return destDistance <= searchRadius;
                } else {
                  return true;
                }
              });

              setShowFilters(true);
              setShowAdvancedSearch(false);
              setDisplayedRides(filteredRides);
            }}
            style={{width: '100%'}}
          />
        </View>
      )}

      <Title>Available Rides</Title>

      {displayedRides.length > 0 ? (
        displayedRides.map((ride, index) => (
          <RideCard 
            key={index}
            ride={ride}
            onPress={() => router.push(`/ride/${ride.id}`)}
            showRequestButton={true}
            onPressRequest={() => console.log("Request Sent")}
          />
        ))
      ) : (
        <Text>No rides found matching your criteria.</Text>
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
    marginVertical: 8,
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
})