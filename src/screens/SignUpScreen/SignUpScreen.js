import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignUp from './SocialSignUp'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();
    const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'icloud.com', 'outlook.com'];
    let valid_flag = true;
    const onRegisterPressed = async () => {
        // if (password !== passwordRepeat) {
        //     console.warn('Passwords do not match. Please try again.');
        // } else {
        //     try {
        //         // Save user's email and password in secure storage
        //         await AsyncStorage.setItem('userEmail', email);
        //         await AsyncStorage.setItem('userPassword', password);

        //         navigation.navigate('ConfirmEmail');
        //     } catch (error) {
        //         console.error('Error saving user credentials:', error);
        //     }
        // }
        navigation.navigate('ConfirmEmail');
        await verifyEmailDNE();
        await validateEntries();
        //flag is set to false by now if any test case fails
        if (valid_flag) {
            //navigation to next screen is within this function
            await sendConfirmationCode();
        }
    }


    // const email = await AsyncStorage.getItem('userEmail');

    async function verifyEmailDNE(url = 'http://127.0.0.1:8000/verify_email_dne', data = { email }) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log("New Email Detected")
            } else {
                console.error("Error: ", responseData);
                navigation.navigate('SignIn');

                valid_flag = false; //probably does not matter lol
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function validateEntries() {
        if (password !== passwordRepeat) {
            console.warn('Passwords do not match. Please try again.');
            valid_flag = false;

        } else if (phoneNumber.trim() === "" || email.trim() === "" || password.trim() === "") {
            console.warn("Please fill in all fields")
            valid_flag = false;

        } else if (!allowedDomains.includes(email.split('@')[1])) {
            console.warn("Invalid Email");
            valid_flag = false;

        } else {
            try {
                // Save user's email and password in secure storage
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userPassword', password);
                await AsyncStorage.setItem('userPhoneNumber', phoneNumber);
                // valid_flag = true;
            }
            catch (error) {
                console.error('Error saving user credentials:', error);
                valid_flag = false;
            }
        }
    }

    async function sendConfirmationCode(url = 'http://127.0.0.1:8000/confirmation_code', data = { email }) {
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
            await AsyncStorage.setItem('confirmation_code', generated_conf_code);

            if (response.ok) {
                const generatedConfirmationCode = await AsyncStorage.getItem('confirmation_code');
                console.warn(generatedConfirmationCode);
                navigation.navigate('ConfirmEmail');
            } else {
                console.error("Unable to send Confirmation code via Email");
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }
    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>
                    Create an account
                </Text>
                <Text style={[styles.label, { right: 112 }]}>Phone Number</Text>
                <CustomInput
                    // placeholder='Phone Number'
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    // setValue={(newPhoneNumber) => setPhoneNumber(newPhoneNumber.replace(/[^0-9]/g, '').slice(0, 10))}
                    label='Phone-Number'
                    keyboardType='numeric'
                    test='normal'
                    maxLength={10}
                />
                {/*
                    TODO: add a forgot email option that recovers account using phone number
                    this needs Twilio SMS API implementation

                */ }
                <Text style={[styles.label, { right: 155 }]}>Email</Text>
                <CustomInput
                    // placeholder='Email'
                    value={email}
                    // setValue={setEmail}
                    setValue={(newEmail) => setEmail(newEmail.toLowerCase().trim())}
                    label='Email'
                    test='normal'
                />
                <Text style={[styles.label, { right: 135 }]}>Password</Text>
                <CustomInput
                    placeholder='Password'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                    maxLength={20}
                    label='Password'
                    test='normal'
                />
                <Text style={[styles.label, { right: 105 }]}>Repeat Password</Text>
                <CustomInput
                    // placeholder='Repeat Password'
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry={true}
                    maxLength={20}
                    label='Password'
                    test='normal'
                />
                <CustomButton
                    text="Register"
                    onPress={onRegisterPressed}
                />
                {/* <Text>
                    By registering, you confirm that you accept our 
                    <Text style={styles.link} OnPress={OnTermsOfUsePressed}> Terms of Use</Text> and 
                    <Text style={styles.link} OnPress={OnTermsOfUsePressed}> Privacy Policy</Text>
                </Text> */}
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#051C60',
                    margin: 10
                }}> OR </Text>
                <SocialSignUp />

                <CustomButton
                    text="Have an account? Sign in"
                    onPress={onSignInPressed}
                    type='TERTIARY'
                />
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingTop: '30%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
        paddingBottom: 15,
    },
    label: {
        paddingTop: 10,
        fontSize: 20,
        fontWeight: 100,
        marginBottom: -2,
    }
    // text: {
    //     color: 'gray',
    //     marginVertical: 10,
    // },
    // link: {
    //     color: '#FDB075'
    // },
});
export default SignUpScreen