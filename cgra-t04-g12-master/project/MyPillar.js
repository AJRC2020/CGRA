import {CGFappearance, CGFobject} from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyPillar extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinder = new MyCylinder(scene, 6);
        this.initMaterial();
        this.initBuffers();
    }

    initMaterial() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.0, 0.0, 0.0, 0);
        this.material.setDiffuse(0.0, 0.0, 0.0, 0);
        this.material.setSpecular(0.0, 0.0, 0.0, 0);
        this.material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tree.jpg');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.material.apply();
        for (var i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            this.scene.scale(1, 2.5, 1);
            this.scene.translate(0, i, 0);
            this.cylinder.display();
            this.scene.popMatrix();
        }
    }
}