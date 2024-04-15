import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'

import Loader from '../TabScreens/HeaderScreens/Message/component/common/Loader'
import HooksExample from './components/HooksExample'

import { UserContext } from '../TabScreens/HeaderScreens/Message/component/context'
import firebaseService from '../TabScreens/HeaderScreens/Message/component/services/Firebaseservice'

export default function App () {
  const [user, setUser] = useState(null)

  useEffect(
    function () {
      firebaseService.signIn()
        .then(({ user, error }) => {
          if (error) {
            Alert.alert('Something went wrong')
            return
          }

          setUser(user)
        })
    },
    []
  )

  if (!user) {
    return <Loader />
  }

  return (
    <UserContext.Provider value={user}>
      <HooksExample />
    </UserContext.Provider>
  )
}