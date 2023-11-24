import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    StatusBar,
    Text,
    SafeAreaView,
} from 'react-native';
import React from 'react';
import Swiper from 'react-native-deck-swiper'
import { Transitioning, Transition } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window')
const colors = {
    red: '#EC2379',
    blue: '#0070FF',
    gray: '#777777',
    white: '#ffffff',
    black: '#000000'
};
// const transition = (
//     <Transition.Sequence>
//         <Transition.Out
//             type='slide-bottom'
//             durationMs={ANIMATION_DURATION}
//             interpolation='easeIn'
//         />
//         <Transition.Together>
//             <Transition.In
//                 type='fade'
//                 durationMs={ANIMATION_DURATION}
//                 delayMs={ANIMATION_DURATION / 2}
//             />
//             <Transition.In
//                 type='slide-bottom'
//                 durationMs={ANIMATION_DURATION}
//                 delayMs={ANIMATION_DURATION / 2}
//                 interpolation='easeOut'
//             />
//         </Transition.Together>
//     </Transition.Sequence>
// );
const swiperRef = React.createRef();
const transitionRef = React.createRef();
export default function HomeScreen() {
    const Properties = [
        { id: "1", uri: require('../../../assets/images/property_1.jpeg') },
        { id: "2", uri: require('../../../assets/images/property_2.jpeg') },
        { id: "3", uri: require('../../../assets/images/property_3.jpeg') },
        { id: "4", uri: require('../../../assets/images/property_4.jpeg') },
        { id: "5", uri: require('../../../assets/images/property_5.jpeg') },
        { id: "6", uri: require('../../../assets/images/property_6.jpeg') },
        { id: "7", uri: require('../../../assets/images/property_7.jpeg') },
        { id: "8", uri: require('../../../assets/images/property_8.jpeg') },
        { id: "9", uri: require('../../../assets/images/property_9.jpeg') },
        { id: "10", uri: require('../../../assets/images/property_10.jpeg') }
    ]
    const [index, setIndex] = React.useState(0)

    const Card = ({ card }) => (
        <Image source={card.uri} style={styles.cardImage} />
    )
    const CardDetails = ({ index }) => (
        <View key={Properties[index].id} style={{ alignItems: 'center' }}>
            {/* <Text style={[styles.text, styles.heading]} numberOfLines={2}>
                {data[index].name}
            </Text> */}
            {/* <Text style={[styles.text, styles.price]}>{data[index].price}</Text> */}
        </View>
    );


    const onSwiped = () => {
        setIndex(index + 1)
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.swiperContainer}>
                <Swiper
                    cards={Properties}
                    cardIndex={index}
                    ref={swiperRef}
                    renderCard={(card) => <Card card={card} />}
                    onSwiper={onSwiped}
                    stackSize={3} // how many items are displayed on top of each other 
                    // stackScale={10} // how much the height shrinks in percentage
                    stackSeparation={14} // spacing between current item and upcoming items
                    disableTopSwipe
                    disableBottomSwipe
                    infinite
                    backgroundColor={'transparent'}
                    cardVerticalMargin={50}
                />
            </View>
            <View style={styles.bottomContainer}>
                {/* <CardDetails index={index} /> */}
                <View style={styles.bottomContainerButtons}>
                    <MaterialCommunityIcons.Button
                        name='close-outline'
                        size={94}
                        backgroundColor='transparent'
                        underlayColor='transparent'
                        activeOpacity={0.3}
                        color={colors.red}
                        onPress={() => swiperRef.current.swipeLeft()}
                    />
                    <MaterialCommunityIcons.Button
                        name='check-outline'
                        size={94}
                        backgroundColor='transparent'
                        underlayColor='transparent'
                        activeOpacity={0.3}
                        color={colors.blue}
                        onPress={() => swiperRef.current.swipeRight()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#D4E8FF'
        backgroundColor: 'white'
    },
    swiperContainer: {
        flex: 0.55,
    },
    bottomContainer: {
        flex: 0.45,
        justifyContent: 'space-evenly'
    },
    cardImage: {
        width: '100%',
        height: '55%',
        borderRadius: 8,
        resizeMode: 'cover',
        top: '2%'
    },
    bottomContainerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 40
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
})

