import { View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledCard as Card} from '../../../components/StyledCard'
import { StyledTitle as Title } from '../../../components/StyledTitle' 
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

      <Card>
        {/* start location */}
        <View style={styles.rideRow}>
          <Text>⭕ </Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.rideText, styles.borderText]}>{ride.start}</Text>
          </View>
        </View>

        {/* stop locations */}

        {/* destination location */}
        <View style={styles.rideRow}>
          <Text>📍 </Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.rideText, styles.borderText]}>{ride.destination}</Text>
          </View>
        </View>

        {/* time & date */}
        <View style={[styles.rideRow, {marginTop: 15}]}>
          <Text style={styles.rideText}>{ride.date.day} {ride.date.time}</Text>
        </View>

        {/* ride creator*/}
        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Ride creator</Text>
        </View>

        <TouchableOpacity style={styles.creatorRow} onPress={() => {router.push(`../../user/${ride.creator.handle}`)}}>
          <Text style={{fontSize: 30}}>👤 </Text>
          <View >
            <Text style={styles.creatorName}>{ride.creator.name}</Text>
          <Text style={styles.handle}>{ride.creator.handle}</Text>
          </View>
        </TouchableOpacity>

        {/* ride passengers */}
        <View style={styles.subtitle}>
          <TouchableOpacity onPress={() => setShowPassengers(!showPassengers)}>
            <Text style={[styles.rideText, { fontWeight: 'bold' }]}>Ride passengers {showPassengers ? '▲' : '▼'} </Text>
          </TouchableOpacity>
        </View>

        {showPassengers && (
          <View>
            {ride.partners.length === 0 ? (
              <Text style={[styles.handle, styles.rideRow]}>No other passengers.</Text>
            ) : (
              ride.partners.map((partner, index) => (
                <TouchableOpacity key={index} style={styles.creatorRow} onPress={() => {router.push(`../../user/${partner.handle}`)}}>
                  <Text style={{fontSize: 30}}>👤 </Text>
                  <View >
                    <Text style={styles.creatorName}>{partner.name}</Text>
                  <Text style={styles.handle}>{partner.handle}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* transport & total fare */}
        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Transport</Text>
        </View>

        <View style={styles.rideRow}>
          <View style={styles.rideColumn}>
            <Text style={[styles.rideText, styles.transportText]}>{ride.transport}</Text>
          </View>

          <View style={styles.rideColumn}>
            <Text>BDT {ride.fare}</Text>
          </View>
        </View>

        {/* fare breakdown */}
        <View style={styles.subtitle}>
          <TouchableOpacity onPress={() => setShowBreakdown(!showBreakdown)}>
            <Text style={[styles.rideText, { fontWeight: 'bold' }]}>Fare Breakdown {showBreakdown ? '▲' : '▼'} </Text>
          </TouchableOpacity>
        </View>

        {showBreakdown && (
          <View style={styles.borderText}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.rideColumn}>
                <Text style={styles.rideText}>{ride.creator.name}</Text>
              </View>
              <View style={styles.rideColumn}>
                <Text style={styles.rideText}>BDT {ride.fare}</Text>
              </View>
            </View>

            {ride.partners.length === 0 ? (
              <></>
            ) : (
              ride.partners.map((partner, index) => (
                <View  key={index} style={{flexDirection: 'row'}}>
                  <View style={styles.rideColumn}>
                    <Text style={styles.rideText}>{partner.name}</Text>
                  </View><View style={styles.rideColumn}>
                      <Text style={styles.rideText}>BDT {ride.fare}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: 'bold', 
    fontSize: 14, 
    marginTop: 10,
  },
  borderText: {
    borderRadius: 20,
    borderWidth: 1,     
    borderColor: '#ababab',
    paddingVertical: 6,
    paddingHorizontal: 12,
    flex: 1
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    flex: 1
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  locationColumn: {
    alignItems: 'flex-start',
    marginRight: 5,
    marginBottom: 10,
    width: '65%',
  },
  creatorColumn: {
    alignItems: 'flex-start',
    marginLeft: 5,
    marginBottom: 10,
    width: '30%',
  },
  rideColumn: {
    alignItems: 'flex-start',
    marginVertical: 10,
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
  },
  button: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#1f1f1f'
  },
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14
  }
});
