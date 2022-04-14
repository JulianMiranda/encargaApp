/**
 * Created by Dongtao on 02/07/2018.
 */
import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AppState,
  NativeAppEventEmitter,
  Animated,
  Text,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class JDtest extends PureComponent {
  constructor(props: any) {
    super(props);

    this.state = {
      fadeInOpacity: new Animated.Value(0), // Inicializar un objeto de animación
      animValue: new Animated.Value(1),
      yPosition: 0.0, // Bit de bandera, registra el valor actual

      fadeAnim: new Animated.Value(1.0),
      opacity: 'rgba(0, 0, 0, 0.3)',
    };
  }

  componentDidMount() {
    this.translateX(this.callbackfun.bind(this));
  }

  callbackfun() {
    console.log('0000000');
  }

  render() {
    return (
      <View style={[styles.container, {}]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.translateX();
          }}
          style={{
            width: width,
            height: JDDevice.getRpx(88),
            backgroundColor: 'red',
            zIndex: 100,
          }}>
          <Text>'11111111'</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            width: JDDevice.getRpx(500),
            height: JDDevice.getRpx(600),
            backgroundColor: 'red',
            position: 'absolute',
            top: -JDDevice.getRpx(600),
            zIndex: 4,
            /*
                                            2. Vincula el valor de la animación al atributo de estilo.
                      * */
            transform: [
              {
                translateY: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [JDDevice.getRpx(600), 0], // Interpolación lineal, 0 corresponde a -100, 1 corresponde a 0
                }),
              },
            ],
          }}></Animated.View>
        <TouchableOpacity
          onPress={() => {
            this.translateX();
          }}
          style={{
            width: width,
            height: height,
            backgroundColor: this.state.opacity,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}></TouchableOpacity>
      </View>
    );
  }

  translateX = () => {
    this.state.yPosition = this.state.yPosition == 0.0 ? 1.0 : 0.0;

    Animated.timing(this.state.animValue, {
      toValue: this.state.yPosition, // valor objetivo
      duración: 200, // tiempo de animación
      // easing: Easing.linear // función de suavizado
    }).start();

    let opacity =
      this.state.opacity === 'rgba(0, 0, 0, 0.3)'
        ? 'rgba(0, 0, 0, 0)'
        : 'rgba(0, 0, 0, 0.3)';
    this.setState({
      opacity,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  iamge: {
    width: 100,
    height: 100,
    backgroundColor: 'pink',
    marginTop: 20,
  },
});

//     <View style={{width:30,height:30,backgroundColor:'red'}}></View>
//
// <Animated.View style={{
//     width:JDDevice.getRpx(100),
//     height:JDDevice.getRpx(100),
//     backgroundColor:'pink',
//     /*
// 2. Vincula el valor de la animación al atributo de estilo
//      * */
//     opacity: this.state.fadeInOpacity
// }}>
// </Animated.View>
