import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableHighlight,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { parseGpx, Track, Segment, Point } from "./GpxParser";
import TrackComponent from "./TrackComponent";
import UploadComponent from "./UploadComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import SaveTrackComponent from "./SaveTrackComponent";
import ProfileComponent from "./ProfileComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const circleRadius = 1; // in km

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      notification: true,
      selectedTrackName: "",
      isTracking: false,
      userTrack: new Track("user track", [new Segment([])]),
      trackNameDialogVisible: false,
      isLoading: true,
      modal: false,
    };

    AsyncStorage.getItem("tracks").then((tracks) => {
      if (tracks != null) {
        this.setState({ tracks: JSON.parse(tracks) });
      }
    });

    Location.requestForegroundPermissionsAsync()
      .then((response) => {
        Location.getLastKnownPositionAsync()
          .then((location) => {
            this.initialMapRegion = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            };
          })
          .catch(() => {})
          .finally(() => {
            this.setState({ isLoading: false });
          });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        showsBackgroundLocationIndicator: true,
        timeInterval: 5000,
        activityType: Location.ActivityType.Fitness,
        distanceInterval: 20,
      },
      (location) => {
        if (this.state.selectedTrackName != "" && this.state.notification) {
          this.state.tracks
            .filter((track) => track.name == this.state.selectedTrackName)
            .forEach((track) => {
              // Check starting point
              let near = this.distance(
                location.coords.latitude,
                location.coords.longitude,
                track.segments[0].points[0].lat,
                track.segments[0].points[0].lon,
                circleRadius
              );
              //Check end point
              near =
                near ||
                this.distance(
                  location.coords.latitude,
                  location.coords.longitude,
                  track.segments[0].points[track.segments[0].points.length - 1]
                    .lat,
                  track.segments[0].points[track.segments[0].points.length - 1]
                    .lon,
                  circleRadius
                );
              if (near) {
                Alert.alert(track.name, "We are close to track " + track.name, [
                  {
                    text: "Ok",
                  },
                ]);
                this.state.notification = false;
              }
            });
        }
      }
    );
  }

  distance(lat1, long1, lat2, long2, radius) {
    var R = 6371; // approx. Radius of the earth in km
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (long2 - long1) * (Math.PI / 180);
    lat1 = lat1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    long1 = long1 * (Math.PI / 180);
    long2 = long2 * (Math.PI / 180);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    if (d > radius) return false;
    return true;
  }

  startTracking = async () => {
    this.setState({ isTracking: true });
    this.tracker = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        showsBackgroundLocationIndicator: true,
        timeInterval: 5000,
        activityType: Location.ActivityType.Fitness,
        distanceInterval: 20,
      },
      (location) => {
        var trackCopy = this.state.userTrack;
        trackCopy.segments[0].points.push(
          new Point(location.coords.latitude, location.coords.longitude)
        );
        this.setState({ userTrack: trackCopy });
      }
    );
  };

  stopTracking() {
    this.tracker.remove();
  }

  renderTracks() {
    console.log(
      "Displaying the following tracks: " +
        this.state.tracks.map((track) => track.name)
    );

    return this.state.tracks.map((track) => {
      let shouldHighlight = track.name == this.state.selectedTrackName;
      return (
        <TrackComponent
          key={track.name}
          track={track}
          color={shouldHighlight ? "red" : "blue"}
          onPress={() => {
            Alert.alert(
              track.name,
              "Do you want to Select/Delete " + track.name + "?",
              [
                {
                  text: "Delete",
                  onPress: () => {
                    this.removeTrack(track);
                  },
                },
                {
                  text:
                    track.name != this.state.selectedTrackName
                      ? "Select"
                      : "Unselect",
                  onPress: () => {
                    track.name != this.state.selectedTrackName
                      ? this.setState({
                          selectedTrackName: track.name,
                          notification: true,
                        })
                      : this.setState({
                          selectedTrackName: "",
                          notification: false,
                        });
                  },
                },
                {
                  text: "Cancel",
                },
              ]
            );
          }}
        />
      );
    });
  }

  addTracks(tracks) {
    //Copy the state.tracks and then add the new track(s)
    var tracksCopy = [...this.state.tracks];
    tracks.forEach((track) => {
      tracksCopy.push(track);
    });

    console.log(tracksCopy);
    //Remove duplicate tracks based on track name
    tracksCopy = tracksCopy.filter((track, index) => {
      return (
        tracksCopy.findIndex((otherTrack) => {
          return otherTrack.name == track.name;
        }) == index
      );
    });

    this.updateTracksState(tracksCopy);
  }

  removeTrack(track) {
    var tracksCopy = [...this.state.tracks];
    tracksCopy.forEach((trackToCheck, index) => {
      if (track.name === trackToCheck.name) {
        tracksCopy.splice(index, 1);
      }
    });

    this.updateTracksState(tracksCopy);
  }

  //Update state and write to storage
  updateTracksState(newTracks) {
    this.setState({ tracks: newTracks });
    try {
      AsyncStorage.setItem("tracks", JSON.stringify(newTracks)).then(() => {});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <UploadComponent
            onFileRead={(data) => {
              parseGpx(data, (tracks) => {
                this.addTracks(tracks);
              });
            }}
          />

          {/* <ProfileComponent
            onClick={() => {
              this.setState({ modal: !this.state.modal });
            }}
          /> */}
          <SaveTrackComponent
            onStart={() => {
              this.startTracking();
            }}
            onDiscard={() => {
              this.stopTracking();
              this.setState({
                userTrack: new Track("user track", [new Segment([])]),
              });
            }}
            onSave={(trackName) => {
              this.stopTracking();
              let trackToSave = this.state.userTrack;
              trackToSave.name = trackName;
              this.addTracks([trackToSave]);
              this.setState({
                userTrack: new Track("user track", [new Segment([])]),
              });
            }}
          />
        </View>

        {this.state.modal && (
          <Modal
            onRequestClose={() => {
              this.setState({ modal: false });
            }}
          >
            <View style={styles.modalContainer}>
              <TextInput
                name="text0"
                style={styles.tx}
                onSubmitEditing={(event) => {}}
              ></TextInput>
            </View>
          </Modal>
        )}

        <View style={styles.mapContainer}>
          {this.state.isLoading && (
            <ActivityIndicator size="large" color="rgb(54, 54, 54)" />
          )}
          {!this.state.isLoading && (
            //isLoading check allows location to be obtained prior to initial map rendering
            //so that the initial map region is set correctly
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              mapType="standard"
              showsMyLocationButton={false}
              initialRegion={this.initialMapRegion}
            >
              {this.renderTracks()}

              <TrackComponent
                key={this.state.userTrack.name}
                track={this.state.userTrack}
                color="green"
              />
            </MapView>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    flexDirection: "column-reverse",
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: "rgb(54, 54, 54)",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tx: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
