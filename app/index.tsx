import { View, Text, StyleSheet } from "react-native";

export default function Home() {

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Tasks:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10
  },
  textHeader: {
    fontSize: 30
  }
})
