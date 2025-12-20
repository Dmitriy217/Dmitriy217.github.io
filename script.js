let camera, scene, renderer, canvas;
let moveVector = new THREE.Vector2(0,0);
let lookVector = new THREE.Vector2(0,0);
let velocity = new THREE.Vector3(0,0,0);
let canJump = true;
let score = 0;
const collectibles = [];

const startScreen = document.getElementById('startScreen');
const errorScreen = document.getElementById('errorScreen');

document.getElementById('startBtn').addEventListener('touchstart', startGame, { passive: false });
document.getElementById('startBtn').addEventListener('click', startGame);

function startGame(e) {
    if (e) e.preventDefault();
    startScreen.style.display = 'none';

    renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);
    canvas = renderer.domElement;

    if (!renderer.getContext()) {
        errorScreen.style.display = 'flex';
        return;
    }

    canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        errorScreen.style.display = 'flex';
    });

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 10;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 100, 50);
    scene.add(dirLight);

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 0x228b22 })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    for (let i = 0; i < 15; i++) {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshStandardMaterial({ color: 0xffff00 })
        );
        cube.position.x = Math.random() * 180 - 90;
        cube.position.z = Math.random() * 180 - 90;
        cube.position.y = 1.5;
        scene.add(cube);
        collectibles.push(cube);
    }

    setupControls();
    window.addEventListener('resize', onResize);
    animate();
}

function setupControls() {
    const moveJoy = document.getElementById('moveJoy');
    const moveKnob = document.getElementById('moveKnob');
    let moveActive = false;

    moveJoy.addEventListener('touchstart', (e) => { e.preventDefault(); moveActive = true; handleMove(e.touches[0]); });
    moveJoy.addEventListener('touchmove', (e) => { e.preventDefault(); if (moveActive) handleMove(e.touches[0]); });
    moveJoy.addEventListener('touchend', () => { moveActive = false; resetKnob(moveKnob, moveVector); });

    function handleMove(touch) {
        const rect = moveJoy.getBoundingClientRect();
        const dx = (touch.clientX - rect.left - 70);
        const dy = (touch.clientY - rect.top - 70);
        const dist = Math.min(Math.hypot(dx, dy), 50);
        const angle = Math.atan2(dy, dx);
        moveKnob.style.transform = `translate(-50%, -50%) translate(${dist * Math.cos(angle)}px, ${dist * Math.sin(angle)}px)`;
        moveVector.set(dx / 50, dy / 50);
    }

    const lookJoy = document.getElementById('lookJoy');
    const lookKnob = document.getElementById('lookKnob');
    let lookActive = false;

    lookJoy.addEventListener('touchstart', (e) => { e.preventDefault(); lookActive = true; handleLook(e.touches[0]); });
    lookJoy.addEventListener('touchmove', (e) => { e.preventDefault(); if (lookActive) handleLook(e.touches[0]); });
    lookJoy.addEventListener('touchend', () => { lookActive = false; resetKnob(lookKnob, lookVector); });

    function handleLook(touch) {
        const rect = lookJoy.getBoundingClientRect();
        const dx = (touch.clientX - rect.left - 70);
        const dy = (touch.clientY - rect.top - 70);
        const dist = Math.min(Math.hypot(dx, dy), 50);
        const angle = Math.atan2(dy, dx);
        lookKnob.style.transform = `translate(-50%, -50%) translate(${dist * Math.cos(angle)}px, ${dist * Math.sin(angle)}px)`;
        lookVector.set(dx / 50 * 2, dy / 50 * 2);
    }

    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (canJump) { velocity.y = 18; canJump = false; }
    });
}

function resetKnob(knob, vec) {
    knob.style.transform = 'translate(-50%, -50%)';
    vec.set(0,0);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    velocity.x *= 0.9;
    velocity.z *= 0.9;
    velocity.y -= 0.5;

    const forward = new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
    const right = new THREE.Vector3(1,0,0).applyQuaternion(camera.quaternion);

    velocity.add(forward.multiplyScalar(moveVector.y * 0.8));
    velocity.add(right.multiplyScalar(moveVector.x * 0.8));

    camera.position.add(velocity);

    if (camera.position.y < 10) {
        camera.position.y = 10;
        velocity.y = 0;
        canJump = true;
    }

    camera.rotation.y -= lookVector.x * 0.01;
    camera.rotation.x -= lookVector.y * 0.01;
    camera.rotation.x = Math.max(-Math.PI/2 + 0.1, Math.min(Math.PI/2 - 0.1, camera.rotation.x));

    collectibles.forEach(c => {
        if (c.visible && camera.position.distanceTo(c.position) < 5) {
            c.visible = false;
            score++;
            document.getElementById('score').textContent = 'Счёт: ' + score;
        }
    });

    renderer.render(scene, camera);
}