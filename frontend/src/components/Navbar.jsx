import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
      <Link to="/" className="text-xl font-bold text-blue-600">CodeSnippet</Link>

      <div className="hidden md:flex items-center gap-5">
        <Link to="/snippets" className="hover:text-blue-600 font-medium">Snippets</Link>
        <Link to="/about" className="hover:text-blue-600 font-medium">About</Link>

        {user && (
          <>
            <Link to="/add-snippet" className="hover:text-blue-600 font-medium">Add Snippet</Link>
            <Link to="/dashboard" className="hover:text-blue-600 font-medium">Dashboard</Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" className="text-blue-600 font-medium">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-1 rounded font-medium">Signup</Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full focus:outline-none hover:bg-blue-200"
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg py-2">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  Signed in as <br /><span className="font-medium">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        className={`fixed top-16 left-0 w-full bg-white shadow-md border-t px-6 py-6 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <Link to="/snippets" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 font-medium">Snippets</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 font-medium">About</Link>

          {user && (
            <>
              <Link to="/add-snippet" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 font-medium">Add Snippet</Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 font-medium">Dashboard</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-blue-600 font-medium">Login</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="bg-blue-600 text-white px-4 py-1 rounded font-medium">Signup</Link>
            </>
          ) : (
            <div className="space-y-2 border-t pt-2">
              <div className="text-sm text-gray-700">
                Signed in as <br /><span className="font-medium">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
