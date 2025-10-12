import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledCard as Card} from '../../../components/StyledCard'
import { StyledButton as Button} from '../../../components/StyledButton'
import { StyledBorderText as BorderText} from '../../../components/StyledBorderText'
import { StyledBorderView as BorderView} from '../../../components/StyledBorderView'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Octicons from '@expo/vector-icons/Octicons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams, useRouter } from 'expo-router'
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
      <View style={styles.mapPlaceholder}>
        <Text>Map</Text>
      </View>

      <Card>
        <Button style={{marginBottom: 20}} title="Request to Join"></Button>
        {/* start location */}
        <View style={styles.rideRow}>
          <Octicons name="dot-fill" size={18} color="#e63e4c" style={styles.icon} />
          <View style={{ flex: 1 }}>
            <BorderText style={[styles.rideText, {marginVertical: 0}]}>{ride.start}</BorderText>
          </View>
        </View>

        {/* destination location */}
        <View style={styles.rideRow}>
          <Entypo name="location-pin" size={18} color="#e63e4c" style={styles.icon} />
          <View style={{ flex: 1 }}>
            <BorderText style={[styles.rideText, {marginVertical: 0}]}>{ride.destination}</BorderText>
          </View>
        </View>

        {/* time & date */}
        <View style={styles.rideRow}>
          <FontAwesome name="clock-o" size={14} color="#888" style={[styles.icon, {marginLeft: 4}]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.rideText}>{ride.date.day} {ride.date.time}</Text>
          </View>
        </View>

        {/* ride creator */}
        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Ride creator</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity style={styles.creatorRow} onPress={() => {router.push(`../../user/${ride.creator.handle}`)}}>
            <Text style={{fontSize: 30}}>👤 </Text>
            <View >
              <Text>{ride.creator.name}</Text>
            <Text style={styles.handle}>{ride.creator.handle}</Text>
            </View>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{paddingHorizontal: 10}}> 
              <Ionicons name="chatbubble-ellipses" size={22} color="#888" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal: 10}}> 
              <FontAwesome name="phone" size={22} color="black"/>
            </TouchableOpacity>
          </View>
        </View>

        {/* ride passengers */}
        <View style={styles.subtitle}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => setShowPassengers(!showPassengers)}>
            <Text style={[styles.rideText, { fontWeight: 'bold' }]}>Ride passengers</Text>
            <Entypo name={showPassengers ? "chevron-up" : "chevron-down"} size={18} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {showPassengers && (
          <View>
            {ride.partners.length === 0 ? (
              <Text style={[styles.handle, styles.rideRow]}>No other passengers.</Text>
            ) : (
              ride.partners.map((partner, index) => (
                <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <TouchableOpacity style={styles.creatorRow} onPress={() => {router.push(`../../user/${partner.handle}`)}}>
                    <Text style={{fontSize: 30}}>👤 </Text>
                    <View >
                      <Text style={styles.creatorName}>{partner.name}</Text>
                    <Text style={styles.handle}>{partner.handle}</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{paddingHorizontal: 10}}> 
                      <Ionicons name="chatbubble-ellipses" size={22} color="#888" style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{paddingHorizontal: 10}}> 
                      <FontAwesome name="phone" size={22} color="black"/>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* preferences */}
        <View style={styles.subtitle}>
          <Text style={[styles.rideText,{fontWeight: 'bold'}]}>Preferences</Text>
        </View>

        <BorderView>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>Total passengers:</Text>
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
        </BorderView>
        
        {/* transport & fare */}
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

        {/* fare breakdown */}
        <View style={styles.subtitle}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => setShowBreakdown(!showBreakdown)}>
            <Text style={[styles.rideText, {fontWeight: 'bold'}]}>Fare Breakdown </Text>
            <Entypo name={showBreakdown ? "chevron-up" : "chevron-down"} size={18} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {showBreakdown && (
          <BorderView>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.rideColumn}>
                <Text style={styles.rideText}>{ride.creator.name}</Text>
              </View>
              <View style={styles.rideColumn}>
                <Text style={[styles.rideText, {fontWeight: 'semibold'}]}>BDT {ride.fare}</Text>
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
                      <Text style={[styles.rideText, {fontWeight: 'semibold'}]}>BDT {ride.fare}</Text>
                  </View>
                </View>
              ))
            )}
          </BorderView>
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
    marginVertical: 10,
  },
  mapPlaceholder: {
    height: 300,
    width: '100%',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
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
