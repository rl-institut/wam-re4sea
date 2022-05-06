import {statsChart} from './elements'
import Chart from 'chart.js/auto';



const ctx = statsChart;

const labels = ['Temperature', 'Cyclone', 'Sea Level', 'Flood'];
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Value',
            data: [],
            borderColor: 'rgb(0, 150, 255)',
            backgroundColor: 'rgba(0, 150, 255, 0.5)',
        },
        {
            label: 'Mean',
            data: [],
            borderColor: 'rgb(0, 163, 108)',
            backgroundColor: 'rgba(0, 163, 108, 0.5)',
        }
    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Island Risk vs Mean Risk'
            }
        }
    },
};



export const chart = new Chart(ctx,config);