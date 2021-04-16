import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SCREEN_WIDTH } from "../shared/styles";
import SegmentedProgressBar from "react-native-segmented-progress-bar";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

var renderDistricts = "";

export default class Districts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { search } = this.state;
    const { data } = this.props.route.params;
    const arrayOfDistricts = Object.entries(data.district).map((e) => e[1]);
    // console.log(data);
    const districts = Object.keys(data.district);
    // console.log(districts);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 18,
            paddingVertical: 17,
          }}
        >
          <Text
            style={{
              color: "#101010",
              fontSize: 35,
              fontWeight: "700",
            }}
          >
            {data.state}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("DistrictSearch", {
                districtData: arrayOfDistricts,
                arrayOfDistrictNames: districts,
              });
            }}
          >
            <Icon
              containerStyle={{ padding: 10 }}
              name="search"
              type="font-awesome"
              color="#010101"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={arrayOfDistricts}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: "#e1e8ee",
                  borderRadius: 20,
                  padding: 10,
                  margin: 10,
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
                        <Text style={{ color: "#ff8585", fontSize: 18 }}>
                          {item.active}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: "#ff8585" }}>
                          + {item.delta.confirmed} ↑
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
                        <Text style={{ color: "#000", fontSize: 18 }}>
                          {item.deceased}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: "#404040" }}>
                          + {item.delta.deceased} ↑
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
                        <Text style={{ color: "#1e72fa", fontSize: 18 }}>
                          {item.recovered}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: "#1e72fa" }}>
                          + {item.delta.recovered} ↑
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}
