import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  ArticleDetails,
  Bookmark,
  Categories,
  Contact,
  About,
  Login,
  Navbar,
  NewsArticleCreation,
  Profile,
  Register,
  ToBeJournalist,
  PageNotFound
} from "./components";
import Footer from "./Components/Footer/Footer";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />
        },
        
        {
          path: '/',
          element: <Home />,
          errorElement: <PageNotFound />
        },
        {
          path: '/ArticleDetails/:id',
          element: <ArticleDetails />
        },
        {
          path: '/Bookmark',
          element: <Bookmark />
        },
        {
          path: '/Categories',
          element: <Categories />
        },
        {
          path: '/Contact',
          element: <Contact />
        },
        {
          path: '/About',
          element: <About />
        },
        {
          path: '/ToBeJournalist',
          element: <ToBeJournalist />
        },
        {
          path: '/Profile',
          element: <Profile />
        },
        {
          path: '/NewsArticleCreation',
          element: <NewsArticleCreation />
        }
      ],
      errorElement: <PageNotFound />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/Register',
      element: <Register />
    }
    
  ])


  return (
    <>
      <RouterProvider router={router} />
      <Footer/>
    </>
  )
}

export default App
