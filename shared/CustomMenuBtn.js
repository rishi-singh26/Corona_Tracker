import React from "react";
import { View, StyleSheet } from "react-native";

export default function CustomMenu(props) {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={[styles.bar, { width: 20 }]}></View>
      <View style={[styles.bar, { width: 25 }]}></View>
      <View style={[styles.bar, { width: 23 }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#000",
    borderRadius: 10,
    height: 4.3,
    marginVertical: 1,
  },
});
