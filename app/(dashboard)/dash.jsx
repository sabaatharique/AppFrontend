import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import { useRouter } from 'expo-router';
import React from 'react'

const Dash = () => {
  const lastRide = { 
      location: 'House #18, Road 6, Sector 5, Uttara',
      partners: [
        { name: 'Saba Atharique', handle: '@saba130' },
        { name: 'Ridita Alam', handle: '@ridita110' },
      ],
      fare: '173.33 BDT',
      transport: 'Uber',
    };

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
      
      <View style={styles.rideCard}>
        <View style={styles.rideRow}>
          <Text style={styles.rideIcon}>📍</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.rideText}>{lastRide.location}</Text>
          </View>
        </View>

        <View style={styles.rideRow}>
          <Text style={styles.rideLabel}>Ride partners:</Text>
          <View style={{ flex: 1 }}>
            {lastRide.partners.map((partner, i) => (
              <View key={i} style={styles.partnerRow}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={styles.partnerName}>{partner.name} </Text>
                  <Text style={styles.handle}>{partner.handle}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.rideRow}>
          <Text style={styles.rideLabel}>Your fare:</Text>
          <Text style={styles.rideText}>{lastRide.fare}</Text>
        </View>

        <View style={styles.rideRow}>
          <Text style={styles.rideLabel}>Transport:</Text>
          <Text style={styles.rideText}>{lastRide.transport}</Text>
        </View>
      </View>
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
  scrollView: {
    padding: 25,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'flex-start',
    paddingBottom: 30,
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
  rideCard: { 
    backgroundColor: '#fff', 
    borderRadius: 16,
    borderWidth: 1,     
    borderColor: '#000000',
    padding: 14, 
    marginTop: 10,
    width: '100%',
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
  partnerRow: {
    marginBottom: 5,
  },
  partnerName: {
    fontSize: 14,
  },
  handle: {
    fontSize: 14,
    color: '#888',
  }
});
