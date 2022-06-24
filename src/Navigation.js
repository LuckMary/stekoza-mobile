import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useSelector } from 'react-redux'

import AuthScreen from './screens/AuthScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import FeedScreen from './screens/FeedScreen'
import { Colors } from './constants/theme'

const AuthStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const FeedStack = createNativeStackNavigator()
const RootStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.sLight,
        headerBackTitleStyle: { fontSize: 16 },
        headerTitleStyle: { color: Colors.white }
      }}
    >
      <AuthStack.Screen
        name="Registration"
        options={{ presentation: 'modal', title: 'Регистрация' }}
        component={AuthScreen}
      />
      <AuthStack.Screen
        name="Login"
        options={{ title: 'Вход' }}
        // options={{ presentation: 'modal' }}
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  )
}

const Home = () => {
  const { value } = useSelector(state => state.counter)

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        options={{ title: value.toString() }}
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  )
}

const Feed = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
    </FeedStack.Navigator>
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
  const data = useSelector(state => state.me.data)

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {data ? (
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
