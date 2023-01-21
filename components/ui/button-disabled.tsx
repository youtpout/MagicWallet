
import React, { cloneElement, useEffect, useState } from 'react';
import { GestureResponderEvent, Pressable, PressableStateCallbackType, Share, StyleProp, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';

export default function ButtonDisabled(props: ButtonDisabledConfig): JSX.Element {

    return (
        <Pressable style={props.disabled ? props.styleDisable : props.styleEnable} disabled={props.disabled} onPress={props.onPress}>
            <Text style={props.disabled ? props.styleTextDisable : props.styleTextEnable}>{props.text}</Text>
        </Pressable>
    );
}

export type ButtonDisabledConfig = {
    disabled: boolean,
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined,
    styleEnable?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) | undefined,
    styleDisable?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) | undefined,
    styleTextEnable?: StyleProp<TextStyle> | undefined,
    styleTextDisable?: StyleProp<TextStyle> | undefined,
    text: string
}