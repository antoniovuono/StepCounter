import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "./src/components/Value";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Value label="Steps" value="1231" />
        <Value label="Distance" value="0,75 km" />
        <Value label="Flights Climbed" value="Steps" />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 12,
  },
  values: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
  },
});
