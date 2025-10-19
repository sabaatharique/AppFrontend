import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { StyledSearchBar as TextInput } from './StyledSearchBar'
import { StyledText as Text } from './StyledText'

const INITIAL_REGION = {
  latitude: 23.8103,
  longitude: 90.4125,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
}

export default function MapSearch({ onPlaceSelected, searchQuery, style }) {
  const mapRef = useRef(null)
  const [query, setQuery] = useState(searchQuery || '')
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [sessionToken, setSessionToken] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [searchQuery])

  useEffect(() => {
    if (query.trim().length < 2 || !sessionToken) {
      setSuggestions([])
      return
    }

    const timeout = setTimeout(async () => {
      setIsLoading(true)
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&key=${apiKey}&components=country:bd&sessiontoken=${sessionToken}`

      const resp = await fetch(url)
      const json = await resp.json()
      setSuggestions(json?.predictions || [])
      setIsLoading(false)
    }, 350)

    return () => clearTimeout(timeout)
  }, [query])

  const handleSelect = async (place) => {
    try {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=geometry,name,formatted_address&key=${apiKey}&sessiontoken=${sessionToken}`
      const resp = await fetch(detailsUrl)
      const json = await resp.json()
      const loc = json.result.geometry.location

      const region = {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }

      setSelectedPlace({
        name: json.result.name,
        address: json.result.formatted_address,
        latitude: loc.lat,
        longitude: loc.lng,
      })

      mapRef.current?.animateToRegion(region, 500)
      onPlaceSelected?.(json.result)
      setShowSuggestions(false)
      setQuery(place.description)
      setSessionToken(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={style}>
      <TextInput
        placeholder="Search location..."
        value={query}
        onChangeText={(t) => {
          setQuery(t)
          if (!sessionToken) {
            setSessionToken(uuidv4())
          }
          setShowSuggestions(true)
        }}
      />

      {showSuggestions && (
        <View style={styles.suggestionOverlay}>
          <View style={styles.suggestionList}>
            {isLoading && <Text>Loading...</Text>}
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item.place_id}
                style={styles.suggestionItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={{ fontWeight: 'semibold' }}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}


      <View style={styles.mapWrapper}>
        <MapView ref={mapRef} style={styles.map} initialRegion={INITIAL_REGION}>
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
              title={selectedPlace.name}
              description={selectedPlace.address}
            />
          )}
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 500,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#e6e6e6',
    marginTop: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  suggestionOverlay: {
    position: 'absolute',
    top: 50, 
    left: 10,
    right: 10,
    zIndex: 10,
  },
  suggestionList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 250,
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
})
