import React from "react";
import { Text, View } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../shared/styles";
import SegmentedProgressBar from "react-native-segmented-progress-bar";
import { Button, Icon, Input } from "react-native-elements";

export default function RenderStates(item, index, func) {
  return (
    <View
      key={index}
      style={{
        backgroundColor: "#e1e8ee",
        minWidth: (SCREEN_WIDTH / 40) * 38,
        borderRadius: 20,
        padding: 10,
        margin: SCREEN_WIDTH / 40,
      }}
    >
      <Text
        style={{
          // color: "#fdfdfd",
          fontSize: 20,
          fontWeight: "400",
          paddingLeft: 10,
          color: "#111",
        }}
      >
        {item.state}
        {"\n"}
        <Text style={{ fontWeight: "700" }}>Total Cases {item.confirmed}</Text>
      </Text>
      <View
        style={{
          marginTop: 20,
          backgroundColor: "#bdc6cf",
          borderRadius: 20,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <SegmentedProgressBar
          values={[
            0,
            item.active,
            item.confirmed - item.recovered,
            item.confirmed,
          ]}
          colors={["#ff8585", "#404040", "#1e72fa"]}
          height={15}
        />
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flex: 2,
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            margin: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#000" }}>Active</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#ff8585", fontSize: 25 }}>
                {item.active}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#ff8585" }}>
                + {item.deltaconfirmed} ↑
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 10,
            margin: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#000" }}>Casualty</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#000", fontSize: 25 }}>{item.deaths}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#404040" }}>+ {item.deltadeaths} ↑</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 2,
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            margin: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#000" }}>Recovered</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#1e72fa", fontSize: 25 }}>
                {item.recovered}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#1e72fa" }}>
                + {item.deltarecovered} ↑
              </Text>
            </View>
          </View>
        </View>
      </View>

      {Number(item.active) + Number(item.deaths) + Number(item.recovered) ===
        0 && (
        <View style={{ padding: 10 }}>
          <Button
            title="No District Data"
            disabled
            disabledStyle={{
              //   backgroundColor: "#1e72fa",
              backgroundColor: "#fff",
              borderRadius: 20,
            }}
          ></Button>
        </View>
      )}
      {Number(item.active) + Number(item.deaths) + Number(item.recovered) !==
        0 && (
        <View style={{ padding: 10 }}>
          <Button
            title="District Data"
            buttonStyle={{ backgroundColor: "#1e72fa", borderRadius: 20 }}
            onPress={() => {
              func("IndianDistricts", item);
              // console.log(item);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
}
