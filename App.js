import { StatusBar } from 'expo-status-bar';

import Appnavigation from './navigation/Appnavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { LogBox } from 'react-native';
// import { ViewPropTypes } from 'deprecated-react-native-prop-types';

// LogBox.ignoreLogs([
//   "ViewPropTypes will be removed",
//   "ColorPropType will be removed",
//   ])
export default function App() {
  return (
    <SafeAreaProvider className=" h-full bg-neutral-800">

    <Appnavigation></Appnavigation>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
