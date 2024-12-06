import useTasksStore from "@/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";

interface Prop {
  closeModule: () => void;
  isOpen: boolean;
}

const fetchRandomTask = async () => {
  try {
    console.log("Fetching data...");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд

    const res = await fetch("https://bored-api.appbrewery.com/random", {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.log(`Network response was not ok. Status: ${res.status}`);
      throw new Error("Network response was not ok");
    }

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default function RandomActivity({ closeModule, isOpen }: Prop) {
  const [update, setUpdate] = useState(false);

  const { isLoading, error, data, isSuccess } = useQuery(
    "randomTask",
    fetchRandomTask,
    {
      enabled: isOpen,
      retry: 1,
      retryDelay: 2000,
    },
  );

  const updateTask = () => setUpdate((prev) => !prev);

  const lastDate = useTasksStore((store) =>
    store.tasks.length ? store.tasks.at(-1)!.date : null,
  );
  const addItem = useTasksStore((store) => store.addItem);
  function addRandomTask() {
    addItem({
      title: data.activity,
      id: "id" + Math.random().toString(16).slice(2),
      date: lastDate ? new Date(lastDate) : new Date(),
      made: false,
    });
    closeModule();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.update} onPress={updateTask}>
        <MaterialIcons name="update" size={24} color="black" />
      </TouchableOpacity>
      {isSuccess && data && (
        <View style={styles.taskContainer}>
          <Text style={styles.header}>Random task: </Text>
          <Text style={styles.task}>{data.activity}</Text>
          <Button title="Add task to list" onPress={addRandomTask} />
        </View>
      )}
      {isLoading && <ActivityIndicator size="large" color="black" />}
      {error && (
        <Text style={styles.error}>Something went wrong. Try it later.</Text>
      )}
      {update && <Text></Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    zIndex: 4,
    backgroundColor: "white",
    width: 300,
    height: 200,
    shadowColor: "grey",
    justifyContent: "center",
    padding: 5,
  },
  taskContainer: {
    justifyContent: "space-evenly",
    height: "100%",
  },
  update: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
    padding: 10,
  },
  header: {
    fontSize: 25,
  },
  task: {
    borderBottomWidth: 1,
  },
  error: {
    color: "red",
  },
});
