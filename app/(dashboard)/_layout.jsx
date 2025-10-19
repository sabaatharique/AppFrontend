import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import React from 'react';
import DashboardHeader from '../../components/AppHeader';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Layout = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Tabs
      screenOptions={{
        header: () => <DashboardHeader />,
        headerShown: true,
        tabBarLabelStyle: { fontFamily: 'Montserrat-SemiBold', fontSize: 10 },
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
      }}
    >
      <Tabs.Screen
        name="dash"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Entypo name="home" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: 'Ride Status',
          tabBarIcon: ({ color }) => <FontAwesome name="car" size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifs"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={20} color={color} />,
        }}
      />
      <Tabs.Screen name="ride/[id]" options={{ href: null }} />
    </Tabs>
  );
};

export default Layout;
