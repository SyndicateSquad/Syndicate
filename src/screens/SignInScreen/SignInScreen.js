import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, Text } from 'react-native'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import Logo from '../../../assets/images/Logo.jpeg';
import { useNavigation } from '@react-navigation/native';
// import ImageUploader from '../../components/ImageUploader/ImageUploader';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /*
    TODO: add google sign + apple sign in 

    */
    const { height } = useWindowDimensions();
    const navigation = useNavigation();


    const onSignInPressed = async () => {
        // http://127.0.0.1 is the default socket that's used by FastAPI
        async function loginUser(url = 'http://127.0.0.1:8000/login', data = { email, password }) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const responseData = await response.json();
                // console.warn(responseData); 

                if (response.ok) {
                    navigation.navigate('Home');
                }
                else {
                    console.warn("Invalid Login");
                }

            }
            catch (error) {
                console.error('Error:', error);
            }
        }

        await loginUser();

    };


    const onForgotPasswordPressed = () => {
        // navigation.navigate('ForgotPassword')
        navigation.navigate('Chatting')
    }
    const onSignUpPress = () => {
        navigation.navigate('SignUp')
        // navigation.navigate('Developer')
    }
    // const GoToHomeScreen = () => {
    //     navigation.navigate('Home')
    // }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                />
                {/* <ImageUploader /> */}
                <Text style={[styles.label, { right: 155 }]}>Email</Text>
                <CustomInput
                    // placeholder='Email'
                    value={email}
                    setValue={(newEmail) => setEmail(newEmail.toLowerCase().trim())}
                    label='Email'
                    test='normal'
                    maxLength={30}
                />
                <Text style={[styles.label, { right: 140 }]}>Password</Text>
                <CustomInput
                    // placeholder='Password'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                    label="Password"
                    test='normal'
                    maxLength={20}
                />
                {/* <CustomButton
                    text="Home Screen"
                    onPress={GoToHomeScreen}
                /> */}
                <CustomButton
                    text="Sign in"
                    onPress={onSignInPressed}
                />
                <View style={{ margin: -10 }}>
                    <CustomButton
                        text="Forgot Password"
                        onPress={onForgotPasswordPressed}
                        type="TERTIARY"
                    />
                </View>
                <Text
                    style={styles.title}
                >
                    OR
                </Text>
                {/* <SocialSignInButtons /> */}
                <View
                    style={{ padding: 20, width: '113%' }}
                >
                    <CustomButton
                        text="Create Account"
                        onPress={onSignUpPress}
                    // type='TERTIARY'
                    />
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingTop: '25%',

    },
    logo: {
        resizeMode: 'contain',
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 30,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#051C60',
    },
    label: {
        paddingTop: 10,
        fontSize: 20,
        fontWeight: 100,
        marginBottom: -2,
    }
});
export default SignInScreen