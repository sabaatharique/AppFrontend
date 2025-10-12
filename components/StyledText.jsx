import { Text, StyleSheet } from 'react-native';

export function StyledText(props) {
  const { style, ...restProps } = props;
  const flattenedStyle = StyleSheet.flatten(style);
  const isBold = flattenedStyle && flattenedStyle.fontWeight === 'bold';

  const { fontWeight, ...restStyle } = flattenedStyle || {};

  const fontFamily = isBold ? 'Montserrat-Bold' : 'Montserrat-Regular';

  return <Text {...restProps} style={[restStyle, { fontFamily }]} />;
}
