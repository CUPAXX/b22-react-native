import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Alert,
  Button,
} from 'react-native';

const image = require('../assets/bgSign.png');
import {connect} from 'react-redux';
import {authRegister} from '../redux/actions/auth';
import {Formik} from 'formik';
import * as yup from 'yup';

class Sign extends Component {
  state = {
    email: '',
    password: '',
    phoneNumber: '',
  };

  register = values => {
    const {email, password, phoneNumber} = values;
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
  componentDidMount() {
    console.log(this.register);
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.bg}>
          <View style={styles.bgBlack}>
            <Text style={styles.tagline}>Sign Up</Text>
            <Formik
              initialValues={{
                phoneNumber: '',
                email: '',
                password: '',
              }}
              onSubmit={values => this.register(values)}
              validationSchema={yup.object().shape({
                phoneNumber: yup
                  .string()
                  .required('Please, provide your phone number!'),
                email: yup.string().email().required(),
                password: yup
                  .string()
                  .min(7, 'Password at least 7 character')
                  .max(15, 'Password should not excced 15 chars.')
                  .required(),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    value={values.email}
                    placeholder="Enter your email adress"
                    placeholderTextColor="#fff"
                    autoCompleteType="email"
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errmsg}>{errors.email}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    value={values.password}
                    placeholder="Enter your password"
                    autoCompleteType="password"
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errmsg}>{errors.password}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    value={values.phoneNumber}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={() => setFieldTouched('phoneNumber')}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errmsg}>{errors.phoneNumber}</Text>
                  )}
                  {/* <Button
                    color="#3740FE"
                    title="Submit"
                    disabled={!isValid}
                    onPress={handleSubmit}
                  /> */}
                  <TouchableOpacity
                    style={styles.buttonBrown}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.btnTextBrown}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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
    backgroundColor: 'rgba(82, 86, 92, 0.4)',
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
    margin: 8,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    // letterSpacing: 2,
  },
  errmsg: {
    fontSize: 13,
    textTransform: 'capitalize',
    color: '#ff8000',
    marginLeft: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(105, 105, 105, 0.6)',
    paddingVertical: 5,
    paddingLeft: 5,
  },
});
