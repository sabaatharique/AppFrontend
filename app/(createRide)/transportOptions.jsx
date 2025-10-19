import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'

export default function TransportOptions() {
  const router = useRouter();
  const { address = 'Destination' } = useLocalSearchParams();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const transportOptions = ['Uber', 'Pathao', 'Private Car', 'Other'];

  return (
    <ScrollView>
      <Text style={styles.title}>Your destination</Text>

      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 14}}>To</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{address}</Text>
        </View>
      </CardButton>

      <Text style={styles.subtitle}>Choose a service</Text>

      {transportOptions.map((option) => (
        <CardButton key={option} onPress={() => setSelectedTransport(option)}>
          <Text style={styles.transportText}>{option}</Text>
        </CardButton>
      ))}

      {selectedTransport && (
        <>
          <Text style={styles.subtitle}>Chosen service</Text>
          <CardButton>
            <Text style={{fontWeight: 'bold'}}>{selectedTransport}</Text>
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
              onPress={() => router.push({ pathname: '/ridePreferences', params: { address, transport: selectedTransport } })}
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
  transportText: {
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
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
})
