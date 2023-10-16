import React from 'react';
import { StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#F9FBFC'
  },
});
