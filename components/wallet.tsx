import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Magic } from '@magic-sdk/react-native-expo';
import React, { useEffect, useState } from 'react';
import { API_KEY } from '@env';
import { styles } from '../style';
import Toast from 'react-native-root-toast';
import { magic } from '../App';

export default function Wallet({ navigation, result }): JSX.Element {

    const [address, setAddress] = useState("");
    useEffect(() => {

        getData();

    }, []);

    const getData = async () => {
        try {
            const { email, publicAddress } = await magic.user.getMetadata();
            setAddress(publicAddress);
        } catch {
            // Handle errors if required!
        }
    }

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Polygon Testnet Mumbai</Text>
            <Text>Wallet</Text>
            <Text>{address}</Text>

            <StatusBar style="light" />
        </View>
    );
}

