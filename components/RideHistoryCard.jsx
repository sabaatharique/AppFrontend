import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StyledText as Text } from './StyledText';
import { StyledCardButton as CardButton } from './StyledCardButton';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { Link } from 'expo-router';

export function RideHistoryCard({ ride }) {
  return (
    <Link href={`ride/${ride.id}`} asChild>
      <CardButton style={styles.card}>
        {/* start location */}
        <View style={styles.rideRow}>
          <Octicons name="dot-fill" size={16} color="#e63e4c" style={styles.icon} />
          <Text style={[styles.rideText, { marginVertical: 0 }]}>{ride.start.name}</Text>
        </View>

        {/* destination location */}
        <View style={styles.rideRow}>
          <Entypo name="location-pin" size={16} color="#e63e4c" style={styles.icon} />
          <Text style={[styles.rideText, { marginVertical: 0 }]}>{ride.destination.name}</Text>
        </View>

        {/* time & date */}
        <View style={styles.rideRow}>
          <FontAwesome name="clock-o" size={14} color="#888" style={[styles.icon, { marginLeft: 4 }]} />
          <Text style={styles.rideText}>{ride.date.day}, {ride.date.time}</Text>
        </View>

        {/* creator */}
        <View style={styles.creatorRow}>
          <Text style={{ fontSize: 30 }}>👤</Text>
          <View>
            <Text style={styles.rideText}>{ride.creator.name}</Text>
            <Text style={styles.handle}>{ride.creator.handle}</Text>
          </View>
        </View>

        {/* transport & fare */}
        <View style={styles.rideRow}>
          <View style={styles.rideColumn}>
            <Text style={[styles.rideText, styles.transportText]}>{ride.transport}</Text>
          </View>

          <View style={styles.rideColumn}>
            <Text>BDT {ride.fare}</Text>
          </View>
        </View>
      </CardButton>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  rideColumn: {
    alignItems: 'flex-start',
    marginTop: 5,
    width: '50%',
  },
  transportText: {
    backgroundColor: '#ababab',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  handle: {
    color: '#888',
    flex: 1,
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
