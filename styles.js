import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    padding: 20,
    backgroundColor: "#000", // Musta tausta
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D32F2F", // Punainen otsikko
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#D32F2F", // Punainen reunus
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#FFFFFF", // Valkoinen teksti
  },
  sakkoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D32F2F", // Punainen viiva
  },
  sakkoText: {
    color: "#FFFFFF", // Valkoinen teksti sakon nimelle ja summalle
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

export default styles;
