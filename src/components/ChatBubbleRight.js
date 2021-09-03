import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function ChatBubbleRight(props) {
  return (
    <TouchableOpacity onPress={props.press} style={styles.parentChat2}>
      <View style={styles.parentText2}>
        {props.message !== null ? (
          <Text style={styles.textMsg2}>{props.message}</Text>
        ) : (
          <Image
            style={styles.fileUpload}
            source={{uri: `${props.fileUpload}`}}
          />
        )}
      </View>
      <View>
        <Image style={styles.chatImage} source={{uri: `${props.picture}`}} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  fileUpload: {
    width: 70,
    height: 70,
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
