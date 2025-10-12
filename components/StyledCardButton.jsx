import { Pressable, StyleSheet } from 'react-native';

export function StyledCardButton(props) {
  const { onPress, style, children } = props;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        style,
        { backgroundColor: pressed ? '#e6e6e6' : '#f7f7f7' },
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { 
    borderRadius: 16,
    borderWidth: 1,     
    borderColor: '#000000',
    padding: 14, 
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})
