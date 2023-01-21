import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Magic } from '@magic-sdk/react-native-expo';
import React, { useEffect, useState } from 'react';
import { API_KEY } from '@env';
import { styles } from '../../style';
import Toast from 'react-native-root-toast';
import { magic } from '../../magic';

export default function Login({ navigation }): JSX.Element {
    const [email, setEmail] = useState("");

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const onPressLearnMore = async () => {
        if (email) {
            if (reg.test(email) === true) {
                try {

                    let result = await magic.auth.loginWithEmailOTP({ email });
                    if (result) {
                        navigation.navigate('Wallet', { result });
                    }
                } catch (error) {
                    Toast.show('' + error, {
                        duration: Toast.durations.SHORT,
                    });
                }
            }
            else {
                Toast.show('Incorrect email format.', {
                    duration: Toast.durations.SHORT,
                });
            }
        } else {
            let toast = Toast.show('Write your email first.', {
                duration: Toast.durations.SHORT,
            });

        }
    };
    return (

        <View style={styles.container}>
            <Text style={styles.title}>Please login with your email</Text>
            <TextInput
                autoComplete='email'
                placeholder='email'
                keyboardType='email-address'
                style={styles.input}
                onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
                value={email}
            />
            <Pressable style={styles.button} onPress={onPressLearnMore}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <StatusBar style="light" />
        </View>
    );
}

