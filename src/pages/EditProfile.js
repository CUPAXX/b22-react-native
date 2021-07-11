import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Radio} from 'native-base';
import {profileUser, updateProfile} from '../redux/actions/profile';
import {authLogout} from '../redux/actions/auth';
import {connect} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

class EditProfile extends Component {
  state = {
    date: new Date(),
    mode: 'date',
    show: false,
    checked: 'Female',

    picture: '',
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
    this.props
      .updateProfile(
        {userName, email, phoneNumber, firstName, lastName, address, picture},
        token,
      )
      .then(() => {
        if (this.props.profile.errMsg === '') {
          ToastAndroid.showWithGravity(
            'Update Success',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
          return this.props.navigation.navigate('Profile');
        } else {
          ToastAndroid.showWithGravity(
            `${this.props.profile.errMsg}`,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      });
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: false});
    this.setState({date: currentDate});
  };

  selectPict = e => {
    if (!e.didCancel) {
      this.setState({picture: e.assets[0].uri});
    }
  };

  render() {
    // console.log(this.state);
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.warpAll}>
          <View style={styles.parentPict}>
            <Image
              style={styles.profilePict}
              source={{uri: `${this.state.picture}`}}
            />
            <TouchableOpacity
              style={styles.parentEdit}
              onPress={() => launchImageLibrary({}, this.selectPict)}>
              <Icon name={'pencil'} size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputLabel}>User Name :</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            value={this.state.userName}
            onChangeText={e => this.setState({userName: e})}
          />
          <Text style={styles.inputLabel}>First Name :</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            value={this.state.firstName}
            onChangeText={e => this.setState({firstName: e})}
          />
          <Text style={styles.inputLabel}>Last Name :</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            value={this.state.lastName}
            onChangeText={e => this.setState({lastName: e})}
          />
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
          <TextInput
            style={styles.input}
            value={this.state.address}
            placeholderTextColor="black"
            onChangeText={e => this.setState({address: e})}
          />
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
