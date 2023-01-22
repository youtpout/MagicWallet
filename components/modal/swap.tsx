
import React, { useEffect, useState } from 'react';
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
import { ApprovalEvent } from '../../models/@uniswap/v2-core/contracts/UniswapV2ERC20';

export default function Swap({ address, close }): JSX.Element {
    const [amountFrom, setAmountFrom] = useState("0.0");
    const [amountTo, setAmountTo] = useState("0.0");
    const [disableAllow, setDisableAllow] = useState(false);
    const [isAllow, setIsAllow] = useState(false);
    const [disableSwap, setDisableSwap] = useState(false);
    const [inversed, setInversed] = useState(false);

    const routerV2Address = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
    const daiAddress = "0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1";
    const wMaticAddress = "0x5B67676a984807a212b1c59eBFc9B3568a474F0a";
    const principalName = 'Matic';
    const erc20Name = 'Dai';
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    const signer = provider.getSigner();
    const erc20 = new ethers.Contract(daiAddress, erc20Abi, signer) as IERC20;
    const router = new ethers.Contract(routerV2Address, routerAbi, signer) as UniswapV2Router02;


    const getAllowance = async () => {
        const allowance = await erc20.allowance(address, routerV2Address);
        console.log("allowance", allowance);
        const decimal = await erc20.decimals();
        const oneToken = ethers.BigNumber.from(10).pow(decimal);
        const ratio = ethers.utils.parseEther("1").div(oneToken);
        const tokenAmount = ethers.utils.parseEther(amountFrom).div(ratio);
        const canSwap = allowance.gte(tokenAmount);
        setIsAllow(canSwap);
    };

    const getAmountOut = async () => {
        const from = ethers.utils.parseEther(amountFrom);
        let result = [];
        if (!from.isZero()) {
            if (inversed) {
                result = await router.getAmountsOut(from, [daiAddress, wMaticAddress]);

            } else {
                console.log("amount ", from);
                result = await router.getAmountsOut(from, [wMaticAddress, daiAddress]);
            }
            let out = result[result.length - 1];
            out = out.sub(out.div(ethers.BigNumber.from(10)));
            let ether = ethers.utils.formatEther(out);
            setAmountTo(ether);
        } else {
            setAmountTo("0.0")
        }
    };

    useEffect(() => {
        // get allowance result
        const erc20 = new ethers.Contract(daiAddress, erc20Abi, signer) as IERC20;
        let filter = erc20.filters.Approval(address, daiAddress, null);
        provider.on(filter, (log, event: ApprovalEvent) => {
            getAllowance();
        });
    }, []);

    useEffect(() => {
        if (inversed) {
            getAllowance();
        } else {
            setIsAllow(true);
        }
        getAmountOut();
    }, [inversed, amountFrom])


    const swap = async () => {
        setDisableSwap(true);
        try {

            const from = ethers.utils.parseEther(amountFrom);
            const to = ethers.utils.parseEther(amountTo);
            if (!from.isZero()) {
                const deadLine = ethers.BigNumber.from("9999999999999999");
                if (inversed) {
                    let result = await router.swapExactTokensForETH(from, to, [daiAddress, wMaticAddress], address, deadLine);

                    Toast.show('Transaction sent ' + result.hash, {
                        duration: Toast.durations.SHORT, position: 50
                    });
                } else {
                    let result = await router.swapExactETHForTokens(to, [wMaticAddress, daiAddress], address, deadLine, { value: from });

                    Toast.show('Transaction sent ' + result.hash, {
                        duration: Toast.durations.SHORT, position: 50
                    });
                }

            } else {
                Toast.show('Incorrect data for the transaction', {
                    duration: Toast.durations.SHORT, position: 50
                });
            }

        } catch (error) {
            Toast.show('' + error, {
                duration: Toast.durations.SHORT, position: 50
            });
        }
        finally {
            setDisableSwap(false);
        }

    };

    const invert = async () => {
        setInversed(!inversed);
    }

    const approve = async () => {
        setDisableAllow(true);
        try {
            Toast.show('Weth will be approve to uniswap router', {
                duration: Toast.durations.SHORT, position: 50
            });
            const approveAmount = ethers.utils.parseEther("100000");

            let result = await erc20.approve(routerV2Address, approveAmount);
            Toast.show('Weth approved transaction ' + result.hash, {
                duration: Toast.durations.SHORT, position: 50
            });

        } catch (error) {
            Toast.show('' + error, {
                duration: Toast.durations.SHORT, position: 50
            });
        }
        finally {
            setDisableAllow(false);
        }

    };

    return (
        <Modal animationType="slide" onRequestClose={close} transparent={true} >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.modalView}>
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

                        <Pressable style={disableAllow || isAllow ? styles.buttonDisabled : styles.button} disabled={disableSwap} onPress={approve}>
                            <Text style={styles.buttonText}>Approve</Text>
                        </Pressable>
                        <Pressable style={disableSwap || !isAllow ? styles.buttonDisabled : styles.button} disabled={disableSwap} onPress={swap}>
                            <Text style={styles.buttonText}>Swap</Text>
                        </Pressable>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

