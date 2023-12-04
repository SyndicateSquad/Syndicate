import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import SocialSignInButtons from '../components/SocialSignInButtons/SocialSignInButtons';
import SocialSignUp from '../screens/SignUpScreen/SocialSignUp';
import CreateProfileScreen from '../screens/CreateProfile/CreateProfileScreen';
import DeveloperProfile from '../screens/CreateProfile/DeveloperProfile';
import InvestorProfile from '../screens/CreateProfile/InvestorProfile';
import ViewListings from '../screens/ViewListings/ViewListings';
import ChatService from '../components/ChatService';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImageUploader" component={ImageUploader} />
        <Stack.Screen name="SocialSign" component={SocialSignInButtons} />
        <Stack.Screen name="SignUpWithSocials" component={SocialSignUp} />
        <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
        <Stack.Screen name="Developer" component={DeveloperProfile} />
        <Stack.Screen name="Investor" component={InvestorProfile} />
        <Stack.Screen name="Listings" component={ViewListings} />
        <Stack.Screen name="Chatting" component={ChatService} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation