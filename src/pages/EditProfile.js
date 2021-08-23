import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Radio} from 'native-base';
import {profileUser, updateProfile} from '../redux/actions/profile';
import {authLogout} from '../redux/actions/auth';
import {connect} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {REACT_APP_BASE_URL} from '@env';

class EditProfile extends Component {
  state = {
    date: new Date(),
    mode: 'date',
    show: false,
    checked: 'Female',

    picture: null,
    userName: '',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    address: '',
  };

  componentDidMount() {
    const {token} = this.props.auth;
    this.props.profileUser(token).then(() => {
      this.setState({
        picture: this.props.profile.data.picture,
        userName: this.props.profile.data.userName,
        email: this.props.profile.data.email,
        phoneNumber: this.props.profile.data.phoneNumber,
        firstName: this.props.profile.data.firstName,
        lastName: this.props.profile.data.lastName,
        address: this.props.profile.data.address,
      });
    });
  }

  // componentDidUpdate() {
  //   console.log(this.state);
  // }

  data = e => {
    e.preventDefault();
    const {token} = this.props.auth;
    const {
      userName,
      email,
      phoneNumber,
      firstName,
      lastName,
      address,
      picture,
    } = this.state;
    if (
      this.state.userName === '' ||
      this.state.userName === null ||
      this.state.userName === undefined
    ) {
      showMessage({
        message: 'Please add your username',
        type: 'default',
        backgroundColor: '#D54C4C',
        color: 'white',
      });
    } else if (
      this.state.email === '' ||
      this.state.email === null ||
      this.state.email === undefined
    ) {
      showMessage({
        message: 'Please add your email',
        type: 'default',
        backgroundColor: '#D54C4C',
        color: 'white',
      });
    } else if (
      this.state.phoneNumber === '' ||
      this.state.phoneNumber === null ||
      this.state.phoneNumber === undefined
    ) {
      showMessage({
        message: 'Please add your phone number',
        type: 'default',
        backgroundColor: '#D54C4C',
        color: 'white',
      });
    } else if (
      this.state.firstName === '' ||
      this.state.firstName === null ||
      this.state.firstName === undefined
    ) {
      showMessage({
        message: 'Please add your first name',
        type: 'default',
        backgroundColor: '#D54C4C',
        color: 'white',
      });
    } else if (
      this.state.lastName === '' ||
      this.state.lastName === null ||
      this.state.lastName === undefined
    ) {
      showMessage({
        message: 'Please add your last name',
        type: 'default',
        backgroundColor: '#D54C4C',
        color: 'white',
      });
    } else if (
      this.state.address === '' ||
      this.state.address === null ||
      this.state.address === undefined
    ) {
      showMessage({
        message: 'Please add your address',
        type: 'default',
        backgroundColor: '#D54C4C',
        color: 'white',
      });
    } else if (
      this.state.picture === '' ||
      this.state.picture === null ||
      this.state.picture === undefined ||
      this.state.picture === `${REACT_APP_BASE_URL}null`
    ) {
      showMessage({
        message: 'Please add your picture',
        type: 'default',
        backgroundColor: '#D54C4C',
        color: 'white',
      });
    } else {
      this.props
        .updateProfile(
          {userName, email, phoneNumber, firstName, lastName, address, picture},
          token,
        )
        .then(() => {
          if (this.props.profile.errMsg === '') {
            showMessage({
              message: 'Update Success',
              type: 'default',
              backgroundColor: '#01937C',
              color: 'white',
            });
            return this.props.navigation.reset({
              index: 0,
              routes: [{name: 'Profile'}],
            });
          } else {
            showMessage({
              message: `${this.props.profile.errMsg}`,
              type: 'default',
              backgroundColor: '#D54C4C',
              color: 'white',
            });
          }
        });
    }
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: false});
    this.setState({date: currentDate});
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
    // let options = {
    //   mediaType: 'photo',
    //   maxWidth: 150,
    //   maxHeight: 150,
    // };
    launchImageLibrary({}, response => {
      if (!response.didCancel) {
        const maxSize = 1024 * 1024 * 2;
        if (response.assets[0].fileSize < maxSize) {
          this.setState({picture: response.assets[0].uri});
        } else {
          showMessage({
            message: 'File To Large!',
            type: 'danger',
            backgroundColor: '#d63031',
            color: '#fff',
            duration: 2000,
          });
          // this.setState({picture: null});
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
          this.setState({picture: response.assets[0].uri});
        } else {
          showMessage({
            message: 'File To Large!',
            type: 'danger',
            backgroundColor: '#d63031',
            color: '#fff',
            duration: 5000,
          });
          // this.setState({picture: null});
        }
      }
    });
  };

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.warpAll}>
          <View style={styles.parentPict}>
            {this.state.picture !== 'http://localhost:8080null' ? (
              <Image
                source={
                  `${this.state.picture}`
                    ? {uri: `${this.state.picture}`}
                    : null
                }
                style={styles.profilePict}
              />
            ) : (
              <Image
                source={require('../assets/profile.png')}
                style={styles.profilePict}
              />
            )}
            <TouchableOpacity style={styles.parentEdit} onPress={this.onPick}>
              <Icon name={'pencil'} size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputLabel}>User Name :</Text>
          {this.state.userName !== null ? (
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              value={this.state.userName}
              onChangeText={e => this.setState({userName: e})}
            />
          ) : (
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              placeholder="Example Username"
              value={this.state.userName}
              onChangeText={e => this.setState({userName: e})}
            />
          )}

          <Text style={styles.inputLabel}>First Name :</Text>
          {this.state.firstName !== null ? (
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              value={this.state.firstName}
              onChangeText={e => this.setState({firstName: e})}
            />
          ) : (
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              placeholder="Example FirstName"
              onChangeText={e => this.setState({firstName: e})}
            />
          )}

          <Text style={styles.inputLabel}>Last Name :</Text>
          {this.state.lastName !== null ? (
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              value={this.state.lastName}
              onChangeText={e => this.setState({lastName: e})}
            />
          ) : (
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              placeholder="Example LastName"
              value={this.state.lastName}
              onChangeText={e => this.setState({lastName: e})}
            />
          )}

          <View>
            <Radio.Group
              name="radioBtn"
              value={this.state.checked}
              colorScheme="amber"
              style={styles.btnRadio}
              onChange={nextChecked => {
                this.setState({checked: nextChecked});
              }}>
              <Radio
                accessibilityLabel="radio"
                style={styles.radio}
                value="Female"
                my={1}>
                <Text style={styles.radioText}>Female</Text>
              </Radio>
              <Radio
                accessibilityLabel="radio"
                style={styles.radio}
                value="Male"
                my={1}>
                <Text style={styles.radioText}>Male</Text>
              </Radio>
            </Radio.Group>
          </View>
          <Text style={styles.inputLabel}>Email Adress :</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            value={this.state.email}
            onChangeText={e => this.setState({email: e})}
          />
          <Text style={styles.inputLabel}>Phone Number :</Text>
          <TextInput
            style={styles.input}
            value={this.state.phoneNumber}
            placeholderTextColor="black"
            onChangeText={e => this.setState({phoneNumber: e})}
          />

          <Text style={styles.inputLabel}>Date of Birth</Text>
          <View style={styles.parentDate}>
            <Text style={styles.input2}>{this.state.date.getMonth()}</Text>
            <TouchableOpacity onPress={() => this.setState({show: true})}>
              <Icon style={styles.date} name={'calendar'} size={20} />
            </TouchableOpacity>
          </View>
          {this.state.show && (
            <DateTimePicker
              value={this.state.date}
              display="default"
              mode={this.state.mode}
              onChange={this.onChange}
            />
          )}

          <Text style={styles.inputLabel}>Delivery Adress :</Text>
          {this.state.address !== null ? (
            <TextInput
              style={styles.input}
              value={this.state.address}
              placeholderTextColor="black"
              onChangeText={e => this.setState({address: e})}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={this.state.address}
              placeholderTextColor="black"
              placeholder="Example Address"
              onChangeText={e => this.setState({address: e})}
            />
          )}
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.data}>
          <Text style={styles.btnText}>Save and Update</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = {profileUser, authLogout, updateProfile};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 30,
  },
  warpAll: {
    paddingTop: 80,
  },
  parentPict: {
    alignItems: 'center',
  },
  profilePict: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  parentEdit: {
    top: -30,
    left: 30,
    backgroundColor: '#6A4029',
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRadio: {
    flexDirection: 'row',
  },
  radio: {
    marginHorizontal: 5,
  },
  radioText: {
    paddingHorizontal: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    color: '#9F9F9F',
    marginTop: 15,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#6A4029',
    paddingVertical: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  parentDate: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input2: {
    paddingBottom: 10,
  },
  date: {
    paddingBottom: 9,
  },
});
