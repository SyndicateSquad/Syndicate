import {
    View,
    StyleSheet,
    Image,
    StatusBar,
    Text,
    SafeAreaView,
} from 'react-native';
import React from 'react';
import Swiper from 'react-native-deck-swiper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransformSharp } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
const colors = {
    red: '#EC2379',
    blue: '#0070FF',
    gray: '#777777',
    white: '#ffffff',
    black: '#000000'
};

const swiperRef = React.createRef();
export default function HomeScreen() {
    const Properties = [
        {
            id: "1",
            uri: require('../../../assets/images/property_1.jpeg'),
            type: "Commercial",
            propertySize: "500 sq. ft.",
            minimumInvestment: "$100,000",
            estimatedPriceRange: "$500,000 - $700,000"
        },
        {
            id: "2",
            uri: require('../../../assets/images/property_2.jpeg'),
            type: "Residential",
            propertySize: "1200 sq. ft.",
            minimumInvestment: "$150,000",
            estimatedPriceRange: "$700,000 - $900,000"
        },
        {
            id: "3",
            uri: require('../../../assets/images/property_3.jpeg'),
            type: "Hospitality",
            propertySize: "150,000 sq. ft.",
            minimumInvestment: "$20,000",
            estimatedPriceRange: "$100,000"
        },
        {
            id: "4",
            uri: require('../../../assets/images/property_4.jpeg'),
            type: "Hospitality",
            propertySize: "50,000 sq. ft",
            minimumInvestment: "$250,000",
            estimatedPriceRange: "$250,000"
        },
        {
            id: "5",
            uri: require('../../../assets/images/property_5.jpeg'),
            type: "Industrial",
            propertySize: "200,000 sq ft",
            minimumInvestment: "$15,000",
            estimatedPriceRange: "$500,000"
        },
        {
            id: "6",
            uri: require('../../../assets/images/property_6.jpeg'),
            type: "Commercial",
            propertySize: "500,000 sq ft",
            minimumInvestment: "$100,000",
            estimatedPriceRange: "$1,000,000"
        },
        {
            id: "7",
            uri: require('../../../assets/images/property_7.jpeg'),
            type: "Residential",
            propertySize: "80,000 sq ft",
            minimumInvestment: "$80,000",
            estimatedPriceRange: "$400,000"
        },
        {
            id: "8",
            uri: require('../../../assets/images/property_8.jpeg'),
            type: "Commercial",
            propertySize: "300,000 sq ft",
            minimumInvestment: "$200,000",
            estimatedPriceRange: "$1,000,000"
        },
        {
            id: "9",
            uri: require('../../../assets/images/property_9.jpeg'),
            type: "Hospitality",
            propertySize: "120,000 sq ft",
            minimumInvestment: "$50,000",
            estimatedPriceRange: "$600,000"
        },
        {
            id: "10",
            uri: require('../../../assets/images/property_10.jpeg'),
            type: "Industrial",
            propertySize: "250,000 sq ft",
            minimumInvestment: "$300,000",
            estimatedPriceRange: "$2,000,000"
        }
    ]
    const [index, setIndex] = React.useState(0)
    const Card = ({ card }) => (
        <Image source={card.uri} style={styles.cardImage} />
    )
    // const CardDetails = ({ index }) => (
    //     <View key={Properties[index].id} style={{ alignItems: 'center', paddingTop: 60 }}>
    //         <Text style={[styles.text, styles.heading]} numberOfLines={2}>
    //             {Properties[index].type}
    //         </Text>
    //         <Text style={[styles.text, styles.minimumInvestment]}>
    //             Minimum Investment: {Properties[index].minimumInvestment}
    //         </Text>
    //     </View>
    // )
    const onSwiped = () => {
        setIndex(index + 1)
    }
    const navigation = useNavigation();
    const onProfilePressed = () => {
        // navigation.navigate('Listings')
        navigation.navigate('Chatting')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <MaterialCommunityIcons.Button
                    name='account-circle'
                    size={60}
                    color='black'
                    backgroundColor='transparent'
                    paddingBottom={0}
                    onPress={onProfilePressed}
                    underlayColor='transparent'
                    activeOpacity={.3}
                />
            </View>
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
                // cardVerticalMargin={50}
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
        top: '-3%'
    },
    bottomContainerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    // text: { fontFamily: 'Courier' },
    minimumInvestment: {
        color: colors.blue,
        fontSize: 20,
        fontWeight: '500'
    }
})

