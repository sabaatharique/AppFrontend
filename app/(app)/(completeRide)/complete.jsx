import React, { use } from 'react';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledTitle as Title } from '../../../components/StyledTitle' 
import { StyledButton as Button } from '../../../components/StyledButton'; 
import RouteMap from '../../../components/RouteMap'
import RideCard from '../../../components/RideDisplayCard'
import rides from '../../../data/rideData.json'
import { useRouter } from 'expo-router'; 

export default function FareCalculation() {
  const router = useRouter();
  const currentRide = rides[0];

  return (
    <ScrollView>
      <Title>Ride completed!</Title>

      <RouteMap ride={currentRide} />

      <RideCard ride={currentRide} />

      <Button
          title='Next'
          onPress={() =>
            router.push('/fareCalculation')
        }
        style={{width: '100%'}}>
        </Button>

    </ScrollView>
  )
}
