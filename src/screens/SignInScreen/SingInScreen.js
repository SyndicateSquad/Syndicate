import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Logo from '../../../assets/images/Logo.png'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'


const SingInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var { height } = useWindowDimensions();
    const onSignInPressed = () => {
        console.warn("Sign in");
    }
    const onForgotPasswordPressed = () => {
        console.warn('onForgotpasswordPressed')
    }
    const onSignInGoogle = () => {
        console.warn('onSignInGoogle');
    }
    const onSignInApple = () => {
        console.warn('onSignInGoogle');
    }
    const onSignUpPress = () => {
        console.warn('onSignUpPress');
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height = 0.3 }]}
                    resizeMode="contain"
                />
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
                    onPressed={onForgotPasswordPressed}
                    type="TERTIARY"
                />

                <CustomButton
                    text="Sign In with Google"
                    onPress={onSignInGoogle}
                    bgColor="#FAE9AE"
                    fgColor="#DD4D44"
                />
                <CustomButton
                    text="Sign In with Apple"
                    onPress={onSignInApple}
                    bgColor="#e3e3e3"
                    fgColor="#363636"
                />
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPress}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});
export default SingInScreen