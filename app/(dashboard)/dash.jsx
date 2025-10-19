import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StyledText as Text } from '../../components/StyledText';
import { StyledCardButton as CardButton } from '../../components/StyledCardButton';
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView';
import { StyledTitle as Title } from '../../components/StyledTitle';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter, Link } from 'expo-router';
import rides from '../../data/rideData.json';
import React from 'react';

const Dash = () => {
  const lastRide = rides[0];
  const router = useRouter();

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Title>Start your journey!</Title>

      {/* Create Ride */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/create')}>
        <Text style={styles.buttonTitle}>Create a Ride</Text>
        <Text style={styles.buttonText}>
          Choose your destination and look for others to share the journey.
        </Text>
      </TouchableOpacity>

      {/* Join Ride */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/availableRides')}>
        <Text style={styles.buttonTitle}>Join a Ride</Text>
        <Text style={styles.buttonText}>
          Find others going your way who are also looking to share.
        </Text>
      </TouchableOpacity>

      {/* Fare Calculation */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/fareCalculation')}>
        <Text style={styles.buttonTitle}>Fare Calculation</Text>
        <Text style={styles.buttonText}>
          Calculate and split fare for your current ride.
        </Text>
      </TouchableOpacity>

      <Title>Your Last Ride</Title>

      {/* Last Ride Card */}
      <Link href={`ride/${lastRide.id}`} asChild>
        <CardButton>
          <View style={styles.rideDetails}>
            {/* Destination */}
            <View style={styles.rideRow}>
              <Entypo name="location-pin" size={16} color="#e63e4c" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rideText, { fontWeight: 'bold' }]}>
                  {lastRide.destination}
                </Text>
              </View>
            </View>

            {/* Date & Time */}
            <View style={styles.rideRow}>
              <FontAwesome name="clock-o" size={14} color="#888" style={styles.icon} />
              <Text style={styles.rideText}>
                {lastRide.date.day} • {lastRide.date.time}
              </Text>
            </View>

            {/* Creator */}
            <View style={styles.creatorRow}>
              <Text style={{ fontSize: 30 }}>👤 </Text>
              <View>
                <Text style={styles.rideText}>{lastRide.creator.name}</Text>
                <Text style={styles.handle}>{lastRide.creator.handle}</Text>
              </View>
            </View>

            {/* Transport & Fare */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.rideColumn}>
                <Text style={[styles.rideText, styles.transportText]}>
                  {lastRide.transport}
                </Text>
              </View>
              <View style={styles.rideColumn}>
                <Text style={styles.rideText}>BDT {lastRide.fare}</Text>
              </View>
            </View>
          </View>
        </CardButton>
      </Link>
    </ScrollView>
  );
};

export default Dash;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  button: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#1f1f1f',
  },
  buttonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  rideDetails: {
    flex: 1,
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rideText: {
    fontSize: 14,
    flexShrink: 1,
    flex: 1,
  },
  rideColumn: {
    alignItems: 'flex-start',
    width: '50%',
  },
  transportText: {
    backgroundColor: '#2b2b2b',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  handle: {
    color: '#888',
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
  },
});
