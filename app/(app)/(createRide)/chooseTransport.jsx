import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import { StyledCardButton as CardButton } from '../../../components/StyledCardButton';
import RideCard from '../../../components/RideDisplayCard';
import { StyledButton as Button } from '../../../components/StyledButton';
import { useRouter } from 'expo-router';
import { useRide } from '../../../context/RideContext';
import Entypo from '@expo/vector-icons/Entypo';

export default function ChooseTransport() {
  const router = useRouter();
  const { rideData, setRideData } = useRide();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const transportOptions = ['Uber', 'Pathao', 'Private Car', 'Other'];
  const [fareEstimate, setFareEstimate] = useState('');

  const handleNext = () => {
    let fareValue = fareEstimate.trim();
    if (fareValue === '' || isNaN(fareValue) || parseFloat(fareValue) < 0) {
      fareValue = 'TBA';
    } else {
      fareValue = parseFloat(fareValue).toFixed(2); // Format to 2 decimal places
    }

    setRideData({ ...rideData, transport: selectedTransport, fare: fareValue });

    router.push('/ridePreferences');
  };

  return (
    <ScrollView>
      <Title>Your trip</Title>

      <RideCard create={true} ride={rideData} />

      <Title>Select transport</Title>

      <CardButton onPress={() => setShowOptions(!showOptions)} style={transportOptions.includes(selectedTransport) ? styles.selectedCard : {}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={styles.transportRow}>
            <Text style={styles.transportIcon}>🚗</Text>
            <Text style={[styles.transportText, transportOptions.includes(selectedTransport) ? {fontWeight: 'semibold'} : {}]}>{selectedTransport && transportOptions.includes(selectedTransport) ? selectedTransport : 'Car'}</Text>
          </View>
          <Entypo name={showOptions ? "chevron-up" : "chevron-down"} size={18} color="black" />
        </View>
      </CardButton>

      {showOptions && ( <>
        <Title style={{fontSize: 20}}>Choose a service: </Title>
        {transportOptions.map((option) => (
          <CardButton key={option} onPress={() => {
            setSelectedTransport(option);
           }}
            style={[{width: '95%', alignSelf: 'flex-end'}, selectedTransport === option ? styles.selectedCard : {}]} >
            <Text style={[styles.transportText, selectedTransport === option ? {fontWeight: 'semibold'} : {}]}>{option}</Text>
          </CardButton>
        ))}</>
      )}

      <CardButton onPress={() => {setSelectedTransport('CNG'); setShowOptions(false);}} style={selectedTransport === 'CNG' ? styles.selectedCard : {}}>
        <View style={styles.transportRow}>
          <Text style={styles.transportIcon}>🛺</Text>
          <Text style={[styles.transportText, selectedTransport === 'CNG' ? {fontWeight: 'semibold'} : {}]}>CNG</Text>
        </View>
      </CardButton>
      <CardButton onPress={() => {setSelectedTransport('Bus'); setShowOptions(false);}} style={selectedTransport === 'Bus' ? styles.selectedCard : {}}>
        <View style={styles.transportRow}>
          <Text style={styles.transportIcon}>🚌</Text>
          <Text style={[styles.transportText, selectedTransport === 'Bus' ? {fontWeight: 'semibold'} : {}]}>Bus</Text>
        </View>
      </CardButton>

      {selectedTransport && (
        <>
        <Title>Fare (optional)</Title>

        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10,}}>
          <TextInput
            style={styles.fareInput}
            placeholder='Enter fare...'
            keyboardType='numeric'
            value={fareEstimate}
            onChangeText={(text) => setFareEstimate(text.replace(/[^0-9.]/g, ''))} 
          ></TextInput>
          <Text style={{marginLeft: 10}}>BDT</Text>
        </View>
        </>
      )}
      
      <View style={styles.buttonRow}>
        <Button
          title='Back'
          onPress={() => router.back()}
          style={{ width: '30%' }}
        ></Button>

        {selectedTransport && (
        <Button
          title='Next'
          onPress={handleNext}
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
    alignItems: 'center',
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
    backgroundColor: '#e6e6e6',
    borderWidth: 2,
    borderColor: '#000',
  },
  fareInput: {
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular'
  }
})


