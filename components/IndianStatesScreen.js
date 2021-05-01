import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import { indianStatesDataLink } from "./apis";
import Header from "../shared/Header";
import LoadingShimmer from "../shared/LoadingShimmer";
import { Button } from "react-native-elements";
import RenderCard from "../shared/RenderCard";

export default class IndianStates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      indiaStateWise: [],
      searchableData: [],
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
    this.setState({ isLoading: true });
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
          indiaStateWise: response.state_wise,
          searchableData: response.state_wise,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ err: true });
      });
  };

  render() {
    const { search } = this.state;
    const arrayOfStates = Object.entries(this.state.searchableData).map(
      (e) => e[1]
    );

    //below is function to sort the array of state in alphabetical order
    function compare(a, b) {
      if (a.state < b.state) {
        return -1;
      }
      if (a.state > b.state) {
        return 1;
      }
      return 0;
    }

    // arrayOfStates.sort(compare);
    // const states = Object.keys(stateData);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          isDataLoading={this.state.isLoading}
          data={this.state.indiaStateWise}
          searchFunc={(data) => this.setState({ searchableData: data })}
          onMenuPress={() => {
            this.props.navigation.toggleDrawer();
          }}
          screenName="states"
          title="States"
          showSearchbar={true}
          // onLeftArrowPress={() => this.props.navigation.goBack()}
        />
        <View>
          {this.state.isLoading ? (
            <ScrollView>
              <LoadingShimmer arr={[1, 2, 3]} />
            </ScrollView>
          ) : (
            <FlatList
              contentContainerStyle={{ flex: 1 }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={this.loadData.bind(this)}
                  // progressViewOffset={180}
                  progressBackgroundColor="#1e72fa"
                  //   colors={["#f00", "#0f0", "#00f"]}
                  colors={["#fff"]}
                />
              }
              data={arrayOfStates}
              renderItem={({ item, index }) => {
                return (
                  <RenderCard
                    cardName={item.state}
                    totalConfirmed={item.confirmed}
                    totalActive={item.active}
                    totalRecovered={item.recovered}
                    deltaConfirmed={item.deltaconfirmed}
                    totalDeaths={item.deaths}
                    deltaDeaths={item.deltadeaths}
                    deltaRecovered={item.deltarecovered}
                  >
                    {Number(item.active) +
                      Number(item.deaths) +
                      Number(item.recovered) ===
                      0 && (
                      <View style={{ padding: 10 }}>
                        <Button
                          title="No District Data"
                          disabled
                          disabledStyle={{
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
                          buttonStyle={{
                            backgroundColor: "#1e72fa",
                            borderRadius: 20,
                          }}
                          onPress={() => {
                            this.props.navigation.navigate("IndianDistricts", {
                              data: item,
                            });
                          }}
                        ></Button>
                      </View>
                    )}
                  </RenderCard>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
