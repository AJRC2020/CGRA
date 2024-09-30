import {CGFappearance, CGFobject} from "../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene, nRocks, x, z) {
        super(scene);
        this.nRocks = nRocks;
        this.rock = new MyRock(scene, 8, 4);
        this.description = [];
        this.x = x;
        this.z = z;
        this.initRandom();
        this.initMaterial();
        this.initBuffers();

    }

    initRandom() {
        for (var i = 0; i < this.nRocks; i++) {

            this.description.push((Math.random() * 11 + 10) / 100);
            this.description.push((Math.random() * 11 + 10) / 100);
            this.description.push((Math.random() * 11 + 10) / 100);
            this.description.push((Math.random() * 41) - 20);
            this.description.push((Math.random() * 41) - 20);
            this.description.push(Math.PI / ((Math.random() * 5) + 2));
            this.description.push(false);
            this.description.push(false);
            this.description.push(false);
            this.description.push(this.x + this.description[i * 12] * this.description[i * 12 + 3]);
            this.description.push(0);
            this.description.push(this.z + this.description[i * 12 + 2] * this.description[i * 12 + 4]);

        }
    }

    initMaterial() {

        this.color = new CGFappearance(this.scene);
        this.color.setAmbient(0.141, 0.141, 0.141, 1.0);
        this.color.setDiffuse(0.141, 0.141, 0.141, 1.0);
        this.color.setSpecular(0.141, 0.141, 0.141, 1.0);
        this.color.setShininess(10.0);

    }

    update(pos) {
        for (var i = 0; i < this.nRocks; i++) {
            if (this.description[i * 12 + 6]) {
                this.description[i * 12 + 9] = pos[0] / this.description[i * 12];
                this.description[i * 12 + 10] = pos[1] / this.description[i * 12 + 1];
                this.description[i * 12 + 11] = pos[2] / this.description[i * 12 + 2];
            }
            if (this.description[i * 12 + 8]) {
                if (this.description[i * 12 + 10] < 0) {
                    this.putDownRock(this.scene.nest.getLocation());

                }
                else {
                    this.description[i * 12 + 9] = (this.originalX + this.velX * this.interval) / this.description[i * 12];
                    this.description[i * 12 + 10] = (5 - this.accel * Math.pow(this.interval, 2)) / this.description[i * 12 + 1];
                    this.description[i * 12 + 11] = (this.originalZ + this.velZ * this.interval) / this.description[i * 12 + 2];
                    this.interval += this.interval;

                }

            }
        }
    }

    reset() {
        for (var i = 0; i < this.nRocks; i++) {
            this.description[i * 12 + 6] = false;
            this.description[i * 12 + 7] = false;
            this.description[i * 12 + 8] = false;
            this.description[i * 12 + 9] = this.x + this.description[i * 12] * this.description[i * 12 + 3];
            this.description[i * 12 + 10] = 0;
            this.description[i * 12 + 11] = this.z + this.description[i * 12 + 2] * this.description[i * 12 + 4];
        }
    }

    putDownRock(pos) {
        for (var i = 0; i < this.nRocks; i++) {
            if (this.description[i * 12 + 6] || this.description[i * 12 + 8]) {
                this.description[i * 12 + 6] = false;
                this.description[i * 12 + 7] = true;
                this.description[i * 12 + 8] = false;
                this.description[i * 12 + 9] = pos[0] / this.description[i * 12];
                this.description[i * 12 + 10] = pos[1] / this.description[i * 12 + 1];
                this.description[i * 12 + 11] = pos[2] / this.description[i * 12 + 2];
            }
        }
    }

    throwRock(fish, pos) {
        for (var i = 0; i < this.nRocks; i++) {
            if (this.description[i * 12 + 6]) {
                this.description[i * 12 + 6] = false;
                this.description[i * 12 + 8] = true;
            }
        }

        this.originalX = fish[0];
        this.originalZ = fish[2];
        this.velX = (pos[0] - fish[0]) / (50 * 50);
        this.velZ = (pos[2] - fish[2]) / (50 * 50);
        this.accel = 5 / (Math.pow(50 * 50, 2));
        this.interval = 1;
    }

    display() {
        this.color.apply();
        this.scene.translate(this.x, 0, this.z);

        for (var i = 0; i < this.nRocks; i++) {
            if (this.description[i * 12 + 6] || this.description[i * 12 + 7] || this.description[i * 12 + 8])
                this.scene.translate(-this.x, 0, -this.z);
            this.scene.pushMatrix();
            this.scene.scale(this.description[i * 12], this.description[i * 12 + 1], this.description[i * 12 + 2]);
            if (this.description[i * 12 + 6] || this.description[i * 12 + 7] || this.description[i * 12 + 8])
                this.scene.translate(this.description[i * 12 + 9], this.description[i * 12 + 10], this.description[i * 12 + 11]);
            else
                this.scene.translate(this.description[i * 12 + 3], 0, this.description[i * 12 + 4]);
            this.scene.rotate(this.description[i * 12 + 5], 0, 1, 0);
            this.rock.display();
            this.scene.popMatrix();
            if (this.description[i * 12 + 6] || this.description[i * 12 + 7] || this.description[i * 12 + 8])
                this.scene.translate(this.x, 0, this.z);
        }

    }

}