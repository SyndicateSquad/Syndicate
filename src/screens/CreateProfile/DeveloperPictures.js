import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ImageUploader from '../../components/ImageUploader/ImageUploader'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
const DeveloperPictures = () => {
    const navigation = useNavigation();
    const handleNextButtonPress = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.root}>
            <Progress.Bar progress={0.9} width={415} />
            <Text style={styles.label}>Add your Property pictures</Text>
            <ImageUploader />
            <CustomButton
                text="Next"
                onPress={handleNextButtonPress} // Call handleNextButtonPress when the button is pressed
            />
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: '18%',
        width: 'auto',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: 100,
        top: 50,
        paddingRight: '30%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#051C60',
        left: 65,
    }
});
export default DeveloperPictures