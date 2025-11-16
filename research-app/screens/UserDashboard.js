import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function UserDashboard({ navigation }) {
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const unsubProjects = onSnapshot(collection(db, "projects"), snap => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubNotifications = onSnapshot(collection(db, "notifications"), snap => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = data.sort((a, b) => b.created - a.created);
      setNotifications(sorted.slice(0, 5));
    });

    const unsubAchievements = onSnapshot(collection(db, "achievements"), snap => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = data.sort((a, b) => b.created - a.created);
      setAchievements(sorted.slice(0, 5)); // show latest 5 achievements
    });

    return () => {
      unsubProjects();
      unsubNotifications();
      unsubAchievements();
    };
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Dashboard</Text>

      {/* Research Overview */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Research Overview</Text>
        <Text>Total Research Projects: {projects.length}</Text>
        <Text>Ongoing R&D Activities: {projects.filter(p => p.ongoing).length}</Text>
        <Text>Achievements Count: {achievements.length}</Text>
        <Text>Research Funding Received: ₹2,50,00,000</Text>
      </View>

      {/* Quick Links */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Quick Links</Text>

        {/* Magazines */}
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => navigation.navigate("MagazineScreen")}
        >
          <Text style={styles.linkText}>• Magazines</Text>
        </TouchableOpacity>

        {/* Upcoming Events */}
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => navigation.navigate("Events", { mode: "upcoming" })}
        >
          <Text style={styles.linkText}>• Upcoming Events</Text>
        </TouchableOpacity>

        {/* Past Events */}
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => navigation.navigate("Events", { mode: "past" })}
        >
          <Text style={styles.linkText}>• Past Events</Text>
        </TouchableOpacity>

        {/* Achievements */}
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => navigation.navigate("Achievements")}
        >
          <Text style={styles.linkText}>• Achievements</Text>
        </TouchableOpacity>

        {/* Other links */}
        <Text>• Publications</Text>
        <Text>• Projects</Text>
      </View>

      {/* Latest Achievements Preview */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Latest Achievements</Text>
        {achievements.length === 0 ? (
          <Text>No achievements yet.</Text>
        ) : (
          achievements.map((item) => (
            <Text key={item.id}>• {item.title} ({item.category})</Text>
          ))
        )}
      </View>

      {/* Notifications */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Latest Notifications</Text>
        {notifications.length === 0 ? (
          <Text>No notifications available.</Text>
        ) : (
          notifications.map((n) => (
            <Text key={n.id}>• {n.text}</Text>
          ))
        )}
      </View>

      {/* Upcoming Deadlines */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Upcoming Deadlines</Text>
        <Text>• Proposal deadlines: 30 Nov 2025</Text>
        <Text>• Event registration deadlines: 15 Dec 2025</Text>
      </View>

      {/* Spotlight */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Spotlight</Text>
        <Text>• Top Project of the Month: AI-based Cancer Detection</Text>
        <Text>• Featured Researcher: Dr. Nivetha</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linkBtn: {
    paddingVertical: 6,
  },
  linkText: {
    fontSize: 16,
    color: "#007bff",
  },
});
