import React from "react";
import { Image, View } from "react-native";

import { styles } from "./styles";
import { TouchableOpacity } from "react-native";
import { Camera, Trash } from "phosphor-react-native";
import { theme } from "../../theme";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onRequestScreenshot: () => void;
  onDismissScreenshot: () => void;
}

export function ScreenshotButton({
  screenshot,
  onDismissScreenshot,
  onRequestScreenshot,
}: ScreenshotButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onDismissScreenshot : onRequestScreenshot}
    >
      {screenshot ? (
        <View>
          <Image style={styles.screenshot} source={{ uri: screenshot }} />
          <Trash
            size={22}
            color={theme.colors.stroke}
            weight="fill"
            style={styles.removeIcon}
          />
        </View>
      ) : (
        <Camera
          size={22}
          color={theme.colors.text_secondary}
          weight="bold"
          style={styles.camera}
        />
      )}
    </TouchableOpacity>
  );
}
