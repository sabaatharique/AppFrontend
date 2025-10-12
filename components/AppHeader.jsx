import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StyledText as Text } from './StyledText';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const DashboardHeader = () => {
  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={{ fontWeight: 'bold', color: '#e63e4c', fontSize: 16 }}>
        BashayJabo
      </Text>

      {/* Settings Button */}
      <TouchableOpacity style={styles.button}>
        {/* Icon */}
        <Ionicons name="settings-sharp" size={24} color="#ababab" />
        {/* Fallback Text */}
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#f7f7f7',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  buttonText: {
    color: '#ababab',
    marginLeft: 8,
    fontSize: 14,
  },
});
