import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const image = require('../assets/bgWelcome.png');

export default class welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.bg}>
          <View style={styles.bgBlack}>
            <Text style={styles.tagline}>Coffee for Everyone</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Sign Login')}>
              <Text style={styles.btnText}>Get Started</Text>
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
    marginTop: 206,
  },
  bg: {
    flex: 1,
    resizeMode: 'center',
  },
  bgBlack: {
    backgroundColor: '#000000a0',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    marginTop: 240,
    alignItems: 'center',
    paddingHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FFBA33',
  },
  btnText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
