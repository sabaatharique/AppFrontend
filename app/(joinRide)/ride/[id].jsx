import { View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledCard as Card} from '../../../components/StyledCard'
import { useLocalSearchParams } from 'expo-router'
import rides from '../../../data/rideData.json'
import React from 'react';

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const ride = rides.find(r => r.id === parseInt(id));

  if (!ride) {
    return (
      <ScrollView>
        <Text>Ride not found.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Ride Details</Text>

      <Card>
        <View style={styles.rideRow}>
          <Text style={styles.rideIcon}>⭕</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.rideText, styles.borderText]}>{ride.start}</Text>
          </View>
        </View>

        <View style={styles.rideRow}>
          <Text style={styles.rideIcon}>📍</Text>
          <View style={{ flex: 1 }}>
          <Text style={[styles.rideText, styles.borderText]}>{ride.destination}</Text>
          </View>
        </View>


        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Ride creator</Text>
        </View>

        <View style={styles.rideRow}>
          <Text style={{fontSize: 24}}>👤 </Text>
          <Text style={styles.creatorName}>{ride.creator.name} </Text>
          <Text style={styles.handle}>{ride.creator.handle}</Text>
        </View>

        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Ride passengers</Text>
        </View>

        {ride.partners.map((partner, index) => (
          <View key={index} style={styles.rideRow}>
            <Text style={{fontSize: 24}}>👤 </Text>
            <Text style={styles.creatorName}>{partner.name} </Text>
            <Text style={styles.handle}>{partner.handle}</Text>
          </View>
        ))}


        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Transport</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.rideColumn}>
            <Text style={[styles.rideText, styles.transportText]}>{ride.transport}</Text>
          </View>

          <View style={styles.rideColumn}>
            <Text style={styles.rideText}>BDT {ride.fare}</Text>
          </View>
        </View>


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
              <Text style={styles.rideText}>Would prefer passengers from the same university.</Text>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.rideRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Calculate Fare</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Join Request</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold', 
    fontSize: 22, 
    marginTop: 15,
  },
  subtitle: {
    fontWeight: 'bold', 
    fontSize: 14, 
    marginTop: 10,
  },
  borderText: {
    borderRadius: 20,
    borderWidth: 1,     
    borderColor: '#ababab',
    padding: 10
  },
  rideDetails: {
    flex: 1,
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rideIcon: {
    marginRight: 10,
  },
  rideLabel: {
    fontWeight: 'bold',
    marginRight: 10,
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
    backgroundColor: '#2b2b2b',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12
  },
  handle: {
    color: '#888'
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
