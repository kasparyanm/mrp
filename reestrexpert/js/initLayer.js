function initSourceLayer(){
	var image = new ol.style.Circle({
		radius: 5,
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 0, 0.5)'
		}),
		stroke: new ol.style.Stroke({color: 'red', width: 1})
	});
	var styles = {
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
  styleCache={};
	var styleFunction = function(feature) {
		if(feature.getGeometry().getType() == 'MultiPolygon')
			return styles[feature.getGeometry().getType()];
		else{
		var size = feature.get('features').length;
		  var style = styleCache[size];
		  if (!style) {
		  	if(size == 1){
		  		style = new ol.style.Style({
			      image: new ol.style.Circle({
			        radius: 10,
			        stroke: new ol.style.Stroke({
			          color: '#fff'
			        }),
			        fill: new ol.style.Fill({
			          color: '#CC99FF'
			        })
			      })
			    });	
		  	}else{
			    style = new ol.style.Style({
			      image: new ol.style.Circle({
			        radius: 10,
			        stroke: new ol.style.Stroke({
			          color: '#fff'
			        }),
			        fill: new ol.style.Fill({
			          color: '#3399CC'
			        })
			      }),
			      text: new ol.style.Text({
			        text: size.toString(),
			        fill: new ol.style.Fill({
			          color: '#fff'
			        })
			      })
			    });
			}
		    styleCache[size] = style;
		  }
		  return style;
		}
	};
	vectorSource = new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		loader: function(extent, resolution, projection) {
			var url = 'https://gs.gismart.ru/geoserver2/mainMap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mainMap:podvedorg&maxFeatures=500&' +
			          'outputFormat=application/json&srsname=EPSG:3857&' +
			          'bbox=' + extent.join(',')+',EPSG:3857';
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			var onError = function() {
				vectorSource.removeLoadedExtent(extent);
			}
			xhr.onerror = onError;
			xhr.onload = function() {
				if (xhr.status == 200) {
					vectorSource.addFeatures(vectorSource.getFormat().readFeatures(xhr.responseText));
				} else {
					onError();
				}
			}
			xhr.send();
		},
		strategy: ol.loadingstrategy.bbox
		
	});

	var clusterSource = new ol.source.Cluster({
		distance: 46,
		source: vectorSource
	});

	sourceLayer = new ol.layer.Vector({
		'title': 'организации оказывающие влияние',
		source: clusterSource,
		style : styleFunction
	})

	layerOSM = new ol.layer.Tile({
	    title: 'OSM',
	    type: 'base',
	    visible: true,
	    source: new ol.source.OSM()
	});
	RegionVector=new ol.source.Vector({
		format: new ol.format.GeoJSON(),
		projection : 'EPSG:3857',
		loader: function(extent, resolution, projection) {
			var url = 'Regions2.geojson';
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			var onError = function() {
				RegionVector.removeLoadedExtent(extent);
			}
			xhr.onerror = onError;
			xhr.onload = function() {
				if (xhr.status == 200) {
					RegionVector.addFeatures(RegionVector.getFormat().readFeatures(xhr.responseText));
				} else {
					onError();
				}
			}
			xhr.send();
		},
		strategy: ol.loadingstrategy.bbox
	})
	RegionsLayer = new ol.layer.Vector({
	    title: 'Регионы',
	    source: new ol.source.Vector({
	        format: new ol.format.GeoJSON(),
	        projection : 'EPSG:3857',
	        url: 'Regions2.geojson'
	    }),	
	    style: styleFunction
	})
}
