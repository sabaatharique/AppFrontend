import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const RouteMap = ({ start, destination }) => {
  const mapRef = useRef(null);
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    if (start && destination) {
      fetchDirections(start, destination);
    }
  }, [start, destination]);

  const fetchDirections = async (start, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`
      );
      const json = await response.json();

      if (json.routes.length) {
        const points = decodePolyline(json.routes[0].overview_polyline.points);
        setRouteCoords(points);

        // fit map to show entire route
        mapRef.current.fitToCoordinates(points, {
          edgePadding: { top: 80, right: 50, bottom: 80, left: 50 },
          animated: true,
        });
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  // decode Google’s encoded polyline into lat/lng array
  const decodePolyline = (t, e) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < t.length) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  return (
    <View style={styles.mapWrapper}>
      <MapView ref={mapRef} style={styles.map}>
        {start && (
          <Marker coordinate={start} title="Start" pinColor="orange" />
        )}
        {destination && (
          <Marker coordinate={destination} title="Destination" pinColor="#e63e4c" />
        )}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="black" />
        )}
      </MapView>
    </View>
  );
};

export default RouteMap;

const styles = StyleSheet.create({
  mapWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 500,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#e6e6e6',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
