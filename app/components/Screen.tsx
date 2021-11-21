import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';


const Screen = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8400ff",
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
