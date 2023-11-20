import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, label, test, maxLength}) => {
    let keyboardType = 'default';
    let inputStyles = [styles.input]; // Create an array of styles

    if (label === 'Email') {
        keyboardType = 'email-address';
    } else if (label === 'Phone-Number' || label === 'zipcode') {
        keyboardType = 'numeric';
    }


    if (value === ' ') {
        // Apply different styles when the value is 'bIo'
        inputStyles.push(styles.customHeight);
    }
    if (test === 'normal') {
        // Apply different styles when the value is 'bIo'
        inputStyles.push(styles.normalHeight);
    }
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={inputStyles}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
    },
    input: {},
    customHeight: {
        height: 100,
        marginBottom: 25,
    },
    normalHeight: {
        height: 20,
        marginBottom: 15,
    },
});

export default CustomInput