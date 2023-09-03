import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

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

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err) {
        console.log("Error checking availability");
        return;
      }

      if (!isAvailable) {
        console.log("Apple Health not available");
        return;
      }

      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.error("Error getting permissions");
          return;
        }

        setHasPermissions(true);
      });
    });
  });

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    // Healthkit Options
    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
    };

    // Get steps from IOS:
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

  return {
    steps,
    distance,
    flights,
  };
};

export default useHealthData;
