namespace SpriteKind {
    export const Grass = SpriteKind.create()
    export const Structure = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(creatures.trainerInBattle(myTrainer))) {
        creatures.openPauseMenu()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    creatures.goToRouteFromOverlap(
    myTrainer,
    assets.tile`myTile`,
    location,
    assets.tile`myTile1`,
    assets.tile`myTile2`,
    assets.tile`myTile3`,
    assets.tile`myTile10`,
    assets.tile`myTile11`
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    creatures.goToRouteFromOverlap(
    myTrainer,
    assets.tile`myTile13`,
    location,
    assets.tile`myTile1`,
    assets.tile`myTile2`,
    assets.tile`myTile3`,
    assets.tile`myTile10`,
    assets.tile`myTile11`
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile12`, function (sprite, location) {
    creatures.goToRouteFromOverlap(
    myTrainer,
    assets.tile`myTile12`,
    location,
    assets.tile`myTile1`,
    assets.tile`myTile2`,
    assets.tile`myTile3`,
    assets.tile`myTile10`,
    assets.tile`myTile11`
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    sprite.y += 16
    game.showLongText("Welcome to the Pokemon Center. Press a to restore your pokemon to max hp!", DialogLayout.Bottom)
    creatures.trainerHealAll(myTrainer)
    game.showLongText("All done, have a nice day!", DialogLayout.Bottom)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Grass, function (sprite, otherSprite) {
    creatures.overlapGrass(myTrainer, sprite, otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite, location) {
    creatures.goToRouteFromOverlap(
    myTrainer,
    assets.tile`myTile14`,
    location,
    assets.tile`myTile1`,
    assets.tile`myTile2`,
    assets.tile`myTile3`,
    assets.tile`myTile10`,
    assets.tile`myTile11`
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite, location) {
    creatures.battleGym(myTrainer, location)
})
let myTrainer: creatures.Trainer = null
let route0 = creatures.makeNewRoute(
tilemap`level`,
[16, 19],
"Pallet Town",
2,
1,
assets.tile`myTile12`,
assets.tile`myTile`
)
let route1 = creatures.makeNewRoute(
tilemap`level2`,
[
16,
16,
19,
19
],
"Route 1",
0,
-1,
assets.tile`myTile13`,
assets.tile`transparency16`
)
let route2 = creatures.makeNewRoute(
tilemap`level3`,
[0, 1],
"Pewter City",
-1,
0,
assets.tile`transparency16`,
assets.tile`myTile14`
)
creatures.loadRoute(
route0,
assets.tile`myTile1`,
assets.tile`myTile2`,
assets.tile`myTile3`,
assets.tile`myTile10`,
assets.tile`myTile11`
)
myTrainer = creatures.makeCreatureTrainer(
StarterPokemon.Charmander
)
