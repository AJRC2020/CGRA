import { MyMovingObject } from "./MyMovingObject.js";
import { MyFish } from "./MyFish.js";

export class MyAnimatedFish extends MyMovingObject {
    constructor(scene, x, z) {
        super(scene);
        this.fish = new MyFish(scene);
        this.x = x;
        this.z = z;
        this.angV = 2 * Math.PI / ((Math.random() * 9 + 2) * 50);
        this.vel = this.angV * 5;
        this.ratio = (Math.random() * 3 + 1) / 10;
        this.r = (Math.random() * 11) / 10;
        this.g = (Math.random() * 11) / 10;
        this.b = (Math.random() * 11) / 10;
        this.initMaterial(this.ratio, this.r, this.g, this.b);
        this.initBuffers()
    }

    initMaterial(ratio, r, g, b) {
        this.fish.initMaterials(ratio, r, g, b);
    }

    update(factor) {

        this.pos[12] += this.vel * factor * Math.sin(-this.totalAngle);
        this.pos[14] += this.vel * factor * Math.cos(-this.totalAngle);

        this.pos[0] = Math.cos(this.angV * factor + this.totalAngle);
        this.pos[2] = Math.sin(this.angV * factor + this.totalAngle);
        this.pos[8] = -Math.sin(this.angV * factor + this.totalAngle);
        this.pos[10] = Math.cos(this.angV * factor + this.totalAngle);
        this.totalAngle += this.angV * factor;

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
        this.scene.translate(this.x, 1, this.z);
        this.scene.multMatrix(this.pos);
        this.fish.display();
        this.scene.popMatrix();
    }

}