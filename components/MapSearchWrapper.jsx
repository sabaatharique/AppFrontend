import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { StyledSearchBar as TextInput } from './StyledSearchBar'
import { StyledText as Text } from './StyledText'
import Octicons from '@expo/vector-icons/Octicons'
import Entypo from '@expo/vector-icons/Entypo'


const INITIAL_REGION = {
  latitude: 23.809741182039073,
  longitude: 90.41419583604615,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
}

export default function MapSearch({ 
  onStartSelected, 
  onDestinationSelected, 
  onPlaceSelected,
  startQuery, 
  destinationQuery,
  style, 
  placeholder,
  allowBoth = false 
}) {
  const mapRef = useRef(null)
  const [startQueryState, setStartQuery] = useState(startQuery || '')
  const [destinationQueryState, setDestinationQuery] = useState(destinationQuery || '')
  const [activeField, setActiveField] = useState('start')
  const [selectedStart, setSelectedStart] = useState(null)
  const [selectedDestination, setSelectedDestination] = useState(null)
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
    if (startQuery) {
      setStartQuery(startQuery)
    }
  }, [startQuery])

  useEffect(() => {
    if (destinationQuery) {
      setDestinationQuery(destinationQuery)
    }
  }, [destinationQuery])

  const currentQuery = activeField === 'start' ? startQueryState : destinationQueryState

  useEffect(() => {
    if (currentQuery.trim().length < 2 || !sessionToken) {
      setSuggestions([])
      return
    }

    const timeout = setTimeout(async () => {
      setIsLoading(true)
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        currentQuery
      )}&key=${apiKey}&components=country:bd&sessiontoken=${sessionToken}`

      const resp = await fetch(url)
      const json = await resp.json()
      setSuggestions(json?.predictions || [])
      setIsLoading(false)
    }, 350)

    return () => clearTimeout(timeout)
  }, [currentQuery, sessionToken])

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      const resp = await fetch(url)
      const json = await resp.json()
      
      if (json.results && json.results.length > 0) {
        const result = json.results[0]
        return {
          name: result.formatted_address.split(',')[0],
          formatted_address: result.formatted_address,
          geometry: {
            location: {
              lat: latitude,
              lng: longitude
            }
          }
        }
      }
      return null
    } catch (err) {
      console.error('Reverse geocoding error:', err)
      return null
    }
  }

  const handleSelect = async (place) => {
    try {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=geometry,name,formatted_address&key=${apiKey}&sessiontoken=${sessionToken}`
      const resp = await fetch(detailsUrl)
      const json = await resp.json()
      const loc = json.result.geometry.location

      const placeData = {
        name: json.result.name,
        address: json.result.formatted_address,
        latitude: loc.lat,
        longitude: loc.lng,
      }

      const placeResult = {
        name: json.result.name,
        formatted_address: json.result.formatted_address,
        geometry: {
          location: {
            lat: loc.lat,
            lng: loc.lng
          }
        }
      }

      if (allowBoth) {
        if (activeField === 'start') {
          setSelectedStart(placeData)
          setStartQuery(place.description)
          onStartSelected?.(placeResult)
        } else {
          setSelectedDestination(placeData)
          setDestinationQuery(place.description)
          onDestinationSelected?.(placeResult)
        }
      } else {
        // For backward compatibility - single selection mode
        setSelectedStart(placeData)
        setStartQuery(place.description)
        onPlaceSelected?.(placeResult)
        onStartSelected?.(placeResult)
      }

      // Center map on selected location
      const region = {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      mapRef.current?.animateToRegion(region, 500)
      
      setShowSuggestions(false)
      setSessionToken(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleMapPress = async (event) => {
    if (!allowBoth) return // Only allow map selection when in dual mode
    
    const { latitude, longitude } = event.nativeEvent.coordinate
    const placeResult = await reverseGeocode(latitude, longitude)
    
    if (placeResult) {
      const placeData = {
        name: placeResult.name,
        address: placeResult.formatted_address,
        latitude: latitude,
        longitude: longitude,
      }

      if (activeField === 'start') {
        setSelectedStart(placeData)
        setStartQuery(placeResult.formatted_address)
        onStartSelected?.(placeResult)
      } else {
        setSelectedDestination(placeData)
        setDestinationQuery(placeResult.formatted_address)
        onDestinationSelected?.(placeResult)
      }

      // Center map on selected location
      const region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      mapRef.current?.animateToRegion(region, 500)
    }
  }

  return (
    <View style={[{backgroundColor: '#f7f7f7'}, style]}>
      <View style={styles.mapWrapper}>
        <MapView 
          ref={mapRef} 
          style={styles.map} 
          initialRegion={INITIAL_REGION}
          onPress={allowBoth ? handleMapPress : undefined}
        >
          {selectedStart && (
            <Marker
              coordinate={{
                latitude: selectedStart.latitude,
                longitude: selectedStart.longitude,
              }}
              title={selectedStart.name}
              description={selectedStart.address}
              pinColor="orange"
            />
          )}
          {selectedDestination && (
            <Marker
              coordinate={{
                latitude: selectedDestination.latitude,
                longitude: selectedDestination.longitude,
              }}
              title={selectedDestination.name}
              description={selectedDestination.address}
              pinColor="#e63e4c"
            />
          )}
        </MapView>
        
        {allowBoth ? (
          <>
            <View style={styles.searchBar}>
              <Octicons name="dot-fill" size={20} color="#e63e4c" style={{marginRight: 5}} />
              <TextInput
                style={[{flex: 1}, styles.shadow]}
                placeholder="Starting point"
                value={startQueryState}
                onFocus={() => setActiveField('start')}
                onChangeText={(t) => {
                  setStartQuery(t)
                  if (!sessionToken) {
                    setSessionToken(uuidv4())
                  }
                  setShowSuggestions(true)
                  setActiveField('start')
                }}
              />
            </View>
            
            <View style={[styles.searchBar, {top: 75}]}>
              <Entypo name="location-pin" size={20} color="#e63e4c" style={{marginRight: 5}}  />
              <TextInput
                style={[{flex: 1}, styles.shadow]}
                placeholder="Destination"
                value={destinationQueryState}
                onFocus={() => setActiveField('destination')}
                onChangeText={(t) => {
                  setDestinationQuery(t)
                  if (!sessionToken) {
                    setSessionToken(uuidv4())
                  }
                  setShowSuggestions(true)
                  setActiveField('destination')
                }}
              />   
            </View>
          </>
        ) : (
          <View style={styles.searchBar}>
            <Octicons name="dot-fill" size={20} color="#e63e4c" style={{marginRight: 5}} />
            <TextInput
              style={{flex: 1}}
              placeholder={placeholder || "Starting point"}
              value={startQueryState}
              onChangeText={(t) => {
                setStartQuery(t)
                if (!sessionToken) {
                  setSessionToken(uuidv4())
                }
                setShowSuggestions(true)
              }}
            />
          </View>
        )}
      </View>

      {showSuggestions && (
        <View style={[
          styles.suggestionOverlay, 
          allowBoth && { top: activeField === 'start' ? 73 : 125 }
        ]}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  mapWrapper: {
    width: '100%',
    aspectRatio: 0.55,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  suggestionOverlay: {
    position: 'absolute',
    top: 73, 
    left: 45,
    right: 20,
    zIndex: 1,
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
