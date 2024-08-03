import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, TextInput, Platform, KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';
import mainstyle from './components/mainstyle';
export default function App() {


  const [task,setTask]=useState();
  const [taskItems,setTaskItems]=useState([]);

  const handleAddTask=()=>{
   setTaskItems([...taskItems,task])
   setTask(null);
   Keyboard.dismiss();
  }

const completeTask=(index)=>{
  let itemsCopy=[...taskItems]
  itemsCopy.splice(index, 1);
  setTaskItems(itemsCopy)
}

  return (

 


    <View style={styles.container}>
      {/* Today's tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Vasu's Tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks go */}
          {taskItems.map((item, index) => (

        <TouchableOpacity key={index} onPress={()=>completeTask()}>

             <Task key={index} text={item} />
          </TouchableOpacity>
       
        ))}
          <Task text={"Hello"} />
          <Task text={"Hello1"} />
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder="Write a task" value={task} onChangeText={text=>setTask(text)} />
        <TouchableOpacity onPress={()=>handleAddTask()} style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create(mainstyle);
