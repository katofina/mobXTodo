import {
  FlatList,
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import ListHeaderComponent, { MIN_CELL_HEIGHT } from "./ui/ListHeaderComponent";
import useTasksStore from "@/store/store";
import { useState } from "react";
import Task from "./Task";

function ListOfTasks() {
  const tasks = useTasksStore((state) => state.tasks);

  const [cellHeights, setCellHeights] = useState<number[]>([]);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    const height = event.nativeEvent.layout.height;
    setCellHeights((prevHeights) => {
      const newHeights = [...prevHeights];
      newHeights[index] = height;
      return newHeights;
    });
  };

  if (tasks.length)
    return (
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <Task item={item} index={index} handleLayout={handleLayout} />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        getItemLayout={(data, index) => {
          const height = cellHeights[index] || MIN_CELL_HEIGHT;
          const offset = cellHeights.slice(0, index).reduce((a, b) => a + b, 0);
          return {
            length: height,
            offset: offset,
            index,
          };
        }}
      />
    );
  return (
    <View style={styles.subTextContatiner}>
      <Text>There are no tasks. Add some task!</Text>
    </View>
  );
}

export default ListOfTasks;

const styles = StyleSheet.create({
  subTextContatiner: {
    alignItems: "center",
    width: "100%",
  },
});
