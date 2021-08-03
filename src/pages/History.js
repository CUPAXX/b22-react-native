import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import ItemHistory from '../components/ItemHistory';
import {connect} from 'react-redux';
import {getHistory, deleteTransaction} from '../redux/actions/transaction';
import {showMessage} from 'react-native-flash-message';

class History extends Component {
  componentDidMount() {
    const {token} = this.props.auth;
    this.props.getHistory(token);
  }
  onDelete = id => {
    const {token} = this.props.auth;
    this.props.deleteTransaction(token, id).then(() => {
      showMessage({
        message: 'Delete History SuccessFully',
        type: 'success',
        backgroundColor: '#6A4029',
        color: '#fff',
        duration: 4000,
      });
      return this.props.navigation.reset({
        index: 0,
        routes: [{name: 'history'}],
      });
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.parent}>
          <View style={styles.parentTag}>
            <Icon name="swipe" />
            <Text>swipe on an item to delete</Text>
          </View>
          <SwipeListView
            data={this.props.transaction.data}
            renderItem={(data, rowMap) => (
              <ItemHistory
                key={data.item.id}
                name={data.item.code}
                price={data.item.total}
                address={data.item.shipping_address}
              />
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.parentHide}>
                <TouchableOpacity style={styles.actionCircle}>
                  <Icon name="favorite-border" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionCircle}
                  onPress={() => this.onDelete(data.item.id)}>
                  <Icon name="delete-outline" size={25} />
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={130}
            rightOpenValue={-130}
          />
          <View style={styles.bottom}>
            {this.props.transaction.data.length === 0 ? (
              <React.Fragment>
                <Text style={styles.textEmpty}>You Don't Have Any History</Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.props.navigation.navigate('home')}>
                  <Text style={styles.btnText}>Buy Some</Text>
                </TouchableOpacity>
              </React.Fragment>
            ) : (
              <Text style={styles.textEmpty}>Your Last Transaction</Text>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction,
  auth: state.auth,
});

const mapDispatchToProps = {
  getHistory,
  deleteTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(History);

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
    marginBottom: 20,
  },
  parent: {
    marginHorizontal: 30,
    alignItems: 'center',
    marginBottom: 50,
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
  bottom: {
    paddingBottom: 30,
    paddingTop: 40,
  },
  textEmpty: {
    textAlign: 'center',
    paddingBottom: 20,
  },
});
