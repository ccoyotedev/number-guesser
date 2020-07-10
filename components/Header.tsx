import React from 'react'
import { View, Text, StyleSheet, ImagePropTypes } from 'react-native'
import Colors from '../constants/colors'

interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
})