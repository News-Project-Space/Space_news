import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AboutUs from './Components/AboutUs/About';
import ArticleDetails from './Components/ArticleDetails/Details';
import Bookmark from './Components/Bookmark/Bookmark';
import Categories from './Components/Categories/Categories';
import ContactUs from './Components/ContactUs/Contact';
import Footer from './Components/Footer/Footer';
import HomePage from './Components/HomePage/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import NewsArticle from './Components/NewsArticleCreation/Newsform';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import ToBeJournalist from './Components/ToBeJournalist/ToBeJournalists';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news-article-create" element={<NewsArticle />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/to-be-journalist" element={<ToBeJournalist />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
