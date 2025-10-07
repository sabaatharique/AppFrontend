import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import React, { useState } from 'react'

const availableRides = () => {
  const [search, setSearch] = useState('');

  const activeRides = [
    { 
      location: 'House #18, Road 6, Sector 5, Uttara',
      creator: { name: 'Saba Atharique', handle: '@saba130' },
      partners: [
        { name: 'Ridita Alam', handle: '@ridita110' },
      ],
      fare: '173.33 BDT',
      transport: 'Private Car',
    },
    {
      location: 'Capawcino, 27 Dhanmondi',
      creator: { name: 'Ridita Alam', handle: '@ridita110' },
      partners: [
        { name: 'Rahatut Tahrim Mounota', handle: '@mounota122' },
        { name: 'Saba Atharique', handle: '@saba130' },
      ],
      fare: '80.25 BDT',
      transport: 'Uber',
    },
    {
      location: 'Tokyo Kitchen, House 56/B, Banani',
      creator: { name: 'Rahatut Tahrim Mounota', handle: '@mounota122' },
      partners: [
        { name: 'Ridita Alam', handle: '@ridita110' },
        { name: 'Saba Atharique', handle: '@saba130' },
      ],
      fare: '100.50 BDT',
      transport: 'Pathao Car',
    },
    {
      location: 'North South University, Block C, Bashundhara R/A',
      creator: { name: 'Tahmid Zubayer', handle: '@tzubayer20' },
      partners: [],
      fare: '20.00 BDT',
      transport: 'Local Bus',
    }
  ];

  const filteredRides = activeRides.filter(ride =>
    ride.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Search Destination</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Enter destination..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.title}>Available Rides</Text>
      
      {filteredRides.map((ride, index) => (
        <TouchableOpacity key={index} style={styles.rideCard}>
          <View style={styles.rideDetails}>
            <View style={styles.rideRow}>
              <Text style={styles.rideIcon}>📍</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.rideText}>{ride.location}</Text>
              </View>
            </View>

            <View style={styles.rideRow}>
              <Text style={styles.rideLabel}>Your fare:</Text>
              <Text style={styles.rideText}>{ride.fare}</Text>
            </View>

            <View style={styles.rideRow}>
              <Text style={styles.rideLabel}>Transport:</Text>
              <Text style={styles.rideText}>{ride.transport}</Text>
            </View>
          </View>

          <View style={styles.creatorColumn}>
            <Text style={styles.creatorName}>{ride.creator.name}</Text>
            <Text style={styles.handle}>{ride.creator.handle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default availableRides;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold', 
    fontSize: 22, 
    marginTop: 15,
  },
  scrollView: {
    padding: 25,
    paddingTop: 10,
    marginBottom: 60,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingBottom: 30,
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular'
  },
  rideCard: { 
    backgroundColor: '#fff', 
    borderRadius: 16,
    borderWidth: 1,     
    borderColor: '#000000',
    padding: 14, 
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rideDetails: {
    flex: 1,
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  rideIcon: {
    marginRight: 10,
  },
  rideLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  creatorColumn: {
    alignItems: 'flex-start',
    marginLeft: 15,
    width: '30%',
  },
  creatorName: {
    fontSize: 14,
    textAlign: 'left',
  },
  handle: {
    fontSize: 14,
    color: '#888',
  }
});
