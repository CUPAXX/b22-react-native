import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Radio} from 'native-base';

export default class Checkout extends Component {
  state = {
    checked: '',
  };
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.parent}>
          <Text style={styles.deliv}>Delivery</Text>
          <View style={styles.top}>
            <Text style={styles.add}>Address Details</Text>
            <Text style={styles.change}>Change</Text>
          </View>
          <View style={styles.parentTopAdd}>
            <View style={styles.parentAddress}>
              <TextInput
                style={styles.input}
                placeholder="Iskandar Street"
                placeholderTextColor="black"
              />
              <TextInput
                style={styles.input}
                placeholder="Km 5 refinery road oppsite republic road, effurun, Jakarta"
                multiline={true}
                placeholderTextColor="black"
              />
              <TextInput
                style={styles.input}
                placeholder="+62 81348287878"
                multiline={true}
                placeholderTextColor="black"
              />
            </View>
          </View>
          <Text style={styles.delivMet}>Delivery methods</Text>
          <View style={styles.parentTopDeliv}>
            <View style={styles.parentDeliv}>
              <Radio.Group
                name="radioDeliv"
                value={this.state.checked}
                colorScheme="amber"
                onChange={nextChecked => {
                  this.setState({checked: nextChecked});
                }}>
                <Radio accessibilityLabel="radio" value="Door Delivery" my={1}>
                  <Text style={styles.textDeliv}>Door Delivery</Text>
                </Radio>
                <Radio
                  accessibilityLabel="radio"
                  value="Pickup At Store"
                  my={1}>
                  <Text style={styles.textDeliv}>Pickup At Store</Text>
                </Radio>
                <Radio accessibilityLabel="radio" value="Dine In" my={1}>
                  <Text style={styles.textDeliv}>Dine In</Text>
                </Radio>
              </Radio.Group>
            </View>
          </View>
          <View style={styles.parentTotal}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.price}>IDR 123.000</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Payment')}>
            <Text style={styles.btnText}>Proceed to payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  deliv: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  add: {
    fontWeight: 'bold',
  },
  change: {
    color: '#6A4029',
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  delivMet: {
    paddingTop: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  total: {
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  parent: {
    marginTop: 90,
    marginBottom: 30,
    marginHorizontal: 30,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  parentTopAdd: {
    alignItems: 'center',
  },
  parentAddress: {
    backgroundColor: '#ffff',
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  textDeliv: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  input: {
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
  },
  parentTopDeliv: {
    alignItems: 'center',
  },
  parentDeliv: {
    backgroundColor: '#ffff',
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  checkboxCont: {
    backgroundColor: '#ffff',
    borderWidth: 0,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
  },
  parentTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
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
});
