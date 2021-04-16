import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  StyleSheet,
} from "react-native";
import { indianStatesDataLink } from "./apis";
import Header from "../shared/Header";
import LoadingShimmer from "../shared/LoadingShimmer";
import RenderStates from "./RenderStates";

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

    // arrayOfStates.sort(compare);
    // const states = Object.keys(stateData);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "#fff" }}>
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
          />
          {this.state.isLoading ? (
            <ScrollView>
              <LoadingShimmer arr={[1, 2, 3]} />
            </ScrollView>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
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
                  <RenderStates
                    item={item}
                    index={index}
                    func={(screen, data) => {
                      this.props.navigation.navigate(screen, {
                        data: data,
                      });
                    }}
                  />
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

const styles = StyleSheet.create({
  shimmerStye: { padding: 20, borderRadius: 5, margin: 10 },
});
