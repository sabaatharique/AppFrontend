import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { StyledText as Text } from '../../components/StyledText';
import { StyledCardButton as CardButton } from '../../components/StyledCardButton';
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView';
import { StyledTitle as Title } from '../../components/StyledTitle';
import { StyledSearchBar as TextInput } from '../../components/StyledSearchBar';
import { StyledButton as Button } from '../../components/StyledButton';
import { StyledBorderText as BorderText} from '../../components/StyledBorderText';
import { StyledDateTimePicker } from '../../components/StyledDateTimePicker';
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { Link } from 'expo-router';
import rides from '../../data/rideData.json';
import React, { useState, useEffect } from 'react';

const SearchRides = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedRides, setDisplayedRides] = useState(rides);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Title>Search starting point</Title>

          <TextInput
            placeholder="Enter location..."
            value={start}
            onChangeText={setStart}
          />

    </ScrollView>
  );
};

export default SearchRides;

const styles = StyleSheet.create({
  dropdownContainer: {
    borderColor: '#2a2a2a',
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    marginVertical: 8,
    alignContent: 'flex-start',
    width: '100%',
  }
});
