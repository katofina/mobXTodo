import { useStore } from "@/store/store";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Button,
} from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useId, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, { useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const WIDTH = 350;
const HEIGHT = 300;

export default function AddTask() {
  const { todoList } = useStore();
  const [date, setDate] = useState<DateType | undefined>(dayjs());
  
  const [error, setError] = useState<null | string>(null);

  const widthOfTheScreen = useWindowDimensions().width;
  const translateX = useSharedValue(-widthOfTheScreen);
  const displayPicker = () => translateX.value = withSpring(0);
  const hidePicker = () => translateX.value = withSpring(-widthOfTheScreen);

  const title = useRef("");
  const saveTitle = (text: string) => title.current = text;

  const id = useId();
  function checkAndSend() {
    if (String(date).length < 17 && title.current.length) todoList.tasks.push({ title: title.current, id, date: String(date), made: false })
    else setError("You should enter the title and choose the right time!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add new task: </Text>
      <View style={styles.inputs}>
        <TextInput
        style={styles.input}
        placeholder="Enter the title of the task"
        placeholderTextColor="grey"
        multiline={true}
        onChangeText={saveTitle}
        caretHidden={true}
      />
      <View style={styles.data}>
        <TextInput
          style={styles.input}
          placeholder={String(date).length < 17 ? date!.toString() : "Choose needed data and time"}
          placeholderTextColor="grey"
          caretHidden={true}
        />
        <TouchableOpacity style={styles.button} onPress={displayPicker}>
          <FontAwesome5 name="calendar-alt" size={24} color="black" />
        </TouchableOpacity>
      </View>
      </View>
        <Animated.View style={[styles.calendar, {transform: [{translateX}]}]}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => setDate(params.date)}
            timePicker={true}
        />
        <Button title="Choose" onPress={hidePicker}/>
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Confirm" color="black" onPress={checkAndSend}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "grey",
    elevation: 10,
    justifyContent: "space-evenly",
  },
  header: {
    fontSize: 25,
    margin: 10,
  },
  inputs: {
    width: "100%",
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 10,
    height: 50,
    marginBottom: 10,
    width: "90%",
    zIndex: 5,
  },
  data: {
    flexDirection: "row",
  },
  button: {
    position: "absolute",
    width: "90%",
    height: "100%",
    zIndex: 10,
    alignItems: "flex-end",
    padding: 10,
  },
  calendar: {
    backgroundColor: "white",
    shadowColor: "grey",
    elevation: 10,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 15,
    width: WIDTH,
  },
  error: {
    color: "red"
  }
});
