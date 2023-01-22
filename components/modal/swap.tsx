
import React, { useState } from 'react';
import { Keyboard, Modal, Pressable, Share, Text, TouchableWithoutFeedback, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { HStack, IconButton, VStack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from '../../style';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { ethers } from 'ethers';
import { magic } from '../../magic';
import routerAbi from '../..//models/routerv2-abi.json';
import erc20Abi from '../..//models/erc20-abi.json';
import { UniswapV2Router02 } from '../../models/@uniswap/v2-periphery/contracts';
import { IERC20 } from '../../models/@uniswap/v2-periphery/contracts/interfaces';
import { TextInput } from "@react-native-material/core";

export default function Swap({ address, close }): JSX.Element {
    const [amountFrom, setAmountFrom] = useState("0.0");
    const [amountTo, setAmountTo] = useState("0.0");
    const [isAllow, setIsAllow] = useState(true);
    const [disableSwap, setDisableSwap] = useState(false);
    const [inversed, setInversed] = useState(false);

    const routerV2Address = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
    const wethAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";
    const principalName = 'Matic';
    const erc20Name = 'Weth';
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    const signer = provider.getSigner();
    const router = new ethers.Contract(routerV2Address, routerAbi, signer) as UniswapV2Router02;

    const getAllowance = async (tokenAddress: string) => {
        const erc20 = new ethers.Contract(tokenAddress, erc20Abi, signer) as IERC20;
        const allowance = await erc20.allowance(address, routerV2Address);
        const decimal = await erc20.decimals();
        const oneToken = ethers.BigNumber.from(10).pow(decimal);
        const ratio = ethers.utils.parseEther("1").div(oneToken);
        const tokenAmount = ethers.utils.parseEther(amountFrom).div(ratio);
        const canSwap = allowance.gte(tokenAmount);
        setIsAllow(canSwap);
    };


    const swap = async () => {
        setDisableSwap(true);
        try {
            // const ether = ethers.utils.parseEther(amount);
            // const correct = ethers.utils.getAddress(to);
            // if (correct && !ether.isZero()) {
            //     const tx = {
            //         from: address,
            //         to: er,
            //         value: ethers.utils.parseEther(amount)
            //     }

            //     let result = await signer.sendTransaction(tx);

            //     Toast.show('Transaction sent ' + result.hash, {
            //         duration: Toast.durations.SHORT, position: Toast.positions.CENTER
            //     });
            // } else {
            //     Toast.show('Incorrect data for the transaction', {
            //         duration: Toast.durations.SHORT, position: Toast.positions.CENTER
            //     });
            // }

        } catch (error) {
            Toast.show('' + error, {
                duration: Toast.durations.SHORT, position: Toast.positions.CENTER
            });
        }
        finally {
            setDisableSwap(false);
        }

    };

    const invert = async () => {
        setInversed(!inversed);
    }


    return (
        <Modal animationType="slide" onRequestClose={close} transparent={true} >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={{ position: 'absolute', bottom: 0, height: '80%', backgroundColor: '#eeeeee', width: '100%' }}>
                    <HStack style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ paddingLeft: 50, flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ fontSize: 22 }}>Swap</Text>
                        </View>
                        <IconButton onPress={() => close()} icon={props => <Icon name="close" {...props} />} />
                    </HStack>



                    <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <TextInput
                            placeholder='to'
                            placeholderTextColor='black'
                            keyboardType='decimal-pad'
                            style={styles.inputLabel}
                            onChangeText={(text: React.SetStateAction<string>) => setAmountFrom(text?.replace(',', '.'))}
                            value={amountFrom}
                            label={inversed ? erc20Name : principalName} />
                        <VStack style={{ alignItems: 'center' }}>
                            <IconButton onPress={invert} icon={props => <Icon name="swap-vertical" {...props} />} />
                        </VStack>
                        <TextInput
                            placeholder='amount'
                            placeholderTextColor='black'
                            keyboardType='decimal-pad'
                            style={styles.inputLabel}
                            onChangeText={(text: React.SetStateAction<string>) => setAmountTo(text?.replace(',', '.'))}
                            value={amountTo}
                            label={inversed ? principalName : erc20Name}
                        />

                        <Pressable style={disableSwap ? styles.buttonDisabled : styles.button} disabled={disableSwap} onPress={swap}>
                            <Text style={styles.buttonText}>Swap</Text>
                        </Pressable>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

