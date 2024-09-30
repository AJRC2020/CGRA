import {CGFobject} from '../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
        this.angle = 0;
        this.totalAngle = 0;
        this.velocity = 0;
        this.pos = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,0,0.5);
            this.vertices.push(ca, sa, -0.5);
            this.vertices.push(caa, saa, -0.5);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                caa-ca,
                ca*saa-sa*caa
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    turn(val){
        this.angle += val;
    }

    accelerate(val){
        this.velocity += val;
    }

    reset(){
        this.pos = [
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];

        this.velocity = 0;
        this.angle = 0;
        this.totalAngle = 0;
    }

    update(factor) {

        this.pos[12] += this.velocity * factor * Math.sin(-this.totalAngle);
        this.pos[14] += this.velocity * factor * Math.cos(-this.totalAngle);

        this.pos[0] = Math.cos(this.angle * factor + this.totalAngle);
        this.pos[2] = Math.sin(this.angle * factor + this.totalAngle);
        this.pos[8] = -Math.sin(this.angle * factor + this.totalAngle);
        this.pos[10] = Math.cos(this.angle * factor + this.totalAngle);
        this.totalAngle += this.angle * factor;

    }

    display(){
        this.scene.pushMatrix();
        this.scene.multMatrix(this.pos);
        super.display();
        this.scene.popMatrix();
    }
}


