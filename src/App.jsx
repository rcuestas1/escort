import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import './App.css';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilterSidebar from './components/FilterSidebar';
import ProfileCard from './components/ProfileCard';
import ProfileDetail from './components/ProfileDetail';

// Data
import { mockProfiles, filterProfiles } from './data/mockData';

function App() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'newest'
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(12);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'profile'

  const [filters, setFilters] = useState({
    location: '',
    ageRange: [18, 50],
    priceRange: [100, 2000],
    ethnicity: '',
    services: [],
    languages: [],
    availability: 'any',
    verified: false,
    vip: false,
    hasVideo: false
  });

  // Filter profiles when filters change
  useEffect(() => {
    let filtered = filterProfiles(profiles, filters);
    
    // Sort profiles
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // featured
        filtered.sort((a, b) => {
          if (a.isVip && !b.isVip) return -1;
          if (!a.isVip && b.isVip) return 1;
          return b.rating - a.rating;
        });
    }

    setFilteredProfiles(filtered);
    setCurrentPage(1);
  }, [filters, sortBy, profiles]);

  // Pagination
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProfile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen luxury-gradient">
      {/* Render Profile Detail or Home */}
      {currentView === 'profile' && selectedProfile ? (
        <ProfileDetail 
          profile={selectedProfile} 
          onBack={handleBackToHome}
        />
      ) : (
        <>
          {/* Header */}
          <Header />

          {/* Hero Section */}
          <HeroSection />

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {/* Content Area */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden luxury-button px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                </button>
                
                <div className="text-foreground">
                  <span className="font-semibold">{filteredProfiles.length}</span>
                  <span className="text-muted-foreground ml-1">
                    {filteredProfiles.length === 1 ? 'acompanhante encontrada' : 'acompanhantes encontradas'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="search-input px-3 py-2 rounded-lg focus:outline-none appearance-none"
                >
                  <option value="featured" className="bg-gray-800 text-white">Em destaque</option>
                  <option value="price-low" className="bg-gray-800 text-white">Menor preço</option>
                  <option value="price-high" className="bg-gray-800 text-white">Maior preço</option>
                  <option value="rating" className="bg-gray-800 text-white">Melhor avaliação</option>
                  <option value="newest" className="bg-gray-800 text-white">Mais recentes</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Profiles Grid */}
            {currentProfiles.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {currentProfiles.map((profile) => (
                  <ProfileCard 
                    key={profile.id} 
                    profile={profile} 
                    onProfileSelect={handleProfileSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                  <Filter className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nenhuma acompanhante encontrada
                </h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar os filtros para encontrar mais resultados
                </p>
                <button
                  onClick={() => setFilters({
                    location: '',
                    ageRange: [18, 50],
                    priceRange: [100, 2000],
                    ethnicity: '',
                    services: [],
                    languages: [],
                    availability: 'any',
                    verified: false,
                    vip: false,
                    hasVideo: false
                  })}
                  className="luxury-button px-6 py-3 rounded-lg"
                >
                  Limpar Filtros
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;
                    
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isCurrentPage
                              ? 'bg-accent text-accent-foreground'
                              : 'border border-border text-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="px-2 text-muted-foreground">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-white/10 mt-16">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">EC</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gradient">Elite Companions</h3>
                      <p className="text-sm text-muted-foreground">Luxury Directory</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    O mais exclusivo diretório de acompanhantes de luxo do Brasil. 
                    Experiências discretas e sofisticadas com as mais elegantes companhias.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">⚠️ Conteúdo exclusivo para maiores de 18 anos</p>
                    <p>🔒 Ambiente seguro e discreto</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Links Úteis</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-accent transition-colors">Sobre Nós</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Como Funciona</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Segurança</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Suporte</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-accent transition-colors">Termos de Uso</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Cookies</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; 2025 Elite Companions. Todos os direitos reservados.</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
