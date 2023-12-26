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

    const [input_code, setCode] = useState('');
    const navigation = useNavigation();

    const onConfirmPressed = async () => {

        const generatedConfirmationCode = await AsyncStorage.getItem('confirmation_code');
        
        if (input_code !== generatedConfirmationCode){
            console.warn("Incorrect Code");
            // navigation.navigate("CreateProfile");
        } else {
            navigation.navigate("CreateProfile");
        }
    
    };

    const onResendPressed = async () => {

        const email = await AsyncStorage.getItem('userEmail');

        async function sendConfirmationCode(url = 'http://10.5.3.2:8000/confirmation_code', data = { email }) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                //receive the random-generated confirmation code from backend
                const generated_conf_code = await response.json(); 
                await AsyncStorage.setItem('confimation_code', generated_conf_code);

                if (response.ok){
                    console.warn("Re-sent Confirmation Code via Email");
                } else {
                    console.error("Unable to send Confirmation code via Email");
                }

            } catch (error) {
                console.error('Error:', error);
            }
        }        

        await sendConfirmationCode();

    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
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
                    value={input_code}
                    // setValue={setCode}
                    setValue={(numericCode) => setCode(numericCode.replace(/[^0-9]/g, '').slice(0, 10), 10)}
                    keyboardType = 'numeric'
                    test='normal'
                    maxLength={5}
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