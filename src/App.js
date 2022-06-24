import React, { useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Navigation from './Navigation'

import store from './store/store'
import { Storage } from './constants/storage'
import { setMe } from './store/me'

import Loader from './components/Loader'

function App() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bootstrap()
  }, [])

  const bootstrap = async () => {
    try {
      const token = await AsyncStorage.getItem(Storage.token)

      if (token) {
        const { data } = await axios.get('http://localhost:3001/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        dispatch(setMe(data.me))
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  return <Navigation />
}

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default RootApp
