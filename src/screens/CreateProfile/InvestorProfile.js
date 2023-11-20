import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


const InvestorProfile = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [selected, setSelected] = React.useState([]);
    const propertyType = [
        { key: '1', value: 'Commercial' },
        { key: '2', value: 'Residential' },
        { key: '3', value: 'Hospitality' },
        { key: '4', value: 'Industrial' },
    ]
    const priceRange = [
        { key: '1', value: '$0 - $50,000' },
        { key: '2', value: '$50,000 - $100,000' },
        { key: '3', value: '$100,000 - $250,000' },
        { key: '4', value: '$250,000 - $500,000' },
        { key: '5', value: '$500,000 - $1,000,000' },
        { key: '6', value: '$1,000,000+' },
    ]
    const InvestmentCapacity = [
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
    const navigation = useNavigation();
    const handleNextButtonPress = () => {
        navigation.navigate('PictureForInvestor');
    }
    return (
        <ScrollView>
            <View style={styles.root}>
                <Progress.Bar progress={0.6} width={415} />
                <Text style={styles.title}>
                    Choose Your Preferences
                </Text>
                <Text style={[styles.label, { right: 130 }]}>Property Type</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={propertyType}
                    placeholder='               Select Property Type               '
                    maxHeight={250}
                />
                <Text style={[styles.label, { right: 100 }]}>Property Price Range</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={priceRange}
                    placeholder='               Select Price Range                  '
                    maxHeight={300}
                />
                <Text style={[styles.label, { right: 85 }]}>Your Investment Capacity</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={InvestmentCapacity}
                    placeholder='      Select Your Investment Capacity     '
                    maxHeight={210}
                />
                <Text style={[styles.label, { right: 135 }]}>Property size</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={propertySize}
                    placeholder='      Select Your Desired Property Size     '
                    maxHeight={300}
                />
                <Text style={[styles.label, { right: 150 }]}>Latitude</Text>
                <CustomInput
                    placeholder='Latitude'
                    value={latitude}
                    test='normal'
                    setValue={setLatitude}
                />
                <Text style={[styles.label, { right: 150 }]}>Longitude</Text>
                <CustomInput
                    placeholder='Longitude'
                    value={longitude}
                    test='normal' //can this also be normal??
                    setValue={setLongitude}
                />
                <CustomButton
                    text="Next"
                    onPress={handleNextButtonPress} // Call handleNextButtonPress when the button is pressed
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
        marginBottom: 5,
    },
});

export default InvestorProfile;
