import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'

export default function PreferencesDisplay() {
  const { 
    address = 'Destination', 
    transport = 'UberX',
    numPartners = '',
    gender = 'Any',
    department = '',
    otherNotes = ''
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Preferences</Text>

      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 14}}>📍 {address}</Text>
          <Text style={{marginTop: 4}}>{transport}</Text>
        </View>
      </CardButton>

      <Text style={styles.subtitle}>Your Preferences</Text>
      
      <CardButton>
        <View style={{width: '100%'}}>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Number of ride partners:</Text>
            <Text style={styles.preferenceValue}>{numPartners || 'Not specified'}</Text>
          </View>

          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Preferred gender:</Text>
            <Text style={styles.preferenceValue}>{gender}</Text>
          </View>

          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Preferred department:</Text>
            <Text style={styles.preferenceValue}>{department || 'Not specified'}</Text>
          </View>

          {otherNotes && (
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Additional notes:</Text>
              <Text style={styles.preferenceValue}>{otherNotes}</Text>
            </View>
          )}
        </View>
      </CardButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 10, backgroundColor: '#f7f7f7' },
  title: { fontWeight: 'bold', fontSize: 22, marginTop: 15 },
  subtitle: { fontWeight: 'bold', fontSize: 18, marginTop: 20, marginBottom: 6 },
  preferenceRow: { 
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  preferenceLabel: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 4 
  },
  preferenceValue: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
})
