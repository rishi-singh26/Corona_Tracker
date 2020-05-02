import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import {
  styles,
  IS_IPHONE_X,
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  NAV_BAR_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../shared/styles";
import SegmentedProgressBar from "react-native-segmented-progress-bar";
import { Button, Icon } from "react-native-elements";

var renderDistricts = "";

export default class Districts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    const { data } = this.props.route.params;
    const arrayOfDistricts = Object.entries(data.district).map((e) => e[1]);
    console.log(data);
    const districts = Object.keys(data.district);
    // console.log(districts);

    renderDistricts = arrayOfDistricts.map((item, index) => {
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
            {districts[index]}
            {"\n"}
            <Text style={{ fontWeight: "700" }}>
              Total Cases {item.confirmed}
            </Text>
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
              // showSeparatorValue
              values={[
                0,
                item.active,
                item.confirmed - item.recovered,
                item.confirmed,
              ]}
              colors={["#ff8585", "#404040", "#1e72fa"]}
              height={15}
              // labels={["underweight", "normal", "overweight", "obese"]}
              // position={21}
            />
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ff8585",
                  maxHeight: 20,
                  minHeight: 20,
                  maxWidth: 20,
                  minWidth: 20,
                  borderRadius: 20,
                  marginTop: 15,
                }}
              ></View>
              <View style={{ flex: 5 }}>
                <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
                  Active: {item.active}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#404040",
                  maxHeight: 20,
                  minHeight: 20,
                  maxWidth: 20,
                  minWidth: 20,
                  borderRadius: 20,
                  marginTop: 15,
                }}
              ></View>
              <View style={{ flex: 5 }}>
                <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
                  Casualty : {item.deceased}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#1e72fa",
                  maxHeight: 20,
                  minHeight: 20,
                  maxWidth: 20,
                  minWidth: 20,
                  borderRadius: 20,
                  marginTop: 15,
                }}
              ></View>
              <View style={{ flex: 5 }}>
                <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
                  Recovered : {item.recovered}
                </Text>
              </View>
            </View>
            <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
              New Cases Today :{item.delta.confirmed}
            </Text>
            <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
              New Casualties Today :{item.delta.deceased}
            </Text>
            <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
              New Recoveries Today :{item.delta.recovered}
            </Text>
          </View>
        </View>
      );
    });

    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
          stickyHeaderIndices={[0]}
        >
          <View
            style={{
              minWidth: SCREEN_WIDTH,
              //   paddingTop: STATUS_BA R_HEIGHT,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#fff",
                paddingTop: 30,
                paddingBottom: 10,
                paddingLeft: SCREEN_WIDTH / 20,
              }}
            >
              <View style={{ flex: 7 }}>
                <Text
                  style={{
                    color: "#101010",
                    fontSize: 35,
                    fontWeight: "700",
                    paddingTop: 20,
                  }}
                >
                  {data.state}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("DistrictSearch", {
                      districtData: arrayOfDistricts,
                      arrayOfDistrictNames: districts,
                    });
                  }}
                >
                  <Icon
                    containerStyle={{
                      paddingTop: 20,
                    }}
                    name="search"
                    type="font-awesome"
                    color="#010101"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginLeft: 0 }}>{renderDistricts}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}