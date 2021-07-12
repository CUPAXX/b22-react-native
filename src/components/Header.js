import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {DrawerActions} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Header = ({navigation, scene}) => {
  useEffect(() => {
    console.log('coba');
  }, []);
  return (
    <React.Fragment>
      <View
        style={
          scene.route.name === 'Edit Profile' ||
          scene.route.name === 'Checkout' ||
          scene.route.name === 'Payment' ||
          scene.route.name === 'Profile' ||
          scene.route.name === 'home' ||
          scene.route.name === 'Cart' ||
          scene.route.name === 'root'
            ? HeaderStyles.headerSec
            : HeaderStyles.header
        }>
        {scene.route.name === 'home' || scene.route.name === 'root' ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <AntIcon
              name={'menuunfold'}
              size={25}
              color="#000"
              // color={scene.route.name === 'detail' ? '#000' : '#fff'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'chevron-left'}
              size={25}
              // color="#000"
              color={scene.route.name === 'detail' ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        )}
        {scene.route.name === 'home' ||
        scene.route.name === 'root' ||
        scene.route.name === 'detail' ||
        scene.route.name === 'Profile' ? (
          <View />
        ) : (
          <Text style={HeaderStyles.textHeader}>{scene.route.name}</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          {scene.route.name === 'detail' ||
          scene.route.name === 'root' ||
          scene.route.name === 'home' ? (
            <AntIcon
              name={'shoppingcart'}
              size={25}
              color="#000"
              // color={scene.route.name === 'detail3' ? '#fff' : '#000'}
            />
          ) : (
            <AntIcon />
          )}
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

const HeaderStyles = StyleSheet.create({
  header: {
    // backgroundColor: '#6A4029',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  headerSec: {
    backgroundColor: '#f2f2f2',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Header;
