import "./App.css";

import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <div className="bodyContainer">
          <SideBar />
          <MainContent />
        </div>
      </div>
    </Provider>
  );
}

export default App;
