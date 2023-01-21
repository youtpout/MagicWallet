import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './components/page/login';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import Wallet from './components/page/wallet';
import { styles } from './style';
import Home from './components/page/home';
import { magic } from './magic';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <magic.Relayer />
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Home', headerStyle: styles.header, headerTitleStyle: styles.header, headerBackVisible: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: 'Login', headerStyle: styles.header, headerTitleStyle: styles.header, headerBackVisible: false }}
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