import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from "react-native";

export default function App() {
  const [pelaajaNimi, setPelaajaNimi] = useState("");
  const [sakkoNimi, setSakkoNimi] = useState("");
  const [sakkoSumma, setSakkoSumma] = useState("");
  const [sakot, setSakot] = useState([]);
  const [sakkokassaSumma, setSakkokassaSumma] = useState(0);

  // Uuden sakon lisääminen
  const lisaaSakko = () => {
    if (pelaajaNimi && sakkoNimi && sakkoSumma) {
      const uusiSakko = {
        id: Math.random().toString(),
        pelaaja: pelaajaNimi,
        nimi: sakkoNimi,
        summa: parseFloat(sakkoSumma),
        maksettu: false,
      };
      setSakot([...sakot, uusiSakko]);
      setPelaajaNimi("");
      setSakkoNimi("");
      setSakkoSumma("");
    }
  };

  // Sakon maksun tilan vaihtaminen ja summan päivittäminen
  const merkitseMaksetuksi = (id) => {
    setSakot(sakot.map((sakko) => {
      if (sakko.id === id) {
        if (!sakko.maksettu) {
          // Lisätään summa kassaan, kun sakko muuttuu maksetuksi
          setSakkokassaSumma(prevSumma => prevSumma + sakko.summa);
        } else {
          // Vähennetään summa kassasta, jos sakko merkitään ei-maksetuksi
          setSakkokassaSumma(prevSumma => prevSumma - sakko.summa);
        }
        return { ...sakko, maksettu: !sakko.maksettu };
      }
      return sakko;
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sakkokassa</Text>

      {/* Pelaajan nimi */}
      <TextInput
        style={styles.input}
        placeholder="Pelaajan nimi"
        placeholderTextColor="#CCCCCC"
        value={pelaajaNimi}
        onChangeText={setPelaajaNimi}
      />

      {/* Sakon nimi */}
      <TextInput
        style={styles.input}
        placeholder="Sakon nimi"
        placeholderTextColor="#CCCCCC"
        value={sakkoNimi}
        onChangeText={setSakkoNimi}
      />

      {/* Sakon summa */}
      <TextInput
        style={styles.input}
        placeholder="Summa (€)"
        placeholderTextColor="#CCCCCC"
        keyboardType="numeric"
        value={sakkoSumma}
        onChangeText={setSakkoSumma}
      />

      {/* Sakon lisäämispainike */}
      <Button title="Lisää Sakko" color="#D32F2F" onPress={lisaaSakko} />

      {/* Sakkojen listaus */}
      <FlatList
        data={sakot}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sakkoItem}>
            <Text style={styles.sakkoText}>
              {item.pelaaja} - {item.nimi} - {item.summa}€
            </Text>
            {/* Sakon maksun tilan vaihtaminen napauttamalla */}
            <TouchableOpacity onPress={() => merkitseMaksetuksi(item.id)}>
              <Text style={[styles.sakkoStatus, { color: item.maksettu ? "#4CAF50" : "#D32F2F" }]}>
                {item.maksettu ? "Maksettu" : "Ei maksettu"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.kassaContainer}>
        <Text style={styles.kassaText}>Sakkokassa: {sakkokassaSumma}€</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    padding: 20,
    backgroundColor: "#000",  // Musta tausta
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D32F2F",  // Punainen otsikko
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#D32F2F",  // Punainen reunus
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#FFFFFF",  // Valkoinen teksti
  },
  sakkoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D32F2F",  // Punainen viiva
  },
  sakkoText: {
    color: "#FFFFFF",  // Valkoinen teksti sakon nimelle ja summalle
  },
  sakkoStatus: {
    fontWeight: "bold",
  },
  kassaContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#333",
    alignItems: "center",
  },
  kassaText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
