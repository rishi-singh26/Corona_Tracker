import * as React from "react";
import { View, StyleSheet } from "react-native";
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
  console.disableYellowBox = true;
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
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
          backgroundColor: "#fff",
        }}
      >
        <Drawer.Screen name="Home" component={MyStack} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
