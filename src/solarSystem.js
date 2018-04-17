'use strict';

class Planet extends PIXI.Sprite {

    constructor(texture, planet = null, speed = 0, radius = 600) {
        super(texture);
        this.planet = planet;
        this.speed = speed;
        this.radius = radius;
        this.currentDegrees = Math.random() * 360;
        this.anchor.set(0.5);
        this.update.bind(this);
    }

    update() {
        if (this.planet != null) {
            this.currentDegrees += this.speed;
            var radians = this.getRadians(this.currentDegrees);
            var posX = this.planet.x + Math.sin(radians) * this.radius;
            var posY = this.planet.y + Math.cos(radians) * this.radius;
            this.x = posX;
            this.y = posY;
        } else {
            this.rotation += this.speed;
        }
    }

    getRadians(degrees) {
        return degrees * Math.PI / 180;
    }

}

class Main {

    constructor() {
        var app = new PIXI.Application(800, 600);
        document.body.appendChild(app.view);

        PIXI.loader
            .add('assets/planets.json')
            .load(onAssetsLoaded);

        function onAssetsLoaded() {
            var planets = [];

            var bg = new PIXI.Sprite(PIXI.Texture.fromFrame('background.png'));
            var sun = new Planet(PIXI.Texture.fromFrame('sun.png'), null, 0.001, 0);

            var mercury = new Planet(PIXI.Texture.fromFrame('mercury.png'), sun, 1, 300);
            var venus = new Planet(PIXI.Texture.fromFrame('venus.png'), sun, 0.5, 400);
            var earth = new Planet(PIXI.Texture.fromFrame('earth.png'), sun, 0.2, 500);
            var moon = new Planet(PIXI.Texture.fromFrame('moon.png'), earth, 5, 50);
            var mars = new Planet(PIXI.Texture.fromFrame('mars.png'), sun, 0.15, 600);
            var moonm1 = new Planet(PIXI.Texture.fromFrame('moon.png'), mars, 2, 30);
            var moonm2 = new Planet(PIXI.Texture.fromFrame('moon.png'), mars, 5, 50);
            var jupiter = new Planet(PIXI.Texture.fromFrame('jupiter.png'), sun, 0.1, 700);
            var moon2 = new Planet(PIXI.Texture.fromFrame('moon.png'), jupiter, 2, 140);
            var moon3 = new Planet(PIXI.Texture.fromFrame('moon.png'), jupiter, 5, 120);
            var moon4 = new Planet(PIXI.Texture.fromFrame('moon.png'), jupiter, 3, 100);
            var saturn = new Planet(PIXI.Texture.fromFrame('saturn.png'), sun, 0.02, 1000);
            var uranus = new Planet(PIXI.Texture.fromFrame('uranus.png'), sun, 0.01, 1200);
            var neptune = new Planet(PIXI.Texture.fromFrame('neptune.png'), sun, 0.005, 1410);

            planets.push(sun);
            planets.push(mercury);
            planets.push(venus);
            planets.push(earth);
            planets.push(moon);
            planets.push(mars);
            planets.push(moonm1);
            planets.push(moonm2);
            planets.push(jupiter);
            planets.push(moon2);
            planets.push(moon3);
            planets.push(moon4);
            planets.push(saturn);
            planets.push(uranus);
            planets.push(neptune);

            var holder = new PIXI.Sprite();
            app.stage.addChild(bg);
            app.stage.addChild(holder);

            for (let i = 0; i < planets.length; i++) {
                holder.addChild(planets[i]);
            }

            holder.scale.x = 0.2;
            holder.scale.y = 0.2;
            holder.x = app.view.width / 2;
            holder.y = app.view.height / 2;
            holder.anchor.set(0.5);

            app.ticker.add(function () {
                for (let i = 0; i < planets.length; i++) {
                    let planet = planets[i];
                    planet.update();
                }
            });
        }

    }
}

let main = new Main();