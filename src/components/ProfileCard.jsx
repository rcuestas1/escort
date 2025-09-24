import React, { useState } from 'react';
import { Heart, MapPin, Star, Shield, Video, Eye, MessageCircle } from 'lucide-react';

const ProfileCard = ({ profile, onProfileSelect }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    description
  } = profile;

  return (
    <div className="profile-card luxury-card rounded-xl overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Main Image */}
        <img
          src={images[0]}
          alt={name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
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
          {hasVideo && (
            <span className="bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
              <Video className="w-3 h-3" />
              <span>Vídeo</span>
            </span>
          )}
        </div>

        {/* Online Status */}
        {isOnline && (
          <div className="absolute top-3 right-3">
            <div className="online-indicator" />
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-12 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-400'
            }`}
          />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-accent/80 transition-all duration-300">
            <Eye className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-accent/80 transition-all duration-300">
            <MessageCircle className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-lg font-bold">
            R$ {price}/h
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
              {name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{age} anos</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1 mb-3">
          {services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
            >
              {service}
            </span>
          ))}
          {services.length > 3 && (
            <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-md">
              +{services.length - 3}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={() => onProfileSelect(profile)}
            className="luxury-button flex-1 py-2 px-4 rounded-lg text-sm font-medium text-white hover:shadow-lg transition-all duration-300"
          >
            Ver Perfil
          </button>
          <button className="border border-accent text-accent hover:bg-accent hover:text-accent-foreground py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300">
            Contato
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

export default ProfileCard;

