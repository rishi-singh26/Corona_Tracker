import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import RenderCard from "../shared/RenderCard";

export default class Districts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props.route.params;
    const arrayOfDistricts = Object.entries(data.district).map((e) => e[1]);
    // console.log(data);
    const districts = Object.keys(data.district);
    // console.log(districts);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 18,
            paddingVertical: 17,
          }}
        >
          <Text
            style={{
              color: "#101010",
              fontSize: 35,
              fontWeight: "700",
            }}
          >
            {data.state}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("DistrictSearch", {
                districtData: arrayOfDistricts,
                arrayOfDistrictNames: districts,
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
        <FlatList
          data={arrayOfDistricts}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <RenderCard
                cardName={districts[index]}
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
      </SafeAreaView>
    );
  }
}
