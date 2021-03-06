import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import {connect} from 'react-redux';
import {profileUser} from '../redux/actions/profile';
import {authLogout} from '../redux/actions/auth';

function DrawerContent({
  descriptors,
  navigation,
  auth,
  profileUser: getProfile,
  profile,
  authLogout: logout,
}) {
  //   const {token} = props.auth;
  const {data} = profile;
  const menuItem = Object.keys(descriptors);
  const renderMenu = menuItem.map(item => descriptors[item].options.title);

  useEffect(() => {
    if (auth.token !== null) {
      getProfile(auth.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  const onLogout = () => {
    logout();
    navigation.closeDrawer();
  };

  return (
    <View style={drawerStyles.parent}>
      {auth.token !== null ? (
        <View style={drawerStyles.child}>
          {data.picture !== 'http://localhost:8080null' ? (
            <Image
              source={{uri: `${data?.picture}`}}
              style={drawerStyles.profile}
            />
          ) : (
            <Image
              source={require('../assets/profile.png')}
              style={drawerStyles.profile}
            />
          )}
          {data.userName !== null ? (
            <Text style={drawerStyles.name}>{data?.userName}</Text>
          ) : (
            <Text style={drawerStyles.name}>Please Add Your Username</Text>
          )}
          <Text style={drawerStyles.email}>{data?.email}</Text>
        </View>
      ) : (
        <View />
      )}

      <FlatList
        style={drawerStyles.itemWrap}
        data={renderMenu}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={drawerStyles.parentIcon}
            onPress={() => navigation.navigate(menuItem[index].split('-')[0])}>
            {item === 'Main' ? (
              <AntIcon name="home" color="#6A4029" size={20} />
            ) : (
              <View />
            )}
            {item === 'Edit Profile' ? (
              <AntIcon name="user" color="#6A4029" size={20} />
            ) : (
              <View />
            )}
            {item === 'Order' ? (
              <AntIcon name="shoppingcart" color="#6A4029" size={20} />
            ) : (
              <View />
            )}
            {item === 'All Menu' ? (
              <AntIcon name="book" color="#6A4029" size={20} />
            ) : (
              <View />
            )}
            {item === 'Privacy Policy' ? (
              <AntIcon name="filetext1" color="#6A4029" size={20} />
            ) : (
              <View />
            )}
            {item === 'Security' ? (
              <AntIcon name="medicinebox" color="#6A4029" size={20} />
            ) : (
              <View />
            )}

            <Text style={drawerStyles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={drawerStyles.separator} />}
      />
      <View>
        {auth.token !== null ? (
          <TouchableOpacity onPress={onLogout}>
            <View style={drawerStyles.signOut}>
              <Text style={drawerStyles.textSignOut}>Sign-out</Text>
              <View style={drawerStyles.iconWrap}>
                <AntIcon name="arrowright" color="#6A4029" size={22} />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = {profileUser, authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

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
    paddingLeft: 8,
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: '#6A4029',
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
  parentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
