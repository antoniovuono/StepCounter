import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Value from "./src/components/Value";
import { RingProgress } from "./src/components/RingProgress";
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";
import { useEffect, useState } from "react";

const STEPS_GOAL = 10_000;

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [setps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  const permissions: HealthKitPermissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.FlightsClimbed,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      ],
      write: [],
    },
  };

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.error("Error getting permissions");
        return;
      }

      setHasPermissions(true);
    });
  });

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    // Healthkit Options
    const options: HealthInputOptions = {
      date: new Date().toISOString(),
      includeManuallyAdded: false,
    };

    // Get Setps from IOS:
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error getting steps");
        return;
      }

      setSteps(results.value);
    });

    // Get Flights climbed from IOS:
    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log("Error getting steps");
        return;
      }

      setFlights(results.value);
    });

    // Get Distance from IOS:
    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log("Error getting steps");
        return;
      }

      setDistance(results.value);
    });
  }, [hasPermissions]);

  return (
    <View style={styles.container}>
      <RingProgress
        radius={150}
        strokeWidth={50}
        progress={setps / STEPS_GOAL}
      />

      <View style={styles.values}>
        <Value label="Steps" value={setps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 12,
  },
  values: {
    flexDirection: "row",
    gap: 25,
    flexWrap: "wrap",
    marginTop: 100,
  },
});
