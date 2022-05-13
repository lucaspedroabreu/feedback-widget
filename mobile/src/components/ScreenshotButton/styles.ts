import { StyleSheet } from "react-native";
import { theme } from "../../theme/index";

export const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 52,
    borderRadius: 4,
    backgroundColor: theme.colors.surface_secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    position: "relative",
  },
  removeIcon: {
    position: "absolute",
    bottom: 1,
    right: 1,
  },
  screenshot: {
    width: 52,
    height: 52,
    borderRadius: 4,
  },
  camera: {},
});
