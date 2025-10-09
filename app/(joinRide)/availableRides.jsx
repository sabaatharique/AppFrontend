import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { StyledText as Text } from '../../components/StyledText';
import { StyledCardButton as CardButton } from '../../components/StyledCardButton';
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView';
import { StyledTitle as Title } from '../../components/StyledTitle';
import { StyledSearchBar as TextInput } from '../../components/StyledSearchBar';
import { StyledButton as Button } from '../../components/StyledButton';
import { StyledDateTimePicker } from '../../components/StyledDateTimePicker';
import { Link } from 'expo-router';
import rides from '../../data/rideData.json';
import React, { useState } from 'react';

const AvailableRides = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [search, setSearch] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());

  const clearSearch = () => {
    setStart('');
    setDestination('');
    setSelectedDate(new Date());
    setSearch('');
  };

  const filteredRides = rides.filter((ride) => {
    const destinationMatch = ride.destination.toLowerCase().includes(destination.toLowerCase());
    const startMatch = ride.start?.toLowerCase().includes(start.toLowerCase());
    //const rideDate = new Date(ride.date);
    //const dateMatch = rideDate.getFullYear() === selectedDate.getFullYear() && rideDate.getMonth() === selectedDate.getMonth() && rideDate.getDate() === selectedDate.getDate();

    if (showAdvancedSearch) return (destinationMatch || startMatch);
    return ride.destination.toLowerCase().includes(search.toLowerCase());
  });

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
            title="Apply"
            onPress={() => {
              setShowAdvancedSearch(false);
              //clearSearch();
            }}
          />
        </View>
      )}

      <Title>Available Rides</Title>

      {filteredRides.map((ride, index) => (
        <Link href={`ride/${ride.id}`} asChild key={index}>
          <CardButton>
            <View style={styles.creatorRow}>
              <Text style={[styles.rideText, { fontSize: 16 }]}>{ride.destination}</Text>
            </View>

            <View style={styles.rideRow}>
              <Text style={styles.rideText}>
                {ride.date.day} • {ride.date.time}
              </Text>
            </View>

            <View style={styles.creatorRow}>
              <Text style={{ fontSize: 30 }}>👤 </Text>
              <View>
                <Text style={styles.creatorName}>{ride.creator.name}</Text>
                <Text style={styles.handle}>{ride.creator.handle}</Text>
              </View>
            </View>

            <View style={styles.rideRow}>
              <View style={styles.rideColumn}>
                <Text style={[styles.rideText, styles.transportText]}>{ride.transport}</Text>
              </View>

              <View style={styles.rideColumn}>
                <Text style={styles.rideText}>BDT {ride.fare}</Text>
              </View>
            </View>
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
    marginVertical: 5,
    flex: 1,
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  rideColumn: {
    alignItems: 'flex-start',
    marginVertical: 5,
    width: '50%',
  },
  transportText: {
    backgroundColor: '#888',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    flex: 1,
  },
  handle: {
    color: '#888',
    flex: 1,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
