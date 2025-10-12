import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'
import rides from '../../data/rideData.json'

export default function FareCalculation() {
  // Use the first ride from rides.json as the current ride
  const currentRide = rides[0];

  // Calculate fare per person
  const totalPeople = 1 + currentRide.partners.length; // Creator + partners
  const totalFare = parseFloat(currentRide.fare);
  const farePerPerson = (totalFare / totalPeople).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fare Calculation</Text>

      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 14}}>📍 {currentRide.destination}</Text>
          <Text style={{marginTop: 4}}>{currentRide.transport}</Text>
          <Text style={{marginTop: 4, color: '#666'}}>{currentRide.date.day} • {currentRide.date.time}</Text>
        </View>
      </CardButton>

      <Text style={styles.subtitle}>Ride Participants</Text>
      
      <CardButton>
        <View style={{width: '100%'}}>
          <View style={styles.participantRow}>
            <Text style={styles.participantName}>{currentRide.creator.name}</Text>
            <Text style={styles.participantHandle}>{currentRide.creator.handle}</Text>
            <Text style={styles.participantRole}>Creator</Text>
          </View>
          
          {currentRide.partners.map((partner, index) => (
            <View key={index} style={styles.participantRow}>
              <Text style={styles.participantName}>{partner.name}</Text>
              <Text style={styles.participantHandle}>{partner.handle}</Text>
              <Text style={styles.participantRole}>Joined</Text>
            </View>
          ))}
        </View>
      </CardButton>

      <Text style={styles.subtitle}>Fare Breakdown</Text>
      
      <CardButton>
        <View style={{width: '100%'}}>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Total Fare:</Text>
            <Text style={styles.fareValue}>BDT {totalFare.toFixed(2)}</Text>
          </View>
          
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Number of People:</Text>
            <Text style={styles.fareValue}>{totalPeople}</Text>
          </View>
          
          <View style={[styles.fareRow, styles.totalRow]}>
            <Text style={styles.fareLabel}>Per Person:</Text>
            <Text style={styles.fareValue}>BDT {farePerPerson}</Text>
          </View>
        </View>
      </CardButton>

      <Text style={styles.subtitle}>Payment Summary</Text>
      
      <CardButton>
        <View style={{width: '100%'}}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentName}>{currentRide.creator.name}</Text>
            <Text style={styles.paymentAmount}>BDT {farePerPerson}</Text>
          </View>
          
          {currentRide.partners.map((partner, index) => (
            <View key={index} style={styles.paymentRow}>
              <Text style={styles.paymentName}>{partner.name}</Text>
              <Text style={styles.paymentAmount}>BDT {farePerPerson}</Text>
            </View>
          ))}
        </View>
      </CardButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 10, backgroundColor: '#f7f7f7' },
  title: { fontWeight: 'bold', fontSize: 22, marginTop: 15 },
  subtitle: { fontWeight: 'bold', fontSize: 18, marginTop: 20, marginBottom: 6 },
  participantRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  participantName: { 
    fontSize: 16, 
    fontWeight: 'bold',
    flex: 1
  },
  participantHandle: { 
    fontSize: 14, 
    color: '#666',
    flex: 1
  },
  participantRole: { 
    fontSize: 12, 
    color: '#888',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  fareRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 8
  },
  fareLabel: { 
    fontSize: 16, 
    color: '#333' 
  },
  fareValue: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  paymentRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4
  },
  paymentName: { 
    fontSize: 16, 
    fontWeight: '500' 
  },
  paymentAmount: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#1f1f1f'
  },
})
