import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { auth } from "../firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import Hyperlink from "react-native-hyperlink";

import Contact from "../dataContact/ContactList";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [dataFromState, setDataFromState] = useState(Contact);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const searchName = (input) => {
    if (input.length == 0) {
      setDataFromState(Contact);
    } else {
      let data = dataFromState;
      let searchData = data.filter((item) => {
        return item.name
          .toLocaleLowerCase()
          .includes(input.toLocaleLowerCase());
      });
      setDataFromState(searchData);
    }
  };

  return (
    <>
      <View
        style={{
          marginTop: 50,
        }}
      >
        <View style={[styles.container]}>
          <Text
            style={{
              fontSize: 30,
              color: "#00AEEF",
            }}
          >
            C T
          </Text>

          <TouchableOpacity onPress={handleSignOut}>
            <Icon
              style={styles.searchIcon}
              name="sign-out"
              size={25}
              color="#00aeef"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                letterSpacing: 1,
                color: "#00aeef",
              }}
            >
              CONTACTS ({Contact?.length}){" "}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginRight: 10,
            }}
          ></View>
        </View>

        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Icon
              style={styles.searchIcon}
              name="search"
              size={15}
              color="#00aeef"
            />
            <TextInput
              placeholder="Search Contacts"
              onChangeText={(input) => {
                searchName(input);
              }}
              style={{
                color: "#00aeef",
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
        }}
      >
        <FlatList
          data={dataFromState.sort((a, b) => a.name.localeCompare(b.name))}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${item?.number}`);
              }}
              style={{
                backgroundColor: "#EAEAEA",
                marginBottom: 10,
                padding: 8,
                flex: 1,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    source={item?.img}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 50,
                      marginRight: 5,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <Text
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      textAlign: "left",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <TouchableOpacity>
                    <Text
                      onPress={() => {
                        Linking.openURL(`tel:${item?.number}`);
                      }}
                      style={{
                        fontSize: 15,
                      }}
                    >
                      {item?.number}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    marginLeft: 25,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    Profession: {item?.about}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    Blood: {item?.blood}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#00aeef",
    fontWeight: "700",
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 10,
    marginTop: 5,
  },
});
