import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parent}>
          <View style={styles.parentTag}>
            <Icon name="swipe" />
            <Text>swipe on an item to delete</Text>
          </View>
          <View style={styles.parentProduct}>
            <Image
              style={styles.productPict}
              source={require('../assets/productCart.png')}
            />
            <View style={styles.productChild}>
              <Text style={styles.productName}>Veggie tomato mix</Text>
              <Text style={styles.price}>IDR 34.000</Text>
              <Text style={styles.status}>
                Picked up at store [April 27th 2020, 8 AM]
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  parentTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  parent: {
    marginHorizontal: 30,
    alignItems: 'center',
  },
  parentProduct: {
    width: 300,
    backgroundColor: '#ffff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 10,
  },
  parentPrice: {
    flexDirection: 'row',
    marginTop: 5,
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  price: {
    color: '#895537',
    fontWeight: 'bold',
  },
  productChild: {
    marginHorizontal: 10,
  },
  productPict: {
    borderRadius: 100,
    marginLeft: 10,
  },
  counter: {
    flexDirection: 'row',
    backgroundColor: '#6A4029',
    width: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  counterChild: {
    color: 'white',
    fontWeight: 'bold',
  },
  status: {
    width: 200,
  },
});
