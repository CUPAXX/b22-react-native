import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {NativeBaseProvider} from 'native-base';

import Home from './src/pages/Home';
import ProductDetail from './src/pages/ProductDetail';
import EditProfile from './src/pages/EditProfile';
import Profile from './src/pages/Profile';
import PrivacyPolicy from './src/pages/PrivacyPolicy';
import Security from './src/pages/Security';
import Favorite from './src/pages/FavoriteProduct';
import Checkout from './src/pages/Checkout';
import Cart from './src/pages/Carts';
import Payment from './src/pages/Payment';
import Welcome from './src/pages/Welcome';
import SignLogin from './src/pages/SignLogin';
import Login from './src/pages/Login';
import Sign from './src/pages/Sign';
import Forgot from './src/pages/Forgot';

import Header from './src/components/Header';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import AntIcon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class MainStack extends Component {
  render() {
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
          component={Favorite}
          name="Favorite"
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

const DrawerContent = ({descriptors, navigation}) => {
  const menuItem = Object.keys(descriptors);
  const renderMenu = menuItem.map(item => descriptors[item].options.title);
  return (
    <View style={drawerStyles.parent}>
      <View style={drawerStyles.child}>
        <Image
          source={require('./src/assets/profile.png')}
          style={drawerStyles.profile}
        />
        <Text style={drawerStyles.name}>Zulaikha</Text>
        <Text style={drawerStyles.email}>zulaikha17@gmail.com</Text>
      </View>

      <FlatList
        style={drawerStyles.itemWrap}
        data={renderMenu}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(menuItem[index].split('-')[0])}>
            <Text style={drawerStyles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={drawerStyles.separator} />}
      />
      <View>
        <TouchableOpacity>
          <View style={drawerStyles.signOut}>
            <Text style={drawerStyles.textSignOut}>Sign-out</Text>
            <View style={drawerStyles.iconWrap}>
              <AntIcon name="arrowright" color="#6A4029" size={22} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const drawerStyles = StyleSheet.create({
  drawer: {
    backgroundColor: 'transparent',
    width: 300,
  },
  parent: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
  },
  child: {
    borderTopRightRadius: 30,
    backgroundColor: '#6A4029',
    height: 288,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  email: {
    color: '#fff',
  },
  itemText: {
    color: '#6A4029',
    fontSize: 15,
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: '#6A4029',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  itemWrap: {
    padding: 40,
  },
  signOut: {
    flexDirection: 'row',
    marginHorizontal: 40,
    marginVertical: 25,
  },
  textSignOut: {
    color: '#6A4029',
    fontSize: 17,
  },
  iconWrap: {
    justifyContent: 'center',
  },
});

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

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={DrawerContent}
          drawerStyle={drawerStyles.drawer}>
          <Drawer.Screen
            options={{title: 'Main'}}
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
              header: Header,
              headerTransparent: true,
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
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
