import { TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../../../components/StyledText'
import { StyledTitle as Title } from '../../../../components/StyledTitle' 
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
     <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome style={{paddingRight: 10}} name="chevron-left" size={18} color="black" />
      </TouchableOpacity>

      <Title style={{marginBottom: 5}}>Ride details</Title>

      <RouteMap ride={ride} />

      <RideDetailsCard ride={ride} ongoing={ride.id <= 2} ></RideDetailsCard>
      
    </ScrollView>
  );
};

export default RideDetails;
