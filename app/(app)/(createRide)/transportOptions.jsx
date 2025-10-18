import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import { StyledCardButton as CardButton } from '../../../components/StyledCardButton';
import ActiveRideCard from '../../../components/ActiveRideCard';
import { StyledButton as Button } from '../../../components/StyledButton';
import { useRide } from '../../../context/RideContext';
import { useRouter } from 'expo-router';
import user from '../../../data/userData.json'


export default function TransportOptions() {
  const router = useRouter();
  const { rideData, setRideData } = useRide();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const transportOptions = ['Uber', 'Pathao', 'Private Car', 'Other'];

  const creator = user[0];

  return (
    <ScrollView>
      <Title>Your Trip</Title>

      <ActiveRideCard ride={rideData} />

      <Title>Choose a service</Title>

      {transportOptions.map((option) => (
        <CardButton key={option} onPress={() => setSelectedTransport(option)}  style={selectedTransport === option ? styles.selectedCard : {}} >
          <Text style={styles.transportText}>{option}</Text>
        </CardButton>
      ))}

      
          <View style={styles.buttonRow}>
            <Button
            title='Back'
            onPress={() => router.back()}
            style={{ width: '30%' }}
            ></Button>

            {selectedTransport && (
              <Button
                title="Next"
                onPress={() => {
                  setRideData({ ...rideData, transport: selectedTransport });
                  router.push('/ridePreferences');
                }}
              ></Button>
            )}
          </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 10,
    backgroundColor: '#f7f7f7',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  transportText: {
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
  },
  primaryCta: {
    marginTop: 10,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
  },
  primaryCtaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedCard: {
    backgroundColor: '#888',
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  handle: {
    color: '#888',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
})
