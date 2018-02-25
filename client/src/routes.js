import Home from './routes/Home'
import Signup from './routes/SignUp'
import LogIn from './routes/LogIn'
import ForgotPassword from './routes/ForgotPassword'
import PublicTasks from './routes/PublicTasks'
// import Sport from './routes/Sport'
import MainLayout from './layouts/MainLayout'
// import LoginLayout from './layouts/LoginLayout'

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
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
    main: PublicTasks,
    layout: MainLayout
  },
  // {
  //   path: '/sports',
  //   exact: true,
  //   main: Sport,
  //   layout: MainLayout
  // },
  // {
  //   path: '/sports/:sportName',
  //   main: Sport,
  //   layout: MainLayout
  // },
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
  }
]

export default routes
