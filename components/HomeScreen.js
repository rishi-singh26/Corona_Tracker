import React from "react";
import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import fetch from "cross-fetch";
import { SCREEN_WIDTH } from "../shared/styles";
import { Icon } from "react-native-elements";
import { countryDataLink, globalDataLink, indianStatesDataLink } from "./apis";
import LoadingShimmer from "../shared/LoadingShimmer";
import CustomMenu from "../shared/CustomMenuBtn";
import RenderCard from "../shared/RenderCard";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      df: "hola",
      data: "",
      data1: "",
      isLoading: false,
      isGlobalDataLoading: false,
      globalData: [],
      india: [],
      indiaTotalData: [],
    };
    this.loadGlobalData = this.loadGlobalData.bind(this);
    this.loadIndiaStatesData = this.loadIndiaStatesData.bind(this);
    this.loadData = this.loadData.bind(this);
    this.loadCountryData = this.loadCountryData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.loadGlobalData();
    this.loadIndiaStatesData();
    this.loadCountryData();
  };

  loadCountryData = () => {
    this.setState({ isGlobalDataLoading: true }, () => {
      fetch(countryDataLink)
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            countries: response.data,
            isGlobalDataLoading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ err: true });
        });
    });
  };

  loadGlobalData = () => {
    this.setState({ isLoading: true }, () => {
      fetch(globalDataLink)
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
      fetch(indianStatesDataLink.link, {
        method: "GET",
        headers: {
          "x-rapidapi-host": indianStatesDataLink.hostId,
          "x-rapidapi-key": indianStatesDataLink.keyId,
        },
      })
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

  render() {
    // console.log(this.state.globalData);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "700", color: "#444" }}>
            Corona Tracker
          </Text>
          <CustomMenu
            onPress={() =>
              Alert.alert(
                "This does nothing.",
                "Just there",
                [{ text: "OK", onPress: () => {} }],
                { cancelable: true }
              )
            }
          />
        </View>
        <ScrollView
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
        >
          {/* Fight corona image below */}
          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse",
              padding: 20,
              margin: 15,
              alignItems: "center"
            }}
          >
            <Image
              style={{
                width: SCREEN_WIDTH / 4,
                height: SCREEN_WIDTH / 4,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              source={require("../assets/fightcorona.png")}
            />
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: "#444" }}>
                Lets Fight Corona
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "300",
                  marginTop: 20,
                  color: "#555",
                }}
              >
                Call the authorities if you feel sick.
              </Text>
            </View>
          </View>
          {/* helpline button below */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#e1e8ee",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 10,
              borderRadius: 20,
            }}
          >
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 20 }}>Call Helpline : 1075</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                var phoneNumber = "";
                if (Platform.OS === "android") {
                  phoneNumber = "tel:" + 1075;
                } else {
                  phoneNumber = "telprompt:" + 1075;
                }

                Linking.openURL(phoneNumber);
              }}
              style={{ marginHorizontal: 10 }}
            >
              <Icon
                name="phone"
                type="font-awesome"
                reverse
                reverseColor="#fff"
                color="#1e72fa"
              />
            </TouchableOpacity>
          </View>

          {this.state.isLoading || this.state.isGlobalDataLoading ? (
            <LoadingShimmer arr={[1, 2]} />
          ) : (
            <View>
              <RenderCard
                cardName={"India"}
                totalConfirmed={this.state.indiaTotalData.confirmed}
                totalActive={this.state.indiaTotalData.active}
                totalRecovered={this.state.indiaTotalData.recovered}
                deltaConfirmed={this.state.indiaTotalData.deltaconfirmed}
                totalDeaths={this.state.indiaTotalData.deaths}
                deltaDeaths={this.state.indiaTotalData.deltadeaths}
                deltaRecovered={this.state.indiaTotalData.deltarecovered}
                lastupdatedtime={this.state.indiaTotalData.lastupdatedtime}
                buttonsData={[
                  {
                    name: "States Data",
                    onPress: () =>
                      this.props.navigation.navigate("IndianStates"),
                  },
                ]}
              />
              <RenderCard
                cardName={"Global"}
                totalConfirmed={this.state.globalData.confirmed}
                totalActive={this.state.globalData.active}
                totalRecovered={this.state.globalData.recovered}
                deltaConfirmed={this.state.globalData.new_confirmed}
                totalDeaths={this.state.globalData.deaths}
                deltaDeaths={this.state.globalData.new_deaths}
                deltaRecovered={this.state.globalData.new_recovered}
                lastupdatedtime={new Date(
                  this.state.globalData.updated_at
                ).toDateString()}
                buttonsData={[
                  {
                    name: "Global Data List",
                    onPress: () =>
                      this.props.navigation.navigate("CountriesScreen"),
                  },
                  {
                    name: "Search Countries",
                    onPress: () => {
                      if (!this.state.isGlobalDataLoading) {
                        const arrayOfCountries = Object.entries(
                          this.state.countries
                        ).map((e) => e[1]);
                        this.props.navigation.navigate("CountrySearch", {
                          countryData: arrayOfCountries,
                        });
                      }
                    },
                  },
                ]}
              />
            </View>
          )}
          {/* Stay home image below */}
          <View
            style={{
              padding: 20,
              margin: SCREEN_WIDTH / 40,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 35, fontWeight: "600", color: "#111" }}>
              Protect yourself
            </Text>
            <Image
              style={{
                width: (SCREEN_WIDTH / 8) * 7,
                height: (SCREEN_WIDTH / 4) * 2,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              source={require("../assets/stay_home.png")}
            />
            <View style={{ minHeight: 40 }}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Home;
