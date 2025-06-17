import "./App.css";
import { Canvas } from "./components/canvas";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { AppContextProvider } from "./context/appContext";

function App() {
  return (
    <AppContextProvider>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <section className="main-section">
            <Canvas />
            <Footer />
          </section>
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
