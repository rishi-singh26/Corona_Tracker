import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./styles";
import { Feather } from "@expo/vector-icons";

function search(searchKey, allData, func, screenName, isDataLoading) {
  var newSearchResults = [];

  // console.log("Here is all data", typeof allData);

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
          ? SCREEN_HEIGHT / 5
          : SCREEN_HEIGHT / 12,
        paddingBottom: 5,
        borderWidth: 0.5,
        borderColor: props.showSearchbar ? "#efefef" : "#fff",
        backgroundColor: "#fff",
        padding: 8,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {props.onLeftArrowPress ? (
          <TouchableOpacity
            onPress={props.onLeftArrowPress}
            style={{ padding: 10 }}
          >
            <Feather name="arrow-left" size={23} color={"#111"} />
          </TouchableOpacity>
        ) : null}
        <Text
          style={{
            color: "#222",
            fontSize: 30,
            fontWeight: "700",
            paddingLeft: SCREEN_WIDTH / 25,
          }}
        >
          {props.title}
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
