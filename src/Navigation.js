import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import FeedScreen from './screens/FeedScreen'

const AuthStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const SettingsStack = createNativeStackNavigator()
const RootStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen
        name="AuthScreen"
        options={{ presentation: 'modal' }}
        component={AuthScreen}
      />
    </AuthStack.Navigator>
  )
}

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  )
}

const Feed = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="FeedScreen" component={FeedScreen} />
    </SettingsStack.Navigator>
  )
}

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Tab.Screen
      name="Home"
      options={{
        tabBarLabel: 'Home'
      }}
      component={Home}
    />
    <Tab.Screen
      name="Feed"
      options={{
        tabBarLabel: 'Feed'
      }}
      component={Feed}
    />
  </Tab.Navigator>
)

const Root = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {true ? (
        <RootStack.Screen name="Tabs" component={Tabs} />
      ) : (
        <RootStack.Screen name="Auth" component={Auth} />
      )}
    </RootStack.Navigator>
  )
}

export default () => (
  <NavigationContainer>
    <Root />
  </NavigationContainer>
)
