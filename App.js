import React from 'react';
import { StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OverlayProvider } from 'stream-chat-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {

  return (
    <SafeAreaProvider style={styles.root}>
      <GestureHandlerRootView style={{flex: 1}}>
        <OverlayProvider>
          <Navigation />
        </OverlayProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
