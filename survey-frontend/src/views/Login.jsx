import {Link} from "react-router-dom";
import {useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Axios from "../services/axios.js";

export default function Login() {
  const {setCurrentUser, setUserToken} = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // reset errors
    setErrors({});

    // send request
    Axios.post('/login', {
      email, password, remember: rememberMe
    }).then(({data}) => {
      // store user's token
      setUserToken(data.token);

    }).catch((error) => {
      if (error.response) {
        // store errors
        setErrors(error.response.data.errors)
      }
    })
  }

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      {errors.error && (
        <div className='bg-red-500 rounded my-2 p-3 shadow'>
          <span className='text-sm text-white'>
            {errors.error}
          </span>
        </div>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
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
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
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

          {/* Remember Me */}
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input type="checkbox" id="remember_me" name="remember_me" checked={rememberMe}
                     className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                     onChange={(event) => setRememberMe(event.target.checked)}/>
            </div>
            <div className='ml-3 text-sm'>
              <label htmlFor="remember_me" className="font-medium text-gray-700">
                Remember Me
              </label>
            </div>
          </div>
          {/* // Remember Me */}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member? &nbsp;
          <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create an account
          </Link>
        </p>
      </div>
    </>
  )
}
