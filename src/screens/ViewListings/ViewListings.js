import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ViewListings = () => {

    return (
        <View style={styles.index}>
            <Text>ViewListings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    index: {
        alignItems: 'center',
        padding: 20,
        paddingTop: '25%',

    }
})
export default ViewListings