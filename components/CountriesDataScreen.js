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

var renderCountries = "";

export default class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      countries: [],
      isLoading: false,
    };
    this.loadCountryData = this.loadCountryData.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadCountryData();
  }

  loadData = () => {
    this.loadCountryData();
  };

  loadCountryData = () => {
    this.setState({ isLoading: true }, () => {
      fetch("https://corona-api.com/countries")
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            countries: response.data,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err: true });
        });
    });
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    const arrayOfCountries = Object.entries(this.state.countries).map(
      (e) => e[1]
    );
    // console.log(arrayOfCountries);

    renderCountries = arrayOfCountries.map((item, index) => {
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
                  Active:{" "}
                  {item.latest_data.confirmed -
                    item.latest_data.recovered -
                    item.latest_data.deaths}
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
                  Casualty : {item.latest_data.deaths}
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
                  Recovered : {item.latest_data.recovered}
                </Text>
              </View>
            </View>
            <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
              New Cases Today :{item.today.confirmed}
            </Text>
            <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
              New Casualties Today :{item.today.deaths}
            </Text>
            <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
              Casualty Rate :
              {Number(item.latest_data.calculated.death_rate).toFixed(2)}
            </Text>
            <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
              Recoverey Rate :
              {Number(item.latest_data.calculated.recovery_rate).toFixed(2)}
            </Text>
            <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
              Cases per million population :
              {Number(
                item.latest_data.calculated.cases_per_million_population
              ).toFixed(2)}
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
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={this.loadData.bind(this)}
              progressViewOffset={180}
              progressBackgroundColor="#1e72fa"
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
                  All Countries
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
                    // const arrayOfCountries = Object.entries(
                    //   this.state.countries
                    // ).map((e) => e[1]);
                    this.props.navigation.navigate("CountrySearch", {
                      countryData: arrayOfCountries,
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
                Loading
              </Text>
            </View>
          )}
          {!this.state.isLoading && <View>{renderCountries}</View>}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
