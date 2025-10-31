import React from "react";
import { ScrollView, StyleSheet} from "react-native";

export const StyledScrollView = React.forwardRef((props, ref) => {
    return <ScrollView 
      ref={ref}
      style={[styles.scrollView, props.style]} 
      contentContainerStyle={[styles.contentContainer, props.contentContainerStyle]}
      {...props}
    >
      {props.children}
    </ScrollView>;
});

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