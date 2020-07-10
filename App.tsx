import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Header } from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen, { PastGuesses } from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const [gameGuesses, setGameGuesses] = useState<PastGuesses>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = (pastGuesses: number[]) => {
    setGameGuesses(pastGuesses)
  }

  const configureNewGameHandler = () => {
    setGameGuesses([]);
    setUserNumber(0);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && gameGuesses.length <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (gameGuesses.length > 0) {
    content =
    <GameOverScreen
      roundsNumber={gameGuesses.length}
      userNumber={userNumber}
      onRestart={() => configureNewGameHandler()}
    />
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});