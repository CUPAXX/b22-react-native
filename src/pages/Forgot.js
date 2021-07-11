import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const image = require('../assets/bgForgot.png');

export default class Forgot extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.bg}>
          <View style={styles.bgBlack}>
            <Text style={styles.tagline}>Don’t Worry!</Text>
            <Text style={styles.subline}>
              Enter your email adress to get reset password link
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email adress"
              placeholderTextColor="#fff"
            />
            <Text style={styles.forgot}>Haven’t received any link?</Text>
            <TouchableOpacity style={styles.buttonBrown}>
              <Text style={styles.btnTextBrown}>Resend Link</Text>
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
    marginBottom: 100,
  },
  bg: {
    flex: 1,
    resizeMode: 'center',
  },
  bgBlack: {
    height: '100%',
    marginHorizontal: 50,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonBrown: {
    marginTop: 40,
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
  input: {
    alignSelf: 'auto',
    height: 40,
    width: 300,
    marginVertical: 15,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontWeight: '700',
    // letterSpacing: 2,
  },
  forgot: {
    color: 'white',
    fontSize: 15,
    marginTop: 10,
    alignSelf: 'center',
  },
});
