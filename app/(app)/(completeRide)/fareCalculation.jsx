import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledText as Text } from '../../../components/StyledText'
import { StyledTitle as Title } from '../../../components/StyledTitle' 
import { StyledCardButton as CardButton } from '../../../components/StyledCardButton'
import { StyledButton as Button } from '../../../components/StyledButton'
import rides from '../../../data/rideData.json'
import { useRouter } from 'expo-router'; 

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function FareCalculation() {
  const currentRide = rides[0];
  const router = useRouter();
  const [fareBreakdown, setFareBreakdown] = useState([]);

  const getDistances = async () => {
    const rideStart = currentRide.start.coords;
    const rideEnd   = currentRide.destination.coords;
    const totalFare = parseFloat(currentRide.fare);
  
    const totalRideUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${rideStart.lat},${rideStart.lng}&destinations=${rideEnd.lat},${rideEnd.lng}&key=${GOOGLE_MAPS_APIKEY}`;
    
    const totalRideResponse = await fetch(totalRideUrl);
    const totalRideData = await totalRideResponse.json();
    const totalDistanceKm = totalRideData.rows[0].elements[0].distance.value / 1000; // in km
  
    const participants = [];
  
    participants.push({
      name: currentRide.creator.name,
      handle: currentRide.creator.handle,
      distance: totalDistanceKm,
    });
  
    for (const partner of currentRide.partners) {
      const start = partner.start.coords;
      const end = partner.destination.coords;
  
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start.lat},${start.lng}&destinations=${end.lat},${end.lng}&key=${GOOGLE_MAPS_APIKEY}`;
      
      const res = await fetch(url);
      const data = await res.json();
      const userDistanceKm = data.rows[0].elements[0].distance.value / 1000;
  
      participants.push({
        name: partner.name,
        handle: partner.handle,
        distance: userDistanceKm,
      });
    }
  
    const sumDistances = participants.reduce((sum, p) => sum + p.distance, 0);
  
    const breakdown = participants.map((p) => ({
      name: p.name,
      handle: p.handle,
      distance: p.distance,
      fare: ((p.distance / sumDistances) * totalFare).toFixed(2),
    }));
  
    setFareBreakdown(breakdown);
  };

  useEffect(() => {
    getDistances();
  }, []);

  return (
    <ScrollView>
      <Title style={{marginTop: 10}}>Fare breakdown</Title>
      
      <CardButton>
        <View style={{width: '100%'}}>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Total fare:</Text>
            <Text style={styles.fareValue}>BDT {currentRide.fare}</Text>
          </View>

          {fareBreakdown.map((p, i) => (
            <View key={i} style={styles.fareRow}>
              <View style={{width: '40%'}}>
                <Text style={{fontSize: 30 }}>👤 </Text>
                <View style={styles.participantRow}>
                  <View style={styles.creatorRow}>
                    <View>
                      <Text style={{ fontWeight: 'semibold', fontSize: 16 }}>{p.name}</Text>
                      <Text style={styles.handle}>{p.handle}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text>{p.distance.toFixed(2)} km</Text>
              <Text>BDT {p.fare}</Text>
            </View>
          ))}
        </View>
      </CardButton>

      <Button
        title='Next'
        onPress={() =>
          router.push('/partnerFeedback')
      }
      style={{marginTop: 20, width: '100%'}}>
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 8,
  },
  participantRole: { 
    fontSize: 12, 
    color: '#000',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  handle: {
    color: '#888',
    fontSize: 13,
    flex: 1,
  },
  fareRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 8
  },
  fareLabel: { 
    fontSize: 16, 
    color: '#333' 
  },
  fareValue: { 
    fontSize: 16, 
    fontWeight: 'semibold' 
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
})
