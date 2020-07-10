import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import DefaultStyles from '../constants/default-styles'
import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { NumberContainer } from '../components/NumberContainer'
import MainButton from '../components/MainButton'
import Colors from '../constants/colors'

interface StartGameScreenProps {
  onStartGame: (selectedNumber: number) => void
}

const StartGameScreen: React.FC<StartGameScreenProps> = ({ onStartGame }) => {
  const [ enteredValue, setEnteredValue ] = useState<string>('');
  const [ confirmed, setConfirmed ] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  const numberInputHandler = (value: string) => {
    setEnteredValue(value.replace(/[^0-9]/g, ''));
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!', 'Number has to be a number between 1 and 99',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
      )
      return;
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNumber);
  }

  let confirmedOutput

  if (confirmed) {
    confirmedOutput =
      <Card style={styles.summaryContainer}>
        <Text>You selected:</Text>
        <NumberContainer>
          {selectedNumber}
        </NumberContainer>
        <MainButton onPress={() => onStartGame(selectedNumber)}>
          Start Game
        </MainButton>
      </Card>
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.cardStyle}>
          <Text style={DefaultStyles.bodyText}>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            value={enteredValue}
            onChangeText={numberInputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  cardStyle: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  title: {
    ...DefaultStyles.title,
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    width: 100
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default StartGameScreen