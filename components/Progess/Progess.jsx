import { StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { darkTheme } from "../../constants/appTheme";

const Progess = ({ currentStep = 1}) => {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { backgroundColor: darkTheme.colors.accent },
        ]}
      />
      <View
        style={[
          styles.progressEmpty,
          currentStep === 2 && {
            backgroundColor: darkTheme.colors.accent,
            borderTopRightRadius: scale(2),
            borderBottomRightRadius: scale(2),
          },
        ]}
      />
    </View>
  );
};

export default Progess;

const styles = StyleSheet.create({
  progressTrack: {
    flexDirection: "row",
    width: "100%",
    height: verticalScale(4),
    backgroundColor: "#1C1C1E",
    borderRadius: darkTheme.layout.borderRadiusSmall,
    marginBottom: verticalScale(10),
    gap: scale(4), // Even breakdown spacing segmentation between layout ticks
  },
  progressFill: {
    flex: 1,
    height: "100%",
    borderRadius: scale(2),
  },
  progressEmpty: {
    flex: 1,
    height: "100%",
    backgroundColor: "#1C1C1E",
    borderRadius: scale(2),
  },
});
