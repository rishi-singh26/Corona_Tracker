import React from "react";
import { View, Text } from "react-native";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 300,
        }}
      >
        <Text>Abot page so are you ready</Text>
      </View>
    );
  }
}
