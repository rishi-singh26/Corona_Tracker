import * as React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./HomeScreen";
import Countries from "./CountriesDataScreen";
import IndianStates from "./IndianStatesScreen";
import Districts from "./DistrictData";
import StateSearch from "./StateSearchScreen";
import CountrySearch from "./CountrySearch";
import DistrictSearch from "./DistrictSearch";
import About from "./AboutScreen";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CountriesScreen" component={Countries} />
      <Stack.Screen name="IndianStates" component={IndianStates} />
      <Stack.Screen name="IndianDistricts" component={Districts} />
      <Stack.Screen name="StateSearch" component={StateSearch} />
      <Stack.Screen name="DistrictSearch" component={DistrictSearch} />
      <Stack.Screen name="CountrySearch" component={CountrySearch} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MyStack} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
