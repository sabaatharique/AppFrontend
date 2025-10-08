import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { StyledText as Text } from '../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledCard as Card} from '../../../components/StyledCard'
import { StyledTitle as Title } from '../../../components/StyledTitle' 
import { StyledButton as Button} from '../../../components/StyledButton'
import { useLocalSearchParams } from 'expo-router'
import rides from '../../../data/rideData.json'
import React, { useState } from 'react';

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const ride = rides.find(r => r.id === parseInt(id));

  const [showPassengers, setShowPassengers] = useState(false);

  if (!ride) {
    return (
      <ScrollView>
        <Text>Ride not found.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
        <View style={styles.headerRow}>
          <Title style={{width: '50%'}}>Ride Details</Title>

          <View style={{width: '50%', marginTop: 10}}>
            <Button style={{alignSelf: 'flex-end'}} title="Request to Join">
            </Button>
          </View>
        </View>
      
      <Card>
        {/* start location */}
        <View style={styles.rideRow}>
          <Text style={{fontSize: 18}}>⭕ </Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.rideText, styles.borderText]}>{ride.start}</Text>
          </View>
        </View>

        {/* stop locations */}

        {/* destination location */}
        <View style={styles.rideRow}>
          <Text style={{fontSize: 18}}>📍 </Text>
          <View style={{ flex: 1 }}>
          <Text style={[styles.rideText, styles.borderText]}>{ride.destination}</Text>
          </View>
        </View>

        {/* time & date */}
        <View style={[styles.rideRow, {marginTop: 15}]}>
          <Text style={styles.rideText}>{ride.date.day} {ride.date.time}</Text>
        </View>

        {/* ride creator */}
        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Ride creator</Text>
        </View>

        <View style={styles.creatorRow}>
          <Text style={{fontSize: 30}}>👤 </Text>
          <View>
            <Text style={styles.creatorName}>{ride.creator.name}</Text>
            <Text style={styles.handle}>{ride.creator.handle}</Text>
          </View>
        </View>

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
                <View key={index} style={styles.creatorRow}>
                  <Text style={{fontSize: 30}}>👤 </Text>
                  <View>
                    <Text style={styles.creatorName}>{partner.name}</Text>
                    <Text style={styles.handle}>{partner.handle}</Text>
                  </View>
                </View>
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
            <Text style={styles.rideText}>BDT {ride.fare}</Text>
          </View>
        </View>

        {/* preferences */}
        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Preferences</Text>
        </View>

        <View style={styles.borderText}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>Number of passengers:</Text>
            </View>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>{ride.partners.length} / {ride.totalPassengers}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>Preferred gender:</Text>
            </View>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>None</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>Other:</Text>
            </View>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>Would prefer people from the same university.</Text>
            </View>
          </View>
        </View>

        
        <Button style={{alignSelf: 'flex-start', marginTop: 10}} title="Estimate Fare">
        </Button>
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
  rideColumn: {
    alignItems: 'flex-start',
    marginVertical: 5,
    width: '50%'
  },
  transportText: {
    backgroundColor: '#888',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    flex: 1
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  }
});
