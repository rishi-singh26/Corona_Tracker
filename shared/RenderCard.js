import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { SCREEN_WIDTH } from "./styles";
import SegmentedProgressBar from "react-native-segmented-progress-bar";

export default function RenderCard(props) {
  const {
    cardName,
    totalConfirmed,
    totalActive,
    totalRecovered,
    deltaConfirmed,
    totalDeaths,
    deltaDeaths,
    deltaRecovered,
    lastupdatedtime,
    buttonsData,
    hideSegmentedBar,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.totalCaseCountTxt}>
        {cardName} : {totalConfirmed} Cases
      </Text>
      {!hideSegmentedBar && (
        <View style={styles.segmentedBarContainer}>
          <SegmentedProgressBar
            // showSeparatorValue
            values={[
              0,
              totalActive,
              totalConfirmed - totalRecovered,
              totalConfirmed,
            ]}
            colors={["#ff8585", "#404040", "#1e72fa"]}
            height={15}
            // labels={["underweight", "normal", "overweight", "obese"]}
            // position={21}
          />
        </View>
      )}
      <View style={{ flex: 1 }}>
        {/* here */}

        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.dataBox}>
            <View style={styles.dataBoxContent}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#000" }}>Active</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#ff8585", fontSize: 18 }}>
                  {totalActive}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#ff8585" }}>+ {deltaConfirmed} ↑</Text>
              </View>
            </View>
          </View>
          <View style={styles.dataBox}>
            <View style={styles.dataBoxContent}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#000" }}>Casualty</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#000", fontSize: 18 }}>
                  {totalDeaths}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#404040" }}>+ {deltaDeaths} ↑</Text>
              </View>
            </View>
          </View>

          <View style={styles.dataBox}>
            <View style={styles.dataBoxContent}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#000" }}>Recovered</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#1e72fa", fontSize: 18 }}>
                  {totalRecovered}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#1e72fa" }}>+ {deltaRecovered} ↑</Text>
              </View>
            </View>
          </View>
        </View>

        {/* //hehe */}
        {lastupdatedtime && (
          <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
            Last Update Date and Time :{lastupdatedtime}
          </Text>
        )}
      </View>
      {props.children}
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {buttonsData
          ? buttonsData.map((item, index) => {
              return (
                <Button
                  key={index}
                  title={item.name}
                  buttonStyle={{ backgroundColor: "#1e72fa", borderRadius: 20 }}
                  containerStyle={{ flex: 1, marginHorizontal: 5 }}
                  onPress={item.onPress}
                />
              );
            })
          : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 11,
    backgroundColor: "#e1e8ee",
    minWidth: (SCREEN_WIDTH / 40) * 38,
    borderRadius: 20,
    padding: 10,
    paddingTop: 15,
  },
  totalCaseCountTxt: {
    fontSize: 22,
    fontWeight: "700",
    paddingLeft: 10,
    color: "#111",
  },
  segmentedBarContainer: {
    marginTop: 20,
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dataBox: {
    flex: 2,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    margin: 8,
  },
  dataBoxContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
