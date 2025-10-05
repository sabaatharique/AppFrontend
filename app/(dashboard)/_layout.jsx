import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import DashboardHeader from '../../components/DashHeader'

const DashboardLayout = () => {
  return (
    <Tabs 
        screenOptions={{ header: () => <DashboardHeader />, 
        headerShown: true, 
        tabBarLabelStyle: { fontFamily: 'Montserrat-Regular' } }} 
    >
      <Tabs.Screen 
        name="dash"
        options={{ title: "Dashboard" }} 
      />
      <Tabs.Screen 
        name="rides"
        options={{ title: "Ride History" }} 
      />
      <Tabs.Screen 
        name="notifs"
        options={{ title: "Notifications" }} 
      />
      <Tabs.Screen 
        name="profile"
        options={{ title: "Profile" }} 
      />
    </Tabs>
  )
}

export default DashboardLayout