# StArE.js (Client version)

![npm](https://img.shields.io/npm/v/@stare.js/stare.js-client)
![npm](https://img.shields.io/npm/dm/@stare.js/stare.js-client)
[![Build Status](https://travis-ci.com/StArE-js/stare.js-client.svg?branch=master)](https://travis-ci.com/StArE-js/stare.js-client)
![NPM](https://img.shields.io/npm/l/@stare.js/stare.js-client)

## Description
StArE.js is an open source project intended to facilitate developers the creation of alternative visualizations of search engine results page (SERP). StArE.js provides a modular and extensible processing pipeline capable of (1) transforming SERP, (2) extracting features from individual search results, and (3) visualizing SERP in multiple ways.

For StArE.js-server docs [click here](https://github.com/StArE.js/stare.js-server/master/docs/README.md)


## Installation

```bash
npm i @stare.js/stare.js-client
```
## How to use

This package consist of only one function that will render the chart that you desire based on JSON documents of StArE.js.
The following code is an example of how to render a <code>bar</code> chart for an array of documents of StArE.js

```js
import stare from '@stare.js/stare.js-server';

const stareChart = stare('d3', 'bar');

stareChart('#my-chart', stareDocuments = [], chartOptions = {});
```

Essencially, to render a chart you need 4 steps:

* Import stare.js-client.
* Import you desired library for visualization (currently supported <code>d3.js</code>, <code>three.js</code>).
* Use the imported stare function to get the renderer function (ex: d3 -> bar renderer).
+ Use the function following the params defined in the next section.

## Supported Charts

For the supported options for each chart checkout [the docs](/docs/README.md)

### D3.js

- bar
- bubble
- network
- stackedBar
- tiles
- tiles2
- tiles3
- map (Baremo)
- bodyInjuriesMap (Baremo)
- catalog
- tree

### Three.js

- grid


## Contributors

- [Roberto González-Ibáñez](https://github.com/rgonzal/)
- [Camila Márquez](https://github.com/bellyster/)
- [Daniel Gacitúa](https://github.com/dgacitua/)
- [Franz Farbinger](https://github.com/DarkAnimat/)
- [Diego Salazar S.](https://github.com/d-salazar-se/)

## License
[MIT](LICENSE)
