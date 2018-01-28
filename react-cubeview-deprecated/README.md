# react-cubeview

3D camera controller - based on autodesk's Fusion360 cube view 

![alt text](https://github.com/lucascassiano/react-cubeview/raw/master/docs/cubeview.gif)

## UI Reference
This UI Component is based on Autodesk's Cube view controller from Fusion360 (and many other Autodesk Solutions like ecad.io):

![original cube](https://github.com/lucascassiano/react-cubeview/raw/master/docs/original.gif)

## Details
This component uses a 'hacked' version of the three.js orbit controls. I just added few methods to make the callbacks simpler.

## Demo & Examples

Live demo: [lucascassiano.github.io/react-cubeview](http://lucascassiano.github.io/react-cubeview/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

## Installation

```
npm install react-cubeview --save
```

## Usage

```js
import CubeView from 'react-cubeview';
//optional css file
import 'react-cubeview/lib/css/react-cubeview.css';

//render()...

<CubeView 
    aspect={1} 
    hoverColor={0x0088FF} 
    cubeSize={2} 
    zoom={6} 
    antialias={true} 
    onUpdateAngles={this.updateAngles} 
/>

```

### Callback - onUpdateAngles

```js
//custom callback - useful for rotation sync
function updateAngles(phi, theta){
    //...
    update main camera
    //...
}
```

### Notes
TODO

- Add controls for 90º rotations
- Improve OrbitControls.js

## License

MIT

Copyright (c) 2017 lucascassiano.

