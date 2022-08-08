import React from 'react';
import { View, Text } from 'react-native';

export default function CustomTextComponent({
    text, fs, fw, textAlign, textColor, width, lineHeight
}) {
    return (
        <Text
            style={{
                fontSize: fs, color: textColor,
                fontWeight: fw, textAlign: textAlign,
                fontFamily: 'lucida grande',
                width: width, lineHeight: lineHeight,
            }}
        >
            {text}
        </Text>
    )
}
