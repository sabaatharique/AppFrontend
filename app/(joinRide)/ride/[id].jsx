import { View, StyleSheet } from 'react-native'
import { StyledText as Text } from '../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import RideDetailsCard from '../../../components/RideDetailsCard'
import RouteMap from '../../../components/RouteMap'
import { useLocalSearchParams } from 'expo-router'
import rides from '../../../data/rideData.json'
import React from 'react';

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const ride = rides.find(r => r.id === parseInt(id));

  if (!ride) {
    return (
      <ScrollView>
        <Text>Ride not found.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <RouteMap start={{ latitude: ride.start.coords.lat, longitude: ride.start.coords.lng }} destination={{ latitude: ride.destination.coords.lat, longitude: ride.destination.coords.lng }} />

      <RideDetailsCard ride={ride} showRequestJoin={true}></RideDetailsCard>
    </ScrollView>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  mapPlaceholder: {
    height: 300,
    width: '100%',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  }
});