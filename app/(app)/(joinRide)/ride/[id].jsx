import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledText as Text } from '../../../../components/StyledText';
import RideDetailsCard from '../../../../components/RideDetailsCard';
import RouteMap from '../../../../components/RouteMap';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSearch } from '../../../../context/SearchContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import rides from '../../../../data/rideData.json';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '../../../../components/BottomSheet';

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const { searchData } = useSearch();
  const ride = rides.find((r) => r.id === parseInt(id));
  const router = useRouter();
  

  if (!ride) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ride not found.</Text>
      </View>
    );
  }

  const userStartCoords = searchData.start?.coords;
  const userDestCoords = searchData.destination?.coords;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome style={{ marginRight: 10 }} name="chevron-left" size={14} color="black" />
        <Text style={{ fontSize: 16, fontWeight: 'semibold' }}>Back</Text>
      </TouchableOpacity>

      <RouteMap ride={ride} userStartCoords={userStartCoords} userDestCoords={userDestCoords} small={false} />

      <BottomSheet initialPosition="collapsed" topSnap={0.1} bottomSnap={0.6}>
        <RideDetailsCard ride={ride} join={true} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    zIndex: 1,
  },
  
});