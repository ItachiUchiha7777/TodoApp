import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ScrollView,
  TextInput,
  Linking,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import Task from "./components/Task";
import mainstyle from "./components/mainstyle";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };
  


  // Load tasks from AsyncStorage when the app starts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("tasks");
        if (storedTodos) {
          setTaskItems(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error("Failed to load todos", error);
      }
    };
    loadTodos();
  }, []);

  // Save tasks in AsyncStorage whenever the taskItems array changes
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(taskItems));
      } catch (e) {
        console.error("Failed to save todos", e);
      }
    };
    saveTodos();
  }, [taskItems]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTaskItems([...taskItems, task]);
      setTask(""); // Clear the text input field
      Keyboard.dismiss(); // Hide the keyboard
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>

      
      {/* Today's tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <Text  style={styles.link} onPress={() => openURL('https://rohit-gusain-iportfolio.netlify.app/')}>
          Meet the developer
        </Text>
        
        <ScrollView
          contentContainerStyle={styles.items}
          style={styles.itemsContainer}
        >
          {/* This is where the tasks go */}
          {taskItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => completeTask(index)} // Pass index to remove the correct task
            >
              <Task text={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity
          onPress={() => handleAddTask()}
          style={styles.addWrapper}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  link: {
    textAlign: 'center',
    marginBottom:20,
    color: 'blue',
    textDecorationLine: 'underline',
  },

  tasksWrapper: {
    
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemsContainer: {
    flex: 1,
  },
  items: {
    paddingBottom: 80, // Add padding at the bottom to ensure scrolling space
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E8EAED', // Match background color to avoid visual glitches
  },
  input: {
    flex: 1,
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    borderRadius: 60,
  },
  addWrapper: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#55BCF6",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
