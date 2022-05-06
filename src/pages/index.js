// vendors
import './home-page.css';
import { Modal } from 'bootstrap';


// custom js files
import '../js/map.utils';
import '../js/map';
import '../js/stats-chart';

//imports
import { adaptationMeasureClick, populateModal, mapLegendClick, validateLatLngInput, addLayerToMap, changeAccordionButtonStateBasedOnPointClicked, downloadButtonClick, toggleSideBar } from '../js/map.utils';

//elements
import {legendCardBody, adaptationModal, searchInput, gotoLatLongButton, layersVisualizationCheckbox, downloadButton, toggleInformationSideBarButton} from '../js/elements';




//initializing UI
state.adaptationModal = new Modal(adaptationModal);
changeAccordionButtonStateBasedOnPointClicked(true);




//Events
adaptationMeasureUl.addEventListener('click', adaptationMeasureClick);

//Event to modal
adaptationModal.addEventListener('show.bs.modal', populateModal);

legendCardBody.addEventListener('click', mapLegendClick)

// Event goto button
gotoLatLongButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    if (validateLatLngInput(value)) {
        const inputArr = value.split(',');
        const [long, lat] = inputArr.map(v => parseFloat(v));

        if (Math.abs(long) <= 180 && Math.abs(lat) <= 90) {
            // navigate to map
            state.map.flyTo({ center: [long, lat], zoom: 9 });
        } else {
            alert('check values of your coordinates')
        }

    };

})

layersVisualizationCheckbox.addEventListener('click', addLayerToMap);

downloadButton.addEventListener('click', downloadButtonClick)

toggleInformationSideBarButton.addEventListener('click', toggleSideBar)







