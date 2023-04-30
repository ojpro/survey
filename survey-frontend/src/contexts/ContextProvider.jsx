import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: {},
  setCurrentUser: () => {
  },
  userToken: null,
  setUserToken: () => {
  },
  questionTypes: [],
})

export const ContextProvider = ({children}) => {
  // declare states
  const [currentUser, setCurrentUser] = useState({})
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '')
  const [questionTypes] = useState(['text', 'textarea', 'select', 'radio', 'checkbox'])
  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token);
    } else {
      localStorage.removeItem('TOKEN');
    }
    _setUserToken(token)
  }
  return (
    <StateContext.Provider value={{
      currentUser,
      setCurrentUser,
      userToken,
      setUserToken,
      questionTypes
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
