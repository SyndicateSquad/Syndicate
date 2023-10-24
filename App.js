import React from 'react';
import { StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Amplify } from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native'
import config from './src/aws-exports'

Amplify.configure(config);

const App = () => {
  // Auth.signIn();
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#F9FBFC'
  },
});

// const signUpConfig = {
//   header: "My Customized Sign Up",
//   hideAllDefaults: true,
//   signUpFields: [
//     {
//       label: "Phone Number",
//       key: "phone number",
//       required: true,
//       displayOrder: 1,
//       type: "number",
//     },
//     {
//       label: "Email",
//       key: "email",
//       required: true,
//       displayOrder: 2,
//       type: "string",
//     },
//     {
//       label: "Password",
//       key: "password",
//       required: true,
//       displayOrder: 3,
//       type: "password",
//     },
//   ],
// };


export default withAuthenticator(App);