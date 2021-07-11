import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Promo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.tagLine}>Stay Hungry!</Text>
          <Text style={styles.subTag}>Good deals update every wednesday</Text>
          <View style={styles.parentProduct}>
            {[...Array(20)].map((_i, idx) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('product detail')}
                style={styles.productCart}
                key={String(idx)}>
                <Image
                  style={styles.pictProduct}
                  source={require('../assets/product2.png')}
                />
                <View style={styles.parentDisc}>
                  <Text style={styles.priceDisc}>IDR 24.000</Text>
                </View>
                <Text style={styles.productName}>Hazelnut Latte</Text>
                <Text style={styles.price}>IDR 25.000</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  tagLine: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
  },
  subTag: {
    textAlign: 'center',
    marginBottom: 20,
  },
  parentDisc: {
    backgroundColor: '#ffff',
    width: 110,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: -40,
  },
  priceDisc: {
    fontWeight: 'bold',
    color: '#6A4029',
  },
  parentProduct: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  productCart: {
    backgroundColor: '#ffff',
    height: 180,
    width: 150,
    borderRadius: 30,
    elevation: 5,
    marginVertical: 30,
    marginHorizontal: 10,
    marginTop: 60,
    alignItems: 'center',
  },
  pictProduct: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: -50,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    textDecorationLine: 'line-through',
    paddingTop: 10,
  },
});
