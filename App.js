import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';

import {NativeBaseProvider} from 'native-base';
import {connect} from 'react-redux';

import Home from './src/pages/Home';
import ProductDetail from './src/pages/ProductDetail';
import EditProfile from './src/pages/EditProfile';
import Profile from './src/pages/Profile';
import PrivacyPolicy from './src/pages/PrivacyPolicy';
import Security from './src/pages/Security';
import SeeMoreProduct from './src/pages/SeeMoreProduct';
import Checkout from './src/pages/Checkout';
import Cart from './src/pages/Carts';
import Payment from './src/pages/Payment';
import Welcome from './src/pages/Welcome';
import SignLogin from './src/pages/SignLogin';
import Login from './src/pages/Login';
import Sign from './src/pages/Sign';
import Forgot from './src/pages/Forgot';

import History from './src/pages/History';

import Header from './src/components/Header';
import DrawerContent from './src/components/DrawerContent';

import Icon from 'react-native-vector-icons/FontAwesome';
// import AntIcon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class MainStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="home"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={ProductDetail}
          name="detail"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={Cart}
          name="Cart"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={Checkout}
          name="Checkout"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={Payment}
          name="Payment"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />

        <Stack.Screen
          component={SeeMoreProduct}
          name="SeeMore"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />

        <Stack.Screen
          component={History}
          name="history"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={Profile}
          name="Profile"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={EditProfile}
          name="Edit Profile"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    );
  }
}

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{header: Header, headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{header: Header, headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sign Login"
        component={SignLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sign"
        component={Sign}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgot Password"
        component={Forgot}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = props => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <DrawerContent {...props} />}
          drawerStyle={drawerStyles.drawer}>
          {props.auth.token === null ? (
            <Drawer.Screen
              options={{title: 'Welcome'}}
              name="auth"
              component={AuthStack}
            />
          ) : (
            <React.Fragment>
              <Drawer.Screen
                options={{
                  title: 'Main',
                }}
                name="root"
                component={MainStack}
              />
              <Drawer.Screen
                options={{
                  title: 'Edit Profile',
                }}
                name="Profile"
                component={ProfileStack}
              />
              <Drawer.Screen
                options={{
                  title: 'Order',
                }}
                name="Cart"
                component={OrderStack}
              />
              <Drawer.Screen
                options={{
                  title: 'All Menu',
                }}
                name="home"
                component={Home}
              />
              <Drawer.Screen
                options={{
                  title: 'Privacy Policy',
                }}
                name="privacyPolicy"
                component={PrivacyPolicy}
              />
              <Drawer.Screen
                options={{
                  title: 'Security',
                }}
                name="security"
                component={Security}
              />
            </React.Fragment>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
const drawerStyles = StyleSheet.create({
  drawer: {
    backgroundColor: 'transparent',
    width: 300,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(App);
