import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

console.log("BLEH");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0,2,22)
camera.rotation.x += 100

renderer.toneMapping = THREE.ACESFilmicToneMapping;

const hdri = new RGBELoader();
hdri.load("web_assets/gamrig_2k.hdr", function(texture) {
	texture.mapping = THREE.EquirectangularReflectionMapping;
	scene.background = texture;
	scene.environment = texture;

	var loader = new GLTFLoader();
	var obj;
	loader.load("web_assets/website.gltf", function(gltf) {
	obj = gltf.scene;
	scene.add(gltf.scene);
})
})


const controls = new OrbitControls( camera, renderer.domElement );

const Hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 0.2);
scene.add(Hemi);

const direct = new THREE.DirectionalLight(0xffffff, 2);
scene.add(direct);

function animate() {
	requestAnimationFrame( animate );
	window.addEventListener('resize', onWindowResize, false);
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	  }	  
	renderer.render( scene, camera );

	controls.update();

}

animate();

