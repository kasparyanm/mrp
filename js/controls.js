function initControls(){
  controls = [
      new ol.control.Attribution(),
      new ol.control.MousePosition({
          undefinedHTML: 'outside',
          projection: 'EPSG:4326',
          coordinateFormat: function(coordinate) {
              return ol.coordinate.format(coordinate, '{x}, {y}', 4);
          }
      }),

      new ol.control.Rotate({
          autoHide: false
      }),
      new ol.control.ScaleLine(),
      new ol.control.Zoom(),
      new ol.control.FullScreen()
  ];  
};

function initStyles(){
  image = new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({
          color: 'rgba(255, 255, 0, 0.5)'
      }),
      stroke: new ol.style.Stroke({color: 'red', width: 1})
  });
  styles = {
      'Point': new ol.style.Style({
          image: image
      }),
      'LineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'green',
          width: 1
        })
      }),
      'MultiLineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'green',
          width: 1
        })
      }),
      'MultiPoint': new ol.style.Style({
        image: image
      }),
      'MultiPolygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgba(115, 81, 63, 1)',
          width: 1
        }),
        fill: new ol.style.Fill({
          color: 'rgba(115, 81, 63, 0.1)'
        })
      }),
      'Polygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3
        }),
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        })
      }),
      'GeometryCollection': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'magenta',
          width: 2
        }),
        fill: new ol.style.Fill({
          color: 'magenta'
        }),
        image: new ol.style.Circle({
          radius: 10,
          fill: null,
          stroke: new ol.style.Stroke({
            color: 'magenta'
          })
        })
      }),
      'Circle': new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'red',
          width: 2
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255,0,0,0.2)'
        })
      })
  };
  styleFunction = function(feature) {
    var item5 = feature.getProperties()['item5'];
    if(typeof item5 === 'undefined'){
        return styles[feature.getGeometry().getType()];
    }
    if(item5.length > 2){
        item5 = item5.substr(0,2);
        return new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
              //color: '#8959A8',
              crossOrigin: 'anonymous',
              src: 'icon/'+item5+'_color.png',
              scale : 0.5 
              //imgSize: [16,16]
            }))
          })
    }else{
        return new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
              //color: '#8959A8',
              crossOrigin: 'anonymous',
              src: 'icon/xx_color.png',
              scale : 0.5 
              //imgSize: [16,16]
            }))
          })
    }
    return styles[feature.getGeometry().getType()];
  };
};