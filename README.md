# react-cubeview

3D camera controller - based on autodesk's Fusion360 cube view 

![alt text](https://github.com/lucascassiano/react-cubeview/raw/master/docs/cubeview.gif)

## UI Reference
This UI Component is based on Autodesk's Cube view controller from Fusion360 (and many other Autodesk Solutions like ecad.io):

![original cube](https://github.com/lucascassiano/react-cubeview/raw/master/docs/original.gif)

## Details
This component uses a 'hacked' version of the three.js orbit controls. I just added few methods to make the callbacks simpler.

## Demo & Examples

Demos (using storybook)
 [lucascassiano.github.io/react-cubeview](http://lucascassiano.github.io/react-cubeview/)

To build the examples locally, run:

```
git clone https://github.com/lucascassiano/react-cubeview
cd ./react-cubeview/
npm install
npm start
```

local storybook will run at [`localhost:6060`](http://localhost:6060)

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
    width={200}
    height={200}
/>

```

### Callback - onUpdateAngles
This component is designed to be used as a controller of another three.js environment, possibly using other OrbitControls object. -- See examples, at the storyboard page.
```js
function myCustomUpdatedAngles(phi, theta){
    //...
    update main camera
    //...
}
/
//...

<CubeView 
    aspect={1} 
    hoverColor={0x0088FF} 
    cubeSize={2} 
    zoom={6} 
    antialias={true} 
    width={200}
    height={200}
    onUpdateAngles={this.myCustomUpdatedAngles} 
/>

```

## Donation
if this was useful to you and you want to contribute so more tools like that can be developed:
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="H8KLQJXPQTZUJ">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>

### Notes
TODO

- Add controls for 90º rotations
- Improve OrbitControls.js

## License

MIT

Copyright (c) 2017 lucascassiano.

