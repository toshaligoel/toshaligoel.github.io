var controlPoints = [ [-1,0,0],
                      [0.1,5,0],
                      [0.1,5,0],
                      [1,4.6,0] ];
var curve = TW.createBezierCurve(controlPoints,20);

// var tube = new THREE.TubeGeometry( curve, 20, 2, 8, false );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var mesh = new THREE.Mesh( geometry, material );
// lamp.add( mesh );
function createLampPost() {
  var lamppost = new THREE.Object3D();
  var lamp = createLamp();
  lamp.scale.x = 0.5;
  lamp.scale.y = 0.5;
  lamp.scale.z = 0.5;
  var post = createPost();
  post.scale.x = 2;
  post.scale.y = 1.5;
  post.scale.z = 2;
  post.position.set(-3, 45, 0);
  lamp.position.set(1, 40.5, 0);
  lamppost.add(lamp);
  lamppost.add(post);
  var base = createBaseBottom();
  base.position.set(-5,0,0);
  lamppost.add(base);
  return lamppost;
}

var lamppost = createLampPost();
lamppost.scale.x = 2;
lamppost.scale.y = 2;
lamppost.scale.z = 2;
scene.add(lamppost);

function createLamp() {
  var lamp = new THREE.Object3D();
  createBase(lamp);
  createTop(lamp);
  createHanger(lamp);
  createBottom(lamp);
  createBars(lamp);
  return lamp;
}

function createBase(lamp) {
  var base = new THREE.CylinderGeometry( 5, 3, 10, 8 );
  var material = new THREE.MeshPhongMaterial({
                          color: 0xf7f1d7,
                          //specular: 0xffffff,
                          //shininess: 30,
                          opacity: 0.5,
                          transparent: true});
  material.emissive = new THREE.Color(0xffffff);
  material.emissiveIntensity = 3;
  var cylinder = new THREE.Mesh( base, material );
  lamp.add( cylinder );
}

function createTop(lamp) {
  var base = new THREE.CylinderGeometry( 1, 5.5, 3.5, 8 );
  var material = new THREE.MeshPhongMaterial({
                          color: 0x000000,
                          specular: 0xffffff,
                          shininess: 30,});
  var cylinder = new THREE.Mesh( base, material );
  cylinder.position.set(0,6.8,0);
  lamp.add( cylinder );
}

function createHanger(lamp) {
  var base = new THREE.SphereGeometry( 1.3, 20);
  var material = new THREE.MeshPhongMaterial({
                          color: 0x000000,
                          specular: 0xffffff,
                          shininess: 30});
  var sphere = new THREE.Mesh( base, material );
  sphere.position.set(0,8.8,0);
  sphere.scale.y = 0.5;
  lamp.add( sphere );

  var cone = new THREE.ConeGeometry( 1.5, 8, 6 );
  var top = new THREE.Mesh(cone, material);
  top.position.set(0, 10, 0);
  lamp.add(top);

}

function createBottom(lamp) {
  var base = new THREE.CylinderGeometry( 3.5, 3, 1, 8 );
  var material = new THREE.MeshPhongMaterial({
                          color: 0x000000,
                          specular: 0xffffff,
                          shininess: 30});
  var cylinder = new THREE.Mesh( base, material );
  cylinder.position.set(0,-5,0);
  lamp.add( cylinder );

  var next = new THREE.CylinderGeometry(2.5, 2.5, 1, 8);
  var nextStack = new THREE.Mesh(next, material);
  nextStack.position.set(0, -6, 0);
  lamp.add(nextStack);

  var next2 = new THREE.CylinderGeometry(2, 1.5, 1, 8);
  var nextStack2 = new THREE.Mesh(next2, material);
  nextStack2.position.set(0, -7, 0);
  lamp.add(nextStack2);

  var sphere = new THREE.SphereGeometry(1.3, 8);
  var circle = new THREE.Mesh(sphere, material);
  circle.position.set(0, -7.5, 0);
  lamp.add(circle);

  var cone = new THREE.ConeGeometry(0.4, 3, 8);
  var tip = new THREE.Mesh(cone, material);
  tip.position.set(0, -8, 0);
  lamp.add(tip);

  var dot = new THREE.SphereGeometry(0.5, 10);
  var ball = new THREE.Mesh(dot, material);
  ball.position.set(0, -9.7, 0);
  lamp.add(ball);
}

function createBezier() {
  var bezierCurve = new THREE.CubicBezierCurve3(
   new THREE.Vector3(-3,0,0), 
   new THREE.Vector3(-3,-1,0),
   new THREE.Vector3(3,-1,0),
   new THREE.Vector3(3,0,0)
  );
  // create a pattern of radii that increase and then decrease in size
  var radii = [0.01, 0.05, 0.1, 0.12, 0.13, 0.12, 0.1, 0.05, 0.01];
  // create the tube geometry using the Bezier curve and radii
  var geom = new THREE.TubeRadialGeometry(bezierCurve, 32, radii, 16, false);
  var mat = new THREE.MeshPhongMaterial({
                          color: 0x000000,
                          specular: 0xffffff,
                          shininess: 30});
  mat.side = THREE.DoubleSide;
  var tube = new THREE.Mesh(geom, mat);
  tube.scale.x = 2.3;
  tube.scale.y = 1.5;
  return tube;
}

function createPost() {
  var post = new THREE.Object3D();
  var bezierCurve = new THREE.CubicBezierCurve3(
   new THREE.Vector3(2,2,0), 
   new THREE.Vector3(1.3,3,0),
   new THREE.Vector3(0.3,1,0),
   new THREE.Vector3(2,1,0)
  );

  var nextBezierCurve = new THREE.CubicBezierCurve3(
   new THREE.Vector3(2,1,0), 
   new THREE.Vector3(3.5,1,0),
   new THREE.Vector3(3.5,3.2,0),
   new THREE.Vector3(2,3.5,0)
  );

  var finalBezierCurve = new THREE.CubicBezierCurve3(
   new THREE.Vector3(2,3.5,0), 
   new THREE.Vector3(-1.5,3.5,0),
   new THREE.Vector3(-1.5,2,0),
   new THREE.Vector3(-1,-30,0)
  );

  var radii = [0.15, 0.15, 0.15, 0.15, 0.15];
  // create the tube geometry using the Bezier curve and radii
  var geom1 = new THREE.TubeRadialGeometry(bezierCurve, 32, radii, 16, false);
  var geom2 = new THREE.TubeRadialGeometry(nextBezierCurve, 32, radii, 16, false);
  var geom3 = new THREE.TubeRadialGeometry(finalBezierCurve, 32, radii, 16, false);
  var mat = new THREE.MeshPhongMaterial({
                          color: 0x000000,
                          specular: 0xffffff,
                          shininess: 30});
  mat.side = THREE.DoubleSide;
  var tube1 = new THREE.Mesh(geom1, mat);
  var tube2 = new THREE.Mesh(geom2, mat);
  var tube3 = new THREE.Mesh(geom3, mat);

  post.add(tube1);
  post.add(tube2);
  post.add(tube3);

  return post;
}

function createBars(lamp) {
  var tube1 = createBezier();
  tube1.rotation.set(0,0,Math.PI/1.8);
  tube1.position.set(-5, 0, 0);
  lamp.add(tube1);

  var tube2 = createBezier();
  tube2.rotation.set(0,-Math.PI/2,Math.PI/1.8);
  tube2.position.set(0, 0, -5);
  lamp.add(tube2);

  var tube3 = createBezier();
  tube3.rotation.set(0,0,-Math.PI/1.8);
  tube3.position.set(5, 0, 0);
  lamp.add(tube3);

  var tube4 = createBezier();
  tube4.rotation.set(0,Math.PI/2,Math.PI/1.8);
  tube4.position.set(0, 0, 5);
  lamp.add(tube4);

  var tube5 = createBezier();
  tube5.rotation.set(-Math.PI/40,-Math.PI/6,Math.PI/1.8);
  tube5.position.set(-3.5, 0, -3.5);
  lamp.add(tube5);

  var tube6 = createBezier();
  tube6.rotation.set(Math.PI/40,-Math.PI/6,-Math.PI/1.8);
  tube6.position.set(3.5, 0, 3.5);
  lamp.add(tube6);

  var tube7 = createBezier();
  tube7.rotation.set(Math.PI/40,Math.PI/6,Math.PI/1.8);
  tube7.position.set(-3.5, 0, 3.5);
  lamp.add(tube7);

  var tube8 = createBezier();
  tube8.rotation.set(-Math.PI/40,Math.PI/6,-Math.PI/1.8);
  tube8.position.set(3.5, 0, -3.5);
  lamp.add(tube8);
}

function createBaseBottom() {
  var material = new THREE.MeshPhongMaterial({
                          color: 0x000000,
                          specular: 0xffffff,
                          shininess: 30});
  var bottom = new THREE.CylinderGeometry(2.5,3.5,6,4);
  var bottomMesh = new THREE.Mesh(bottom, material);

  return bottomMesh;
}