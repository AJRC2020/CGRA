import { MyQuad } from "./MyQuad.js";
import { CGFobject } from "../lib/CGF.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.initBuffers();
    }

    display() {
        var translateMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.5, 1.0
        ];

        var translateMatrix2 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, -0.5, 1.0
        ];


        var rotateXMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), 0.0,
            0.0, -Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var rotateYMatrix = [
            Math.cos(Math.PI / 2), 0.0, -Math.sin(Math.PI / 2), 0.0,
            0.0, 1.0, 0.0, 0.0,
            Math.sin(Math.PI / 2), 0.0, Math.cos(Math.PI / 2), 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix2);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateXMatrix);
        this.scene.multMatrix(translateMatrix);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateXMatrix);
        this.scene.multMatrix(translateMatrix2);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateYMatrix);
        this.scene.multMatrix(translateMatrix);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateYMatrix);
        this.scene.multMatrix(translateMatrix2);
        this.quad.display();
    }
}