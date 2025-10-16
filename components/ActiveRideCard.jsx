import { View, StyleSheet } from 'react-native';
import { StyledText as Text } from './StyledText';
import { StyledCardButton as CardButton } from './StyledCardButton';
import { StyledButton as Button } from './StyledButton';
import { StyledBorderText as BorderText } from './StyledBorderText';
import { StyledBorderView as BorderView } from './StyledBorderView';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';


export default function ActiveRideCard({ ride, showRequestButton = false, showPreferences = false, onPress, onPressRequest }) {
  return (
    <CardButton onPress={onPress}>
      {/* Ride creator */}
      <View style={styles.creatorRow}>
        <Text style={{ fontSize: 30 }}>👤 </Text>
        <View>
          <Text style={{ fontWeight: 'semibold', fontSize: 16 }}>{ride.creator.name}</Text>
          <Text style={styles.handle}>{ride.creator.handle}</Text>
        </View>
      </View>

      {/* Start location */}
      <View style={styles.rideRow}>
        <Octicons name="dot-fill" size={18} color="#e63e4c" style={styles.icon} />
        <View style={{ flex: 1 }}>
          <BorderText style={[styles.rideText, { marginVertical: 0 }]}>{ride.start.name}</BorderText>
        </View>
      </View>

      {/* Destination */}
      <View style={styles.rideRow}>
        <Entypo name="location-pin" size={18} color="#e63e4c" style={styles.icon} />
        <View style={{ flex: 1 }}>
          <BorderText style={[styles.rideText, { marginVertical: 0 }]}>{ride.destination.name}</BorderText>
        </View>
      </View>

      {/* Time & date */}
      {ride.date.day && ride.date.time && (
        <View style={styles.rideRow}>
          <FontAwesome name="clock-o" size={14} color="#888" style={[styles.icon, { marginLeft: 4 }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.rideText}>{ride.date.day}, {ride.date.time}</Text>
          </View>
        </View>
      )}
      

      {/* Transport, seats, fare */}
      {ride.transport && (
        <View style={styles.transportContainer}>
          <View style={{ width: '33%', flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 12 }}>Transport</Text>
            <Text style={[styles.rideText, { fontWeight: 'semibold' }]}>{ride.transport}</Text>
          </View>

          <View style={{ width: '33%', alignItems: 'center' }}>
            <Text style={{ fontSize: 12 }}>Seats</Text>
            <Text style={[styles.rideText, { fontWeight: 'semibold' }]}>
              {ride.totalPassengers - ride.partners.length}
            </Text>
          </View>

          <View style={{ width: '33%', alignItems: 'center' }}>
            <Text style={{ fontSize: 12 }}>Your fare</Text>
            <Text style={[styles.rideText, { fontWeight: 'semibold' }]}>BDT {ride.fare}</Text>
          </View>
        </View>
      )}
      

      {showRequestButton && (
        <Button
          style={{ marginTop: 10 }}
          title="Request to Join"
          onPress={onPressRequest}
        />
      )}

      {showPreferences && ( <>
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
              <Text style={styles.rideText}>{ride.gender}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>Other:</Text>
            </View>
            <View style={styles.rideColumn}>
              <Text style={styles.rideText}>{ride.preferences}</Text>
            </View>
          </View>
        </BorderView>
      </>
      )}
    </CardButton>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: 'bold', 
    fontSize: 14, 
    marginVertical: 5,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flex: 1,
  }, 
  rideColumn: {
    alignItems: 'flex-start',
    marginTop: 5,
    width: '50%'
  },
  rideText: {
    fontSize: 14,
    flex: 1,
  },
  transportContainer: {
    borderRadius: 14,
    backgroundColor: '#eee',
    flexDirection: 'row',
    marginVertical: 6,
    padding: 8,
    alignItems: 'flex-end',
  },
  handle: {
    color: '#888',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
});
