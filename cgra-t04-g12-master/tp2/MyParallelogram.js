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
            3, 1, 0
        ];

        this.indices = [
            1, 3, 2,
            2, 0, 1,
            2, 3, 1,
            1, 0, 2,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}