import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'
import { StyledCard as Card} from '../../components/StyledCard'
import { StyledBorderView as BorderView} from '../../components/StyledBorderView'
import users from '../../data/userData.json'
import rides from '../../data/rideData.json'
import React from 'react'

const UserProfile = () => {
  const user = users[0];

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
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.handle}>{user.handle}</Text>
            <Text style={styles.bio}>{user.bio || "Hello, fellow ride sharer!"}</Text>
          </View>

          <TouchableOpacity>
            <Text style={{fontSize: 28}}>✏️</Text>
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
            <Text style={styles.statValue}>{user.membersSince || '2023'}</Text>
            <Text style={{fontSize: 12}}>Member Since</Text>
          </View>
        </View>

        {/* contact info */}
        <View>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity>
            <Text style={[styles.infoText, {fontWeight: 'bold', color: 'skyblue'}]}>f   {user.name}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text style={styles.infoText}>📞 {user.phone || '-'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text style={styles.infoText}>✉️ {user.email || '-'}</Text>
          </TouchableOpacity> 
        </View>      
      </Card>
    </ScrollView>
  );
};

export default UserProfile;

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
    marginVertical: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  rideCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  rideTransport: {
    fontWeight: 'semibold',
    fontSize: 14
  },
  rideRoute: {
    fontSize: 14,
    color: '#333',
  },
  rideDate: {
    fontSize: 12,
    color: '#888',
  },
});