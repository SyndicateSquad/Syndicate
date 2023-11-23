export async function uploadImagesToApi(imageUris) {
    imageUris.forEach(async (uri) => {
        const formData = new FormData();
        const name = uri.split('/').pop();

        // Assuming you have the mime type extension in the image uri
        const type = `image/${name.split('.').pop()}`;
        formData.append('file', { uri, name, type });

        try {
            const response = await fetch('http://192.168.0.20:8000/upload', {
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
