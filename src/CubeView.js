import React, { Component } from 'react';
import * as THREE from 'three';
import sizeMe from 'react-sizeme';
import texture_top from './img/cubeview_TOP.png';
import texture_right from './img/cubeview_RIGHT.png';
import texture_left from './img/cubeview_LEFT.png';
import texture_front from './img/cubeview_FRONT.png';
import texture_back from './img/cubeview_BACK.png';
import texture_bottom from './img/cubeview_BOTTOM.png';
import texture_shadow from './img/cubeview_SHADOW.png';
import icon_home from './img/cubeview_HOME.svg';
import icon_home_hover from './img/cubeview_HOME_hover.svg';
import * as  vertexShader from './shaders/vertexShader.vert';
import * as fragmentShader from './shaders/fragmentShader.frag';

import "./CubeView.css";

var OrbitControls = require('../../core/three-orbit-controls-cubeview')(THREE)

let renderer, scene, windowSize = { width: 0, height: 0 }, animation, controllers;
let mouse, raycaster, INTERSECTED;
let cube;


class CubeView extends Component {
    constructor(props) {
        super(props);
        this.DEBUG = this.props.DEBUG ? this.props.DEBUG : false;
        this.state = {
            icon_home: icon_home
        }


        this.hoverHomeOn = this.hoverHomeOn.bind(this);
        this.hoverHomeOff = this.hoverHomeOff.bind(this);
        this.clickHome = this.clickHome.bind(this);
    }

    componentDidMount() {
        var canvas = this.refs.threeCanvas;
        this.hoverColor = this.props.hoverColor ? this.props.hoverColor : 0x0033ff;

        this.init();
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));

        canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

        //this.mouseMoving = false;

        canvas.addEventListener("mousedown", this.onMouseDown.bind(this));

        canvas.addEventListener("mouseup", this.onMouseUp.bind(this));



    }

    onMouseDown(event) {
        this.mouseMoving = false;
    }
    onMouseUp(event) {
        if (this.mouseMoving == false) {
            console.log("click");
            if (INTERSECTED) {
                console.log(INTERSECTED.name);
                //var angle = controls.getAutoRotationAngle();
                //this.controls.rotateLeft(45);
                //this.controls.rotateLeft(45);
                //this.controls.setAzimuthalAngle(Math.PI);
                //var a = this.controls.getPolarAngle();
                this.setViewAngle(INTERSECTED.name);


                // var xAxis = new THREE.Vector3(1,1,0);
                //this.camera.rotateOnAxis( xAxis, 10 );

                //this.camera.position.set(0, this.cameraDistance, 0);
                //this.controls.update();

                //console.log("this.controls angles", (this.controls.getPolarAngle()/ Math.PI).toFixed(4), (this.controls.getAzimuthalAngle()/ Math.PI).toFixed(4));
            }
        }
        else if (this.mouseMoving = true) {
            console.log("drag");
        }
    }


    setViewAngle(name) {
        var phi, theta;

        switch (name) {
            //Faces
            case "f0": //RIGHT
                phi = Math.PI * 0.5;
                theta = Math.PI * 0.5;
                break;
            case "f1": //TOP
                phi = 0;
                theta = 0;
                break;
            case "f2": //FRONT
                phi = Math.PI * 0.5;
                theta = 0;
                break;
            case "f3": //LEFT
                phi = Math.PI * 0.5;
                theta = -Math.PI * 0.5;
                break;
            case "f4": //BOTTOM
                phi = Math.PI;
                theta = 0;
                break;
            case "f5": //BACK
                phi = Math.PI * 0.5;
                theta = Math.PI;
                break;
            //corners
            case "c0": //FRONT,TOP,RIGHT
                phi = Math.PI * 0.25;
                theta = Math.PI * 0.25;
                break;
            case "c1": //FRONT,BOTTOM, RIGHT
                phi = Math.PI * 0.75;
                theta = Math.PI * 0.25;
                break;
            case "c2": //FRONT,BOTTOM,lEFT
                phi = Math.PI * 0.75;
                theta = -Math.PI * 0.25;
                break;
            case "c3": //FRONT,TOP,lEFT
                phi = Math.PI * 0.25;
                theta = -Math.PI * 0.25;
                break;
            case "c4": //BACK,TOP,RIGHT
                phi = Math.PI * 0.25;
                theta = Math.PI * 0.75;
                break;
            case "c5": //BACK,BOTTOM,RIGHT
                phi = Math.PI * 0.75;
                theta = Math.PI * 0.75;
                break;
            case "c6": //BACK,BOTTOM,LEFT
                phi = Math.PI * 0.75;
                theta = -Math.PI * 0.75;
                break;
            case "c7": //BACK,TOP,LEFT
                phi = Math.PI * 0.25;
                theta = -Math.PI * 0.75;
                break;

            //Edges

            case "e0": //TOP,FRONT
                phi = Math.PI * 0.25;
                theta = 0;
                break;
            case "e1": //TOP,BOTTOM
                phi = Math.PI * 0.75;
                theta = 0;
                break;
            case "e2": //TOP,BACK
                phi = Math.PI * 0.25;
                theta = Math.PI;
                break;
            case "e3": //BOTTOM,BACK
                phi = Math.PI * 0.75;
                theta = Math.PI;
                break;
            case "e4": //FRONT,RIGHT
                phi = Math.PI * 0.5;
                theta = Math.PI * 0.25;
                break;
            case "e5": //FRONT,LEFT
                phi = Math.PI * 0.5;
                theta = -Math.PI * 0.25;
                break;
            case "e6": //BACK,RIGHT
                phi = Math.PI * 0.5;
                theta = Math.PI * 0.75;
                break;
            case "e7": //BACK,LEFT
                phi = Math.PI * 0.5;
                theta = -Math.PI * 0.75;
                break;
            case "e8": //BACK,LEFT
                phi = Math.PI * 0.25;
                theta = Math.PI * 0.5;
                break;
            case "e9": //TOP,RIGHT
                phi = Math.PI * 0.25;
                theta = -Math.PI * 0.5;
                break;
            case "e10": //BOTTOM,RIGHT
                phi = Math.PI * 0.75;
                theta = Math.PI * 0.5;
                break;

            case "e11": //BOTTOM,LEFT
                phi = Math.PI * 0.75;
                theta = -Math.PI * 0.5;
                break;
            default:

        }

        console.log(phi, theta);

        this.controls.setPolarAngle(phi);
        //this.controls.setPhiDelta(phi);
        //this.controls.setThetaDelta(theta);
        this.controls.setAzimuthalAngle(theta);

        //this.controls.setPolarAngle(phi);
        //this.controls.setAzimuthalAngle(theta);

        if (this.props.onUpdateAngles) {
            console.log("angles updated");
            this.props.onUpdateAngles(phi, theta);
        }
        //console.log("this.controls angles", (this.controls.getPolarAngle() / Math.PI).toFixed(4), (this.controls.getAzimuthalAngle() / Math.PI).toFixed(4));
        console.log("angles", phi, theta);

    }

    componentWillUnmount() {
        var canvas = this.refs.threeCanvas;
        renderer = null;
        scene = null;
        this.camera = null;
        window.removeEventListener("resize", this.updateDimensions.bind(this));
        canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
        canvas.removeEventListener("mouseup", this.handleClick.bind(this));
        this.controls.dispose();
    }

    updateDimensions() {

        var { width, height } = this.props.size;
        height = width / this.props.aspect;
        var canvas = this.refs.threeCanvas;
        renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

    }

    init() {
        var { width, height } = this.props.size;
        var canvas = this.refs.threeCanvas;
        height = width / this.props.aspect;

        const marginTop = this.props.marginTop;

        scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

        var antialias = this.props.antialias ? this.props.antialias : false;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: antialias, alpha: true });

        renderer.setSize(width, height);
        renderer.sortObjects = false;

        //var geometry = new THREE.SphereGeometry(3, 24, 24);
        var material = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: false });
        //mainSphere = new THREE.Mesh(geometry, material);

        var geometry = new THREE.BoxGeometry(3, 3, 3);
        cube = new THREE.Mesh(geometry, material);
        //scene.add(cube);

        var gridXZ = new THREE.GridHelper(10, 20);
        gridXZ.name = "grid";
        //scene.add(gridXZ);

        this.camera.position.z = this.props.zoom ? this.props.zoom : 8;
        this.cameraDistance = this.camera.position.z;

        //setup raycaster variables
        mouse = new THREE.Vector2();
        raycaster = new THREE.Raycaster();

        //canvas.addEventListener("mousedown", this.onClick, false)

        this._createCube();
        renderer.setPixelRatio(window.devicePixelRatio);

        /*controls*/
        this.controls = new OrbitControls(this.camera);//new OrbitControls(camera);
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.enableKeys = false;

        this.controls.setPolarAngle(Math.PI * 0.25);
        this.controls.setAzimuthalAngle(Math.PI * 0.25);
        // rotation in Y
        // controls.setAzimuthalAngle(theta);

        // rotation in X
        //controls.setPolarAngle(phi);
        this._render();
    }

    onClick(event) {

        event.preventDefault();
        var x = (event.clientX / window.innerWidth) * 2 - 1;
        var y = -(event.clientY / window.innerHeight) * 2 + 1;
        var dir = new THREE.Vector3(x, y, -1)
        dir.unproject(this.camera);

        raycaster = new THREE.Raycaster(this.camera.position, dir.sub(this.camera.position).normalize())

        var intersects = raycaster.intersectObjects(scene.children)
        if (intersects.length > 0) {
            var SELECTED = intersects[0].object;
            //scene.add(transformControl);
            //transformControl.attach(SELECTED);
            var selectedNode = SELECTED;
        } else {
            //transformControl.detach(SELECTED);
        }

    }

    onMouseMove(event) {
        this.mouseMoving = true;
        var canvas = this.refs.threeCanvas;
        var rect = canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;
        if (this.DEBUG) console.log("mouse", mouse);
    }

    _render = () => {
        animation = requestAnimationFrame(this._render);
        renderer.render(scene, this.camera);

        this.camera.updateMatrixWorld();

        raycaster.setFromCamera(mouse, this.camera);
        var intersects = raycaster.intersectObjects(controllers.children);

        if (intersects.length > 0) {
            if (this.DEBUG) console.log("intersected", intersects);
            if (INTERSECTED != intersects[0].object) {
                if (INTERSECTED) {
                    INTERSECTED.material.color.setHex(INTERSECTED.currentHex); //<--putback
                    INTERSECTED.material.visible = INTERSECTED.currVisible;

                }

                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex(); //<-putback
                
                INTERSECTED.currVisible = INTERSECTED.material.visible;

                //INTERSECTED.material.color.setHex(hoverColor);
                INTERSECTED.material.visible = true;

                if(this.DEBUG)console.log("controller",INTERSECTED.name);
                //INTERSECTED.visible = true;
            }
        } else {
            if (INTERSECTED) {
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex); //<-putback
                INTERSECTED.material.visible = INTERSECTED.currVisible;
            }

            INTERSECTED = null;

            this.controls.update();
        }
    }




    //Insert all 3D elements here
    _createCube() {
        var size = this.props.cubeSize ? this.props.cubeSize : 2;
        var axisHelper = new THREE.AxisHelper(size + 1);
        axisHelper.position.x = -size / 2 - 0.01;
        axisHelper.position.z = -size / 2 - 0.01;
        axisHelper.position.y = -size / 2 - 0.01;
        scene.add(axisHelper);

        var dir = new THREE.Vector3(1, 0, 0);

        //normalize the direction vector (convert to vector of length 1)
        dir.normalize();

        var origin = new THREE.Vector3(-size / 2, -size / 2, -size / 2);
        var length = size + 1;
        var hex = 0xff0000;

        var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
        //scene.add( arrowHelper );

        //var box = new THREE.BoxHelper( axisHelper, 0xffff00 );
        //scene.add( box );


        //Textures cube;
        //var texture_top = THREE.ImageUtils.loadTexture( "./img/texture.jpg" );

        // texture.wrapS = THREE.RepeatWrapping;
        //texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.set(4, 4);

        var top = this.createTexturedPlane(size, texture_top);
        top.position.y = size / 2;
        top.rotation.x = -Math.PI / 2;
        scene.add(top);

        var front = this.createTexturedPlane(size, texture_front);
        front.position.z = size / 2;
        scene.add(front);

        var right = this.createTexturedPlane(size, texture_right);
        right.position.x = size / 2;
        right.rotation.y = Math.PI / 2;
        scene.add(right);

        var left = this.createTexturedPlane(size, texture_left);
        left.position.x = -size / 2;
        left.rotation.y = -Math.PI / 2;
        scene.add(left);

        var back = this.createTexturedPlane(size, texture_back);
        back.position.z = -size / 2;
        back.rotation.y = Math.PI;
        scene.add(back);

        var bottom = this.createTexturedPlane(size, texture_bottom);
        bottom.position.y = -size / 2;
        bottom.rotation.x = Math.PI / 2;
        scene.add(bottom);

        var shadow = this.createTexturedPlane(size + 1.5, texture_shadow, false);
        shadow.position.y = -size / 2 - 0.4;
        shadow.rotation.x = -Math.PI / 2;
        scene.add(shadow);

        controllers = new THREE.Object3D();

        //FRONT,TOP,RIGHT
        var c0 = this.createCornerCube(size, 1, 1, 1);
        c0.name = "c0";
        controllers.add(c0);

        //FRONT,BOTTOM,RIGHT
        var c1 = this.createCornerCube(size, 1, -1, 1);
        c1.name = "c1";
        controllers.add(c1);

        //FRONT,BOTTOM,lEFT
        var c2 = this.createCornerCube(size, -1, -1, 1);
        c2.name = "c2";
        controllers.add(c2);

        //FRONT,TOP,lEFT
        var c3 = this.createCornerCube(size, -1, 1, 1);
        c3.name = "c3";
        controllers.add(c3);

        //BACK,TOP,RIGHT
        var c4 = this.createCornerCube(size, 1, 1, -1);
        c4.name = "c4";
        controllers.add(c4);

        //BACK,BOTTOM,RIGHT
        var c5 = this.createCornerCube(size, 1, -1, -1);
        c5.name = "c5";
        controllers.add(c5);

        //BACK,BOTTOM,LEFT
        var c6 = this.createCornerCube(size, -1, -1, -1);
        c6.name = "c6";
        controllers.add(c6);

        //BACK,TOP,LEFT
        var c7 = this.createCornerCube(size, -1, 1, -1);
        c7.name = "c7";
        controllers.add(c7);

        //TOP,FRONT
        var e0 = this.createEdgeCube(size, 0, 1, 1);
        e0.name = "e0";
        controllers.add(e0);

        //TOP,BOTTOM
        var e1 = this.createEdgeCube(size, 0, -1, 1);
        e1.name = "e1";
        controllers.add(e1);

        //TOP,BACK
        var e2 = this.createEdgeCube(size, 0, 1, -1);
        e2.name = "e2";
        controllers.add(e2);

        //BOTTOM,BACK
        var e3 = this.createEdgeCube(size, 0, -1, -1);
        e3.name = "e3";
        controllers.add(e3);

        //FRONT,RIGHT
        var e4 = this.createEdgeCube(size, 1, 0, 1);
        e4.name = "e4";
        controllers.add(e4);

        //FRONT,LEFT
        var e5 = this.createEdgeCube(size, -1, 0, 1);
        e5.name = "e5";
        controllers.add(e5);

        //BACK,LEFT
        var e6 = this.createEdgeCube(size, 1, 0, -1);
        e6.name = "e6";
        controllers.add(e6);

        //BACK,LEFT
        var e7 = this.createEdgeCube(size, -1, 0, -1);
        e7.name = "e7";
        controllers.add(e7);

        //BACK,LEFT
        var e8 = this.createEdgeCube(size, 1, 1, 0);
        e8.name = "e8";
        controllers.add(e8);

        //TOP,RIGHT
        var e9 = this.createEdgeCube(size, -1, 1, 0);
        e9.name = "e9";
        controllers.add(e9);

        //BOTTOM,RIGHT
        var e10 = this.createEdgeCube(size, 1, -1, 0);
        e10.name = "e10";
        controllers.add(e10);

        //BOTTOM,LEFT
        var e11 = this.createEdgeCube(size, -1, -1, 0);
        e11.name = "e11";
        controllers.add(e11);

        //RIGHT
        var f0 = this.createFaceCube(size, 1, 0, 0);
        f0.name = "f0";
        controllers.add(f0);

        //TOP
        var f1 = this.createFaceCube(size, 0, 1, 0);
        f1.name = "f1";
        controllers.add(f1);

        //FRONT
        var f2 = this.createFaceCube(size, 0, 0, 1);
        f2.name = "f2";
        controllers.add(f2);

        //LEFT
        var f3 = this.createFaceCube(size, -1, 0, 0);
        f3.name = "f3";
        controllers.add(f3);

        //BOTTOM
        var f4 = this.createFaceCube(size, 0, -1, 0);
        f4.name = "f4";
        controllers.add(f4);

        //BACK
        var f5 = this.createFaceCube(size, 0, 0, -1);
        f5.name = "f5";
        controllers.add(f5);

        scene.add(controllers);
    }

    createFaceCube(size, x, y, z) {
        var c_cube = size / 4; //corner cubes
        var sizex = c_cube;
        var sizey = c_cube;
        var sizez = c_cube;

        if (x == 0) {
            sizey = size / 2;
            sizez = size / 2;
        }
        if (y == 0) {
            sizex = size / 2;
            sizez = size / 2;
        }
        if (z == 0) {
            sizex = size / 2;
            sizey = size / 2;
        }

        var _x = x * 1.01;
        var _y = y * 1.01;
        var _z = z * 1.01;

        /*
        var material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            visible:true
        });

        //material.transparent = true;
        */

        var material = new THREE.MeshBasicMaterial({ color: this.hoverColor, transparent: true, opacity: 0.5, visible: false }); //change to false later
        var geometry = new THREE.BoxGeometry(sizex, sizey, sizez);

        var edgeCube = new THREE.Mesh(geometry, material);
        if (x > 0)
            edgeCube.position.x = (size / 2) * _x - sizex / 2;
        else
            edgeCube.position.x = x == 0 ? 0 : (size / 2) * _x + sizex / 2;
        if (y > 0)
            edgeCube.position.y = (size / 2) * _y - sizey / 2;
        else
            edgeCube.position.y = y == 0 ? 0 : (size / 2) * _y + sizey / 2;
        if (z > 0)
            edgeCube.position.z = (size / 2) * _z - sizez / 2;
        else
            edgeCube.position.z = z == 0 ? 0 : (size / 2) * _z + sizez / 2;

        return edgeCube
    }

    createEdgeCube(size, x, y, z) {

        var c_cube = size / 4; //corner cubes
        var sizex = c_cube;
        var sizey = c_cube;
        var sizez = c_cube;

        if (x == 0) {
            sizex = size / 2;
        }
        if (y == 0) {
            sizey = size / 2;
        }
        if (z == 0) {
            sizez = size / 2;
        }
        var _x = x * 1.01;
        var _y = y * 1.01;
        var _z = z * 1.01;

        var c_cube = size / 4; //corner cubes
        //*creating small cubs
        var material = new THREE.MeshBasicMaterial({ color: this.hoverColor, transparent: true, opacity: 0.5, visible: false, side: THREE.DoubleSide }); //change to false later
        var geometry = new THREE.BoxGeometry(sizex, sizey, sizez);

        var edgeCube = new THREE.Mesh(geometry, material);
        if (x > 0)
            edgeCube.position.x = (size / 2) * _x - sizex / 2;
        else
            edgeCube.position.x = x == 0 ? 0 : (size / 2) * _x + sizex / 2;
        if (y > 0)
            edgeCube.position.y = (size / 2) * _y - sizey / 2;
        else
            edgeCube.position.y = y == 0 ? 0 : (size / 2) * _y + sizey / 2;
        if (z > 0)
            edgeCube.position.z = (size / 2) * _z - sizez / 2;
        else
            edgeCube.position.z = z == 0 ? 0 : (size / 2) * _z + sizez / 2;

        return edgeCube

    }

    createCornerCube(size, x, y, z) {
        var _x = x * 1.01;
        var _y = y * 1.01;
        var _z = z * 1.01;
        var c_cube = size / 4; //corner cubes
        //*creating small cubs
        var material = new THREE.MeshBasicMaterial({ color: this.hoverColor, transparent: true, opacity: 0.5, visible: false });
        var geometry = new THREE.BoxGeometry(c_cube, c_cube, c_cube);

        var cornerCube = new THREE.Mesh(geometry, material);
        if (x > 0)
            cornerCube.position.x = (size / 2) * _x - c_cube / 2;
        else
            cornerCube.position.x = (size / 2) * _x + c_cube / 2;
        if (y > 0)
            cornerCube.position.y = (size / 2) * _y - c_cube / 2;
        else
            cornerCube.position.y = (size / 2) * _y + c_cube / 2;
        if (z > 0)
            cornerCube.position.z = (size / 2) * _z - c_cube / 2;
        else
            cornerCube.position.z = (size / 2) * _z + c_cube / 2;

        return cornerCube;
    }

    createTexturedPlane(size, texturePath, side = THREE.DoubleSide) {
        var texture = new THREE.TextureLoader().load(texturePath);
        var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, visible: true, side: side });
        var geometry = new THREE.PlaneGeometry(size, size);
        var mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    hoverHomeOn() {
        this.setState({ icon_home: icon_home_hover })
        //this.icon_home = icon_home_hover;
    }

    hoverHomeOff() {
        this.setState({ icon_home: icon_home })
    }

    clickHome() {
        this.controls.setPolarAngle(Math.PI * 0.25);
        this.controls.setAzimuthalAngle(Math.PI * 0.25);
        //this.controls.reset();
        if (this.props.onUpdateAngles) {
            console.log("angles updated");
            this.props.onUpdateAngles(Math.PI * 0.25, Math.PI * 0.25);
        }
    }

    render() {
        var { width, height } = this.props.size;

        return (
            <div className="cube-view-container">

                <img src={this.state.icon_home} className="button-home"
                    onMouseOver={this.hoverHomeOn}
                    onMouseOut={
                        this.hoverHomeOff
                    }
                    onClick={this.clickHome}
                />

                <canvas ref="threeCanvas" ></canvas>
            </div>
        );
    }


}

//export default Container3;
export default sizeMe({ monitorHeight: true, refreshRate: 80, monitorPosition: true })(CubeView)

