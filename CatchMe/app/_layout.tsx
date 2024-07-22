import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import {
// 	GOOGLE_WEB_CLIENT_ID,
// 	GOOGLE_ANDROID_CLIENT_ID,
// 	GOOGLE_IOS_CLIENT_ID,
// } from '@env';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: GOOGLE_WEB_CLIENT_ID,
  //     androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  //     iosClientId: GOOGLE_IOS_CLIENT_ID,
  //     scopes: ['profile', 'email'],
  //   });

  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
