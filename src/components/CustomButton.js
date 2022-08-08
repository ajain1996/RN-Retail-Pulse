import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../constants';
import CustomTextComponent from './CustomTextComponent';

export default function CustomButton({
    text, bgColor, textColor,
    fs, fw, width, height,
    icon, onPress, iconColor,
    borderWidth
}) {
    if (!borderWidth) {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={[styles.submit_btn, {
                        backgroundColor: bgColor,
                        width: width, height: height,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }]}
                    activeOpacity={0.8} onPress={onPress}
                >
                    {icon ? <Entypo name={icon} color={iconColor} size={18} /> : <></>}
                    {icon ? <View style={{ width: 8 }} /> : <></>}
                    <CustomTextComponent
                        fs={fs} text={text}
                        textColor={textColor}
                        fw={fw}
                    />
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={[styles.submit_btn, {
                        backgroundColor: COLORS.transparent,
                        width: width, height: height,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1, borderColor: bgColor,
                    }]}
                    activeOpacity={0.8} onPress={onPress}
                >
                    {icon ? <Entypo name={icon} color={iconColor} size={18} /> : <></>}
                    {icon ? <View style={{ width: 8 }} /> : <></>}
                    <CustomTextComponent
                        fs={fs} text={text}
                        textColor={textColor}
                        fw={fw}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    submit_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
});

