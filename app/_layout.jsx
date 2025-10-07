import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import React from 'react';
import DashboardHeader from '../components/AppHeader';

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
                    tabBarLabelStyle: { fontFamily: 'Montserrat-Regular' },
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
        options={{ title: "Dashboard" }} 
      />
      <Tabs.Screen 
        name="(dashboard)/rides"
        options={{ title: "Ride History" }} 
      />
      <Tabs.Screen 
        name="(dashboard)/notifs"
        options={{ title: "Notifications" }} 
      />
      <Tabs.Screen 
        name="(dashboard)/profile"
        options={{ title: "Profile" }} 
      />
      {/* hide from tabs */}
      <Tabs.Screen
        name="(joinRide)/availableRides"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
    </Tabs>
  );
}

export default Layout;
