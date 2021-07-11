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
import {connect} from 'react-redux';
import {authLogin} from '../redux/actions/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const image = require('../assets/bgLogin.png');

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: true,
  };
  login = () => {
    this.props.authLogin(this.state.email, this.state.password).then(() => {
      if (this.props.auth.errMsg === '') {
        ToastAndroid.showWithGravity(
          'Login success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return this.props.navigation.navigate('home');
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
            <Text style={styles.tagline}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email adress"
              placeholderTextColor="#fff"
              autoCompleteType="email"
              value={this.state.email}
              onChangeText={val => this.setState({email: val})}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#fff"
              autoCompleteType="password"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={val => this.setState({password: val})}
            />
            <TouchableOpacity
              style={styles.forgotParent}
              onPress={() => this.props.navigation.navigate('Forgot')}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonYellow} onPress={this.login}>
              <Text style={styles.btnTextYellow}>Login</Text>
            </TouchableOpacity>
            <View style={styles.textLine}>
              <View style={styles.borderLeft} />
              <Text style={styles.textInside}>or Login in With</Text>
              <View style={styles.borderRight} />
            </View>
            <TouchableOpacity style={styles.buttonWhite}>
              <Icon name={'google'} size={20} />
              <Text style={styles.btnTextWhite}>Login with Google</Text>
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

const mapDispatchToProps = {authLogin};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
    marginTop: 120,
    marginBottom: 70,
  },
  bg: {
    flex: 1,
    resizeMode: 'center',
  },
  bgBlack: {
    height: '100%',
    marginHorizontal: 50,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonYellow: {
    marginTop: 40,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FFBA33',
  },
  btnTextYellow: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonWhite: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  btnTextWhite: {
    fontSize: 17,
    paddingLeft: 15,
  },
  input: {
    alignSelf: 'auto',
    height: 40,
    width: 300,
    marginVertical: 15,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontWeight: '700',
    // letterSpacing: 2,
  },
  forgot: {
    color: 'white',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  forgotParent: {
    marginTop: 10,
  },
  textLine: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  borderLeft: {
    backgroundColor: 'white',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  textInside: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 20,
    fontSize: 15,
  },
  borderRight: {
    backgroundColor: 'white',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
});
