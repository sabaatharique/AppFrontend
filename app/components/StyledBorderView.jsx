import { StyleSheet, View } from 'react-native';

export function StyledBorderView(props) {
  return <View {...props} 
    style={[styles.borderText, props.style]}>
    {props.children}
    </View>;
}

const styles = StyleSheet.create({
  borderText: {
    borderRadius: 20,
    borderWidth: 1,     
    borderColor: '#ababab',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 5,
    flex: 1
  }
})
