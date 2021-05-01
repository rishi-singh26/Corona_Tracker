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
import RenderCard from "../shared/RenderCard";

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
        ) : (
          <LoadingShimmer arr={[1, 2, 3, 4, 5, 6, 7]} />
        )}
      </SafeAreaView>
    );
  }
}
