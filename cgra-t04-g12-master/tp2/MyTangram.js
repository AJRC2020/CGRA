import {CGFobject} from "../lib/CGF.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.diamond = new MyDiamond(scene);
        this.side4 = new MyParallelogram(scene);
        this.initBuffers();
    }

    display() {
        var translateMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            2.0, -1.0, 0.0, 1.0,
        ];

        var translateMatrix2 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            -1.0, 0.0, 0.0, 1.0,
        ];

        var translateMatrix3 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, -2.0, 0.0, 1.0,
        ];

        var translateMatrix4 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            2.0, 0.0, 0.0, 1.0,
        ];

        var translateMatrix5 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.4, 0.0, 0.0, 1.0,
        ];

        var translateMatrix6 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.2, 1.8, 0.0, 1.0,
        ];

        var translateMatrix7 = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            1.1, 1.8, 0.0, 1.0,
        ];

        var rotate315Matrix = [
            Math.cos(-Math.PI / 4), Math.sin(-Math.PI / 4), 0.0, 0.0,
            -Math.sin(-Math.PI / 4), Math.cos(-Math.PI / 4), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        var rotate180Matrix = [
            Math.cos(Math.PI), Math.sin(Math.PI), 0.0, 0.0,
            -Math.sin(Math.PI), Math.cos(Math.PI), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var appMatrix = [
            1.5, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(rotate180Matrix);
        this.scene.multMatrix(translateMatrix2);
        this.triangleSmall.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.diamond.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix3);
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotate180Matrix);
        this.scene.multMatrix(translateMatrix4);
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix4);
        this.scene.multMatrix(rotate315Matrix);
        this.scene.multMatrix(translateMatrix5);
        this.triangleSmall.display()
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix6);
        this.scene.multMatrix(rotate315Matrix);
        this.side4.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(appMatrix);
        this.scene.multMatrix(translateMatrix7);
        this.triangleSmall.display();
        this.scene.popMatrix();
    }


}