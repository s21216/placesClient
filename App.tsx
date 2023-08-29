import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
