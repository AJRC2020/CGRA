import { CGFobject } from "../lib/CGF.js";

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            // frente
            0.5, 0.5, -0.5,  //0
            0.5, -0.5, -0.5, //1
            0.5, -0.5, 0.5,  //2
            0.5, 0.5, 0.5,   //3

            // trás
            -0.5, 0.5, -0.5, //4
            -0.5, -0.5, -0.5,//5
            -0.5, -0.5, 0.5, //6
            -0.5, 0.5, 0.5,  //7

            // baixo
            0.5, 0.5, -0.5,  //8
            0.5, -0.5, -0.5, //9
            -0.5, -0.5, -0.5,//10
            -0.5, 0.5, -0.5, //11

            // cima
            0.5, 0.5, 0.5,   //12
            0.5, -0.5, 0.5,  //13
            -0.5, -0.5, 0.5, //14
            -0.5, 0.5, 0.5,  //15

            // direita
            0.5, 0.5, -0.5,  //16
            -0.5, 0.5, -0.5, //17
            -0.5, 0.5, 0.5,  //18
            0.5, 0.5, 0.5,   //19

            // esquerda
            0.5, -0.5, -0.5, //20
            -0.5, -0.5, -0.5,//21
            -0.5, -0.5, 0.5, //22
            0.5, -0.5, 0.5  //23
        ];

        this.normals = [
            //frente
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,

            //trás
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,

            //baixo
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,

            //cima
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            //direita
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            //esquerda
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0
        ];

        this.indices = [
            //face de frente
            0, 1, 2,
            0, 2, 3,
            2, 1, 0,
            3, 2, 0,

            //face de trás
            4, 5, 6,
            4, 6, 7,
            6, 5, 4,
            7, 6, 4,

            //face de baixo
            8, 9, 10,
            8, 10, 11,
            10, 9, 8,
            11, 10, 8,

            //face de cima
            12, 13, 14,
            12, 14, 15,
            14, 13, 12,
            15, 14, 12,

            //face direita
            16, 17, 18,
            16, 18, 19,
            18, 17, 16,
            19, 18, 16,

            //face esquerda
            20, 21, 22,
            20, 22, 23,
            22, 21, 20,
            23, 22, 20
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}

