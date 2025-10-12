import { View, StyleSheet } from 'react-native';

export function StyledCard(props) {
  return <View {...props} 
    style={[styles.card, props.style]}>
    {props.children}
    </View>;
}

const styles = StyleSheet.create({
  card: { 
    borderRadius: 16,
    borderWidth: 1,     
    borderColor: '#000000',
    backgroundColor: '#fff',
    padding: 14, 
    marginVertical: 10,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
})
