import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class NoInternet extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgBlack}>
          <Image
            source={require('../assets/Nointernet.png')}
            style={styles.iconInternet}
          />
          <Text style={styles.tagline}>No internet Connection</Text>
          <Text style={styles.subline}>
            Your internet connection is currently not available please check or
            try again.
          </Text>
          <TouchableOpacity style={styles.buttonBrown}>
            <Text style={styles.btnTextBrown}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  iconInternet: {
    marginTop: 150,
    alignSelf: 'center',
  },
  tagline: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subline: {
    marginBottom: 100,
    textAlign: 'center',
  },
  bgBlack: {
    height: '100%',
    marginHorizontal: 60,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonBrown: {
    marginTop: 10,
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
});
