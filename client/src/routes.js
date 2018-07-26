import Home from './routes/Home'
import Signup from './routes/SignUp'
import LogIn from './routes/LogIn'
import Tasks from './routes/Tasks'
import MainLayout from './layouts/MainLayout'
import ForgotPassword from './routes/ForgotPassword'
import VerifyEmail from './routes/VerifyEmail'
import ResetPassword from './routes/ResetPassword'

// Each logical "route" has two components, one for
// the layout and one for the main area we want to render
// We can also mark a route as checkAuth: true to redirect
// to the login page if not authenticated
const routes = [
  {
    path: '/',
    exact: true,
    main: Home,
    layout: MainLayout
  },
  {
    path: '/public-tasks',
    exact: true,
    main: Tasks,
    layout: MainLayout
  },
  {
    path: '/private-tasks',
    exact: true,
    main: Tasks,
    layout: MainLayout,
    checkAuth: true
  },
  {
    path: '/signup',
    main: Signup,
    layout: MainLayout
  },
  {
    path: '/login',
    main: LogIn,
    layout: MainLayout
  },
  {
    path: '/forgot-password',
    main: ForgotPassword,
    layout: MainLayout
  },
  {
    path: '/verify-email/:token',
    main: VerifyEmail,
    layout: MainLayout
  },
  {
    path: '/reset-password/:token',
    main: ResetPassword,
    layout: MainLayout
  }
]

export default routes
