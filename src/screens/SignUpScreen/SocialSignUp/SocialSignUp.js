import React from 'react';
import { View } from 'react-native';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SocialSignUp = () => {
  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <>
      <View style={{ flexDirection: 'row', backgroundColor: '#FAE9AE', width: '100%' }}>
        <CustomButton
          text="Continue with Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9AE"
          fgColor="#DD4D44"
        />
        <MaterialCommunityIcons.Button
          name='google'
          size={50}
          color='#DB4437'
          backgroundColor='transparent'
          underlayColor='transparent'
          activeOpacity={0.3}
        />
      </View>
      <View>
        <CustomButton
          text="Continue with Apple"
          onPress={onSignInApple}
          bgColor="#e3e3e3"
          fgColor="#363636"
        />
        <MaterialCommunityIcons.Button
          name='apple'
          size={50}
          backgroundColor='transparent'
          color='black'
          underlayColor='black'
          activeOpacity={0.3}
        />
      </View>
    </>
  );
};

export default SocialSignUp;
