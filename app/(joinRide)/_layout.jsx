import React from 'react'
import { Stack } from 'expo-router'
import DashboardHeader from '../../components/AppHeader'

const JoinRideLayout = () => {
  return (
    <Stack 
        screenOptions={{ header: () => <DashboardHeader />, 
        headerShown: true
        }} 
    />
  )
}

export default JoinRideLayout