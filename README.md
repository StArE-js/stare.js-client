# StArE.js (Node.js Client version)

![npm](https://img.shields.io/npm/v/stare.js)
![npm](https://img.shields.io/npm/dm/stare.js)
[![Build Status](https://travis-ci.com/StArE-js/stare.js-client.svg?branch=master)](https://travis-ci.com/StArE-js/stare.js-client)
[![Coverage Status](https://coveralls.io/repos/github/StArE-js/stare.js-client/badge.svg?branch=master)](https://coveralls.io/github/StArE-js/stare.js-client?branch=master)
![NPM](https://img.shields.io/npm/l/stare.js)

## Description
StArE.js is an open source project intended to facilitate developers the creation of alternative visualizations of search engine results page (SERP). StArE.js provides a modular and extensible processing pipeline capable of (1) transforming SERP, (2) extracting features from individual search results, and (3) visualizing SERP in multiple ways.

## StArE.js Server
For StArE.js-server docs [click here](https://github.com/StArE.js/stare.js-server/master/docs/README.md)

## StArE.js Client

This package consist of only one function that will render the chart that you desire based on JSON documents of StArE.js.
The following code is an example of how to render a <code>bar</code> chart for an array of documents of StArE.js

```js
import stare from 'stare.js-client';
import d3 from 'd3';

const stareChart = stare('d3', 'bar');

stareChart('#my-chart', stareDocuments = [], myOptions = {});
```

Essencially, to render a chart you need 4 steps:

* Import stare.js-client.
* Import you desired library for visualization (currently supported <code>d3.js</code>, <code>three.js</code>).
* Use the imported stare function to get the renderer function (ex: d3 -> bar renderer).
+ Use the function following the params defined in the next section.

## Supported Charts

### D3.js

#### Bar Chart

