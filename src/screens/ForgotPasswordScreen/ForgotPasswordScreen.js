import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    
    const OnSendPressed = () => {
        navigation.navigate('NewPassword')
    }
    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>
                    Enter your email
                </Text>
                <CustomInput
                    placeholder='Username'
                    value={username}
                    setValue={setUsername}
                />
                <CustomButton
                    text="Send"
                    onPress={OnSendPressed}
                />
                <CustomButton
                    text="Back to Sign in"
                    onPress={onSignInPressed}
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
        paddingTop: '70%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    // text: {
    //     color: 'gray',
    //     marginVertical: 10,
    // },
    // link: {
    //     color: '#FDB075'
    // },
});
export default ForgotPasswordScreen