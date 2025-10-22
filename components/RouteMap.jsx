import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const RouteMap = ({ ride }) => {
  const mapRef = useRef(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const startCoords = ride?.start?.coords ? { latitude: ride.start.coords.lat, longitude: ride.start.coords.lng } : null;
  const destCoords = ride?.destination?.coords ? { latitude: ride.destination.coords.lat, longitude: ride.destination.coords.lng } : null;

  useEffect(() => {
    if (!startCoords || !destCoords) return;

    // If polyline already exists, decode and use it directly
    if (ride.routePolyline) {
      const decoded = decodePolyline(ride.routePolyline);
      setRouteCoords(decoded);
    } else {
      // Otherwise, fetch 
      fetchDirections(startCoords, destCoords);
    }
  }, [ride]);

  const fetchDirections = async (start, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`
      );
      const json = await response.json();

      if (json.routes.length) {
        const encoded = json.routes[0].overview_polyline.points;
        const decoded = decodePolyline(encoded);
        setRouteCoords(decoded);

        // await updateRideRoute(ride.id, encoded);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  useEffect(() => {
    if (routeCoords.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(routeCoords, {
        edgePadding: { top: 320, right: 200, bottom: 300, left: 200 },
        animated: true,
      });
    }
  }, [routeCoords]);

  const decodePolyline = (t) => {
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
        {startCoords && <Marker coordinate={startCoords} title="Start" pinColor="orange" />}
        {destCoords && <Marker coordinate={destCoords} title="Destination" pinColor="#e63e4c" />}
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
    borderRadius: 250,
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
