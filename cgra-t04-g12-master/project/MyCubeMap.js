import { CGFobject, CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.initMaterial();
        this.initBuffers();
    }

    initMaterial(){

        this.top = new CGFtexture(this.scene, 'images/underwater_cubemap/top.jpg');
        this.front = new CGFtexture(this.scene, 'images/underwater_cubemap/front.jpg');
        this.right = new CGFtexture(this.scene, 'images/underwater_cubemap/right.jpg');
        this.back = new CGFtexture(this.scene, 'images/underwater_cubemap/back.jpg');
        this.left = new CGFtexture(this.scene, 'images/underwater_cubemap/left.jpg');
        this.bottom = new CGFtexture(this.scene, 'images/underwater_cubemap/bottom.jpg');

        this.quadMaterial = new CGFappearance(this.scene);
        this.quadMaterial.setAmbient(0.0, 0.0, 0.0, 0);
        this.quadMaterial.setDiffuse(0.0, 0.0, 0.0, 0);
        this.quadMaterial.setSpecular(0.0, 0.0, 0.0, 0);
        this.quadMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.loadTexture('images/earth.jpg');
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    update(texture) {
        if (texture == 0) {
            this.top = new CGFtexture(this.scene, 'images/demo_cubemap/top.png');
            this.front = new CGFtexture(this.scene, 'images/demo_cubemap/front.png');
            this.right = new CGFtexture(this.scene, 'images/demo_cubemap/right.png');
            this.back = new CGFtexture(this.scene, 'images/demo_cubemap/back.png');
            this.left = new CGFtexture(this.scene, 'images/demo_cubemap/left.png');
            this.bottom = new CGFtexture(this.scene, 'images/demo_cubemap/bottom.png');
        }
        if (texture == 1) {
            this.top = new CGFtexture(this.scene, 'images/test_cubemap/py.png');
            this.front = new CGFtexture(this.scene, 'images/test_cubemap/pz.png');
            this.right = new CGFtexture(this.scene, 'images/test_cubemap/px.png');
            this.back = new CGFtexture(this.scene, 'images/test_cubemap/nz.png');
            this.left = new CGFtexture(this.scene, 'images/test_cubemap/nx.png');
            this.bottom = new CGFtexture(this.scene, 'images/test_cubemap/ny.png');
        }
        if (texture == 2) {
            this.top = new CGFtexture(this.scene, 'images/new_cubemap/top.jpg');
            this.front = new CGFtexture(this.scene, 'images/new_cubemap/front.jpg');
            this.right = new CGFtexture(this.scene, 'images/new_cubemap/right.jpg');
            this.back = new CGFtexture(this.scene, 'images/new_cubemap/back.jpg');
            this.left = new CGFtexture(this.scene, 'images/new_cubemap/left.jpg');
            this.bottom = new CGFtexture(this.scene, 'images/new_cubemap/bottom.jpg');
        }
        if (texture == 3) {
            this.top = new CGFtexture(this.scene, 'images/underwater_cubemap/top.jpg');
            this.front = new CGFtexture(this.scene, 'images/underwater_cubemap/front.jpg');
            this.right = new CGFtexture(this.scene, 'images/underwater_cubemap/right.jpg');
            this.back = new CGFtexture(this.scene, 'images/underwater_cubemap/back.jpg');
            this.left = new CGFtexture(this.scene, 'images/underwater_cubemap/left.jpg');
            this.bottom = new CGFtexture(this.scene, 'images/underwater_cubemap/bottom.jpg');
        }
        this.display();
    }

    display() {
        var translateMatrix = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, -0.5, 1.0
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
        this.scene.multMatrix(rotateZMatrix);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.front);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.back);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateMinusX);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.bottom);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateXMatrix);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.top);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateMinusY);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.right);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.multMatrix(rotateYMatrix);
        this.scene.multMatrix(translateMatrix);
        this.quadMaterial.setTexture(this.left);
        this.quadMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}