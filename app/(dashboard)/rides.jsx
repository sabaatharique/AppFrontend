import React from 'react';
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView';
import { StyledTitle as Title } from '../../components/StyledTitle';
import rides from '../../data/rideData.json';
import { RideHistoryCard } from '../../components/RideHistoryCard';

const UserRides = () => {
  return (
    <ScrollView>
      <Title>Your Previous Rides</Title>
      
      {rides.map((ride, index) => (
        <RideHistoryCard key={index} ride={ride} />
      ))}
    </ScrollView>
  )
}

export default UserRides
