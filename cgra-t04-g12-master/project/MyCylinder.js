import { CGFobject } from "../lib/CGF.js";

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
/*
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        this.vertices = [
            Math.cos(ang), 0, Math.sin(ang),
            Math.cos(ang), 1, Math.sin(ang),
            Math.cos(alphaAng), 0, Math.sin(alphaAng),
            Math.cos(alphaAng), 1, Math.sin(alphaAng)
        ];

        this.indices = [
            0, 1, 2,
            1, 3, 2
        ];

        this.texCoords = [
            0, 1,
            0, 0,
            1 / this.slices, 1,
            1 / this.slices, 0
        ];
*/


        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, Math.sin(ang));
            this.indices.push(2*i, (2*i+1) % (2*this.slices), (2*i+2) % (2*this.slices));
            this.indices.push((2*i+1) % (2*this.slices), (2*i+3) % (2*this.slices), (2*i+2) % (2*this.slices));
            this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            this.texCoords.push(1 - i / this.slices, 1);
            this.texCoords.push(1 - i / this.slices, 0);
            ang += alphaAng;

        }

        this.vertices.push(1, 0, 0);
        this.vertices.push(1, 1, 0);
        this.indices.push(10, 11, 12);
        this.indices.push(11, 13, 12);
        this.normals.push(1, 0, 0);
        this.normals.push(1, 0, 0);
        this.texCoords.push(0, 1);
        this.texCoords.push(0, 0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}