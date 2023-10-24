import React from 'react'
import CustomButton from '../../../components/CustomButton/CustomButton';
const SocialSignUp = () => {
  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  }
  const onSignInApple = () => {
    console.warn('onSignInApple');
  }
  return (
    <>
      <CustomButton
        text="Continue with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9AE"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Continue with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  )
}

export default SocialSignUp