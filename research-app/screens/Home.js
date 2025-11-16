import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Research & Innovation App</Text>

      <Button
        title="Admin Panel"
        onPress={() => navigation.navigate("AdminPanel")}
      />

      <View style={{ marginTop: 20 }} />

      <Button
        title="User Panel"
        onPress={() => navigation.navigate("UserDashboard")}
      />

      


      <TouchableOpacity onPress={() => navigation.navigate("Events")}>
   <Text>Events</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate("AdminEvents")}>
   <Text>Admin – Add Events</Text>
</TouchableOpacity>



    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 30, fontWeight: "bold" },
});
