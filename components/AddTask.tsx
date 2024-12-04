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
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import store from "@/store/store";
import transformDate from "@/functions/transformDate";

const WIDTH = 350;
const HEIGHT = 300;

interface Prop {
  closeModule: () => void;
  isModuleDisplayed: boolean;
}

export default function AddTask({ closeModule, isModuleDisplayed }: Prop) {
  const [date, setDate] = useState<DateType | undefined>(dayjs());
  const [error, setError] = useState<null | string>(null);

  const widthOfTheScreen = useWindowDimensions().width;
  const translateX = useSharedValue(-widthOfTheScreen);
  const displayPicker = () => (translateX.value = withSpring(0));
  const hidePicker = () => (translateX.value = withSpring(-widthOfTheScreen));

  useEffect(() => {
    !isModuleDisplayed && hidePicker();
  }, [isModuleDisplayed]);

  const [input, setInput] = useState("");
  const saveTitle = (text: string) => setInput(text);

  function checkAndSend() {
    if (input.length && date) {
      store.addItem({
        title: input,
        id: "id" + Math.random().toString(16).slice(2),
        date: new Date(date.toString()),
        made: false,
      });
      closeModule();
      setInput("");
    } else setError("You should enter the title and choose the right time!");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add new task: </Text>
      <View style={styles.inputs}>
        <TextInput
          value={input}
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
            placeholder={transformDate(date)}
            placeholderTextColor="grey"
            caretHidden={true}
          />
          <TouchableOpacity style={styles.button} onPress={displayPicker}>
            <FontAwesome5 name="calendar-alt" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[styles.calendar, { transform: [{ translateX }] }]}>
        <DateTimePicker
          mode="single"
          date={date}
          onChange={(params) => setDate(params.date)}
        />
        <Button title="Choose" onPress={hidePicker} />
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Confirm" color="black" onPress={checkAndSend} />
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
    position: "absolute",
  },
  header: {
    fontSize: 25,
    margin: 10,
  },
  inputs: {
    width: "100%",
    alignItems: "center",
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
    color: "red",
  },
});
