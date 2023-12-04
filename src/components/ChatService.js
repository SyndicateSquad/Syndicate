import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';  
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import {
    Chat,
    ChannelList,
    Channel,
    MessageList,
    MessageInput
} from 'stream-chat-expo';

const client = StreamChat.getInstance("5bbwwprpy2jr");

const ChatService = () => {
    const [channel, setChannel] = useState(null);

    const onChannelPressed = (channel) => {
        setChannel(channel);
    };

    useEffect(() => {
        const connectUser = async () => {
            await client.connectUser(
                {
                    id: 'ai212559',
                    name: 'Ahmed Ibrahim',
                },
                client.devToken('ai212559'),
            );
            const channel = client.channel(
                'messaging',
                'asdfsdf',
                { name: "Test", }
            );
            await channel.watch();
        };

        const disconnectClient = async () => {
            await client.disconnectUser();
        };

        connectUser();

        return () => {
            disconnectClient();
        };
    }, []);

    return (
        <SafeAreaProvider style={styles.container}>
            <Chat client={client}>
                {channel ? (
                    <Channel channel={channel}>
                        <View style={styles.channelContainer}>
                            <MessageList />
                            <MessageInput />
                        </View>
                    </Channel>
                ) : (
                    <ChannelList
                        onSelect={onChannelPressed}
                    />
                )}
            </Chat>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '15%'
    },
    channelContainer: {
        flex: 1,
    },
});

export default ChatService;
