import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploader() {
    const [images, setImages] = useState([null, null, null, null, null, null]);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work.');
            }
        })();
    }, []);

    const pickImage = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const newImages = [...images];
            newImages[index] = result.uri;
            setImages(newImages);
        }
    };
    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageGrid}>
                {images.map((img, index) => (
                    <View key={index} style={styles.imageContainer}>
                        {img ? (
                            <Image source={{ uri: img }} style={styles.image} />
                        ) : (
                            <Button
                                title={`Select Image ${index + 1}`}
                                onPress={() => pickImage(index)}
                            />
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '20%'
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 160,
        height: 160,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
});
