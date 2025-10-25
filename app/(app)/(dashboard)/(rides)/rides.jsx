import React from 'react';
import { StyledScrollView as ScrollView } from '../../../../components/StyledScrollView';
import { StyledTitle as Title } from '../../../../components/StyledTitle';
import RideCard from '../../../../components/RideDisplayCard';
import { useRouter } from 'expo-router';
import rides from '../../../../data/rideData.json';


const UserRides = () => {
  const activeRides = [rides[0], rides[1]];
  const previousRides = [rides[2], rides[3], rides[4], rides[5], rides[6], rides[7]]
  const router = useRouter();

  return (
    <ScrollView>
      <Title>Your ongoing rides</Title>
      
      {activeRides.map((ride, index=2) => (
        <RideCard key={index} ride={ride} ongoing={true} onPress={() => router.push(`/${ride.id}`)} />
      ))}

      <Title style={{marginTop: 10}}>Your previous rides</Title>
      
      {previousRides.map((ride, index=2) => (
        <RideCard key={index} ride={ride} onPress={() => router.push(`/${ride.id}`)} />
      ))}
    </ScrollView>
  )
}

export default UserRides
