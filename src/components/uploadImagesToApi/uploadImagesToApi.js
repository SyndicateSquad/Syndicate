import AsyncStorage from '@react-native-async-storage/async-storage';

export async function uploadImagesToApi(imageUris) {

    // Retrieve the user's email from AsyncStorage
    const user_email = await AsyncStorage.getItem('userEmail');

    if (!user_email) {
        console.error('User email not found in AsyncStorage');
        return;
    }


    imageUris.forEach(async (uri) => {
        const formData = new FormData();
        const name = uri.split('/').pop();

        // Assuming you have the mime type extension in the image uri
        const type = `image/${name.split('.').pop()}`;
        formData.append('file', { uri, name, type });
        formData.append('user_email', user_email); // Include user email in formData


        try {
            let url = 'http://127.0.0.1:8000/uploadToDeveloper' + '?user_email=' + user_email
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = await response.json();
            console.log(data);
            // Handle post-upload logic here
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    });
};

// Rest of your code
