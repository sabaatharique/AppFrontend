import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import { StyledCardButton as CardButton } from '../../../components/StyledCardButton';
import ActiveRideCard from '../../../components/ActiveRideCard';
import { StyledButton as Button } from '../../../components/StyledButton';
import { useRouter } from 'expo-router';
import { useRide } from '../../../context/RideContext';
import user from '../../../data/userData.json'

export default function ChooseTransport() {
  const router = useRouter();
  const { rideData, setRideData } = useRide();
  const [selectedTransport, setSelectedTransport] = useState(null);

  const creator = user[0];

  return (
    <ScrollView>
      <Title>Your trip</Title>

      <ActiveRideCard ride={rideData} />

      <Title>Select transport</Title>

      <CardButton onPress={() => setSelectedTransport('Car')} style={selectedTransport === 'Car' ? styles.selectedCard : {}}>
        <View style={styles.transportRow}>
          <Text style={styles.transportIcon}>🚗</Text>
          <Text style={styles.transportText}>Car</Text>
        </View>
      </CardButton>
      <CardButton onPress={() => setSelectedTransport('CNG')} style={selectedTransport === 'CNG' ? styles.selectedCard : {}}>
        <View style={styles.transportRow}>
          <Text style={styles.transportIcon}>🛺</Text>
          <Text style={styles.transportText}>CNG</Text>
        </View>
      </CardButton>
      <CardButton onPress={() => setSelectedTransport('Bus')} style={selectedTransport === 'Bus' ? styles.selectedCard : {}}>
        <View style={styles.transportRow}>
          <Text style={styles.transportIcon}>🚌</Text>
          <Text style={styles.transportText}>Bus</Text>
        </View>
      </CardButton>

      
      <View style={styles.buttonRow}>
        <Button
          title='Back'
          onPress={() => router.back()}
          style={{ width: '30%' }}
        ></Button>

        {selectedTransport && (
        <Button
          title='Next'
          onPress={() => {
            setRideData({ ...rideData, transport: selectedTransport });
            if (selectedTransport === 'Car') {
              router.push('/transportOptions');
            } else {
              // For Bus and CNG, skip transport options and go directly to preferences
              router.push('/ridePreferences');
            }
          }}
          style={{ width: '30%' }}
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
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  transportText: {
    fontSize: 16,
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
  }
})


