import React, { ReactNode } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import DefaultStyles from '../constants/default-styles'
import Colors from '../constants/colors'

interface MainButtonProps {
  children: ReactNode | string,
  onPress: () => void
}

const MainButton: React.FC<MainButtonProps> = ({children, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  buttonText: {
    ...DefaultStyles.title,
    color: 'white'
  }
})

export default MainButton