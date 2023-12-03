import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-react-native';

const client = StreamChat.getInstance("5bbwwprpy2jr");

const App = () => {
  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: 'ai212559',
          name: 'Ahmed Ibrahim',
        },
        client.devToken('ai212559')
      );
      const channel = client.channel(
        'messaging',
        'syndicateTestChannel',
        { name: "TestChannel", }
      );
      await channel.watch();
    };

    const disconnectClient = async () => {
      await client.disconnectUser();
    };

    connectUser()
    return () => {
      disconnectClient();
    };

  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <OverlayProvider>
        <Navigation />
      </OverlayProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
