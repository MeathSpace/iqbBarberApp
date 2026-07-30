import React from "react";
import { StyleSheet, View } from "react-native";
import { darkTheme } from "../../constants/appTheme";


const SalonProgressBar = ({ currentStep = 1, totalSteps = 5 }) => {
  return (
    <View style={styles.progressTrack}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index + 1 <= currentStep;
        return (
          <View
            key={`step-${index}`}
            style={[
              styles.progressSegment,
              isCompleted
                ? { backgroundColor: darkTheme.colors.accent }
                : styles.progressEmpty,
            ]}
          />
        );
      })}
    </View>
  );
};

export default SalonProgressBar;

const styles = StyleSheet.create({
  progressTrack: {
    flexDirection: "row",
    width: "100%",
    height: 4,
    backgroundColor: "#1C1C1E",
    borderRadius: 2,
    marginBottom: 24,
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: "100%",
    borderRadius: 2,
  },
  progressEmpty: {
    backgroundColor: "#1C1C1E",
  },
});