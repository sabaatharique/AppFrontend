import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import React from 'react'

const UserRides = () => {
  const lastRide = [
    { 
      location: 'House #18, Road 6, Sector 5, Uttara',
      partners: [
        { name: 'Saba Atharique', handle: '@saba130' },
        { name: 'Ridita Alam', handle: '@ridita110' },
      ],
      fare: '173.33 BDT',
      transport: 'Uber',
    },
    {
      location: 'Tokyo Kitchen, House 56/B, Banani',
      partners: [
        { name: 'Rahatut Tahrim Mounota', handle: '@mounota122' },
        { name: 'Ridita Alam', handle: '@ridita110' },
        { name: 'Saba Atharique', handle: '@saba130' },
      ],
      fare: '100.50 BDT',
      transport: 'Pathao Car',
    },
    {
      location: 'North South University, Block C, Bashundhara R/A',
      partners: [
        { name: 'Tahmid Zubayer', handle: '@tzubayer20' },
      ],
      fare: '210.00 BDT',
      transport: 'Uber XL',
    }
  ];

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Your Previous Rides</Text>
      
      {lastRide.map((ride, index) => (
        <View key={index} style={styles.rideCard}>
          <View style={styles.rideRow}>
            <Text style={styles.rideIcon}>📍</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.rideText}>{ride.location}</Text>
            </View>
          </View>

          <View style={styles.rideRow}>
            <Text style={styles.rideLabel}>Ride partners:</Text>
            <View style={{ flex: 1 }}>
              {ride.partners.map((partner, i) => (
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
            <Text style={styles.rideText}>{ride.fare}</Text>
          </View>

          <View style={styles.rideRow}>
            <Text style={styles.rideLabel}>Transport:</Text>
            <Text style={styles.rideText}>{ride.transport}</Text>
          </View>
        </View>
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
  scrollView: {
    padding: 25,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'flex-start',
    paddingBottom: 30,
  },
  rideCard: { 
    backgroundColor: '#fff', 
    borderRadius: 16,
    borderWidth: 1,     
    borderColor: '#000000',
    padding: 14, 
    marginVertical: 10,
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
