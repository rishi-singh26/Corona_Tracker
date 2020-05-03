import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
import { Button, Icon, SearchBar } from "react-native-elements";

var renderCountriesSearch = "";

export default class CountrySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      searchResutls: [],
      isSearching: false,
    };
  }

  updateSearch = (searchKey) => {
    if (searchKey.length > 0) {
      this.setState({ isSearching: true }, () => {
        const { countryData } = this.props.route.params;
        var newSearchResults = [];

        countryData.map((item, index) => {
          if (
            searchKey.toUpperCase().includes(item.name.toUpperCase()) ||
            item.name.toUpperCase().includes(searchKey.toUpperCase())
          ) {
            newSearchResults.push(item);
          }
        });
        this.setState({
          searchResutls: newSearchResults,
          isSearching: false,
          searchKey: searchKey,
        });
      });
    } else {
      this.setState({ searchKey: searchKey, searchResutls: [] });
    }
  };

  render() {
    const { searchKey } = this.state;
    renderCountriesSearch = this.state.searchResutls.map((item, index) => {
      if (this.state.searchResutls.length !== 0) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "#e1e8ee",
              minWidth: (SCREEN_WIDTH / 40) * 38,
              borderRadius: 20,
              padding: 10,
              margin: SCREEN_WIDTH / 40,
              //   maxHeight: SCREEN_HEIGHT / 2,
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
              {item.name}
              {"\n"}
              <Text style={{ fontWeight: "700" }}>
                Total Cases {item.latest_data.confirmed}
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
                  item.latest_data.confirmed -
                    item.latest_data.recovered -
                    item.latest_data.deaths,
                  item.latest_data.confirmed - item.latest_data.recovered,
                  item.latest_data.confirmed,
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
                      {item.latest_data.confirmed -
                        item.latest_data.recovered -
                        item.latest_data.deaths}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#ff8585" }}>
                      + {item.today.confirmed} ↑
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
                      {item.latest_data.deaths}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#404040" }}>
                      + {item.today.deaths} ↑
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
                      {item.latest_data.recovered}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#1e72fa" }}>{""}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
                Casualty Rate :{item.latest_data.calculated.death_rate}
              </Text>
              <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
                Recovery Rate :{item.latest_data.calculated.recovery_rate}
              </Text>
              <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
                Cases per million population :
                {item.latest_data.calculated.cases_per_million_population}
              </Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
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
              <Text
                style={{
                  color: "#101010",
                  fontSize: 35,
                  fontWeight: "700",
                  paddingTop: 20,
                }}
              >
                Search Country
              </Text>
            </View>
            <SearchBar
              lightTheme={true}
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={searchKey}
              autoFocus={true}
            />
          </View>
          {this.state.isSearching ? (
            <View
              style={{
                minHeight: SCREEN_HEIGHT,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 30,
              }}
            >
              <ActivityIndicator size="large" color="#1e72fa" />
            </View>
          ) : (
            <View style={{ minHeight: SCREEN_HEIGHT }}>
              {renderCountriesSearch}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
