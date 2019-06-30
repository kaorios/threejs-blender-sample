window.addEventListener("DOMContentLoaded", init);

function init() {
  const loader = new THREE.GLTFLoader()
  const url = './character.gltf'
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0xCCffff, 1);
  renderer.gammaOutput = true;

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      100
  );
  camera.position.set(0, 0, 30);

  let gltfscene = null;
  // キャラクターを追加
  loader.load(url, (gltf) => {
    gltfscene = gltf.scene || gltf.scenes[0];
    gltfscene.rotation.y += -1.5;
    scene.add( gltfscene );
  })

  const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
  // シーンに追加
  scene.add(light);

  // 実行
  const animation = () => {
    requestAnimationFrame(animation);
    gltfscene.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animation();
}

