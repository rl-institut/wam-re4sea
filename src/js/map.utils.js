import { chart } from "./stats-chart";
import { utils, writeFile } from 'xlsx'

//data
import { adaptationMeasureList } from '../data/adaptation-measure';
import { listAdaptationMeasures, costAdaptationMeasures } from '../data/download-data';


//elements

import { islandInformationTablecontainer, adaptationMeasureUl, lengendContainer, seeMoreBtn } from './elements'


export {
    generateTable,
    updateAccordion,
    updateChart,
    updateAdaptatationMeasure,
    adaptationMeasureClick,
    populateModal,
    validateLatLngInput,
    addLayerToMap,
    changeAccordionButtonStateBasedOnPointClicked,
    mapLegendClick,
    downloadButtonClick,
    extractPopupContentProperties,
    generatePopupContent,
    toggleSideBar,
    temperatureFillColor,
    floodFillColor,
    cycloneFillColor,
    seaLevelFillColor,
    riskClusterFillColor
}

const extractPopupContentProperties = (properties) => {
    const newObj  = {};
    for (let [key, value] of Object.entries(properties)) {
        console.log(key, value)
        if(!(key.toLowerCase().includes('likert') || key.toLowerCase().includes('mean') || key.toLowerCase().includes('latitude') || key.toLowerCase().includes('longitude'))){
            newObj[key] = value;
        }
    }

    return newObj;
}

const toggleSideBar = (e) => {
    e.target.closest('Aside').classList.toggle('data-section--hidden')
    e.target.closest('Aside').classList.toggle('data-section--shown')
}



const generateTable = (properties, classes) => {
    let tableClasses = 'table table-hover text-capitalize mb-1 '
    const keyValueArr = Object.entries(properties);

    if (Array.isArray(classes)) {
        tableClasses += classes.join(' ');
    }

    let htmlString = `<table  id= 'popupTableId' class="${tableClasses}"><tbody>`;
    for (let [key, value] of keyValueArr) {
        key = formatKeys(key);
        htmlString += `<tr><td>${key}</td><td>${value}</td></tr>`;
    }
    htmlString += '</tbody></table>';
    return htmlString;
}


const generatePopupContent = (properites)  => {
    const parentNode = document.createElement('DIV');
    parentNode.classList.add(['d-flex', 'justify-content-center']);
    const table = generateTable(properites);
    // const actionSectionHtml = `<div><button id='seeMoreBtn' class='btn btn-sm'  ><span>See more</span><i class="bi bi-arrow-right"></i></button</div>`;

    parentNode.innerHTML = table;
    return parentNode;
}

const validateLatLngInput = input => {
    const arr = input.split(',');
    if (arr.length < 2) {
        return false;
    }
    return arr.every(value => {
        const parsedValue = parseFloat(value)
        return typeof parsedValue === 'number' && !isNaN(parsedValue)
    });
}

const formatKeys = (key) => key.split('_').join(' ');

const getIslandRisks = (properties) => {
    return ({
        flood: properties.Likert_S_1,
        cyclone: properties.Likert_S_2,
        seaLevel: properties.Likert_S_3,
        temperature: properties.Likert_Sca
    })
}
const updateAccordion = (properties) => {

    const tableData = {
        country: properties.Country,
        risk_custer: properties.Risk_Clust

    }
    const islandSpecificRisks = []
    const risks = getIslandRisks(properties);

    const highestRiskMeasure = Math.max(risks.flood, risks.cyclone, risks.seaLevel, risks.temperature);

    for (let [risk, value] of Object.entries(risks)) {
        if (value == highestRiskMeasure) {
            islandSpecificRisks.push(risk);
        }
    }

    if (islandSpecificRisks.length > 1) {
        islandSpecificRisks.forEach((risk, index) => {
            tableData['island_specific_risk ' + (index + 1)] = risk;
        })
    } else {
        tableData['island_specific_risk'] = islandSpecificRisks[0]
    }
    islandInformationTablecontainer.innerHTML = generateTable(tableData, ['table-borderless', 'table-light']);
}


const updateChart = (properites) => {
    const islandRisks = getIslandRisks(properites);
    const meanRiskValues = {
        meanFlood: properites.Mean_Flood,
        meanTemperature: properites.Mean_Temp,
        meanCyclone: properites.Mean_Cyclo,
        meanSealevel: properites.Mean_Sea_L
    }

    const values = [islandRisks.temperature, islandRisks.cyclone, islandRisks.seaLevel, islandRisks.flood]
    const means = [meanRiskValues.meanTemperature, meanRiskValues.meanCyclone, meanRiskValues.meanSealevel, meanRiskValues.meanTemperature]


    chart.data.datasets.forEach(dataset => {
        if (dataset.label == 'Value') {
            dataset.data = values
        } else {
            dataset.data = means
        }
    });
    chart.update();


}

const updateAdaptatationMeasure = (data) => {
    let html = '';
    for (let [key, { storms, sea_level, precipitation }] of Object.entries(data)) {
        //Exclude further adaption to style it different
        if (key !== 'further_adaptation_measures') {
            html += `<li data-risk-name="${key}" class="list-group-item list-group-item-action">
        <h6 class="lead text-capitalize">${formatKeys(key)}</h6>
        <p class="d-flex p-0 m-0 justify-content-between"><span>STORMS</span><span>${storms}</span></p>
        <p class="d-flex p-0 m-0 justify-content-between"><span>SEA-LEVEL</span><span>${sea_level}</span></p>
        <p class="d-flex p-0 m-0 justify-content-between"><span>PRECIPITATION</span><span>${precipitation}</span></p>
      </li>`
        } else {
            html += `<li  data-risk-name="${key}" class="list-group-item list-group-item-action">
            <p class="text-capitalize">View ${formatKeys(key)}</h6>
            </p>`
        }
    }
    adaptationMeasureUl.innerHTML = html;
}

const adaptationMeasureClick = event => {
    const target = event.target.closest('LI');
    const clickedMeasure = target.dataset.riskName;
    console.log(clickedMeasure);
    let adapatationMeasures = null;

    let html = '';

    if (clickedMeasure === 'further_adaptation_measures') {

        adapatationMeasures = [adaptationMeasureList['other'], adaptationMeasureList['system']]
        html = `<tr>
        <td class='rowspan-td' rowspan=${adapatationMeasures[0].length + 1}>Other</td>
        <td >${adapatationMeasures[0][0][0]}</td>
        <td>${adapatationMeasures[0][0][1]}</td>
        </tr>`
        for (let [risk, precaution] of adapatationMeasures[0]) {
            html += `<tr>
            <td>${risk}</td>
            <td>${precaution}</td>
        </tr>`
        }

        html += `<tr>
        <td class='rowspan-td' rowspan=${adapatationMeasures[1].length + 1}>System</td>
        <td >${adapatationMeasures[0][0][0]}</td>
        <td>${adapatationMeasures[0][0][1]}</td>
        </tr>`

        for (let [risk, precaution] of adapatationMeasures[1]) {
            html += `<tr>
            <td>${risk}</td>
            <td>${precaution}</td>
        </tr>`
        }

    } else {
        adapatationMeasures = adaptationMeasureList[clickedMeasure];
        html = `<tr>
        <td class='rowspan-td' rowspan="0">${formatKeys(clickedMeasure)}</td>
        <td >${adapatationMeasures[0][0]}</td>
        <td>${adapatationMeasures[0][1]}</td>
        </tr>`

        for (let [risk, precaution] of adapatationMeasures) {
            html += `<tr>
            <td>${risk}</td>
            <td>${precaution}</td>
        </tr>`
        }
    }


    state.adaptationModalContent = { body: html, header: formatKeys(clickedMeasure) };

    state.adaptationModal.show()
}

const populateModal = (event) => {
    // Update the modal's content.
    const modalTitle = adaptationModal.querySelector('.modal-title');
    const modalBodyInput = adaptationModal.querySelector('#adaptiveMeasureTable tbody');

    modalTitle.textContent = state.adaptationModalContent.header;
    modalBodyInput.innerHTML = state.adaptationModalContent.body;
}

const temperatureFillColor = [
    'match',
    ['get', 'Likert_Sca'],
    1, '#FFBABA',
    2, '#FF7B7B',
    3, '#FF5252',
    4, '#FF0000',
    5, '#A70000',
    'black'
]
const floodFillColor = [
    'match',
    ['get', 'Likert_S_1'],
    1, '#78C1FF',
    2, '#5099F4',
    3, '#468FEA',
    4, '#2871CC',
    5, '#003F9A',
    'black'
]
const cycloneFillColor = [
    'match',
    ['get', 'Likert_S_2'],
    1, '#64AD62',
    2, '#429B46',
    3, '#1A8828',
    4, '#0A6921',
    'black'
]
const seaLevelFillColor = [
    'match',
    ['get', 'Likert_S_3'],
    0, '#FEAE8A',
    1, '#FE9666',
    2, '#FE7D43',
    3, '#FE651F',
    4, '#F84E00',
    5, '#D54300',
    'black'
]

const riskClusterFillColor = [
    'match',
    ['get', 'Risk_Clust'],
    1, 'purple',
    2, 'turquoise',
    3, 'yellow',
    'black'
]


const mapLegendClick = e => {
    const button = e.target.closest('Button');

    // if the event is on another div or the island layer is not added yet

    if (!state.map.getLayer("island_layer") || !button) {
        return
    }
    const selectedListGroupItem = e.target.closest('.list-group-item');

    // remove child and reinsert at the top
    const parent  = selectedListGroupItem.parentNode;

    parent.removeChild(selectedListGroupItem);

    parent.insertAdjacentElement('afterbegin', selectedListGroupItem);



    const mapLayerFillColors = {
        'temperature': temperatureFillColor,
        'flood': floodFillColor,
        'cyclone': cycloneFillColor,
        'sea-level': seaLevelFillColor,
        'risk-cluster': riskClusterFillColor
    }

    const layerName = button && button.dataset.layer && button.dataset.layer;


    state.map.setPaintProperty('island_layer', 'fill-color', mapLayerFillColors[layerName])

    state.currentStyle = mapLayerFillColors[layerName];

    const allListGroupItems = lengendContainer.querySelectorAll('.list-group-item');

    if (selectedListGroupItem.classList.contains('selected')) {
        return
    }

    for (let i = 0; i < allListGroupItems.length; i++) {
        if (allListGroupItems[i].classList.contains('selected')) {
            allListGroupItems[i].classList.remove('selected')
            allListGroupItems[i].classList.add('unselected');
        }

        selectedListGroupItem.classList.remove('unselected');
        selectedListGroupItem.classList.add('selected');
    }
}

const addLayerToMap = e => {
    if (state.map.getLayer("island_layer")) {
        state.map.removeLayer("island_layer");
        return
    }

    const currentStyle = state.currentStyle || temperatureFillColor
    state.map.addLayer({
        'id': 'island_layer',
        'type': 'fill',
        'source': 'islands_layer_source',
        'source-layer': 'SEA_shape',
        'paint': {
            'fill-color': currentStyle
        }
    });
}


const changeAccordionButtonStateBasedOnPointClicked = () => {

    const buttons = document.getElementById('dataAccordion').querySelectorAll('button');
    buttons.forEach(el => {
        el.disabled = !state.pointClicked;
    })

    console.log(state.pointClicked)

}

const downloadButtonClick = (e) => {

    console.log(state);
    if (!state.pointClicked) {
        alert('select an island by clicking a point first');
        return;
    }

    const workbook = utils.book_new();

    const adaptationMeasuresWorksheet = utils.json_to_sheet(listAdaptationMeasures)
    const costMeasuresWorksheet = utils.json_to_sheet(costAdaptationMeasures)
    const islandWorksheet = utils.json_to_sheet([state.popupProperties])

    utils.book_append_sheet(workbook, adaptationMeasuresWorksheet, 'list adoptation');
    utils.book_append_sheet(workbook, costMeasuresWorksheet, 'cost adaptation');
    utils.book_append_sheet(workbook, islandWorksheet, 'island point');

    writeFile(workbook, 'myfile.xlsx')
}








