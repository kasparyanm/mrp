function initLayers(){
	layerPodvedor = new ol.layer.Vector({
	    'title': 'Подведомственные организации',
	    source: new ol.source.Vector({
		    format: new ol.format.GeoJSON(),
		    url: function(extent) {
		          return 'https://gs.gismart.ru/geoserver2/mainMap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mainMap:podvedorg&maxFeatures=500&' +
		          'outputFormat=application/json&srsname=EPSG:3857&' +
		          'bbox=' + extent.join(',')+',EPSG:3857';
		    },
		    strategy: ol.loadingstrategy.bbox
		}),
	    style: styleFunction
	});
	var promSource= new ol.source.Vector({
		    format: new ol.format.GeoJSON(),
		    loader: function(extent, resolution, projection) {
			    var url = 'https://gs.gismart.ru/geoserver2/mainMap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mainMap:product&maxFeatures=500&' +
		          'outputFormat=application/json&srsname=EPSG:3857&' +
		          'bbox=' + extent.join(',')+',EPSG:3857';
			    var xhr = new XMLHttpRequest();
			    xhr.open('GET', url);
			    var onError = function() {
			    	promSource.removeLoadedExtent(extent);
			    }
			    xhr.onerror = onError;
			    xhr.onload = function() {
			    	if (xhr.status == 200) {
			    		promSource.clear();
			    		promSource.addFeatures(promSource.getFormat().readFeatures(xhr.responseText));
			    	} else {
			    		onError();
			   		}
				}
				xhr.send();
			},
		    
		    strategy: ol.loadingstrategy.bbox
		});
	layerProm = new ol.layer.Vector({
	    'title': 'Промышленность',
	    source: promSource,
	    style: styleFunction
	});
	
	layerOrgkaz = new ol.layer.Vector({
	    'title': 'организации оказывающие влияние',
	    source: new ol.source.Vector({
		    format: new ol.format.GeoJSON(),
		    url: function(extent) {
		      return 'https://gs.gismart.ru/geoserver2/mainMap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mainMap:orgokaz&maxFeatures=500&' +
		          'outputFormat=application/json&srsname=EPSG:3857&' +
		          'bbox=' + extent.join(',')+',EPSG:3857';
		    },
		    strategy: ol.loadingstrategy.bbox
		}),
	    style: styleFunction
	});

	/*layerInvest = new ol.layer.Vector({
	    'title': 'Инвестиционные проекты',
	    source: new ol.source.Vector({
		    format: new ol.format.GeoJSON(),
		    url: function(extent) {
		      return 'https://gs.gismart.ru/geoserver2/mainMap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mainMap:invest&maxFeatures=500&' +
		          'outputFormat=application/json&srsname=EPSG:3857&' +
		          'bbox=' + extent.join(',')+',EPSG:3857';
		    },
		    strategy: ol.loadingstrategy.bbox
		}),
	    style: styleFunction
	});*/

	layerOSM = new ol.layer.Tile({
	    title: 'OSM',
	    type: 'base',
	    visible: true,
	    source: new ol.source.OSM()
	});

	drawingSource = new ol.source.Vector({
	    useSpatialIndex : false
	});

	drawingLayer = new ol.layer.Vector({
	    'title': 'Зона поиска',
	    source: drawingSource
	});

	RegionsLayer = new ol.layer.Vector({
	    title: 'Регионы',
	    source: new ol.source.Vector({
	        format: new ol.format.GeoJSON(),
	        projection : 'EPSG:3857',
	        url: 'Regions2.geojson'
	    }),
	    style: styleFunction
	})
	var vectorForInvestClust = new ol.source.Vector({
		    format: new ol.format.GeoJSON(),
		    loader: function(extent, resolution, projection) {
			    var url = 'https://gs.gismart.ru/geoserver2/mainMap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=mainMap:invest&maxFeatures=500&' +
		          'outputFormat=application/json&srsname=EPSG:3857&' +
		          'bbox=' + extent.join(',')+',EPSG:3857'
			    var xhr = new XMLHttpRequest();
			    xhr.open('GET', url);
			    var onError = function() {
			    	vectorForInvestClust.removeLoadedExtent(extent);
			    }
			    xhr.onerror = onError;
			    xhr.onload = function() {
			    	if (xhr.status == 200) {
			    		vectorForInvestClust.clear();
			    		vectorForInvestClust.addFeatures(vectorForInvestClust.getFormat().readFeatures(xhr.responseText));
			    	} else {
			    		onError();
			   		}
				}
				xhr.send();
			},
		    strategy: ol.loadingstrategy.bbox
		});
	var investClusterSource = new ol.source.Cluster({
		distance: 46,
		source: vectorForInvestClust
	});

	var styleCache = {};
	layerInvest = new ol.layer.Vector({
		source: investClusterSource,
		style: function(feature) {
		  var size = feature.get('features').length;
		  var style = styleCache[size];
		  if (!style) {
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
		    styleCache[size] = style;
		  }
		  return style;
		}
	});



	layerGroupAll = new ol.layer.Group({
	    layers: [
	        layerOSM,
	        drawingLayer,
	        RegionsLayer,
	        layerPodvedor,
	        layerProm,
	        layerInvest,
	        layerOrgkaz
	    ]
	});
};