import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import CubeView from "./../src";
import "./../src/css/cubeview.css";
/*
import CubeView from 'react-cubeview';
//optional css file
import 'react-cubeview/dist/react-cubeview.css';

//render()...

<CubeView 
    aspect={1} 
    hoverColor={0x0088FF} 
    cubeSize={2} 
    zoom={6} 
    antialias={true} 
    onUpdateAngles={this.updateAngles} 
/>

*/
export default class test1 extends Component {
    render() {
        return ( <
            div className = "canvas-3d" >
            <
            CubeView aspect = { 1 }
            hoverColor = { 0x0088FF }
            cubeSize = { 2 }
            zoom = { 6 }
            antialias = { true }
            onUpdateAngles = { this.updateAngles }
            /> < /
            div >
        );
    }
}