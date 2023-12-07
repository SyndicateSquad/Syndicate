import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ImageUploader from '../../components/ImageUploader/ImageUploader'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { investorImageToApi } from '../../components/uploadImagesToApi/invesotorImageToApi';
const InvestorPicture = () => {
    const [images, setImages] = useState([null, null, null, null, null, null]);
    const navigation = useNavigation();
    const handleNextButtonPress = async () => {
        // Check if at least one image has been selected
        const atLeastOneImageSelected = images.some(image => image !== null);

        if (atLeastOneImageSelected) {
            // At least one image is selected, proceed with uploading
            const nonNullImages = images.filter(image => image !== null);
            try {
                // Call your image upload function and wait for it to finish
                await investorImageToApi(nonNullImages);
                // After a successful upload, navigate to the 'Home' screen
                navigation.navigate('Home');
            } catch (error) {
                // If the upload fails, handle the error (e.g., show an alert to the user)
                console.error(error);
                alert('Failed to upload images. Please try again.');
            }
        } else {
            // No images have been selected, inform the user
            alert('Please upload at least one image before continuing.');
        }
    }
    return (
        <View style={styles.root}>
            <Progress.Bar progress={0.9} width={415} />
            <Text style={styles.label}>Add your pictures</Text>
            <ImageUploader setSelectedImages={setImages} />
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
export default InvestorPicture