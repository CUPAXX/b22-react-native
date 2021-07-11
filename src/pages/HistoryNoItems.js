import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class HistoryNoItems extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgBlack}>
          <View style={styles.top}>
            <Icon name={'chevron-left'} size={20} />
            <Text style={styles.back}>History</Text>
          </View>
          <Image
            source={require('../assets/iconHistory.png')}
            style={styles.iconInternet}
          />
          <Text style={styles.tagline}>No history yet</Text>
          <Text style={styles.subline}>
            Hit the orange button down below to Create an order
          </Text>
          <TouchableOpacity style={styles.buttonBrown}>
            <Text style={styles.btnTextBrown}>Start odering</Text>
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
  top: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 100,
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
