import { ScrollView, StyleSheet} from "react-native";

export function StyledScrollView(props) {
    return <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      {props.children}
    </ScrollView>;
}

const styles = StyleSheet.create({
    scrollView: {
      padding: 25,
      paddingTop: 10,
      marginBottom: 60,
      backgroundColor: '#f7f7f7',
    },
    contentContainer: {
      alignItems: 'flex-start',
      paddingBottom: 60,
    }
  });