import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { StyledText as Text } from '../../components/StyledText';
import { StyledCardButton as CardButton } from '../../components/StyledCardButton';
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView';
import { StyledTitle as Title } from '../../components/StyledTitle';
import { StyledSearchBar as TextInput } from '../../components/StyledSearchBar';
import { StyledButton as Button } from '../../components/StyledButton';
import { StyledBorderText as BorderText} from '../../components/StyledBorderText';
import { StyledDateTimePicker } from '../../components/StyledDateTimePicker';
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { Link } from 'expo-router';
import rides from '../../data/rideData.json';
import React, { useState, useEffect } from 'react';

const AvailableRides = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedRides, setDisplayedRides] = useState(rides);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Title>Search for a Ride</Title>

      {/* initial search field */}
      {!showAdvancedSearch && (
        <TextInput
          placeholder="Where to today?"
          value={search}
          onFocus={() => {
            setShowAdvancedSearch(true);
            setDestination(search);
          }}
          onChangeText={setSearch}
        />
      )}

      {/* dropdown search fields */}
      {showAdvancedSearch && (
        <View style={styles.dropdownContainer}>
          <TextInput
            placeholder="Starting point"
            value={start}
            onChangeText={setStart}
          />
          <TextInput
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
          />

          <StyledDateTimePicker
            value={selectedDate}
            mode="datetime"
            onChange={(date) => setSelectedDate(date)}
          />

          <Button
            title="Ready to Go"
            onPress={() => {
              setShowAdvancedSearch(false);

              // filter rides based on input
              const filteredRides = rides.filter((ride) => {
                const destinationMatch = ride.destination.toLowerCase().includes(destination.toLowerCase());
                const startMatch = ride.start?.toLowerCase().includes(start.toLowerCase());

                if (showAdvancedSearch) return (destinationMatch || startMatch);
                return ride.destination.toLowerCase().includes(search.toLowerCase());
              });

              setDisplayedRides(filteredRides);
            }}
            style={{ alignSelf: 'flex-end' }}
          />

        </View>
      )}

      <Title>Available Rides</Title>

      {displayedRides.map((ride, index) => (
        <Link href={`ride/${ride.id}`} asChild key={index}>
          <CardButton>
            {/* ride creator */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 30}}>👤 </Text>
              <View>
                <Text style={{fontWeight: 'semibold', fontSize: 16}}>{ride.creator.name}</Text>
                <Text style={styles.handle}>{ride.creator.handle}</Text>
              </View>
            </View>


            {/* start location */}
            <View style={styles.rideRow}>
              <Octicons name="dot-fill" size={18} color="#e63e4c" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <BorderText style={[styles.rideText, {marginVertical: 0}]}>{ride.start}</BorderText>
              </View>
            </View>

            {/* destination location */}
            <View style={styles.rideRow}>
              <Entypo name="location-pin" size={18} color="#e63e4c" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <BorderText style={[styles.rideText, {marginVertical: 0}]}>{ride.destination}</BorderText>
              </View>
            </View>

            {/* time & date */}
            <View style={styles.rideRow}>
              <FontAwesome name="clock-o" size={14} color="#888" style={[styles.icon, {marginLeft: 4}]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rideText}>{ride.date.day} {ride.date.time}</Text>
              </View>
            </View>

            {/* transport & fare */}
            <View style={styles.transportContainer}>
              <View style={{width: '33%', flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 12}}>Transport</Text>
                  <Text style={[styles.rideText, {fontWeight: 'semibold'}]}>{ride.transport}</Text>
                
              </View>

              <View style={{width: '33%', alignItems: 'center'}}>
                <Text style={{fontSize: 12}}>Seats</Text>
                <Text style={[styles.rideText, {fontWeight: 'semibold'}]}> {ride.totalPassengers - ride.partners.length}</Text>  
              </View>

              <View style={{width: '33%', alignItems: 'center'}}>
                <Text style={{fontSize: 12}}>Your fare</Text>
                <Text style={[styles.rideText, {fontWeight: 'semibold'}]}>BDT {ride.fare}</Text>
              </View>
            </View>

            <Button style={{marginTop: 10}} title="Request to Join"></Button>
          </CardButton>
        </Link>
      ))}
    </ScrollView>
  );
};

export default AvailableRides;

const styles = StyleSheet.create({
  dropdownContainer: {
    borderColor: '#2a2a2a',
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    marginVertical: 8,
    alignContent: 'flex-start',
    width: '100%',
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flex: 1,
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  rideColumn: {
    alignItems: 'flex-start',
    width: '50%',
  },
  transportContainer: {
    borderRadius: 14,    
    backgroundColor: '#eee',
    flexDirection: 'row',
    marginVertical: 6,
    padding: 8,
    alignItems: 'flex-end'
  },
  handle: {
    color: '#888',
    flex: 1,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10
  }
});
