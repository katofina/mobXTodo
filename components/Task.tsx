import transformDate from "@/functions/transformDate";
import useTasksStore, { Item } from "@/store/store";
import { AntDesign } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  LayoutChangeEvent,
} from "react-native";
import { WIDTH_DATA, WIDTH_DELETE, WIDTH_MADE } from "./ui/ListHeaderComponent";
import React from "react";

interface Prop {
  item: Item;
  index: number;
  handleLayout: (event: LayoutChangeEvent, index: number) => void;
}

const Task = React.memo(({ item, index, handleLayout }: Prop) => {
  const widthScreen = useWindowDimensions().width;
  const widthTitle = widthScreen - WIDTH_MADE - WIDTH_DELETE - WIDTH_DATA;

  const changeMadeProperty = useTasksStore((state) => state.changeMadeProperty);
  const removeItem = useTasksStore((state) => state.removeItem);

  return (
    <View
      style={styles.itemContainer}
      onLayout={(event) => handleLayout(event, index)}
    >
      <TouchableOpacity
        style={styles.made}
        onPress={() => changeMadeProperty(item.id)}
      >
        {item.made ? (
          <AntDesign name="plussquareo" size={24} color="black" />
        ) : (
          <AntDesign name="minussquareo" size={24} color="black" />
        )}
      </TouchableOpacity>
      <View style={styles.date}>
        <Text>{transformDate(item.date)}</Text>
      </View>
      <View style={[styles.title, { width: widthTitle }]}>
        <Text>{item.title}</Text>
      </View>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => removeItem(item.id)}
      >
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
});

export default Task;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "stretch",
  },
  made: {
    width: WIDTH_MADE,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    width: WIDTH_DATA,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  title: {
    padding: 5,
    borderLeftWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  delete: {
    borderLeftWidth: 1,
    width: WIDTH_DELETE,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
