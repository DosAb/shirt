// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()



const card = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 4, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(card)

const shirtTexture = textureLoader.load('./static/shirtTexture.png')
shirtTexture.flipY = false

// Load a GLTF model
const loader = new THREE.GLTFLoader();
loader.load('./static/shirt.glb', (model)=>{
    const modelMesh = model.scene.children[0]
    modelMesh.material = new THREE.MeshStandardMaterial({map: shirtTexture})

    // modelMesh.scale.set(10)
    scene.add(modelMesh)
    console.log(modelMesh)
})

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, intensity
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // Position the light
scene.add(directionalLight);

// Point Light
const pointLight = new THREE.PointLight(0xff0000, 1, 100); // Color, intensity, distance
pointLight.position.set(2, 2, 2); // Position the light
scene.add(pointLight);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



//Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = true


const clock = new THREE.Clock()

const tick = () =>
{
   const elapsedTime = clock.getElapsedTime()

   // Update material

   // Update controls
   controls.update()

   // Render
   renderer.render(scene, camera)

   // Call tick again on the next frame
   window.requestAnimationFrame(tick)
}

tick()