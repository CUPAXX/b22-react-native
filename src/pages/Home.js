import React, {Component} from 'react';
import {SearchBar} from 'react-native-elements';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import {Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemHome from '../components/ItemHome';
import ItemHome2 from '../components/ItemHome2';
import Category from '../components/Category';
import {connect} from 'react-redux';
import {getItemSec} from '../redux/actions/item';
import {getCategory} from '../redux/actions/category';
import {getItemCategory} from '../redux/actions/cateItem';

class Home extends Component {
  state = {
    search: '',
    categories: [],
    favoriteProduct: [],
    coffee: [],
    nonCoffee: [],
    foods: [],
    addOn: [],
    isLoading: true,
    loading: true,
    itemSearch: [],
  };
  componentDidMount() {
    // this.props.getCategory();
    this.getProduct();
    this.getSearch();

    // console.log(this.props.getItemCategory(this.props.route.params.id));
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  getProduct = () => {
    this.props.getCategory().then(() => {
      this.props.getItemCategory(1).then(() => {
        this.setState({
          favoriteProduct: this.props.cateItem.data,
        });
        this.props.getItemCategory(2).then(() => {
          this.setState({
            coffee: this.props.cateItem.data,
          });
          this.props.getItemCategory(3).then(() => {
            this.setState({
              nonCoffee: this.props.cateItem.data,
            });
            this.props.getItemCategory(4).then(() => {
              this.setState({
                foods: this.props.cateItem.data,
              });
              this.props.getItemCategory(5).then(() => {
                this.setState({
                  addOn: this.props.cateItem.data,
                });
              });
            });
          });
        });
      });
      this.setState({
        categories: this.props.category.data,
        isLoading: false,
      });
    });
  };

  getSearch = () => {
    this.props.getItemSec().then(() => {
      this.setState({
        itemSearch: this.props.item.data,
        isLoading: false,
      });
    });
  };

  updateSearch = search => {
    this.setState({search});
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.parent}>
          <Text style={styles.tagLine}>A good coffee is a good day</Text>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={this.state.search}
            platform="android"
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
          />

          {this.state.search !== '' ? (
            <View style={styles.parentGroup}>
              <Category title="Result" />
              <View style={styles.coba}>
                {this.state.itemSearch
                  .filter(coba =>
                    coba.productName.includes(`${this.state.search}`),
                  )
                  .map(dFilter => (
                    <ItemHome2
                      func={() =>
                        this.props.navigation.navigate('detail', {
                          id: dFilter.id,
                        })
                      }
                      key={dFilter.id}
                      name={dFilter.productName}
                      price={dFilter.price}
                      image={dFilter.picture}
                    />
                  ))}
              </View>
            </View>
          ) : (
            <React.Fragment>
              <View style={styles.parentGroup}>
                <Category title={this.state.categories[0]?.categoryName} />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SeeMore', {id: 1})
                  }>
                  <Text style={styles.see}>See More</Text>
                </TouchableOpacity>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.favoriteProduct !== [] ? (
                    this.state.favoriteProduct.map(d => (
                      <ItemHome
                        func={() =>
                          this.props.navigation.navigate('detail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.productName}
                        price={d.price}
                        image={d.picture}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>

              <View style={styles.parentGroup}>
                <Category title={this.state.categories[1]?.categoryName} />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SeeMore', {id: 2})
                  }>
                  <Text style={styles.see}>See More</Text>
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {this.state.coffee !== [] ? (
                    this.state.coffee.map(d => (
                      <ItemHome
                        func={() =>
                          this.props.navigation.navigate('detail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.productName}
                        price={d.price}
                        image={d.picture}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>

              <View style={styles.parentGroup}>
                <Category title={this.state.categories[2]?.categoryName} />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SeeMore', {id: 3})
                  }>
                  <Text style={styles.see}>See More</Text>
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {this.state.nonCoffee !== [] ? (
                    this.state.nonCoffee.map(d => (
                      <ItemHome
                        func={() =>
                          this.props.navigation.navigate('detail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.productName}
                        price={d.price}
                        image={d.picture}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>

              <View style={styles.parentGroup}>
                <Category title={this.state.categories[3]?.categoryName} />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SeeMore', {id: 4})
                  }>
                  <Text style={styles.see}>See More</Text>
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {this.state.foods !== [] ? (
                    this.state.foods.map(d => (
                      <ItemHome
                        func={() =>
                          this.props.navigation.navigate('detail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.productName}
                        price={d.price}
                        image={d.picture}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>

              <View style={styles.parentGroup}>
                <Category title={this.state.categories[4]?.categoryName} />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SeeMore', {id: 5})
                  }>
                  <Text style={styles.see}>See More</Text>
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {this.state.addOn !== [] ? (
                    this.state.addOn.map(d => (
                      <ItemHome
                        func={() =>
                          this.props.navigation.navigate('detail', {
                            id: d.id,
                          })
                        }
                        key={d.id}
                        name={d.productName}
                        price={d.price}
                        image={d.picture}
                      />
                    ))
                  ) : (
                    <Spinner color="black" />
                  )}
                </ScrollView>
              </View>
            </React.Fragment>
          )}
        </ScrollView>
        <View style={styles.botNavParent}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('home')}>
            <Icon name={'home'} size={30} color="#6A4029" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Icon name={'user-o'} size={30} color="#ADADAF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Edit Profile')}>
            <Icon name={'commenting-o'} size={30} color="#ADADAF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  parent: {
    marginHorizontal: 30,
    marginTop: 90,
  },
  tagLine: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: '#EFEEEE',
    paddingHorizontal: 8,
    height: 55,
    justifyContent: 'center',
  },
  searchInput: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  see: {
    color: '#6A4029',
    paddingTop: 5,
    textAlign: 'right',
    fontSize: 16,
  },
  botNavParent: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    alignItems: 'center',
  },
  parentGroup: {
    marginVertical: 20,
  },
  coba: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
});

const mapStateToProps = state => ({
  item: state.item,
  category: state.category,
  cateItem: state.cateItem,
});

const mapDispatchToProps = {getItemSec, getCategory, getItemCategory};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                data={this.state.categories}
                horizontal
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('home', {id: item.id})
                    }>
                    <Text style={styles.categoryProduct}>
                      {item.categoryName}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => String(item.id)}
              />
            </ScrollView> */

/* <FlatList
              data={this.props.item.data}
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('detail', {id: item.id})
                  }
                  style={styles.productCart}>
                  <Image
                    style={styles.pictProduct}
                    source={{uri: `${item.picture}`}}
                  />
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.price}>IDR {item.price}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => String(item.id)}
            /> */
