# Re4SEA

The „Re4SEA“ webmap aims to visualise existing climate change risks on Southeast Asian islands and gives an overview of expected extra investment cost for energy system components to mitigate these risks. Sea-level rise, temperature increase, flooding and cyclones are considered to have substantial impacts on current and future energy infrastructure. In order to assess the islands specific situation, these risks are scaled and shown on the webmap. To detect risk patterns in the Southeast Asian region, the islands are clustered according to their site-specific risk profile. These risk cluster are also visualized on the webmap. By clicking on islands, further information is given on projected extra investment cost for different energy system components to mitigate island-specific risks. 

## Get started

In  `build/webpack.config.dev.js` change YOURMAPBOXTOKEN to your own Mapbox Token.\
On your first run you need to build the image first.

    docker-compose build && docker-compose up

After that you only need to start with

    docker-compose up

The Server will listen on port `8081`