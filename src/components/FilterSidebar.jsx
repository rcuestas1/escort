import React, { useState } from 'react';
import { Filter, X, MapPin, DollarSign, Calendar, User, Heart, Star, Globe } from 'lucide-react';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const locations = [
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte',
    'Salvador', 'Fortaleza', 'Curitiba', 'Porto Alegre', 'Recife',
    'Goiânia', 'Belém', 'Guarulhos', 'Campinas', 'São Luís'
  ];

  const ethnicities = [
    'Branca', 'Morena', 'Negra', 'Asiática', 'Latina', 'Indígena'
  ];

  const services = [
    'Acompanhamento Social', 'Jantar Romântico', 'Eventos Corporativos',
    'Viagens', 'Massagem Relaxante', 'Companhia VIP', 'Festas Privadas',
    'Reuniões de Negócios', 'Shows e Espetáculos', 'Turismo'
  ];

  const languages = [
    'Português', 'Inglês', 'Espanhol', 'Francês', 'Italiano', 'Alemão'
  ];

  const updateFilter = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
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
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 filter-sidebar border-r border-white/10 z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-bold text-foreground">Filtros</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Limpar
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-3">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Localização</span>
            </label>
            <select
              value={localFilters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="search-input w-full py-2 px-3 rounded-lg focus:outline-none appearance-none"
            >
              <option value="">Todas as cidades</option>
              {locations.map((city, index) => (
                <option key={index} value={city} className="bg-gray-800 text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Age Range */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-3">
              <User className="w-4 h-4 text-accent" />
              <span>Idade: {localFilters.ageRange[0]} - {localFilters.ageRange[1]} anos</span>
            </label>
            <div className="px-2">
              <input
                type="range"
                min="18"
                max="60"
                value={localFilters.ageRange[1]}
                onChange={(e) => updateFilter('ageRange', [localFilters.ageRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-3">
              <DollarSign className="w-4 h-4 text-accent" />
              <span>Preço: R$ {localFilters.priceRange[0]} - R$ {localFilters.priceRange[1]}</span>
            </label>
            <div className="px-2">
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={localFilters.priceRange[1]}
                onChange={(e) => updateFilter('priceRange', [localFilters.priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          {/* Ethnicity */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Etnia</label>
            <div className="space-y-2">
              {ethnicities.map((ethnicity, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="ethnicity"
                    value={ethnicity}
                    checked={localFilters.ethnicity === ethnicity}
                    onChange={(e) => updateFilter('ethnicity', e.target.value)}
                    className="w-4 h-4 text-accent bg-gray-700 border-gray-600 focus:ring-accent"
                  />
                  <span className="text-sm text-muted-foreground">{ethnicity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-3">
              <Calendar className="w-4 h-4 text-accent" />
              <span>Disponibilidade</span>
            </label>
            <select
              value={localFilters.availability}
              onChange={(e) => updateFilter('availability', e.target.value)}
              className="search-input w-full py-2 px-3 rounded-lg focus:outline-none appearance-none"
            >
              <option value="any" className="bg-gray-800 text-white">Qualquer horário</option>
              <option value="now" className="bg-gray-800 text-white">Disponível agora</option>
              <option value="today" className="bg-gray-800 text-white">Hoje</option>
              <option value="weekend" className="bg-gray-800 text-white">Final de semana</option>
            </select>
          </div>

          {/* Services */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Serviços</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {services.map((service, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={service}
                    checked={localFilters.services.includes(service)}
                    onChange={(e) => {
                      const newServices = e.target.checked
                        ? [...localFilters.services, service]
                        : localFilters.services.filter(s => s !== service);
                      updateFilter('services', newServices);
                    }}
                    className="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent"
                  />
                  <span className="text-sm text-muted-foreground">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground mb-3">
              <Globe className="w-4 h-4 text-accent" />
              <span>Idiomas</span>
            </label>
            <div className="space-y-2">
              {languages.map((language, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={language}
                    checked={localFilters.languages.includes(language)}
                    onChange={(e) => {
                      const newLanguages = e.target.checked
                        ? [...localFilters.languages, language]
                        : localFilters.languages.filter(l => l !== language);
                      updateFilter('languages', newLanguages);
                    }}
                    className="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent"
                  />
                  <span className="text-sm text-muted-foreground">{language}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Filters */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Especiais</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.verified}
                  onChange={(e) => updateFilter('verified', e.target.checked)}
                  className="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent"
                />
                <span className="text-sm text-muted-foreground">Apenas verificadas</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.vip}
                  onChange={(e) => updateFilter('vip', e.target.checked)}
                  className="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent"
                />
                <span className="text-sm text-muted-foreground">Apenas VIP</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.hasVideo}
                  onChange={(e) => updateFilter('hasVideo', e.target.checked)}
                  className="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent"
                />
                <span className="text-sm text-muted-foreground">Com vídeo</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

