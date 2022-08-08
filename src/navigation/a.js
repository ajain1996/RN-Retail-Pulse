import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Image, ScrollView, ToastAndroid } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/utils';
import ActionButton from '../navigation/ActionButton';
// import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { Card } from 'native-base';

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function AddPostScreen({ navigation }) {

    const { user } = useContext(AuthContext);

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);
    const [location, setLocation] = useState(null);
    const [title, setTitle] = useState(null);
    // const [location, setLocation] = useState(null);
    // const [location, setLocation] = useState(null);

    function selectImage() {
        let options = {
            title: 'You can choose one image',
            quality: 0.5,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, response => {
            // console.log({ response });

            if (response.didCancel) {
                // console.log('User cancelled photo picker');
                ToastAndroid.show('Your did not select any Image!', ToastAndroid.SHORT);
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                let image = { uri: response.uri };
                setImage(image);
                // console.log('aaaaaaaaaaaaaaaaaaa', { image });
            }
        });
    }

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        // console.log('Image Url: ', imageUrl);
        // console.log('Post: ', post);

        firestore()
            .collection('posts')
            .add({
                userId: user.uid,
                post: post,
                postImg: imageUrl,
                postLocation: location,
                postTitle: title,
                postTime: firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
                // console.log('Post Added!');
                ToastAndroid.show('Your post has been Added Successfully!', ToastAndroid.SHORT);
                // alert(
                //     'Post published!',
                //     'Your post has been published Successfully!',
                // );
                setPost(null);
                setLocation(null);
                navigation.replace("HomeScreen");
            })
            .catch((error) => {
                // console.log('Something went wrong with added post to firestore.', error);
            });
    }

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }

        const uploadUri = decodeURI(image.uri);

        let filename = `post-image-${user.email}-${user.uid}-${makeid(40)}`;

        // Add timestamp to File Name
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
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
            setImage(null);
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }

    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {image == null ? (<Card style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    paddingVertical: 24
                }}>
                    <TouchableOpacity
                        onPress={selectImage}
                        style={{
                            backgroundColor: '#5067FF',
                            borderRadius: 100,
                            width: 120, height: 120,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 22,
                            textAlign: 'center'
                        }}>Select Image</Text>
                    </TouchableOpacity>
                </Card>
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={image}
                            style={{ height: 190, width: windowWidth - 90 }}
                        />
                    </View>
                )}

                <View style={{ alignItems: 'center', marginTop: 30, }}>
                    <TextInput
                        value={title}
                        style={styles.input}
                        numberOfLines={1}
                        placeholder="Give your own title"
                        placeholderTextColor="#21242f"
                        onChangeText={(content) => setTitle(content)}
                    />
                </View>

                <View style={{ alignItems: 'center', marginTop: 20, }}>
                    <TextInput
                        value={post}
                        style={styles.input}
                        numberOfLines={1}
                        placeholder="What's on your mind ?"
                        placeholderTextColor="#21242f"
                        onChangeText={(content) => setPost(content)}
                    />
                </View>

                <View style={{ alignItems: 'center', marginVertical: 20, }}>
                    <TextInput
                        value={location}
                        style={styles.input}
                        numberOfLines={1}
                        placeholder="What's your Location"
                        placeholderTextColor="#21242f"
                        onChangeText={(content) => setLocation(content)}
                    />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={submitPost}
                        style={{
                            backgroundColor: '#5067FF', paddingHorizontal: 16,
                            padding: 16, borderRadius: 30, width: windowWidth - 30
                        }}
                    >
                        {uploading ? (
                            <View style={{
                                flexDirection: 'row', justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ color: 'white' }}>
                                    {transferred} % Completed!
                                </Text>
                                <View style={{ width: 10 }}></View>
                                <ActivityIndicator size="large" color="#fff" />
                            </View>
                        ) : (
                            <Text style={{
                                color: 'white', fontSize: 18, textAlign: 'center',
                            }}>Upload Post</Text>)}
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    text: {
        fontSize: 20,
        color: '#333333',
    },
    input: {
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#21242f',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'silver',
        height: 50,
        width: windowWidth - 30,
    },
})

// var options = {
//     title: 'Select Photo',
//     cancelButtonTitle: 'Cancel',
//     takePhotoButtonTitle: 'Take Photo...',
//     chooseFromLibraryButtonTitle: 'Choose from Library...',
//     cameraType: 'back', // 'front' or 'back'
//     mediaType: 'photo', // 'photo' or 'video'
//     videoQuality: 'high', // 'low', 'medium', or 'high'
//     durationLimit: 10, // video recording max time in seconds
//     maxWidth: 1200, // photos only
//     maxHeight: 1200, // photos only
//     aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
//     aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
//     quality: 1, // 0 to 1, photos only
//     angle: 0, // android only, photos only
//     allowsEditing: true, // Built in functionality to resize/reposition the image after selection
//     noData: false, // photos only - disables the base64 data field from being generated (greatly improves performance on large photos)
//     storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
//         skipBackup: true, // ios only - image will NOT be backed up to icloud
//         path: 'images' // ios only - will save image at /Documents/images rather than the root
//     }
// };