import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, Share2, Shield, Video, Star, MapPin, 
  Calendar, Clock, Phone, MessageCircle, Globe, User, 
  Camera, Play, ChevronLeft, ChevronRight, X 
} from 'lucide-react';

const ProfileDetail = ({ profile, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const {
    id,
    name,
    age,
    location,
    price,
    rating,
    reviewCount,
    isVerified,
    isVip,
    isOnline,
    hasVideo,
    images,
    services,
    description,
    ethnicity,
    languages,
    measurements,
    height,
    weight,
    eyeColor,
    hairColor
  } = profile;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const tabs = [
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'gallery', label: 'Galeria', icon: Camera },
    { id: 'services', label: 'Serviços', icon: Star },
    { id: 'contact', label: 'Contato', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen luxury-gradient">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isLiked ? 'text-red-500 fill-red-500' : 'text-foreground'
                  }`}
                />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
              <img
                src={images[currentImageIndex]}
                alt={`${name} - Foto ${currentImageIndex + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsGalleryOpen(true)}
              />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Video Badge */}
              {hasVideo && (
                <button className="absolute top-4 left-4 bg-red-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Ver Vídeo</span>
                </button>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? 'border-accent'
                      : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${name} - Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="luxury-card p-6 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                    <span>{age} anos</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex items-center space-x-2 mb-4">
                    {isVip && (
                      <span className="vip-badge flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>VIP</span>
                      </span>
                    )}
                    {isVerified && (
                      <span className="verified-badge flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>Verificada</span>
                      </span>
                    )}
                    {isOnline && (
                      <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
                        <div className="online-indicator w-2 h-2" />
                        <span>Online</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold text-foreground">{rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">({reviewCount} avaliações)</p>
                </div>
              </div>

              {/* Price */}
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">R$ {price}</div>
                  <div className="text-sm text-muted-foreground">por hora</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Altura:</span>
                  <span className="text-foreground ml-2">{height}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Peso:</span>
                  <span className="text-foreground ml-2">{weight}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Etnia:</span>
                  <span className="text-foreground ml-2">{ethnicity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Olhos:</span>
                  <span className="text-foreground ml-2">{eyeColor}</span>
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="luxury-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Entrar em Contato</h3>
              <div className="space-y-3">
                <button className="luxury-button w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Ligar Agora</span>
                </button>
                <button className="border border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar Mensagem</span>
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-xs text-yellow-200">
                  ⚠️ Nunca pague antecipadamente. Sempre confirme a identidade antes do encontro.
                </p>
              </div>
            </div>

            {/* Availability */}
            <div className="luxury-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span>Disponibilidade</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Segunda-feira:</span>
                  <span className="text-foreground">Indisponível</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Terça-feira:</span>
                  <span className="text-foreground">Indisponível</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sexta-feira:</span>
                  <span className="text-green-400">Todo o dia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sábado:</span>
                  <span className="text-green-400">Todo o dia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Domingo:</span>
                  <span className="text-green-400">Todo o dia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-secondary rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="luxury-card p-8 rounded-xl">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Sobre {name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Detalhes Físicos</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Altura:</span>
                        <span className="text-foreground">{height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Peso:</span>
                        <span className="text-foreground">{weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Medidas:</span>
                        <span className="text-foreground">{measurements.bust}-{measurements.waist}-{measurements.hips}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cor dos olhos:</span>
                        <span className="text-foreground">{eyeColor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cor do cabelo:</span>
                        <span className="text-foreground">{hairColor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-accent" />
                      <span>Idiomas</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">Serviços Oferecidos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-secondary rounded-lg"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-foreground">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Preços</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">1 hora:</span>
                      <span className="text-foreground font-medium">R$ {price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">6 horas:</span>
                      <span className="text-foreground font-medium">R$ {price * 5}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pernoite (12h):</span>
                      <span className="text-foreground font-medium">R$ {price * 8}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">Informações de Contato</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Seu nome
                        </label>
                        <input
                          type="text"
                          className="search-input w-full py-2 px-3 rounded-lg focus:outline-none"
                          placeholder="Digite seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          className="search-input w-full py-2 px-3 rounded-lg focus:outline-none"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Mensagem
                      </label>
                      <textarea
                        rows={4}
                        className="search-input w-full py-2 px-3 rounded-lg focus:outline-none resize-none"
                        placeholder="Descreva o tipo de encontro desejado..."
                      />
                    </div>
                  </div>
                  
                  <button className="luxury-button w-full py-3 px-6 rounded-lg">
                    Enviar Mensagem
                  </button>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-blue-200">
                      💡 Seja respeitoso e claro sobre suas expectativas. Mensagens educadas têm maior chance de resposta.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={images[currentImageIndex]}
              alt={`${name} - Foto ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;

