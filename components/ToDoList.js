import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ToDoList = ({ todos, removeToDo }) => {
  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.text}</Text>
          <TouchableOpacity onPress={() => removeToDo(item.id)}>
            <Text style={styles.remove}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
   backgroundColor:'#FFFFFF',
   padding:15,
   borderRadius:10,
   flexDirection: 'row',
   alignContent: 'center',
   justifyContent: 'spcae-between',
   marginBottom:20, 
 },
  text: {
    fontSize: 18,
  },
  remove: {
    color: 'red',
  },itemLeft:{
    flexDirection: 'column',
    alignItems:'center',
    flexWrap:'wrap',

  },square:{
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,

  },
  itemText:{
    maxHeight: '80%',
},circular:{
    width:12,
    height:12,
    borderColor:'#55BCF6',
    borderRadius: 5,
    borderWidth: 2,
}
});

export default ToDoList;
