import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'
import { StyledScrollView as ScrollView} from '../../components/StyledScrollView';
import { useRouter } from 'expo-router';
import rides from '../../data/rideData.json';
import React from 'react'

const Dash = () => {
  const lastRide = rides[0];

  const router = useRouter();

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Start your journey!</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>Create a Ride</Text>
        <Text style={styles.buttonText}>Choose your destination and look for others to share the journey.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/availableRides')}>
        <Text style={styles.buttonTitle}>Join a Ride</Text>
        <Text style={styles.buttonText}>Find others going your way who are also looking to share.</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Last Ride</Text>
      
      <CardButton>
        <View style={styles.rideDetails}>
          <View style={styles.rideRow}>
            <Text style={styles.rideIcon}>📍</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rideText, {fontWeight: 'bold'}]}>{lastRide.destination}</Text>
            </View>
          </View>

          <View style={styles.rideRow}>
            <Text style={styles.rideText}>{lastRide.date.day} • {lastRide.date.time}</Text>
          </View>

          <View style={styles.rideRow}>
            <Text style={styles.rideText}>{lastRide.creator.name} </Text>
            <Text style={styles.handle}>{lastRide.creator.handle}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.rideColumn}>
              <Text style={[styles.rideText, styles.transportText]}>{lastRide.transport}</Text>
            </View>

            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>BDT {lastRide.fare}</Text>
            </View>
          </View>
        </View>
      </CardButton>
    </ScrollView>
  )
}

export default Dash

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold', 
    fontSize: 22, 
    marginTop: 15,
  },
  button: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#1f1f1f'
  },
  buttonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
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
    color: '#888',
  }
});
