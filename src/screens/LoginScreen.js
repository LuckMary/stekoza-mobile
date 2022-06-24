import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setMe } from '../store/me'
import Loader from '../components/Loader'
import { Colors } from '../constants/theme'
import { Storage } from '../constants/storage'

const errors = {
  AUTH_ALL_MUST_BE_FILLED: 'Все поля должны быть заполнены!',
  AUTH_EMAIL_NOT_EXISTS:
    'Пользователя с такой почтой не существует. Зарегистрироваться?',
  AUTH_INVALID_PASSWORD: 'Неверный пароль!'
}

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const send = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:3001/auth/local', {
        email,
        password
      })

      if (!data.error) {
        setLoading(false)
        dispatch(setMe(data.me))

        await AsyncStorage.setItem(Storage.token, data.token)
      } else {
        setError(data.error)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <LinearGradient colors={['black', Colors.pDark]} style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 40
        }}
      >
        <ScrollView style={{ marginTop: 20 }}>
          <View
            style={[
              styles.error,
              {
                opacity: error ? 1 : 0
              }
            ]}
          >
            <Text
              style={{
                color: Colors.red,
                fontWeight: 'bold'
              }}
            >
              {error && errors[error.message]}
            </Text>
          </View>

          <Text style={styles.text}>Почта</Text>
          <TextInput
            name="email"
            placeholder="Введите почту"
            placeholderTextColor={Colors.white}
            value={email}
            onChangeText={e => {
              setEmail(e.trim())
            }}
            onFocus={() => {
              setError(null)
            }}
            style={[
              styles.input,
              {
                borderColor: error?.fields.includes('email')
                  ? Colors.red
                  : Colors.white
              }
            ]}
            selectionColor={Colors.pLight}
            autoCapitalize="none"
          />

          <Text style={styles.text}>Пароль</Text>
          <TextInput
            name="password"
            placeholder="Введите пароль"
            placeholderTextColor={Colors.white}
            value={password}
            onChangeText={p => {
              setPassword(p.trim())
            }}
            onFocus={() => {
              setError(null)
            }}
            style={[
              styles.input,
              {
                borderColor: error?.fields.includes('password')
                  ? Colors.red
                  : Colors.white
              }
            ]}
            selectionColor={Colors.pLight}
            autoCapitalize="none"
          />

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                send()
              }}
            >
              <Text>Войти!!!</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.text}>Еще нет аккаунта?</Text>
            <Text style={[styles.text, { color: Colors.sLight }]}>
              Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    color: Colors.sLight
  },
  text: {
    marginBottom: 8,
    color: Colors.white,
    fontWeight: 'bold'
  },
  button: {
    padding: 10,
    backgroundColor: Colors.secondary,
    marginVertical: 16,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  error: {
    // borderColor: 'red',
    // borderWidth: 1,
    borderRadius: 4,
    // backgroundColor: '#FFEAE9',
    marginBottom: 16,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoginScreen
