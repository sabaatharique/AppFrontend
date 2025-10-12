import { Text, StyleSheet } from 'react-native';

export function StyledText(props) {
  const { style, ...restProps } = props;
  const flattenedStyle = StyleSheet.flatten(style) || {};

  const { fontWeight, fontStyle, ...restStyle } = flattenedStyle;

  let fontFamily = 'Montserrat-Regular';
  if (fontWeight === 'bold') {
    fontFamily = 'Montserrat-Bold';
  } else if (fontWeight === 'semibold') {
    fontFamily = 'Montserrat-SemiBold';
  }

  return <Text {...restProps} style={[restStyle, { fontFamily }]} />;
}
