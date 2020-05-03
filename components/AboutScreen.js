import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  YellowBox,
} from "react-native";
import { Button, Avatar, SocialIcon } from "react-native-elements";
import {
  styles,
  IS_IPHONE_X,
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  NAV_BAR_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../shared/styles";
// import * as Animatable from "react-native-animatable";

const DevelopersData = [
  {
    id: "1",
    name: "Rishi singh",
    img:
      "https://avatars1.githubusercontent.com/u/47683539?s=400&u=69de166fad6eade9f1bac3d940c883a3e9eac520&v=4",
    github: "https://www.github.com/rishi-singh26",
    linkedin: "https://www.linkedin.com/in/rishi-singh-b2226415b/",
    description: "Lead developer and Database designer",
  },
];

// YellowBox.ignoreWarnings([
//   "VirtualizedLists should never be nested", // TODO: Remove when fixed
// ]);

// function Item({ title, image, description, github, linkedin }) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flexDirection: "row",
//         backgroundColor: "#fff",
//         marginTop: 10,
//         marginBottom: 10,
//         padding: 20,
//       }}
//     >
//       <View style={{ flex: 5 }}>
//         <Animatable.Text
//           animation="fadeIn"
//           duration={1500}
//           style={{
//             fontSize: 25,
//             fontWeight: "bold",
//             minHeight: 20,
//           }}
//         >
//           {title}
//         </Animatable.Text>
//         {/* <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text> */}

//         <Animatable.Text
//           animation="fadeIn"
//           duration={1500}
//           style={{ fontSize: 17, maxWidth: 300 }}
//         >
//           {description}
//         </Animatable.Text>
//         <Animatable.View
//           duration={1500}
//           animation="fadeIn"
//           style={{ flex: 1, flexDirection: "row" }}
//         >
//           <SocialIcon
//             type="linkedin"
//             light
//             raised={false}
//             onPress={() => Linking.openURL(linkedin)}
//           />
//           <SocialIcon
//             type="github"
//             light
//             raised={false}
//             onPress={() => Linking.openURL(github)}
//           />
//         </Animatable.View>
//       </View>
//       <Animatable.View
//         duration={1500}
//         animation="fadeIn"
//         style={{
//           flex: 1,
//         }}
//       >
//         <Avatar
//           rounded
//           size="medium"
//           source={{
//             uri: image,
//           }}
//         />
//       </Animatable.View>
//     </View>
//   );
// }

// const renderDevelopersData = (state) => {
//   if (state) {
//     return (
//       <ScrollView>
//         <FlatList
//           data={DevelopersData}
//           renderItem={({ item }) => (
//             <Item
//               title={item.name}
//               image={item.img}
//               description={item.description}
//               github={item.github}
//               linkedin={item.linkedin}
//             />
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       </ScrollView>
//     );
//   }
// };

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDevelopersData: false,
      showDevelopersBtnText: "More About Developers",
    };
  }

  static navigationOptions = {
    title: "About",
    headerStyle: {
      backgroundColor: "#8641F7",
    },
    headerTintColor: "#fff",
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: "#fff",
              //   margin: 15,
              borderRadius: 35,
              padding: 40,
              minWidth: SCREEN_WIDTH,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                maxHeight: 100,
              }}
            >
              <Image
                source={require("../assets/icon.png")}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#fff",
                marginTop: 10,
                marginBottom: 10,
                padding: 20,
              }}
            >
              <View style={{ flex: 5 }}>
                <Text
                  animation="fadeIn"
                  duration={1500}
                  style={{ fontSize: 17, maxWidth: 300 }}
                >
                  Developer
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    minHeight: 20,
                  }}
                >
                  {DevelopersData[0].name}
                </Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <SocialIcon
                    // button={true}
                    iconSize={35}
                    type="linkedin"
                    light
                    raised={false}
                    onPress={() => Linking.openURL(DevelopersData[0].linkedin)}
                  />
                  <SocialIcon
                    iconSize={35}
                    type="github"
                    light
                    raised={false}
                    onPress={() => Linking.openURL(DevelopersData[0].github)}
                  />
                </View>
              </View>
              <View
                duration={1500}
                animation="fadeIn"
                style={{
                  flex: 2,
                }}
              >
                <Avatar
                  rounded
                  size="large"
                  source={{
                    uri: DevelopersData[0].img,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default About;
