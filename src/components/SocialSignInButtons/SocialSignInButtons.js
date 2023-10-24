import React from 'react'
import CustomButton from '../CustomButton/CustomButton'

const SocialSignInButtons = () => {
  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  }

  const onSignInApple = () => {
    console.warn('onSignInApple');
  }

  return (
    <>
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9AE"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  )
}



export default SocialSignInButtons
