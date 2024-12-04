import { AntDesign } from "@expo/vector-icons";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import store from "@/store/store";
import transformDate from "@/functions/transformDate";
import ListHeaderComponent, {
  MIN_CELL_HEIGHT,
  WIDTH_DATA,
  WIDTH_DELETE,
  WIDTH_MADE,
} from "./ui/ListHeaderComponent";
import { observer } from "mobx-react";

function ListOfTasks() {
  const widthScreen = useWindowDimensions().width;
  const widthTitle = widthScreen - WIDTH_MADE - WIDTH_DELETE - WIDTH_DATA;

  if (store.list.length)
    return (
      <FlatList
        data={store.list}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.made}
              onPress={() => store.changeMadeProperty(item.id)}
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
              onPress={() => store.removeItem(item.id)}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
      />
    );
  return (
    <View style={styles.subTextContatiner}>
      <Text>There are no tasks. Add some task!</Text>
    </View>
  );
}

export default observer(ListOfTasks);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderWidth: 1,
    minHeight: MIN_CELL_HEIGHT,
    alignItems: "center",
  },
  made: {
    width: WIDTH_MADE,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  date: {
    width: WIDTH_DATA,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    height: "100%",
  },
  title: {
    padding: 5,
    borderLeftWidth: 1,
    height: "100%",
    justifyContent: "center",
  },
  delete: {
    borderLeftWidth: 1,
    width: WIDTH_DELETE,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  subTextContatiner: {
    alignItems: "center",
    width: "100%",
  },
});
