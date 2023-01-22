
import React, { cloneElement, useEffect, useState } from 'react';
import { Pressable, Share, Text, TextInput, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { HStack, IconButton, VStack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from '../../style';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { ethers } from 'ethers';
import { magic } from '../../magic';
import { ButtonDisabled } from '../ui/button-disabled';

export default function Send({ address, close }): JSX.Element {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    const signer = provider.getSigner();

    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("0.0");
    const [gasPrice, setGasPrice] = useState("0");
    const [disableSend, setDisableSend] = useState(false);

    const send = async () => {
        setDisableSend(true);
        try {
            const ether = ethers.utils.parseEther(amount);
            const correct = ethers.utils.getAddress(to);
            if (correct && !ether.isZero()) {
                const tx = {
                    from: address,
                    to: to,
                    value: ethers.utils.parseEther(amount)
                }

                let result = await signer.sendTransaction(tx);

                Toast.show('Transaction sent ' + result.hash, {
                    duration: Toast.durations.SHORT, position: Toast.positions.CENTER
                });
            } else {
                Toast.show('Incorrect data for the transaction', {
                    duration: Toast.durations.SHORT, position: Toast.positions.CENTER
                });
            }

        } catch (error) {
            Toast.show('' + error, {
                duration: Toast.durations.SHORT, position: Toast.positions.CENTER
            });
        }
        finally {
            setDisableSend(false);
        }

    };

    return (
        <View style={{ position: 'absolute', bottom: 0, height: '80%', backgroundColor: '#eeeeee', width: '100%' }}>
            <HStack style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ paddingLeft: 50, flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 22 }}>Send</Text>
                </View>
                <IconButton onPress={() => close()} icon={props => <Icon name="close" {...props} />} />
            </HStack>


            <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <TextInput
                    placeholder='to'
                    style={styles.inputSend}
                    onChangeText={(text: React.SetStateAction<string>) => setTo(text)}
                    value={to}
                />
                <TextInput
                    placeholder='amount'
                    keyboardType='decimal-pad'
                    style={styles.inputSend}
                    onChangeText={(text: React.SetStateAction<string>) => setAmount(text?.replace(',', '.'))}
                    value={amount}
                />

                <Pressable style={disableSend ? styles.buttonDisabled : styles.button} disabled={disableSend} onPress={send}>
                    <Text style={styles.buttonText}>Send</Text>
                </Pressable>
            </View>

        </View>
    );
}

