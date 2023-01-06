import Home from "./pages/Home";
import NoMatch from "./utils/NoMatch";
import SearchTop from "./pages/SearchTop";
import SearchResult from "./pages/SearchResult";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App bg-zinc-900 text-white min-h-full">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<SearchTop />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
