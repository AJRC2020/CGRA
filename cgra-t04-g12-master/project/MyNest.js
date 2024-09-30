import {CGFappearance, CGFobject} from "../lib/CGF.js";
import {MySphere} from "./MySphere.js";

export class MyNest extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.sphere = new MySphere(scene, 16, 8);
        this.locations = [];
        this.x = x;
        this.z = z;
        this.placed = -1;
        this.initMaterial();
        this.initLocations();
        this.initBuffers();
    }

    initMaterial() {

        this.nest = new CGFappearance(this.scene);
        this.nest.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.nest.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.nest.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.nest.setEmission(0,0,0,1);
        this.nest.setShininess(120);
        this.nest.loadTexture("images/nest.jpg");
        this.nest.setTextureWrap('REPEAT', 'REPEAT');

    }

    initLocations() {

        for (var i = 0; i < 10; i++) {
            var angle = (2 * Math.PI / 10 * i) + (Math.PI / Math.random() * 30 + 15);
            this.locations.push(this.x + 5.5 * Math.cos(angle));
            this.locations.push(0);
            this.locations.push(this.z + 5.5 * Math.sin(angle));
        }

    }

    addPlaced() { this.placed++; }

    getLocation() {
        var send = [];
        for (var i = 0; i < 3; i++) {
            send.push(this.locations[this.placed * 3 + i]);
        }
        return send;
    }

    reset() {
        this.placed = -1;
    }

    display() {

        this.nest.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);
        this.scene.scale(5, 5, 5);
        this.sphere.display();
        this.scene.popMatrix();

    }
}