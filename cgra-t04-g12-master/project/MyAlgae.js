import {CGFappearance, CGFobject} from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";

export class MyAlgae extends CGFobject {
    constructor(scene) {
        super(scene);
        this.leaf = new MyPyramid(scene, 4, 1);
        this.leaves = Math.random() * 10 + 1;
        this.random = [];
        this.initRandom();
        this.initBuffers();
    }

    initRandom() {

        for (var i = 0; i < this.leaves; i++) {

            this.green = new CGFappearance(this.scene);
            this.green.setAmbient(0, (Math.random() * 10 + 1) / 10, 0, 1);
            this.green.setDiffuse(0, (Math.random() * 10 + 1) / 10, 0, 1);
            this.green.setSpecular(0, (Math.random() * 10 + 1) / 10, 0, 1);
            this.green.setShininess(10);
            this.random.push(this.green);

            this.random.push((Math.random() * 2 + 1) / 10);
            this.random.push((Math.random() * 5 + 8) / 10);
            this.random.push((Math.random() * 2 + 1) / 10);
            this.random.push(Math.random() * 7 - 3);
            this.random.push(Math.random() * 7 - 3);
        }

    }

    display() {
        for (var i = 0; i < this.leaves; i++) {

            this.random[i * 6].apply();
            this.scene.pushMatrix();
            this.scene.scale(this.random[i * 6 + 1], this.random[i * 6 + 2], this.random[i * 6 + 3]);
            this.scene.translate(this.random[i * 6 + 4], 0, this.random[i * 6 + 5]);
            this.leaf.display();
            this.scene.popMatrix();

        }
    }
}