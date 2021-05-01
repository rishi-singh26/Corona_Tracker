import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { SCREEN_HEIGHT } from "../shared/styles";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native";
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
      const { districtData } = this.props.route.params;
      const { arrayOfDistrictNames } = this.props.route.params;
      this.setState({ isSearching: true }, () => {
        var newSearchResults = [];

        districtData.map((item, index) => {
          if (
            searchKey
              .toUpperCase()
              .includes(arrayOfDistrictNames[index].toUpperCase()) ||
            arrayOfDistrictNames[index]
              .toUpperCase()
              .includes(searchKey.toUpperCase())
          ) {
            item.districtName = arrayOfDistrictNames[index];
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
      <SafeAreaView>
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
            District Search
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
            <FlatList
              data={this.state.searchResutls}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <RenderCard
                    cardName={item.districtName}
                    totalConfirmed={item.confirmed}
                    totalActive={item.active}
                    totalRecovered={item.recovered}
                    deltaConfirmed={item.delta.confirmed}
                    totalDeaths={item.deceased}
                    deltaDeaths={item.delta.deceased}
                    deltaRecovered={item.delta.recovered}
                  />
                );
              }}
            />
          )}
      </SafeAreaView>
    );
  }
}
