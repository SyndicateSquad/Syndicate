import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
// import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { SelectList } from 'react-native-dropdown-select-list'
import ImageUploader from '../../components/ImageUploader/ImageUploader'
import CustomButton from '../../components/CustomButton/CustomButton';
const InvestorProfile = () => {
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [selected, setSelected] = React.useState("");
    const propertyType = [
        { key: '1', value: 'Commercial' },
        { key: '2', value: 'Residential' },
        { key: '3', value: 'Hospitality' },
        { key: '4', value: 'Industrial', },
    ]
    const priceRange = [
        { key: '1', value: '$0 - $50,000' },
        { key: '2', value: '$50,000 - $100,000' },
        { key: '3', value: '$100,000 - $250,000' },
        { key: '4', value: '$250,000 - $500,000' },
        { key: '5', value: '$500,000 - $1,000,000' },
        { key: '6', value: '$1,000,000+' },
    ]
    const propertySize = [
        { key: '1', value: '0 - 10,000 sq ft' },
        { key: '2', value: '10,000 - 50,000 sq ft' },
        { key: '3', value: '50,000 - 100,000 sq ft' },
        { key: '4', value: '100,000 - 200,000 sq ft' },
        { key: '5', value: '200,000 - 500,000 sq ft' },
        { key: '6', value: '500,000+ sq ft' }
    ]
    const navigation = useNavigation()
    const handleNextButtonPress = () => {
        navigation.navigate('Home')
    }
    return (
        <ScrollView>
            <View style={styles.root}>
                <Progress.Bar progress={0.9} width={415} />
                <Text style={styles.title}>
                    Add Your Property
                </Text>
                {/* <Text style={[styles.label, { right: 130 }]}>Property Type</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={propertyType}
                    placeholder='               Select Property Type               '
                    maxHeight={250}
                /> */}
                {/* <Text style={[styles.label, { right: 175 }, {paddingTop: 50}]}>Bio</Text>
                <CustomInput
                    placeholder='Bio'
                    value=' '
                    setValue={setBio}
                /> */}
                <Text style={[styles.label, { right: 100 }, { paddingBottom: 10 }]}>Minimum Investment</Text>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={priceRange}
                    placeholder='Select Minimum Investment Range'
                    maxHeight={300}
                />
                {/* <Text style={[styles.label, { right: 135 }]}>Property size</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={propertySize}
                    placeholder='                       Property Size                    '
                    maxHeight={300}
                /> */}
                <Text style={[styles.label, { right: 167 }, { paddingTop: 30 }]}>City</Text>
                <CustomInput
                    placeholder='Country'
                    value={country}
                    test='normal'
                    setValue={setCountry}
                />
                <Text style={[styles.label, { right: 150 }]}>Country</Text>
                <CustomInput
                    placeholder='Country'
                    value={country}
                    test='normal'
                    setValue={setCountry}
                />
                <View style={styles.next}>
                    <CustomButton
                        text="Next"
                        onPress={handleNextButtonPress}
                        style={styles.next}
                    />
                </View>
                <View style={styles.imageU}>
                    <ImageUploader />
                </View>

            </View>
        </ScrollView >

    );
}

const styles = StyleSheet.create({
    root: {
        paddingTop: '18%',
        width: 'auto',
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    imageU: {
        top: -125,
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
        marginBottom: 5,
    },
    next: {
        top: 275,
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },
});

export default InvestorProfile;
