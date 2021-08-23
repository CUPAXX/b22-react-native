import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {chatAll, sendChat, uploadFile, deleteChat} from '../redux/actions/chat';
import {profileUser} from '../redux/actions/profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

import {io} from 'socket.io-client';
import {REACT_APP_BASE_URL} from '@env';

const socket = io(`${REACT_APP_BASE_URL}`);

class RoomChat extends Component {
  state = {
    dataChat: [],
    inputMsg: '',
    selectedUser: [],
  };

  componentDidMount() {
    this.lagi();
    this.getData();
    const {phoneNumber} = this.props.profile.data;
    const {token} = this.props.auth;
    socket.on(phoneNumber, data => {
      console.log(socket.id, data);
      this.props.chatAll(data.sender, token).then(() => {
        this.setState({
          dataChat: this.props.chat.allData,
        });
      });
    });
  }

  componentDidUpdate() {
    const {phoneNumber} = this.props.profile.data;
    const {token} = this.props.auth;
    socket.on(phoneNumber, data => {
      console.log(socket.id, data);
      this.props.chatAll(data.sender, token).then(() => {
        this.setState({
          dataChat: this.props.chat.allData,
        });
      });
    });
  }

  lagi = () => {
    this.setState({
      selectedUser: this.props.route.params.userSelected,
    });
  };

  getData = () => {
    const phoneNumber = this.props.route.params.userSelected.phoneNumber;
    const {token} = this.props.auth;
    this.props.chatAll(phoneNumber, token).then(() => {
      this.setState({
        dataChat: this.props.chat.allData,
      });
    });
    this.props.profileUser(token);
  };

  onSend = () => {
    const message = this.state.inputMsg;
    const {token} = this.props.auth;
    const recipient = this.state.selectedUser.phoneNumber;

    this.props.sendChat(recipient, message, token).then(() => {
      this.props.chatAll(recipient, token).then(() => {
        this.setState({
          dataChat: this.props.chat.allData,
        });
      });
      this.setState({
        inputMsg: '',
      });
    });
  };

  onPick = () => {
    Alert.alert('Option', 'Choose your image', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: () => this.selectLaunch(),
      },
      {
        text: 'Galery',
        onPress: () => this.selectPict(),
      },
    ]);
  };

  selectPict = e => {
    let options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        const maxSize = 1024 * 1024 * 2;
        if (response.assets[0].fileSize < maxSize) {
          const {token} = this.props.auth;
          const recipient = this.state.selectedUser.phoneNumber;
          this.props
            .uploadFile(recipient, response.assets[0].uri, token)
            .then(() => {
              this.getData();
            });
        } else {
          showMessage({
            message: 'File To Large!',
            type: 'danger',
            backgroundColor: '#d63031',
            color: '#fff',
            duration: 2000,
          });
        }
      }
    });
  };

  selectLaunch = e => {
    let options = {
      mediaType: 'photo',
      maxWidth: 150,
      maxHeight: 150,
    };
    launchCamera(options, response => {
      if (!response.didCancel) {
        const maxSize = 1024 * 1024 * 2;
        if (response.assets[0].fileSize < maxSize) {
          const {token} = this.props.auth;
          const recipient = this.state.selectedUser.phoneNumber;
          this.props
            .uploadFile(recipient, response.assets[0].uri, token)
            .then(() => {
              this.getData();
            });
        } else {
          showMessage({
            message: 'File To Large!',
            type: 'danger',
            backgroundColor: '#d63031',
            color: '#fff',
            duration: 5000,
          });
        }
      }
    });
  };

  onDel = id => {
    const {token} = this.props.auth;
    const recipient = this.state.selectedUser.phoneNumber;
    Alert.alert('Option', 'Are You Sure Want to Delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => setDel(),
      },
    ]);

    const setDel = () => {
      this.props.deleteChat(recipient, id, token).then(() => {
        this.getData();
      });
    };
  };

  render() {
    console.log(this.state.selectedUser);
    return (
      <View style={styles.container}>
        <View style={styles.parent}>
          {this.state.selectedUser.length > 0 ? (
            <View style={styles.parentTop}>
              <Image
                style={styles.topImage}
                source={{uri: `${this.state.dataChat[0]?.picture}`}}
              />
              <Text style={styles.topName}>
                {this.state.dataChat[0]?.userName}
              </Text>
            </View>
          ) : (
            <View style={styles.parentTop}>
              <Image
                style={styles.topImage}
                source={{uri: `${this.state.selectedUser.picture}`}}
              />
              <Text style={styles.topName}>
                {this.state.selectedUser.userName}
              </Text>
            </View>
          )}
          <View style={styles.Line} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={ref => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({animated: true})
            }>
            {this.state.dataChat.map(data => {
              return data.sender !== this.props.profile.data.phoneNumber ? (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => this.onDel(data.id)}
                  style={styles.parentChat}>
                  <View>
                    <Image
                      style={styles.chatImage}
                      source={{uri: `${data.picture}`}}
                    />
                  </View>
                  <View style={styles.parentText}>
                    {data.message !== null ? (
                      <Text style={styles.textMsg}>{data.message}</Text>
                    ) : (
                      <Image
                        style={styles.fileUpload}
                        source={{uri: `${data.fileUpload}`}}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => this.onDel(data.id)}
                  style={styles.parentChat2}>
                  <View style={styles.parentText2}>
                    {data.message !== null ? (
                      <Text style={styles.textMsg2}>{data.message}</Text>
                    ) : (
                      <Image
                        style={styles.fileUpload}
                        source={{uri: `${data.fileUpload}`}}
                      />
                    )}
                  </View>
                  <View>
                    <Image
                      style={styles.chatImage}
                      source={{uri: `${this.props.profile.data.picture}`}}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <KeyboardAvoidingView
            behavior={'position'}
            keyboardVerticalOffset={Platform.select({
              ios: () => 0,
              android: () => -100,
            })()}>
            <View style={styles.parentInput}>
              <TextInput
                style={styles.inputMsg}
                placeholder="Type a message..."
                placeholderTextColor="#878787"
                value={this.state.inputMsg}
                onChangeText={e => this.setState({inputMsg: e})}
                onSubmitEditing={() => this.onSend()}
              />
              <TouchableOpacity onPress={this.onPick}>
                <Icon name={'paperclip'} size={30} color="#ADADAF" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
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

const mapDispatchToProps = {
  chatAll,
  profileUser,
  sendChat,
  uploadFile,
  deleteChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomChat);

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
  topImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  parentTop: {
    alignItems: 'center',
  },
  topName: {
    fontWeight: 'bold',
    paddingVertical: 8,
    fontSize: 15,
  },
  Line: {
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  fileUpload: {
    width: 70,
    height: 70,
  },
  parentChat: {
    paddingVertical: 25,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  parentText: {
    width: 250,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#6A4029',
    borderRadius: 20,
  },
  textMsg: {
    color: 'white',
  },

  textMsg2: {
    color: '#6A4029',
  },
  parentChat2: {
    paddingVertical: 25,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  parentText2: {
    width: 250,
    marginHorizontal: 15,
    padding: 15,
    borderColor: '#6A4029',
    borderWidth: 1,
    borderRadius: 20,
  },
  inputMsg: {
    backgroundColor: '#ededed',
    margin: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    elevation: 5,
    flex: 1,
  },
  parentInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
