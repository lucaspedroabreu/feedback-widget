import React from "react";
import { Text, View } from "react-native";

import { Copyright } from "../Copyright";

import { styles } from "./styles";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Option } from "./Option";
import { FeedbackType } from "../Widget";

interface FeedbackOptionsProps {
  onFeedbackTypeSelected: (feedbacType: FeedbackType) => void;
}

export function FeedbackOptions({
  onFeedbackTypeSelected,
}: FeedbackOptionsProps) {
  function handleFeedbackTypeSelection(feedbackType: FeedbackType) {
    onFeedbackTypeSelected(feedbackType);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            image={value.image}
            title={value.title}
            onPress={() => handleFeedbackTypeSelection(key as FeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
