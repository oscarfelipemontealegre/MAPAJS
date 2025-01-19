import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import GeoControl from './geoControl';
import 'leaflet/dist/leaflet.css';
import '../App.css';

const MapComponent = () => {
    const mapRef = useRef(null); // Referencia al contenedor del mapa
    const [map, setMap] = useState(null); // Estado para la instancia del mapa
    const [locationInfo, setLocationInfo] = useState('Selecciona un lugar en el mapa'); // Información de la ubicación seleccionada

    useEffect(() => {
        if (!mapRef.current) return;

        // Inicializa el mapa
        const mapInstance = L.map(mapRef.current, {
            zoomControl: false, // Desactiva el control de zoom predeterminado
        }).setView([51.505, -0.09], 13);

        // Agrega capa de mapa base
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstance);

        // Agrega control de zoom en una posición personalizada
        L.control.zoom({ position: 'topright' }).addTo(mapInstance);

        // Guarda la instancia del mapa en el estado
        setMap(mapInstance);

        // Limpia la instancia del mapa cuando el componente se desmonta
        return () => {
            mapInstance.remove();
        };
    }, []);

    return (
        <div className="map-container">
            {/* Barra superior para mostrar información dinámica */}
            <div className="map-info-bar">
                <span>{locationInfo}</span>
            </div>

            {/* Contenedor del mapa */}
            <div ref={mapRef} className="map-content" />

            {/* Componente GeoControl */}
            {map && <GeoControl map={map} setLocationInfo={setLocationInfo} />}
        </div>
    );
};

export default MapComponent;
