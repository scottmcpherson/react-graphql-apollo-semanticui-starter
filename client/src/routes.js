import Home from './routes/Home'
import Signup from './routes/SignUp'
import LogIn from './routes/LogIn'
import ForgotPassword from './routes/ForgotPassword'
import PublicTasks from './routes/PublicTasks'
import PrivateTasks from './routes/PrivateTasks'
import MainLayout from './layouts/MainLayout'

// Each logical "route" has two components, one for
// the layout and one for the main area. We want to
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
  {
    path: '/private-tasks',
    exact: true,
    main: PrivateTasks,
    layout: MainLayout
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
  }
]

export default routes
