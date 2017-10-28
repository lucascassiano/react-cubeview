# react-cubeview

3D camera controller - based on autodesk's Fusion360 cube view 

![alt text](https://github.com/lucascassiano/react-cubeview/raw/master/docs/cubeview.gif)

## Reference
This UI Component is based on Autodesk's Cube view controller from Fusion360 (and many other Autodesk Solutions):
![original cube](https://github.com/lucascassiano/react-cubeview/raw/master/docs/original.gif)

## Details
This component uses a 'hacked' version of the three.js orbit controls. I just added few methods to make the callbacks simpler.

## Install
```
npm install --save react-cubeview
```

## Example
```
import CubeView from 'react-cubeview';

...

<CubeView 
    aspect={1} 
    hoverColor={0x0088FF} 
    cubeSize={2} 
    zoom={6} 
    antialias={true} 
    onUpdateAngles={this.updateAngles} 
/>
```

## Callback - onUpdateAngles
```
function myCustomCallback(phi, theta){
    ...
    update main camera
    ...
}
```