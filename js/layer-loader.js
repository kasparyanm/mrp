function LoadLayers() {
  map.setLayerGroup(layerGroupAll);
  layerPodvedor.setVisible(false);
  layerProm.setVisible(false);
  layerInvest.setVisible(false);
  layerOrgkaz.setVisible(false);
  layerReestrakkrorg.setVisible(false);
  layerReestrexpert.setVisible(false);
  layerReestrorg.setVisible(false);
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
    } else if (layerName == 'Reestrakkrorg') {
          layerReestrakkrorg.setVisible(!layerReestrakkrorg.getVisible());
    } else if (layerName == 'Reestrexpert') {
          layerReestrexpert.setVisible(!layerReestrexpert.getVisible());
    } else if (layerName == 'Reestrorg') {
          layerReestrorg.setVisible(!layerReestrorg.getVisible());
    }
}