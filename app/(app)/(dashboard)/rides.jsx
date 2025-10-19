import React from 'react';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import rides from '../../../data/rideData.json';
import { RideHistoryCard } from '../../../components/RideHistoryCard';
import { useRouter } from 'expo-router';

const UserRides = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <Title>Your Previous Rides</Title>
      
      {rides.map((ride, index) => (
        <RideHistoryCard key={index} ride={ride} onPress={() => router.push(`ride/${ride.id}`)} />
      ))}
    </ScrollView>
  )
}

export default UserRides
