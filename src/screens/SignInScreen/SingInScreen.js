import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native'
import Logo from '../../../assets/images/Logo.jpg'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
const SingInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    var { height } = useWindowDimensions();
    const onSignInPressed = () => {
        console.warn("Sign in");
    }
    return (
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

            <CustomButton text="Sign In" onPress={onSignInPressed} />
        </View>
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