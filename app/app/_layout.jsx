import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import React from 'react';
import DashboardHeader from '../components/AppHeader';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Layout = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs 
        screenOptions={{
                    header: () => <DashboardHeader />,
                    headerShown: true,
                    tabBarLabelStyle: { fontFamily: 'Montserrat-SemiBold', fontSize: 10},
                    tabBarStyle: {
                      borderRadius: 30,
                      position: 'absolute',
                      bottom: 0,
                      left: 20,
                      right: 20,
                      elevation: 0,
                      backgroundColor: '#ffffff',
                      height: 100,
                    },
                    tabBarActiveTintColor: '#e63e4c',
                    tabBarInactiveTintColor: '#000000',
                }}    >
      <Tabs.Screen 
        name="(dashboard)/dash"
        options={{ 
          title: "Dashboard",
          tabBarIcon: ({ color }) => ( 
            <Entypo name="home" color={color} size={22} />    
          ),       
        }} 
      ></Tabs.Screen>
      <Tabs.Screen 
        name="(dashboard)/rides"
        options={{ 
          title: "Ride Status",
          tabBarIcon: ({ color }) => ( 
            <FontAwesome name="car" color={color} size={18} />    
          ),       
        }} 
      ></Tabs.Screen>
      <Tabs.Screen 
        name="(dashboard)/notifs"
        options={{ 
          title: "Notifications",
          tabBarIcon: ({ color }) => ( 
            <Ionicons name="notifications" color={color} size={20} />    
          ),       
        }} 
      ></Tabs.Screen>
      <Tabs.Screen 
        name="(dashboard)/profile"
        options={{ 
          title: "Profile",
          tabBarIcon: ({ color }) => ( 
            <Ionicons name="person" color={color} size={20} />    
          ),       
        }} 
      ></Tabs.Screen>
      {/* hide from tabs */}
      <Tabs.Screen
        name="(joinRide)/availableRides"
        options={{ href: null}}
      />
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(dashboard)/ride/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(joinRide)/ride/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="user/[handle]"
        options={{ href: null }}
      />
    </Tabs>
  );
}

export default Layout;