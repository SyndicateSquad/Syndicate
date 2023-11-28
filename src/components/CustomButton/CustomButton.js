import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
      style={({ pressed }) => [
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: pressed ? 'rgba(59, 113, 243, 0.7)' : bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },
  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },
  container_TERIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  text_SECONDARY: {
    color: '#3B71F3',
  },
  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
