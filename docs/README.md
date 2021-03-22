
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