
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PlaybookTracker from "./pages/PlaybookTracker";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GoogleAdsGuide from "./pages/GoogleAdsGuide";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tracker" element={<PlaybookTracker />} />
        <Route path="/google-ads-guide" element={<GoogleAdsGuide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
