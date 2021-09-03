import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function ChatBubbleLeft(props) {
  return (
    <TouchableOpacity onPress={props.press} style={styles.parentChat}>
      <View>
        <Image style={styles.chatImage} source={{uri: `${props.picture}`}} />
      </View>
      <View style={styles.parentText}>
        {props.message !== null ? (
          <Text style={styles.textMsg}>{props.message}</Text>
        ) : (
          <Image
            style={styles.fileUpload}
            source={{uri: `${props.fileUpload}`}}
          />
        )}
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

  textMsg: {
    color: 'white',
  },
  parentChat: {
    paddingVertical: 25,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  parentText: {
    width: 250,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#6A4029',
    borderRadius: 20,
  },
});
