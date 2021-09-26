import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Task = ({ text }) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <View style={styles.square} />
      <Text style={styles.itemText}>{text}</Text>
    </View>
    <View style={styles.circular} />
  </View>
);

export default Task;
