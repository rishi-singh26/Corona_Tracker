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
    this.loadGlobalData();
    this.loadIndiaStatesData();
    this.loadCountryData();
  }

  loadData = () => {
    this.loadGlobalData();
    this.loadIndiaStatesData();
    this.loadCountryData();
  };

  loadCountryData = () => {
    this.setState({ isGlobalDataLoading: true }, () => {
      fetch("https://corona-api.com/countries")
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
          {/* here */}

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
                    {this.state.indiaTotalData.active}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#ff8585" }}>
                    + {this.state.indiaTotalData.deltaconfirmed} ↑
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
                    {this.state.indiaTotalData.deaths}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#404040" }}>
                    + {this.state.indiaTotalData.deltadeaths} ↑
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
                    {this.state.indiaTotalData.recovered}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#1e72fa" }}>
                    + {this.state.indiaTotalData.deltarecovered} ↑
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* //hehe */}
          <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
            Last Update Date and Time :
            {this.state.indiaTotalData.lastupdatedtime}
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
                  {this.state.globalData.active}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#ff8585" }}>
                  + {this.state.globalData.new_confirmed} ↑
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
                  {this.state.globalData.deaths}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#404040" }}>
                  + {this.state.globalData.new_deaths} ↑
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
                  {this.state.globalData.recovered}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#1e72fa" }}>
                  + {this.state.globalData.new_recovered} ↑
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={{ padding: 10, paddingTop: 15, color: "#111" }}>
          Last Update Date and Time :{this.state.globalData.updated_at}
        </Text>
        <View style={{ padding: 10, flex: 1, flexDirection: "row-reverse" }}>
          <View style={{ flex: 1 }}>
            <Button
              title="Global Data List"
              buttonStyle={{
                backgroundColor: "#1e72fa",
                borderRadius: 20,
                margin: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate("CountriesScreen");
              }}
            ></Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Search Countries"
              buttonStyle={{
                backgroundColor: "#1e72fa",
                borderRadius: 20,
                margin: 10,
              }}
              onPress={() => {
                if (!this.state.isGlobalDataLoading) {
                  const arrayOfCountries = Object.entries(
                    this.state.countries
                  ).map((e) => e[1]);
                  this.props.navigation.navigate("CountrySearch", {
                    countryData: arrayOfCountries,
                  });
                }
              }}
            ></Button>
          </View>
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
                  color: "#444",
                  fontSize: 35,
                  fontWeight: "700",
                  paddingTop: 20,
                }}
              >
                Corona Tracker
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse",
              padding: 20,
              margin: SCREEN_WIDTH / 40,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                // marginLeft: SCREEN_WIDTH / 40,
                // marginTop: 0,
              }}
            >
              <Image
                style={{
                  // marginLeft: SCREEN_WIDTH / 40,

                  //   marginRight: SCREEN_WIDTH / 40,
                  width: SCREEN_WIDTH / 4,
                  height: SCREEN_WIDTH / 4,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  // overflow: "hidden",
                }}
                source={require("../assets/fightcorona.png")}
              />
            </View>
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 28, fontWeight: "600", color: "#444" }}>
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
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              marginBottom: 0,
              backgroundColor: "#e1e8ee",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <View style={{ flex: 3, marginLeft: SCREEN_WIDTH / 10 }}>
              <Text style={{ fontSize: 20 }}>Call Helpline : 1075</Text>
            </View>
            <View style={{ flex: 1 }}>
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
          </View>
          <View style={{ padding: SCREEN_WIDTH / 40 }}>
            <this.renderIndiaDataCard />
            <View style={{ minHeight: 10, maxHeight: 10 }}></View>
            <this.renderGlobalDataCard />
          </View>
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
            <View
              style={{
                flex: 1,
                flexDirection: "row-reverse",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginLeft: SCREEN_WIDTH / 6,
                  marginTop: 0,
                }}
              >
                <Image
                  style={{
                    // marginLeft: SCREEN_WIDTH / 40,

                    //   marginRight: SCREEN_WIDTH / 40,
                    width: SCREEN_WIDTH / 4,
                    height: SCREEN_WIDTH / 4,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    // overflow: "hidden",
                  }}
                  source={require("../assets/mask.png")}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "300",
                    marginTop: 20,
                    color: "#555",
                  }}
                >
                  Always wear a mask when going outside.
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row-reverse",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginLeft: SCREEN_WIDTH / 6,
                  marginTop: 0,
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
                    // overflow: "hidden",
                  }}
                  source={require("../assets/wash.png")}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "300",
                    marginTop: 20,
                    color: "#555",
                  }}
                >
                  Wash your hands for 20 seconds every hour...
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row-reverse",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginLeft: SCREEN_WIDTH / 6,
                  marginTop: 0,
                }}
              >
                <Image
                  style={{
                    marginLeft: 0,

                    marginRight: SCREEN_WIDTH / 20,
                    width: SCREEN_WIDTH / 4,
                    height: SCREEN_WIDTH / 4,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    // overflow: "hidden",
                  }}
                  source={require("../assets/soap.png")}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "300",
                    marginTop: 20,
                    color: "#555",
                  }}
                >
                  With soap...
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row-reverse",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginLeft: SCREEN_WIDTH / 6,
                  marginTop: 0,
                }}
              >
                <Image
                  style={{
                    // marginLeft: SCREEN_WIDTH / 20,

                    marginRight: SCREEN_WIDTH / 20,
                    width: SCREEN_WIDTH / 4,
                    height: SCREEN_WIDTH / 4,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    // overflow: "hidden",
                  }}
                  source={require("../assets/liquidsoap.png")}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "300",
                    marginTop: 20,
                    color: "#555",
                  }}
                >
                  or with alcohol based hand sanitizers.
                </Text>
              </View>
            </View>
            <View style={{ minHeight: 40 }}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Home;
