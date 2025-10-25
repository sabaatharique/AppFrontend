import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'; 
import { StyledTitle as Title } from '../../../components/StyledTitle'; 
import { useRide } from '../../../context/RideContext';
import RideCard from '../../../components/RideDisplayCard';
import RouteMap from '../../../components/RouteMap';


export default function RideCreated() {
  const { rideData } = useRide();
  const router = useRouter();

  return (
    <ScrollView>
      <Title>Your ride is created!</Title>

      <RouteMap ride={rideData} />

      <RideCard create={true} ride={rideData} />

      <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', marginVertical: 15}}>
        <Text>Other users can now see your ride!</Text>
        <Text>Check your notifications for join requests.</Text>
      </View>

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





