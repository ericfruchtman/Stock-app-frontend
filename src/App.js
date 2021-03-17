import './App.css';
import Search from "./search";
import Portfolio from "./portfolio";

function App() {
  return (
    <>

    <div className={'w-full p-5 bg-gradient-to-r from-blue-400 via-gray-500 to-green-500'}>
      <h1 className={'text-xl font-bold font-sans text-center text-green-50 tracking-wider uppercase'}>Stock Trader</h1>

    </div>

    <div className="grid grod-cols-2">
      <Search />
      <Portfolio />  

    </div>

    </>
  );
}

export default App;
