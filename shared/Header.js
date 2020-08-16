import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./styles";
import CustomMenu from "./CustomMenuBtn";

function search(searchKey, allData, func, screenName, isDataLoading) {
  var newSearchResults = [];

  console.log("Here is all data", typeof allData);

  var arrayOfStates = allData;
  screenName === "states" && !isDataLoading
    ? (arrayOfStates = Object.entries(allData).map((e) => e[1]))
    : null;

  arrayOfStates.map((item, index) => {
    if (
      searchKey.toUpperCase().includes(item.state.toUpperCase()) ||
      item.state.toUpperCase().includes(searchKey.toUpperCase())
    ) {
      newSearchResults.push(item);
    }
  });
  func(newSearchResults);
}

export default function Header(props) {
  const [searchKey, setSearchKey] = useState("");

  return (
    <View
      style={{
        minWidth: SCREEN_WIDTH,
        minHeight: props.showSearchbar
          ? SCREEN_HEIGHT / 3.7
          : SCREEN_HEIGHT / 6.5,
        paddingTop: 30,
        paddingBottom: 5,
        borderBottomRightRadius: props.showSearchbar ? 25 : 0,
        borderBottomLeftRadius: props.showSearchbar ? 25 : 0,
        borderWidth: 0.5,
        borderColor: props.showSearchbar ? "#efefef" : "#fff",
        backgroundColor: "#fff",
        padding: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "#222",
            fontSize: 30,
            fontWeight: "700",
            paddingTop: 10,
            paddingLeft: SCREEN_WIDTH / 25,
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            color: "#aaa",
            fontSize: 25,
            fontWeight: "700",
            paddingHorizontal: SCREEN_WIDTH / 25,
            paddingTop: 5,
          }}
        >
          Corona Tracker
        </Text>
      </View>
      {props.showSearchbar ? (
        <View
          style={{
            paddingTop: 20,
            marginHorizontal: 10,
          }}
        >
          <Input
            placeholder="Type here ..."
            leftIcon={{
              type: "font-awesome",
              name: "search",
              size: 20,
              color: "#aaa",
            }}
            value={searchKey}
            onChangeText={(text) => {
              if (text.length > 0) {
                setSearchKey(text);
                search(
                  text,
                  props.data,
                  props.searchFunc,
                  props.screenName,
                  props.isDataLoading
                );
              } else {
                setSearchKey(text);
                props.searchFunc(props.data);
              }
            }}
            inputContainerStyle={{
              backgroundColor: "#e1e8ee",
              borderRadius: 10,
              borderBottomWidth: 0,
            }}
            inputStyle={{
              paddingLeft: 5,
              color: "#666",
            }}
            leftIconContainerStyle={{ paddingLeft: 10 }}
          />
        </View>
      ) : null}
    </View>
  );
}
