// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================

// This is for both PNE and PNW combined into one object
function  pendletons(renderer) {
    var loader = new THREE.TextureLoader();
    var pendletons = new THREE.Object3D;
    var tex;

    TW.loadTextures(["brick_text.jpeg","brick_text.jpeg","brick_text.jpeg", "gray-roof.jpg", "brick_text.jpeg", 
                "window.png", "window_text2.jpeg", "brick_text.jpeg","gray-panel.jpg", "beige-wall.jpg",
                "white-panel-horiz.jpg", "pretty-window.jpg", "brick_text.jpeg",
                "light-green-door.jpg", "paris-doors.jpg"],
                function (texture) {
                    tex = texture;
                    pendletons = returnPendletons(tex);
                    pendletons.position.set(-50,-12,-370);
                    pendletons.scale.set(2,2,2);
                    pendletons.rotation.set(0,-Math.PI/20,0);
                    scene.add(pendletons);
                    renderer.render(scene, camera);
                }  
    );

    var PNW = new THREE.Object3D;
    var PNE = new THREE.Object3D;
    
    // Materials
    var params = {
        pneLength: 160,
        pneHeight: 30,
        pneDepth: 50,
        tempMaterial:  new THREE.MeshPhongMaterial(
        {
            color: 0x8a2d2d
        }
        ),
        beigeMaterial: new THREE.MeshPhongMaterial(
            {
                color: 0xd4c185
            }
        )
    }



    function addTextureCoords (barnGeom) {
        if( ! barnGeom instanceof THREE.Geometry ) {
            throw "not a THREE.Geometry: "+barnGeom;
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
        //faceCoords(0,1, 1,1, 1,1);  // upper triangle
        faceCoords(0,1, 1,1, 0.5,0);  // updated upper triangle
        // back (faces 3-5)
        faceCoords(1,0, 0,1, 0,0);
        faceCoords(1,0, 1,1, 0,1);
        //faceCoords(0,1, 1,1, 1,1);  // upper triangle
        faceCoords(0,1, 1,1, 0.5,0);  // updated upper triangle
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
        barnGeom.faceVertexUvs = [ UVs ];
    }

    var barnMaterials;

    function textureMapping(barnGeometry, textures, scale){
    // For each distinct type of side/surface on the barn,
        // set the wrapping repetition style & mapping values
    var wrapStyle = [THREE.RepeatWrapping, THREE.MirroredRepeatWrapping, THREE.ClampToEdgeWrapping];
    for (i = 0; i < 5; i++) {
        
            textures[i].wrapS = wrapStyle[0];
            textures[i].wrapT = wrapStyle[0];
        // roof
        if (i == 3) {
            textures[i].repeat.x = 14*scale;
            textures[i].repeat.y = 5*scale;
        } 
        // front & back
        else if (i == 0) {
            textures[i].repeat.x = 4*scale;
            textures[i].repeat.y = 3*scale;
        }
        // top triangles
        else if (i == 1) {
            textures[i].repeat.x = 4*scale;
            textures[i].repeat.y = 3*scale;
        }
        // sides
        else if (i == 2) {
            textures[i].repeat.x = 16*scale;
            textures[i].repeat.y = 2;
        }
        // floor
        else if (i==4) {
            textures[i].repeat.x = 10*scale;
            textures[i].repeat.y = 3*scale;
        }
        textures[i].needsUpdate = true;
        
    }
    barnMaterials =
                [new THREE.MeshBasicMaterial({color: 0xc27670,

                                            map: textures[0]}),
                new THREE.MeshBasicMaterial({color: 0xc27670,
                                            map: textures[1]}),
                new THREE.MeshBasicMaterial({color: 0xc27670,
                                            map: textures[2]}),
                //roof
                new THREE.MeshBasicMaterial({color: 0x9aabb8,
                                            map: textures[3]}),
                new THREE.MeshBasicMaterial({color: 0xc27670,
                                            map: textures[4]}),
            ];

    barnGeometry.faces[0].materialIndex = 0;
    barnGeometry.faces[1].materialIndex = 0;
    barnGeometry.faces[2].materialIndex = 1;
    barnGeometry.faces[3].materialIndex = 0;
    barnGeometry.faces[4].materialIndex = 0;
    barnGeometry.faces[5].materialIndex = 1;
    barnGeometry.faces[6].materialIndex = 3;
    barnGeometry.faces[7].materialIndex = 3;
    barnGeometry.faces[8].materialIndex = 3;
    barnGeometry.faces[9].materialIndex = 3;
    barnGeometry.faces[10].materialIndex = 2;
    barnGeometry.faces[11].materialIndex = 2;
    barnGeometry.faces[12].materialIndex = 2;
    barnGeometry.faces[13].materialIndex = 2;
    barnGeometry.faces[14].materialIndex = 4;
    barnGeometry.faces[15].materialIndex = 4;
    }


    function miniBarn() {
        // TW.createBarn version
        
        var miniBarnGeom = TW.createBarn(params.pneLength/14, params.pneHeight/3, params.pneDepth/2);
        addTextureCoords(miniBarnGeom);
        textureMapping(miniBarnGeom, tex, 0.5);
        miniBarnMesh = new THREE.Mesh(miniBarnGeom, barnMaterials);
        miniBarnMesh.castShadow = true;
        miniBarnMesh.receiveShadow = true;
        miniBarnMesh.position.z = params.pneDepth-0.01;
        miniBarnMesh.position.y = 2.5*params.pneHeight/3;
        return miniBarnMesh;
    }

    // beige brick borders
    function border(length, height, depth) {
        var beigeStripGeom = new THREE.BoxGeometry(length, height, depth);
        tex[9].wrapS = THREE.RepeatWrapping;
        tex[9].repeat.x = 10;
        tex[9].repeat.y = 0.5;
        var concreteMaterial = new THREE.MeshPhongMaterial(
            {
                color: 0xfcf4b6,
                map: tex[9]
            }
        );
        var beigeStripMesh = new THREE.Mesh(beigeStripGeom, concreteMaterial);
        beigeStripMesh.castShadow = true;
        beigeStripMesh.receiveShadow = true;
        return beigeStripMesh;    
    }

    function miniTower(xzScale, yScale) {
        var tower = new THREE.Object3D;
        var towerGeom = new THREE.BoxGeometry(1.5*xzScale, 10*yScale, 3*xzScale);
        var repMat = tex[7];
        repMat.repeat.y = 0.5*yScale;
        repMat.wrapT = THREE.RepeatWrapping;
        repMat.repeat.x = 0.3;
        var mat = new THREE.MeshPhongMaterial({color: 0xc27670,
                                                map: repMat});
        var towerMesh = new THREE.Mesh(towerGeom, mat);
        towerMesh.castShadow = true;
        towerMesh.receiveShadow = true;
        towerMesh.position.z = params.pneDepth;
        towerMesh.position.y = 10*yScale/2;
        tower.add(towerMesh);
        // add border at the top of each minitower
        var bord = border(1.7*xzScale, 3, 3.1*xzScale);
        bord.position.y = 10*yScale;
        bord.position.z = params.pneDepth;

        tower.add(bord);
        return tower;
    }


    function windows(x, y) {
        var windows = new THREE.Object3D;
        var glassGeom = new THREE.PlaneGeometry(x*params.pneLength/20, y*params.pneHeight/3, 0);
        var windowMat = new THREE.MeshBasicMaterial( {color: 0xdddddd,
                                                    map: tex[6]} );
        glassMesh = new THREE.Mesh(glassGeom,windowMat);
        glassMesh.castShadow = true;
        glassMesh.receiveShadow = true;
        windows.add(glassMesh);
        return windows;
    }

    // PENDLETON EAST BASE BARN
    function pendletonEast() {
        // Main structure of PNE (a long barn)
        var pneGeom = TW.createBarn(params.pneDepth, params.pneHeight, params.pneLength);
        addTextureCoords(pneGeom);
        textureMapping(pneGeom, tex, 4);
        pneMesh = new THREE.Mesh(pneGeom, barnMaterials);
        pneMesh.castShadow = true;
        pneMesh.receiveShadow = true;
        pneMesh.rotation.y = -Math.PI/2;
        PNE.add(pneMesh);
        // 7 mini barns to the left of the main entrance, first 2/3 of structure
        // x interval for placement of minibarns:
        var intervalLength = (params.pneLength/2.2)/7;
        for (let i=1; i < 7; i++) {
            var minibarn = miniBarn();
            minibarn.position.x = intervalLength*i;
            PNE.add(minibarn);
        }
        // side mini barn on the right
        var sideMiniGeom = TW.createBarn(params.pneLength/10, params.pneHeight, params.pneDepth/2);
        addTextureCoords(sideMiniGeom);
        textureMapping(sideMiniGeom, tex, 0.6);
        sideMiniMesh = new THREE.Mesh(sideMiniGeom, barnMaterials);
        sideMiniMesh.castShadow = true;
        sideMiniMesh.receiveShadow = true;
        sideMiniMesh.position.set(intervalLength*11, 0.01, params.pneDepth-0.01);
        PNE.add(sideMiniMesh);
        // main entrance, big barn
        var mainEntranceGeom = TW.createBarn(params.pneLength/5, params.pneHeight*1.2, params.pneDepth);
        addTextureCoords(mainEntranceGeom);
        textureMapping(mainEntranceGeom, tex, 0.6);
        mainEntranceMesh = new THREE.Mesh(mainEntranceGeom, barnMaterials);
        mainEntranceMesh.castShadow = true;
        mainEntranceMesh.receiveShadow = true;
        mainEntranceMesh.position.set(intervalLength*7.3, 0.01, params.pneDepth-0.01);
        PNE.add(mainEntranceMesh);
        // Towers @ front entrance
        //left
        var miniTower1 = miniTower(2, 2);
        miniTower1.position.x = intervalLength*7.3;
        PNE.add(miniTower1);
        var miniTower2 = miniTower(1.5, 3);
        miniTower2.position.x = intervalLength*7.3;
        PNE.add(miniTower2);
        var miniTower3 = miniTower(1, 3.75);
        miniTower3.position.x = intervalLength*7.3;
        PNE.add(miniTower3);
        //right
        var miniTower1b = miniTower(2, 2);
        miniTower1b.position.x = intervalLength*7.3 + params.pneLength/5;
        PNE.add(miniTower1b);
        var miniTower2b = miniTower(1.5, 3);
        miniTower2b.position.x = intervalLength*7.3 + params.pneLength/5;
        PNE.add(miniTower2b);
        var miniTower3b = miniTower(1, 3.75);
        miniTower3b.position.x = intervalLength*7.3 + params.pneLength/5;
        PNE.add(miniTower3b);
        // beige brick strip at bottom of building
        var beigeStripGeom = new THREE.BoxGeometry(intervalLength*7.4, params.pneHeight/7, params.pneDepth/20);
        tex[9].wrapS = THREE.RepeatWrapping;
        tex[9].repeat.x = 10;
        tex[9].repeat.y = 0.5;
        var concreteMaterial = new THREE.MeshPhongMaterial(
            {
                color: 0xfcf4b6,
                map: tex[9]
            }
        );
        var beigeStripMesh = new THREE.Mesh(beigeStripGeom, concreteMaterial);
        beigeStripMesh.castShadow = true;
        beigeStripMesh.receiveShadow = true;
        beigeStripMesh.position.set(intervalLength*3.49, params.pneHeight/20, params.pneDepth);
        PNE.add(beigeStripMesh);
        //2nd strip
        var beigeStripGeom = new THREE.BoxGeometry(intervalLength*5, params.pneHeight/7, params.pneDepth/20);
        var beigeStripMesh = new THREE.Mesh(beigeStripGeom, concreteMaterial);
        beigeStripMesh.castShadow = true;
        beigeStripMesh.receiveShadow = true;
        beigeStripMesh.position.set(params.pneLength-intervalLength*2.5, params.pneHeight/20, params.pneDepth);
        PNE.add(beigeStripMesh);
        // ADDING SMALL LEFT WINDOWS
        for (let i=1; i < 7; i++) {
            var window1 = windows(0.8,0.8);
            window1.position.set(intervalLength*(i+0.55), params.pneHeight, params.pneDepth+0.1);
            PNE.add(window1);
        }
        // ADDING LEFT LARGE WINDOWS
        for (let i=1; i < 7; i++) {
            var window1 = windows(1.2,1.5);
            window1.position.set(intervalLength*(i+0.5), params.pneHeight/2.5, params.pneDepth+0.1);
            PNE.add(window1);
        }
        // SMALL WINDOWS ABOVE MAIN ENTRANCE
        for (let i=1; i < 4; i++) {
            var window1 = windows(1, 1);
            window1.position.set(7.3*intervalLength + 0.8*intervalLength*(i), params.pneHeight, params.pneDepth+0.1);
            PNE.add(window1);
        }
        // RIGHT LARGE WINDOWS
        for (let i=1; i < 4; i++) {
            var window1 = windows(1.6, 2);
            window1.position.set(2*params.pneLength/3 + i*params.pneLength/10.2, params.pneHeight/2, params.pneDepth+0.1);
            PNE.add(window1);
        }
        // ADDING GREEN DOOR IN THE MIDDLE
        var doorGeom = new THREE.PlaneGeometry(16, 18, 0.02);
        var doorMat = new THREE.MeshPhongMaterial({color: 0xcccccc,
                                                    map: tex[14]});
        var doorMesh = new THREE.Mesh(doorGeom, doorMat);
        doorMesh.castShadow = true;
        doorMesh.receiveShadow = true;
        doorMesh.position.set(params.pneLength*0.575, 9, params.pneDepth+0.01);
        PNE.add(doorMesh);
        // add PNE to final object
        pendletons.add(PNE);;
    }

    // pnw has windows that are covered by parallel bars
    // x and y refer to the length (horizontal) and height of each window bar
    function windowBar(x, y){
        var barGeom = new THREE.BoxGeometry(x, y, 0.7);
        var barMesh = new THREE.Mesh(barGeom, params.beigeMaterial);
        barMesh.castShadow = true;
        barMesh.receiveShadow = true;
        return barMesh
    }


    // creates the brick part of PNW that is connected to PNE
    function pnwFront(){
        var front = new THREE.Object3D;
        var frontLength = params.pneLength/3;
        var frontHeight = params.pneHeight*0.75;
        var frontDepth = params.pneDepth*(2/3);
        var brickMaterial = tex[12];
        brickMaterial.wrapS = THREE.RepeatWrapping;
        brickMaterial.wrapT = THREE.RepeatWrapping;
        brickMaterial.repeat.x = 8;
        brickMaterial.repeat.y = 1;
        var frontMat = new THREE.MeshPhongMaterial({color: 0xf7a8a8,
                                                    map: brickMaterial});
        var frontTopGeom = new THREE.BoxGeometry(frontLength, frontHeight/3, frontDepth);
        var frontTopMesh = new THREE.Mesh(frontTopGeom, frontMat);
        frontTopMesh.castShadow = true;
        frontTopMesh.receiveShadow = true;
        frontTopMesh.position.set(-frontLength/2, frontHeight*(5/6), params.pneDepth*(2/3));
        front.add(frontTopMesh);
        // beige border strip on top
        var topStrip = border(frontLength, 1, 1 );
        topStrip.position.set(-frontLength/2-0.01, frontHeight, params.pneDepth);
        front.add(topStrip);
        // left bottom side
        var frontLeftGeom = new THREE.BoxGeometry(frontLength*(2/3), frontHeight*(2/3), frontDepth);
        var frontLeftMesh = new THREE.Mesh(frontLeftGeom, frontMat);
        frontLeftMesh.castShadow = true;
        frontLeftMesh.receiveShadow = true;
        frontLeftMesh.position.set(-frontLength*(2/3), frontHeight/3, params.pneDepth*(2/3));
        front.add(frontLeftMesh);
        // beige strip on this bottom side
        var bottomStrip = border(frontLength*(2/3)*1.05, params.pneHeight/7, 6);
        bottomStrip.position.set(-frontLength*(2/3), params.pneHeight/14-0.01, params.pneDepth-2);
        front.add(bottomStrip);
        // windows on this side
        var win = windows(0.7, 1);
        win.position.set(-frontLength*(0.4), frontHeight*0.45, params.pneDepth+0.01);
        front.add(win);
        for (i=0; i < 4; i++) {
            win = win.clone();
            win.translateX(-7);
            front.add(win);
        }

        // right bottom side
        var n = 2;
        var frontRightGeom = new THREE.BoxGeometry(n, frontHeight*(2/3), frontDepth);
        var frontRightMesh = new THREE.Mesh(frontRightGeom, frontMat);
        frontRightMesh.castShadow = true;
        frontRightMesh.receiveShadow = true;
        frontRightMesh.position.set(-n/2, frontHeight/3, params.pneDepth*(2/3));
        front.add(frontRightMesh);
        // bench on the right side of inner space 
        var benchGeom = new THREE.BoxGeometry(2.5, 0.7, 12);
        var benchMesh = new THREE.Mesh(benchGeom, params.beigeMaterial);
        benchMesh.castShadow = true;
        benchMesh.receiveShadow = true;
        benchMesh.position.set(-n-1, 3, params.pneDepth*(5/6)+1);
        front.add(benchMesh);
        //back side
        var frontBackGeom = new THREE.BoxGeometry(frontLength/3, frontHeight*(2/3), frontDepth/2);
        var frontBackMesh = new THREE.Mesh(frontBackGeom, frontMat);
        frontBackMesh.castShadow = true;
        frontBackMesh.receiveShadow = true;
        frontBackMesh.position.set(-frontLength/6, frontHeight/3, params.pneDepth*(1/2));
        front.add(frontBackMesh);
        // window on the inner "cave"
        var glassGeom = new THREE.PlaneGeometry(frontLength*0.25, frontHeight*(2/3)*0.9, frontDepth/2);
        var windowMat = new THREE.MeshPhongMaterial( {color: 0xffffff,
                                                    map: tex[11]} );
        glassMesh = new THREE.Mesh(glassGeom,windowMat);
        glassMesh.castShadow = true;
        glassMesh.receiveShadow = true;
        glassMesh.position.set(-frontLength/6, frontHeight/3, frontDepth+0.02)
        front.add(glassMesh);
        return front;
    }

    function pendletonWest(texture) {
        // small front part of pnw
        var frontLength = params.pneLength/3;
        var frontHeight = params.pneHeight*0.75;
        var frontDepth = params.pneDepth*(2/3);
        // we call the function that creates the section of PNW that is attached to PNE
        var front = pnwFront();
        PNW.add(front);
        // small section on top of front part
        var topHeight = params.pneHeight - frontHeight;
        var topGeom = new THREE.BoxGeometry(frontLength, topHeight, frontDepth/5);
        //var topMat
        var gray = tex[10];
        gray.wrapT = THREE.MirroredRepeatWrapping;
        gray.wrapS = THREE.MirroredRepeatWrapping;
        gray.repeat.y = 2;
        gray.repeat.x = 4;
        var grayMat = new THREE.MeshPhongMaterial({color: 0xdddddd,
                                                map: gray});
        var topMesh = new THREE.Mesh(topGeom, grayMat);
        topMesh.castShadow = true;
        topMesh.receiveShadow = true;
        topMesh.position.set(-frontLength/2, frontHeight+(1/6)*frontHeight, params.pneDepth/2);
        PNW.add(topMesh);
        // window bars on the small top section
        var bar = windowBar(0.9, topHeight);
        bar.position.set(-0.1, frontHeight*1.2, frontDepth*0.9);
        PNW.add(bar);
        var num = 14;
        for (let i=0; i < num ; i++) {
            bar = bar.clone();
            bar.translateX(-frontLength/num);
            PNW.add(bar);
        }
        // window behind it
        var glassGeom = new THREE.PlaneGeometry(frontLength*0.9, topHeight*0.7, );
        var windowMat = new THREE.MeshPhongMaterial( {color: 0x444444,
                                                    specular: TW.WHITE} );
        glassMesh = new THREE.Mesh(glassGeom,windowMat);
        glassMesh.castShadow = true;
        glassMesh.receiveShadow = true;
        glassMesh.position.set(-frontLength/2, frontHeight+(1/6)*frontHeight, frontDepth*0.86)
        PNW.add(glassMesh);
        

        // side section connecting front and main
        var sideGeom = new THREE.BoxGeometry(frontLength, frontHeight*1.25, frontDepth*0.7);
        //use same gray side material as top section
        var sideMesh = new THREE.Mesh(sideGeom, grayMat);
        sideMesh.castShadow = true;
        sideMesh.receiveShadow = true;
        sideMesh.position.set(-frontLength*1.15, frontHeight/3, frontDepth*0.74);
        sideMesh.rotation.y = -Math.PI/5;
        PNW.add(sideMesh);

        // bridge from PNW to Jewett; comes out of the side section
        var bridgeDepth = 95;
        var bridgeGeom = new THREE.BoxGeometry(11, 11 , bridgeDepth);
        var bridgeMesh = new THREE.Mesh(bridgeGeom, grayMat);
        bridgeMesh.castShadow = true;
        bridgeMesh.receiveShadow = true;
        bridgeMesh.position.set(-frontLength*1.25, 15*0.75, bridgeDepth*0.75);
        PNW.add(bridgeMesh);
        
        // main section of pnw
        
        var mainGeom = new THREE.BoxGeometry(frontLength, frontHeight*3.5, frontDepth*2.5);
        //var cement = tex[7];
        tex[8].wrapT = THREE.MirroredRepeatWrapping;
        tex[8].wrapS = THREE.RepeatWrapping
        //texture = tex;
        tex[8].repeat.x = 3;
        tex[8].repeat.y = 5;
        var mat = new THREE.MeshPhongMaterial({color: 0xffffff, 
                                                map: tex[8]});
        var mainMesh = new THREE.Mesh(mainGeom, mat);
        mainMesh.castShadow = true;
        mainMesh.receiveShadow = true;
        mainMesh.position.set(-frontLength*1.75, frontHeight/2.5, -frontDepth/2);
        PNW.add(mainMesh);
            
        // window bars on main section of PNW
        var bar = windowBar(0.6, frontHeight);
        bar.position.set(-frontLength*1.25, frontHeight*1.5, params.pneDepth/1.9);
        PNW.add(bar);
        for (let i=0; i < 12; i++) {
            bar = bar.clone();
            bar.translateX(-2);
            PNW.add(bar);
        }
        // window behind it
        var glassGeom = new THREE.PlaneGeometry(23,frontHeight*0.9, 0);
        var windowMat = new THREE.MeshPhongMaterial( {color: 0x444444,
                                                    specular: TW.WHITE} );
        glassMesh = new THREE.Mesh(glassGeom,windowMat);
        glassMesh.castShadow = true;
        glassMesh.receiveShadow = true;
        glassMesh.position.set(-frontLength*1.5, frontHeight*1.5, params.pneDepth/2+0.01)
        PNW.add(glassMesh);

        pendletons.add(PNW);
    }

    // final function to add PNE and PNW to object pendletons
    function returnPendletons(texture){
        pendletonEast();
        pendletonWest();
        return pendletons;
    }
 }