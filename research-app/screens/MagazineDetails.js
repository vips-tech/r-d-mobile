import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { ScrollView } from "react-native";

export default function MagazineDetails({ route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Image source={data.cover} style={styles.cover} />

      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.text}>Issue: {data.issue}</Text>
      <Text style={styles.text}>Published: {data.published}</Text>

      <Text style={styles.heading}>Editor Message:</Text>
      <Text style={styles.message}>{data.editorMessage}</Text>

      {/* Open PDF (Flipbook) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(data.pdf)}
      >
        <Text style={styles.btnText}>Open Flipbook</Text>
      </TouchableOpacity>

      {/* Download PDF */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={() => Linking.openURL(data.pdf)}
      >
        <Text style={styles.btnText}>Download PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  cover: { width: "100%", height: 250, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  heading: { fontSize: 18, marginTop: 15, fontWeight: "bold" },
  message: { fontSize: 15, marginBottom: 20 },
  button: {
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginTop: 10
  },
  btnText: { color: "#fff", textAlign: "center", fontSize: 16 }
});
