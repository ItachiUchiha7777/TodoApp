import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddToDo = ({ inputValue, setInputValue, addToDo }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Add a new to-do..."
      />
      <Button title="Add" onPress={addToDo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
});

export default AddToDo;
