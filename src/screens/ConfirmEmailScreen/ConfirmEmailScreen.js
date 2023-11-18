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
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmEmailScreen = () => {

    const [code, setCode] = useState('');
    const navigation = useNavigation();

// the verification email must be sent earlier, not when confirm button is pressed

    const onConfirmPressed = async () => {

        const email = await AsyncStorage.getItem('userEmail');

        async function verifyConfirmationCode(url = 'http://127.0.0.1:8000/', data = { email }) {
            
        }
        
        await verifyConfirmationCode(); 
        
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }
    const onResendPressed = () => {
        console.warn('OnResendPressed')
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>
                    Confirm Your Email
                </Text>
                <Text style={[styles.label, { right: 60 }]}>Enter your confirmation code</Text>
                <CustomInput
                    // placeholder='Enter your confirmation code'
                    value={code}
                    setValue={setCode}
                    test='normal'
                />
                <CustomButton
                    text="Confirm"
                    onPress={onConfirmPressed}
                />
                <CustomButton
                    text="Resend code "
                    onPress={onResendPressed}
                    type='SECONDARY'
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
        marginBottom: 30,
    },
    label: {
        paddingTop: 10,
        fontSize: 20,
        fontWeight: 100,
        marginBottom: -2,
    }
});
export default ConfirmEmailScreen