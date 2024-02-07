namespace SpriteKind {
    export const Grass = SpriteKind.create()
    export const Structure = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    sprite.y += 16
    game.showLongText("Welcome to the Pokemon Center. Press a to restore your pokemon to max hp!", DialogLayout.Bottom)
    creatures.trainerHealAll(myTrainer)
    game.showLongText("All done, have a nice day!", DialogLayout.Bottom)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Grass, function (sprite, otherSprite) {
    creatures.overlapGrass([
    16,
    16,
    7,
    19,
    19,
    1,
    4
    ], sprite, otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite, location) {
    creatures.battleGym(myTrainer, location)
})
let myTrainer: creatures.Trainer = null
creatures.setCreatureMap(
tilemap`level`,
assets.tile`myTile1`,
assets.tile`myTile2`,
assets.tile`myTile3`,
assets.tile`myTile10`,
assets.tile`myTile11`
)
myTrainer = creatures.makeCreatureTrainer(
StarterPokemon.Charmander
)
