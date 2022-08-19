// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================

/* Next, we create objects in our scene. Here, just a box and barn. The
center of the box is the origin, so, for example, the x coordinates go
from -2 to +2. Delete these and put your code here.  */

function green(renderer) {
    TW.loadTextures(["brick_text.jpeg", "brick_text.jpeg", "brick_text.jpeg", "green_hall.jpeg", "window_text2.jpeg", "window_text_single.jpeg", "roof_texture.jpeg", "tower.jpg"],
                    function (textures) {
                        setMaterial(textures);
                        var greenHallObj = makeGreenwTower();
                        greenHallObj.position.set(270,8,20);
                        greenHallObj.rotateY(-Math.PI/1.8);
                        greenHallObj.scale.set(4,6,4);
                        scene.add(greenHallObj);
                        renderer.render(scene,camera);
                    })

    var shortMat;
    var longMat;
    var tallMat;

    function addTextureCoords (geometry) {
        if( ! geometry instanceof THREE.Geometry ) {
            throw "not a THREE.Geometry: "+geometry;
        }
        // array of face descriptors
        var UVs = [];

    function faceCoords(as,at, bs,bt, cs,ct) {
            UVs.push( [ new THREE.Vector2(as,at),
                        new THREE.Vector2(bs,bt),
                        new THREE.Vector2(cs,ct)] );
        }
        // front (faces 0-2)
        faceCoords(0,0, 1,0, 1,1);
        faceCoords(0,0, 1,1, 0,1);
        //change faceCoords to fractional values to texture map part of image
        faceCoords(0,1, 1,1, 0.5,0);  // upper triangle
        // back (faces 3-5)
        faceCoords(1,0, 0,1, 0,0);
        faceCoords(1,0, 1,1, 0,1);
        //change faceCoords to fractional values to texture map part of image
        faceCoords(0,1, 1,1, 0.5,0);  // upper triangle
        // roof (faces 6-9)
        faceCoords(1,0, 1,1, 0,0);
        faceCoords(1,1, 0,1, 0,0);
        faceCoords(0,0, 1,0, 1,1);
        faceCoords(0,1, 0,0, 1,1);
        // sides (faces 10-13)
        faceCoords(1,0, 0,1, 0,0);
        faceCoords(1,1, 0,1, 1,0);
        faceCoords(1,0, 1,1, 0,0);
        faceCoords(1,1, 0,1, 0,0);
        // floor (faces 14-15)
        faceCoords(0,0, 1,0, 0,1);
        faceCoords(1,0, 1,1, 0,1);
        // attach this to the geometry
        geometry.faceVertexUvs = [ UVs ];
    }

    function setMaterial(textures) {
        shortMat = new THREE.MeshPhongMaterial({
                                    color: 0xdbc0ba,
                                    specular: 0x808080,
                                    shininess: 0,
                                    map: textures[0]});
    
        textures[0].repeat.set(1,1);
        textures[0].wrapS = THREE.MirroredRepeatWrapping;
        textures[0].wrapT = THREE.RepeatWrapping;
    
        longMat = new THREE.MeshPhongMaterial({
                                    color: 0xdbc0ba,
                                    specular: 0x808080,
                                    shininess: 0,
                                    map: textures[1]});
    
        textures[1].repeat.set(5,1);
        textures[1].wrapS = THREE.MirroredRepeatWrapping;
        textures[1].wrapT = THREE.RepeatWrapping;
    
        tallMat = new THREE.MeshPhongMaterial({
                                    color: 0xdbc0ba,
                                    specular: 0x808080,
                                    shininess: 0,
                                    map: textures[2]});
    
        textures[2].repeat.set(1,5);
        textures[2].wrapS = THREE.RepeatWrapping;
        textures[2].wrapT = THREE.MirroredRepeatWrapping;
    
        doorMat = new THREE.MeshPhongMaterial({
            color: 0xdbc0ba,
            specular: 0x808080,
            shininess: 1,
            map: textures[3],
            side: THREE.DoubleSide,
            blending: THREE.MultiplyBlending
          });
    
        windowMat = new THREE.MeshPhongMaterial({
            color: 0xdbc0ba,
            specular: 0x808080,
            shininess: 0,
            map: textures[4],
            side: THREE.DoubleSide,
          });
    
         singleWindowMat = new THREE.MeshPhongMaterial({
            color: 0xdbc0ba,
            specular: 0x808080,
            shininess: 0,
            map: textures[5],
            side: THREE.DoubleSide,
          });
    
        roofMat = new THREE.MeshPhongMaterial({
            color: 0xdbc0ba,
            specular: 0x808080,
            shininess: 3,
            map: textures[6],
            side: THREE.DoubleSide,
          });
    
        textures[6].repeat.set(7,2);
        textures[6].wrapS = THREE.RepeatWrapping;
        textures[6].wrapT = THREE.RepeatWrapping;
    
        towerMat = new THREE.MeshPhongMaterial({
            color: 0xd1a397,
            specular: 0x808080,
            shininess: 0,
            map: textures[7],
            side: THREE.DoubleSide,
            //blending: THREE.MultiplyBlending
          });
    
        whiteMat = new THREE.MeshPhongMaterial({
                                    color: 0xb8a98c,
                                    specular: 0x808080,
                                    shininess: 0});
        }
    
        function makeGreen() {
        var greenHall = new THREE.Object3D;
        var barnMaterials = [shortMat, longMat, tallMat, roofMat];
        var barnGeom = TW.createBarn(12,11,80);
        for (let i = 0; i < 6; i++) {
            barnGeom.faces[i].materialIndex = 1;
        };
        for (let i = 6; i < 10; i++) {
            barnGeom.faces[i].materialIndex = 3;
        };
        for (let i = 10; i < 16; i++) {
            barnGeom.faces[i].materialIndex = 1;
        };
        addTextureCoords(barnGeom);
        var barn = new THREE.Mesh(barnGeom, barnMaterials);
        barn.castShadow = true;
        barn.receiveShadow = true;
        barn.position.set(40,-6.5, 0)
        barn.rotation.set(0,Math.PI/2,0);
        greenHall.add(barn);
    
        var barnGeomL = TW.createBarn(10,11,40);
        for (let i = 0; i < 6; i++) {
            barnGeomL.faces[i].materialIndex = 0;
        };
        for (let i = 6; i < 10; i++) {
            barnGeomL.faces[i].materialIndex = 3;
        };
        for (let i = 10; i < 16; i++) {
            barnGeomL.faces[i].materialIndex = 0;
        };
        addTextureCoords(barnGeomL);
        var barnL = new THREE.Mesh(barnGeomL, barnMaterials);
        barnL.castShadow = true;
        barnL.receiveShadow = true;
        barnL.position.set(-40,-6.5,2);
        greenHall.add(barnL);
    
        var barnGeomR = TW.createBarn(10,11,40);
        for (let i = 0; i < 6; i++) {
            barnGeomR.faces[i].materialIndex = 0;
        };
        for (let i = 6; i < 10; i++) {
            barnGeomR.faces[i].materialIndex = 3;
        };
        for (let i = 10; i < 16; i++) {
            barnGeomR.faces[i].materialIndex = 0;
        };
        addTextureCoords(barnGeomR);
        var barnR = new THREE.Mesh(barnGeomR, barnMaterials);
        barnR.castShadow = true;
        barnR.receiveShadow = true;
        barnR.position.set(30,-6.5,2);
        greenHall.add(barnR);
    
        var miniBarnGeom = TW.createBarn(5,11,14);
        for (let i = 0; i < 6; i++) {
            miniBarnGeom.faces[i].materialIndex = 0;
        };
        for (let i = 6; i < 10; i++) {
            miniBarnGeom.faces[i].materialIndex = 3;
        };
        for (let i = 10; i < 16; i++) {
            miniBarnGeom.faces[i].materialIndex = 0;
        };
        addTextureCoords(miniBarnGeom);
        var miniBarn = new THREE.Mesh(miniBarnGeom, barnMaterials);
        miniBarn.castShadow = true;
        miniBarn.receiveShadow = true;
        miniBarn.position.set(-40, -6.5, 1);
    
        var i;
        for (i = 0; i < 5; i++) {
            miniBarn = miniBarn.clone();
            miniBarn.translateX(10);
            greenHall.add(miniBarn);
        }
    
        var doorGeom = new THREE.BoxGeometry(8,10,16);
        var doorway = new THREE.Mesh(doorGeom, shortMat);
        doorway.castShadow = true;
        doorway.receiveShadow = true;
        doorway.position.set(26,-1.5,-6);
        greenHall.add(doorway);
    
        var doorPicGeom = new THREE.PlaneGeometry(8,10);
        var door = new THREE.Mesh(doorPicGeom, doorMat);
        door.castShadow = true;
        door.receiveShadow = true;
        door.position.set(26,-1.5,2.1);
        greenHall.add(door);
    
        //add windows
        var windowGeom = new THREE.PlaneGeometry(2,5);
        var window = new THREE.Mesh(windowGeom, windowMat);
        window.position.set(-27.5,2,1.1);
        greenHall.add(window);
    
        var i;
        for (i = 0; i < 4; i++) {
            window = window.clone();
            window.translateX(10);
            greenHall.add(window);
        }
    
        var windowRow = new THREE.Object3D;
        var windowRowSmall = new THREE.Object3D;
        var singleGeom = new THREE.PlaneGeometry(1,3);
        var singleWindow = new THREE.Mesh(singleGeom, singleWindowMat);
        singleWindow.position.set(-44,-3.5,0.1);
        windowRow.add(singleWindow);
    
        var i;
          for (i = 0; i < 3; i++) {
              singleWindow = singleWindow.clone();
              singleWindow.translateX(1);
              windowRow.add(singleWindow);
          }
        
          for (i = 0; i < 6; i++) {
              windowRow = windowRow.clone();
              windowRow.translateX(10);
              greenHall.add(windowRow);
          }
    
        windowRowSmall.add(singleWindow);
        windowRowSmall.position.set(7.5,5,0.1);
        windowRowSmall.scale.set(1,0.8,1);
    
          for (i = 0; i < 2; i++) {
              singleWindow = singleWindow.clone();
              singleWindow.translateX(1);
              windowRowSmall.add(singleWindow);
          }
        
          for (i = 0; i < 6; i++) {
              windowRowSmall = windowRowSmall.clone();
              windowRowSmall.translateX(10);
              greenHall.add(windowRowSmall);
          }
    
          var singleWindowL = windowRow.clone();
          singleWindowL.position.set(7.5,0,2.1);
          greenHall.add(singleWindowL);
    
          var singleWindowLSmall = windowRowSmall.clone();
          singleWindowLSmall.position.set(5,5,2.1);
          greenHall.add(singleWindowLSmall);
    
          var singleWindowR = windowRow.clone();
          singleWindowR.position.set(77.5,0,2.1);
          greenHall.add(singleWindowR);
    
          var singleWindowRSmall = windowRowSmall.clone();
          singleWindowRSmall.position.set(75,5,2.1);
          greenHall.add(singleWindowRSmall);
    
        return greenHall;
        }
    
        function makeTower() {
        var tower = new THREE.Object3D;
        var towerGeom = new THREE.BoxGeometry(11,45,11);
        var tower1 = new THREE.Mesh(towerGeom, tallMat);
        tower1.castShadow = true;
        tower1.receiveShadow = true;
        tower1.position.set(25,16,-15);
        tower.add(tower1);
    
        var pole = new THREE.Object3D;
        var poleGeom = new THREE.CylinderGeometry(1,2.5,46,4);
        var pole1 = new THREE.Mesh(poleGeom, tallMat);
        pole1.castShadow = true;
        pole1.receiveShadow = true;
        pole.position.set(31,18.5,-21);
        pole.add(pole1);
    
        var decorPole1Geom = new THREE.CylinderGeometry(0.2,0.5,25,10);
        var decorPole1 = new THREE.Mesh(decorPole1Geom, whiteMat);
        decorPole1.position.set(-0.6,12,0.6);
        pole.add(decorPole1);
    
        var decorPole2Geom = new THREE.CylinderGeometry(0.2,0.5,25,10);
        var decorPole2 = new THREE.Mesh(decorPole2Geom, whiteMat);
        decorPole2.position.set(0.6,12,0.6);
        pole.add(decorPole2);
    
        var decorPole3Geom = new THREE.CylinderGeometry(0.2,0.5,25,10);
        var decorPole3 = new THREE.Mesh(decorPole3Geom, whiteMat);
        decorPole3.position.set(0.6,12,-0.6);
        pole.add(decorPole3);
    
        var decorPole1SmallGeom = new THREE.CylinderGeometry(0.1,0.3,15,10);
        var decorPole1Small = new THREE.Mesh(decorPole1SmallGeom, whiteMat);
        decorPole1Small.position.set(-0.2,15,1);
        pole.add(decorPole1Small);
        
        tower.add(pole);
    
        var pole2 = pole.clone();
        pole2.position.set(31,18.5,-9);
        tower.add(pole2);
    
        var pole3 = pole.clone();
        pole3.position.set(19,18.5,-9);
        tower.add(pole3);
    
        var pole4 = pole.clone();
        pole4.position.set(19,18.5,-21);
        tower.add(pole4);
    
        var minipoleGeom = new THREE.CylinderGeometry(0.5,1.5,50,4);
        var minipole1 = new THREE.Mesh(minipoleGeom, tallMat);
        minipole1.castShadow = true;
        minipole1.receiveShadow = true;
        minipole1.position.set(31,18.5,-21);
        tower.add(minipole1);
    
        var minipole2 = minipole1.clone();
        minipole2.position.set(31,18.5,-9);
        tower.add(minipole2);
    
        var minipole3 = minipole1.clone();
        minipole3.position.set(19,18.5,-9);
        tower.add(minipole3);
    
        var minipole4 = minipole1.clone();
        minipole4.position.set(19,18.5,-21);
        tower.add(minipole4);
    
        var towerPaneGeom = new THREE.PlaneGeometry(11,45);
        var towerPane = new THREE.Mesh(towerPaneGeom, towerMat);
        towerPane.position.set(25,16,-9.1);
        tower.add(towerPane);
    
        var towerPaneGeom2 = new THREE.PlaneGeometry(11,45);
        var towerPane2 = new THREE.Mesh(towerPaneGeom2, towerMat);
        towerPane2.rotateY(-Math.PI/2);
        towerPane2.position.set(19,16,-15);
        tower.add(towerPane2);
    
        var towerPaneGeom3 = new THREE.PlaneGeometry(11,45);
        var towerPane3 = new THREE.Mesh(towerPaneGeom3, towerMat);
        towerPane3.position.set(25,16,-21);
        tower.add(towerPane3);
    
        var towerPaneGeom4 = new THREE.PlaneGeometry(11,45);
        var towerPane4 = new THREE.Mesh(towerPaneGeom4, towerMat);
        towerPane4.rotateY(-Math.PI/2);
        towerPane4.position.set(31,16,-15);
        tower.add(towerPane4);
    
        return tower;
        }
    
        function makeGreenwTower() {
        var greenwTower = new THREE.Object3D;
    
        var green = makeGreen();
        var tower = makeTower();
    
        greenwTower.add(green);
        greenwTower.add(tower);
    
        return greenwTower;
        }
    }