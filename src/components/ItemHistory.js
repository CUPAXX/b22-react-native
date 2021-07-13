import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';

const ItemHistory = props => {
  return (
    <View style={styles.parentProduct}>
      <Image
        source={require('../assets/product1.png')}
        style={styles.productPict}
      />
      <View style={styles.parentInside}>
        <Text style={styles.productName}>{props.name}</Text>
        <Text style={styles.price}>IDR {props.price}</Text>
        <Text style={styles.status}>{props.address}</Text>
      </View>
    </View>
  );
};
export default ItemHistory;

const styles = StyleSheet.create({
  parentProduct: {
    width: 300,
    backgroundColor: '#ffff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 10,
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
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 15,
  },
});
