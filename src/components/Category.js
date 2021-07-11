import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Category = props => {
  return <Text style={styles.text}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#6A4029',
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: '800',
  },
});

export default Category;
