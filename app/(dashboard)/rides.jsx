import { View, StyleSheet, } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'
import { StyledScrollView as ScrollView} from '../../components/StyledScrollView';
import rides from '../../data/rideData.json';
import React from 'react'

const UserRides = () => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Your Previous Rides</Text>
      
      {rides.map((ride, index) => (
        <CardButton key={index}>
          <View style={styles.rideDetails}>
            <View style={styles.rideRow}>
              <Text style={styles.rideIcon}>📍</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rideText, {fontWeight: 'bold'}]}>{ride.destination}</Text>
              </View>
            </View>

            <View style={styles.rideRow}>
              <Text style={styles.rideText}>{ride.date.day} • {ride.date.time}</Text>
            </View>

            <View style={styles.rideRow}>
              <Text style={styles.rideText}>{ride.creator.name} </Text>
              <Text style={styles.handle}>{ride.creator.handle}</Text>
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
        </CardButton>
      ))}
    </ScrollView>
  )
}

export default UserRides

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
    flexShrink: 1,
  },
  rideColumn: {
    alignItems: 'flex-start',
    width: '50%',
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
