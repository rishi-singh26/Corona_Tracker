import React from "react";
import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import fetch from "cross-fetch";
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
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Button, Icon } from "react-native-elements";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      df: "hola",
      data: "",
      data1: "",
      isLoading: false,
      globalData: [],
      india: [],
      indiaTotalData: [],
    };
    this.loadGlobalData = this.loadGlobalData.bind(this);
    this.loadIndiaStatesData = this.loadIndiaStatesData.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadGlobalData();
    this.loadIndiaStatesData();
  }

  loadData = () => {
    this.loadGlobalData();
    this.loadIndiaStatesData();
  };

  loadGlobalData = () => {
    this.setState({ isLoading: true }, () => {
      fetch("https://corona-api.com/timeline")
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            globalData: response.data[0],
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err: true });
        });
    });
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
            isLoading: false,
            indiaTotalData: response.total_values,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err: true });
        });
    });
  };

  renderIndiaDataCard = () => {
    return (
      <View
        style={{
          backgroundColor: "#e1e8ee",
          minWidth: (SCREEN_WIDTH / 40) * 38,
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Text
          style={{
            // color: "#fdfdfd",
            fontSize: 25,
            fontWeight: "700",
            paddingLeft: 10,
            color: "#111",
          }}
        >
          India : {this.state.indiaTotalData.confirmed} Cases
        </Text>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#eee",
            borderRadius: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <SegmentedProgressBar
            // showSeparatorValue
            values={[
              0,
              this.state.indiaTotalData.active,
              this.state.indiaTotalData.confirmed -
                this.state.indiaTotalData.recovered,
              this.state.indiaTotalData.confirmed,
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
                Active: {this.state.indiaTotalData.active}
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
                Casualty : {this.state.indiaTotalData.deaths}
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
                Recovered : {this.state.indiaTotalData.recovered}
              </Text>
            </View>
          </View>
          <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
            New Cases Today :{this.state.indiaTotalData.deltaconfirmed}
          </Text>
          <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
            New Casualties Today :{this.state.indiaTotalData.deltadeaths}
          </Text>
          <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
            New Recoveries Today :{this.state.indiaTotalData.deltarecovered}
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Button
            title="States Data"
            buttonStyle={{ backgroundColor: "#1e72fa", borderRadius: 20 }}
            onPress={() => this.props.navigation.navigate("IndianStates")}
          ></Button>
        </View>
      </View>
    );
  };

  renderGlobalDataCard = () => {
    return (
      <View
        style={{
          backgroundColor: "#e1e8ee",
          minWidth: (SCREEN_WIDTH / 40) * 38,
          borderRadius: 20,
          padding: 10,
        }}
      >
        <Text
          style={{
            // color: "#fdfdfd",
            fontSize: 25,
            fontWeight: "700",
            paddingLeft: 10,
            color: "#111",
          }}
        >
          Global : {this.state.globalData.confirmed} Cases
        </Text>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#eee",
            borderRadius: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <SegmentedProgressBar
            // showSeparatorValue
            values={[
              0,
              this.state.globalData.active,
              this.state.globalData.active + this.state.globalData.deaths,
              this.state.globalData.active +
                this.state.globalData.deaths +
                this.state.globalData.recovered,
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
                Active: {this.state.globalData.active}
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
                Casualty : {this.state.globalData.deaths}
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
                Recovered : {this.state.globalData.recovered}
              </Text>
            </View>
          </View>
          {/* <View></View> */}
          <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
            New Cases Today :{this.state.globalData.new_confirmed}
          </Text>
          <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
            New Casualties Today :{this.state.globalData.new_deaths}
          </Text>
          <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
            new Recoveries Today :{this.state.globalData.new_recovered}
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Button
            title="Global Data"
            buttonStyle={{ backgroundColor: "#1e72fa", borderRadius: 20 }}
            onPress={() => {
              this.props.navigation.navigate("CountriesScreen");
            }}
          ></Button>
        </View>
      </View>
    );
  };

  render() {
    // console.log(this.state.globalData);
    return (
      <SafeAreaView>
        <ScrollView
          style={{ backgroundColor: "#fff" }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.loadData.bind(this)}
              progressViewOffset={180}
              progressBackgroundColor="#1e72fa"
              colors={["#fff"]}
            />
          }
          onScrollBeginDrag={() => {
            // console.log(this.state.globalData);
            // console.log(this.state.indiaStateWise);
          }}
          stickyHeaderIndices={[0]}
        >
          <View
            style={{
              minWidth: SCREEN_WIDTH,
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
              <Text
                style={{
                  color: "#101010",
                  fontSize: 35,
                  fontWeight: "700",
                  paddingTop: 20,
                }}
              >
                Corona Tracker
              </Text>
            </View>
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
                Loading
              </Text>
            </View>
          )}
          {!this.state.isLoading && (
            <View style={{ padding: SCREEN_WIDTH / 40 }}>
              <this.renderGlobalDataCard />
              <View style={{ minHeight: 10, maxHeight: 10 }}></View>
              <this.renderIndiaDataCard />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Home;
