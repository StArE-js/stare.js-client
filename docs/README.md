
For StArE.js-server docs [click here](https://github.com/StArE.js/stare.js-server/master/docs/README.md)

## d3

### Bar

```javascript
const defaultOptions = {
  labelField: 'metrics.ranking',
  valueField: 'metrics.length',
  width: 500,
  height: 400,
  fillColor: 'steelblue',
  margin: {
    top: 30,
    right: 0,
    bottom: 30,
    left: 40,
  },
  tooltip: {
    style: 'position: absolute;padding: 4px; width: 300px; background-color: #f9f9f9; border: 1px solid; border-radius: 2px; pointer-events: none; opacity: 0;',
    content: (item) => {
      return `
        <div>
          Value: <b>${get(item, 'metrics.length', 0)}</b>
        </div>
        <div>
          <b>${item.title}</b>
        </div>
        <div>${item.snippet}</div>`;
    },
    onClick: (item) => {
      window.open(item.link, '_blank');
    },
  },
};
```


### Bubble

```javascript
const defaultOptions = {
  labelField: 'metrics.ranking',
  valueField: 'metrics.length',
  groupField: 'metrics.language',
  width: 500,
  height: 400,
  fillColor: 'steelblue',
  margin: {
    top: 30,
    right: 0,
    bottom: 30,
    left: 40,
  },
  tooltip: {
    style: 'position: absolute;padding: 4px; width: 300px; background-color: #f9f9f9; border: 1px solid; border-radius: 2px; pointer-events: none; opacity: 0;',
    content: (item) => {
      return `
        <div>
          Value: <b>${get(item, 'metrics.length', 0)}</b>
        </div>
        <div>
          <b>${item.title}</b>
          </div>
        <div>${item.snippet}</div>`;
    },
    onClick: (item) => {
      window.open(item.link, '_blank');
    },
  },
};
```

### Network

```javascript
const defaultOptions = {
  labelField: 'metrics.ranking',
  linksField: 'metrics.links',
  width: 1000,
  height: 800,
  fontStyle: '12px sans-serif',
  mainNode: {
    fillColor: 'orange',
    radius: (item, arr) => 10 + 2 * (arr.length - item.data.metrics.ranking),
  },
  targetNode: {
    fillColor: 'black',
    radius: 5,
  },
  tooltip: {
    style: 'position: absolute;padding: 4px; width: 300px; background-color: #f9f9f9; border: 1px solid; border-radius: 2px; pointer-events: none; opacity: 0;',
    content: (item) => {
      return `
        <div>
          Ranking: <b>${get(item, 'metrics.ranking', null)}</b>
        </div>
        <div>
          <b>${item.title}</b>
        </div>
        <div>${item.snippet}</div>`;
    },
    onClick: (item) => {
      window.open(item.link, '_blank');
    },
  },
};
```

### Stacked Bar

```javascript
const defaultOptions = {
  labelField: 'metrics.ranking',
  valueField: 'metrics.multimedia',
  width: 500,
  height: 400,
  fillColor: 'steelblue',
  margin: {
    top: 30,
    right: 0,
    bottom: 30,
    left: 40,
  },
  tooltip: {
    style: 'position: absolute;padding: 4px; width: 300px; background-color: #f9f9f9; border: 1px solid; border-radius: 2px; pointer-events: none; opacity: 0;',
    content: (item, chartItem) => {
      const key = get(chartItem, 'key');
      
      return `
        <div>
          [${key}] <b>${get(chartItem, `data.${key}`)}</b></div>
        <div>
          <b>${item.title}</b>
        </div>
        <div>${item.snippet}</div>`;
    },
    onClick: (item) => {
      window.open(item.link, '_blank');
    },
  },
};
```

### Tiles

```javascript
const defaultOptions = {
  labelField: 'metrics.ranking',
  valueField: 'metrics.keywords-position',
  width: 200,
  height: 200,
  fillColor: 'steelblue',
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  numberOfLines: 50,
  messages: {
    'noData': 'Data not available.'
  }
};
```

### Tiles 2

```javascript
const defaultOptions = {
  labelField: 'metrics.ranking',
  valueField: 'metrics.keywords-position',
  width: 1200,
  height: 333,
  fillColor: 'steelblue',
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  messages: {
    'noData': 'Data not available.'
  },
  boxSize: {
    width: 20,
    height: 20
  },
  breakLine: 100,
  tooltip: {
    style: 'position: absolute;padding: 4px; width: 300px; background-color: #f9f9f9; border: 1px solid; border-radius: 2px; pointer-events: none; opacity: 0;',
    content: (item) => {
      return `
        <div>
          Document Length: <b>${get(item, 'metrics.length', 0)}</b>
        </div>
        <div>
          <b>${item.title}</b>
        </div>
        <div>${item.snippet}</div>`;
    },
    onClick: (item) => {
      window.open(item.link, '_blank');
    },
  },
};
```

### Tiles 3

```javascript
const defaultOptions = {
  labelField: 'metrics.ranking',
  valueField: 'metrics.keywords-position',
  width: 200,
  height: 200,
  fillColor: 'steelblue',
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  numberOfLines: 50,
  messages: {
    'noData': 'Data not available.',
    'noFrecuency': 'No matches found on this document',
  },
  numberOfGroups: 10,
  tooltip: {
    style: 'position: absolute;padding: 4px; min-width: 100px; background-color: #f9f9f9; border: 1px solid; border-radius: 2px; pointer-events: none; opacity: 0;',
    content: (item) => `<div>Frecuency: <b>${get(item, 'frecuency', 0)}</b></div>`,
    onClick: () => {},
  },
};
```

### Map

```javascript
const defaultOptions = {
    width: 1000,
    height: 1000,
    threshold: 0.95,
    unit: 'clp',
    appelateCourtField: 'metrics.courts.appelateCourt.name',

    amountGivenFirstField: 'metrics.lawsuit-ammount.otorgado.primera',
    amountGivenFirstUfField: 'metrics.lawsuit-ammount.otorgado.primeraUF',
    amountGivenFirstPresentField: 'metrics.lawsuit-ammount.otorgado.primeraPresente',
    amountGivenFirstPresentUfField: 'metrics.lawsuit-ammount.otorgado.primeraPresenteUF',

    amountAskedFullField: 'metrics.lawsuit-ammount.demandado.demandado',
    amountAskedFullUfField: 'metrics.lawsuit-ammount.demandado.demandadoUF',
    amountAskedFullPresentField: 'metrics.lawsuit-ammount.demandado.demandadoPresente',
    amountAskedFullPresentUfField: 'metrics.lawsuit-ammount.demandado.demandadoPresenteUF',

    categoryField: 'metrics.category',
    filterCategory: 'Accidente del Trabajo',
    baseOpacity: 0.4,
    baseColor: 'grey',
    filledOpacity: 0.8,
    fillWith: 'primera',
    statistic: 'average',
    colorInterpolation: 'interpolateBrBG',
    colorInit: 'blue',
    colorFinal: 'red',
    stroke: false,
    strokeColor: 'black',
    topoJurisdicciones: 'https://nicoolivaresg.github.io/json-files/topojson/jurisdicciones-3.json',
    topoCortes: 'https://nicoolivaresg.github.io/json-files/topojson/cortes.json',
    scaleFactor: 1.25,
    legendBarHeight: 50,
    margin: { top: 20, right: 5, bottom: 20, left: 5 },

    dynamicCard: {
        width: '85',
        height: '85',
        backgroundColor: 'white',
        borderRadius: '10px',
        fadeInTime: 400,
        fadeOutTime: 200
    },

    resultsSexoVictimaField: 'metrics.personalData.sexo',
    resultsEdadVictimaField: 'metrics.personalData.edad',
    resultsCaratuladoField: 'title',
    resultsHechosFundantesField: 'snippet',
    resultsCourtNameField: 'metrics.courts.court.name',
    resultsFirstSentenceDateField: 'metrics.courts.court.sentenceDate',
    resultsCourtAppelateField: 'metrics.courts.appelateCourt.name',
    resultsCourtSupremeField: 'metriipc anualcs.courts.supreme.name',
};
```
### Body Injuries Map

```javascript
const defaultOptions = {
    sequelField: 'metrics.injuries.sequel',
    injuriesField: 'metrics.injuries',

    amountGivenFirstField: 'metrics.lawsuit-ammount.otorgado.primera',
    amountGivenFirstUfField: 'metrics.lawsuit-ammount.otorgado.primeraUF',
    amountGivenFirstPresentField: 'metrics.lawsuit-ammount.otorgado.primeraPresente',
    amountGivenFirstPresentUfField: 'metrics.lawsuit-ammount.otorgado.primeraPresenteUF',

    amountAskedFullField: 'metrics.lawsuit-ammount.demandado.demandado',
    amountAskedFullUfField: 'metrics.lawsuit-ammount.demandado.demandadoUF',
    amountAskedFullPresentField: 'metrics.lawsuit-ammount.demandado.demandadoPresente',
    amountAskedFullPresentUfField: 'metrics.lawsuit-ammount.demandado.demandadoPresenteUF',

    metricsField: 'metrics',
    categoryField: 'metrics.category',
    filterCategory: 'Accidente del Trabajo', // Puede ser "Accidente del Trabajo" o "Enfermedad Profesional"
    unit: 'clp',
    fillWith: 'solicitado',
    statistic: 'average',
    colorInterpolation: 'interpolateBrBG',
    colorInit: 'blue',
    colorFinal: 'red',
    threshold: 0.95,
    width: window.innerWidth,
    height: window.innerHeight,
    fillColor: 'lightblue',
    mainBackgroundColor: 'cornsilk',
    legendBarHeight: 50,
    margin: { top: 20, right: 40, bottom: 30, left: 40 },

    bodyMapData: [
        'https://nicoolivaresg.github.io/json-files/json/front-body-map.json', // Mapa frontal
        'https://nicoolivaresg.github.io/json-files/json/back-body-map.json', //Mapa trasera
        'https://nicoolivaresg.github.io/json-files/json/unsegmented-body-map.json' //Mapa para  partes no segmentadas
    ],

    affectedBodyPartsField: 'metrics.injuries.affectedBodyParts',
    resultsSexoVictimaField: 'metrics.personalData.sexo',
    resultsEdadVictimaField: 'metrics.personalData.edad',
    resultsCaratuladoField: 'title',
    resultsHechosFundantesField: 'snippet',
    resultsCourtNameField: 'metrics.courts.court.name',
    resultsFirstSentenceDateField: 'metrics.courts.court.sentenceDate',
    resultsCourtAppelateField: 'metrics.courts.appelateCourt.name',
    resultsCourtSupremeField: 'metrics.courts.supreme.name',
};
```

### Catalog

```javascript
const defaultOptions = {
    father: {
        labelField: 'title',
        base64pdf: 'image',// pdf base64 para despliegue
        width: 300,
        height: 300,
        fillColor: 'lightblue',
        margin: 2
    },
    valueField: 'metrics.planDuration', 
    childrenField: 'metrics.modules', //lista de elementos hijos
    children: {
        //Deben se propiedades de los objetos de childrenField
        labelField: 'CodigoModulo', //etiqueta para el hijo
        valueField: 'Duracion', //variable numérica que codifica la altura de relleno del recuadro
        units: 'Horas', //Unidad de la variable numérica
        base64pdf: 'DataPdf', // pdf base64 para despliegue
        width: 90,
        height: 90,
        fillColor: 'orange',
        margin: 2
    },
    width: 1000,
    height: 1000,
    fontStyle: '12px sans-serif',
    fillColor: 'beige'
};
```

### Tree

```javascript
const defaultOptions = {
    fieldsByLevel: ['metrics.sector', 'metrics.subsector'], //campos para categorías primaria y secundaria (respectivamente)
    //Opciones de grupo hojas
    groupField: 'metrics.modules', //
    //los siguientes campos deben ser propiedades de los objetos de groupField
    groupLabelField: 'Nombre',
    groupValueField: 'Duracion',
    groupValueUnits: 'horas', // unidades del campo numérico groupValueField
    groupLinkField: 'DataPdf', // propiedad con pdf en base64 para desplegar documento.
    // conjunto de categorías, con la estructura
    /**
     * {
     *  name: "nombre nodo",
     *  children: [ lista de nodos con la misma estructura]
     * }
     */
    treeData: { "name": "SECTOR", "children": [{ "name": "ACTIVIDADES PROFESIONALES, CIENTÍFICAS Y TÉCNICAS", "children": [{ "children": [], "name": "GESTIÓN Y ADMINISTRACIÓN DE EMPRESAS" }, { "children": [], "name": "OTRAS ACTIVIDADES PROFESIONALES" }, { "children": [], "name": "PUBLICIDAD Y ESTUDIOS DE MERCADO" }] }, { "name": "ACUÍCOLA Y PESQUERO", "children": [{ "children": [], "name": "CULTIVO Y CRIANZA DE PECES" }, { "children": [], "name": "MOLUSCOS Y VEGETALES MARINOS" }, { "children": [], "name": "PESCA ARTESANAL" }, { "children": [], "name": "PESCA INDUSTRIAL" }, { "children": [], "name": "SERVICIOS RELACIONADOS A ACUICULTURA Y PESCA" }] }, { "name": "ADMINISTRACIÓN PÚBLICA", "children": [{ "children": [], "name": "MUNICIPAL" }, { "children": [], "name": "OTROS SERVICIOS PÚBLICOS" }] }, { "name": "AGRÍCOLA Y GANADERO", "children": [{ "children": [], "name": "TRANSVERSAL" }, { "children": [], "name": "APICULTURA" }, { "children": [], "name": "CRÍA DE ANIMALES Y SERVICIOS CONEXOS" }, { "children": [], "name": "CULTIVO DE CEREALES, LEGUMINOSAS, SEMILLAS Y OTROS" }, { "children": [], "name": "ESPECIES FORRAJERAS" }, { "children": [], "name": "EXPLOTACIÓN MIXTA" }, { "children": [], "name": "FLORICULTURA Y VIVEROS" }, { "children": [], "name": "FRUTICULTURA" }, { "children": [], "name": "HORTICULTURA" }, { "children": [], "name": "OTROS AGRÍCOLA (PRODUCTOS NO TRADICIONALES)" }, { "children": [], "name": "PECUARIO" }, { "children": [], "name": "SERVICIOS AGRÍCOLAS" }, { "children": [], "name": "PRODUCCIÓN DE SEMILLAS" }] }, { "name": "ARTE, ENTRETENIMIENTO Y RECREACIÓN", "children": [{ "children": [], "name": "ARTES ESCÉNICAS" }, { "children": [], "name": "ARTES PLÁSTICAS Y OTRAS" }, { "children": [], "name": "ARTESANÍA" }, { "children": [], "name": "MUSEOS BIBLIOTECAS Y OTRAS ACTIVIDADES CULTURALES" }, { "children": [], "name": "RECREACIÓN Y DEPORTE" }, { "children": [], "name": "PARQUES, ZOOLÓGICOS Y RESERVAS NATURALES" }] }, { "name": "COMERCIO", "children": [{ "children": [], "name": "CORRETAJES" }, { "children": [], "name": "GRANDES TIENDAS" }, { "children": [], "name": "SUPERMERCADOS" }, { "children": [], "name": "VENTAS AL POR MAYOR" }, { "children": [], "name": "VENTA, REPARACIÓN Y MANTENIMIENTO DE EQUIPOS Y OTROS" }, { "children": [], "name": "VENTA, REPARACIÓN Y MANTENIMIENTO DE MAQUINARIA&nbsp;&nbsp;&nbsp;" }, { "children": [], "name": "VENTA, REPARACIÓN Y MANTENIMIENTO MECÁNICO AUTOMOTRIZ" }, { "children": [], "name": "VENTAS AL POR MENOR" }] }, { "name": "CONSTRUCCIÓN", "children": [{ "children": [], "name": "ACTIVIDADES ESPECIALIZADAS DE CONSTRUCCIÓN" }, { "children": [], "name": "EDIFICACIÓN" }, { "children": [], "name": "INSTALACIONES ELÉCTRICAS, DE GASFITERÍA Y CLIMATIZACIÓN" }, { "children": [], "name": "MONTAJE INDUSTRIAL" }, { "children": [], "name": "OBRAS DE INGENIERÍA CIVIL" }] }, { "name": "EDUCACIÓN", "children": [{ "children": [], "name": "CAPACITACIÓN LABORAL" }, { "children": [], "name": "EDUCACIÓN PREESCOLAR Y ESCOLAR" }, { "children": [], "name": "EDUCACIÓN SUPERIOR" }, { "children": [], "name": "OTROS TIPOS DE ENSEÑANZA" }] }, { "name": "ELABORACIÓN DE ALIMENTOS Y BEBIDAS", "children": [{ "children": [], "name": "ACEITES VEGETALES" }, { "children": [], "name": "CARNES" }, { "children": [], "name": "ELABORACIÓN Y CONSERVACIÓN DE ALIMENTOS" }, { "children": [], "name": "LÁCTEOS" }, { "children": [], "name": "OTRAS BEBIDAS Y TABACO" }, { "children": [], "name": "PANADERO" }, { "children": [], "name": "VITIVINÍCOLA" }] }, { "name": "GASTRONOMÍA, HOTELERÍA Y TURISMO", "children": [{ "children": [], "name": "GASTRONOMÍA" }, { "children": [], "name": "HOTELERÍA" }, { "children": [], "name": "TURISMO" }] }, { "name": "INFORMACIÓN Y COMUNICACIONES", "children": [{ "children": [], "name": "ACTIVIDADES DE EDICIÓN\">ACTIVIDADES DE EDICIÓN" }, { "children": [], "name": "CINE Y TELEVISIÓN\">CINE Y TELEVISIÓN" }, { "children": [], "name": "RADIODIFUSIÓN&nbsp;\">RADIODIFUSIÓN&nbsp;" }, { "children": [], "name": "TECNOLOGÍAS DE INFORMACIÓN\">TECNOLOGÍAS DE INFORMACIÓN" }, { "children": [], "name": "TELECOMUNICACIONES\">TELECOMUNICACIONES</a></li></ul>" }] }, { "name": "MANUFACTURA METÁLICA", "children": [{ "children": [], "name": "FABRICACIÓN DE MAQUINARIA Y EQUIPOS" }, { "children": [], "name": "FABRICACIÓN DE PRODUCTOS METÁLICOS" }, { "children": [], "name": "METALÚRGICO METALMECÁNICO" }] }, { "name": "MANUFACTURA NO METÁLICA", "children": [{ "children": [], "name": "FABRICACIÓN DE MADERAS Y MUEBLES" }, { "children": [], "name": "FABRICACIÓN DE PAPEL Y PRODUCTOS DE PAPEL" }, { "children": [], "name": "IMPRESIÓN Y REPRODUCCIÓN DE GRABACIONES" }, { "children": [], "name": "MINERALES NO METÁLICOS" }, { "children": [], "name": "OTRAS INDUSTRIAS MANUFACTURERAS" }, { "children": [], "name": "PRODUCTOS DE CAUCHO Y PLÁSTICO" }, { "children": [], "name": "PRODUCTOS FARMACÉUTICOS" }, { "children": [], "name": "PRODUCTOS TEXTILES" }, { "children": [], "name": "PRODUCTOS Y SUSTANCIAS QUÍMICAS" }] }, { "name": "MINERÍA METÁLICA", "children": [{ "children": [], "name": "MINERÍA DE ORO, PLATA Y OTROS METALES" }, { "children": [], "name": "MINERÍA DEL COBRE" }] }, { "name": "MINERÍA NO METÁLICA", "children": [{ "children": [], "name": "CARBÓN" }, { "children": [], "name": "PETRÓLEO Y GAS NATURAL" }, { "children": [], "name": "LITIO" }, { "children": [], "name": "NITRATOS" }, { "children": [], "name": "OTRAS MINAS Y CANTERAS" }] }, { "name": "SERVICIOS", "children": [{ "children": [], "name": "ACTIVIDADES DE ALQUILER E INMOBILIARIAS" }, { "children": [], "name": "ACTIVIDADES DE ASOCIACIONES" }, { "children": [], "name": "IMAGEN Y CUIDADO PERSONAL" }, { "children": [], "name": "SERVICIOS ADMINISTRATIVOS Y DE APOYO" }, { "children": [], "name": "SERVICIOS DE RECICLAJE Y ELIMINACIÓN DE RESIDUOS" }, { "children": [], "name": "SERVICIOS DE SEGURIDAD" }, { "children": [], "name": "SERVICIOS PARA EL HOGAR" }] }, { "name": "SERVICIOS DE SALUD Y ASISTENCIA SOCIAL", "children": [{ "children": [], "name": "SERVICIOS DE ASISTENCIA SOCIAL" }, { "children": [], "name": "SERVICIOS DE SALUD" }] }, { "name": "SERVICIOS FINACIEROS Y DE SEGUROS", "children": [{ "children": [], "name": "SERVICIOS DE SEGUROS" }, { "children": [], "name": "SERVICIOS FINANCIEROS" }] }, { "name": "SILVICULTURA Y ACTIVIDADES FORESTALES", "children": [{ "children": [], "name": "FORESTAL" }, { "children": [], "name": "SILVICULTURA" }] }, { "name": "SUMINISTRO DE GAS, ELECTRICIDAD Y AGUA", "children": [{ "children": [], "name": "AGUA" }, { "children": [], "name": "ELECTRICIDAD" }, { "children": [], "name": "ENERGÍAS RENOVABLES NO CONVENCIONALES" }, { "children": [], "name": "GAS Y VAPOR" }] }, { "name": "TRANSPORTE Y LOGÍSTICA", "children": [{ "children": [], "name": "AGENCIAS DE ADUANA" }, { "children": [], "name": "LOGÍSTICA" }, { "children": [], "name": "SERVICIOS POSTALES" }, { "children": [], "name": "TRANSPORTE AÉREO" }, { "children": [], "name": "TRANSPORTE MARÍTIMO" }, { "children": [], "name": "TRANSPORTE TERRESTRE" }] }, { "name": "TRANSVERSAL", "children": [{ "children": [], "name": "TRANSVERSAL" }] }] },
    width: 1700,
    height: 1000,
    fontStyle: '12px sans-serif',
    fillColor: 'grey',
    margin: { top: 20, right: 90, bottom: 30, left: 90 }
};
```

## Three.js

### Grid

```javascript
const defaultOptions = {
  labelField: 'metrics.ranking',
  valueField: 'metrics.screenshot',
  width: 100,
  height: 100,
  fillColor: 'steelblue',
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  numberOfLines: 50,
  messages: {
    'no_data': 'Data not available.'
  }
};
```