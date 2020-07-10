import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, ImagePropTypes, Alert, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { NumberContainer } from '../components/NumberContainer'
import { Card } from '../components/Card'
import MainButton from '../components/MainButton'
import DefaultStyles from '../constants/default-styles'
import Colors from '../constants/colors'


const generateRandomBetween: any = (min: number, max: number, exclude?: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

interface GameScreenProps {
  userChoice: number,
  onGameOver: (pastGuesses: PastGuesses) => void
}

export type PastGuesses = number[]


const renderListItem = (value: number, numOfRound: number) => (
  <View key={value} style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>
      #{numOfRound}
    </Text>
    <Text style={DefaultStyles.bodyText}>
      {value}
    </Text>
  </View>
)

const GameScreen: React.FC<GameScreenProps> = ({userChoice, onGameOver}) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [ pastGuesses, setPastGuesses ] = useState<PastGuesses>([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver( pastGuesses );
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction:'lower'|'higher') => {
    if (
      (direction === 'lower' && currentGuess < userChoice)
      || (direction === 'higher' && currentGuess > userChoice)
    )
    {
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'}
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses])
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Feather name="arrow-down" size={18} />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('higher')}>
          <Feather name="arrow-up" size={18} />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    flexDirection: 'row',
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 2,
    width: '50%'
  }
})

export default GameScreen