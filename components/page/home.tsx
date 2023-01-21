import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Magic } from '@magic-sdk/react-native-expo';
import React, { useEffect, useState } from 'react';
import { API_KEY } from '@env';
import { styles } from '../../style';
import Toast from 'react-native-root-toast';
import { magic } from '../../magic';
import { Stack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


export default function Home({ navigation }): JSX.Element {


    useEffect(() => {
        redirectOnLoggin();
    }, [navigation]);

    const redirectOnLoggin = async () => {
        try {
            let logged = await magic.user.isLoggedIn();
            if (logged) {
                navigation.navigate('Wallet');
            } else {
                navigation.navigate('Login');
            }
        } catch (error) {
            navigation.navigate('Login');
        }
    }


    return (

        <Stack fill center spacing={4}>
            <ActivityIndicator />
            <Text>Check Login Status</Text>

            <View style={{ marginTop: 50 }}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login page</Text>
                </Pressable>
            </View>

        </Stack>
    );
}

