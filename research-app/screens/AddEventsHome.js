import { View, Text, TouchableOpacity } from "react-native";

export default function AddEventsHome({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <TouchableOpacity
        style={btn}
        onPress={() => navigation.navigate("AddUpcomingEvent")}
      >
        <Text style={btnText}>Add Upcoming Event</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={btn}
        onPress={() => navigation.navigate("AddPastEvent")}
      >
        <Text style={btnText}>Add Past Event</Text>
      </TouchableOpacity>

    </View>
  );
}

const btn = {
  backgroundColor: "blue",
  padding: 15,
  borderRadius: 8,
  marginVertical: 10,
  width: "80%",
  alignItems: "center"
};

const btnText = {
  color: "white",
  fontSize: 18,
  fontWeight: "bold"
};
