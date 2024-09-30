import {CGFappearance, CGFobject} from "../lib/CGF.js";
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
        this.initMaterials();
    }

    initMaterials() {
        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(1, 0.0, 1, 1.0);
        this.material1.setDiffuse(1, 0.0, 1, 1.0);
        this.material1.setSpecular(1, 1.0, 1, 1.0);
        this.material1.setShininess(10.0);

        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(0, 1, 0, 1.0);
        this.material2.setDiffuse(0, 1, 0, 1.0);
        this.material2.setSpecular(1, 1, 1, 1.0);
        this.material2.setShininess(10.0);

        this.material3 = new CGFappearance(this.scene);
        this.material3.setAmbient(0, 0, 1, 1.0);
        this.material3.setDiffuse(0, 0, 1, 1.0);
        this.material3.setSpecular(1, 1, 1, 1.0);
        this.material3.setShininess(10.0);

        this.material4 = new CGFappearance(this.scene);
        this.material4.setAmbient(1.0, 0.5, 0.0, 1.0);
        this.material4.setDiffuse(1.0, 0.5, 0.0, 1.0);
        this.material4.setSpecular(1.0, 1, 1.0, 1.0);
        this.material4.setShininess(10.0);

        this.material5 = new CGFappearance(this.scene);
        this.material5.setAmbient(1, 0, 0, 1.0);
        this.material5.setDiffuse(1, 0, 0, 1.0);
        this.material5.setSpecular(1, 1, 1, 1.0);
        this.material5.setShininess(10.0);

        this.material6 = new CGFappearance(this.scene);
        this.material6.setAmbient(1, 1, 0, 1.0);
        this.material6.setDiffuse(1, 1, 0, 1.0);
        this.material6.setSpecular(1, 1, 1, 1.0);
        this.material6.setShininess(10.0);

        this.material7 = new CGFappearance(this.scene);
        this.material7.setAmbient(1.0, 0.4, 0.7, 1.0);
        this.material7.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.material7.setSpecular(1.0, 1, 1, 1.0);
        this.material7.setShininess(10.0);
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
        this.material1.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix3);
        this.material3.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotate180Matrix);
        this.scene.multMatrix(translateMatrix4);
        this.material4.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix4);
        this.scene.multMatrix(rotate315Matrix);
        this.scene.multMatrix(translateMatrix5);
        this.material5.apply();
        this.triangleSmall.display()
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix6);
        this.scene.multMatrix(rotate315Matrix);
        this.material6.apply();
        this.side4.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(appMatrix);
        this.scene.multMatrix(translateMatrix7);
        this.material7.apply();
        this.triangleSmall.display();
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

