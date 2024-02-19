# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

- Used to create

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)

## How to run

To run your project, run one of the following npm commands.

```sh
npm run web
```

- Main command to use
- Runs the React Native app in a web browser

```sh
npm start
```

- Starts the development server for React Native project but doesnt open in web browser

```sh
npx expo start --port 8000
```

- For projects created with Expo, a framework for building React Native apps
- Port 8000 is chosen to keep endpoints connected

```sh
npm run android
```

- This command is used to build and run your React Native app on an Android emulator or a connected Android device.
- Must have Android Studio, an emulator, or a connected Android device set up

```sh
npm run ios #
```

- This command is used to build and run your React Native app on an iOS simulator or a connected iOS device.
- Must have Xcode installed and, if testing on a device, be connected to a Mac

```sh
uvicorn backend:app --reload --port 8000
```

- This command starts the backend.py server file
- Port is set to 8000 to keep endpoints connected

## Other Dependencies

1. FastAPI
2. Uvicorn
3. Boto3
4. AWS CLI (to configure credentials for access to S3 and DynamoDB)

# **Syndicate** (img/demo_1min.gif)

Connects Developers and Investors to build Real Estate


## _Profile Creation_

**Developers/Syndicators**: When developers and syndicators join the app, they create profiles with details about their real estate projects. This includes property descriptions, location, project scope, and uploaded documents like permits and cost schedules.

**Investors**: Investors set up profiles with their investment preferences. They specify the types of properties they are interested in, such as residential, commercial, or industrial, along with investment size and location preferences.

## _Uploading Details_

**Developers/Syndicators**: Developers and syndicators can upload relevant details related to their real estate projects. These documents may include property images, property location, size, and more. These details can be viewed by investors who use the app to swipe through property listings.

**Investor Access**: Investors can upload their bio and other details such as location, age, etc, which can be viewed by Developers who were swiped right on.

## _Matching_

**Matching Algorithm**: The app employs a matching algorithm similar to Tinder's swiping mechanism. Developers, syndicators, and investors can browse profiles and swipe right (like) or left (dislike) on profiles that align with their interests.

**Mutual Matches**: Investors swipe on Developers first. Developers then get to choose which investors they want to choose. When two users swipe right on each other's profiles, it's considered a "match." This mutual interest initiates a connection between them, and the two entities can communicate with each other.

## _Communication_

**In-App Messaging**: Once a match is established, users can communicate with each other through an in-app messaging system. This feature enables them to discuss potential real estate projects, investment opportunities, and collaboration details.

**Secure and Private**: Conversations are secure and private, ensuring that sensitive information remains confidential.
