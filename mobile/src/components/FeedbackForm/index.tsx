import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { FeedbackType } from "../Widget";

import * as FileSystem from "expo-file-system";

import { styles } from "./styles";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/api";

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackDismiss: () => void;
  onFeedbackSubmitted: () => void;
}

export function FeedbackForm({
  feedbackType,
  onFeedbackDismiss,
  onFeedbackSubmitted,
}: FormProps) {
  const feedbackTypeObject = feedbackTypes[feedbackType];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  function handleScreenshotRequest() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.warn(error));
  }

  function handleRemoveScreenshot() {
    setScreenshot(null);
  }

  async function handleFeedbackSubmission() {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const screenshotBase64 = screenshot
      ? await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" })
      : null;

    try {
      await api.post("/feedbacks/create", {
        type: feedbackType,
        comment: feedbackComment,
        screenshot:
          screenshot && screenshotBase64
            ? `data:image/png;base64, ${screenshotBase64}`
            : screenshot
            ? "Error converting screenshot"
            : undefined,
      });

      onFeedbackSubmitted();
    } catch (error) {
      console.warn(error);
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity disabled={isSubmitting} onPress={onFeedbackDismiss}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeObject.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeObject.title}</Text>
        </View>
      </View>

      <TextInput
        multiline={true}
        editable={!isSubmitting}
        onChangeText={setFeedbackComment}
        keyboardAppearance="dark"
        numberOfLines={5}
        style={styles.formInput}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.buttons}>
        <ScreenshotButton
          onRequestScreenshot={handleScreenshotRequest}
          onDismissScreenshot={handleRemoveScreenshot}
          screenshot={screenshot}
        />
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onPress={handleFeedbackSubmission}
        />
      </View>
    </View>
  );
}
