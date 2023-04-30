import {Fragment, useEffect} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {HiBars3BottomRight, HiXMark} from 'react-icons/hi2';
import {Navigate, NavLink, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {FiUser} from "react-icons/fi";
import Axios from "../services/axios.js";

const navigation = [
  {name: 'Dashboard', to: '/'},
  {name: 'Surveys', to: '/surveys'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DefaultLayout() {
  // get user state
  const {currentUser, userToken, setUserToken, setCurrentUser} = useStateContext();

  // Logout functionality
  const logout = (event) => {
    event.preventDefault()

    Axios.post('/logout')
      .then(res => {
        // clear user info
        setCurrentUser({})
        setUserToken(null)
      })
  }

  if (!userToken) {
    return <Navigate to='/login'/>
  }

  useEffect(() => {
    Axios.get('/user')
      .then(({data}) => {
        if (data.data) {
          setCurrentUser(data.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({open}) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({isActive}) => classNames(
                              isActive
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button
                            className="flex max-w-xs items-center rounded-full bg-gray-900 p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <span className="sr-only">Open user menu</span>
                            <FiUser className="w-6 h-6 text-white"/>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({active}) => (
                                <a
                                  href='#'
                                  onClick={(event) => logout(event)}
                                  className='block px-4 py-2 text-sm text-gray-700'>
                                  Log out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <HiXMark className="block h-6 w-6" aria-hidden="true"/>
                      ) : (
                        <HiBars3BottomRight className="block h-6 w-6" aria-hidden="true"/>
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({isActive}) => classNames(
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0 rounded-full bg-gray-900 p-2.5 focus:ring-2 focus:ring-gray-500">
                      <FiUser className="w-6 h-6 text-white"/>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as="a"
                      href='#'
                      onClick={(event) => logout(event)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Log out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/* Content */}
        <main className='container mx-auto'>
          <Outlet/>
        </main>
      </div>
    </>
  )
}
