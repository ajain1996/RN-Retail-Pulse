import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({ navigation }) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user) {
        setTimeout(async () => {
            navigation.navigate("LoginScreen");
        }, 900);
        return (
            <SplashScreenComponent />
        );
    } else {
        setTimeout(async () => {
            navigation.navigate("HomeScreen");
        }, 900);
        return (
            <SplashScreenComponent />
        );
    }
};

const SplashScreenComponent = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flex: 1, alignSelf: 'center' }}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 34, color: '#000', fontWeight: '600' }}>Welcome</Text>
                    <Text style={{ fontSize: 18, color: '#999' }}>To the App</Text>
                </View>
            </ScrollView>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}></Text>
        </View>
    );
}
export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});