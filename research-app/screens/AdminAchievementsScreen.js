import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, TouchableOpacity } from "react-native";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function AdminAchievementsScreen() {
  const [category, setCategory] = useState("Student Achievements");
  const [achievements, setAchievements] = useState([]);

  // Common fields
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [year, setYear] = useState("");
  const [innovation, setInnovation] = useState("");
  const [image, setImage] = useState("");

  // Research Awards
  const [awardCategory, setAwardCategory] = useState("");
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // Papers
  const [paperTitle, setPaperTitle] = useState("");
  const [journal, setJournal] = useState("");
  const [status, setStatus] = useState("");

  const categories = [
    "Student Achievements",
    "Faculty Achievements",
    "Research Awards",
    "Competition Results",
    "Grants Received",
    "This Month Paper"
  ];

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "achievements"), snap => {
      setAchievements(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const addAchievement = async () => {
    if (!name && !paperTitle) return Alert.alert("Error", "Please fill required fields");

    let data = { category, created: Date.now() };

    if (category === "Student Achievements" || category === "Faculty Achievements") {
      data = { ...data, name, dept, year, innovation, image };
    } else if (category === "Research Awards") {
      data = { ...data, name, dept, year, awardCategory, event, date, location, image };
    } else if (category === "This Month Paper") {
      data = { ...data, paperTitle, name, journal, status };
    } else {
      data = { ...data, title: name };
    }

    await addDoc(collection(db, "achievements"), data);
    Alert.alert("Success", "Achievement added successfully");

    // Clear fields
    setName(""); setDept(""); setYear(""); setInnovation("");
    setImage(""); setAwardCategory(""); setEvent(""); setDate(""); setLocation("");
    setPaperTitle(""); setJournal(""); setStatus("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "achievements", id));
    Alert.alert("Deleted", "Achievement removed");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>Admin - Achievements</Text>

      {/* Category Selector */}
      <Text>Select Category</Text>
      {categories.map(cat => (
        <TouchableOpacity key={cat} onPress={() => setCategory(cat)}>
          <Text style={{ padding: 6, color: category === cat ? "blue" : "black" }}>{cat}</Text>
        </TouchableOpacity>
      ))}

      {/* Dynamic Fields */}
      {(category === "Student Achievements" || category === "Faculty Achievements") && (
        <>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={inputStyle} />
          <TextInput placeholder="Department" value={dept} onChangeText={setDept} style={inputStyle} />
          <TextInput placeholder="Year" value={year} onChangeText={setYear} style={inputStyle} />
          <TextInput placeholder="Innovation" value={innovation} onChangeText={setInnovation} style={inputStyle} />
          <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={inputStyle} />
        </>
      )}

      {category === "Research Awards" && (
        <>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={inputStyle} />
          <TextInput placeholder="Department" value={dept} onChangeText={setDept} style={inputStyle} />
          <TextInput placeholder="Year" value={year} onChangeText={setYear} style={inputStyle} />
          <TextInput placeholder="Award Category" value={awardCategory} onChangeText={setAwardCategory} style={inputStyle} />
          <TextInput placeholder="Event Name" value={event} onChangeText={setEvent} style={inputStyle} />
          <TextInput placeholder="Date" value={date} onChangeText={setDate} style={inputStyle} />
          <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={inputStyle} />
          <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={inputStyle} />
        </>
      )}

      {category === "This Month Paper" && (
        <>
          <TextInput placeholder="Paper Title" value={paperTitle} onChangeText={setPaperTitle} style={inputStyle} />
          <TextInput placeholder="Written By" value={name} onChangeText={setName} style={inputStyle} />
          <TextInput placeholder="Journal Name" value={journal} onChangeText={setJournal} style={inputStyle} />
          <TextInput placeholder="Status" value={status} onChangeText={setStatus} style={inputStyle} />
        </>
      )}

      <Button title="Add Achievement" onPress={addAchievement} />

      {/* Existing Achievements */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Existing Achievements</Text>
        {achievements.length === 0 ? <Text>No achievements yet</Text> :
          achievements.map(item => (
            <View key={item.id} style={{ marginVertical: 8, borderWidth: 1, borderRadius: 5, padding: 8 }}>
              <Text>• {item.name || item.title} ({item.category})</Text>
              <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const inputStyle = { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 };
