import { TouchableOpacity, StyleSheet } from 'react-native'
import { StyledText as Text } from '../../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../../components/StyledScrollView'
import RideDetailsCard from '../../../../components/RideDetailsCard'
import { useLocalSearchParams, useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import RouteMap from '../../../../components/RouteMap'
import rides from '../../../../data/rideData.json'
import React  from 'react';

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const ride = rides.find(r => r.id === parseInt(id));

  const router = useRouter();

  if (!ride) {
    return (
      <ScrollView>
        <Text>Ride not found.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome style={{marginRight: 10}} name="chevron-left" size={14} color="black" />
        <Text style={{fontSize: 16, fontWeight: 'semibold'}}>Back</Text>
      </TouchableOpacity>

      <RouteMap start={{ latitude: ride.start.coords.lat, longitude: ride.start.coords.lng }} destination={{ latitude: ride.destination.coords.lat, longitude: ride.destination.coords.lng }} />

      <RideDetailsCard ride={ride} showRequestJoin={false} ></RideDetailsCard>
    </ScrollView>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});