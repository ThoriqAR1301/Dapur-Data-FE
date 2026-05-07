import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          router.replace('/(tabs)');
        } else {
          router.replace('/modal'); 
        }
      } catch {
        router.replace('/modal');
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark }}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="login" />
        <Stack.Screen name="portfolio/[id]" />
        <Stack.Screen name="portfolio/edit/[id]" />
        <Stack.Screen name="portfolio/add" />
        <Stack.Screen name="portfolio/success" />
        <Stack.Screen name="profile/index" />
      </Stack>
    </>
  );
}
