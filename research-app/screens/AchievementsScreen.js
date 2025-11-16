import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function AchievementsScreen({ navigation }) {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "achievements"), snap => {
      setAchievements(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const categories = [
    "Student Achievements",
    "Faculty Achievements",
    "Research Awards",
    "Competition Results",
    "Grants Received",
    "This Month Paper"
  ];

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.header}>Achievements & Awards Wall</Text>

      {categories.map(cat => (
        <View key={cat} style={styles.categoryBlock}>
          <Text style={styles.categoryTitle}>{cat}</Text>
          {achievements.filter(a => a.category === cat).length === 0 ? (
            <Text style={{ color: "gray" }}>No records found</Text>
          ) : (
            achievements
              .filter(a => a.category === cat)
              .map(item => (
                <View key={item.id} style={{ marginBottom: 12, padding: 8, borderWidth: 1, borderRadius: 6 }}>
                  {/* Student / Faculty */}
                  {(cat === "Student Achievements" || cat === "Faculty Achievements") && (
                    <>
                      <Text>Name: {item.name}</Text>
                      <Text>Dept: {item.dept}</Text>
                      <Text>Year: {item.year}</Text>
                      <Text>Innovation: {item.innovation}</Text>
                      {item.image ? <Image source={{ uri: item.image }} style={styles.img} /> : null}
                    </>
                  )}

                  {/* Research Awards */}
                  {cat === "Research Awards" && (
                    <>
                      <Text>Name: {item.name}</Text>
                      <Text>Dept: {item.dept}</Text>
                      <Text>Year: {item.year}</Text>
                      <Text>Award Category: {item.awardCategory}</Text>
                      <Text>Event: {item.event}</Text>
                      <Text>Date: {item.date}</Text>
                      <Text>Location: {item.location}</Text>
                      {item.image ? <Image source={{ uri: item.image }} style={styles.img} /> : null}
                    </>
                  )}

                  {/* Papers */}
                  {cat === "This Month Paper" && (
                    <>
                      <Text>Title: {item.paperTitle}</Text>
                      <Text>Written By: {item.name}</Text>
                      <Text>Journal: {item.journal}</Text>
                      <Text>Status: {item.status}</Text>
                    </>
                  )}

                  {/* Other categories */}
                  {!(["Student Achievements","Faculty Achievements","Research Awards","This Month Paper"].includes(cat)) && (
                    <Text>{item.title}</Text>
                  )}
                </View>
              ))
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  categoryBlock: { marginBottom: 20 },
  categoryTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  img: { width: "100%", height: 200, marginTop: 8, borderRadius: 8 },
});
