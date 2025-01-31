import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import '../App.css';


const GeoControl = ({ map }) => {
    useEffect(() => {
        if (!map) return;

        const provider = new OpenStreetMapProvider();

        let searchInputElement = null;
        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar',
            showMarker: false,
            showPopup: false,
            retainZoomLevel: false,
            autoClose: true,
            searchLabel: 'Buscar ubicación...',
        });
        map.addControl(searchControl);

        setTimeout(() => {
            const searchContainer = document.querySelector('.leaflet-control-geosearch input');
            if (searchContainer) {
                searchInputElement = searchContainer;
            }
        }, 500);

        const clearMarkers = () => {
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        };

        const addMarker = (lat, lng, popupContent) => {
            clearMarkers();
            L.marker([lat, lng], {
                icon: new L.Icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                }),
            })
                .addTo(map)
                .bindPopup(popupContent)
                .openPopup();

            map.setView([lat, lng], 13);
        };

        const fetchLocationName = async (lat, lng) => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );
                const data = await response.json();
                return data.display_name || 'Ubicación desconocida';
            } catch (error) {
                console.error('Error obteniendo el nombre de la ubicación:', error);
                return 'Ubicación desconocida';
            }
        };

        const updateSearchField = (locationName) => {
            if (searchInputElement) {
                searchInputElement.value = locationName;
            }
        };

        const handleMapClick = async (e) => {
            const { lat, lng } = e.latlng;
            const locationName = await fetchLocationName(lat, lng);
            addMarker(lat, lng, `<strong>Ubicación seleccionada</strong><br>${locationName}<br>Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
            updateSearchField(locationName);
        };

        const handleGeoSearchLocation = (result) => {
            if (result && result.location) {
                const { x, y } = result.location;
                addMarker(y, x, 'Resultado de búsqueda');
            }
        };

        const handleGeolocation = () => {
            if (!navigator.geolocation) {
                alert('La geolocalización no es soportada por tu navegador.');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationName = await fetchLocationName(latitude, longitude);
                    addMarker(latitude, longitude, `<strong>Tu ubicación actual</strong><br>${locationName}`);
                    updateSearchField(locationName);
                },
                () => {
                    alert('No se pudo obtener tu ubicación.');
                }
            );
        };

        const fetchAndDisplayCategoryMarkers = async (category) => {
            clearMarkers();

            if (category) {
                const bounds = map.getBounds();
                const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;

                try {
                    const response = await fetch(
                        `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=${category}](${bbox});out;`
                    );
                    const data = await response.json();

                    data.elements.forEach((element) => {
                        if (element.lat && element.lon) {
                            L.marker([element.lat, element.lon], {
                                icon: new L.Icon({
                                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                }),
                            })
                                .addTo(map)
                                .bindPopup(
                                    `<strong>${element.tags.name || 'Sin nombre'}</strong><br>Tipo: ${category}`
                                );
                        }
                    });
                } catch (error) {
                    console.error('Error cargando datos de Overpass API:', error);
                }
            }
        };

        map.on('click', handleMapClick);
        map.on('geosearch/showlocation', handleGeoSearchLocation);

        // Botón de geolocalización
        const locateButton = L.control({ position: 'topleft' });
        locateButton.onAdd = () => {
            const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
            button.innerHTML = '📍';
            button.title = 'Centrar en mi ubicación';
            button.style.width = '34px';
            button.style.height = '34px';
            button.style.cursor = 'pointer';
            button.onclick = handleGeolocation;
            return button;
        };
        locateButton.addTo(map);

        // Filtro de categorías
        const filterContainer = L.control({ position: 'topright' });
        filterContainer.onAdd = () => {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            container.style.padding = '10px';
            container.style.backgroundColor = 'white';
            container.style.boxShadow = '0 1px 4px rgba(0,0,0,0.65)';

            container.innerHTML = `
                <label><strong>Filtros</strong></label><br>
                <select id="categoryFilter" style="width: 100%; margin-top: 5px;">
                    <option value="">Todas las categorías</option>
                    <option value="restaurant">Restaurante</option>
                    <option value="cafe">Cafés</option>
                </select>
            `;

            const select = container.querySelector('#categoryFilter');
            select.onchange = () => {
                const category = select.value;
                fetchAndDisplayCategoryMarkers(category);
            };

            return container;
        };
        filterContainer.addTo(map);

        return () => {
            map.removeControl(searchControl);
            map.removeControl(locateButton);
            map.removeControl(filterContainer);
            map.off('click', handleMapClick);
            map.off('geosearch/showlocation', handleGeoSearchLocation);
        };
    }, [map]);

    return null;
};

export default GeoControl;

