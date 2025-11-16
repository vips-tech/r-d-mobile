import { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";

export default function AdminPanel({ navigation }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [notification, setNotification] = useState("");

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Admin Panel</Text>

      {/* ===================== PROJECTS ====================== */}
      <Text style={{ marginTop: 20 }}>Add New Research Project</Text>
      <TextInput
        value={projectTitle}
        onChangeText={setProjectTitle}
        placeholder="Project Title"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Add Project" onPress={() => {}} />

      {/* ===================== NOTIFICATIONS ====================== */}
      <Text style={{ marginTop: 40 }}>Add Notification</Text>
      <TextInput
        value={notification}
        onChangeText={setNotification}
        placeholder="Notification Text"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Add Notification" onPress={() => {}} />

      {/* ===================== EVENTS ====================== */}
      <Text style={{ marginTop: 40, fontSize: 18, fontWeight: "bold" }}>Event Management</Text>

      <TouchableOpacity
        style={btn}
        onPress={() => navigation.navigate("AdminEvents", { eventType: "upcoming" })}
      >
        <Text style={btnText}>Add Upcoming Event</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={btn}
        onPress={() => navigation.navigate("AdminEvents", { eventType: "old" })}
      >
        <Text style={btnText}>Add Old Event</Text>
      </TouchableOpacity>

      {/* ===================== ACHIEVEMENTS ====================== */}
      <Text style={{ marginTop: 40, fontSize: 18, fontWeight: "bold" }}>Achievements Management</Text>

      <TouchableOpacity
        style={btn}
        onPress={() => navigation.navigate("AdminAchievements")}
      >
        <Text style={btnText}>Add / Update Achievements & Awards</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const btn = {
  backgroundColor: "#007bff",
  padding: 12,
  borderRadius: 8,
  marginTop: 15,
  alignItems: "center",
};

const btnText = {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
};
