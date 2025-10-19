import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView'
import { useRouter } from 'expo-router'
import { StyledSearchBar as TextInput } from '../../components/StyledSearchBar'
import { StyledText as Text } from '../../components/StyledText'
import { StyledCardButton as CardButton } from '../../components/StyledCardButton'
import rides from '../../data/rideData.json'

const INITIAL_REGION = {
  latitude: 23.8103,
  longitude: 90.4125,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function CreateRide() {
  const mapRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const placesApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [apiSuggestions, setApiSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: INITIAL_REGION.latitude, lng: INITIAL_REGION.longitude });
  const sessionTokenRef = useRef(null);

  const suggestions = [
    {
      name: 'Motijheel AG Colony',
      address: 'Motijheel, Dhaka',
      latitude: 23.7361,
      longitude: 90.4177,
    },
    {
      name: 'Gulshan 2 Circle',
      address: 'Gulshan, Dhaka',
      latitude: 23.7925,
      longitude: 90.4078,
    },
    {
      name: 'Dhanmondi 27',
      address: 'Dhanmondi, Dhaka',
      latitude: 23.7465,
      longitude: 90.3742,
    },
    {
      name: 'Uttara Sector 7 Park',
      address: 'Uttara, Dhaka',
      latitude: 23.8697,
      longitude: 90.3943,
    },
  ];

  const filtered = suggestions.filter(s =>
    (s.name + ' ' + s.address).toLowerCase().includes(query.toLowerCase())
  );

  const onPlaceSelected = (data, details) => {
    if (!details?.geometry?.location) return;
    const { lat, lng } = details.geometry.location;
    const region = { latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 };
    setSelectedPlace({
      name: details.name || data.description,
      address: details.formatted_address || data.description,
      latitude: lat,
      longitude: lng,
    });
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 500);
    }
  };

  useEffect(() => {
    let active = true;
    if (!isSearching || !placesApiKey || query.trim().length < 2) {
      setApiSuggestions([]);
      return () => { active = false; };
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        setIsLoadingSuggestions(true);
        setSuggestionsError(null);
        if (!sessionTokenRef.current) {
          sessionTokenRef.current = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        }
        const params = new URLSearchParams({
          input: query,
          types: 'address',
          language: 'en',
          location: `${mapCenter.lat},${mapCenter.lng}`,
          radius: '20000',
          components: 'country:bd',
          key: placesApiKey,
          sessiontoken: sessionTokenRef.current,
        });
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`;
        const resp = await fetch(url, { signal: controller.signal });
        const json = await resp.json();
        if (!active) return;
        setApiSuggestions(Array.isArray(json?.predictions) ? json.predictions : []);
      } catch (e) {
        if (!active) return;
        setSuggestionsError('Failed to load suggestions');
      } finally {
        if (active) setIsLoadingSuggestions(false);
      }
    }, 350);
    return () => {
      active = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query, isSearching, placesApiKey, mapCenter.lat, mapCenter.lng]);

  return (
    <ScrollView>
      <Text style={styles.title}>Search your destination</Text>

      {!isSearching && (
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => { setIsSearching(true); setShowSuggestions(false); setSelectedPlace(null); setQuery(''); }}
        >
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      )}

      {isSearching && (
        <TextInput
          placeholder="Enter destination..."
          value={query}
          onChangeText={(text) => { setQuery(text); setShowSuggestions(true); }}
        />
      )}

      {isSearching && showSuggestions && (
        <View style={styles.suggestionList}>
          {!placesApiKey && (
            <View style={styles.suggestionItem}><Text>Missing EXPO_PUBLIC_GOOGLE_MAPS_API_KEY</Text></View>
          )}
          {placesApiKey && isLoadingSuggestions && (
            <View style={styles.suggestionItem}><Text>Loading...</Text></View>
          )}
          {placesApiKey && !isLoadingSuggestions && suggestionsError && (
            <View style={styles.suggestionItem}><Text>{String(suggestionsError)}</Text></View>
          )}
          {placesApiKey && !isLoadingSuggestions && !suggestionsError && apiSuggestions.slice(0, 5).map((item, idx) => (
            <TouchableOpacity
              key={item.place_id || idx}
              style={styles.suggestionItem}
              onPress={async () => {
                try {
                  setShowSuggestions(false);
                  setQuery(item.structured_formatting?.main_text || item.description || '');
                  if (!placesApiKey || !item.place_id) return;
                  const detailsParams = new URLSearchParams({
                    place_id: item.place_id,
                    fields: 'geometry,name,formatted_address',
                    key: placesApiKey,
                    sessiontoken: sessionTokenRef.current || '',
                  });
                  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?${detailsParams.toString()}`;
                  const resp = await fetch(detailsUrl);
                  const json = await resp.json();
                  const details = json?.result;
                  if (details?.geometry?.location) {
                    onPlaceSelected({ description: item.description }, details);
                    sessionTokenRef.current = null;
                  }
                } catch (e) {
                  console.warn('Place details fetch error:', e);
                }
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>
                {item.structured_formatting?.main_text || item.description}
              </Text>
              {!!item.structured_formatting?.secondary_text && (
                <Text style={{ color: '#666' }}>{item.structured_formatting.secondary_text}</Text>
              )}
            </TouchableOpacity>
          ))}
          {placesApiKey && !isLoadingSuggestions && !suggestionsError && apiSuggestions.length === 0 && (
            <View style={styles.suggestionItem}><Text>No matches</Text></View>
          )}
        </View>
      )}

      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={INITIAL_REGION}
          onRegionChangeComplete={(region) => {
            setMapCenter({ lat: region.latitude, lng: region.longitude });
          }}
          onPress={async (e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          try {
            const resp = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${placesApiKey}`
            );
            const json = await resp.json();
            const result = json.results?.[0];
            setSelectedPlace({
              name: result?.formatted_address || 'Pinned location', // Use formatted_address for name
              address: result?.formatted_address || 'Unknown address',
              latitude,
              longitude,
            });
            mapRef.current?.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }, 500);
          } catch (err) {
            setSelectedPlace({
              name: 'Pinned location',
              address: 'Unknown address',
              latitude,
              longitude,
            });
          }
        }}
        >
          {selectedPlace && (
            <Marker
              coordinate={{ latitude: selectedPlace.latitude, longitude: selectedPlace.longitude }}
              title={selectedPlace.name}
              description={selectedPlace.address}
            />
          )}
        </MapView>
      </View>

      {!isSearching && (
        <>
          <Text style={styles.subtitle}>Your Previous Rides</Text>
          {rides.map((ride, index) => (
            <CardButton key={index}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '70%'}}>
                  <Text style={{fontWeight: 'bold'}}>{ride.destination}</Text>
                  <Text style={{color: '#666'}}>{ride.date.day} • {ride.date.time}</Text>
                  <Text style={{color: '#666'}}>{ride.transport}</Text>
                </View>
                <View style={{width: '30%', alignItems: 'flex-end'}}>
                  <Text>👤</Text>
                  <Text style={{fontWeight: 'bold'}}>{ride.creator.name}</Text>
                  <Text style={{color: '#888'}}>{ride.creator.handle}</Text>
                </View>
              </View>
            </CardButton>
          ))}
        </>
      )}

      {isSearching && selectedPlace && (
        <View style={{ width: '100%' }}>
          <TouchableOpacity
            style={styles.primaryCta}
            onPress={() => router.push({ pathname: '/chooseTransport', params: { name: selectedPlace.name, address: selectedPlace.address } })}
          >
            <Text style={styles.primaryCtaText}>Next</Text>
          </TouchableOpacity>
        </View>
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
  searchInput: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#000000',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  autocompleteList: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  suggestionList: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000000',
    marginTop: -10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  suggestionItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mapWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 500,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#e6e6e6',
    marginTop: 10,
  },
  map: {
    width: '100%',
    height: '100%',
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
})


