import { View, Text } from 'react-native';
import React from 'react';
import { SIZES } from '../../constants';

export default function ViewBox1({ data, text }) {
    return (
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <View style={{ width: 70 }}>
                <Text style={{ color: '#000', fontSize: 14, fontWeight: '600' }}>{text}:</Text>
            </View>
            <View style={{ width: SIZES.width - 110 }}>
                <Text style={{ color: '#000', fontSize: 14, marginLeft: 6 }}>{data}</Text>
            </View>
        </View>
    )
}