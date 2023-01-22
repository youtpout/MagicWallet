
import React, { useState } from 'react';
import { Share, Text, View } from 'react-native';
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

export default function Swap({ address, close }): JSX.Element {
    const [amountFrom, setAmountFrom] = useState("0.0");
    const [amountTo, setAmountTo] = useState("0.0");
    const [isAllow, setIsAllow] = useState(true);

    const routerV2Address = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
    const wethAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";
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

    return (
        <View style={{ position: 'absolute', bottom: 0, height: '50%', backgroundColor: '#eeeeee', width: '100%' }}>
            <HStack style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ paddingLeft: 50, flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 22 }}>Swap</Text>
                </View>
                <IconButton onPress={() => close()} icon={props => <Icon name="close" {...props} />} />
            </HStack>



            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Will Be implemented </Text>
            </View>

        </View>
    );
}

