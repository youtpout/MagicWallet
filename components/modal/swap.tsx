
import React from 'react';
import { Share, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { HStack, IconButton, VStack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from '../style';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';

export default function Swap({ address, close }): JSX.Element {

    const shareAddress = async () => {

        await Share.share({ message: address });
    };

    const copyAddress = async () => {
        let result = await Clipboard.setStringAsync(address);
        Toast.show('Address copied', {
            duration: Toast.durations.SHORT,
        });
    };

    return (
        <View style={{ position: 'absolute', bottom: 0, height: '50%', backgroundColor: '#eeeeee', width: '100%' }}>
            <HStack style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{paddingLeft: 50, flex: 1, alignItems: 'center', justifyContent: 'center', }}>
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

