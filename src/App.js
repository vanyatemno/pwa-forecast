import './App.css';
import LoginPage from "./loginPage/LoginPage";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import WeatherPage from "./WeatherPage/WeatherPage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='weather' element={<WeatherPage/>}/>
              <Route path='*' element={<LoginPage/>}/>
          </Routes>

      </BrowserRouter>
  );
}

export default App;
