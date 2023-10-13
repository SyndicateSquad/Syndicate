import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SingInScreen from './src/screens/SignInScreen/SingInScreen';


export default function App() {
  return (
    <View style={styles.root}>
      <SingInScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});
