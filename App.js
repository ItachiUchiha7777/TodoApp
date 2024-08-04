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

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

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
      setTask("");
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <Text
          style={styles.link}
          onPress={() =>
            openURL("https://rohit-gusain-iportfolio.netlify.app/")
          }
        >
          Meet the developer
        </Text>

        <ScrollView
          contentContainerStyle={styles.items}
          style={styles.itemsContainer}
        >
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task
                style={styles.item}
                text={item}
                onPressSquare={() => completeTask(index)} // Pass the function to handle square button press
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
        <TouchableOpacity onPress={handleAddTask} style={styles.addWrapper}>
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
    backgroundColor: "#E8EAED",
  },
  link: {
    textAlign: "center",
    marginBottom: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemsContainer: {
    flex: 1,
  },
  items: {
    paddingBottom: 80,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#E8EAED",
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#55BCF6",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});
