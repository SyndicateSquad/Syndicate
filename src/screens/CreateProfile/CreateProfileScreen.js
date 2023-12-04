import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCodeStr, setZipCode] = useState('');
    const zipCode = parseInt(zipCodeStr);
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');

    const navigation = useNavigation();

    const [selected, setSelected] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const data = [
        { key: '1', value: 'Developer' },
        { key: '2', value: 'Investor' },
    ];

    useEffect(() => {
        const getAsyncData = async () => {
            try {
                setEmail(await AsyncStorage.getItem('userEmail'));
                setPassword(await AsyncStorage.getItem('userPassword'));
                setPhoneNumber(parseInt(await AsyncStorage.getItem('userPhoneNumber')));
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        getAsyncData();
    }, []);

    const pushSignUpDetails = async (val) => {
        const user_type = val;
        const url = 'http://127.0.0.1:8000/signup';
        const data = {
            email,
            password,
            firstName,
            lastName,
            city,
            state,
            zipCode,
            country,
            phone_number,
            bio,
            user_type,
        };

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
                navigation.navigate(val);
            } else {
                console.warn(responseData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSelectionChange = (val) => {
        setSelected(val);
    }

    const onNextPressed = () => {
        if (selected === 'Developer') {
            navigation.navigate('Developer');
        } else if (selected === 'Investor') {
            navigation.navigate('Investor');
        } else {
            console.warn('please select a value');
        }
    }
    const capitalizeContent = (input) => {
        setState(input.toUpperCase());
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingContainer}>
            <ScrollView
                showsVerticalScrollIndicator={true}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.root}>
                        <Progress.Bar progress={0.5} width={415} />
                        <Text style={styles.title}>
                            Create Your Profile
                        </Text>
                        <SelectList
                            setSelected={(val) => handleSelectionChange(val)}
                            data={data}
                            save="value"
                            placeholder='Investor or Developer'
                            maxHeight={80}
                        />
                        <Text style={[styles.label, { right: 140 }]}>
                            First Name
                        </Text>
                        <CustomInput
                            // placeholder='First Name'
                            value={firstName}
                            test='normal'
                            setValue={setFirstName}
                        />
                        <Text style={[styles.label, { right: 140 }]}>Last Name</Text>
                        <CustomInput
                            // placeholder='Last Name'
                            value={lastName}
                            test='normal'
                            setValue={setLastName}
                        />
                        <Text style={[styles.label, { right: 170 }]}>City</Text>
                        <CustomInput
                            placeholder='City'
                            value={city}
                            test='normal'
                            setValue={setCity}
                        />
                        <Text style={[styles.label, { right: 165 }]}>State</Text>
                        <CustomInput
                            placeholder='State'
                            value={state}
                            test='normal'
                            setValue={setState}
                        />
                        <Text style={[styles.label, { right: 155 }]}>Zip Code</Text>
                        <CustomInput
                            placeholder='Zip Code'
                            value={zipCode}
                            test='normal'
                            setValue={setZipCode}
                            label='Phone-Number'
                            maxLength={5}
                        />
                        <Text style={[styles.label, { right: 155 }]}>Country</Text>
                        <CustomInput
                            placeholder='Country'
                            value={country}
                            test='normal'
                            setValue={setCountry}
                        />
                        <Text style={[styles.label, { right: 175 }]}>Bio</Text>
                        <CustomInput
                            placeholder='Bio'
                            value={bio}
                            setValue={setBio}
                            multiline={true}
                        />
                        <CustomButton
                            text="Next"
                            onPress={onNextPressed}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
        
    );
};

const styles = StyleSheet.create({
    root: {
        paddingTop: '18%',
        width: 'auto',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        paddingBottom: '10%'
    },
    title: {
        paddingBottom: '4%',
        paddingRight: '30%',
        paddingTop: '5%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#051C60',
        left: 65,
    },
    label: {
        paddingTop: 10,
        fontSize: 20,
        fontWeight: 100,
        marginBottom: -2,
    },
});

export default CreateProfileScreen;
