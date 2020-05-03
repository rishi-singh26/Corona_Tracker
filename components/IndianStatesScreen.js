import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
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

var renderStates = "";

export default class IndianStates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      indiaStateWise: [],
    };
    this.loadIndiaStatesData = this.loadIndiaStatesData.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadIndiaStatesData();
  }

  loadData = () => {
    this.loadIndiaStatesData();
  };

  loadIndiaStatesData = () => {
    this.setState({ isLoading: true }, () => {
      fetch(
        "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "corona-virus-world-and-india-data.p.rapidapi.com",
            "x-rapidapi-key":
              "2e951fd82emsh85f40a1f5474650p1ab4c3jsn901eda65636e",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            indiaStateWise: response.state_wise,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err: true });
        });
    });
  };

  render() {
    const { search } = this.state;
    const arrayOfStates = Object.entries(this.state.indiaStateWise).map(
      (e) => e[1]
    );

    //below is function to sort the rray of state in alphabetical order
    function compare(a, b) {
      if (a.state < b.state) {
        return -1;
      }
      if (a.state > b.state) {
        return 1;
      }
      return 0;
    }

    arrayOfStates.sort(compare);
    // const states = Object.keys(stateData);
    // console.log(stateData);

    renderStates = arrayOfStates.map((item, index) => {
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
                  <Text style={{ color: "#000", fontSize: 25 }}>
                    {item.deaths}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#404040" }}>
                    + {item.deltadeaths} ↑
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

          {Number(item.active) +
            Number(item.deaths) +
            Number(item.recovered) ===
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
          {Number(item.active) +
            Number(item.deaths) +
            Number(item.recovered) !==
            0 && (
            <View style={{ padding: 10 }}>
              <Button
                title="District Data"
                buttonStyle={{ backgroundColor: "#1e72fa", borderRadius: 20 }}
                onPress={() => {
                  this.props.navigation.navigate("IndianDistricts", {
                    data: item,
                  });
                  // console.log(item);
                }}
              ></Button>
            </View>
          )}
        </View>
      );
    });

    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
          stickyHeaderIndices={[0]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.loadData.bind(this)}
              progressViewOffset={180}
              progressBackgroundColor="#1e72fa"
              //   colors={["#f00", "#0f0", "#00f"]}
              colors={["#fff"]}
            />
          }
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
                  Indian States
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
                    this.props.navigation.navigate("StateSearch", {
                      stateData: arrayOfStates,
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
            {/* <SearchBar
              lightTheme={true}
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
            /> */}
          </View>
          {this.state.isLoading && (
            <View
              style={{
                minHeight: SCREEN_HEIGHT,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#000",
                }}
              >
                {" "}
              </Text>
            </View>
          )}
          {!this.state.isLoading && <View>{renderStates}</View>}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
