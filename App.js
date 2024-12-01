import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen.js";
import AddFineScreen from "./AddFineScreen.js";
import FineListScreen from "./FineListScreen.js";
import { FineProvider } from "./FineContext.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <FineProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Sakkokassa" }} />
          <Stack.Screen name="AddFine" component={AddFineScreen} options={{ title: "Lisää Sakko" }} />
          <Stack.Screen name="FineList" component={FineListScreen} options={{ title: "Sakkolista" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FineProvider>
  );
}
