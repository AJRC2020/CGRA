import { CGFobject, CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad1 = new MyQuad(scene, 0);
        this.quad2 = new MyQuad(scene, 1);
        this.initMaterial();
        this.initBuffers();
    }

    initMaterial(){
        this.top = new CGFtexture(this.scene, 'images/mineTop.png');
        this.front = new CGFtexture(this.scene, 'images/mineSide.png');
        this.right = new CGFtexture(this.scene, 'images/mineSide.png');
        this.back = new CGFtexture(this.scene, 'images/mineSide.png');
        this.left = new CGFtexture(this.scene, 'images/mineSide.png');
        this.bottom = new CGFtexture(this.scene, 'images/mineBottom.png');
        this.quadMaterial = new CGFappearance(this.scene);
        this.quadMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.loadTexture('images/default.png');
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        var translateMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.5, 1.0
        ];

        var rotateZMatrix = [
            Math.cos(Math.PI), 0.0, -Math.sin(Math.PI), 0.0,
            0.0, 1.0, 0.0, 0.0,
            Math.sin(Math.PI), 0.0, Math.cos(Math.PI), 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var rotateXMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), 0.0,
            0.0, -Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var rotateMinusX = [
            1.0, 0.0, 0.0, 0.0,
            0.0, Math.cos(-Math.PI / 2), Math.sin(-Math.PI / 2), 0.0,
            0.0, -Math.sin(-Math.PI / 2), Math.cos(-Math.PI / 2), 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var rotateYMatrix = [
            Math.cos(Math.PI / 2), 0.0, -Math.sin(Math.PI / 2), 0.0,
            0.0, 1.0, 0.0, 0.0,
            Math.sin(Math.PI / 2), 0.0, Math.cos(Math.PI / 2), 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        var rotateMinusY = [
            Math.cos(-Math.PI / 2), 0.0, -Math.sin(-Math.PI / 2), 0.0,
            0.0, 1.0, 0.0, 0.0,
            Math.sin(-Math.PI / 2), 0.0, Math.cos(-Math.PI / 2), 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.front);
        this.quadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateZMatrix);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.back);
        this.quadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad2.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateXMatrix);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.bottom);
        this.quadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateMinusX);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.top);
        this.quadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad2.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateYMatrix);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.right);
        this.quadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad1.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateMinusY);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.left);
        this.quadMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad2.display();
    }
}