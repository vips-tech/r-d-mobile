import { ScrollView, Text, Linking } from "react-native";

export default function ViewPaper({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>{item.title}</Text>
      {item.link ? (
        <Text style={{ color: "blue" }} onPress={() => Linking.openURL(item.link)}>
          View / Download Paper
        </Text>
      ) : (
        <Text>No link provided</Text>
      )}
    </ScrollView>
  );
}
