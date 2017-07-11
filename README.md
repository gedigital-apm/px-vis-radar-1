#Px-Vis-Radar


## Overview

Px-Vis-Radar is a Predix UI component

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install Px-Vis-Radar --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/Px-Vis-Radar/Px-Vis-Radar.html"/>
```

Finally, use the component in your application:

```
  <px-vis-radar
    width="1300"
    height="500"
    chart-data="[[chartData]]"
    series-key="TimeStamp"
    axes='["axis1","axis2","axis3"]'>
  </px-vis-radar>

```

<br />
<hr />

## documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-vis-radar).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/Px-Vis-Radar/issues) to submit any bugs you might find.
