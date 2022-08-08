import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SelectStoryScreen from "../screens/SelectStoryScreen";
import UploadImageScreen from "../screens/UploadImageScreen";

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <>
            <Stack.Navigator initialRouteName="SplashScreen"
                screenOptions={screenOptions}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="SelectStoryScreen" component={SelectStoryScreen} />
                <Stack.Screen name="UploadImageScreen" component={UploadImageScreen} />
            </Stack.Navigator>
        </>
    );
}