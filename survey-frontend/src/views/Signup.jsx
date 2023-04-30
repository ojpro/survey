import {Link} from "react-router-dom";
import {useState} from "react";
import Axios from "../services/axios.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {
  const {setCurrentUser, setUserToken} = useStateContext();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // reset errors
    setErrors({});

    // send request
    Axios.post('/signup', {
      name: fullName, email, password, password_confirmation: passwordConfirmation
    }).then(({data}) => {
      // store user and user's token
      setCurrentUser(data.user);
      setUserToken(data.token);

    }).catch((error) => {
      if (error.response) {
        // store errors
        setErrors(error.response.data.errors)
      }
      console.error(error)
    })
  }
  return (<>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Create a new account
    </h2>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={fullName}
              required
              onChange={(event) => setFullName(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.name && (
            <span className='text-sm text-red-500 p-1'>
            {errors.name}
          </span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="email"
              required
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.email && (
            <span className='text-sm text-red-500 p-1'>
            {errors.email}
          </span>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              autoComplete="current-password"
              required
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.password && (
            <span className='text-sm text-red-500 p-1'>
            {errors.password}
          </span>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
              Password Confirmation
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password_confirmation"
              name="password_confirmation"
              autoComplete=""
              type="password"
              value={passwordConfirmation}
              required
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.password_confirmation && (
            <span className='text-sm text-red-500 p-1'>
            {errors.password_confirmation}
          </span>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member? &nbsp;
        <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign in to your account
        </Link>
      </p>
    </div>
  </>)
}
