import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./screens/SplashScreen";
import Home from "./screens/Home";
import AdminPanel from "./screens/AdminPanel";
import UserDashboard from "./screens/UserDashboard";

import MagazineScreen from "./screens/MagazineScreen";
import MagazineDetails from "./screens/MagazineDetails";

import EventsScreen from "./screens/EventsScreen";
import EventDetails from "./screens/EventDetails";
import AdminEventsScreen from "./screens/AdminEventsScreen";

import AddEventsHome from "./screens/AddEventsHome";
import AchievementsScreen from "./screens/AchievementsScreen";
import AdminAchievementsScreen from "./screens/AdminAchievementsScreen";
import ViewPaper from "./screens/ViewPaper";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />

        <Stack.Screen name="MagazineScreen" component={MagazineScreen} />
        <Stack.Screen name="MagazineDetails" component={MagazineDetails} />

        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="EventDetails" component={EventDetails} />

        <Stack.Screen name="AdminEvents" component={AdminEventsScreen} />

        {/* Event Adding Screens */}
        <Stack.Screen name="AddEventsHome" component={AddEventsHome} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} />
        <Stack.Screen name="AdminAchievements" component={AdminAchievementsScreen} />
        <Stack.Screen name="ViewPaper" component={ViewPaper} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
