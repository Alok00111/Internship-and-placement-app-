import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { JobProvider } from './src/context/JobContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <JobProvider>
      <StatusBar style="light" backgroundColor="#0F172A" />
      <AppNavigator />
    </JobProvider>
  );
}