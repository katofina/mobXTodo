import AddTask from "@/components/AddTask";
import ListOfTasks from "@/components/ListOfTasks";
import { Entypo } from "@expo/vector-icons";
import { observer } from "mobx-react";
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

function Home() {
  const [isModuleDisplayed, setIsModuleDisplayed] = useState(false);

  const widthOfModule = 350;
  const width = useWindowDimensions().width;
  const translateX = useSharedValue(-width);

  function showModule() {
    translateX.value = withTiming((width - widthOfModule) / 2);
    setIsModuleDisplayed(true);
  }
  function hideModule() {
    translateX.value = withTiming(-width);
    setIsModuleDisplayed(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Tasks:</Text>
        <TouchableOpacity style={styles.addButton} onPress={showModule}>
          <Entypo name="add-to-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ListOfTasks />
      <Animated.View
        style={{
          transform: [{ translateX }],
          zIndex: 2,
          position: "absolute",
          top: "10%",
        }}
      >
        <AddTask
          isModuleDisplayed={isModuleDisplayed}
          closeModule={hideModule}
        />
      </Animated.View>
      {isModuleDisplayed && (
        <Pressable style={styles.overlay} onPress={hideModule} />
      )}
    </View>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textHeader: {
    fontSize: 30,
  },
  overlay: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});
