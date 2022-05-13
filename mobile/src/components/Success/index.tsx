import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

import succesImg from "../../assets/success.png";
import { Copyright } from "../Copyright";

interface SuccessCardProps {
  onRequestAnotherFeedback: () => void;
}

export function Success({ onRequestAnotherFeedback }: SuccessCardProps) {
  return (
    <View style={styles.container}>
      <Image source={succesImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onRequestAnotherFeedback}
      >
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
