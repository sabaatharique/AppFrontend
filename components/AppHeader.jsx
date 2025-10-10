import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText as Text } from './StyledText';
import React from 'react';

const DashboardHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', color: '#e63e4c'}}>BashayJabo</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text>⚙️</Text>
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
    fontSize: 16
  },
  button: {
    marginLeft: 20,
  },
});
