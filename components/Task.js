import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
      <TouchableOpacity style={styles.square} onPress={props.onPressSquare}>
       
        </TouchableOpacity>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,

    flexWrap:'nowrap',
  },
  square: {
   
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    flex:1,
    fontSize: 15,
    flexWrap:'wrap',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderRadius: 5,
    borderWidth: 2,
    
  },
});

export default Task;
