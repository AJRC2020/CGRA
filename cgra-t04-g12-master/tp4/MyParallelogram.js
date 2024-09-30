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

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.indices = [
            1, 3, 2,
            2, 0, 1
        ];

        this.texCoords = [
            1.0, 1.0,
            0.5, 1.0,
            0.75, 0.75,
            0.25, 0.75
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}