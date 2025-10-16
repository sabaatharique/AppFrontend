import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledCard as Card} from '../../../components/StyledCard'
import { StyledButton as Button} from '../../../components/StyledButton'
import { StyledBorderText as BorderText} from '../../../components/StyledBorderText'
import { StyledBorderView as BorderView} from '../../../components/StyledBorderView'
import { StyledLink } from '../../../components/StyledLink'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Octicons from '@expo/vector-icons/Octicons'
import Ionicons from '@expo/vector-icons/Ionicons'
import RideDetailsCard from '../../../components/RideDetailsCard'
import { useLocalSearchParams, useRouter } from 'expo-router'
import rides from '../../../data/rideData.json'
import users from '../../../data/userData.json'
import React, { useState } from 'react';

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const ride = rides.find(r => r.id === parseInt(id));

  const findUserByHandle = (handle) => {
    return users.find(u => u.handle === handle);
  };

  const creator = findUserByHandle(ride.creator.handle);

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
      <View style={styles.mapPlaceholder}>
        <Text>Map</Text>
      </View>

      <RideDetailsCard ride={ride} showRequestJoin={true}></RideDetailsCard>
    </ScrollView>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  mapPlaceholder: {
    height: 300,
    width: '100%',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  }
});