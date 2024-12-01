import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

const seedData = async () => {
  try {
    // Lisää pelaajat
    const playersCollection = collection(db, "players");
    await addDoc(playersCollection, { id: "1", name: "Pelle Pelaaja" });
    await addDoc(playersCollection, { id: "2", name: "Maukka Maalivahti" });

    // Lisää sakot
    const finesCollection = collection(db, "fines");
    await addDoc(finesCollection, {
      id: "1",
      fineName: "Myöhästyminen",
      amount: 10,
    });
    await addDoc(finesCollection, {
      id: "2",
      fineName: "Varusteiden unohtaminen",
      amount: 20,
    });

    console.log("Esimerkkidata lisätty onnistuneesti!");
  } catch (error) {
    console.error("Virhe tietojen lisäämisessä:", error);
  }
};

seedData();
