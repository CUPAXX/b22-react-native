import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';

import {chatList, searchUser} from '../redux/actions/chat';
import {profileUser} from '../redux/actions/profile';
import {REACT_APP_BASE_URL} from '@env';
import {io} from 'socket.io-client';

const socket = io(`${REACT_APP_BASE_URL}`);

class Chat extends Component {
  state = {
    column: 'userName',
    search: '',
    searchData: [],
  };

  getList = () => {
    const {token} = this.props.auth;
    this.props.chatList(token);
    this.props.profileUser(token);
  };
  componentDidMount() {
    this._isMounted = true;
    this.getList();
    const {phoneNumber} = this.props.profile.data;
    const {token} = this.props.auth;
    socket.on(phoneNumber, data => {
      console.log(socket.id, data);
      this.props.chatList(token);
    });
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getList();
      },
    );
  }

  componentDidUpdate() {
    const {phoneNumber} = this.props.profile.data;
    const {token} = this.props.auth;
    socket.on(phoneNumber, data => {
      console.log(socket.id, data);
      this.props.chatList(token);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  search = () => {
    const column = this.state.column;
    const search = this.state.search;
    const {token} = this.props.auth;
    this.props.searchUser(column, search, token).then(() => {
      this.setState({
        searchData: this.props.chat.userData,
      });
    });
  };

  handleChange = val => {
    this.setState({
      search: val,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parent}>
          <View>
            <SearchBar
              placeholder="Search"
              onChangeText={this.handleChange}
              onSubmitEditing={() => this.search()}
              value={this.state.search}
              platform="android"
              containerStyle={styles.searchContainer}
              inputStyle={styles.searchInput}
            />
            <Picker
              style={styles.widthPicker}
              selectedValue={this.state.column}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({column: itemValue})
              }>
              <Picker.Item label="Name" value="userName" />
              <Picker.Item label="Phone" value="phoneNumber" />
            </Picker>
          </View>
          {this.state.search === '' ? (
            <View>
              <Text style={styles.textTop}>
                Choose a staff you want to talk with
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.parentCont}>
                {this.props.chat.data.map(d => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Room Chat', {
                        userSelected: d,
                      })
                    }
                    key={d.id}
                    style={styles.parentProf}>
                    <Image style={styles.prof} source={{uri: `${d.picture}`}} />
                    <Text style={styles.profName}>{d.userName}</Text>
                    <Text style={styles.profNum}>{d.phoneNumber}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View>
              <Text style={styles.textTop}>Result</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.parentCont}>
                {this.state.searchData.map(d => {
                  return d.userName !== this.props.profile.data.userName ? (
                    <React.Fragment>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Room Chat', {
                            userSelected: d,
                          })
                        }
                        key={d.id}
                        style={styles.parentProf}>
                        <Image
                          style={styles.prof}
                          source={{uri: `${d.picture}`}}
                        />
                        <Text style={styles.profName}>{d.userName}</Text>
                        <Text style={styles.profNum}>{d.phoneNumber}</Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  ) : (
                    <View />
                  );
                })}
              </ScrollView>
            </View>
          )}
          <View style={styles.Line} />

          <Text style={styles.textBot}>Message</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.props.chat.data.map(d => (
              <TouchableOpacity
                key={d.id}
                onPress={() =>
                  this.props.navigation.navigate('Room Chat', {
                    userSelected: d,
                  })
                }
                style={styles.botParent}>
                <Image style={styles.botProf} source={{uri: `${d.picture}`}} />
                <View style={styles.botCon}>
                  <Text style={styles.nameBot}>{d.userName}</Text>
                  {d.message !== null ? (
                    <Text style={styles.message}>{d.message}</Text>
                  ) : (
                    <Text style={styles.message}>Send you files</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <Text style={styles.textUnder}>You have no conversation left</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = {chatList, searchUser, profileUser};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  parent: {
    marginHorizontal: 30,
    marginTop: 90,
    flex: 1,
  },
  searchContainer: {
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    height: 55,
    justifyContent: 'center',
  },
  searchInput: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  textTop: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 13,
  },
  prof: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  parentCont: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentProf: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  profName: {
    fontWeight: 'bold',
    paddingTop: 10,
  },
  profNum: {
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  Line: {
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  textBot: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  botParent: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  botCon: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  botProf: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
  },
  nameBot: {
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  message: {
    fontSize: 12,
  },
  textUnder: {
    textAlign: 'center',
    flex: 1,
    textAlignVertical: 'bottom',
    paddingVertical: 35,
    color: '#b0b0b0',
  },
});
