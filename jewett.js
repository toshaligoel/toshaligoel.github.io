// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================

/* Next, we create objects in our scene. Here, just a box and barn. The
center of the box is the origin, so, for example, the x coordinates go
from -2 to +2. Delete these and put your code here.  */
function jewett(renderer) {
    var loader = new THREE.TextureLoader();
    var jewett;

    loader.load("brick_text.jpeg",
                function (texture) {
                jewett = makeJewett(texture);
                jewett.position.set(-250,0,0);
                jewett.rotateY(Math.PI/2.3);
                scene.add(jewett);
                renderer.render(scene,camera)
                } );

    function makeJewett(texture) {
    var jewett = new THREE.Object3D;
    var mat = new THREE.MeshPhongMaterial({
                                color: 0xc27670,
                                specular: 0x808080,
                                shininess: 0,
                                map: texture});
    var bridgeGeom = new THREE.BoxGeometry(80,20,25);
    var bridge = new THREE.Mesh(bridgeGeom, mat);
    bridge.castShadow = true;
    bridge.receiveShadow = true;
    jewett.add(bridge);
    
    var geomL = new THREE.BoxGeometry(40,45,90);
    var buildL = new THREE.Mesh(geomL, mat);
    buildL.castShadow = true;
    buildL.receiveShadow = true;
    buildL.position.set(-60,10,10)
    jewett.add(buildL);

    var geomR = new THREE.BoxGeometry(100,30,80);
    var buildR = new THREE.Mesh(geomR, mat);
    buildR.castShadow = true;
    buildR.receiveShadow = true;
    buildR.position.set(90,5,-10)
    jewett.add(buildR);

    var geomRBack = new THREE.BoxGeometry(100,50,30);
    var buildRBack = new THREE.Mesh(geomRBack, mat);
    buildRBack.castShadow = true;
    buildR.receiveShadow = true;
    buildRBack.position.set(90,15,-35)
    jewett.add(buildRBack);

    var bar = new THREE.BoxGeometry(50,5,5);
    var bridgeBar = new THREE.Mesh(bar, mat);
    bridgeBar.castShadow = true;
    buildR.receiveShadow = true;
    bridgeBar.position.set(0,-10,15);
    jewett.add(bridgeBar);

    var stairMat = new THREE.MeshPhongMaterial({
                                color: 0x6b5a51,
                                specular: 0x808080,
                                shininess: 0,
                                side: THREE.DoubleSide});

    var staircaseL = new THREE.Object3D;
    var stairGeom = new THREE.BoxGeometry(10,3,2);
    var stair = new THREE.Mesh(stairGeom, stairMat);
    stair.castShadow = true;
    stair.receiveShadow = true;
    stair.position.set(-20, -12, 18.5);
    staircaseL.add(stair);

    var i;
    var scaleZ = 1;
    for (i = 0; i < 10; i++) {
        //var scaleZ = 1;
        stair = stair.clone();
        stair.translateY(-3);
        stair.translateZ(2*(1/scaleZ)); //prevents the actual amount of visible stair from increasing exponentially
        stair.scale.set(1,1,scaleZ);
        staircaseL.add(stair);
        scaleZ+=2;
    }
    jewett.add(staircaseL);

    var staircaseR = staircaseL.clone();
    staircaseR.position.set(40,0,0);
    jewett.add(staircaseR);

    //add code to smooth out back of stairs + add clean block
    var stairBackLGeom = new THREE.BoxGeometry(10,35,32);
    var stairBackL = new THREE.Mesh(stairBackLGeom, mat);
    stairBackL.castShadow = true;
    stairBackL.receiveShadow = true;
    stairBackL.position.set(-20,-25,3);
    jewett.add(stairBackL);

    var stairBackRGeom = new THREE.BoxGeometry(10,35,32);
    var stairBackR = new THREE.Mesh(stairBackRGeom, mat);
    stairBackR.castShadow = true;
    stairBackR.receiveShadow = true;
    stairBackR.position.set(20,-25,3);
    jewett.add(stairBackR);

    var stairWallGeom = new THREE.BoxGeometry(1.5,35,80);
    var stairWall = new THREE.Mesh(stairWallGeom, mat);
    stairWall.castShadow = true;
    stairWall.receiveShadow= true;
    stairWall.position.set(-25.5,-25,48);
    jewett.add(stairWall);

    var stairWallR = stairWall.clone();
    stairWallR.position.set(25.5,-25,48);
    jewett.add(stairWallR);

    //use flattened cylindergeom to create trapezoidal shape for inner stair wall
    var stairWallInnerGeom = new THREE.CylinderGeometry( 0.01 / Math.sqrt( 2 ), 0.8 / Math.sqrt( 2 ), 1, 4, 1 ); // size of top can be changed
    stairWallInnerGeom.rotateY( Math.PI / 4 );
    var stairWallInner = new THREE.Mesh(stairWallInnerGeom, mat);
    stairWallInner.castShadow = true;
    stairWallInner.receiveShadow = true;
    stairWallInner.position.set(-15.1, -25, 18);
    stairWallInner.scale.set(2.5,35,63);
    jewett.add(stairWallInner);

    var stairWallInnerR = stairWallInner.clone();
    stairWallInnerR.position.set(15.1,-25,18);
    jewett.add(stairWallInnerR);

    //staircase opposite camera view
    var bigStairGeom = new THREE.BoxGeometry(50,3,5);
    var bigStair = new THREE.Mesh(bigStairGeom, stairMat);
    bigStair.castShadow = true;
    bigStair.receiveShadow = true;
    bigStair.position.set(0, -14, 85);
    jewett.add(bigStair);

    var i;
    for (i = 0; i < 9; i++) {
        bigStair = bigStair.clone();
        bigStair.translateY(-3);
        bigStair.translateZ(-3);
        jewett.add(bigStair);
    }

    var stairBackGeom = new THREE.BoxGeometry(52,30,1);
    var stairBack = new THREE.Mesh(stairBackGeom, stairMat);
    stairBack.castShadow = true;
    stairBack.receiveShadow = true;
    stairBack.position.set(0,-27,88);
    jewett.add(stairBack);

    var stairFloorGeom = new THREE.PlaneGeometry(70,70);
    var stairFloor = new THREE.Mesh(stairFloorGeom, stairMat);
    stairFloor.castShadow = true;
    stairFloor.receiveShadow = true;
    stairFloor.rotateX(-Math.PI/2);
    stairFloor.position.set(0,-40,30);
    jewett.add(stairFloor);

    var windowMat = new THREE.MeshPhongMaterial({color: 0x37353b,
                                specular: 0xffffff,
                                shininess: 100,
                                transparent: true,
                                opacity: 0.7});

    var doorGeom = new THREE.PlaneGeometry(33,19);
    var door = new THREE.Mesh(doorGeom, windowMat);
    door.castShadow = true;
    door.receiveShadow = true;
    door.position.set(0,0,14);
    jewett.add(door);

    var railing = new THREE.Object3D;
    var whiteMat = new THREE.MeshPhongMaterial({
                                color: 0xf2e7c9,
                                specular: 0x808080,
                                shininess: 0});

    var mesh = new THREE.CylinderGeometry(0.3,0.3,26,20);
    var meshObj = new THREE.Mesh(mesh, whiteMat);
    meshObj.castShadow = true;
    meshObj.receiveShadow = true;
    meshObj.position.set(-39,21,60);
    railing.add(meshObj);
    
    var i;
    for (i = 0; i < 47; i++) {
        meshObj = meshObj.clone();
        meshObj.translateZ(-2);
        railing.add(meshObj);
    }

    jewett.add(railing);
    var railingL = railing.clone();
    railingL.position.set(-42,0,0);
    jewett.add(railingL);

    var doorPipeLGeom = new THREE.CylinderGeometry(0.5,0.5,20,30);
    var doorPipeL = new THREE.Mesh(doorPipeLGeom, whiteMat);
    doorPipeL.castShadow = true;
    doorPipeL.receiveShadow = true;
    doorPipeL.position.set(16,0,14);
    jewett.add(doorPipeL);

    var doorPipeR = doorPipeL.clone();
    doorPipeR.position.set(-16,0,14);
    jewett.add(doorPipeR);

    var doorFramePipeGeom = new THREE.CylinderGeometry(1,1,80,30);
    var doorFramePipe = new THREE.Mesh(doorFramePipeGeom, whiteMat);
    doorFramePipe.castShadow = true;
    doorFramePipe.receiveShadow = true;
    doorFramePipe.rotateZ(Math.PI/2);
    doorFramePipe.position.set(0,10,14);
    jewett.add(doorFramePipe);

    var window = new THREE.Object3D;
    var windowGeom = new THREE.PlaneGeometry(3,20);
    var windowPane = new THREE.Mesh(windowGeom, windowMat);
    windowPane.castShadow = true;
    windowPane.receiveShadow = true;
    windowPane.rotation.set(0,Math.PI/2,0);
    windowPane.position.set(-39.5,0,53);
    window.add(windowPane);

    var windowPoleGeom = new THREE.CylinderGeometry(0.5,0.5,20,20);
    var windowPole = new THREE.Mesh(windowPoleGeom, whiteMat);
    windowPole.castShadow = true;
    windowPole.receiveShadow = true;
    windowPole.position.set(-40,0,55);
    window.add(windowPole);

    windowPoleR = windowPole.clone();
    windowPoleR.translateZ(-4);
    window.add(windowPoleR);

    jewett.add(window);

    windowBuildingR = window.clone();
    windowBuildingR.rotation.set(0,-Math.PI/2,0);
    windowBuildingR.position.set(85,5,70);
    windowBuildingR.scale.set(1,1.5,0.8);
    jewett.add(windowBuildingR);

    var i;
    for (i = 0; i < 5; i++) {
        windowBuildingR = windowBuildingR.clone();
        windowBuildingR.translateZ(-19);
        jewett.add(windowBuildingR);
    }

    var i;
    for (i = 0; i < 6; i++) {
        window = window.clone();
        window.translateZ(-10);
        jewett.add(window);
    }

    var buildRPipeGeom = new THREE.CylinderGeometry(1,1,100,4);
    var buildRPipe = new THREE.Mesh(buildRPipeGeom, whiteMat);
    buildRPipe.castShadow = true;
    buildRPipe.receiveShadow = true;
    buildRPipe.rotateZ(Math.PI/2);
    buildRPipe.position.set(90,20,30);
    jewett.add(buildRPipe);

    buildRPipe2 = buildRPipe.clone();
    buildRPipe2.scale.set(1,0.9,1);
    buildRPipe2.position.set(90,21,30);
    jewett.add(buildRPipe2);

    buildRPipeBottom = buildRPipe.clone();
    buildRPipeBottom.scale.set(3,1,1);
    buildRPipeBottom.rotateY(Math.PI/6);
    buildRPipeBottom.position.set(90,-8,30);
    jewett.add(buildRPipeBottom);

    //build ground and bottom section 
    var plankGeom = new THREE.PlaneGeometry(15, 140);
    var plank = new THREE.Mesh(plankGeom, stairMat);
    plank.castShadow = true;
    plank.receiveShadow = true;
    plank.rotation.set(-Math.PI/2,0,0);
    plank.position.set(-34,-12,20);
    jewett.add(plank);

    plankR = plank.clone();
    plankR.position.set(34,-12,20);
    jewett.add(plankR);

    var frontGroundGeom = new THREE.PlaneGeometry(82,30);
    var frontGround = new THREE.Mesh(frontGroundGeom, stairMat);
    frontGround.receiveShadow = true;
    frontGround.rotation.set(-Math.PI/2,0,0);
    frontGround.position.set(0,-12,100);
    jewett.add(frontGround);

    var groundGeomR = new THREE.PlaneGeometry(300,300);
    var groundR = new THREE.Mesh(groundGeomR, stairMat);
    groundR.receiveShadow = true;
    groundR.rotateX(-Math.PI/2);
    groundR.position.set(180,-10,60);
    jewett.add(groundR);

    var groundGeomL = new THREE.PlaneGeometry(300,300);
    var groundL = new THREE.Mesh(groundGeomL, stairMat);
    groundL.receiveShadow = true;
    groundL.rotateX(-Math.PI/2);
    groundL.position.set(-180,-10,60);
    jewett.add(groundL);

    //build stubs in front of building
    var stubGeom = new THREE.CylinderGeometry(1,1.5,6,10);
    var stub = new THREE.Mesh(stubGeom, stairMat);
    stub.castShadow = true;
    stub.receiveShadow = true;
    stub.position.set(-16,-10,90);
    jewett.add(stub);

    var i;
    for (i = 0; i < 4; i++) {
        stub = stub.clone();
        stub.translateX(8);
        if (i < 2) {
        stub.translateZ(2);
        }
        else {
        stub.translateZ(-2);
        }
        jewett.add(stub);
    }

    texture.repeat.set(3,2);
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    return jewett;
    }
                }