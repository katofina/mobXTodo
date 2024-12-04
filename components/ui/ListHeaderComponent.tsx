import { View, StyleSheet, Text, useWindowDimensions } from "react-native";

export const WIDTH_MADE = 60;
export const WIDTH_DATA = 100;
export const WIDTH_DELETE = 70;
export const MIN_CELL_HEIGHT = 50;

export default function ListHeaderComponent() {
  const widthScreen = useWindowDimensions().width;
  const widthTitle = widthScreen - WIDTH_MADE - WIDTH_DELETE - WIDTH_DATA;

  return (
    <View style={styles.container}>
      <View style={[styles.center, { width: WIDTH_MADE }]}>
        <Text style={styles.text}>Made: </Text>
      </View>
      <View style={[styles.center, { width: WIDTH_DATA, borderLeftWidth: 1 }]}>
        <Text style={styles.text}>Data: </Text>
      </View>
      <View style={[styles.center, { borderLeftWidth: 1, width: widthTitle }]}>
        <Text style={styles.text}>Title: </Text>
      </View>
      <View
        style={[styles.center, { borderLeftWidth: 1, width: WIDTH_DELETE }]}
      >
        <Text style={styles.text}>Delete: </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: MIN_CELL_HEIGHT,
    borderWidth: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "grey",
  },
  text: {
    fontSize: 20,
  },
});
