import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import DefaultStyles from '../constants/default-styles'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

interface GameOverScreenProps {
  roundsNumber: number,
  userNumber: number,
  onRestart: () => void
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({roundsNumber, userNumber, onRestart}) => {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>The Game is Over!</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/success.png')}
            // source={{uri: https//ww...}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the
            number <Text style={styles.highlight}>{userNumber}</Text>
          </Text>
        </View>
        <View style={styles.button}>
          <MainButton
            onPress={onRestart}
          >
            New Game
          </MainButton>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 1000,
    marginVertical: 20,
    overflow: 'hidden',
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary,
  },
  textContainer: {
    width: '80%'
  },
  bodyText: {
    ...DefaultStyles.bodyText,
    color: 'grey',
    textAlign: 'center',
    fontSize: 16
  },
  image: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginVertical: 10
  }
});

export default GameOverScreen