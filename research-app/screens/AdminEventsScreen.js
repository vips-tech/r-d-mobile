import { useState } from "react";
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview"; // for PDF preview
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminEventsScreen({ route }) {
  const { eventType } = route.params || {};
  const selectedType = eventType || "upcoming"; // type from navigation

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [time, setTime] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [reportLink, setReportLink] = useState("");

  // Convert Google Drive link to direct image link
  const getImagePreviewLink = (link) => {
    if (!link) return "";
    const match = link.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : link;
  };

  // Convert Google Drive link to PDF preview link
  const getPdfPreviewLink = (link) => {
    if (!link) return "";
    const match = link.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : link;
  };

  // SAVE EVENT
  const addEvent = async () => {
    const collectionName = selectedType === "upcoming" ? "events_upcoming" : "events_old";

    await addDoc(collection(db, collectionName), {
      title,
      date,
      venue,
      time,
      image: imageLink,
      report: selectedType === "old" ? reportLink : "",
      created: Date.now(),
    });

    // RESET FORM
    setTitle("");
    setDate("");
    setVenue("");
    setTime("");
    setImageLink("");
    setReportLink("");

    alert(`${selectedType === "upcoming" ? "Upcoming" : "Old"} event added successfully!`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Add {selectedType === "upcoming" ? "Upcoming" : "Old"} Event
      </Text>

      {/* Event Form */}
      <TextInput placeholder="Title" style={inp} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Date" style={inp} value={date} onChangeText={setDate} />
      <TextInput placeholder="Venue" style={inp} value={venue} onChangeText={setVenue} />
      <TextInput placeholder="Time" style={inp} value={time} onChangeText={setTime} />

      <TextInput
        placeholder="Paste Google Drive Image Link"
        style={inp}
        value={imageLink}
        onChangeText={setImageLink}
      />

      {/* Image Preview */}
      {imageLink ? (
        <Image
          source={{ uri: getImagePreviewLink(imageLink) }}
          style={{ width: "100%", height: 200, marginVertical: 10, borderRadius: 8 }}
          resizeMode="cover"
        />
      ) : null}

      {/* PDF Input & Preview ONLY for Old Events */}
      {selectedType === "old" && (
        <>
          <TextInput
            placeholder="Paste Google Drive PDF Link"
            style={inp}
            value={reportLink}
            onChangeText={setReportLink}
          />
          {reportLink ? (
            <View style={{ height: 400, marginVertical: 10 }}>
              <WebView source={{ uri: getPdfPreviewLink(reportLink) }} />
            </View>
          ) : null}
        </>
      )}

      <Button
        title={`Add ${selectedType === "upcoming" ? "Upcoming" : "Old"} Event`}
        onPress={addEvent}
      />
    </ScrollView>
  );
}

const inp = {
  borderWidth: 1,
  padding: 10,
  marginVertical: 10,
  borderRadius: 5,
};
