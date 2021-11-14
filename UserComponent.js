import React, { Component } from "react";
import { View } from "react-native";
import { initializeApp } from "firebase/app";
import { serverTimestamp } from "@firebase/database";
import { getDatabase, ref, onValue, child, get, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAWbYQPWs8b4SyUYzNXlm_XB2cxtGrzP0",
  authDomain: "hiketracker-f2a12.firebaseapp.com",
  databaseURL: "https://hiketracker-f2a12-default-rtdb.firebaseio.com",
  projectId: "hiketracker-f2a12",
  storageBucket: "hiketracker-f2a12.appspot.com",
  messagingSenderId: "603484698022",
  appId: "1:603484698022:web:d8b3ea1414046a560ccb67",
  measurementId: "G-GBSYT8GF6C",
};

export default class UserComponent extends Component {
  constructor(props) {
    super(props);
    initializeApp(firebaseConfig);
    this.state = {};
  }

  updateUser(location) {
    console.log("Updated User Called");
    const unixTime = 1210981217;
    const date = new Date(unixTime * 1000);
    console.log(date.toLocaleDateString("en-US"));
    AsyncStorage.getItem("userID").then((userID) => {
      let user = "";
      if (userID != null) {
        console.log("User found:" + userID);
        user = userID;
      } else {
        user = (Math.floor(Math.random() * 10000) + 1000).toString();
        console.log("USER:", user);
        AsyncStorage.setItem("userID", user).then(() => {
          console.log("User Created:" + user);
        });
      }
      const db = getDatabase();
      set(ref(db, "users/" + user), {
        location: location,
        lastSync: serverTimestamp(),
      }).then(() => {
        console.log("Updated user:" + user + " location:" + location);
      });
    });
  }

  getFriends() {
    console.log("Get User Called");
    AsyncStorage.getItem("userID").then((userID) => {
      let user = "";
      if (userID != null) {
        console.log("User found:" + userID);
        user = userID;
      } else {
        console.log("User not found, will not proceed the request");
      }
      const db = getDatabase();
      get(ref(db, "users/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  componentDidMount() {
    this.updateUser("Sounth");
    this.getFriends();
  }

  render() {
    return <View></View>;
  }
}
