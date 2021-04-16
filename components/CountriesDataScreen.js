import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SCREEN_WIDTH } from "../shared/styles";
import { Icon } from "react-native-elements";
import { countryDataLink } from "./apis";
import LoadingShimmer from "../shared/LoadingShimmer";

export default class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      isLoading: false,
    };
    this.loadCountryData = this.loadCountryData.bind(this);
  }

  componentDidMount() {
    this.loadCountryData();
  }

  loadCountryData = async () => {
    this.setState({ isLoading: true }, () => {
      fetch(countryDataLink)
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

  render() {
    const { search } = this.state;
    const arrayOfCountries = Object.entries(this.state.countries).map(
      (e) => e[1]
    );
    // console.log(arrayOfCountries);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            paddingLeft: SCREEN_WIDTH / 20,
            paddingVertical: 17,
          }}
        >
          <View style={{ flex: 7 }}>
            <Text
              style={{
                color: "#101010",
                fontSize: 35,
                fontWeight: "700",
              }}
            >
              Countries
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
                this.props.navigation.navigate("CountrySearch", {
                  countryData: arrayOfCountries,
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
        </View>
        {!this.state.isLoading ? (
          <FlatList
            data={arrayOfCountries}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={this.loadCountryData}
            refreshing={this.state.isLoading}
            pro
            renderItem={({ item, index }) => {
              return (
                <View
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
                    <Text
                      style={{ padding: 10, paddingTop: 15, color: "#111" }}
                    >
                      Casualty Rate :
                      {Number(item.latest_data.calculated.death_rate).toFixed(
                        2
                      )}
                    </Text>
                    <Text
                      style={{ padding: 10, paddingTop: 15, color: "#111" }}
                    >
                      Recoverey Rate :
                      {Number(
                        item.latest_data.calculated.recovery_rate
                      ).toFixed(2)}
                    </Text>
                    <Text
                      style={{ padding: 10, paddingTop: 15, color: "#111" }}
                    >
                      Cases per million population :
                      {Number(
                        item.latest_data.calculated.cases_per_million_population
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        ) : <LoadingShimmer arr={[1, 2, 3, 4, 5, 6, 7]} />}
      </SafeAreaView>
    );
  }
}
