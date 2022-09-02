import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.143.0/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  1, 1000
);
camera.position.z = 1;
camera.rotation.x = 1.16;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;

const renderer = new THREE.WebGL1Renderer( {
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
scene.fog = new THREE.FogExp2(0x42062b, 0.001);
renderer.setClearColor(scene.fog.color);

const cloudTexture = new THREE.TextureLoader().load('smoke-1.png');
let cloudParticles = [];
for (let i = 0; i < 118; i++) {
  const cloud = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(400, 400),
    new THREE.MeshLambertMaterial({ map: cloudTexture, transparent: true })
  );
  cloud.position.set(
    (Math.random() - 0.5) * 800,
    Math.random()*800 +216,
    (Math.random() - 0.5) * 88
  );
  cloud.rotation.x = 1.16;
  cloud.rotation.y = -0.12;
  cloud.rotation.z = Math.random() * 6.6;
  cloud.material.opacity = 0.55;
  cloudParticles.push(cloud);
  scene.add(cloud);
}
renderer.render(scene, camera);

let directionalLight = new THREE.DirectionalLight(0xe23fe8, 1); //0x3fe992
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

let ambient = new THREE.AmbientLight(0x555555);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xb409ed);
pointLight.position.setX(35);

scene.add(pointLight);

const planettexture = new THREE.TextureLoader().load('kp.jpeg');
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(120, 80, 80),
  new THREE.MeshStandardMaterial({
    map: planettexture,
  })
);
scene.add(planet);
planet.position.set(500, 750 , -450);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);
function animate() {
  requestAnimationFrame(animate);
  planet.rotation.z += 0.002;
  cloudParticles.forEach(i => {
    i.rotation.z -= 0.001;
  })
  renderer.render(scene, camera);
}
animate();
