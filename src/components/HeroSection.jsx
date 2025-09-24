import React, { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Filter, Users, Star } from 'lucide-react';

const HeroSection = () => {
  const [filters, setFilters] = useState({
    location: '',
    ageRange: [18, 50],
    availability: 'any',
    priceRange: [100, 1000],
    services: []
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const locations = [
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 
    'Salvador', 'Fortaleza', 'Curitiba', 'Porto Alegre'
  ];

  const serviceTypes = [
    'Acompanhamento Social', 'Jantar Romântico', 'Eventos Corporativos',
    'Viagens', 'Massagem Relaxante', 'Companhia VIP'
  ];

  return (
    <section className="hero-section min-h-screen flex items-center justify-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Elite</span>{' '}
            <span className="text-gradient">Companions</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Descubra acompanhantes de luxo verificadas em todo o Brasil
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Experiências exclusivas e discretas com as mais elegantes companhias
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Encontre sua Companhia Ideal
            </h3>
            
            {/* Basic Search */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="search-input pl-12 pr-4 py-3 w-full rounded-lg focus:outline-none appearance-none"
                >
                  <option value="">Selecione a cidade</option>
                  {locations.map((city, index) => (
                    <option key={index} value={city} className="bg-gray-800 text-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Range */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  className="search-input pl-12 pr-4 py-3 w-full rounded-lg focus:outline-none appearance-none"
                >
                  <option value="">Faixa etária</option>
                  <option value="18-25" className="bg-gray-800 text-white">18-25 anos</option>
                  <option value="26-35" className="bg-gray-800 text-white">26-35 anos</option>
                  <option value="36-45" className="bg-gray-800 text-white">36-45 anos</option>
                  <option value="46+" className="bg-gray-800 text-white">46+ anos</option>
                </select>
              </div>

              {/* Availability */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters({...filters, availability: e.target.value})}
                  className="search-input pl-12 pr-4 py-3 w-full rounded-lg focus:outline-none appearance-none"
                >
                  <option value="any" className="bg-gray-800 text-white">Qualquer horário</option>
                  <option value="now" className="bg-gray-800 text-white">Disponível agora</option>
                  <option value="today" className="bg-gray-800 text-white">Hoje</option>
                  <option value="weekend" className="bg-gray-800 text-white">Final de semana</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors mx-auto"
              >
                <Filter className="w-4 h-4" />
                <span>Filtros Avançados</span>
              </button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-black/20 rounded-lg">
                {/* Price Range */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Faixa de Preço (por hora)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      value={filters.priceRange[0]}
                      className="flex-1"
                    />
                    <span className="text-accent font-medium">
                      R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Tipo de Serviço
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceTypes.slice(0, 4).map((service, index) => (
                      <label key={index} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          className="rounded border-gray-600 bg-gray-700 text-accent focus:ring-accent"
                        />
                        <span className="text-gray-300">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Search Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="luxury-button flex-1 py-4 px-8 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Buscar Acompanhantes</span>
              </button>
              <button className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors py-4 px-8 rounded-lg font-semibold text-lg">
                Ver Todas
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-gray-300">Acompanhantes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
            <div className="text-gray-300">Cidades</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">98%</div>
            <div className="text-gray-300">Verificadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24/7</div>
            <div className="text-gray-300">Suporte</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

