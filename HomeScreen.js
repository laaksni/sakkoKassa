import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FineContext } from "./FineContext.js";

export default function HomeScreen({ navigation }) {
  const { sakkokassaSumma } = useContext(FineContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sakkokassa</Text>
      <Button
        title="Lisää Sakko"
        onPress={() => navigation.navigate("AddFine")}
        color="#D32F2F"
      />
      <Button
        title="Näytä Sakkolista"
        onPress={() => navigation.navigate("FineList")}
        color="#D32F2F"
      />
      <Text style={styles.totalText}>Kertynyt summa: {sakkokassaSumma}€</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 40,
  },
  totalText: {
    marginTop: 20,
    color: "gold",
    fontSize: 26,
    fontWeight: "bold",
  },
});
