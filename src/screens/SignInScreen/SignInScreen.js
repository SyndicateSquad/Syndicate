import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, Text } from 'react-native'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import Logo from '../../../assets/images/Logo.jpeg';
import { useNavigation } from '@react-navigation/native';
// import ImageUploader from '../../components/ImageUploader/ImageUploader';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /*
    TODO: change the login credentials to email instead of username
    TODO: add google sign + apple sign in 
    */
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const testCredentials = [
        {
            email: 'testuser1@example.com',
            password: 'password123',
        },
        {
            email: 'testuser2@example.com',
            password: 'securePass789',
        },
        {
            email: 'testuser3@example.com',
            password: 'letmein2023',
        },
    ];
    const onSignInPressed = async () => {
        /*
        *
        *
            add user validation here
        *
        *
        */
        try {
            // Retrieve stored user credentials
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedPassword = await AsyncStorage.getItem('userPassword');

            if (storedEmail === email && storedPassword === password) {
                // Sign in successful, navigate to the Home screen
                navigation.navigate('Home');
            } else {
                console.warn('Invalid email or password. Please try again.');
                setPassword('');
            }
        } catch (error) {
            console.error('Error retrieving user credentials:', error);
        }
        // navigation.navigate('Home')
    }
    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword')
    }
    const onSignUpPress = () => {
        navigation.navigate('SignUp')
    }
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
                    setValue={setEmail}
                    label='Email'
                    test='normal'
                />
                <Text style={[styles.label, { right: 140 }]}>Password</Text>
                <CustomInput
                    // placeholder='Password'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                    label="Password"
                    test='normal'
                />
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
                <SocialSignInButtons />
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