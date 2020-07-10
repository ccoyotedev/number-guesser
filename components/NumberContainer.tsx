import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from '../constants/colors'

interface NumberContainerProps {
  children: number | undefined
}

export const NumberContainer: React.FC<NumberContainerProps> = ({children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    color: Colors.accent,
    fontSize: 22
  }
})