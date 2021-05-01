import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import RenderCard from "../shared/RenderCard";

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

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Text
            style={{
              color: "#101010",
              fontSize: 35,
              fontWeight: "700",
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            Search Country
          </Text>
          <SearchBar
            lightTheme={true}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={searchKey}
            autoFocus={true}
          />
        </View>
        {this.state.isSearching ? (
          <ActivityIndicator
            style={{ position: "absolute", top: 300, alignSelf: "center" }}
            size="large"
            color="#1e72fa"
          />
        ) : (
          <FlatList
            data={this.state.searchResutls}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <RenderCard
                  cardName={item.name}
                  totalConfirmed={item.latest_data.confirmed}
                  totalActive={
                    item.latest_data.confirmed -
                    item.latest_data.recovered -
                    item.latest_data.deaths
                  }
                  totalRecovered={item.latest_data.recovered}
                  deltaConfirmed={item.today.confirmed}
                  totalDeaths={item.latest_data.deaths}
                  deltaDeaths={item.today.deaths}
                  deltaRecovered={item.latest_data.recovered}
                  hideSegmentedBar
                >
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
                </RenderCard>
              );
            }}
          />
        )}
      </SafeAreaView>
    );
  }
}
