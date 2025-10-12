import { StyleSheet, TouchableOpacity } from 'react-native';
import { StyledText as Text } from './StyledText';
import React from 'react';

export function StyledButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1f1f1f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'semibold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
});
