import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import ItemCarts from '../components/ItemCarts';

class Carts extends Component {
  render() {
    const {items} = this.props?.carts;
    console.log(items);
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.parent}>
          <View style={styles.warpAll}>
            <View style={styles.parentTag}>
              <Icon name="swipe" />
              <Text>swipe on an item to delete</Text>
            </View>
            {items.map(d => (
              <ItemCarts
                key={d.id}
                name={d.productName}
                price={d.base_price}
                image={d.picture}
              />
            ))}
          </View>

          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('Checkout')}>
              <Text style={styles.btnText}>Confirm and Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts,
});

export default connect(mapStateToProps, null)(Carts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  parentTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 10,
  },
  parent: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  parentProduct: {
    width: 300,
    height: 100,
    backgroundColor: '#ffff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
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
  btn: {
    backgroundColor: '#6A4029',
    paddingVertical: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  warpAll: {
    alignItems: 'center',
  },
  bottom: {
    paddingBottom: 30,
    paddingTop: 40,
  },
});
