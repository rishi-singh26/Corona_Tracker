import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomMenu(props) {
  return (
    <TouchableOpacity style={{ padding: 10, backgroundColor: "#efefef", borderRadius: 7 }} onPress={props.onPress}>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#444",
    borderRadius: 2,
    height: 3.2,
    marginVertical: 1.3,
    width: 5
  },
});
