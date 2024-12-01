import React, { useContext } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FineContext } from "./FineContext.js";

export default function FineListScreen() {
  const { sakot, merkitseMaksetuksi } = useContext(FineContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sakkolista</Text>
      <FlatList
        data={sakot}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sakkoItem}>
            <Text style={styles.sakkoText}>
              {item.pelaaja} - {item.nimi} - {item.summa}€
            </Text>
            <TouchableOpacity onPress={() => merkitseMaksetuksi(item.id)}>
              <Text style={[styles.sakkoStatus, { color: item.maksettu ? "#4CAF50" : "#D32F2F" }]}>
                {item.maksettu ? "Maksettu" : "Ei maksettu"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 20,
    textAlign: "center",
  },
  sakkoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D32F2F",
  },
  sakkoText: {
    color: "#FFFFFF",
  },
  sakkoStatus: {
    fontWeight: "bold",
  },
});