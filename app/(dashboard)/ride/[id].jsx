import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledCard as Card} from '../../../components/StyledCard'
import { StyledTitle as Title } from '../../../components/StyledTitle' 
import { StyledBorderText as BorderText } from '../../../components/StyledBorderText'
import { StyledBorderView as BorderView } from '../../../components/StyledBorderView'
import RideDetailsCard from '../../../components/RideDetailsCard'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Octicons from '@expo/vector-icons/Octicons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import rides from '../../../data/rideData.json'
import React, { useState } from 'react';

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const ride = rides.find(r => r.id === parseInt(id));

  const router = useRouter();
  
  const [showPassengers, setShowPassengers] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (!ride) {
    return (
      <ScrollView>
        <Text>Ride not found.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Title>Ride Details</Title>

      <RideDetailsCard ride={ride} showRequestJoin={false}></RideDetailsCard>
    </ScrollView>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: 'bold', 
    fontSize: 14, 
    marginVertical: 10,
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  rideColumn: {
    alignItems: 'flex-start',
    marginTop: 5,
    width: '50%'
  },
  transportText: {
    backgroundColor: '#ababab',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  handle: {
    color: '#888',
    flex: 1
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    width: '70%'
  },
  icon: {
    marginRight: 10
  }
});