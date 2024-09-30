import { MyMovingObject } from "./MyMovingObject.js";
import { MyFish } from "./MyFish.js";

export class MyMovingFish extends MyMovingObject {
    constructor(scene) {
        super(scene);
        this.fish = new MyFish(scene);
        this.depth = 0;
        this.position = [0, 0, 1.5];
        this.hasRock = false;
        this.initBuffers();
    }

    depthChange(signal) {
        if(signal == 1) this.depth = 0.1;
        else this.depth = -0.1;
    }

    grabRock() {
        this.hasRock = true;
    }

    releaseRock() {
        this.hasRock = false;
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
        this.depth = 0;
        this.fish.rightFins = 0;
        this.fish.leftFins = 0;
        this.fish.tail = 0;
        this.changeFins = Math.PI / 120;
        this.changeTail = Math.PI / 180;
        this.position = [0, 0, 1.5];
        this.hasRock = false;

    }

    update(factor) {

        this.pos[12] += this.velocity * factor * Math.sin(-this.totalAngle);
        this.pos[14] += this.velocity * factor * Math.cos(-this.totalAngle);

        this.pos[0] = Math.cos(this.angle * factor + this.totalAngle);
        this.pos[2] = Math.sin(this.angle * factor + this.totalAngle);
        this.pos[8] = -Math.sin(this.angle * factor + this.totalAngle);
        this.pos[10] = Math.cos(this.angle * factor + this.totalAngle);
        this.totalAngle += this.angle * factor;

        var pos = this.pos[13] + this.depth * factor;
        if (pos < 0) {
            this.depth = 0;
            this.pos[13] = 0;
        }
        else if (pos > 5) {
            this.depth = 0;
            this.pos[13] = 5;
        }
        else {
            this.pos[13] = pos;
        }

        this.position[0] = 1.5 * Math.sin(-this.totalAngle) + this.pos[12];
        this.position[1] = this.pos[13] + 1;
        this.position[2] = 1.5 * Math.cos(-this.totalAngle) + this.pos[14];

        this.fish.rightFins += this.fish.changeFins;
        this.fish.leftFins += this.fish.changeFins;
        if (this.fish.changeTail > 0)
            this.fish.tail += (this.fish.changeTail + Math.PI / 360 * Math.abs(this.velocity / 0.1));
        else
            this.fish.tail += (this.fish.changeTail - Math.PI / 360 * Math.abs(this.velocity / 0.1));

        if (this.fish.tail > Math.PI / 9 || this.fish.tail < -Math.PI / 9) {
            this.fish.changeTail = -this.fish.changeTail;
        }

        if (this.fish.rightFins > Math.PI / 12 || this.fish.rightFins < 0.0 || this.fish.leftFins > Math.PI / 12 || this.fish.leftFins < 0.0) {
            this.fish.changeFins = -this.fish.changeFins;
        }

        if (this.angle > 0) this.fish.leftFins = Math.PI / 120;
        if (this.angle < 0) this.fish.rightFins = Math.PI / 120;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.multMatrix(this.pos);
        this.fish.display();
        this.scene.popMatrix();
    }

}