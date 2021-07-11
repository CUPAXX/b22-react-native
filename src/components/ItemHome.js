import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const ItemHome = props => {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity onPress={props.func} style={styles.productCart}>
        <Image style={styles.pictProduct} source={{uri: `${props.image}`}} />
        <Text style={styles.productName}>{props.name}</Text>
        <Text style={styles.price}>IDR {props.price}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default ItemHome;

const styles = StyleSheet.create({
  productCart: {
    backgroundColor: '#ffff',
    width: 150,
    borderRadius: 20,
    elevation: 10,
    marginVertical: 30,
    marginRight: 30,
    marginTop: 50,
    alignItems: 'center',
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  pictProduct: {
    width: 110,
    height: 110,
    borderRadius: 20,
    marginTop: -40,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#6A4029',
  },
});
