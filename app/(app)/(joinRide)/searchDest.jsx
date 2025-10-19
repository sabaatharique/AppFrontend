import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native' 
import { StyledTitle as Title } from '../../../components/StyledTitle'
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'
import { StyledButton as Button } from '../../../components/StyledButton'
import MapSearchWrapper from '../../../components/MapSearchWrapper'
import { useRouter } from 'expo-router'
import { useSearch } from '../../../context/SearchContext'

export default function SearchDest() {
  const router = useRouter()
  const [selectedPlace, setSelectedPlace] = useState('')
  const { setSearchData } = useSearch();

  const handlePlaceSelected = (place) => {
    setSelectedPlace(place);
    setSearchData(prevDetails => ({ ...prevDetails, destination: { name: place.formatted_address, coords: place.geometry.location } }));
  }

  return (
    <ScrollView>
      <Title>Search destination</Title>

      <MapSearchWrapper onPlaceSelected={handlePlaceSelected} searchQuery={selectedPlace?.formatted_address} style={{width: '100%'}} />

      <View style={styles.buttonRow}>
        <Button
            title='Back'
            onPress={() => router.back()}
            style={{ width: '30%' }}
          ></Button>

        {selectedPlace && (
          <Button
            style={{ width: '35%' }}
            title='Confirm'
            onPress={() =>
              router.back()
            }>
          </Button>   
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
})