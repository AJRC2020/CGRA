import {CGFobject} from "../lib/CGF.js";

export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,
            2, 0, 0,
            1, 1, 0,
            3, 1, 0,
            0, 0, 0,
            2, 0, 0,
            1, 1, 0,
            3, 1, 0
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        this.indices = [
            1, 3, 2,
            2, 0, 1,
            6, 7, 5,
            5, 4, 6,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}