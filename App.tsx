import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {MeditationScreen} from './src/screens/MeditationScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <MeditationScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
});

export default App;
