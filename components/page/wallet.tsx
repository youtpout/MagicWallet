import { StatusBar } from 'expo-status-bar';
import { Button, Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Magic } from '@magic-sdk/react-native-expo';
import React, { useCallback, useEffect, useState } from 'react';
import { API_KEY } from '@env';
import { styles } from '../../style';
import Toast from 'react-native-root-toast';
import { magic } from '../../magic';
import "react-native-get-random-values";
import "@ethersproject/shims";
// Import the ethers library
import { ethers } from "ethers";
import { Stack, IconButton, VStack, HStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Receive from '../modal/receive';
import Send from '../modal/send';
import Swap from '../modal/swap';

export default function Wallet({ navigation }): JSX.Element {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    const signer = provider.getSigner();

    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("0.0");
    const [showReceive, setShowReceive] = useState(false);
    const [showSend, setShowSend] = useState(false);
    const [showSwap, setShowSwap] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // get balance of the current wallet at each new block
        provider.on('block', getNewBlock);
        return function cleanup() {
            provider.removeListener('block', getNewBlock);
        };
    }, [address]);

    const getNewBlock = async (blockNumber: any) => {
        await getBalance(address);
    };

    const getBalance = async (userAddress: string) => {
        if (userAddress) {
            const amountWei= await provider.getBalance(userAddress);
            const amountEth = ethers.utils.formatEther(amountWei);
            let pos = amountEth.indexOf('.');
            if (pos + 4 < amountEth.length) {
                setBalance(amountEth.substring(0, pos + 5));
            } else {
                setBalance(amountEth);
            }
        }
    }

    const getData = async () => {
        try {
            // get current user connected from magic sdk
            const { email, publicAddress } = await magic.user.getMetadata();
            setAddress(publicAddress!);
            await getBalance(address);
        } catch {
            // Handle errors if required!
        }
    };

    const openScan = async () => {
        let url = 'https://mumbai.polygonscan.com/address/' + address;
        await Linking.openURL(url);
    }

    const closeReceive = useCallback(() => {
        setShowReceive(false);
    }, [])

    const closeSend = useCallback(() => {
        setShowSend(false);
    }, [])

    const closeSwap = useCallback(() => {
        setShowSwap(false);
    }, [])


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                paddingBottom: 50
            }}>
                <VStack style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Polygon Testnet Mumbai</Text>
                    <VStack style={{ alignItems: 'center' }}>
                        <Text style={styles.subtitle}>Wallet</Text>
                        <Pressable onPress={openScan}>
                            <Text style={{ fontSize: 15, color: '#2196F3' }}>{address}</Text>
                        </Pressable>
                    </VStack>
                    <VStack style={{ alignItems: 'center' }}>
                        <Text style={styles.subtitle}>Balance</Text>
                        <Text style={styles.balance}>{balance} Matic</Text>
                    </VStack>
                </VStack>
                <View style={{ width: '100%', marginBottom: 30, marginTop: 30, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <VStack style={{ alignItems: 'center' }}>
                        <IconButton style={styles.iconButton} onPress={() => setShowSend(true)} icon={props => <Icon name="send" {...props} />} />
                        <Text>Send</Text>
                    </VStack>
                    <VStack style={{ alignItems: 'center' }}>
                        <IconButton style={styles.iconButton} onPress={() => setShowSwap(true)} icon={props => <Icon name="swap-vertical" {...props} />} />
                        <Text>Swap</Text>
                    </VStack>
                    <VStack style={{ alignItems: 'center' }}>
                        <IconButton onPress={() => setShowReceive(true)} style={styles.iconButton} icon={props => <Icon name="qrcode" {...props} />} />
                        <Text>Receive</Text>
                    </VStack>
                </View>
                <Pressable style={styles.button} onPress={getData}>
                    <Text style={styles.buttonText}>Disconnect</Text>
                </Pressable>



                <StatusBar style="light" />
            </View>
            {showReceive && <Receive address={address} close={closeReceive}></Receive>}
            {showSend && <Send address={address} close={closeSend}></Send>}
            {showSwap && <Swap address={address} close={closeSwap}></Swap>}
        </View>
    );
}

