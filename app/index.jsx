import { StyleSheet, View } from 'react-native'
import { StyledText as Text } from '../components/StyledText'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BashayJabo</Text>

      <Link href="/dash">
        <Text>Dashboard</Text>
      </Link>
    </View>
  ) 
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 20
  }
})