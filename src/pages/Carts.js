import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import ItemCarts from '../components/ItemCarts';
import {setOrders, deleteItems} from '../redux/actions/carts';
import {SwipeListView} from 'react-native-swipe-list-view';

class Carts extends Component {
  onPlus = orderData => {
    const {items} = this.props.carts;
    let getIndex;
    items.map((order, index) => {
      if (order.id === orderData.id) {
        getIndex = index;
      }
    });
    items[getIndex].amount += 1;
    // console.log(items[getIndex]);
    this.props.setOrders(items);
  };

  onMins = orderData => {
    const {items} = this.props.carts;
    let getIndex;
    items.map((order, index) => {
      if (order.id === orderData.id) {
        getIndex = index;
      }
    });
    if (items[getIndex].amount <= 1) {
      ToastAndroid.showWithGravity(
        'At Least 1 Item',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } else {
      items[getIndex].amount -= 1;
      this.props.setOrders(items);
    }
  };

  render() {
    console.log(this.props.carts);
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.parent}>
          <View style={styles.warpAll}>
            <View style={styles.parentTag}>
              <Icon name="swipe" />
              <Text>swipe on an item to delete</Text>
            </View>

            <SwipeListView
              data={this.props.carts.items}
              renderItem={(data, rowMap) => (
                <ItemCarts
                  key={data.item.id}
                  name={data.item.productName}
                  price={data.item.base_price}
                  image={data.item.picture}
                  amount={data.item.amount}
                  funcPlus={() => this.onPlus(data.item)}
                  funcMin={() => this.onMins(data.item)}
                />
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.parentHide}>
                  <TouchableOpacity style={styles.actionCircle}>
                    <Icon name="favorite-border" size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.deleteItems(data.index)}
                    style={styles.actionCircle}>
                    <Icon name="delete-outline" size={25} />
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={130}
              rightOpenValue={-130}
            />
          </View>

          <View style={styles.bottom}>
            {this.props.carts.items.length !== 0 ? (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.props.navigation.navigate('Checkout')}>
                <Text style={styles.btnText}>Confirm and Checkout</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.textEmpty}>
                You Don't Have Any Item In Cart
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts,
});

const mapDispatchToProps = {
  setOrders,
  deleteItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Carts);

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
    marginBottom: 30,
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
    marginTop: 10,
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
  parentHide: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  actionCircle: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#FFBA33',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    textAlign: 'center',
  },
});

// {items.map(d => (
//   <ItemCarts
//     key={d.id}
//     name={d.productName}
//     price={d.base_price}
//     image={d.picture}
//     amount={d.amount}
//     funcPlus={() => this.onPlus(d)}
//     funcMin={() => this.onMins(d)}
//   />
// ))}
