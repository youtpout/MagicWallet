import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Magic } from '@magic-sdk/react-native-expo';
import React, { useState } from 'react';
import { API_KEY } from '@env';

console.log("api key", API_KEY)
const m = new Magic(API_KEY); // ✨

export default function Login() {
    const [email, setEmail] = useState("");
    const onPressLearnMore = async () => {
        if (email) {
            await m.auth.loginWithEmailOTP({ email });
        }
    };
    return (

        <View style={styles.container}>
            <Text>Please sign up or login</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Button title="Login" onPress={onPressLearnMore}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },
});
