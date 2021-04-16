import React from "react";
import { View, Text } from "react-native";
import ShimmerPlaceHolder from "./ShimmerPlaceholder";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../shared/styles";

export default function LoadingShimmer({arr}) {
  return arr.map((it, ind) => {
    return (
      <View
        key={ind}
        style={{
          backgroundColor: "#e1e8ee",
          minWidth: (SCREEN_WIDTH / 40) * 38,
          borderRadius: 20,
          padding: 10,
          margin: SCREEN_WIDTH / 40,
          padding: 20,
          height: SCREEN_HEIGHT / 2.6,
        }}
      >
        <ShimmerPlaceHolder
          autoRun={true}
          height={25}
          colorShimmer={["#fff", "#f5f9fc"]}
          location={[0, 1]}
          style={{ borderRadius: 5 }}
        />
        <Text style={{ height: 5 }}></Text>
        <ShimmerPlaceHolder
          autoRun={true}
          height={25}
          width={300}
          colorShimmer={["#fff", "#f5f9fc"]}
          location={[0, 1]}
          style={{ borderRadius: 5 }}
        />
        <Text style={{ height: 15 }}></Text>
        <ShimmerPlaceHolder
          autoRun={true}
          height={33}
          width={SCREEN_WIDTH - 60}
          colorShimmer={["#fff", "#f5f9fc"]}
          location={[0, 1]}
          style={{ borderRadius: 35 }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <View style={{ marginRight: 20 }}>
            <ShimmerPlaceHolder
              autoRun={true}
              height={SCREEN_WIDTH / 3 - 50}
              width={SCREEN_WIDTH / 3 - 35}
              colorShimmer={["#fff", "#f5f9fc"]}
              location={[0, 1]}
              style={{ borderRadius: 15 }}
            />
          </View>
          <View style={{ marginRight: 20 }}>
            <ShimmerPlaceHolder
              autoRun={true}
              height={SCREEN_WIDTH / 3 - 50}
              width={SCREEN_WIDTH / 3 - 35}
              colorShimmer={["#fff", "#f5f9fc"]}
              location={[0, 1]}
              style={{ borderRadius: 15 }}
            />
          </View>
          <View style={{ marginRight: 20 }}>
            <ShimmerPlaceHolder
              autoRun={true}
              height={SCREEN_WIDTH / 3 - 50}
              width={SCREEN_WIDTH / 3 - 35}
              colorShimmer={["#fff", "#f5f9fc"]}
              location={[0, 1]}
              style={{ borderRadius: 15 }}
            />
          </View>
        </View>
        <Text style={{ height: 5 }}></Text>
        <ShimmerPlaceHolder
          autoRun={true}
          height={35}
          width={SCREEN_WIDTH - 60}
          colorShimmer={["#fff", "#f5f9fc"]}
          location={[0, 1]}
          style={{ borderRadius: 35 }}
        />
      </View>
    );
  });
}
