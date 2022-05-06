export const costAdaptation = {
    wind_power_generation: {
        storms: 14 + "% of initial cost",
        sea_level: 4.38 + "% of initial cost",
        precipitation: 7.78 + "% of initial cost"
    },
    hydro_power_generation: {
        storms: 12.72 + "% of initial cost",
        sea_level: 4.58 + "% of initial cost",
        precipitation: 17.72 + "% of initial cost"
    },
    solar_power_generation: {
        storms: 9.64 + "% of initial cost",
        sea_level: 9.23 + "% of initial cost",
        precipitation: 11 + "% of initial cost"
    },
    inverter: {
        storms: 7.69 + "% of initial cost",
        sea_level: 6 + "% of initial cost",
        precipitation: 3.08 + "% of initial cost"
    },
    diesel_generator: {
        storms: 8.85 + "% of initial cost",
        sea_level: 4 + "% of initial cost",
        precipitation: 4.09 + "% of initial cost"
    },
    battery_storage: {
        storms: 8.85 + "% of initial cost",
        sea_level: 2.27 + "% of initial cost",
        precipitation: 5.71 + "% of initial cost"
    },
    power_house: {
        storms: 12 + "% of initial cost",
        sea_level: 7.5 + "% of initial cost",
        precipitation: 8.67 + "% of initial cost"
    },
    grid: {
        storms: 21.67 + "% of initial cost",
        sea_level: 6 + "% of initial cost", 
        precipitation: 11.25 + "% of initial cost"
    },
    further_adaptation_measures: {
        
    }
}

export const adaptationMeasureList = {
    wind_power_generation: [
        ['storms', 'increase structural strength (mast, blades and turbine)'],
        ['storms', 'select component: compatibility with high wind speeds (mast, blades and turbines)'],
        ['storms', 'mechanism to turn turbine out of wind direction'],
        ['storms', 'backup-diesel generator to move blades out of wind direction'],
        ['temperature', 'select component: compatibility with high temperatures']
    ],
    hydro_power_generation: [
        ['precipitation', 'increase structural strength (civil construction)'],
        ['precipitation', 'include adittional protective elements for construction'],
        ['precipitation', 'watershed management and land use management'],
        ['precipitation', 'develop and improve hydrological forecasteing'],
        ['precipitation', 'adjust design standards (100 year flood in becoming a 20 year flood)'],
        ['precipitation', 'upstream water reservoirs to manage water flows'],
        ['precipittion', 'improve hydrological forecasting'],
        ['temperature', 'select component: compatibility with high temperatures']
    ],
    solar_power_generation: [
        ['storms', 'increase structual strength of mounting structure'],
        ['storms', 'implement structural protections'],
        ['storms', 'implementation of tracking system (moving panels)'],
        ['storms', 'adjust angle of installation (flatter angle)'],
        ['storms', 'select components: stronger clamps or clamps that facilitate easy de-installation'],
        ['precipitation', 'raise panels above the ground'],
        ['precipitation','build dam surrounding plant'],
        ['precipitation', 'install pumps to evacuate water'],
        ['precipitation', 'install pumps to evacuate water'],
        ['sea-level', 'select component: corrosion resistant mounting structure and connections'],
        ['sea-level', 'appropiate site-selection'],
        ['temperature', 'select component: low temperature co-efficient'],
        ['temperature', 'implementing cooling mechnisms'],
        ['temperature', 'combining solar power generation and farming'],
        ['all', 'better solar radiation predictions ']
    ],
    inverter: [
        ['storms', 'move component into power house'],
        ['storms', 'improve lightning strike protection'],
        ['storms', 'ugrade inverter arragement'],
        ['precipiation', 'move component to power house'],
        ['temperature', 'install cooling mechnism in power house'], 
        ['temperature', 'select component: compatibility with high temperatures'],
        ['all', 'select components: string inverters instead of central inverters'],
        ['all', 'select components: self-directed inverters instead of grid-directed inverters']
    ],
    diesel_generator: [
        ['precipitation', 'move component into power house' ],
        ['storms', 'move component into power house'],
        ['all', 'accessible location for maintenance']
    ],
    battery_storage: [
        ['precipitation', 'move component into power house'],
        ['storms', 'move component into power house'],
        ['temperature', 'install cooling mechnism in power house'],
        ['temperature', 'select component: compatibility with high temperatures'],
        ['all', 'implement alternative energy storage solutions']
    ],
    power_house: [
        ['storms', 'increase structural strength'],
        ['temperature', 'implementing cooling mechnisms'],
        ['precipition', 'raise power house above the ground'],
        ['sea-level', 'appropiate site-selection'],
        ['all', 'careful selection of material: metal>wood>concrete']
    ],
    system: [
        ['precipitation', 'installation of pumps to evacuate water'],
        ['precipation', 'protective walls and dams, channels and barriers'],
        ['sea-level', 'select components: salt corrosion resistant'],
        ['all', 'demand side management'],
        ['all', 'simplicity of the system'],
        ['all', 'well-trained local operators'],
        ['all', 'consider increased transportation cost'],
        ['all', 'decentral/modular system setup'],
        ['all', 'integration of emergency points and satellite phones'],
        ['all', 'spare part management and inventory'],
        ['all', 'emergency protocol (priorization of energy services)'],
        ['all', 'appropiate site-selection (accessability for maintenance)'],
        ['all', 'high ingress protection (IP) ratings of components']
    ],
    grid: [
        ['storms', 'increase structural strength (poles)'],
        ['storms', 'select component: stronger cable connection'],
        ['storms', 'select components: stronger insulators and connectors'],
        ['storms', 'underground cabling'],
        ['sea-level', 'select component: waterproof and corrosion resistant cables'],
        ['temperature', 'adjusted sizing of cables']
    ],
    other: [
        ['storms', 'regular clearing of the site (cutting trees etc), also prevents impacts of fires'],
        ['precipitation', 'climate change resilient planning of public infrastructure (wrongly designed road contribute to flooding)'],
        ['all', 'blackout resilient appliances'],
        ['all', 'guidelines for better planning and operation'],
        ['all', 'financial instrument for compensation of losses and damages'],
        ['all', 'nature-based and eco-system oriented solutions'],
        ['all', 'community ownership'],
    ]
}