// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  suite('px-vis-brush basic setup works', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            "y2": 1,
            'y3': 5
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            "y2": 21,
            'y3': 10
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            "y2": 3,
            'y3': 15
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            "y2": 10,
            'y3': 55
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            "y2": 27,
            'y3': 75
          }
        ],
        seriesConfig = {
          "y1": {
            "title": "2nd Title"
          },
          "y2": {
            "title": "Third Title",
            "yAxisUnit": "bofs"
          },
          "y3": {
            "title": "New Title",
            "yAxisUnit": "bofs"
          }
        },
        dim = ['y','y1','y2','y3'],
        w = 500,
        h = 460;

      basicRadar.set('width',w);
      basicRadar.set('height',h);
      basicRadar.set('seriesKey',"x");
      basicRadar.set('axes',dim);
      basicRadar.set('chartData',d);

      setTimeout(function(){done()},500);
      // done();
    });

    test('basicRadar fixture is created', function() {
      assert.isTrue(basicRadar !== null);
    });

    test('basicRadar minDim', function() {
      assert.equal(basicRadar._minDim, 200);
    });

    test('basicRadar _offset', function() {
      assert.deepEqual(basicRadar._offset, [200,205]);
    });

    test('basicRadar centerOffset', function() {
      assert.equal(basicRadar.centerOffset, 60);
    });

    test('basicRadar ticks', function() {
      assert.equal(basicRadar.ticks, 4);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3']);
    });

    test('basicRadar ticks', function() {
      assert.equal(basicRadar.ticks, 4);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3']);
    });

    test('basicRadar svg', function() {
      var re = /translate\((\d+)\s?,?(\d*)\)/,
          translate = re.exec(basicRadar.svg.attr('transform'));

      assert.equal(basicRadar.svg.node().tagName, 'g');
      assert.equal(translate[1], 250);
      assert.equal(translate[2], 230);
    });

    test('basicRadar pxSvgElem', function() {
      assert.equal(basicRadar.pxSvgElem.tagName, 'svg');
      assert.equal(basicRadar.pxSvgElem.width.baseVal.value, 500);
      assert.equal(basicRadar.pxSvgElem.height.baseVal.value, 460);
    });

    test('basicRadar canvasContext', function() {
      assert.deepEqual(basicRadar.canvasContext._translation, [250,230]);
      assert.equal(basicRadar.canvasContext._pxLinesRedraw, 1);
      assert.equal(basicRadar.canvasContext._pxLinesTotal, 1);
      assert.deepEqual(basicRadar.canvasContext._pxLinesSeries, {"x":true});
      assert.equal(basicRadar.canvasContext.canvas.width, 500);
      assert.equal(basicRadar.canvasContext.canvas.height, 460);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar mutedSeriesBrush', function() {
      assert.deepEqual(basicRadar.mutedSeriesBrush, {});
    });

    test('basicRadar mutedSeriesDomain', function() {
      assert.deepEqual(basicRadar.mutedSeriesDomain, {});
    });

    test('basicRadar truncationLength', function() {
      assert.equal(basicRadar.truncationLength, 10);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 4);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 4);
    });

    test('basicRadar drawnTickValues', function() {
      assert.deepEqual(basicRadar.drawnTickValues, [20,40,60,1,75]);
    });

    test('basicRadar _tooltipConfig', function() {
      assert.deepEqual(basicRadar._tooltipConfig, {});
    });

  }); //suite

  suite('px-vis-brush muting an axis works', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      var muted = {
        'y': true
      }

      basicRadar.set('mutedAxes',muted);

      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y1','y2','y3']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y1','y2','y3']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y1','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 3);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 3);
    });

  }); //suite

  suite('px-vis-brush unmuting an axis works', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      var muted = {
        'y': false
      }

      basicRadar.set('mutedAxes',muted);

      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 4);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 4);
    });

  }); //suite

  suite('px-vis-brush muting with addToMutedAxes works', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      basicRadar.addToMutedAxes('y1');
      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y2','y3']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y2','y3']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 3);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 3);
    });

  }); //suite

  suite('px-vis-brush unmuting with removeFromMutedAxes works', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){

      basicRadar.removeFromMutedAxes('y1');

      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [1,75]);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 4);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 4);
    });

  }); //suite

  suite('px-vis-brush change domains', function() {
    var basicRadar = document.getElementById('basicRadar');

    suiteSetup(function(done){

      basicRadar.set('chartExtents', {"y": [20,50]});

      setTimeout(function(){done()},250);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar drawnTickValues', function() {
      assert.deepEqual(basicRadar.drawnTickValues, [20,30,40,50]);
    });

  }); //suite

  suite('px-vis-brush adding an axis', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            "y2": 1,
            'y3': 5,
            'y4': 35
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            "y2": 21,
            'y3': 10,
            'y4': 35
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            "y2": 3,
            'y3': 15,
            'y4': 35
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            "y2": 10,
            'y3': 55,
            'y4': 35
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            "y2": 27,
            'y3': 75,
            'y4': 35
          }
        ],
        dim = ['y','y1','y2','y3','y4'];

      basicRadar.set('axes',dim);
      basicRadar.set('chartData',d);

      setTimeout(function(){done()},500);
      // done();
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3','y4']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3','y4']);
    });


    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3','y4']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 5);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 5);
    });

    test('basicRadar drawnTickValues', function() {
      assert.deepEqual(basicRadar.drawnTickValues, [20,30,40,50]);
    });
  }); //suite

  suite('px-vis-brush muting with addToMutedAxes works  with an array', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      basicRadar.addToMutedAxes(['y1','y3']);
      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y2','y4']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y2','y4']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y2','y4']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y2','y4']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 3);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 3);
    });

  }); //suite

  suite('px-vis-brush unmuting with removeFromMutedAxes works with an array', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){

      basicRadar.removeFromMutedAxes(['y1','y3']);

      setTimeout(function(){done()},250);
    });

    test('basicRadar axes', function() {
      assert.deepEqual(basicRadar.axes, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y2','y3','y4']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y2','y3','y4']);
    });

    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y2','y3','y4']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 5);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 5);
    });

  }); //suite

  suite('px-vis-brush delete an axis', function() {
    var basicRadar = document.getElementById('basicRadar');
    var colors = commonColors.properties.colors.value;
    var colorOrder = commonColors.properties.seriesColorOrder.value;
    var colorSet = commonColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1,
            'y3': 5,
            'y4': 35
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15,
            'y3': 10,
            'y4': 35
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8,
            'y3': 15,
            'y4': 35
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10,
            'y3': 55,
            'y4': 35
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20,
            'y3': 75,
            'y4': 35
          }
        ],
        dim = ['y','y1','y3','y4'];

      basicRadar.set('axes',dim);
      basicRadar.set('chartData',d);

      setTimeout(function(){done()},500);
      // done();
    });

    test('basicRadar completeSeriesConfig', function() {
      assert.isObject(basicRadar.completeSeriesConfig.x);
      assert.equal(basicRadar.completeSeriesConfig.x.color, colorSet[colorOrder[18]]);
      assert.equal(basicRadar.completeSeriesConfig.x.name, 'x');
      assert.deepEqual(basicRadar.completeSeriesConfig.x.x, ['y','y1','y3','y4']);
      assert.deepEqual(basicRadar.completeSeriesConfig.x.y, ['y','y1','y3','y4']);
    });

    test('basicRadar dimensions', function() {
      assert.deepEqual(basicRadar.dimensions, ['y','y1','y3','y4']);
    });


    test('basicRadar x', function() {
      assert.deepEqual(basicRadar.x.range(), [0,Math.PI*2]);
      assert.deepEqual(basicRadar.x.domain(), ['y','y1','y3','y4']);
    });

    test('basicRadar y', function() {
      assert.deepEqual(basicRadar.y.range(), [60,200]);
      assert.deepEqual(basicRadar.y.domain(), [20,50]);
    });

    test('basicRadar axisGroups', function() {
      assert.equal(basicRadar.axisGroups.nodes().length, 4);
    });

    test('basicRadar brushElems', function() {
      assert.equal(basicRadar.brushElems.length, 4);
    });

    test('basicRadar drawnTickValues', function() {
      assert.deepEqual(basicRadar.drawnTickValues, [20,30,40,50]);
    });
  }); //suite

}
