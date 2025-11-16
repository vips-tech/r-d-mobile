import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";

const magazines = [
  {
    id: "1",
    title: "ICGTETA 2025",
    category: "Confrence",
    year: "2024",
    issue: "Issue 01",
    editorMessage: "Welcome to the first issue!",
    published: "12 Jan 2024",
    cover: require("../assets/qw.jpg"),

    pdf: "https://drive.google.com/file/d/1UEceI_BPKTxtGR70aQ8qx8z2vFFCILlO/view"
  },
  {
    id: "2",
    title: "2nd ICGTETA 2025",
    category: "Confrence",
    year: "2023",
    issue: "February Edition",
    editorMessage: "Innovation insights for February.",
    published: "20 Feb 2023",
    cover: require("../assets/qw.jpg"),

    pdf: "https://drive.google.com/file/d/1UEceI_BPKTxtGR70aQ8qx8z2vFFCILlO/view"
  }
];

const categories = [
  "Confrences",
  
  "R&D Magazine",
  "Innovation Newsletter"
];

export default function MagazineScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterYear, setFilterYear] = useState("");

  const filteredMagazines = magazines.filter((item) => {
    return (
      (filterCat === "All" || item.category === filterCat) &&
      (filterYear === "" || item.year === filterYear) &&
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <View style={styles.container}>

      {/* Search */}
      <TextInput
        placeholder="Search by title or year"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* Category Filter */}
      <View style={styles.filterRow}>
        {categories.map((c) => (
          <TouchableOpacity key={c} onPress={() => setFilterCat(c)}>
            <Text style={[styles.category, filterCat === c && styles.activeCategory]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Year Filter */}
      <TextInput
        placeholder="Filter by year (2023 / 2024)"
        value={filterYear}
        onChangeText={setFilterYear}
        style={styles.yearFilter}
        keyboardType="numeric"
      />

      {/* Magazine Grid */}
      <FlatList
        data={filteredMagazines}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MagazineDetails", { data: item })}
          >
            <Image source={item.cover} style={styles.cover} />
            <Text style={styles.magTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  filterRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  category: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8
  },
  activeCategory: {
    backgroundColor: "#007bff",
    color: "#fff",
    borderColor: "#007bff"
  },
  yearFilter: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15
  },
  card: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10
  },
  cover: { width: "100%", height: 130, borderRadius: 8 },
  magTitle: { marginTop: 5, fontWeight: "600" }
});
