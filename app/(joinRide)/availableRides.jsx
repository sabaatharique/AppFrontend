import { View, StyleSheet } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'
import { StyledScrollView as ScrollView} from '../../components/StyledScrollView';
import { StyledSearchBar as TextInput } from '../../components/StyledSearchBar'
import rides from '../../data/rideData.json';
import React, { useState } from 'react'

const availableRides = () => {
  const [search, setSearch] = useState('');

  const filteredRides = rides.filter(ride =>
    ride.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Search Destination</Text>

      <TextInput
        placeholder="Enter destination..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.title}>Available Rides</Text>
      
      {filteredRides.map((ride, index) => (
        <CardButton key={index}>
          
          <View style={{flexDirection: 'row'}}>
            <View style={styles.locationColumn}>
              <View style={styles.rideRow}>
                <Text style={styles.rideIcon}>📍</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rideText}>{ride.destination}</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.rideColumn}>
                  <Text style={[styles.rideText, styles.transportText]}>{ride.transport}</Text>
                </View>

                <View style={styles.rideColumn}>
                  <Text style={styles.rideText}>BDT {ride.fare}</Text>
                </View>
              </View>
            </View>

            <View style={styles.creatorColumn}>
              <Text style={{fontSize: 18}}>👤</Text>
              <Text style={styles.creatorName}>{ride.creator.name}</Text>
              <Text style={styles.handle}>{ride.creator.handle}</Text>
            </View>
          </View>
          
        </CardButton>
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
  locationColumn: {
    alignItems: 'flex-start',
    marginRight: 5,
    width: '65%',
  },
  creatorColumn: {
    alignItems: 'flex-start',
    marginLeft: 5,
    width: '30%',
  },
  rideColumn: {
    alignItems: 'flex-start',
    width: '55%',
  },
  transportText: {
    backgroundColor: '#2b2b2b',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12
  },
  handle: {
    color: '#888'
  }
});
