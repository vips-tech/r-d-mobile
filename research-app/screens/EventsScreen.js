import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function EventsScreen({ navigation }) {
  const [tab, setTab] = useState("upcoming");
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    // Listen to upcoming events
    const unsubUpcoming = onSnapshot(collection(db, "events_upcoming"), (snap) => {
      setUpcoming(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen to old/past events
    const unsubPast = onSnapshot(collection(db, "events_old"), (snap) => {
      setPast(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubUpcoming();
      unsubPast();
    };
  }, []);

  const activeList = tab === "upcoming" ? upcoming : past;

  const handleDelete = (eventId) => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const collectionName = tab === "upcoming" ? "events_upcoming" : "events_old";
            await deleteDoc(doc(db, collectionName, eventId));
            Alert.alert("Deleted", "Event has been deleted successfully.");
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      {/* Tabs */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 12 }}>
        <TouchableOpacity onPress={() => setTab("upcoming")}>
          <Text style={{
            fontSize: 18,
            fontWeight: tab === "upcoming" ? "bold" : "normal",
            color: tab === "upcoming" ? "blue" : "gray"
          }}>
            Upcoming Events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTab("past")}>
          <Text style={{
            fontSize: 18,
            fontWeight: tab === "past" ? "bold" : "normal",
            color: tab === "past" ? "blue" : "gray"
          }}>
            Past Events
          </Text>
        </TouchableOpacity>
      </View>

      {/* Event List */}
      <ScrollView style={{ padding: 15 }}>
        {activeList.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40, color: "gray" }}>
            No events available.
          </Text>
        ) : (
          activeList.map((event) => (
            <View
              key={event.id}
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                marginBottom: 12,
                backgroundColor: "#fafafa"
              }}
            >
              {/* Event Info */}
              <TouchableOpacity
                onPress={() => navigation.navigate("EventDetails", { event, mode: tab })}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{event.title}</Text>
                <Text>Date: {event.date}</Text>
                <Text>Venue: {event.venue}</Text>
                <Text>Time: {event.time}</Text>
                {tab === "past" && event.report ? <Text style={{ color: "gray" }}>Report Available</Text> : null}
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                onPress={() => handleDelete(event.id)}
                style={{
                  marginTop: 10,
                  padding: 8,
                  backgroundColor: "red",
                  borderRadius: 5,
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Delete Event</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
