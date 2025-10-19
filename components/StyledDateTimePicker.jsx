import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export function StyledDateTimePicker({ text = 'Select date & time', value, mode = 'time', onChange, style, textStyle }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = (date) => {
    setIsVisible(false);
    onChange(date);
  };

  function formatDate(date, mode) {
    if (!date) return null;
    if (mode === 'time') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (mode === 'date') {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } else if (mode === 'datetime') {
      const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      return `${dateString}, ${timeString}`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const formatted = formatDate(value, mode);

  return (
    <View style={style}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => setIsVisible(true)}
      >
        {formatted ? (
          <View style={{flexDirection: 'row'}}>
          <Ionicons style={{marginRight: 10}} name="calendar-outline" size={24} color="#fff" /> 
          <Text style={[styles.buttonText, textStyle]}>{formatted}</Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
          <Ionicons style={{marginRight: 10}} name="calendar-outline" size={24} color="#fff" /> 
          <Text style={[styles.buttonText, textStyle]}>{text}</Text>
          </View>
        )}
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        date={value || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e63e4c',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderColor: '#000000',
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});
