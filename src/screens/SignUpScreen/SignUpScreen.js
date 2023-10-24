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
/*
    TODO: Signup requires the user to create a profile
    asks for their first and last name, email, bio, 
    location (city, state, country) (only for investors), 
    user type, preferences

    TODO: seperate from the createProfile screen
    if user is a developer, have a method called addProperty()
    add property has property type, location, sq ft, price, 
    allows partial investments? and maybe more stuff
 */
const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation();

    const onRegisterPressed = () => {
        navigation.navigate('ConfirmEmail')

    }
    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    // const OnTermsOfUsePressed = () => {
    //    console.warn('onTermsOfUsePressed');
    // }
    // const onPrivacyPressed = () => {
    //      console.warn('onPrivacyPressed');
    // }
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
                    label='Phone-Number'
                    test='normal'
                />
                {/*
                    TODO: add a forgot email option that recovers account using phone number

                */ }
                <Text style={[styles.label, { right: 155 }]}>Email</Text>
                <CustomInput
                    // placeholder='Email'
                    value={email}
                    setValue={setEmail}
                    label='Email'
                    test='normal'
                />
                <Text style={[styles.label, { right: 135 }]}>Password</Text>
                <CustomInput
                    placeholder='Password'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                    label='Password'
                    test='normal'
                />
                <Text style={[styles.label, { right: 105 }]}>Repeat Password</Text>
                <CustomInput
                    // placeholder='Repeat Password'
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
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
};

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