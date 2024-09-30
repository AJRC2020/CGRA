import { CGFobject } from "../lib/CGF.js";

export class MyTriangleBig extends CGFobject {
    constructor(scene, color) {
        super(scene);
        this.initBuffers(color);
    }

    initBuffers(color) {
        this.vertices = [
            2, 0, 0,
            0, 2, 0,
            -2, 0, 0
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        ];

        this.indices = [
            0, 1, 2
        ];

        if(color == 1){
            this.texCoords = [
                1.0, 0.0,
                0.5, 0.5,
                1.0, 1.0
            ];
        }

        if(color == 0) {
            this.texCoords = [
                1.0, 0.0,
                0.5, 0.5,
                0.0, 0.0
            ];
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}