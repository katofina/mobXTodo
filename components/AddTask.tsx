import { useStore } from "@/store/store";
import { TextInput, View, StyleSheet } from "react-native";

export default function AddTask() {
    const { todoList } = useStore();

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Enter the title of the task"
                placeholderTextColor="grey"
                multiline={true}
                cursorColor="grey"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "red",
        paddingLeft: 10,
        height: 50
    }
});