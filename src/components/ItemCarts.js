import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ItemCarts = props => {
  return (
    <View style={styles.parentProduct}>
      <Image style={styles.productPict} source={{uri: `${props.image}`}} />
      <View style={styles.productChild}>
        <Text style={styles.productName}>{props.name}</Text>
        <View style={styles.parentPrice}>
          <Text style={styles.price}>IDR {props.price}</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={props.funcMin}>
              <Text style={styles.counterChild}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{props.amount}</Text>
            <TouchableOpacity onPress={props.funcPlus}>
              <Text style={styles.counterChild}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemCarts;

const styles = StyleSheet.create({
  parentProduct: {
    width: 300,
    height: 100,
    backgroundColor: '#ffff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  parentPrice: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  price: {
    color: '#895537',
    fontWeight: 'bold',
  },
  productChild: {
    flex: 1,
    marginHorizontal: 10,
  },
  productPict: {
    borderRadius: 100,
    marginLeft: 10,
    width: 65,
    height: 65,
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
    fontSize: 20,
  },
  counterText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
