import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableHighlight, StatusBar, ActivityIndicator, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomTextComponent from '../components/CustomTextComponent';
import { COLORS } from '../constants';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }) {

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showEye, setShowEye] = useState("");

    const handleSubmitOnPress = () => {
        if (email.length === 0) {
            setEmailError("Email is required");
        } else if (!(email.includes("@")) || !(email.includes("gmail.com"))) {
            setEmailError("Invalid Email");
        } if (password.length === 0) {
            setPasswordError("Invalid Password")
        } else if (password.length < 6) {
            setPasswordError("Password must be 6 characters long")
        } else {
            setLoading(true);
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    setLoading(false);
                    console.log('User account created & signed in!');
                    navigation.navigate("HomeScreen");
                })
                .catch(error => {
                    setLoading(false);
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                        Alert.alert("That email address is already in use!")
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                        Alert.alert("That email address is invalid!")
                    }

                    console.error(error);
                });
        }
    }

    return (
        loading
            ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={COLORS.primary} />
            </View>
            : <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor="#fff" />
                <View style={{ justifyContent: 'space-between', height: '100%', paddingBottom: 10 }}>
                    <View style={styles.header_block}>
                        <Image
                            source={require('../../assets/logo.png')}
                            resizeMode="contain"
                            style={styles.login_logo}
                        />

                        <View style={{ marginTop: 10 }} />

                        <CustomTextComponent
                            fs={20} textColor="black" fw="900"
                            text={"Let's Sign You In"}
                        />

                        <View style={{ marginTop: 4 }} />

                        <CustomTextComponent
                            fs={14} textColor="grey"
                            text={"Welcome back, you've been missed"}
                        />
                    </View>

                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <CustomInput
                                placeholderText="Email"
                                iconType="user"
                                headingText="Email"
                                keyboardType={'email-address'}
                                autoCapitalize='none'
                                error={emailError}
                                labelValue={email}
                                onChangeText={(val) => {
                                    setEmail(val);
                                    setEmailError("");
                                }}
                            />
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 10, }}>
                            <CustomInput
                                placeholderText="Password"
                                iconType={showEye ? "eye" : "eyeo"}
                                headingText="Password"
                                error={passwordError}
                                secureTextEntry={showEye ? false : true}
                                labelValue={password}
                                onChangeText={(val) => {
                                    setPassword(val);
                                    setPasswordError("");
                                }}
                                onPress={() => { setShowEye(!showEye) }}
                            />
                        </View>

                        <View style={{ alignItems: 'flex-end', marginTop: -6 }}>
                            <TouchableHighlight
                                style={{ paddingHorizontal: 10, paddingVertical: 6, }}
                                activeOpacity={0.6} underlayColor={'#f7f7f7'}
                                onPress={() => { navigation.navigate("ForgotPasswordScreen") }}
                            >
                                <CustomTextComponent
                                    fs={16} textColor={COLORS.blue}
                                    text={"Forgot Password?"}
                                />
                            </TouchableHighlight>
                        </View>

                        <View style={{ marginTop: 20 }} />

                        <CustomButton
                            fs={16} text={"Sign In"} fw={"600"}
                            textColor={COLORS.white}
                            bgColor={COLORS.primary}
                            width={"100%"} height={50}
                            onPress={handleSubmitOnPress}
                        />
                        <View style={{ marginTop: 20 }} />
                    </View>

                    <View style={{ marginTop: 80 }} />
                </View>

            </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 12,
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    header_block: {
        alignItems: 'center',
        width: '100%',
    },
    login_logo: {
        width: "80%",
        height: 80,
        marginTop: 20,
        marginBottom: 30,
    },
});

