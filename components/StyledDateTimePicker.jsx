import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export function StyledDateTimePicker({ value, mode = 'date', onChange }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = (date) => {
    setIsVisible(false);
    onChange(date);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.buttonText}>
          {value ? value.toLocaleString() : 'Select Date'}
        </Text>
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});
