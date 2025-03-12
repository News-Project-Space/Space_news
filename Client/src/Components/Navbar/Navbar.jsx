import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/article/1">Article Details</Link></li>
        <li><Link to="/bookmark">Bookmark</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/news-article-create">News Article Create</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/to-be-journalist">To Be Journalist</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
