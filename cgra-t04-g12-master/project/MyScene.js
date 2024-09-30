import {CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from './MyCubeMap.js';
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyQuad } from "./MyQuad.js";
import { MyPillar } from "./MyPillar.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyAlgae } from "./MyAlgae.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyAnimatedFish } from "./MyAnimatedFish.js";
import { MyNest } from "./MyNest.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.moving = new MyMovingObject(this, 4, 1);
        this.cubemap = new MyCubeMap(this);
        this.fish = new MyFish(this);
        this.sea = new MySeaFloor(this, 100);
        this.quad = new MyQuad(this);
        this.pillar = new MyPillar(this);
        this.rockSet = new MyRockSet(this, 10, 18, 20);
        this.rockSet2 = new MyRockSet(this, 5, 25, 40);
        this.seaweed = new MyAlgae(this);
        this.movingFish = new MyMovingFish(this);
        this.animatedFish = new MyAnimatedFish(this, 25, 10);
        this.animatedFish2 = new MyAnimatedFish(this, 10, 40);
        this.nest = new MyNest(this, 10, 7.5);


        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
        this.defaultAppearance.setShininess(120);
        this.defaultAppearance.loadTexture('images/earth.jpg');
        this.defaultAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.sphereAppearance = new CGFappearance(this);
        this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereAppearance.setShininess(120);

        this.sand = new CGFtexture(this, 'images/sand.png');
        this.sandMap = new CGFtexture(this, 'images/sandMap.png');
        this.surface = new CGFtexture(this, 'images/pier.jpg');
        this.distortion = new CGFtexture(this, 'images/distortionmap.png');

        this.seaFloor = new CGFappearance(this);
        this.seaFloor.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.seaFloor.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.seaFloor.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.seaFloor.setEmission(0,0,0,1);
        this.seaFloor.setShininess(120);
        this.seaFloor.setTexture(this.sand);
        this.seaFloor.setTextureWrap('REPEAT', 'REPEAT');

        this.seaSurface = new CGFappearance(this);
        this.seaSurface.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.seaSurface.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.seaSurface.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.seaSurface.setEmission(0,0,0,1);
        this.seaSurface.setShininess(120);
        this.seaSurface.setTexture(this.surface);
        this.seaSurface.setTextureWrap('REPEAT', 'REPEAT');

        this.heightShader = new CGFshader(this.gl, "shaders/sand_height.vert", "shaders/sand_height.frag");
        this.heightShader.setUniformsValues({ texture: 0 });
        this.heightShader.setUniformsValues({ map: 1 });

        this.distortionShader = new CGFshader(this.gl, "shaders/distortion.vert", "shaders/distortion.frag");
        this.distortionShader.setUniformsValues({ texture: 0 });
        this.distortionShader.setUniformsValues({ map: 1 });
        this.distortionShader.setUniformsValues({ timeFactor: 0});

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1.0;
        this.speedFactor = 1.0;
        this.selectedTexture = 0;
        this.textureIds = { 'Plane' : 0, 'Test' : 1, 'Lake' : 2, 'Underwater' : 3 };

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.75, 0.1, 500, vec3.fromValues(0, 5, 40), vec3.fromValues(25, 0, 25));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    checkKeys() {
        if (this.gui.isKeyPressed("KeyW")){
            this.moving.accelerate(0.1);
            this.movingFish.accelerate(0.1);
        }

        if (this.gui.isKeyPressed("KeyS")){
            this.moving.accelerate(-0.1);
            this.movingFish.accelerate(-0.1);
        }

        if (this.gui.isKeyPressed("KeyA")){
            this.moving.turn(-Math.PI / 180);
            this.movingFish.turn(-Math.PI / 180);
        }

        if (this.gui.isKeyPressed("KeyD")){
            this.moving.turn(Math.PI / 180);
            this.movingFish.turn(Math.PI / 180);
        }

        if (this.gui.isKeyPressed("KeyP")){
            this.movingFish.depthChange(1);
        }

        if (this.gui.isKeyPressed("KeyL")){
            this.movingFish.depthChange(-1);
        }

        if (this.gui.isKeyPressed("KeyC")) {
            if (this.movingFish.position[1] == 1 && !this.movingFish.hasRock) {
                for (var i = 0; i < this.rockSet.nRocks; i++) {
                    var d = this.distance(this.movingFish.position, this.rockSet.description[i * 12 + 9], this.rockSet.description[i * 12 + 11]);
                    if (d <= 1.5) {
                        this.movingFish.grabRock();
                        this.rockSet.description[i * 12 + 6] = true;
                        break;
                    }
                }

                for (var i = 0; i < this.rockSet2.nRocks; i++) {
                    var d = this.distance(this.movingFish.position, this.rockSet2.description[i * 12 + 9], this.rockSet2.description[i * 12 + 11]);
                    if (d <= 1.5) {
                        this.movingFish.grabRock();
                        this.rockSet2.description[i * 12 + 6] = true;
                        break;
                    }
                }
            }
        }

        if (this.gui.isKeyPressed("KeyC")) {
            if (this.movingFish.position[1] == 1 && this.movingFish.hasRock) {
                var d = this.distance(this.movingFish.position, this.nest.x, this.nest.z);
                if (d <= 5.0) {
                    this.movingFish.releaseRock();
                    this.nest.addPlaced();
                    this.rockSet.putDownRock(this.nest.getLocation());
                    this.rockSet2.putDownRock(this.nest.getLocation());
                }
            }
        }

        if (this.gui.isKeyPressed("KeyC")) {
            if (this.movingFish.position[1] == 6 && this.movingFish.hasRock) {
                var d = this.distance(this.movingFish.position, this.nest.x, this.nest.z);
                console.log(d);
                if (d <= 10.0) {
                    this.movingFish.releaseRock();
                    this.nest.addPlaced();
                    this.rockSet.throwRock(this.movingFish.position, this.nest.getLocation());
                    this.rockSet2.throwRock(this.movingFish.position, this.nest.getLocation());
                }
            }
        }

        if (this.gui.isKeyPressed("KeyR")){
            this.moving.reset();
            this.movingFish.reset();
            this.nest.reset();
            this.rockSet.reset();
            this.rockSet2.reset();
        }
    }

    distance(pos, x, z) {
        return Math.sqrt(Math.pow(pos[0] - x, 2) + Math.pow(pos[2] - z, 2));
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.moving.update(this.speedFactor);
        this.fish.update();
        this.movingFish.update(this.speedFactor);
        this.animatedFish.update(this.speedFactor);
        this.animatedFish2.update(this.speedFactor);
        this.rockSet.update(this.movingFish.position);
        this.rockSet2.update(this.movingFish.position);
        this.distortionShader.setUniformsValues({ timeFactor: t % 100000 / 100000 });
        this.display();
        //To be done...
    }

    updateTextureCubeMap(){
        this.cubemap.update(this.selectedTexture);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();


        this.defaultAppearance.apply();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        //this.incompleteSphere.display();
        //this.rotate(Math.PI / 2, 1, 0, 0);
        //this.translate(0.0, -0.5, 0.0);
        //this.pyramid.display();

        var translateMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            this.camera.position[0], this.camera.position[1], this.camera.position[2], 1.0
        ];

        var applifyMatrix = [
            500.0, 0.0, 0.0, 0.0,
            0.0, 500.0, 0.0, 0.0,
            0.0, 0.0, 500.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var scaleMatrix = [
            this.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        /*this.setActiveShader(this.defaultShader);
        this.pushMatrix();
        this.multMatrix(translateMatrix);
        this.multMatrix(applifyMatrix);
        this.cubemap.display();
        this.popMatrix();*/

        this.sand.bind(0);
        this.sandMap.bind(1);
        this.setActiveShader(this.heightShader);
        this.seaFloor.apply();
        this.pushMatrix();
        this.translate(0, -0.7, 0);
        this.sea.display();
        this.popMatrix()

        this.surface.bind(0);
        this.distortion.bind(1);
        this.setActiveShader(this.distortionShader);
        this.seaSurface.apply();
        this.pushMatrix();
        this.rotate(Math.PI, 1, 0, 0);
        this.translate(0, -10, -50);
        this.sea.display();
        this.popMatrix();

        this.setActiveShader(this.defaultShader);

        this.pushMatrix();
        this.translate(0, 1, 0);
        this.movingFish.display();
        this.popMatrix();
        this.animatedFish.display();
        this.animatedFish2.display();

        this.pushMatrix();
        this.multMatrix(translateMatrix);
        this.multMatrix(applifyMatrix);
        this.cubemap.display();
        this.popMatrix()
        this.pushMatrix();
        this.translate(45, 0, 20);
        this.pillar.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(45, 0, 25);
        this.pillar.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(35, 0, 20);
        this.pillar.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(35, 0, 25);
        this.pillar.display();
        this.popMatrix();

        this.multMatrix(scaleMatrix);

        this.pushMatrix();
        this.translate(30, 0, 30);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(43, 0, 7);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(5, 0, 25);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(40, 0, 45);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(10, 0, 35);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(40, 0, 35);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(5, 0, 42);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(35, 0, 10);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(26, 0, 36);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(26, 0, 36);
        this.seaweed.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(20, 0, 35);
        this.seaweed.display();
        this.popMatrix();


        this.pushMatrix();
        this.rockSet.display();
        this.popMatrix();
        this.pushMatrix();
        this.rockSet2.display();
        this.popMatrix();

        this.nest.display();

        // ---- END Primitive drawing section
    }
}
