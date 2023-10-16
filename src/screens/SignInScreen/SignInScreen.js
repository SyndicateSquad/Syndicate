import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import Logo from '../../../assets/images/Logo.jpeg';
import SocialSignInButton from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        /*
        *
        *
            add user validation here
        *
        *
        */
        navigation.navigate('Home');
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
                    style={[styles.logo, { height: height * 0.3 }]} />
                <CustomInput
                    placeholder='Username'
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder='Password'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />

                <CustomButton
                    text="Sign In"
                    onPress={onSignInPressed}
                />
                <CustomButton
                    text="Forgot Password"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />
                <SocialSignInButton/>
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPress}
                    type='TERTIARY'
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingTop:'40%',
    },
    logo: {
        resizeMode: 'contain',
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});
export default SignInScreen