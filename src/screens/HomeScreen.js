import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { stories } from '../utils/stories';
import { SIZES } from '../constants';
import StoryComponent from '../components/home/StoryComponent';
import CustomHeader from '../components/CustomHeader';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ ...styles.container }}>
            <CustomHeader title="Select a Store" backBtn={false} />

            <ScrollView style={{ paddingHorizontal: 10 }}>
                {
                    Object.entries(stories.stores).map((data, index) => {
                        return (
                            <View key={index}>
                                <StoryComponent data={data} navigation={navigation} />
                            </View>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: SIZES.height,
        backgroundColor: '#fff',
    }
});
