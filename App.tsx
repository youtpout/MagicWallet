import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './components/login';
import { Magic } from '@magic-sdk/react-native-expo';
import React from 'react';
import { API_KEY } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import Wallet from './components/wallet';
import { styles } from './style';

console.log("api key", API_KEY)
export const magic = new Magic(API_KEY, {
  network: {
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    chainId: 80001
  }
}); // ✨
const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <magic.Relayer />
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: 'Login', headerStyle: styles.header, headerTitleStyle: styles.header, headerBackButtonMenuEnabled: false }}
            />
            <Stack.Screen
              name="Wallet"
              component={Wallet}
              options={{ title: 'Wallet', headerStyle: styles.header, headerTitleStyle: styles.header, headerBackVisible: false }}
            />
          </Stack.Navigator>

          <StatusBar style="light" />
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}