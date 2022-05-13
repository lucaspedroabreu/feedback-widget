import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { ChatTeardropDots } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { styles } from "./styles";

import { FeedbackForm } from "../FeedbackForm";
import { FeedbackOptions } from "../FeedbackOptions";
import { Success } from "../Success";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackHasBeenSubmitted, setFeedbackHasBeenSubmitted] =
    useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = [5, 284];

  function handleOpenFeedbackWidget() {
    bottomSheetRef.current?.expand();
  }

  function handleResetFeedback() {
    setFeedbackType(null);
    setFeedbackHasBeenSubmitted(false);
  }

  function handleFeedbackSubmission() {
    setFeedbackHasBeenSubmitted(true);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpenFeedbackWidget}
      >
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={styles.modal}
        enablePanDownToClose={true}
        handleIndicatorStyle={styles.indicator}
      >
        <BottomSheetView>
          {!feedbackType ? (
            <FeedbackOptions onFeedbackTypeSelected={setFeedbackType} />
          ) : !feedbackHasBeenSubmitted ? (
            <FeedbackForm
              onFeedbackDismiss={handleResetFeedback}
              onFeedbackSubmitted={handleFeedbackSubmission}
              feedbackType={feedbackType}
            />
          ) : (
            <Success onRequestAnotherFeedback={handleResetFeedback} />
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export default gestureHandlerRootHOC(Widget);
