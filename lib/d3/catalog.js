const debug = require('debug')('stare.js:client/charts/d3/catalog');
const d3 = require(`d3`);
const _ = require('lodash');

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

var mainContainer = null;
var mainSVG = null;
var fathers = null;
var fathersContainer = null;
var childrenContainer = null;
var children = null;
var tooltip = null;

function createTooltip() {
    tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        // .attr('class', 'stare__tooltip')
        .style('position', 'absolute')
        .style('padding', '4px')
        .style('width', '200px')
        .style('background-color', '#f9f9f9')
        .style('border', '1px')
        .style('border-radius', '2px')
        .style('pointer-events', 'none')
        .style('opacity', 0)
}

function showTooltip(d, opts) {
    tooltip.selectAll('*').remove();
    tooltip
        .transition()
        .duration(200)
        .style('opacity', 1);

    tooltip
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY - 28}px`)

    tooltip.append('p')
        .text(`Click para abrir`)

}

function hideTooltip() {
    tooltip
        .transition()
        .duration(500)
        .style('opacity', 0);
}


function chart(querySelector, data, opts) {
    let finalOptions = {};
    _.assign(finalOptions, defaultOptions, opts);

    data = _.get(data, 'documents');
    console.log('catalog', data);

    createTooltip();
    mainContainer = d3.select(querySelector)

    var childrenList = [];
    data.forEach((father) => {
        var children = _.get(father, finalOptions.childrenField)
        var val = children.map(c => _.get(c, finalOptions.children.valueField));
        children.forEach(c => {
            childrenList.push({
                label: _.get(c, finalOptions.children.labelField),
                values: val
            })
        })
    });

    function render(data) {
        fathersContainer = mainContainer.append('div').attr('id', 'fathersContainer')
            .attr("width", `${finalOptions.width}px`)
            .attr("height", `${finalOptions.height}px`)
            .attr("max-height", `${finalOptions.height}px`)
            .style("display", "flex")
            .style("flex-flow", "row wrap")
            .style("justify-content", "flex-start")
            .style("align-items", "flex-start")
            .style("font", finalOptions.fontStyle)
            .style("background-color", finalOptions.fillColor)
            .style('overflow', 'auto')

        var fathers = fathersContainer.selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'father')
            .style('width', `${finalOptions.father.width}px`)
            .style('height', `${finalOptions.father.height}px`)
            .style('margin', '2%')
            .style('background-color', finalOptions.father.fillColor)
            .style('display', 'flex')
            .style("justify-content", "center")
            .style("flex-direction", "column-reverse")
            .style("text-align", 'center')
            .style('flex-grow', 'columns wrap')
            .style('border', 'solid 1px black')
            .style('border-radius', '5% ')
            .style('padding', '0.5%')


        childrenContainer = fathers.append('div').attr('id', 'childrenContainer')
            .style('position', 'relative')
            .style('max-width', `${finalOptions.father.width - 2}px`)
            .style('width', `auto`)
            .style('display', 'grid')
            .style('grid-template-columns', '1fr 1fr 1fr')
            .style("flex-flow", "row wrap")
            .style("justify-content", "space-evenly")
            .style("align-items", "center")

        //Add children to childrenContainer
        children = childrenContainer.selectAll('div')
            .data(d => _.get(d, finalOptions.childrenField)).enter().append('div')
            .attr('id', 'children')
            .style('position', 'relative')
            .style('max-width', `${finalOptions.children.width}px`)
            .style('max-height', `${finalOptions.children.height}px`)
            .style('width', `${finalOptions.children.width}px`)
            .style('height', `${finalOptions.children.height}px`)
            .style('border', 'solid 1px black')
            .style('background-color', 'white')
            .style('margin', '2%')


        //Set events to children
        children.on('mouseover', d => showTooltip(d,finalOptions))
        children.on('mouseout', () => {
            hideTooltip();
        })
        children.on("mousedown", function () { d3.event.stopPropagation(); })
        // children.on('click', e => console.log(_.get(e, finalOptions.children.labelField)))
        children.on('click', m => {
            pdfWindow = window.open("")
            pdfWindow.document.write(
                "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
                encodeURI(_.get(m,finalOptions.children.base64pdf)) + "'></iframe>"
            )
        });
        //Set style inside children
        insideChild = children.append('div')
            .style('height', (m) => {
                var max = finalOptions.children.height;
                var valores = childrenList.find(v => v.label === _.get(m, finalOptions.children.labelField)).values;
                // Simple 3 elements scale to get the pixel height acording to valueField
                var valuePx = _.get(m, finalOptions.children.valueField) * max / Math.max.apply(Math, valores)
                return `${valuePx}px`;
            })
            .style('flex-shrink', 3)
            .style('background-color', finalOptions.children.fillColor)
            .style('text-align', 'center')
            .append('p').text((m) => {
                return `${_.get(m, finalOptions.children.labelField)}`
            })
            .append('p').text((m) => {
                return `${_.get(m, finalOptions.children.valueField)} ${finalOptions.children.units}`
            })


        fathers.append('span')
            .style('position', 'absolute')
            .style('max-width', '100%')
            .style('white-space', 'normal')
            .style('display', 'inline-block')
            .style('font-weight', 'bold')
            .style('margin', '1%')
            .style('top','1%')
            .text((d) => _.get(d, finalOptions.father.labelField))
            .on('mouseover', d => showTooltip(d,finalOptions))
            .on('mouseout', () => {
                hideTooltip();
            })
            .on('click', d => {
                    pdfWindow = window.open("")
                    pdfWindow.document.write(
                        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
                        encodeURI(_.get(d,finalOptions.father.base64pdf)) + "'></iframe>"
                    )
                })
    }

    render(data);
}

module.exports = exports = chart;