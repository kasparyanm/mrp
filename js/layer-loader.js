function setMapType(layerGroup) {
    if ( layerGroup == 'All'){
        map.setLayerGroup(layerGroupAll);
    } else if(layerGroup == 'Podvedor') {
        map.setLayerGroup(layerGroupPodvedor);
    } else if (layerGroup == 'Prom') {
        map.setLayerGroup(layerGroupProm);
    } else if (layerGroup == 'Orgkaz') {
        map.setLayerGroup(layerGroupOrgkaz);
    } else if (layerGroup == 'Invest') {
        map.setLayerGroup(layerGroupInvest);
    }
}

function toggleLayerVisibility(layerName) {
    if(layerName == 'Podvedor') {
          layerPodvedor.setVisible(!layerPodvedor.getVisible());
    } else if (layerName == 'Prom') {
          layerProm.setVisible(!layerProm.getVisible());
    } else if (layerName == 'Orgkaz') {
          layerOrgkaz.setVisible(!layerOrgkaz.getVisible());
    } else if (layerName == 'Invest') {
          layerInvest.setVisible(!layerInvest.getVisible());
    }
}