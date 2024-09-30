import {CGFappearance, CGFobject} from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MySeaFloor extends CGFobject {
    constructor(scene, divs) {
        super(scene);
        this.divs = divs;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (var y = 0; y < this.divs + 1; y++) {
            for (var x = 0; x < this.divs + 1; x++) {
                this.vertices.push(x * 50 / this.divs, 0, y * 50 / this.divs);
                this.normals.push(0, 1, 0);
                this.texCoords.push(x / this.divs, y / this.divs);
            }
        }

        var c = 0;

        for (var i = 0; i < this.divs * (this.divs + 1) - 1  ; i++) {
            if(c != this.divs) {
                this.indices.push(i, this.divs + i + 1, i + 1);
                this.indices.push(this.divs + i + 1, this.divs + i + 2, i + 1);
                c++;
            }
            else
                c = 0;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}