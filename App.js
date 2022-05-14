import React from 'react';
import Login from './Screens/Login';
import Form from './Screens/Form';
import Play from './Screens/Play';
import Dashboard from './Screens/Dashboard'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen: Login,
  FormScreen: Form,
  Dashboard: Dashboard,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return (
    <AppNavigator />
  );
}