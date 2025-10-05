import { View } from 'react-native'
import { StyledText as Text } from '../../components/StyledText'
import React from 'react'

const UserProfile = () => {
  return (
    <View style={ {flex: 1, alignItems: 'center', justifyContent: 'center'} }>
      <Text>User Profile</Text>
    </View>
  )
}

export default UserProfile