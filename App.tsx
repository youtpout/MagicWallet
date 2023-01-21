import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './components/login';
import { Magic } from '@magic-sdk/react-native-expo';
import React from 'react';
import { API_KEY } from '@env';

console.log("api key", API_KEY)
const m = new Magic(API_KEY); // ✨

export default function App() {
  return (
    <SafeAreaProvider>
      <m.Relayer />
      <Login />
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
