import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Animated,
    PanResponder,
    TouchableOpacity,
    Text
} from 'react-native';
import React from 'react';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
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
];

export default class HomeScreen extends React.Component {
    constructor() {
        super();

        this.position = new Animated.ValueXY();
        this.state = {
            currentIndex: 0
        };
        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })
        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }
        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })
        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })
    }

    componentWillMount() {
        this.PanResponder = PanResponder.create({
    
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onPanResponderMove: (evt, gestureState) => {
    
            this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
          },
          onPanResponderRelease: (evt, gestureState) => {
    
            if (gestureState.dx > 120) {
              Animated.spring(this.position, {
                toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
              }).start(() => {
                this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                  this.position.setValue({ x: 0, y: 0 })
                })
              })
            }
            else if (gestureState.dx < -120) {
              Animated.spring(this.position, {
                toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
              }).start(() => {
                this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                  this.position.setValue({ x: 0, y: 0 })
                })
              })
            }
            else {
              Animated.spring(this.position, {
                toValue: { x: 0, y: 0 },
                friction: 4
              }).start()
            }
          }
        })
      }

    renderProperties = () => {
        return Properties.map((item, i) => {
            if (i < this.state.currentIndex) {
                return null;
            } else if (i === this.state.currentIndex) {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item.id}
                        style={[
                            { opacity: this.nextCardOpacity },
                            { transform: [{ scale: this.nextCardScale }] },
                            this.rotateAndTranslate,
                            styles.view
                        ]}>
                        <Animated.View
                            style={[
                                { opacity: this.likeOpacity },
                                { transform: [{ rotate: '-30deg' }] },
                                styles.like
                            ]}>
                            <Text style={styles.likeText}>YES</Text>
                        </Animated.View>

                        <Animated.View
                            style={[
                                { opacity: this.dislikeOpacity },
                                { transform: [{ rotate: '30deg' }] },
                                styles.dislike]}>
                            <Text
                                style={styles.dislikeText}>NO</Text>
                        </Animated.View>

                        <Image
                            style={styles.Image}
                            source={item.uri}
                        />
                    </Animated.View>
                );
            } else {
                return (
                    <Animated.View
                        key={item.id}
                        style={styles.view}
                    >
                        <Image
                            style={styles.Image}
                            source={item.uri}
                        />
                    </Animated.View>
                );
            }
        }).reverse();
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <View style={{ height: 60 }}>

                </View>
                <View style={{ flex: 1 }}>
                    {this.renderProperties()}
                </View>
                <View style={{ height: 60 }}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        height: SCREEN_HEIGHT - 120,
        width: SCREEN_WIDTH,
        padding: 10,
        position: 'absolute'
    },
    Image: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
        borderRadius: 20
    },
    like: {
        position: 'absolute',
        top: 50,
        left: 40,
        zIndex: 1000
    },
    likeText: {
        borderWidth: 1,
        borderColor: 'green',
        color: 'green',
        fontSize: 32,
        fontWeight: '800',
        padding: 10
    },
    dislike: {
        position: 'absolute',
        top: 50,
        right: 40,
        zIndex: 1000
    },
    dislikeText: {
        borderWidth: 1,
        borderColor: 'red',
        color: 'red',
        fontSize: 32,
        fontWeight: '800',
        padding: 10
    },

});
