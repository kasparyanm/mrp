function getStatistica(feature){
	var res={};
	var unemp = feature.get("unemp").split(' ');
	var ls=[];
	ls.push("Безработица");
	for(var i = 0; i < unemp.length; ++i){
		ls.push(parseFloat(unemp[i]))
	}
	res['unemp']=ls;
	res['name']=feature.get("NAME")
	res['population'] = feature.get("population");
	res['avsel'] = feature.get("avsel");
	res['prom'] = statisticaProm(feature);
	res['invest'] = statisticaInvest(feature);
	res['akkrorg']=statisticaAkkrOrg(feature);
	res['orgokaz']=statisticaOrgOkaz(feature);
	return res;
}

function statisticaProm(feature){
	var coteg = {"01": "Живые животные",  "02": "Живые животные", "03": "Живые животные", "04": "Живые животные","05": "Живые животные","06": "Продукты растительного происхождения","07": "Продукты растительного происхождения",
"08": "Продукты растительного происхождения","09": "Продукты растительного происхождения","10": "Продукты растительного происхождения","11": "Продукты растительного происхождения",
"12": "Продукты растительного происхождения","13": "Продукты растительного происхождения","14": "Продукты растительного происхождения", "15": "Жиры и масла",
"16": "Готовые пищевые продукты","17": "Готовые пищевые продукты", "18": "Готовые пищевые продукты","19": "Готовые пищевые продукты","20": "Готовые пищевые продукты",
"21": "Готовые пищевые продукты","22": "Готовые пищевые продукты",
"23": "Готовые пищевые продукты","24": "Готовые пищевые продукты",
"25": "Минеральные продукты","26": "Минеральные продукты",
"27": "Минеральные продукты","28": "Продукция химической и связанных с ней отраслей промышленности","29": "Продукция химической и связанных с ней отраслей промышленности",
"30": "Продукция химической и связанных с ней отраслей промышленности","31": "Продукция химической и связанных с ней отраслей промышленности",
"32": "Продукция химической и связанных с ней отраслей промышленности","33": "Продукция химической и связанных с ней отраслей промышленности",
"34": "Продукция химической и связанных с ней отраслей промышленности","35": "Продукция химической и связанных с ней отраслей промышленности",
"36": "Продукция химической и связанных с ней отраслей промышленности","37": "Продукция химической и связанных с ней отраслей промышленности",
"38": "Продукция химической и связанных с ней отраслей промышленности","39": "Пластмассы",
"40": "Пластмассы","41": "Необработанные шкуры","42": "Необработанные шкуры",
"43": "Необработанные шкуры","44": "Древесина и изделия из нее","45": "Древесина и изделия из нее","46": "Древесина и изделия из нее",
"47": "Масса из древесины","48": "Масса из древесины","49": "Масса из древесины","50":  "Текстильные материалы и текстильные изделия",                    "51":  "Текстильные материалы и текстильные изделия",                    "52":  "Текстильные материалы и текстильные изделия","53":  "Текстильные материалы и текстильные изделия","54":  "Текстильные материалы и текстильные изделия",                    "55":  "Текстильные материалы и текстильные изделия",
"56":  "Текстильные материалы и текстильные изделия","57":  "Текстильные материалы и текстильные изделия",
"58":  "Текстильные материалы и текстильные изделия","59":  "Текстильные материалы и текстильные изделия",
"60":  "Текстильные материалы и текстильные изделия","61":  "Текстильные материалы и текстильные изделия",
"62":  "Текстильные материалы и текстильные изделия","63":  "Текстильные материалы и текстильные изделия",
"64": "Обувь, головные уборы","65": "Обувь, головные уборы","66": "Обувь, головные уборы","67": "Обувь, головные уборы",
"68": "Изделия из камня","69": "Изделия из камня","70": "Изделия из камня","71": "Жемчуг природный",
"72": "Недрагоценные металлы","73": "Недрагоценные металлы",
"74": "Недрагоценные металлы",
"75": "Недрагоценные металлы","76": "Недрагоценные металлы",
"77": "Недрагоценные металлы","78": "Недрагоценные металлы",
"79": "Недрагоценные металлы","80": "Недрагоценные металлы",
"81": "Недрагоценные металлы","82": "Недрагоценные металлы",
"83": "Недрагоценные металлы","84": "Машины, оборудование и механизмы","85": "Машины, оборудование и механизмы","86": "Средства наземного транспорта",                    "87": "Средства наземного транспорта",                    "88": "Средства наземного транспорта",                    "89": "Средства наземного транспорта",
"90": "Инструменты и аппараты оптические","91": "Инструменты и аппараты оптические","92": "Инструменты и аппараты оптические","93": "Оружие и боеприпасы",                    "94": "Разные промышленные товары",                    "95": "Разные промышленные товары",                    "97": "Разные промышленные товары",                    "other": "Разные промышленные товары",                    "97": "Произведения искусства"
	};
	sketch = null;
	var polygon = feature.getGeometry();
	var featureRequest = new ol.format.WFS().writeGetFeature({
		srsName: 'EPSG:3857',
		featureNS: 'http://www.opengis.net',
		featurePrefix: 'mainMap',
		featureTypes: ['product'],
		outputFormat: 'application/json',
		filter: ol.format.filter.intersects('way', polygon, 'EPSG:3857')
	});

	return fetch('https://gs.gismart.ru/geoserver2/mainMap/ows', {
		method: 'POST',
		body: new XMLSerializer().serializeToString(featureRequest),
		mode: 'cors'
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		var res = [];
		var features = new ol.format.GeoJSON().readFeatures(json);
		var data = {};
		for (var i = 0; i < features.length; ++i) {
			var f = features[i];
			var item5 = f.getProperties()['item5']
			if(item5.length > 2){
				item5 = item5.substr(0,2);
			}else{
				item5='other';
			}
			if(typeof data[coteg[item5]] === 'undefined'){
				data[coteg[item5]] = 1;
			}else{
				data[coteg[item5]] += 1;
			}
		}
		for (var a in data){
			res.push([a, data[a]]);
		}
		return res;
	});
}


function statisticaInvest(feature){
	var polygon = feature.getGeometry();
	var featureRequest = new ol.format.WFS().writeGetFeature({
		srsName: 'EPSG:3857',
		featureNS: 'http://www.opengis.net',
		featurePrefix: 'mainMap',
		featureTypes: ['invest'],
		outputFormat: 'application/json',
		filter: ol.format.filter.intersects('way', polygon, 'EPSG:3857')
	});

	return fetch('https://gs.gismart.ru/geoserver2/mainMap/ows', {
		method: 'POST',
		body: new XMLSerializer().serializeToString(featureRequest),
		mode: 'cors'
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		var res = [];
		var features = new ol.format.GeoJSON().readFeatures(json);
		rasp={};
		for(var f in features){
			if(typeof(rasp[features[f].get('srok')])==='undefined'){
				rasp[features[f].get('srok')] = 0;
			}
			++rasp[features[f].get('srok')];
        }
        for(var f in rasp){
        	res.push([f,rasp[f]]);
        }
		return res;
	});
}

function statisticaAkkrOrg(feature){
	var polygon = feature.getGeometry();
	var featureRequest = new ol.format.WFS().writeGetFeature({
		srsName: 'EPSG:3857',
		featureNS: 'http://www.opengis.net',
		featurePrefix: 'mainMap',
		featureTypes: ['reestrakkrorg'],
		outputFormat: 'application/json',
		filter: ol.format.filter.intersects('way', polygon, 'EPSG:3857')
	});

	return fetch('https://gs.gismart.ru/geoserver2/mainMap/ows', {
		method: 'POST',
		body: new XMLSerializer().serializeToString(featureRequest),
		mode: 'cors'
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		var res = [];
		var str = "";
		var features = new ol.format.GeoJSON().readFeatures(json);
		rasp={};
		var i = 0;
		for(var f in features){
			str+='<code>' + features[f].get('org_name').substr(0,30) + '</code><br>';
			++i;
			if(i>3){
				str+='<code>...</code><br>';
				break;
			}
		}
		
		return str;
	});
}

function statisticaOrgOkaz(feature){
	var polygon = feature.getGeometry();
	var featureRequest = new ol.format.WFS().writeGetFeature({
		srsName: 'EPSG:3857',
		featureNS: 'http://www.opengis.net',
		featurePrefix: 'mainMap',
		featureTypes: ['orgokaz'],
		outputFormat: 'application/json',
		filter: ol.format.filter.intersects('way', polygon, 'EPSG:3857')
	});

	return fetch('https://gs.gismart.ru/geoserver2/mainMap/ows', {
		method: 'POST',
		body: new XMLSerializer().serializeToString(featureRequest),
		mode: 'cors'
	}).then(function(response) {
		return response.json();
	}).then(function(json) {
		var res = [];
		var features = new ol.format.GeoJSON().readFeatures(json);
		rasp={};
		for(var f in features){
			if(typeof(rasp[features[f].get('gr')])==='undefined'){
				rasp[features[f].get('gr')] = 0;
			}
			++rasp[features[f].get('gr')];
        }
        for(var f in rasp){
        	res.push([f,rasp[f]]);
        }
		return res;
	});
}