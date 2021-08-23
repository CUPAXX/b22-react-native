import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  LogBox,
} from 'react-native';
import {connect} from 'react-redux';
import {getItemCategory} from '../redux/actions/cateItem';

import ItemHome2 from '../components/ItemHome2';

class SeeMoreProduct extends Component {
  state = {
    cateName: '',
  };
  getData = () => {
    const id = this.props.route.params.id;
    this.props.getItemCategory(id).then(() => {
      if (id === 1) {
        this.setState({
          cateName: 'Favorite',
        });
      } else if (id === 2) {
        this.setState({
          cateName: 'Coffee',
        });
      } else if (id === 3) {
        this.setState({
          cateName: 'Non Coffee',
        });
      } else if (id === 4) {
        this.setState({
          cateName: 'Food',
        });
      } else if (id === 5) {
        this.setState({
          cateName: 'AddOns',
        });
      }
    });
  };

  componentDidMount() {
    this.getData();

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }
  render() {
    console.log(this.state.cateName);
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.tagLine}>Everyone’s {this.state.cateName}</Text>
          <View style={styles.parentProduct}>
            <FlatList
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={styles.wrapperCard}
              data={this.props.cateItem.data}
              numColumns={2}
              renderItem={({item}) => (
                <ItemHome2
                  func={() =>
                    this.props.navigation.navigate('detail', {
                      id: item.id,
                    })
                  }
                  key={item.id}
                  name={item.productName}
                  price={item.price}
                  image={item.picture}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  cateItem: state.cateItem,
});

const mapDispatchToProps = {getItemCategory};

export default connect(mapStateToProps, mapDispatchToProps)(SeeMoreProduct);

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
    marginBottom: 30,
  },
  parentProduct: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCart: {
    backgroundColor: '#ffff',
    height: 180,
    width: 150,
    borderRadius: 30,
    elevation: 5,
    marginVertical: 30,
    marginRight: 30,
    marginTop: 60,
    alignItems: 'center',
  },
  pictProduct: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginTop: -40,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#6A4029',
  },
  wrapperCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
