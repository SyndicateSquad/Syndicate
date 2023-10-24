import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'

const CreateProfileScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [bio, setBio] = useState('');

    const navigation = useNavigation();

    const [selected, setSelected] = React.useState("");

    const handleSelectionChange = (val) => {
        setSelected(val);
        if (val === 'Developer') {
            navigation.navigate('Developer');
        } else if (val === 'Investor') {
            navigation.navigate('Investor');
        }
    };
    const data = [
        { key: '1', value: 'Developer' },
        { key: '2', value: 'Investor' },
    ]
    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.root}>
                <Progress.Bar progress={0.3} width={415} />
                <Text style={styles.title}>
                    Create Your Profile
                </Text>
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
                <Text style={[styles.label, { right: 155 }]}>Country</Text>
                <CustomInput
                    placeholder='Country'
                    value={country}
                    test='normal'
                    setValue={setCountry}
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
                <Text style={[styles.label, { right: 175 }]}>Bio</Text>
                <CustomInput
                    placeholder='Bio'
                    value=' '
                    setValue={setBio}
                />
                <SelectList
                    setSelected={(val) => handleSelectionChange(val)}
                    data={data}
                    save="value"
                    placeholder='                      Investor or Developer                 '
                    maxHeight={80}
                />
            </View>
        </ScrollView>

    );
}

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
