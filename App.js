import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import PushController from './src/components/PushController';
import AppNavigation from './src/navigation/AppNavigation';
import PushNotification, { Importance } from "react-native-push-notification";

export default function App() {

  PushNotification.createChannel(
    {
      channelId: "your-channel-id", // (required)
      channelName: "My channel", // (required)
      importance: Importance.LOW,
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  return (
    <>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <NavigationContainer>
        <AppNavigation />
        <PushController />
      </NavigationContainer>
    </>
  )
}

