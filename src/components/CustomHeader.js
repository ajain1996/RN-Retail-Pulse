import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CustomHeader({ title, navigation, backBtn }) {
    return (
        <View style={{ ...styles.container }}>
            {backBtn ? <TouchableOpacity activeOpacity={1} onPress={() => { navigation.goBack() }}>
                <MaterialIcons name='arrow-back-ios' size={24} color="#000" />
            </TouchableOpacity> : <></>}
            <Text style={{ fontSize: 20, color: '#000', marginLeft: 4, fontWeight: '700' }}>{title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 52,
        flexDirection: "row",
        elevation: 5,
        shadowColor: '#999',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});
