import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Header} from "./Header/Header";
import {Content} from "./Content/Content";
import {Footer} from "./Footer/Footer";

export const App = () => {
  return (
    <Router>
      <Header />
      <Content />
      <Footer />
    </Router>
  );
}
