import AddTask from "@/components/AddTask";
import ListOfTasks from "@/components/ListOfTasks";
import RandomActivity from "@/components/RandomActivity";
import useTasksStore from "@/store/store";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Home() {
  const queryClient = new QueryClient();

  const [isModuleDisplayed, setIsModuleDisplayed] = useState({
    1: false,
    2: false,
  });

  const widthOfModule = 350;
  const width = useWindowDimensions().width;
  const translateX1 = useSharedValue(-width);
  const translateX2 = useSharedValue(-width);

  function showModule(num: number) {
    const show = () => withTiming((width - widthOfModule) / 2);
    if (num === 1) translateX1.value = show();
    if (num === 2) translateX2.value = show();
    setIsModuleDisplayed({ ...isModuleDisplayed, [num]: true });
  }
  function hideModule(num: number) {
    const hideModule1 = () => (translateX1.value = withTiming(-width));
    if (num === 1) hideModule1();
    if (num === 2) {
      hideModule1();
      translateX2.value = withTiming(-width);
    }
    setIsModuleDisplayed({ 1: false, 2: false });
  }

  const count = useTasksStore(
    (store) => store.tasks.filter((item) => item.made === false).length,
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Tasks:</Text>
        <View style={styles.containerCounter}>
          <Text style={styles.textCounter}>Left: {count}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => showModule(1)}
        >
          <FontAwesome name="magic" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            showModule(2);
          }}
        >
          <Entypo name="add-to-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ListOfTasks />
      <Animated.View
        style={{
          transform: [{ translateX: translateX1 }],
          zIndex: 2,
          position: "absolute",
          top: "10%",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RandomActivity closeModule={() => hideModule(1)} />
        </QueryClientProvider>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateX: translateX2 }],
          zIndex: 2,
          position: "absolute",
          top: "10%",
        }}
      >
        <AddTask
          isModuleDisplayed={isModuleDisplayed[1]}
          closeModule={() => hideModule(2)}
        />
      </Animated.View>
      {(isModuleDisplayed[1] || isModuleDisplayed[2]) && (
        <Pressable style={styles.overlay} onPress={() => hideModule(2)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    shadowColor: "grey",
    elevation: 10,
  },
  textHeader: {
    fontSize: 30,
  },
  containerCounter: {
    backgroundColor: "white",
    shadowColor: "grey",
    elevation: 10,
    padding: 5,
    borderWidth: 1,
  },
  textCounter: {
    fontSize: 20,
  },
  overlay: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});
