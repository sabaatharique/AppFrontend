import { View, StyleSheet } from 'react-native';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView';
import { useLocalSearchParams } from 'expo-router';
import rides from '../../../data/rideData.json';
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
      <Text style={styles.title}>Ride Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Destination:</Text>
        <Text style={styles.value}>{ride.destination}</Text>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{ride.date.day} at {ride.date.time}</Text>
        <Text style={styles.label}>Creator:</Text>
        <Text style={styles.value}>{ride.creator.name} ({ride.creator.handle})</Text>
        <Text style={styles.label}>Transport:</Text>
        <Text style={styles.value}>{ride.transport}</Text>
        <Text style={styles.label}>Fare:</Text>
        <Text style={styles.value}>BDT {ride.fare}</Text>
      </View>
    </ScrollView>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});
