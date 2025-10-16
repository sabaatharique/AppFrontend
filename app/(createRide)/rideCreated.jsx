import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StyledText as Text } from '../../components/StyledText';
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'; 
import { StyledTitle as Title } from '../../components/StyledTitle'; 
import { useRide } from '../../context/RideContext';
import ActiveRideCard from '../../components/ActiveRideCard';


export default function RideCreated() {
  const { rideData } = useRide();
  const router = useRouter();

  return (
    <ScrollView>
      <Title>Your ride is created!</Title>

      <ActiveRideCard ride={rideData} showPreferences={true}/>

      <Text style={{ marginTop: 20 }}>Other users can now see your ride!</Text>
      <Text>Check ride notifications for join requests.</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 25, 
    paddingTop: 10, 
    backgroundColor: '#f7f7f7' 
  },
})





