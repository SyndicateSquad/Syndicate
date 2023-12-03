import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import { Channel as ChannelType } from 'stream-chat';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Chat, OverlayProvider, ChannelList } from 'stream-chat-expo';
import useCachedResources from './Hooks/useCachedResources';
import useColorScheme from './Hooks/useColorScheme';

const client = StreamChat.getInstance("5bbwwprpy2jr");

const ChatService = () => {
    // const isLoadingComplete = useCachedResources()
    // const colorScheme = useColorScheme()
    // const [isReady, setIsReady] = useState(false);
    const [channel, setChannel] = useState(null);
    const onChannelPressed = (channel) => {
        setSelectedChannel(channel)
    }
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
                'asdfsdf',
                { name: "Test", }
            );
            await channel.watch();
            // setIsReady(true)
        };

        const disconnectClient = async () => {
            await client.disconnectUser();
        }
        connectUser()
        return () => {
            disconnectClient();
        };

    }, []);
    // if (!isLoadingComplete || !isReady) {
    //     return null;
    // } else {
    return (
        <SafeAreaProvider style={styles.root}>
            <Chat client={client}>
                {/* {setChannel ? (
                    <Text>
                        Channel Page
                    </Text>
                ) : (
                    <ChannelList
                        onSelect={onChannelPressed}
                    />
                )} */}
                <ChannelList />
            </Chat>
        </SafeAreaProvider>
    )
}
// }
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
});
export default ChatService