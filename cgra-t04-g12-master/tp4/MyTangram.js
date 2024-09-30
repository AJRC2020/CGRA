import {CGFappearance, CGFobject} from "../lib/CGF.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangleSmall1 = new MyTriangleSmall(scene, 0);
        this.triangleSmall2 = new MyTriangleSmall(scene, 1);
        this.triangleSmall3 = new MyTriangleSmall(scene, 2);
        this.triangleBig1 = new MyTriangleBig(scene, 0);
        this.triangleBig2 = new MyTriangleBig(scene, 1);
        this.diamond = new MyDiamond(scene);
        this.side4 = new MyParallelogram(scene);
        this.initBuffers();
        this.initMaterials();
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture("images/tangram.png");
        this.material.setTextureWrap("REPEAT", "REPEAT");

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
        this.material.apply();
        this.triangleSmall1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.material.apply();
        this.diamond.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix3);
        this.material.apply();
        this.triangleBig1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotate180Matrix);
        this.scene.multMatrix(translateMatrix4);
        this.material.apply();
        this.triangleBig2.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix4);
        this.scene.multMatrix(rotate315Matrix);
        this.scene.multMatrix(translateMatrix5);
        this.material.apply();
        this.triangleSmall2.display()
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix6);
        this.scene.multMatrix(rotate315Matrix);
        this.material.apply();
        this.side4.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(appMatrix);
        this.scene.multMatrix(translateMatrix7);
        this.material.apply();
        this.triangleSmall3.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.diamond.updateBuffers(complexity);
        this.triangleSmall.updateBuffers(complexity);
        this.triangleBig.updateBuffers(complexity);
        this.side4.updateBuffers(complexity);
        this.initNormalVizBuffers();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
        this.side4.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
        this.side4.disableNormalViz();
    }

}

