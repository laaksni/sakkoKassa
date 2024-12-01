import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, SafeAreaView, Alert } from "react-native";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { FineContext } from "./FineContext.js";

export default function AddFineScreen() {
  const { lisaaSakko } = useContext(FineContext);
  const [players, setPlayers] = useState([]);
  const [fines, setFines] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedFine, setSelectedFine] = useState(null);
  const [isPlayerModalVisible, setIsPlayerModalVisible] = useState(false);
  const [isFineModalVisible, setIsFineModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const playersSnapshot = await getDocs(collection(db, "players"));
      const finesSnapshot = await getDocs(collection(db, "fines"));

      setPlayers(playersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setFines(finesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const renderListItem = (item, setSelected, closeModal) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setSelected(item);
        closeModal();
      }}
    >
      <Text style={styles.listItemText}>{item.name || item.fineName}</Text>
    </TouchableOpacity>
  );

  const handleAddFine = () => {
    if (selectedPlayer && selectedFine) {
      console.log(
        `Lisätään sakko: Pelaaja ${selectedPlayer.name}, Sakko: ${selectedFine.fineName}, Summa: ${selectedFine.amount}`
      );
      lisaaSakko(selectedPlayer.id, selectedFine.fineName, selectedFine.amount);
      Alert.alert("Onnistui", "Sakko lisätty!", [{ text: "OK" }]); // Näytä ilmoitus
      setSelectedPlayer(null);
      setSelectedFine(null);
    } else {
      Alert.alert("Virhe", "Valitse pelaaja ja sakko ennen lisäämistä.", [{ text: "OK" }]); // Näytä virheilmoitus
      console.error("Valitse pelaaja ja sakko ennen lisäämistä.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsPlayerModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedPlayer ? selectedPlayer.name : "Valitse pelaaja"}
        </Text>
      </TouchableOpacity>
      <Modal visible={isPlayerModalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              renderListItem(item, setSelectedPlayer, () => setIsPlayerModalVisible(false))
            }
          />
        </SafeAreaView>
      </Modal>

      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsFineModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedFine ? selectedFine.fineName : "Valitse sakko"}
        </Text>
      </TouchableOpacity>
      <Modal visible={isFineModalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          <FlatList
            data={fines}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              renderListItem(item, setSelectedFine, () => setIsFineModalVisible(false))
            }
          />
        </SafeAreaView>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={handleAddFine}>
        <Text style={styles.buttonText}>Lisää Sakko</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  selector: {
    backgroundColor: "#333",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  selectorText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    marginTop: 200,
    backgroundColor: "#222",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
