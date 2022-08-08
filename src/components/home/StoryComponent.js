import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import ViewBox1 from './ViewBox1';
import { SIZES } from '../../constants';

export default function StoryComponent({ data, navigation }) {
    return (
        <TouchableOpacity
            style={{ ...styles.container }} activeOpacity={1}
            onPress={() => { navigation.navigate("SelectStoryScreen") }}
        >
            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>{data[1].name}</Text>
            <ViewBox1 data={data[1].address} text="ADDRESS" />
            <ViewBox1 data={data[1].area} text="AREA" />
            <ViewBox1 data={data[1].route} text="ROUTE" />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: SIZES.width - 20,
        backgroundColor: '#fff',
        elevation: 8,
        shadowColor: '#999',
        marginTop: 8,
        padding: 8,
    }
});
