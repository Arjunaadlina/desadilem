import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Beranda', href: 'home' },
  { label: 'Tentang', href: 'about' },
  { label: 'Umkm', href: 'umkm' },
  { label: 'Pariwisata', href: 'pariwisata' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Tambahkan useNavigate

  const handleLoginClick = () => {
    const token = localStorage.getItem('token'); // Cek token di localStorage
    if (token) {
      navigate('/admin'); // Arahkan ke halaman /admin jika token ada
    } else {
      navigate('/login'); // Arahkan ke halaman /login jika token tidak ada
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 font-lucida ${
        scrolled ? `bg-white/40 backdrop-blur-md shadow-md` : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 cursor-pointer"
          >
            <Link to="home" className="text-2xl font-bold text-secondary" smooth={true} duration={500}>
              <img src={'/logokknp.jpg'} alt="Logo" width={55} height={55} className="rounded-full" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center"
                >
                  <Link
                    to={item.href}
                    smooth={true}
                    duration={500}
                    className={`px-3 py-2 rounded-md text-md cursor-pointer font-medium transition-colors ${
                      window.location.pathname === item.href
                        ? 'text-secondary bg-white'
                        : 'text-gray-600 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            onClick={handleLoginClick}
            className="hidden md:flex bg-secondary rounded-md items-center justify-center cursor-pointer font-bold text-white"
          >
            <div className="hidden md:flex w-32 py-2 bg-secondary rounded-md items-center justify-center font-bold text-white">
              <p>Login</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                window.scrollY > 20 ? 'text-secondary' : 'text-white'
              } hover:text-white hover:bg-indigo-50 focus:outline-none`}
            >
              {isOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.div key={item.href} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      window.location.pathname === item.href
                        ? 'text-secondary bg-secondary/50'
                        : 'text-gray-600 hover:text-white hover:bg-indigo-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                </motion.div>
              ))}
              <p onClick={handleLoginClick} className=' font-medium text-base px-3 text-white hover:text-white hover:bg-indigo-50 bg-secondary py-2 rounded-md'>Login</p>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
