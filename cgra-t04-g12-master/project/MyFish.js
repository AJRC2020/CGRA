import {CGFappearance, CGFobject, CGFshader, CGFtexture} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

export class MyFish extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 16, 8);
        this.triangle = new MyTriangleBig(scene);
        this.rightFins = 0;
        this.leftFins = 0;
        this.tail = 0;
        this.changeFins = Math.PI / 120;
        this.changeTail = Math.PI / 180;
        this.initMaterials(0.4, 1, 0, 0);
        this.initBuffers();
    }

    initMaterials(ratio, r, g, b){

        this.eyematerial = new CGFappearance(this.scene);
        this.eyematerial.setAmbient(1, 1, 1, 1);
        this.eyematerial.setDiffuse(1, 1, 1, 1);
        this.eyematerial.setSpecular(1, 1, 1, 1);
        this.eyematerial.setShininess(10);
        this.eyematerial.loadTexture("images/fish_eye.jpg");
        this.eyematerial.setTextureWrap('REPEAT', 'REPEAT');

        this.scalematerial = new CGFappearance(this.scene);
        this.scalematerial.setAmbient(1, 1, 1, 1);
        this.scalematerial.setDiffuse(1, 1, 1, 1);
        this.scalematerial.setSpecular(1, 1, 1, 1);
        this.scalematerial.setShininess(10);
        this.scalematerial.loadTexture("images/fish_scale.jpg");
        this.scalematerial.setTextureWrap('REPEAT', 'REPEAT');

        this.color = new CGFappearance(this.scene);
        this.color.setAmbient(r, g, b, 1);
        this.color.setDiffuse(r, g, b, 1);
        this.color.setSpecular(r, g, b, 1);
        this.color.setShininess(10);

        this.shader = new CGFshader(this.scene.gl, "shaders/head.vert", "shaders/head.frag");
        this.shader.setUniformsValues({ ratio : ratio });
        this.shader.setUniformsValues({ red : r });
        this.shader.setUniformsValues({ green : g });
        this.shader.setUniformsValues({ blue : b });

    }

    update() {

        this.rightFins += this.changeFins;
        this.leftFins += this.changeFins;
        this.tail += this.changeTail;

        if (this.tail > Math.PI / 9 || this.tail < -Math.PI / 9) {
            this.changeTail = -this.changeTail;
        }

        if (this.rightFins > Math.PI / 12 || this.rightFins < 0.0 || this.leftFins > Math.PI / 12 || this.leftFins < 0.0) {
            this.changeFins = -this.changeFins;
        }

    }

    display() {

        this.scene.pushMatrix();
        this.scene.scale(0.85, 1.0, 1.35);
        this.scene.setActiveShader(this.shader);
        this.scalematerial.apply();
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.color.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(this.tail, 1, 0, 0);
        this.scene.translate(0, -4.5, this.tail / (Math.PI / 7));
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.scene.translate(-3, -4, 0);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
        this.scene.rotate(Math.PI / 6 + this.rightFins, 1, 1, 0);
        this.scene.translate(-3, 3, 1);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
        this.scene.rotate(-Math.PI / 6 - this.leftFins, 1, 1, 0);
        this.scene.translate(-3, 3, -1);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(-2.25, 0.5, -2.75);
        this.eyematerial.apply();
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.25, 0.25, 0.25);
        this.scene.translate(-2.25, 0.5, 2.75);
        this.sphere.display();
        this.scene.popMatrix();

    }
}