import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';

const ItemPayment = props => {
  return (
    <View style={styles.childProduct}>
      <Image source={{uri: `${props.image}`}} style={styles.image} />
      <View style={styles.parentInside}>
        <Text style={styles.productName}>{props.name}</Text>
        <View style={styles.parentPrice}>
          <Text style={styles.productName}>X{props.amount}</Text>
          <Text style={styles.productPrice}>IDR {props.price}</Text>
        </View>
      </View>
    </View>
  );
};
export default ItemPayment;

const styles = StyleSheet.create({
  childProduct: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  parentPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentInside: {
    paddingHorizontal: 10,
    flex: 1,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
