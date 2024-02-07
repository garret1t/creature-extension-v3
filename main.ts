namespace SpriteKind {
    export const Grass = SpriteKind.create()
    export const House = SpriteKind.create()
    export const Lab = SpriteKind.create()
}
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
creatures.setCreatureMap(
tilemap`level`,
assets.tile`myTile1`,
assets.tile`myTile2`,
assets.tile`myTile3`
)
let myTrainer = creatures.makeCreatureTrainer(
StarterPokemon.Pikachu
)
