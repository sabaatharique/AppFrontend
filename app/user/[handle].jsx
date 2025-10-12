import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'
import { StyledCard as Card} from '../../components/StyledCard'
import { StyledBorderView as BorderView} from '../../components/StyledBorderView'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Entypo from '@expo/vector-icons/Entypo'
import Ionicons from '@expo/vector-icons/Ionicons'
import Octicons from '@expo/vector-icons/Octicons'
import { useLocalSearchParams } from 'expo-router'
import users from '../../data/userData.json'
import rides from '../../data/rideData.json'
import React from 'react'

const UserDetails = () => {
  const { handle } = useLocalSearchParams();
  const user = users.find(u => u.handle === handle);

  const createdRides = rides.filter(r => r.creator.handle === user.handle);

  const joinedRides = rides.filter(r => r.partners.some(p => p.handle === user.handle));

  
  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.imgPlaceholder}>
        <Text>Image</Text>
      </View>

      <Card>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <View style={{width: '80%'}}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.handle}>{user.handle}</Text>
            <Text style={styles.bio}>{user.bio || "Hello, fellow ride sharer!"}</Text>
          </View>

          <TouchableOpacity>
            <Ionicons name="chatbubble-ellipses" size={28} color="#888" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* stats */}
        <View style={styles.statBox}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.statValue}>{joinedRides.length + createdRides.length}</Text>
            <Text style={{fontSize: 12}}>Rides</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.statValue}>{user.rating}</Text>
            <Text style={{fontSize: 12}}>Rating</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.statValue}>2025</Text>
            <Text style={{fontSize: 12}}>Member Since</Text>
          </View>
        </View>

        {/* contact info */}
        <View>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity style={styles.contactLink}>
            <Entypo name="facebook" size={22} color="#1877f2" style={styles.icon} />
            <Text style={[styles.infoText, {fontWeight: 'semibold'}]}>{user.name}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactLink}>
            <FontAwesome name="phone" size={22} color="black" style={styles.icon} />
            <Text style={[styles.infoText, {fontWeight: 'semibold'}]}>{user.phone || '-'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactLink}>
            <Entypo name="email" size={20} color="#888" style={styles.icon} />
            <Text style={[styles.infoText, {fontWeight: 'semibold'}]}>{user.email || '-'}</Text>
          </TouchableOpacity> 
        </View>

        {/* recent rides */}
        {createdRides.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Rides Created</Text>
            {createdRides.map((ride, index) => (
              <BorderView key={index}>
                <View style={styles.rideRow}>
                  <Octicons name="dot-fill" size={16} color="#e63e4c" style={styles.icon} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.rideText, {marginVertical: 0}]}>{ride.start}</Text>
                  </View>
                </View>

                <View style={styles.rideRow}>
                  <Entypo name="location-pin" size={16} color="#e63e4c" style={styles.icon} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.rideText, {marginVertical: 0}]}>{ride.destination}</Text>
                  </View>
                </View>

                <View style={styles.rideRow}>
                  <View style={styles.rideColumn}>
                    <Text style={[styles.rideText, styles.transportText]}>{ride.transport}</Text>
                  </View>

                  <View style={styles.rideColumn}>
                    <Text>{ride.date.day}</Text>
                  </View>
                </View>
              </BorderView>
            ))}
          </View>
        )}

        {joinedRides.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Rides Joined</Text>
            {joinedRides.map((ride, index) => (
              <BorderView key={index}>
                <View style={styles.rideRow}>
                  <Octicons name="dot-fill" size={16} color="#e63e4c" style={styles.icon} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.rideText, {marginVertical: 0}]}>{ride.start}</Text>
                  </View>
                </View>

                <View style={styles.rideRow}>
                  <Entypo name="location-pin" size={16} color="#e63e4c" style={styles.icon} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.rideText, {marginVertical: 0}]}>{ride.destination}</Text>
                  </View>
                </View>

                <View style={styles.creatorRow}>
                  <Text style={{fontSize: 30}}>👤 </Text>
                  <View>
                    <Text style={styles.rideText}>{ride.creator.name}</Text>
                    <Text style={styles.handle}>{ride.creator.handle}</Text>
                  </View>
                </View>

                <View style={styles.rideRow}>
                  <View style={styles.rideColumn}>
                    <Text style={[styles.rideText, styles.transportText]}>{ride.transport}</Text>
                  </View>

                  <View style={styles.rideColumn}>
                    <Text>{ride.date.day}</Text>
                  </View>
                </View>
              </BorderView>
            ))}
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontWeight: 'semibold',
    fontSize: 16,
    color: 'red',
  },
  imgPlaceholder: {
    height: 150,
    width: '50%',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#111',
  },
  handle: {
    fontSize: 14,
    color: '#888',
  },
  bio: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  statBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 14,    
    backgroundColor: '#eee',
    flexDirection: 'row',
    marginVertical: 6,
    padding: 8,
    alignItems: 'center',
    marginVertical: 16
  },
  statValue: {
    fontWeight: 'semibold',
    fontSize: 18,
    color: '#000',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  contactLink: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  icon: {
    marginRight: 10
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  rideColumn: {
    alignItems: 'flex-start',
    width: '50%'
  },
  transportText: {
    backgroundColor: '#ababab',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  }
});