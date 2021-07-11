import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const image = require('../assets/bgSignLogin.png');

export default class SignLogin extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.bg}>
          <View style={styles.bgBlack}>
            <Text style={styles.tagline}>Welcome!</Text>
            <Text style={styles.subline}>
              Get a cup of coffee for free every sunday morning
            </Text>
            <TouchableOpacity
              style={styles.buttonBrown}
              onPress={() => this.props.navigation.navigate('Sign')}>
              <Text style={styles.btnTextBrown}>Create New Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonYellow}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.btnTextYellow}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tagline: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 150,
  },
  subline: {
    color: 'white',
    textAlign: 'center',
  },
  bg: {
    flex: 1,
    resizeMode: 'center',
  },
  bgBlack: {
    backgroundColor: '#000000a0',
    height: '100%',
    paddingHorizontal: 30,
    // justifyContent: 'center',
  },
  buttonBrown: {
    marginTop: 250,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#6A4029',
  },
  btnTextBrown: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonYellow: {
    marginTop: 15,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FFBA33',
  },
  btnTextYellow: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
