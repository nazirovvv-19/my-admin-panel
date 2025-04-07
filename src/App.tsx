import "./App.css";
import Login from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import useGlobalStore from "./store/store";
import Sidebar from "./components/Sidebar";
import Routers from "./components/Routers";
function App() {
  const auth = useGlobalStore();
  return (
    <div className=" h-screen  ">
      {auth.user ? (
        <>
          <Navbar />

          <div className="flex ">
            <Sidebar />
            <Routers />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
