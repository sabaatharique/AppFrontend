import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'
import { StyledSearchBar as TextInput } from '../../components/StyledSearchBar'

export default function ChooseTransport() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const name = params.name || 'Selected location';
  const address = params.address || 'Destination';
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [numPartners, setNumPartners] = useState('');
  const [gender, setGender] = useState('Any');
  const [department, setDepartment] = useState('');
  const [otherNotes, setOtherNotes] = useState('');

  return (
    <ScrollView>
      <Text style={styles.title}>Your destination</Text>

      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 14}}>From</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Current location</Text>
          <View style={{height: 8}} />
          <Text style={{fontSize: 14}}>To</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{address}</Text>
        </View>
      </CardButton>

      <Text style={styles.subtitle}>Your preferred transport</Text>

      <CardButton onPress={() => setSelectedTransport('Car')}>
        <View style={styles.transportRow}>
          <Text style={styles.transportIcon}>🚗</Text>
          <Text style={styles.transportText}>Car</Text>
        </View>
      </CardButton>
      <CardButton onPress={() => setSelectedTransport('CNG')}>
        <View style={styles.transportRow}>
          <Text style={styles.transportIcon}>🛺</Text>
          <Text style={styles.transportText}>CNG</Text>
        </View>
      </CardButton>
      <CardButton onPress={() => setSelectedTransport('Bus')}>
        <View style={styles.transportRow}>
          <Text style={styles.transportIcon}>🚌</Text>
          <Text style={styles.transportText}>Bus</Text>
        </View>
      </CardButton>

      {selectedTransport && (
  <>
        <Text style={styles.subtitle}>Chosen transport</Text>
        <CardButton>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>{selectedTransport}</Text>
          </View>
        </CardButton>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.primaryCta, { flex: 1, marginRight: 8 }]}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryCtaText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.primaryCta, { flex: 1, marginLeft: 8 }]}
            onPress={() => {
              if (selectedTransport === 'Car') {
                router.push({ pathname: '/transportOptions', params: { address, transport: selectedTransport } });
              } else {
                // For Bus and CNG, skip transport options and go directly to preferences
                router.push({ pathname: '/ridePreferences', params: { address, transport: selectedTransport } });
              }
            }}
          >
            <Text style={styles.primaryCtaText}>Next</Text>
          </TouchableOpacity>
        </View>
      </>
    )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 10,
    backgroundColor: '#f7f7f7',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 6,
  },
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  transportText: {
    fontSize: 16,
  },
  primaryCta: {
    marginTop: 10,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
  },
  primaryCtaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    backgroundColor: '#fff'
  },
  pillActive: {
    backgroundColor: '#1f1f1f',
    borderColor: '#1f1f1f',
  },
  pillText: {
    fontSize: 14,
  },
  pillTextActive: {
    color: '#fff',
    fontWeight: 'bold'
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000',
    padding: 6,
    minHeight: 90
  }
})


