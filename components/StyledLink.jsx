import { TouchableOpacity, Alert, Linking, StyleSheet } from 'react-native';
import { StyledText as Text } from './StyledText';
import { FontAwesome, Entypo } from '@expo/vector-icons';

export const StyledLink = ({ type, text, value, style, appUrl, webUrl, ...props }) => {
  const handlePress = async () => {
    let primaryLink = appUrl;
    let fallbackLink = webUrl;

    if (!appUrl || !webUrl) {
      switch (type) {
        case 'phone':
          primaryLink = fallbackLink = `tel:${value}`;
          break;
        case 'email':
          primaryLink = fallbackLink = `mailto:${value}`;
          break;
        case 'facebook':
          primaryLink = `fb://profile/${value}`; 
          fallbackLink = `https://www.facebook.com/${value}`;
          break;
        default:
          fallbackLink = primaryLink = value;
      }
    }

    try {
      const supported = await Linking.canOpenURL(primaryLink);
      if (supported) {
        await Linking.openURL(primaryLink);
      } else {
        await Linking.openURL(fallbackLink);
      }
    } catch (error) {
      console.warn('Error opening link:', error);
      Alert.alert('Action not supported', 'Could not open link.');
    }
  };

  return (
    <TouchableOpacity style={[styles.contactLink, style]} onPress={handlePress}>
      {type === 'phone' && <FontAwesome name="phone" size={22} color="black" style={styles.icon} />}
      {type === 'email' && <Entypo name="email" size={20} color="#888" style={styles.icon} />}
      {type === 'facebook' && <Entypo name="facebook" size={22} color="#1877f2" style={styles.icon} />}

      <Text {...props} style={[{ fontWeight: 'semibold' }, props.textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
});
