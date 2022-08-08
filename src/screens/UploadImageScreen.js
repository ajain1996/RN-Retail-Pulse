import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants';
import { makeid } from '../utils/utils';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import BackgroundFetch from "react-native-background-fetch";
import PushNotification, { Importance } from "react-native-push-notification";

export default function UploadImageScreen({ route, navigation }) {

    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

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

    useEffect(() => {
        initBackgroundFetch();
    }, []);

    if (initializing) return null;

    async function initBackgroundFetch() {
        const onEvent = async (taskId) => {
            console.log('\n\n [BackgroundFetch] task: ', taskId);
            await uploadImage();
            console.log('\n\n [BackgroundFetch] Completed: ', taskId);
            BackgroundFetch.finish(taskId);
        }

        const onTimeout = async (taskId) => {
            console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
            BackgroundFetch.finish(taskId);
        }

        let status = await BackgroundFetch.configure({ minimumFetchInterval: 15 }, onEvent, onTimeout);

        console.log('[BackgroundFetch] configure status: ', status);
    }


    const uploadImage = async () => {
        setUploading(true);

        if (route.params.imageSource == null) {
            return null;
        }

        PushNotification.localNotification({
            channelId: "your-channel-id",
            message: "Your photo has been uploaded to Firebase Cloud Storage!", // (required)
        });

        const uploadUri = decodeURI(route.params.imageSource.uri);

        let filename = `post-image-${user.email}-${user.uid}-${makeid(40)}`;

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
        });

        try {
            await task;
            const url = await storageRef.getDownloadURL();

            setUploading(false);
            console.log("\n\n Photo uploaded!");
            PushNotification.cancelAllLocalNotifications();
            navigation.goBack();
            // Alert.alert('Photo uploaded!', "Your photo has been uploaded to Firebase Cloud Storage!", [{
            //     text: 'OK',
            //     onPress: () => { navigation.goBack() }
            // }], { cancelable: false });
            return url;

        } catch (e) {
            console.log(e);
            setUploading(false);
            return null;
        }

    };

    return (
        uploading
            ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={COLORS.primary} />
                <View style={{
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ color: '#000' }}>
                        {transferred} % Completed!
                    </Text>
                    <View style={{ width: 10 }}></View>
                    {/* <ActivityIndicator size="large" color="#fff" /> */}
                </View>
            </View>
            : <View style={{ width: '100%', height: '100%', justifyContent: 'space-between', backgroundColor: '#fff' }}>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Image
                        source={route.params.imageSource}
                        resizeMode="contain"
                        style={{ width: "94%", height: "94%", borderRadius: 12 }}
                    />
                </View>

                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <CustomButton
                        fs={16} text={"Upload Image"} fw={"600"}
                        textColor={COLORS.white}
                        bgColor={COLORS.primary}
                        width={"100%"} height={80}
                        onPress={() => { uploadImage() }}
                    />
                </View>
            </View>
    )
}