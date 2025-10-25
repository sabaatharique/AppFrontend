import { StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../../components/StyledScrollView'
import RideDetailsCard from '../../../../components/RideDetailsCard'
import RouteMap from '../../../../components/RouteMap'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSearch } from '../../../../context/SearchContext';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import rides from '../../../../data/rideData.json'
import React from 'react';

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const { searchData } = useSearch();
  const ride = rides.find(r => r.id === parseInt(id));

  const router = useRouter();

  if (!ride) {
    return (
      <ScrollView>
        <Text>Ride not found.</Text>
      </ScrollView>
    );
  }

  const userStartCoords = searchData.start?.coords;
  const userDestCoords = searchData.destination?.coords;

  return (
    <ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome style={{marginRight: 10}} name="chevron-left" size={14} color="black" />
        <Text style={{fontSize: 16, fontWeight: 'semibold'}}>Back</Text>
      </TouchableOpacity>

      <RouteMap ride={ride} userStartCoords={userStartCoords} userDestCoords={userDestCoords} />

      <RideDetailsCard ride={ride} join={true}></RideDetailsCard>
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