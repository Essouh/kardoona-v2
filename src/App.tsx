import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import CarrierProfile from './pages/CarrierProfile';
import UserProfile from './pages/UserProfile';
import CreateJourney from './pages/CreateJourney';
import CreatePackage from './pages/CreatePackage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/carriers" element={<CarrierProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/journey/new" element={<CreateJourney />} />
            <Route path="/package/new" element={<CreatePackage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;