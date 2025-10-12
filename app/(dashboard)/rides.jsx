import { View, StyleSheet } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'
import { StyledScrollView as ScrollView} from '../../components/StyledScrollView'
import { StyledTitle as Title } from '../../components/StyledTitle' 
import rides from '../../data/rideData.json'
import React from 'react'
import { Link } from 'expo-router';

const UserRides = () => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Title>Your Previous Rides</Title>
      
      {rides.map((ride, index) => (
        <Link href={`ride/${ride.id}`} asChild key={index}>
          <CardButton>
           {/* destination location */}
           <View style={styles.rideRow}>
              <Text style={[styles.rideText, {fontWeight: 'semibold'}]}>{ride.destination}</Text>
            </View>

            {/* time & date */}
            <View style={styles.rideRow}>
              <Text style={styles.rideText}>{ride.date.day} {ride.date.time}</Text>
            </View>

          <View style={styles.creatorRow}>
            <Text style={{fontSize: 30}}>👤 </Text>
            <View>
              <Text style={styles.rideText}>{ride.creator.name}</Text>
              <Text style={styles.handle}>{ride.creator.handle}</Text>
            </View>
          </View>

          <View style={styles.rideRow}>
            <View style={styles.rideColumn}>
              <Text style={[styles.rideText, styles.transportText]}>{ride.transport}</Text>
            </View>

            <View style={styles.rideColumn}>
              <Text>BDT {ride.fare}</Text>
            </View>
          </View>
        </CardButton>
        </Link>
      ))}
    </ScrollView>
  )
}

export default UserRides

const styles = StyleSheet.create({
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  rideColumn: {
    alignItems: 'flex-start',
    marginTop: 5,
    width: '50%'
  },
  transportText: {
    backgroundColor: '#ababab',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  handle: {
    color: '#888',
    flex: 1
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  }
});
