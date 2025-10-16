import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

export default function CustomMarker({ coordinate, color = '#e63e4c', size = 18 }) {
  return (
    <Marker coordinate={coordinate}>
      <View
        style={[
          styles.marker,
          {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});
