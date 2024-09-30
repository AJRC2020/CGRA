import { CGFobject } from "../lib/CGF.js";

export class MyTriangleSmall extends CGFobject {
    constructor(scene, color) {
        super(scene);
        this.initBuffers(color);
    }

    initBuffers(color) {
        this.vertices = [
            1, 0, 0,
            0, 1, 0,
            -1, 0, 0
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.indices = [
            0, 1, 2,
        ];

        if(color == 0){
            this.texCoords = [
                0.0, 0.5,
                0.25, 0.25,
                0.0, 0.0
            ];
        }

        if(color == 1) {
            this.texCoords = [
                0.75, 0.75,
                0.5, 0.5,
                0.25, 0.75
            ];
        }

        if(color == 2){
            this.texCoords = [
                0.5, 1.0,
                0.0, 1.0,
                0.0, 0.5
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