import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { COLORS, SIZES } from '../constants';
import CustomHeader from '../components/CustomHeader';
import { launchCamera, launchImageLibrary } from "react-native-image-picker"

export default function SelectStoryScreen({ navigation }) {

    React.useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', () => {
                setImageSource({});
            });
            return unsubscribe;
        })()
    }, [navigation]);

    const [imageSource, setImageSource] = useState({});

    const selectGaleryFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                setImageSource({});
                let source = { uri: res.assets[0].uri };
                setImageSource(source);
                console.log('\n\n Image Pickerrrrr', res.assets[0]);
                navigation.navigate("UploadImageScreen", {
                    imageSource: source,
                    file: res.assets[0].uri
                });
            }
        });
    };

    const cameraLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchCamera(options, (res) => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                setImageSource({});
                let source = { uri: res.assets[0].uri };
                setImageSource(source);
                navigation.navigate("UploadImageScreen", {
                    imageSource: source,
                    file: res.assets[0].uri
                });
            }
        });
    }


    return (
        <View style={{ ...styles.container }}>
            <CustomHeader title="Selected Story" navigation={navigation} backBtn={true} />

            <View style={{ paddingHorizontal: 16, justifyContent: 'space-between', height: SIZES.height / 1.1 }}>

                <View style={{ height: 20 }} />

                <View style={{ width: SIZES.width - 40, height: SIZES.width - 40 }}>
                    {/* <Image
                        source={imageSource} resizeMode="contain"
                        style={{ width: "100%", height: "100%" }}
                    /> */}
                </View>

                <View>
                    <CustomButton
                        fs={16} text={"Open Galary"} fw={"600"}
                        textColor={COLORS.white}
                        bgColor={COLORS.primary}
                        width={"100%"} height={50}
                        onPress={() => { selectGaleryFile() }}
                    />

                    <View style={{ height: 8 }} />

                    <CustomButton
                        fs={16} text={"Open Camera"} fw={"600"}
                        textColor={COLORS.white}
                        bgColor={COLORS.blue}
                        width={"100%"} height={50}
                        onPress={() => { cameraLaunch() }}
                    />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%', height: SIZES.height,
        backgroundColor: '#fff',
        paddingBottom: 20
    }
});
