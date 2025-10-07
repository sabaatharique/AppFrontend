import { Pressable, StyleSheet } from 'react-native';

export function StyledCardButton(props) {
  return <Pressable 
    style={({pressed}) =>  [
      styles.card, 
      props.style, 
      {backgroundColor: pressed ? '#e6e6e6' : '#f7f7f7'}]}>
    {props.children}
    </Pressable>;
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
