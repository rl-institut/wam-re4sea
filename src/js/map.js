import { 
    generateTable, 
    updateAccordion, 
    updateChart, 
    updateAdaptatationMeasure,
    changeAccordionButtonStateBasedOnPointClicked,
    extractPopupContentProperties,
    generatePopupContent,
    temperatureFillColor, 
    floodFillColor,
    cycloneFillColor,
    seaLevelFillColor,
    riskClusterFillColor

} from './map.utils';

import {costAdaptation} from '../data/adaptation-measure';
import {seeMoreBtn} from '../js/elements'


//const image = require('../assets/island.png');
import iconImage from '../assets/icon-image'

mapboxgl.accessToken = MAPBOXTOKEN;



const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 4,
    center: [114.2135466,0.868425517],
    renderWorldCopies: false,
    pitchWithRotate: false
});



// disabling map rotiation using right click and drags
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();


// adding map to state
state.map = map;

// Controls
map.addControl(new mapboxgl.NavigationControl({ visualizePitch: false, showCompass: false }));
map.addControl(new mapboxgl.ScaleControl({maxWidth: 80, unit: 'metric'}))

map.on('load', () => {

    // add image to the active style and make it SDF-enabled
    map.addImage('island-icon', iconImage);
    console.dir(map);

    map.addSource("islands_points_source", {
        type: "vector",
        tiles:[`https://tile-internal.rl-institut.de/data/island/{z}/{x}/{y}.pbf`],
  
    });

    map.addSource('islands_layer_source', {
        type: 'vector',
        tiles: ['https://tile-internal.rl-institut.de/data/seashapes/{z}/{x}/{y}.pbf']
    });



    map.addLayer({
        id: "island-points",
        type: "symbol",
        source: "islands_points_source",
        "source-layer": "Island_points",
        minzoom: 2,
        maxzoom: 20,
        layout: {
            'icon-image': 'island-icon',
            'icon-size': 0.5
        },
        paint: {
            'icon-color': 'blue'
        }
    });


    map.on('click', 'island-points', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['island-points']
        })

        map.flyTo({
            center: e.features[0].geometry.coordinates
        });

        const properties = features[0].properties;

        /* extract contents for popup */

        const neededProperties = extractPopupContentProperties(properties)

        /* create popup content */
        const popupContent = generatePopupContent(neededProperties);

        state.popupProperties = properties;

        const coordinates = e.features[0].geometry.coordinates.slice();

        state.pointClicked = true;

        /* update information tab on accordion */
        updateAccordion(properties);

        /* update chart */
        updateChart(properties);

        /* update adaptation measure */
        updateAdaptatationMeasure(costAdaptation);

        /* enable Accordion buttons */
        changeAccordionButtonStateBasedOnPointClicked();

        /*change the point clicked in state object */
        

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({anchor: 'center'})
            .setLngLat(coordinates)
            .setDOMContent(popupContent)
            .addTo(map);

        console.log(seeMoreBtn)
    })

    map.on('mouseenter', 'island-points', () => {
        map.getCanvas().style.cursor = 'pointer';
    })
    map.on('mouseleave', 'island-points', () => {
        map.getCanvas().style.cursor = '';
    })
});







