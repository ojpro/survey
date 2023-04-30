import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: {},
  setCurrentUser: () => {
  },
  userToken: null,
  setUserToken: () => {
  },
  questionTypes: [],
  showToast: (message, duration = 3000) => {
  },
})

export const ContextProvider = ({children}) => {
  // declare states
  const [currentUser, setCurrentUser] = useState({})
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '')
  const [questionTypes] = useState(['text', 'textarea', 'select', 'radio', 'checkbox'])
  const [toast, setToast] = useState({message: null, show: false})

  const showToast = (message, duration = 3000) => {
    setToast({message: message, show: true})
    setTimeout(() => {
      setToast({message: null, show: false})
    }, duration)
  }
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
      questionTypes,
      toast,
      showToast
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
