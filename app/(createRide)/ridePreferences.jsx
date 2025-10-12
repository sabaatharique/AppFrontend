import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'
import { StyledSearchBar as TextInput } from '../../components/StyledSearchBar'

export default function RidePreferences() {
  const router = useRouter();
  const { address = 'Destination', transport = 'UberX' } = useLocalSearchParams();
  const [numPartners, setNumPartners] = useState('');
  const [gender, setGender] = useState('Any');
  const [department, setDepartment] = useState('');
  const [otherNotes, setOtherNotes] = useState('');

  return (
    <ScrollView>
      <Text style={styles.title}>Your destination</Text>

      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 14}}>To</Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{address}</Text>
        </View>
      </CardButton>

      <Text style={styles.subtitle}>Chosen transport</Text>
      <CardButton>
        <Text style={{fontWeight: 'bold'}}>{transport}</Text>
      </CardButton>

      <Text style={styles.subtitle}>Ride preferences</Text>
      <CardButton>
        <View style={{width: '100%'}}>
          <Text style={{marginBottom: 6}}>Number of ride partners</Text>
          <TextInput placeholder="e.g. 3-5" value={numPartners} onChangeText={setNumPartners} />

          <Text style={{marginTop: 10, marginBottom: 6}}>Preferred gender</Text>
          <View style={{flexDirection: 'row'}}>
            {['Any','Female','Male'].map(option => (
              <TouchableOpacity
                key={option}
                onPress={() => setGender(option)}
                style={[styles.pill, gender === option && styles.pillActive]}
              >
                <Text style={[styles.pillText, gender === option && styles.pillTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{marginTop: 10, marginBottom: 6}}>Preferred department</Text>
          <TextInput placeholder="e.g. CSE" value={department} onChangeText={setDepartment} />

          <Text style={{marginTop: 10, marginBottom: 6}}>Other</Text>
          <View style={styles.textArea}>
            <TextInput placeholder="Additional notes" value={otherNotes} onChangeText={setOtherNotes} multiline />
          </View>
        </View>
      </CardButton>

      <TouchableOpacity style={styles.primaryCta} onPress={() => router.push({ 
        pathname: '/rideCreated', 
        params: { 
          address, 
          transport,
          numPartners,
          gender,
          department,
          otherNotes
        } 
      })}>
        <Text style={styles.primaryCtaText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 10, backgroundColor: '#f7f7f7' },
  title: { fontWeight: 'bold', fontSize: 22, marginTop: 15 },
  subtitle: { fontWeight: 'bold', fontSize: 18, marginTop: 20, marginBottom: 6 },
  primaryCta: { marginTop: 10, padding: 16, borderRadius: 14, backgroundColor: '#1f1f1f', alignItems: 'center' },
  primaryCtaText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  pill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: '#000', marginRight: 8, backgroundColor: '#fff' },
  pillActive: { backgroundColor: '#1f1f1f', borderColor: '#1f1f1f' },
  pillText: { fontSize: 14 },
  pillTextActive: { color: '#fff', fontWeight: 'bold' },
  textArea: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#000', padding: 6, minHeight: 90 },
})




