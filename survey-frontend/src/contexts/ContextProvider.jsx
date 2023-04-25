import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: {},
  setCurrentUser: () => {
  },
  userToken: null,
  setUserToken: () => {
  }
})

export const ContextProvider = ({children}) => {
  // declare states
  const [currentUser, setCurrentUser] = useState({
    name: 'Tom Cook',
    email: 'tom@example.com',
  })
  const [userToken, setUserToken] = useState(null)

  return (
    <StateContext.Provider value={{
      currentUser,
      setCurrentUser,
      userToken,
      setUserToken
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const userStateContext = () => useContext(StateContext)
