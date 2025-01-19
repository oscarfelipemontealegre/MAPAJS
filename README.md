# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## porque escogi leaflet


•  Leaflet.js es completamente gratuito y no requiere una clave API para visualizar mapas básicos, a diferencia de Google Maps, que aplica cargos después de alcanzar un límite de uso gratuito.
•  Su modelo de código abierto fomenta contribuciones de la comunidad, ofreciendo complementos y mejoras constantes.
•  Proporciona alto grado de personalización, permitiendo configurar capas, controles y marcadores según las necesidades del usuario.
•  Es compatible con diversos proveedores de mapas, como OpenStreetMap, Mapbox y otros, lo que ofrece flexibilidad en las fuentes de datos.
•  Leaflet tiene un peso reducido (~40 KB), siendo ideal para aplicaciones que priorizan tiempos de carga rápidos, especialmente en dispositivos con recursos limitados.
•  Integra eficientemente con frameworks modernos como React, a través de bibliotecas como react-leaflet.
•  Permite trabajar con múltiples fuentes de mapas (baldosas), mientras que Google Maps está restringido a su propio ecosistema.
•  Leaflet incluye sus propios paquetes CSS necesarios, eliminando la necesidad de usar librerías adicionales para el diseño básico


# Componente GeoControl

Este componente de 'GeoControl' integra funciones cartográficas avanzadas en un mapa de Leaflet. Incluye funcionalidades como la geolocalización, una barra de búsqueda y marcadores de agrupación para una mejor visualización del mapa. A continuación se muestra la documentación detallada:

## Instalación

Para usar este componente, asegúrese de que las siguientes dependencias estén instaladas en su proyecto:

'''Golpe
npm install leaflet leaflet-geosearch leaflet.markercluster
```

Además, importe los estilos necesarios en su CSS o JS:

'''javascript
importar 'folleto/dist/leaflet.css';
importar 'folleto-geobúsqueda/dist/geosearch.css';
importar 'leaflet.markercluster/dist/MarkerCluster.css';
importar 'leaflet.markercluster/dist/MarkerCluster.Default.css';
```

## Uso

### Importar el componente

'''javascript
importar GeoControl desde './GeoControl';
```

### Renderizando el componente

Pase un objeto 'map' al componente 'GeoControl':

'''javascript
import { useEffect, useRef } de 'react';
importar L de 'folleto';
importar GeoControl desde './GeoControl';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map('mapa').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      Atribución: '&copy; colaboradores de OpenStreetMap»,
    }).addTo(mapRef.current);
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '500px' }}></div>
      {mapRef.current && <GeoControl map={mapRef.current} />}
    </div>
  );
};

exportar el MapComponent predeterminado;
```

## Características

### 1. **Control de búsqueda**
- Permite a los usuarios buscar una ubicación utilizando el proveedor de OpenStreetMap.
- Muestra la ubicación seleccionada en el mapa.
- Actualiza automáticamente el campo de entrada de búsqueda con el nombre de la ubicación.

### 2. **Agrupación de marcadores**
- Agrupa los marcadores para mejorar la legibilidad del mapa.
- Borra y agrega marcadores de forma dinámica en función de las interacciones o los filtros del usuario.

### 3. **Geolocalización**
- Centra el mapa en la ubicación actual del usuario.
- Añade un marcador para indicar la geolocalización.

### 4. **Marcador de clic para agregar**
- Agrega un marcador al mapa cuando el usuario hace clic en él.
- Muestra una ventana emergente con el nombre de la ubicación y las coordenadas.

### 5. **Filtrado de categorías**
- Permite filtrar puntos de interés por categorías (por ejemplo, restaurantes, cafeterías).
- Recupera datos dinámicamente de la API de Overpass en función de los límites del mapa.

## Utilería

| Nombre de la utilería | Tipo | Descripción |
|-----------|---------|-----------------------------------------------|
| 'mapa' | 'Objeto'| La instancia de mapa de Leaflet. Obligatorio.           |

## Funciones

### 'clearMarkers()'
Borra todos los marcadores del mapa.

### 'addMarker(lat, lng, popupContent)'
Agrega un marcador en la latitud y longitud especificadas con una ventana emergente.

### 'fetchLocationName(lat, lng)'
Recupera el nombre de la ubicación de las coordenadas dadas mediante la API de Nominatim.

### 'updateSearchField(locationName)'
Actualiza el campo de entrada de búsqueda con el nombre de ubicación proporcionado.

### 'fetchAndDisplayCategoryMarkers(categoría)'
Recupera y muestra marcadores para la categoría seleccionada mediante la API de Overpass.

## Controles

### Botón de geolocalización
- Situado en la parte superior izquierda del mapa.
- Muestra la ubicación actual del usuario al hacer clic.

### Menú desplegable de filtros
- Situado en la parte superior derecha del mapa.
- Permite a los usuarios filtrar puntos de interés por categoría.

## Limpieza
El componente garantiza que todos los detectores de eventos y controles se eliminen correctamente cuando se desmontan.

## javascript
return () => {
  map.removeControl(searchControl);
  map.removeControl(localizarButton);
  map.removeControl(filterContainer);
  map.off('clic', handleMapClick);
  map.off('geosearch/showlocation', handleGeoSearchLocation);
};


## Notas
- El componente se ajusta dinámicamente al ciclo de vida del mapa.
- Utiliza la agrupación en clústeres para optimizar el rendimiento con grandes conjuntos de datos.

## Estilo
Los estilos personalizados se pueden aplicar a los botones y filtros desplegables anulando los estilos predeterminados de Leaflet o utilizando clases CSS personalizadas.

css
.leaflet-control-custom 
  color de fondo: blanco;
  borde: 1px #ccc sólido;
radio del borde: 4px;


## Limitaciones

- El componente depende de Overpass API para los datos de categorías, lo que puede ser limitado por la disponibilidad o el tiempo de respuesta de la API.
- La búsqueda y los marcadores están limitados al área visible del mapa.


# Proyecto MapComponent: Mapa Interactivo con Funciones de Control y Búsqueda

Este proyecto implementa un mapa interactivo utilizando React y Leaflet, con funcionalidades que incluyen la búsqueda de ubicaciones, la visualización de información dinámica sobre el lugar seleccionado, y un control personalizado para mejorar la experiencia de usuario.

## Características

- Mapa Interactivo: Visualiza un mapa interactivo utilizando OpenStreetMap como base.
- Información Dinámica: Muestra información actualizada sobre la ubicación seleccionada en una barra superior.
- Búsqueda y Marcadores: Permite buscar y marcar ubicaciones en el mapa.
- Control de Zoom Personalizado: Ubica el control de zoom en una posición específica del mapa.
- Componente GeoControl: Ofrece funcionalidades adicionales como la búsqueda de ubicaciones y la geolocalización del usuario.



## Importaciones
1.	React: Para crear componentes.
2.	React-Leaflet: Bibliotecas principales para trabajar con mapas en React.
o	MapContainer: Contenedor que inicializa el mapa.
o	TileLayer: Capa de imágenes que representa el mapa base.
o	useMap: Hook para acceder al objeto del mapa dentro de un componente React.
3.	GeoControl: Componente personalizado (importado) que añade controles de búsqueda al mapa.
4.	Estilos de Leaflet: Se incluye el CSS necesario para que el mapa y sus controles se vean correctamente.
________________________________________
## 2. Componente MapWithControl
Es el componente principal que configura el mapa con controles de búsqueda.
2.1 Subcomponente MapComponent
•	Propósito: Integra el control de búsqueda en el mapa.
•	useMap():
o	Hook que obtiene una referencia al objeto del mapa creado por MapContainer.
o	Se pasa este objeto como prop al componente GeoControl, que lo utiliza para agregar controles de búsqueda.
2.2 Estructura del mapa
El mapa se crea dentro del componente MapContainer, que incluye:
1.	center:
o	Coordenadas iniciales del centro del mapa.
o	Aquí se define [2.444814, -76.614739] como las coordenadas de Popayán, Colombia.
2.	zoom:
o	Nivel inicial de acercamiento del mapa.
o	Valor 13 proporciona una vista moderadamente detallada.
3.	style:
o	Define el tamaño del mapa en pantalla: 500px de alto y ocupa el ancho completo.
2.3 Capas del mapa
•	TileLayer:
o	Proporciona el fondo visual del mapa usando imágenes de OpenStreetMap.
o	attribution: Créditos para OpenStreetMap.
o	url: URL de la capa base con {z}/{x}/{y} como patrones para las coordenadas del mosaico.
2.4 Componente de control de búsqueda
•	<MapComponent />:
o	Llama al subcomponente que agrega el control de búsqueda.
o	Usa el objeto del mapa (useMap) para pasarlo al componente GeoControl.
________________________________________
## 3. Componente GeoControl
Este componente, que se importa desde ./geoControl, es responsable de:
1.	Agregar un control de búsqueda estándar (Leaflet Geocoder).
2.	Integrar una funcionalidad de búsqueda avanzada (GeoSearch) para buscar ubicaciones en el mapa.
3.	Mostrar marcadores y centrar el mapa en los resultados seleccionados.
________________________________________
## Flujo del código
1.	Renderización inicial:
o	MapContainer crea un mapa centrado en Popayán con una capa de OpenStreetMap.
2.	Adición de controles:
o	MapComponent usa el objeto del mapa (useMap) y lo pasa a GeoControl.
o	GeoControl agrega los controles de búsqueda y configura su comportamiento.
3.	Interacción del usuario:
o	El usuario puede buscar ubicaciones mediante el control.
o	El mapa se actualiza con un marcador en el resultado seleccionado y se centra automáticamente.



