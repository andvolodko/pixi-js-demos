'use strict';
class Main {

    constructor() {
        var app = new PIXI.Application(800, 600);
        document.body.appendChild(app.view);

        PIXI.loader
            .add('assets/isometric.json')
            .add('iso', 'assets/iso.json')
            .load(onAssetsLoaded);

        function onAssetsLoaded() {

            var tilesArr = PIXI.loader.resources.iso.data.layers[0].data;

            var xlen = PIXI.loader.resources.iso.data.layers[0].width;
            var ylen = PIXI.loader.resources.iso.data.layers[0].height;
            var TILE_WIDTH_HALF = PIXI.loader.resources.iso.data.tilewidth / 2;
            var TILE_HEIGHT_HALF = PIXI.loader.resources.iso.data.tileheight / 2;

            var holder = new PIXI.Sprite();
            app.stage.addChild(holder);
            holder.x = 200;

            var tileCount = 0;
            for (let y = 0; y < ylen; y++) {
                for (let x = 0; x < xlen; x++) {
                    var tileY = tileCount / xlen;

                    var tilenumber = x + y;
                    var tileIndex = tilesArr[tileCount];
                    if (tileIndex > 0) {
                        tileIndex--;
                        var tile = new PIXI.Sprite(PIXI.Texture.fromFrame('tile' + tileIndex));
                        holder.addChild(tile);

                        tile.interactive = true;
                        tile.buttonMode = true;
                        var onClick = (function () {
                            Tweener.addTween(this, { y: 1000, time: 1, transition: "easeInSine" });
                            Tweener.addTween(holder, { x: holder.x + 5, y: holder.y + 5, time: 1.5, transition: "easeOutElastic" });
                        }).bind(tile);

                        tile.on('pointerdown', onClick);

                        var newTileX = (x - y) * TILE_WIDTH_HALF;
                        var newTileY = (x + y) * TILE_HEIGHT_HALF;
                        tile.x = newTileX;
                        tile.y = -1000;
                        Tweener.addTween(tile, { x: newTileX, y: newTileY, time: 2, delay: 0.05 * tileCount, transition: "easeInOutSine" });
                    }

                    tileCount++;
                }
            }
        }

    }
}

let main = new Main();