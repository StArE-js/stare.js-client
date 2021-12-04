const debug = require('debug')('stare.js:client/charts/d3/sparklines');
const d3 = require(`d3`);
const _ = require('lodash');

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

var mainContainer = null;
var tooltip = null;
var valueContainer = null;
var treeData = null;

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

        
    if(!d.children){
        tooltip
            .style('left', `${d3.event.pageX}px`)
            .style('top', `${d3.event.pageY - 28}px`)
        if(d.data.value){
            tooltip.append('p')
                .text(`${d.data.value} ${opts.groupValueUnits}`)
        }
    }

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
    mainContainer = d3.select(querySelector).style('font-style', finalOptions.fontStyle)

    var levelValues = data.map(doc => {
        return _.get(doc, finalOptions.fieldsByLevel[0]);
    });

    treeData = finalOptions.treeData;

    treeData.children = treeData.children.filter(child => levelValues.includes(child.name));

    for (let c = 0; c < treeData.children.length; c++) {
        var levelValues = data.map(doc => {
            return _.get(doc, finalOptions.fieldsByLevel[1]);
        });
        treeData.children[c].children = treeData.children[c].children.filter(child => levelValues.includes(child.name));
    }

    

    // Set the dimensions and margins of the diagram
    var margin = finalOptions.margin,
        width = finalOptions.width - margin.left - margin.right,
        height = finalOptions.height - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = mainContainer.append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("
            + margin.left + "," + margin.top + ")");

    var i = 0,
        duration = 750,
        root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, function (d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    //Create leafs according to plans
    let hojas = root.leaves();
    for (let i = 0; i < hojas.length; i++) {
        let selected = hojas[i] 
        var group0= data.filter(plan => selected.data.name === _.get(plan, finalOptions.fieldsByLevel[1]))
        group0.forEach(g0 =>{
            var newNode = {
                name: g0.title,
                children: []
            };
            var newNode = d3.hierarchy(newNode);
            newNode.depth = selected.depth + 1;
            newNode.height = selected.height - 1;
            newNode.parent = selected;
            newNode.id = g0.title;
            
            if(!selected.children){
                selected.children = [];
                selected.data.children = [];
            }
            
            
            let newGroup0 = newNode;
            var group = _.get(g0, finalOptions.groupField)
            group.forEach(mo => {
                var newGroup = {
                    name: _.get(mo, finalOptions.groupLabelField),
                    value: _.get(mo, finalOptions.groupValueField),
                    image: _.get(mo, finalOptions.groupLinkField),
                    children: []
                };
                var newGroup = d3.hierarchy(newGroup);
                newGroup.depth = newGroup0.depth + 1;
                newGroup.height = newGroup0.height - 1;
                newGroup.parent = newGroup0;
                newGroup.id = _.get(mo, finalOptions.groupLabelField);
                
                if(!newGroup0.children){
                    newGroup0.children = [];
                    newGroup0.data.children = [];
                }
                
                newGroup0.children.push(newGroup);
                newGroup0.data.children.push(newGroup.data);
            })
            selected.children.push(newNode);
            selected.data.children.push(newNode.data);
        })
    }
    // Collapse after the second level
    root.children.forEach(collapse);
    update(root);
    
    // Collapse the node and all it's children
    function collapse(d) {
        if (d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
        }
    }

    function update(source) {
        // Assigns the x and y position for the nodes
        var treeData = treemap(root);

        // Compute the new tree layout.
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) { d.y = d.depth * 180 });

        // ****************** Nodes section ***************************

        // Update the nodes...
        var node = svg.selectAll('g.node')
            .data(nodes, function (d) { return d.id || (d.id = ++i); })


        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            // .attr('class', 'node')
            .attr("class", function (n) {
                if (n.children) {
                    return "inner node"
                } else {
                    return "leaf node"
                }
            })
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', click)
            .on('mouseover', mouseover)
            .on('mouseout', mouseout);

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style('fill', 'none')
            .style('stroke', 'steelblue')
            .style('stroke-width', '3px')
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });
            
        // Add labels for the nodes
        nodeEnter.append('text')
            .style("font-size", "0.6em")
            .attr("dy", ".35em")
            .attr("x", function (d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) { return d.data.name; });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = svg.selectAll('path.link')
            .data(links, function (d) { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .style('fill', 'none')
            .style('stroke', '#ccc')
            .style('stroke-width', '2px')
            .attr('d', function (d) {
                var o = { x: source.x0, y: source.y0 }
                return diagonal(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function (d) { return diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function (d) {
                var o = { x: source.x, y: source.y }
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

            path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`
            
            return path
        }

        //Mouseover on leaves
        function mouseover(d) {
            showTooltip(d, finalOptions)
        }

        function mouseout(d) {
            hideTooltip();
        }
        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                console.log(d);
                if(d.data.image){
                    pdfWindow = window.open("")
                    pdfWindow.document.write(
                        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
                        encodeURI(d.data.image) + "'></iframe>"
                    )
                }else{
                    d.children = d._children;
                    d._children = null;
                }
            }
            update(d);
        }

    }
}

module.exports = exports = chart;