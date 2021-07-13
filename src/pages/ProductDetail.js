import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getDetail} from '../redux/actions/item';
import {connect} from 'react-redux';

import {addItems} from '../redux/actions/carts';

class ProductDetail extends Component {
  // {this.props.navigation.state.id}

  componentDidMount() {
    this.getData();
    // console.log(this.props.route.params.id);
  }

  getData = () => {
    const id = this.props.route.params.id;
    this.props.getDetail(id);
  };

  addItem = () => {
    const data = {
      id: this.props.item.detail.id,
      productName: this.props.item.detail.productName,
      picture: this.props.item.detail.picture,
      variant: this.props.item.detail.variant,
      base_price: this.props.item.detail.base_price,
      amount: 1,
    };
    this.props.addItems(data);
    // .then(() => {
    ToastAndroid.showWithGravity(
      'Success add to cart',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
    // });
  };

  render() {
    const {detail} = this.props.item;
    // console.log(detail);

    return (
      <View style={styles.container}>
        <View style={styles.bgYellow}>
          <Image
            style={styles.productPic}
            source={{uri: `${detail.picture}`}}
          />
          <Text style={styles.productName}>{detail.productName}</Text>
          <Text style={styles.delivCon}>{detail.deliveryCondition}</Text>
        </View>
        <View style={styles.parentTextBot}>
          <Text style={styles.textBot}>{detail.description}</Text>
        </View>
        <View style={styles.parentBot}>
          <Text style={styles.textPrice}>IDR {detail.base_price}</Text>
          <TouchableOpacity style={styles.iconShop} onPress={this.addItem}>
            <Icon name={'shopping-cart'} size={25} solid color={'#6A4029'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#362115',
    position: 'relative',
  },
  topRight: {
    marginLeft: '91%',
  },
  Top: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 20,
  },
  bgYellow: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#FFBA33',
    width: 270,
    height: 410,
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 40,
  },
  productPic: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginTop: 90,
  },
  productName: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 15,
    textTransform: 'capitalize',
  },
  delivCon: {
    paddingTop: 20,
    width: 200,
    fontSize: 15,
    textAlign: 'center',
  },
  parentTextBot: {
    marginHorizontal: 30,
    paddingTop: 50,
  },
  textBot: {
    color: 'white',
    width: 300,
    textAlign: 'justify',
  },
  parentBot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  iconShop: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  textPrice: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

const mapStateToProps = state => ({
  item: state.item,
  carts: state.carts,
});

const mapDispatchToProps = {getDetail, addItems};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
