import React from 'react'
import { TextInput, StyleSheet, TextStyle, TextInputProps} from 'react-native'

interface InputProps extends TextInputProps {
  style: TextStyle
}

export const Input: React.FC<InputProps> = (props) => {
    return (
      <TextInput {...props} style={{...styles.input, ...props.style}} />
    );
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  }
})