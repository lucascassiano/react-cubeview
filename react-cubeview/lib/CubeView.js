'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _reactSizeme = require('react-sizeme');

var _reactSizeme2 = _interopRequireDefault(_reactSizeme);

var _imgCubeview_TOPPng = require('./img/cubeview_TOP.png');

var _imgCubeview_TOPPng2 = _interopRequireDefault(_imgCubeview_TOPPng);

var _imgCubeview_RIGHTPng = require('./img/cubeview_RIGHT.png');

var _imgCubeview_RIGHTPng2 = _interopRequireDefault(_imgCubeview_RIGHTPng);

var _imgCubeview_LEFTPng = require('./img/cubeview_LEFT.png');

var _imgCubeview_LEFTPng2 = _interopRequireDefault(_imgCubeview_LEFTPng);

var _imgCubeview_FRONTPng = require('./img/cubeview_FRONT.png');

var _imgCubeview_FRONTPng2 = _interopRequireDefault(_imgCubeview_FRONTPng);

var _imgCubeview_BACKPng = require('./img/cubeview_BACK.png');

var _imgCubeview_BACKPng2 = _interopRequireDefault(_imgCubeview_BACKPng);

var _imgCubeview_BOTTOMPng = require('./img/cubeview_BOTTOM.png');

var _imgCubeview_BOTTOMPng2 = _interopRequireDefault(_imgCubeview_BOTTOMPng);

var _imgCubeview_SHADOWPng = require('./img/cubeview_SHADOW.png');

var _imgCubeview_SHADOWPng2 = _interopRequireDefault(_imgCubeview_SHADOWPng);

var _imgCubeview_HOMESvg = require('./img/cubeview_HOME.svg');

var _imgCubeview_HOMESvg2 = _interopRequireDefault(_imgCubeview_HOMESvg);

var _imgCubeview_HOME_hoverSvg = require('./img/cubeview_HOME_hover.svg');

var _imgCubeview_HOME_hoverSvg2 = _interopRequireDefault(_imgCubeview_HOME_hoverSvg);

require('./CubeView.css');

var OrbitControls = require('./OrbitControls')(THREE);

var renderer = undefined,
    scene = undefined,
    windowSize = { width: 0, height: 0 },
    animation = undefined,
    controllers = undefined;
var mouse = undefined,
    raycaster = undefined,
    INTERSECTED = undefined;
var cube = undefined;

var CubeView = (function (_Component) {
    _inherits(CubeView, _Component);

    function CubeView(props) {
        _classCallCheck(this, CubeView);

        _get(Object.getPrototypeOf(CubeView.prototype), 'constructor', this).call(this, props);
        this.DEBUG = this.props.DEBUG ? this.props.DEBUG : false;
        this.state = {
            icon_home: _imgCubeview_HOMESvg2['default']
        };

        this.hoverHomeOn = this.hoverHomeOn.bind(this);
        this.hoverHomeOff = this.hoverHomeOff.bind(this);
        this.clickHome = this.clickHome.bind(this);
    }

    //export default Container3;

    _createClass(CubeView, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            var canvas = this.refs.threeCanvas;
            this.hoverColor = this.props.hoverColor ? this.props.hoverColor : 0x0033ff;

            this.relatedCanvas = this.props.relatedCanvas();

            //if(this.relatedCanvas)
            this.init();
            this.updateDimensions();
            window.addEventListener('resize', this.updateDimensions.bind(this));

            canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

            //this.mouseMoving = false;

            canvas.addEventListener('mousedown', this.onMouseDown.bind(this));

            canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(event) {
            this.mouseMoving = false;
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(event) {
            if (this.mouseMoving == false) {
                console.log('click');
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

                    //console.log('this.controls angles', (this.controls.getPolarAngle()/ Math.PI).toFixed(4), (this.controls.getAzimuthalAngle()/ Math.PI).toFixed(4));
                }
            } else if (this.mouseMoving = true) {
                    console.log('drag');
                }
        }
    }, {
        key: 'setViewAngle',
        value: function setViewAngle(name) {
            var phi, theta;

            switch (name) {
                //Faces
                case 'f0':
                    //RIGHT
                    phi = Math.PI * 0.5;
                    theta = Math.PI * 0.5;
                    break;
                case 'f1':
                    //TOP
                    phi = 0;
                    theta = 0;
                    break;
                case 'f2':
                    //FRONT
                    phi = Math.PI * 0.5;
                    theta = 0;
                    break;
                case 'f3':
                    //LEFT
                    phi = Math.PI * 0.5;
                    theta = -Math.PI * 0.5;
                    break;
                case 'f4':
                    //BOTTOM
                    phi = Math.PI;
                    theta = 0;
                    break;
                case 'f5':
                    //BACK
                    phi = Math.PI * 0.5;
                    theta = Math.PI;
                    break;
                //corners
                case 'c0':
                    //FRONT,TOP,RIGHT
                    phi = Math.PI * 0.25;
                    theta = Math.PI * 0.25;
                    break;
                case 'c1':
                    //FRONT,BOTTOM, RIGHT
                    phi = Math.PI * 0.75;
                    theta = Math.PI * 0.25;
                    break;
                case 'c2':
                    //FRONT,BOTTOM,lEFT
                    phi = Math.PI * 0.75;
                    theta = -Math.PI * 0.25;
                    break;
                case 'c3':
                    //FRONT,TOP,lEFT
                    phi = Math.PI * 0.25;
                    theta = -Math.PI * 0.25;
                    break;
                case 'c4':
                    //BACK,TOP,RIGHT
                    phi = Math.PI * 0.25;
                    theta = Math.PI * 0.75;
                    break;
                case 'c5':
                    //BACK,BOTTOM,RIGHT
                    phi = Math.PI * 0.75;
                    theta = Math.PI * 0.75;
                    break;
                case 'c6':
                    //BACK,BOTTOM,LEFT
                    phi = Math.PI * 0.75;
                    theta = -Math.PI * 0.75;
                    break;
                case 'c7':
                    //BACK,TOP,LEFT
                    phi = Math.PI * 0.25;
                    theta = -Math.PI * 0.75;
                    break;

                //Edges

                case 'e0':
                    //TOP,FRONT
                    phi = Math.PI * 0.25;
                    theta = 0;
                    break;
                case 'e1':
                    //TOP,BOTTOM
                    phi = Math.PI * 0.75;
                    theta = 0;
                    break;
                case 'e2':
                    //TOP,BACK
                    phi = Math.PI * 0.25;
                    theta = Math.PI;
                    break;
                case 'e3':
                    //BOTTOM,BACK
                    phi = Math.PI * 0.75;
                    theta = Math.PI;
                    break;
                case 'e4':
                    //FRONT,RIGHT
                    phi = Math.PI * 0.5;
                    theta = Math.PI * 0.25;
                    break;
                case 'e5':
                    //FRONT,LEFT
                    phi = Math.PI * 0.5;
                    theta = -Math.PI * 0.25;
                    break;
                case 'e6':
                    //BACK,RIGHT
                    phi = Math.PI * 0.5;
                    theta = Math.PI * 0.75;
                    break;
                case 'e7':
                    //BACK,LEFT
                    phi = Math.PI * 0.5;
                    theta = -Math.PI * 0.75;
                    break;
                case 'e8':
                    //BACK,LEFT
                    phi = Math.PI * 0.25;
                    theta = Math.PI * 0.5;
                    break;
                case 'e9':
                    //TOP,RIGHT
                    phi = Math.PI * 0.25;
                    theta = -Math.PI * 0.5;
                    break;
                case 'e10':
                    //BOTTOM,RIGHT
                    phi = Math.PI * 0.75;
                    theta = Math.PI * 0.5;
                    break;

                case 'e11':
                    //BOTTOM,LEFT
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
                console.log('angles updated');
                this.props.onUpdateAngles(phi, theta);
            }
            //console.log('this.controls angles', (this.controls.getPolarAngle() / Math.PI).toFixed(4), (this.controls.getAzimuthalAngle() / Math.PI).toFixed(4));
            console.log('angles', phi, theta);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var canvas = this.refs.threeCanvas;
            renderer = null;
            scene = null;
            this.camera = null;
            window.removeEventListener('resize', this.updateDimensions.bind(this));
            canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
            canvas.removeEventListener('mouseup', this.handleClick.bind(this));
            this.controls.dispose();
        }
    }, {
        key: 'updateDimensions',
        value: function updateDimensions() {
            var _props$size = this.props.size;
            var width = _props$size.width;
            var height = _props$size.height;

            height = width / this.props.aspect;
            var canvas = this.refs.threeCanvas;
            renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }, {
        key: 'init',
        value: function init() {
            var _props$size2 = this.props.size;
            var width = _props$size2.width;
            var height = _props$size2.height;

            var canvas = this.refs.threeCanvas;
            height = width / this.props.aspect;

            var marginTop = this.props.marginTop;

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
            gridXZ.name = 'grid';
            //scene.add(gridXZ);

            this.camera.position.z = this.props.zoom ? this.props.zoom : 8;
            this.cameraDistance = this.camera.position.z;

            //setup raycaster variables
            mouse = new THREE.Vector2();
            raycaster = new THREE.Raycaster();

            //canvas.addEventListener('mousedown', this.onClick, false)

            this._createCube();
            renderer.setPixelRatio(window.devicePixelRatio);

            /*controls*/

            if (this.relatedCanvas) {
                this.controls = new OrbitControls(this.camera, this.relatedCanvas);
            } else {
                this.controls = new OrbitControls(this.camera); //new OrbitControls(camera);
            }

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
    }, {
        key: 'onClick',
        value: function onClick(event) {
            event.preventDefault();
            var x = event.clientX / window.innerWidth * 2 - 1;
            var y = -(event.clientY / window.innerHeight) * 2 + 1;
            var dir = new THREE.Vector3(x, y, -1);
            dir.unproject(this.camera);

            raycaster = new THREE.Raycaster(this.camera.position, dir.sub(this.camera.position).normalize());

            var intersects = raycaster.intersectObjects(scene.children);

            if (intersects.length > 0) {
                var SELECTED = intersects[0].object;
                //scene.add(transformControl);
                //transformControl.attach(SELECTED);
                var selectedNode = SELECTED;
            } else {
                //transformControl.detach(SELECTED);
            }
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(event) {
            this.mouseMoving = true;
            var canvas = this.refs.threeCanvas;
            var rect = canvas.getBoundingClientRect();
            mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            if (this.DEBUG) console.log('mouse', mouse);
        }
    }, {
        key: '_render',
        value: function _render() {
            animation = requestAnimationFrame(this._render);
            renderer.render(scene, this.camera);

            this.camera.updateMatrixWorld();

            raycaster.setFromCamera(mouse, this.camera);
            var intersects = raycaster.intersectObjects(controllers.children);

            if (intersects.length > 0) {
                if (this.DEBUG) console.log('intersected', intersects);
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

                    if (this.DEBUG) console.log('controller', INTERSECTED.name);
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
    }, {
        key: '_createCube',
        value: function _createCube() {
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
            //var texture_top = THREE.ImageUtils.loadTexture( './img/texture.jpg' );

            // texture.wrapS = THREE.RepeatWrapping;
            //texture.wrapT = THREE.RepeatWrapping;
            //texture.repeat.set(4, 4);

            var top = this.createTexturedPlane(size, _imgCubeview_TOPPng2['default']);
            top.position.y = size / 2;
            top.rotation.x = -Math.PI / 2;
            scene.add(top);

            var front = this.createTexturedPlane(size, _imgCubeview_FRONTPng2['default']);
            front.position.z = size / 2;
            scene.add(front);

            var right = this.createTexturedPlane(size, _imgCubeview_RIGHTPng2['default']);
            right.position.x = size / 2;
            right.rotation.y = Math.PI / 2;
            scene.add(right);

            var left = this.createTexturedPlane(size, _imgCubeview_LEFTPng2['default']);
            left.position.x = -size / 2;
            left.rotation.y = -Math.PI / 2;
            scene.add(left);

            var back = this.createTexturedPlane(size, _imgCubeview_BACKPng2['default']);
            back.position.z = -size / 2;
            back.rotation.y = Math.PI;
            scene.add(back);

            var bottom = this.createTexturedPlane(size, _imgCubeview_BOTTOMPng2['default']);
            bottom.position.y = -size / 2;
            bottom.rotation.x = Math.PI / 2;
            scene.add(bottom);

            var shadow = this.createTexturedPlane(size + 1.5, _imgCubeview_SHADOWPng2['default'], false);
            shadow.position.y = -size / 2 - 0.4;
            shadow.rotation.x = -Math.PI / 2;
            scene.add(shadow);

            controllers = new THREE.Object3D();

            //FRONT,TOP,RIGHT
            var c0 = this.createCornerCube(size, 1, 1, 1);
            c0.name = 'c0';
            controllers.add(c0);

            //FRONT,BOTTOM,RIGHT
            var c1 = this.createCornerCube(size, 1, -1, 1);
            c1.name = 'c1';
            controllers.add(c1);

            //FRONT,BOTTOM,lEFT
            var c2 = this.createCornerCube(size, -1, -1, 1);
            c2.name = 'c2';
            controllers.add(c2);

            //FRONT,TOP,lEFT
            var c3 = this.createCornerCube(size, -1, 1, 1);
            c3.name = 'c3';
            controllers.add(c3);

            //BACK,TOP,RIGHT
            var c4 = this.createCornerCube(size, 1, 1, -1);
            c4.name = 'c4';
            controllers.add(c4);

            //BACK,BOTTOM,RIGHT
            var c5 = this.createCornerCube(size, 1, -1, -1);
            c5.name = 'c5';
            controllers.add(c5);

            //BACK,BOTTOM,LEFT
            var c6 = this.createCornerCube(size, -1, -1, -1);
            c6.name = 'c6';
            controllers.add(c6);

            //BACK,TOP,LEFT
            var c7 = this.createCornerCube(size, -1, 1, -1);
            c7.name = 'c7';
            controllers.add(c7);

            //TOP,FRONT
            var e0 = this.createEdgeCube(size, 0, 1, 1);
            e0.name = 'e0';
            controllers.add(e0);

            //TOP,BOTTOM
            var e1 = this.createEdgeCube(size, 0, -1, 1);
            e1.name = 'e1';
            controllers.add(e1);

            //TOP,BACK
            var e2 = this.createEdgeCube(size, 0, 1, -1);
            e2.name = 'e2';
            controllers.add(e2);

            //BOTTOM,BACK
            var e3 = this.createEdgeCube(size, 0, -1, -1);
            e3.name = 'e3';
            controllers.add(e3);

            //FRONT,RIGHT
            var e4 = this.createEdgeCube(size, 1, 0, 1);
            e4.name = 'e4';
            controllers.add(e4);

            //FRONT,LEFT
            var e5 = this.createEdgeCube(size, -1, 0, 1);
            e5.name = 'e5';
            controllers.add(e5);

            //BACK,LEFT
            var e6 = this.createEdgeCube(size, 1, 0, -1);
            e6.name = 'e6';
            controllers.add(e6);

            //BACK,LEFT
            var e7 = this.createEdgeCube(size, -1, 0, -1);
            e7.name = 'e7';
            controllers.add(e7);

            //BACK,LEFT
            var e8 = this.createEdgeCube(size, 1, 1, 0);
            e8.name = 'e8';
            controllers.add(e8);

            //TOP,RIGHT
            var e9 = this.createEdgeCube(size, -1, 1, 0);
            e9.name = 'e9';
            controllers.add(e9);

            //BOTTOM,RIGHT
            var e10 = this.createEdgeCube(size, 1, -1, 0);
            e10.name = 'e10';
            controllers.add(e10);

            //BOTTOM,LEFT
            var e11 = this.createEdgeCube(size, -1, -1, 0);
            e11.name = 'e11';
            controllers.add(e11);

            //RIGHT
            var f0 = this.createFaceCube(size, 1, 0, 0);
            f0.name = 'f0';
            controllers.add(f0);

            //TOP
            var f1 = this.createFaceCube(size, 0, 1, 0);
            f1.name = 'f1';
            controllers.add(f1);

            //FRONT
            var f2 = this.createFaceCube(size, 0, 0, 1);
            f2.name = 'f2';
            controllers.add(f2);

            //LEFT
            var f3 = this.createFaceCube(size, -1, 0, 0);
            f3.name = 'f3';
            controllers.add(f3);

            //BOTTOM
            var f4 = this.createFaceCube(size, 0, -1, 0);
            f4.name = 'f4';
            controllers.add(f4);

            //BACK
            var f5 = this.createFaceCube(size, 0, 0, -1);
            f5.name = 'f5';
            controllers.add(f5);

            scene.add(controllers);
        }
    }, {
        key: 'createFaceCube',
        value: function createFaceCube(size, x, y, z) {
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

            var material = new THREE.MeshBasicMaterial({ color: this.hoverColor, transparent: true, opacity: 0.5, visible: false }); //change to false later
            var geometry = new THREE.BoxGeometry(sizex, sizey, sizez);

            var edgeCube = new THREE.Mesh(geometry, material);
            if (x > 0) {
                edgeCube.position.x = size / 2 * _x - sizex / 2;
            } else {
                edgeCube.position.x = x == 0 ? 0 : size / 2 * _x + sizex / 2;
            }

            if (y > 0) {
                edgeCube.position.y = size / 2 * _y - sizey / 2;
            } else {
                edgeCube.position.y = y == 0 ? 0 : size / 2 * _y + sizey / 2;
            }

            if (z > 0) {
                edgeCube.position.z = size / 2 * _z - sizez / 2;
            } else {
                edgeCube.position.z = z == 0 ? 0 : size / 2 * _z + sizez / 2;
            }

            return edgeCube;
        }
    }, {
        key: 'createEdgeCube',
        value: function createEdgeCube(size, x, y, z) {

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
            if (x > 0) {
                edgeCube.position.x = size / 2 * _x - sizex / 2;
            } else {
                edgeCube.position.x = x == 0 ? 0 : size / 2 * _x + sizex / 2;
            }

            if (y > 0) {
                edgeCube.position.y = size / 2 * _y - sizey / 2;
            } else {
                edgeCube.position.y = y == 0 ? 0 : size / 2 * _y + sizey / 2;
            }

            if (z > 0) {
                edgeCube.position.z = size / 2 * _z - sizez / 2;
            } else {
                edgeCube.position.z = z == 0 ? 0 : size / 2 * _z + sizez / 2;
            }

            return edgeCube;
        }
    }, {
        key: 'createCornerCube',
        value: function createCornerCube(size, x, y, z) {
            var _x = x * 1.01;
            var _y = y * 1.01;
            var _z = z * 1.01;
            var c_cube = size / 4; //corner cubes
            //*creating small cubs
            var material = new THREE.MeshBasicMaterial({ color: this.hoverColor, transparent: true, opacity: 0.5, visible: false });
            var geometry = new THREE.BoxGeometry(c_cube, c_cube, c_cube);

            var cornerCube = new THREE.Mesh(geometry, material);
            if (x > 0) {
                cornerCube.position.x = size / 2 * _x - c_cube / 2;
            } else {
                cornerCube.position.x = size / 2 * _x + c_cube / 2;
            }
            if (y > 0) {
                cornerCube.position.y = size / 2 * _y - c_cube / 2;
            } else {
                cornerCube.position.y = size / 2 * _y + c_cube / 2;
            }
            if (z > 0) {
                cornerCube.position.z = size / 2 * _z - c_cube / 2;
            } else {
                cornerCube.position.z = size / 2 * _z + c_cube / 2;
            }
            return cornerCube;
        }
    }, {
        key: 'createTexturedPlane',
        value: function createTexturedPlane(size, texturePath) {
            var side = arguments.length <= 2 || arguments[2] === undefined ? THREE.DoubleSide : arguments[2];

            var texture = new THREE.TextureLoader().load(texturePath);
            var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, visible: true, side: side });
            var geometry = new THREE.PlaneGeometry(size, size);
            var mesh = new THREE.Mesh(geometry, material);
            return mesh;
        }
    }, {
        key: 'hoverHomeOn',
        value: function hoverHomeOn() {
            this.setState({ icon_home: _imgCubeview_HOME_hoverSvg2['default'] });
            //this.icon_home = icon_home_hover;
        }
    }, {
        key: 'hoverHomeOff',
        value: function hoverHomeOff() {
            this.setState({ icon_home: _imgCubeview_HOMESvg2['default'] });
        }
    }, {
        key: 'clickHome',
        value: function clickHome() {
            this.controls.setPolarAngle(Math.PI * 0.25);
            this.controls.setAzimuthalAngle(Math.PI * 0.25);
            //this.controls.reset();
            if (this.props.onUpdateAngles) {
                console.log('angles updated');
                this.props.onUpdateAngles(Math.PI * 0.25, Math.PI * 0.25);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$size3 = this.props.size;
            var width = _props$size3.width;
            var height = _props$size3.height;

            return _react2['default'].createElement(
                'div',
                { className: 'cube-view-container' },
                _react2['default'].createElement('img', { src: this.state.icon_home, className: 'button-home',
                    onMouseOver: this.hoverHomeOn,
                    onMouseOut: this.hoverHomeOff,
                    onClick: this.clickHome
                }),
                _react2['default'].createElement('canvas', { ref: 'threeCanvas' })
            );
        }
    }]);

    return CubeView;
})(_react.Component);

exports['default'] = (0, _reactSizeme2['default'])({ monitorHeight: true, refreshRate: 80, monitorPosition: true })(CubeView);
module.exports = exports['default'];