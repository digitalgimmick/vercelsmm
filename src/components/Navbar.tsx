import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Youtube, LayoutDashboard, LogOut, Wrench, BarChart2, ImageIcon } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { signOut } from '@/lib/auth';

export default function Navbar() {
  const siteName = useSettingsStore(state => state.settings.siteName);
  const { user } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center">
              <Youtube className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold font-outfit tracking-tight">{siteName}</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium">
                  <Wrench className="h-4 w-4" />
                  Tools
                  <svg className="h-4 w-4 opacity-50 group-hover:opacity-70 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 w-[250px] bg-white rounded-lg shadow-lg py-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                              transition-all duration-200 ease-out
                              before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-50/50 before:via-white before:to-orange-50/50 before:rounded-lg before:-z-10">
                  <Link 
                    to="/tools/video-analyzer" 
                    className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                              hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                              transition-all duration-300"
                  >
                    <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                  bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                  transition-transform duration-300 ease-out" />
                    <div className="p-2 rounded-lg bg-red-50">
                      <BarChart2 className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="relative">
                      <div className="font-medium text-sm group-hover/link:text-red-600 transition-colors">Video Analyzer</div>
                      <div className="text-xs text-gray-500">Analyze video statistics</div>
                    </div>
                  </Link>
                  <Link 
                    to="/tools/thumbnail-downloader" 
                    className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                              hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                              transition-all duration-300"
                  >
                    <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                  bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                  transition-transform duration-300 ease-out" />
                    <div className="p-2 rounded-lg bg-red-50">
                      <ImageIcon className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="relative">
                      <div className="font-medium text-sm group-hover/link:text-red-600 transition-colors">Thumbnail Downloader</div>
                      <div className="text-xs text-gray-500">Download video thumbnails</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  GEO Views
                  <svg className="h-4 w-4 opacity-50 group-hover:opacity-70 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 w-[600px] bg-white rounded-lg shadow-lg py-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                              transition-all duration-200 ease-out
                              before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-50/50 before:via-white before:to-orange-50/50 before:rounded-lg before:-z-10">
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <Link 
                      to="/usa-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">USA Views</span>
                    </Link>
                    <Link 
                      to="/uk-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/gb.png" alt="UK" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">UK Views</span>
                    </Link>
                    <Link 
                      to="/australia-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/au.png" alt="Australia" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Australia Views</span>
                    </Link>
                    <Link 
                      to="/brazil-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/br.png" alt="Brazil" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Brazil Views</span>
                    </Link>
                    <Link 
                      to="/france-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/fr.png" alt="France" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">France Views</span>
                    </Link>
                    <Link 
                      to="/germany-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/de.png" alt="Germany" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Germany Views</span>
                    </Link>
                    <Link 
                      to="/india-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">India Views</span>
                    </Link>
                    <Link 
                      to="/italy-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/it.png" alt="Italy" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Italy Views</span>
                    </Link>
                    <Link 
                      to="/japan-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/jp.png" alt="Japan" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Japan Views</span>
                    </Link>
                    <Link 
                      to="/netherlands-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/nl.png" alt="Netherlands" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Netherlands Views</span>
                    </Link>
                    <Link 
                      to="/poland-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/pl.png" alt="Poland" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Poland Views</span>
                    </Link>
                    <Link 
                      to="/turkey-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/tr.png" alt="Turkey" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Turkey Views</span>
                    </Link>
                    <Link 
                      to="/spain-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/es.png" alt="Spain" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">Spain Views</span>
                    </Link>
                    <Link 
                      to="/south-africa-views" 
                      className="flex items-center gap-3 p-3 rounded-lg relative group/link overflow-hidden
                                hover:bg-gradient-to-r hover:from-red-100/80 hover:to-transparent
                                transition-all duration-300"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/link:translate-x-0 
                                    bg-gradient-to-r from-red-100/80 via-white/60 to-transparent
                                    transition-transform duration-300 ease-out" />
                      <img src="https://flagcdn.com/w40/za.png" alt="South Africa" className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium text-gray-700 group-hover/link:text-red-600 transition-colors relative">South Africa Views</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button 
                    variant="outline" 
                    className="font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200
                              transition-all duration-200"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200
                            transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200
                              transition-all duration-200"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="font-medium bg-red-500 hover:bg-red-600 transition-all duration-200">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
