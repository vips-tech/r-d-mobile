import { ScrollView, Text, Image, Linking } from "react-native";

export default function EventDetails({ route }) {
  const { event, mode } = route.params;

  // Convert Google Drive link to previewable link
  const getDrivePreviewLink = (link) => {
    if (!link) return "";
    const match = link.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : link;
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>{event.title || event.name}</Text>

      <Text>Date: {event.date}</Text>
      <Text>Location: {event.location || ""}</Text>
      <Text>Venue: {event.venue}</Text>
      <Text>Time: {event.time}</Text>
   

      {/* ⬛ UPCOMING EVENT DETAILS */}
      {mode === "upcoming" && event.image && (
        <>
          <Text style={head}>Event Poster</Text>
          <Image
            source={{ uri: getDrivePreviewLink(event.image) }}
            style={{ width: "100%", height: 250, borderRadius: 10, marginTop: 10 }}
            resizeMode="cover"
          />
        </>
      )}

      {/* ⬛ PAST EVENT DETAILS */}
      {mode === "past" && (
        <>
          {/* Report PDF */}
          {event.report && (
            <>
              <Text style={head}>Event Report</Text>
              <Text
                style={{ color: "blue", marginVertical: 5 }}
                onPress={() => Linking.openURL(event.report)}
              >
                Download Report
              </Text>
            </>
          )}

          {/* Images */}
          {event.images && event.images.length > 0 && (
            <>
              <Text style={head}>Event Images</Text>
              {event.images.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: getDrivePreviewLink(img) }}
                  style={{ width: "100%", height: 200, borderRadius: 10, marginVertical: 10 }}
                  resizeMode="cover"
                />
              ))}
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

const head = {
  marginTop: 20,
  fontSize: 20,
  fontWeight: "bold",
};
