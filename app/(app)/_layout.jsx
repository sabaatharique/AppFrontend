import { Stack } from 'expo-router';
import { RideProvider } from '../../context/RideContext';
import { SearchProvider } from '../../context/SearchContext';
import { ThemeProvider } from '../../context/ThemeContext';

export default function AppLayout() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <RideProvider>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ride/[id]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="user/[handle]"
              options={{
                headerShown: false,
              }}
            />
          <Stack.Screen
              name="chat/chatScreen"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </RideProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}