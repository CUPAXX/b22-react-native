import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';

const image = require('../assets/bgSign.png');
import {connect} from 'react-redux';
import {authRegister} from '../redux/actions/auth';

class Sign extends Component {
  state = {
    email: '',
    password: '',
    phoneNumber: '',
  };

  register = () => {
    const {email, password, phoneNumber} = this.state;
    this.props.authRegister(email, password, phoneNumber).then(() => {
      if (this.props.auth.errMsg === '') {
        ToastAndroid.showWithGravity(
          'Signup success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return this.props.navigation.navigate('Login');
      } else {
        ToastAndroid.showWithGravity(
          `${this.props.auth.errMsg}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.bg}>
          <View style={styles.bgBlack}>
            <Text style={styles.tagline}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email adress"
              placeholderTextColor="#fff"
              autoCompleteType="email"
              onChangeText={val => this.setState({email: val})}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              autoCompleteType="password"
              secureTextEntry={true}
              placeholderTextColor="#fff"
              onChangeText={val => this.setState({password: val})}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#fff"
              keyboardType="numeric"
              onChangeText={val => this.setState({phoneNumber: val})}
            />
            <TouchableOpacity
              style={styles.buttonBrown}
              onPress={this.register}>
              <Text style={styles.btnTextBrown}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonWhite}>
              <Text style={styles.btnTextWhite}>Create with Google</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authRegister};

export default connect(mapStateToProps, mapDispatchToProps)(Sign);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tagline: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 150,
    marginBottom: 70,
  },
  bg: {
    flex: 1,
    resizeMode: 'center',
  },
  bgBlack: {
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonBrown: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 85,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#6A4029',
  },
  btnTextBrown: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonWhite: {
    marginTop: 15,
    alignItems: 'center',
    paddingHorizontal: 70,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  btnTextWhite: {
    fontSize: 17,
  },
  input: {
    height: 40,
    width: 280,
    margin: 12,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontWeight: '700',
    // letterSpacing: 2,
  },
});
