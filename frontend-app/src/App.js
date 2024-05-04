import "./App.scss";
import Footer from "./components/Layouts/Footer/Footer";
import Header from "./components/Layouts/Header/Header";
import Home from "./components/pages/Home/Home";

function App() {
  return (
    <div className="App-container">
      <div className="App-header">
        <Header />
      </div>
      <div className="App-content">
        <Home />
      </div>
      <div className="App-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
