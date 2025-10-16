import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export function StyledDateTimePicker({ value, mode = 'time', onChange, style, textStyle }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = (date) => {
    setIsVisible(false);
    onChange(date);
  };

  function formatDate(date, mode) {
    if (!date) return 'Select time & date';
    if (mode === 'time') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (mode === 'date') {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } else if (mode === 'datetime') {
      const dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      return `${dateString}, ${timeString}`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  

  return (
    <View style={style}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.buttonText}>{formatDate(value, mode)}</Text>
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
    width: '100%',
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});
