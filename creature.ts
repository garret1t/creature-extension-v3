enum CreatureType {
    //% block=Bug
    Bug = 0,
    //% block=Dark
    Dark = 1,
    //% block=Dragon
    Dragon = 2,
    //% block=Electric
    Electric = 3,
    //% block=Fairy
    Fairy = 4,
    //% block=Fighting
    Fighting = 5,
    //% block=Fire
    Fire = 6,
    //% block=Flying
    Flying = 7,
    //% block=Ghost
    Ghost = 8,
    //% block=Grass
    Grass = 9,
    //% block=Ground
    Ground = 10,
    //% block=Ice
    Ice = 11,
    //% block=Normal
    Normal = 12,
    //% block=Poison
    Poison = 13,
    //% block=Psychic
    Psychic = 14,
    //% block=Rock
    Rock = 15,
    //% block=Steel
    Steel = 16,
    //% block=Water
    Water = 17,
    //% block=None
    None = 18
}

enum StarterPokemon {
    //% block=Pikachu
    Pikachu = 25,
    //% block=Bulbasaur
    Bulbasaur = 1,
    //% block=Charmander
    Charmander = 4,
    //% block=Squirtle
    Squirtle = 7
}

namespace SpriteKind {
    //% isKind
    export const Creature = SpriteKind.create();
}


//% color=#ff0000
//% weight=79
//% icon="\uf255"
//% blockGap=8 block="Creatures"
//% groups='["Create", "Value", "Battle", "Display", "Events", "Other"]'
namespace creatures {

    export class Creature {
        public _sprite: Sprite;
        public _creatureType1: CreatureType;
        public _creatureType2: CreatureType;
        public _name: string;

        public _evolutionID: number;

        public _healthbar: StatusBarSprite;

        public _level: number;
        public _evolutionLevel: number;
        public _xp: number;
        public _hp: number;
        public _maxHP: number;
        public _attackValue: number;
        public _xpReward: number;
        public _sayHP: boolean;
        public _sayXP: boolean;

        constructor(spr: Sprite, cType: CreatureType, cType2: CreatureType, name: string, level: number = 5, evolutionLevel: number = 10, evolutionID: number = 0, xp: number = 0, hp: number = 20, attackValue: number = 5, xpReward: number = 150) {
            this._sprite = spr;
            this._creatureType1 = cType;
            this._creatureType2 = cType2;
            this._name = name;
            this._evolutionID = evolutionID;
            this._level = level;
            
            this._evolutionLevel = evolutionLevel;
            this._xp = xp;
            this._hp = hp;
            this._maxHP = hp;
            this._attackValue = attackValue;
            for (let i = 5; i < level; i++) {
                this._maxHP *= 1.05;
                this._hp *= 1.05;
                this._attackValue *= 1.05;
            }
            this._xpReward = xpReward;
            this._sayHP = false;
            this._sayXP = false;
            this._sprite.setFlag(SpriteFlag.Invisible, true);
            this._healthbar = statusbars.create(20, 4, StatusBarKind.Health)
            this._healthbar.attachToSprite(spr)
            this._healthbar.max = this._maxHP;
            this._healthbar.setFlag(SpriteFlag.Invisible, true);


            game.onUpdate(function () {
                this.update()
            })
        }

        update() {
            if (this._sayHP) {
                if (this._hp > 0) {
                    this._sprite.say(this._hp);
                } else {
                    this._sprite.say("0");
                }
            }

            if (this._sayXP) {
                if (this._xp > 0) {
                    this._sprite.say(this._xp);
                } else {
                    this._sprite.say("0");
                }
            }


        }




        get sprite() {
            return this._sprite;
        }

        set sprite(sprite: Sprite) {
            this._sprite = sprite;
        }

        get healthbar() {
            return this._healthbar;
        }
        set healthbar(healthbar: StatusBarSprite) {
            this._healthbar = healthbar;
        }

        get creatureType1() {
            return this._creatureType1;
        }
        set creatureType1(creatureType1: CreatureType) {
            this._creatureType1 = creatureType1;
        }
        get creatureType2() {
            return this._creatureType2;
        }
        set creatureType2(creatureType2: CreatureType) {
            this._creatureType2 = creatureType2;
        }

        //% group="Value" blockSetVariable="myCreature"
        //% blockCombine block="name" callInDebugger
        get name() {
            return this._name;
        }

        set name(name: string) {
            this._name = name;
        }

        get level() {
            return this._level;
        }

        set level(level: number) {
            this._level = level;
        }

        get evolutionLevel() {
            return this._evolutionLevel;
        }

        set evolutionLevel(evolutionLevel: number) {
            this._evolutionLevel = evolutionLevel;
        }


        //% group="Value" blockSetVariable="myCreature"
        //% blockCombine block="xp" callInDebugger
        get xp() {
            return this._xp;
        }

        set xp(xp: number) {
            this._xp = xp;
        }

        //% group="Value" blockSetVariable="myCreature"
        //% blockCombine block="hp" callInDebugger
        get hp() {
            return this._hp;
        }

        set hp(hp: number) {
            this._hp = hp;
            this._healthbar.value = hp;
        }
        //% group="Value" blockSetVariable="myCreature"
        //% blockCombine block="hp" callInDebugger
        get maxHP() {
            return this._maxHP;
        }

        set maxHP(maxHP: number) {
            this._maxHP = maxHP;
            this._healthbar.max = maxHP;
        }

        //% group="Value" blockSetVariable="myCreature"
        //% blockCombine block="attackValue" callInDebugger
        get attackValue() {
            return this._attackValue;
        }

        set attackValue(attackValue: number) {
            this._attackValue = attackValue;
        }

        //% group="Value" blockSetVariable="myCreature"
        //% blockCombine block="xpReward" callInDebugger
        get xpReward() {
            return this._xpReward;
        }

        set xpReward(xpReward: number) {
            this._xpReward = xpReward;
        }

        //% group="Value" blockSetVariable="myCreature"
        //% blockCombine block="evolutionID" callInDebugger
        get evolutionID() {
            return this._evolutionID;
        }

        set evolutionID(evolutionID: number) {
            this._evolutionID = evolutionID;
        }

        //% block="set $this(myCreature) Say HP $sayHP=toggleOnOff"
        //% blockId="creatures_setSayHP"
        //% group ="Value"
        setSayHP(sayHP: boolean) {
            this._sayHP = sayHP
        }

        //% block="set $this(myCreature) Say XP $sayXP=toggleOnOff"
        //% blockId="creatures_setSayXP"
        //% group ="Value"
        setSayXP(sayXP: boolean) {
            this._sayXP = sayXP
        }

    }

    export class Trainer {
        public _name: string;
        //public bag: BagItem[];
        public _partyPokemon: Creature[];
        public _boxPokemon: Creature[];

        public _money: number;
        public _badges: number;
        public _sprite: Sprite;
        public _moveUp: Image[];
        public _moveDown: Image[];
        public _moveLeft: Image[];
        public _moveRight: Image[];

        constructor(name: string, money: number, sprite: Sprite, moveUp: Image[], moveDown: Image[], moveLeft: Image[], moveRight: Image[]) {
            this._name = name;
            this._money = money;
            this._badges=0;
            this._sprite = sprite;
            this._moveUp = moveUp;
            this._moveDown = moveDown;
            this._moveLeft = moveLeft;
            this._moveRight = moveRight;
            this._partyPokemon = [];
        }

        get name(): string {
            return this._name;
        }

        set name(name: string) {
            this._name = name;
        }

        get money(): number {
            return this._money;
        }

        set money(money: number) {
            this._money = money;
        }

        get badges(): number {
            return this._badges;
        }

        set badges(badges: number) {
            this._badges = badges;
        }

        get sprite(): Sprite {
            return this._sprite;
        }

        set sprite(sprite: Sprite) {
            this._sprite = sprite;
        }

        get partyPokemon(): Creature[] {
            return this._partyPokemon;
        }

        set partyPokemon(partyPokemon: Creature[]) {
            this._partyPokemon = partyPokemon;
        }

        addPartyPokemon(creature: Creature) {
            if (this._partyPokemon.length < 6) {
                this._partyPokemon.push(creature)
            } else {
                //throw "Too many pokemon"
            }
        }

    }

    function makeCreatureImageDex(id: number): Sprite {
        switch (id) {
            default:
                return null;
            case 0:
                return sprites.create(img`
                    111111111111b1111ddd1dd1dd111ddd11111111
                    111111111111f1111bbb1bb1bb111bbb11111111
                    11111111111111111bbbb111b1bbb111b1111111
                    11111111111111111ddbbdd1d1dd1dbbb1111111
                    111111111111111111dbb111b1bd1bbbb1111111
                    111111111111d1111111bbbb1bddb1dbb1111111
                    111111111111fd3fdfebfddb11bbbbbb11111111
                    111111111111cddbdbbdbddb1bbbbbbb11111111
                    111111111111d1111111111b1bbbbbb111111111
                    111111111111fd33fbefdff111bbdfc3f1111111
                    111111111111cbb1d1dd1dd111d11cb1c1111111
                    111111111111fbbb1bddb111b1bd1bbb11111111
                    111111111111b111bddb1bbdffffffcdf1111111
                    111111111111111bdbddbbbbcdbccddbc1111111
                    11111111111113dffffcddd1bbffffff31111111
                    111111111111bddddddddffdffcbb111b1111111
                    111111111111b11b1bddbccbcddbbbb111111111
                    111111111111dddddceddddffdcffdbfd1111111
                    111111111111f1111bd11bb111bbbbbb11111111
                    111111111111fbb1bd1dbbbb1bbbb11111111111
                    111111111111dffdffeddff111111bbbb1111111
                    111111111111111bb111bbb1111db111b1111111
                    111111111111dbbbbddbbbbffffeddbff1111111
                    11111111111111111bddbbb1b1bbb111b1111111
                    11bbbbbbbbbb1bbbbddb1bbbb1bd1bb111111111
                    1111111111bb1ffdbbbbbbb1bbddb1dbb1111111
                    11f1111111bbfdddbbbbbddb11bd1bb1b1111111
                    1111111111b1fffddbbbdffb11bd1bb1b1111111
                    1111111111cf111bbd111111bbddb1db11111111
                    113cbbbbbbbbbbb1bbd1111c11bd1bb1b1111111
                    11f1111111db1fffdddbfffb1bbbbbb111111111
                    111fffffffbf1111bddb1bb111bd1bbb11111111
                    11f11111db111ffffffffff1bbbbbbb1f1111111
                    11fdeccfedbfbbbdb111b11111bd1bb1b1111111
                    1111111111bbfffddcedddd1bb11111b11111111
                    11fbd111dbb1bbbbb1dbb111b1bd111111111111
                    11bbbbbbbbdbbbbbbbd11bbbbbbbb11bf1111111
                    113bbbbbbbb1dddbbbd11bb111111bcf31111111
                    1113eccfedc3fffffb3bfdddddddddbf11111111
                    11d1dbbbd1b1bbbdbd111bbdfdcedffbf1111111
                    11d1dbbbd1b13bb13decddd1b1bd1bcfd1111111
                    111cd111dc1b111bb111bbbdddddddddb1111111
                    111111111111f111b1111bbbbbbbbbbbd1111111
                    111111111111111111dbb111b1bd1bb1b1111111
                    1111111111111111bbbbbbb1b1bd111111111111
                    11bbbbbbbbbbbbb1bd11111bbbbbd11b11111111
                    111111111111bbb1bbddb11ddffffbb1b1111111
                    111111111111bbb11bbbbbbdfdcff111b1111111
                    111111bbbbbb111bbd11111bbbbbbbbb11111111
                    11bbbbd1dbdb111bbddb1bbfddddddddf1111111
                    11bbbbbbd1b1bbb1bd111bbbb1bbbbbbb1111111
                    1111111111b1bbbb1bbbb1111bbbb1db11111111
                    11bbbbbbbbdbbbbbb111111ddffff3bfd1111111
                    11bbbbd1dbb111111bd1b11bb111111bb1111111
                    11bbbbbbd11b111111dbb11bb1bd1bbb11111111
                `, SpriteKind.Creature);
            case 1:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111111111111111f111111111111
                            11111111111111111111111111f1711111111111
                            1111111111111111111111111f11f71111111111
                            1111111111111111111117fff1177f1111111111
                            1111111111111111117ff1f7111f7f1111111111
                            1111111111111117ff111f71177f7f1111111111
                            11111111111111f1117f711177f77f1111111111
                            1111111111111f11f711117777f777f111111111
                            111111111111f77f7111777777f717ff11111111
                            11111111111f77f771fff7777f7717f7f1111111
                            111111fff11f77f77f117f777f77177f7f111111
                            11111f177f1ffffff11777f77f77177f7f111111
                            11111f117ff77777f77777f7f7711777f7f11111
                            11111f11111177777f777f7f77711777f7f11111
                            111111f111117ff7777777ff77117777f7f11111
                            11111f111117ff777f77777ff7777777f1f11111
                            1111f11f11777777ff777f77ff77777f71f11111
                            1111f1f1f777777f17f77ff777f777f717f11111
                            1111ff7ff777777ff77f7777777fff7177711111
                            111f1f1f7777777ff11f77777f77f7777f111111
                            111f7777777777777fff7777ff77f777f1111111
                            11f17f7ffffffff7f111f777ff77ffff11111111
                            111f17ffffffffff11117f7777777ff111111111
                            1ff111177777777f1111777f77ff77f111111111
                            11f11111ffffffff111777777777777f11111111
                            111f11177f111111f17777777f777777f1111111
                            1111f77777f1111777f777f7f7177777f1111111
                            1111117fff7f7777777fff77f7117777ff111111
                            1111111111f17f777777777f711117777f111111
                            1111111111f1177ff777777f711117777f111111
                            11111111117111777fffffff771117777f111111
                            11111111111f117777777f1ff77177777f111111
                            1111111111117f777777f7f1ff777777f1111111
                            111111111111117ffff777f111fff777f1111111
                            111111111111111111f77f11111f777f11111111
                            1111111111111111111ff1111111fff111111111
                        `, SpriteKind.Creature)
            case 2:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111111111111111111111111111ffff1111111111111
                            1111111111111111111111111111fff777fff11111111111
                            11111111111111111111111111ff771111f77ff111111111
                            1111111111111111111111111f77711111f777ff11111111
                            111111111111111111111111f7771111111f77f7f1111111
                            11111111111111111111111f77777771111ff7fff1111111
                            11111111111111111111111f777777771111f7f17f111111
                            1111111111ff1111111111f7777f777771177f117f111111
                            111111111f11f111111111f77ff7f77777777f177f111111
                            111111111ff77f11111111fff77ff7777777f7777f111111
                            111111111ff777fffffff7777ffff7777777f7777f111111
                            1111111111fff771111777777fff7777777f7777f1111111
                            1111111111f7777777777777777f7f777ff77777f1111111
                            111111111f777777777777777777fffff777777f11111111
                            11111111ff77777777777777777fffff7777777f11111111
                            11111111f1f77777777fff777777fffffffffff111111111
                            11111111f1ff777777ff1f7777777fffff77fff111111111
                            1111111f77ff77777fff177777777ffff777777ff1111111
                            1111111f77777777777777777777777ff7777777ff111111
                            1111111f7777777777777ff777777777f7f7777f77f11111
                            11111111fff777777fff777777777777ff717711177f1111
                            111111111f117fff7777777777777777ff7f7771177f1111
                            1111111111f71111111117777f17777ffff1117711f7f111
                            11111111111fff7111111777f117777ff7f1f71771177ff1
                            11111111111ffffff711111f1117777f777f111777177f11
                            1111111111f77ff7711111f17117777f7777f1f17771f111
                            11111111ff7777f7111111f17717777f7777ff1177717f11
                            1111111f1f7777f1111111ff111ff7f777777f1f1f77f111
                            11111111ff777fff111111f1fff11f7777777771f1ff7f11
                            11111111f1fff7ff1111111ff11ff111777777f11111ff11
                            111111111f1f1f77f11111117ff11111177777f111111111
                            1111111111f1f7777f1111177f111111117777f111111111
                            11111111111f777777f117777f111111117777f111111111
                            11111111111f1177777f77777f111771111777f111111111
                            11111111111f11177777ff777f1177711177777111111111
                            111111111111f17777777ff777f1111117777f1111111111
                            1111111111111fff7777ff1fffff1117777ff11111111111
                            11111111111111f1fffff11111fff7ff7fff111111111111
                            1111111111111f1f11f1f1111f11ff11f11f111111111111
                            11111111111111f1ff1f111111ff1fff1ff1111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 3:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111111117ffff7111111117ffff71111111111111111
                            1111111111111111117f771111ff11117f111177ff11111111111111
                            11111111111111111f7711177117f11f7111111177f1111111111111
                            1111111111111117f777117771117ff711177111777ff11111111111
                            111111111117fffffffff111117f7777f7111117ffffffff71111111
                            111111117ff1111111177ff77f7f1ff1f7f77ff7711111111ff71111
                            1111117f777117771111777ff7ffffffff7ff777111177711777ff11
                            11111f777771177711117777f1ffffffff1f777711117771177777f1
                            1111f777777711111117777f117f7117f711f777711111117777777f
                            1111f7777777711117ffffff111111111111ffffff7111177777777f
                            111177777777777fff111777ff71177117ff777111fff77777777771
                            11111f7777777ff111111117777f7777f777711111111ff7777777f1
                            11111f7777fff111111771117777f77f777711177111111fff7777f1
                            111111f7ff1f7711117777117ffffffffff7117777111177f1ff7f11
                            1111111111f777f11111111ff1f7ffff7f1ff11111111f777f111111
                            111111111f777777711117f11f77777777f11f711117777777f11111
                            1111111111f77f7777777f111f77777777f111f7777777f77f111111
                            11111111111fff777777f111fff77f77f7ff111f777777fff1111111
                            1111111111111fff7777fffff777f7ff7f7f111f7777ff1111111111
                            1111111111f11ffff7ff77ff7ff77777777f1ff1ffff111111111111
                            111111111f7fff777f77ff77ff7ff77777fffffff111111111111111
                            1111111ff777ffff777f777777f77fffff77fffff111111111111111
                            11111ff77ffff777777777ff777ffff77777fffffff1ff1111111111
                            1111f7f7ffff777ff7777777f77fffff7f7ffff7777f77fff1111111
                            111f777f11ffffff777ff7777ff11ffff7ffffffff777f777ff11111
                            111f777f711777f777ffff77f71177ffff77777777ffff777f7ff111
                            1111ff7ff71111ff7fff77ff711ff7fff77777f7777777ff77777f11
                            111111fff1111177ff777777777fff7f77777f77f777f777ff7fff11
                            1111111f11117777777777777777777fffffff77f777f77777f777f1
                            111111f7111777ff7771117777777777ff77fffff77f77f7777f7ff1
                            11111f7f77777ff7771117ff77777777f777777fffff77f77f7777f1
                            1111f177f77777777717f117777777777f7777777ffff7f77f7777f1
                            11117171ff717777771fff117777fff777f7777777fffff77f77f7f1
                            111f1171f711777777f17f1777777ff7777f7ff777777ffff1ff1f11
                            111f1117711777f77777777777777777777f77ff777777f111111111
                            11171117777777777777777777777777777f77777777777f11111111
                            1111f17f77ffffff777fff777777777777f777777777ff7f11111111
                            11111ff1fffffffffff717fff7777ff777f7ff7771777ff7f1111111
                            111111f7ffffffff777f1f777ffff777ff77ff77111777f7f1111111
                            11111f1f7ffff7777777f777777ff7ff77777771111777777f111111
                            11111f1f7ff777777777777771ff77ff77777771111777777f111111
                            11111f1f7f77f77777777777fff77ffff7777711117777777f111111
                            11111777f7ff1f77777f1ffff777f7fff777777777777777f1111111
                            111111f77f777fffffffff7777ff777ff77777f777777777f1111111
                            1111117777ff71111777777fff77777777f7ff77777777ff11111111
                            1111111f7777fffffffffff7f777777777ffffff7777ff7f11111111
                            11111111fff77ff77f17fffff77777777ffffffffffff7fff1111111
                            11111111f11ff11ff11f71f1ff7777777ff111f11f777f11f1111111
                            111111111ffffff11111ff1fff117f11f111111ff1fff1ff11111111
                            11111111111111111111111111fff1ff111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 4:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111144ff4411111111411111111111111111
                            1111111f1111114f111111141111114411111111
                            111111f111144444f11111144111111411111111
                            11111f1111444444441111114411111111111411
                            11111414444441144f1111114444111111114411
                            1111f14444441444144114111444411111114411
                            11114414444414f114f114111444444411114111
                            11114f1444444ffff4f114411144444441111111
                            11114f4444444fff44f111441144444444411111
                            1111f4f4444444f4444411444144444444411111
                            11111f4444444444444f11144144444444441111
                            1111441114444444444f11114144444444444111
                            1111f11444444444f44441111144444444444411
                            1111414444444f4f4444f1111144444444444441
                            11111f444444f4f4444444111144444444444441
                            111111f4444f4f4444444f111144444444444441
                            11111114ff444444444444f11114444444444441
                            11111111111f4444444444441114444444444441
                            11111111111444444444444f1111444444444441
                            111111111144144f44444444f111114444444411
                            111111111ff111f1144444444f11111f44444411
                            1111111f44f111411444f444444111f444411111
                            111111f114f11411144f444444f11f4444411111
                            1111141114f11f1444f444444444444444111111
                            11111f1444f114444f444144444f44444f111111
                            111114444f41114ff14f1444444f4444f1111111
                            1111114f41141111111f1444444f444f11111111
                            11111111111f111111114444444f44f111111111
                            111111111111f1111111f44444f4ff1111111111
                            1111111111111f1111111f4444ff111111111111
                            11111111111111f4111144f44441111111111111
                            111111111111111ff4444f44444f111111111111
                            11111111111111f4444ff11f4444f11111111111
                            1111111111111f4444f1111f44444f1111111111
                            11111111111ff444444f111f444444f111111111
                            1111111111f44444444f111f4444444f11111111
                            111111111f44444f444f1111f4f44444f1111111
                            111111111f4f44f44ff11111f44f44f4f1111111
                            11111111114fffff411111111fffffff11111111
                        `, SpriteKind.Creature)
            case 5:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111111111111111111111ff111111111111111111111
                            11111111111111111111111ff4f111111111111111111111
                            1111111111111111111111f144f111111111111111111111
                            1111111111111111111fff1444f111111111111111111111
                            11111111111111111ff111444f1111111111111111111111
                            1111111111111111f111444444f111111111111111111111
                            111111111111111f11144444444f11111111111111111111
                            111111111111111f11444444444f11111111111111111111
                            111111114111111f11444114f444f1111111111111111111
                            11111114411111f14444114f1f44f1111111111111111111
                            11111144411111ff444414f41f44f1111111111111111111
                            11111444411111f444444fff4f44f1111111111111111111
                            11114444411111f44444fffff44ff1111111111111111111
                            1114444444111f4144444444444fffffffff111111111111
                            114444444411f1114444444444ffff444444fff111111111
                            144444444411f114444444f44fff44444444444ff1111111
                            144444444441f444444444f4ff444444444444444ff11111
                            144444444441f444444444fff441444444444144444ff111
                            4444444444411f4444444fff4411144ff444441144444f11
                            44444444444111ff444fff44411111f41f4444444444fff1
                            4444444444411111fffffff44111ff411ffff444444f4fff
                            4444444444411111fff444ff444f44f1f4f11f444ff14f4f
                            4444444444411111ff444444fff4444f41f111fff4f14ff1
                            1444444444111111ff4444444444444f1ff11111f14f4f11
                            14444444441111111f44444444444444f14f11111f4ff111
                            11444444f11111111ff441411111444f11ff111111f11111
                            1114f4444f11111111ff44111114444ffffff11111111111
                            1111f44444ff111111f4ff4411444fff4444ff1111111111
                            11111f144444ff111f4441fffffff44444444ff111111111
                            11111f41444444fff441441111114444444444f111111111
                            111111f11444444f44111441111444444444444f11111111
                            111111f41444444f411111f444444f444444444f11111111
                            1111111f444444f44111444f4444f44111444444f1111111
                            11111111f4444ff444144444ff44f41111444444f1111111
                            111111111f444ff444444444fffff41111144444ff111111
                            1111111111f4ffff444444444fffff4111114444ff111111
                            11111111111fffff4444444444ffff4411144444fff11111
                            1111111111111ffff44444444ffffff4444444444ff11111
                            111111111111111fff44444fffff111ff44444444ff11111
                            11111111111111111ff444444ff111111fff4444444f1111
                            1111111111111111ff4444444ff1111111fff444444ff111
                            111111111111111f4ffff4ffff1111111ff444444ffff111
                            1111111111111111ff114f14f1111111f14ffffff14f1111
                            111111111111111111fff1fff11111111fff144f14f11111
                            111111111111111111111111111111111111fff1ff111111
                        `, SpriteKind.Creature)
            case 6:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111144111111111111
                            111111111111111111fff11111111111111111111144111111111111
                            11111111111111111f144ffff1111111111111111114111111111111
                            11111f111111111111f114444fff1111111111111111111111111111
                            1111f1f111111111111f11444444ff11111111111111114111111111
                            1111f1f1111111111111f4444ff444ff111111111111114411111111
                            111f14f1111111111111f4444f4f4444f11111111141114444111111
                            111f44f111111111f111f4444f44ff444ff111111144111444411111
                            111f444f1111111f1f11f444f44444f4444f11111111111444411111
                            11f4444f1111111f1f11f444f444444f4444f1111111111444441111
                            11f44444f111111f1f11f444f4444444f4444f111111114444444111
                            11f4f444f1111fff1fff444f444444444f4444f11111114444444411
                            11ff4f44f11ff44f1f44f44f4444444444f4444f1111144444444411
                            1f4f14f44fff444f4f444ff44444444444f44444f111444444444411
                            1f44f14f4fffffff4f4444f444444444444f44444f11444444444441
                            1f44ff14ffff444f4ff4444f444444444444f44444f1444444444441
                            1f44fff14ff44444444f4444f411144444444f4444f1444444444441
                            1f44f4ff44f444444444f4444f41111144444f44444f444444444441
                            1f44f4fff44414444444444444f44111114444f4444f444444444441
                            1f4f44f4f41111444444f444444ff411111144f44444f44444444441
                            1f4f44f441111114444f4f4444444ff4111144f44444f14444444441
                            1f4f44f41111111444f41f444444444f1111144f44444f4444444441
                            f44f44f4111111444fff1f4444444144f411144f44444f1444444411
                            f44f441f111114444f4f1f444411f1144f111444f4444f1444444411
                            f4f4441fff11144444fff4444111141144f41144f44444f444444111
                            f4f4141f44ff144444444f4411111f11144f41444f4444f444f11111
                            f4f41414f1f4f14444444f44111111411444f4444f4444f444f11111
                            f4f414114f1f441444444f41111111f11144f4444f4444f444f11111
                            f4f4141114f4444444444f41111111411144f4444ff44f4444f11111
                            f4f11411144f4144444444f111111f4111444f44fff4f4444f111111
                            f4f1144114444114444444f11111141111444fffffff44444f111111
                            f4f111411144f114444f44f11111f41114444ffffff444444f111111
                            f4f11141114ff41144444f11114f411444444ffff4444444f1111111
                            f4f11141114fff41114ff111ff4444444444ffff44444444f1111111
                            f4f4111411f4ffffff4111144444444444ff44ff4444444ff1111111
                            f4f4111411f44fff4111111f14f44444ff444444ff444fff11111111
                            1ff441114f444fff111111141f444ff4444444444fffffff11111111
                            1fff44ff444444f4111111114f14f44f4444444444ffffff11111111
                            1fff4f4f444444f111111111141441444444444444fffff111111111
                            11fff1f4f4444ff111111111114f1ff441114444444fff1111111111
                            111ff1f4ff44fff111111111111111f411111444444fff1111111111
                            1111f1f4f4fffff1111111111111141111111444444ff11111111111
                            111111fff44f44ff1111111111111f11111111444444f11111111111
                            11111114f4f4444f1111111111111f11111111444444f11111111111
                            11111111ff114444f111111111114411111111144444f11111111111
                            111111111f1144444f111111111444f1111111144444f11111111111
                            111111111411444444f411114444444411111111444ff11111111111
                            1111111111f11444444f44444444444ff4111f4444fff11111111111
                            11111111111f14444444ff44444444ff1ff4ff1444444f1111111111
                            111111111111f1444444ffffffffff11111ff114444444f111111111
                            1111111114ffff4444444ffff111111111114111444444ff41111111
                            111111114ff11144444444ff1111111111111ff4444fff144f111111
                            1111111414ffff14444fff41111111111111f144f4144f1144f11111
                            1111111f1f1444f4444ff111111111111111f1144f1144f114411111
                            111111114fffffffffff111111111111111114ff414ff414f4111111
                        `, SpriteKind.Creature)
            case 7:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111bfffffb11111111111111111111111
                            11111111f11999999f1111111111111111111111
                            1111111f1199999999f111111111111111111111
                            111111f999999999999f11111111111111111111
                            111111b999999999999b11111111111111111111
                            11111b99999999999999b1111111111111111111
                            11111f9f199999f19999f1111111111111111111
                            11111f9ff99999ff99bbf1111111111111111111
                            11111f9bfbbbb9bf9bb9f1111111111111111111
                            11111b99999999999999fb111111111111111111
                            111111b9ffbbbbb9999f11f11111111111111111
                            111111f99fbbbb9999f9111b1111111111111111
                            1111111f99bbb9999fb9111f1111111111111111
                            11111111bfffffffbbb999fb1111111111111111
                            111111bf9fbbfbbbbbfbbfb1f111111111111111
                            1111bf9bfbbbfbbb9bbff19b9b11111111111111
                            111b199b9119f91199bff11fbf11111111111111
                            111f11bf11fb1fb119ffbb1bf1b1111ffb111111
                            1111bffbfb19b11bffbbbf9b11f111b999f11111
                            1111111f1119f111199bbf9b19f11f91119f1111
                            1111bfff1199b111199bbf9b99f1f91bfb19f111
                            111b119ffbfb1bffb99bbf9bf1b1b1f111f1b111
                            111f1199ff11b1119ffbbf9f1f1f1b11911f9f11
                            111f1999bf19f11999bfbbfb9b199f11f11b9b11
                            1111f99bbf99b1999bfffb9fffb119b11fb9f111
                            11111fbbbfb9b999bfbbbbfbfb99999bbb9f1111
                            111111bff1ffbffbb99bbbfbb91191fbffb11111
                            111111111111111f9999bbffb9991f1111111111
                            1111111111111111b199bbf1f911b11111111111
                            1111111111111111f1199b911fbf111111111111
                            1111111111111111f1199f111111111111111111
                            11111111111111111bffb1111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 8:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            11111111111111fff1111111111111111111111111111111
                            1111111111111f19f1111111111111111111111111111111
                            111111111111fb19f1111111111111111ffff11111111111
                            111111111111f1b9f11111111111111ff999f11111111111
                            11111111111f11b9f111111111111ff1199f111111111111
                            11111111111fb99bf11111111111f11199bf111111111111
                            11111111111f1b9ffffffb11111f111bbbf1111111111111
                            1111111111f19ff911999bff11f11bb999f1111111111111
                            1111111111f9f911111999bbbf11b1999f11111111111111
                            11111111111f91111119999bf11b1999f111111111111111
                            1111111111f9111111999999f1b1999f1111111111111111
                            1111111111ff1111999bbff9fb1bbbbf1111111111111111
                            111111111f9bf99999bbfb999ff119f11111111111111111
                            111111111fb9bf999bbfb9199bbf99f11111111111111111
                            111111fff911f1999bb1f1199bbfff111111111111111111
                            1111ff11f9f1ff9999bff119fbbf11111111111111111111
                            111f11111f991f99999f1199ffbf11111ffff11111111111
                            11f111111ff9999999999999bbbf111ffb99bf1111111111
                            1f1111111f9f9999999999fbbbfffffbb99911f111111111
                            1f11fb1111f9ff99999fffbbbbffffbb9991111f11111111
                            1f1999b1111f99ffffff1fbbfffffbbb9991111f11111111
                            1f1999f111fbf999bbbbfbbfffbbbfbb9999111f11111111
                            11f19f111fbbbfbbbbbbbffffb99bbfbb999911f11111111
                            111ff111fb99bbfffffffffbf1199bffbbb999f111111111
                            1111f111f999bbfffffb9bbbf1199bffbbbb9f1111111111
                            111f111fb999bffffb9199bbbf99bfbbfffff11111111111
                            111f111fb99bf919ff11199bffbff99bf111111111111111
                            11fb111fbbbff1119bff199f9bf1999bbf11111111111111
                            11f1b11fffff9111999bffb919bf1199bf11111111111111
                            1f11b11fb99f91119999bbf1119f1199bf11111111111111
                            1f11b99fb99fb1119999bbbf119f199bf111111111111111
                            1f99b99fb99bfb999999bbbf119f9bfff111111111111111
                            1f999b9bfb9bffb9999bbbbf19ffff9bf111111111111111
                            11f999bbfbbbfffbbbbbbbff9fbf19bbf111111111111111
                            11f99bbbbfbffffffbbbbffff9bfbbbfff11111111111111
                            111fbbbbbffffffffffff999999fbbfffff1111111111111
                            1111ffbbbbffbbbfffb9111199ffbffbbbbf111111111111
                            111111fffffbbbbbfffb91199bffffbbbbbbf11111111111
                            1111111111f99bbbbfffbbbbbffffbbb999bf11111111111
                            111111111f99999bbbfffffff111ffb9999bf11111111111
                            111111111f199999bbf11111111111ffffff111111111111
                            11111111f11199999f111111111111111111111111111111
                            11111111f9199999f1111111111111111111111111111111
                            111111111fffffff11111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 9:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            1111111111111111ff11111111111111111111111111111111111111
                            111111111111111f9bf1bffffffff1111111fff11111111111111111
                            111111111111111fbfffbb9119999ff111ff199f1111111111111111
                            111111111111111fffbbb91199ffffff1f199bbbf111111111111111
                            111111111111111ffbbbbf91ff99ffbff199bbfff111111111111111
                            111111111111111ffbbbbf9ff9111fbbbb9bffff1111111111111111
                            11111111111111f9ffbbbbff1ff11fbbbbbffffff11fff1111111111
                            11111111111111fffb999bbffffffbbbbbffffb99ff9bbff11111111
                            111111111bfb1ffb9999ff999bbbbbbbbbbffb99bf9bfffbf1111111
                            1111111bbffff91f11999999999bbbbbbbbbfb99f99fffffbf111111
                            111111b9ffff9111119999999999bbbbbbbbffbbf91bffffbf111111
                            111111f1ffff11111999999999999bb9fbbbffff9911bffbbf111111
                            111111f1bfbf11119bfffffb999999919fbbfff991119bbbbff11111
                            111111b119bf1119f9999bbbffb991199fbbfff911199bbbffff1111
                            1111111f199bf19f9999999bbbbff999fbbfff991199bbbfffbbb111
                            11111111f199bffb991119999bbbbfffbbfbf9f1199bbbfffbbbf111
                            11111111ff199bff91111199999bbbbbbfb9f91f199bbfffb919bb11
                            11111111fbf199bfb9111119999bbbbbffb9f111fffbfffb91999f11
                            1111111fbbbf19fffb911119999bbbffffb1ff199bfffff919999b11
                            1111111fbbbbfffffffb911999bbfffffb91bff9bfffffb1199b99b1
                            1111111f9bbffbbbbffffffffffffffff9999bffffffff9199bb99f1
                            111111f199f9999bbbbbffffffffffff911999bffffffb1199bb99f1
                            111111f19f1111999bbbbbbbbbbbfff9111199bbbffff91199bbb9f1
                            111111f1f111111199999999bbbbbf91111bbfffffffb1199bbbb9f1
                            111111ff11111111199999999bbbbf911bfff1199fff91199bbbb9f1
                            11111fbff11111111199999999bbf999bffbf1999bff9119bbbbbbf1
                            1111fbffbff111111199999999bffb9bff99bf99bbff9119bbbbbf11
                            111fbbfb9bbbf11111199999fffbfbbff9999bfbbbffb99bbbbbff11
                            11f9bfb999bbbffffffffffbbbbbfbff91999bfffffffb9bbbbffbf1
                            11f9bf911199bbbbbbbbbbbbb9bbbfff11199fbbbfffffbbbfffbbf1
                            11b9bf11111999bbbbbbbb99999bbbf91119f999bbbffffffffbbbf1
                            1b9ffff11111119999999999999bbbf9911b91199bbbffffffbbbbf1
                            1f1bbfbf1111111119999999999bbfff999f911999bbffffbbb99bf1
                            1b19bf9bff1111111199999999fffffff99f91199bbbf999fb999bf1
                            11f9bf99bbff11111199999ffbbbbfffbf9f9199bbbbff11f999bf11
                            11ffbf199bbbffffff999ffbbbbbffffbbffb99bbbbf99ff9919bf11
                            11f99ff1999bbbbbbbbbbbbbbbffbbffbbb9fbbbbfff11f9919bf111
                            11b1f9f111999bbbbbbbb9999fbbbbbfbb991bfff19fff9999bf1111
                            111fb1ff1111999999999999f999bbbfbb91111bf11fb999bbff1111
                            11111fff111111111199999f99999bbfbb911111bffbbbbbffbf1111
                            11111ffff11111111199999f11999bbfbb9911119ffbbbffbbf11111
                            11111fbfff111111199999f1111999bbfbb911199fffffffbbf11111
                            111111fbbffb911199999bf1111999bbfbbb9999bbfffffbbf111111
                            111111f9bbbffb99999bbbf1111999bbbfbbb99bbbffffbbf1111111
                            1111111f99bbfffbbbbbfff1119999bbbbfbbbbbbbfffbbf11111111
                            1111111f119bbbbfffffffffb9999bbbbbbffbbbbbffbff111111111
                            111111f1f199bbbbfffffffffb99bbbbbbffffbbbffff11111111111
                            11111f119f19ffffff1111111ffbbbbbbffffffffff1111111111111
                            1111f1119bff91bfff111111111fffffffbbbbfffff1111111111111
                            11111ff99bbf119bf1111111111f19fbbffffbbfffff111111111111
                            1111111ffffff19b1111111111f199bff19bbfff99bbf11111111111
                            1111111111111ff111111111111fffff11199bff999bf11111111111
                            11111111111111111111111111111111f1119f11ffff111111111111
                            111111111111111111111111111111111ffff1111111111111111111
                        `, SpriteKind.Creature)
            case 10:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111fffffff1111111111111111111
                            111111111111ff7777777ff11111111111111111
                            11111111ff1f1117fff7777f1111111111111111
                            11111111f1f1111f11ff7777f111111111111111
                            11111111f1f771f17f111f777f11111111111111
                            111111111f1f7f1f717ff1777f11111111111111
                            11111111fff1f1f7f1fff1f77ff1111111111111
                            11111111ff7f7f77f1fff1f77ff1111111111111
                            11111111ff7ffff77f111f77ff7f111111111111
                            1111111117f7777f77fff777f77f111111111111
                            111111111f717777f777777f777f111111111111
                            111111111f1ffff77f777f7777f1111111111111
                            1111111111f1777f7ffff77777f1111ff1111111
                            1111111111f7777ffffff7777f11117177111111
                            11111111111ffff1f77fff77f11111f17f111111
                            1111111111111ffff777ffff7f1111f17f111111
                            111111111111f71f111f17f77f1111f17f111111
                            111111111111f77f111f77f77f11117177111111
                            1111111111111ff711177f77f7f1111ff1111111
                            111111111111111f7777f77f77f111f7f1111111
                            11111111111111ff111ffff777f11f77f1111111
                            1111111111111f17f1f17f777f7f1f77f1111111
                            1111111111111f77f7f77f77f777f7ff11111111
                            11111111111111ff1ffff11f777f77f111111111
                            1111111111111111117ffff111f77ff111111111
                            11111111111111111111117fff1ff11111111111
                        `, SpriteKind.Creature)
            case 11:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111ff1111111111111111111111
                            111111111111111f77ff11111111111111111111
                            111111111111111f7777ff111111111111111111
                            111111111111111f777777f11111111111111111
                            111111111111111f7777771ff711111111111111
                            111111111111111f777777f717f1111111111111
                            11111111111111ff77777f1ff77f111111111111
                            11111111111111fff777ff1ff7ff711111111111
                            11111111111111ff7f7f77f111f11f7111111111
                            11111111111111ff77f7777ff777711f11111111
                            111111111111111f7f7f777111777771f7111111
                            1111111111111111ff77f7771177777711f11111
                            1111111111111111f7777f7f11777777f7111111
                            1111111111111111f77777f71177777711111111
                            1111111111111111ff777f77117777f111111111
                            1111111111111111fff7f777111777f111111111
                            1111111111111111fffff777777777f111111111
                            11111111111111111f7ff777711777f111111111
                            11111111111111111f77f777771177f111111111
                            11111111111111111f77f777771177f111111111
                            11111111111111111f7f77777711777111111111
                            11111111111111111fff77777111771111111111
                            11111111111111111ff7777771177f1111111111
                            11111111ff111111ff7777771177771111111111
                            1111111f77ffffff7f7777711177f11111111111
                            1111111f177ffff77f7771111777711111111111
                            1111111f71177f7777f11111777f111111111111
                            11111111f711f111111f111777f1111111111111
                            11111111f771f111111f77777f11111111111111
                            111111111f77f7777777f777f111111111111111
                            1111111111ff7f77777777f71111111111111111
                            11111111111111ffffff71111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 12:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111bfb111111111111111111111111111111111111
                            1111111bfff1111bffffb11111111111111111111111111111111111
                            111111bfffff19fffffffb1111111111111111111111111111111111
                            111111ffffb1bffffff11f11111111111111111111bffffb11111111
                            111111111111fbfffb11f1b1111111111111111bfffffffffb111111
                            11111111111bfbfff11f11f1111111111111bfffffffffffffb11111
                            11111111111fffbf111f11f1111111111bff111111bffffffff11111
                            1111111111bfffbf11ff11f11111111bf11111111f11bffffffb1111
                            1111111111ff911f1fff11f1111111f911111111f11111ffffff1111
                            1111111111ff9111f11f11f111111f911111111f11111fffffffb111
                            111111111bff9111f111f1f11111f9111111111f111ff19bfffff111
                            11bffffb1ff119111f19f1b1111f9111111111f111f11119bffff111
                            1bfff111bbf119111f999f1111f91111111bfffffb1111119ffffb11
                            1fff11111fff119119f99f111f9911111bffffffff111119bfffff11
                            1ff111111f11f11999ff9f11f9991111fffb11bfff11119bffffff11
                            111111111f911f19bff1ff1fb991111fb111111fffffffffffffff11
                            111111111f1911bffff1ffffb99111f11111111ff1111bffffffff11
                            111111111b119b1ffff9fffffb99bf11111111bfb991111bffffffb1
                            1111111111f1bf9fffffb9bfffbff11111111bfb11199111bffffff1
                            1111111111fbf9fffffb1b9bfff991111111bffff11119911ffffff1
                            11111111111f1bfffff1b9bfbff9991111bffb111ff111199ffffff1
                            1111111111bfbbfffffb9bfbffff999ffff11191111ff1111ffffff1
                            1111111111fbfbffffffbfbfbffffff911ff111991111f11bffffff1
                            1111111111ffbffffffffbfbffff99991111ff11199111bffffffff1
                            1111111111bfffbb1bbfffffffff9999111111f111199111ffffffb1
                            11111111111bfb1199bbfffffffb99999911111f11111991ffffff11
                            111111111111bfbbbbb9ffffffbb999911991111ff11111bffffff11
                            111111111111191ff19fffffbbbffff91111991111ff1bfffffffb11
                            1111111111111f1f19fffffffffbb99fff1111991111fffffffff111
                            111111111bfff9fffffffff1fffbb99991fff111991119bffffff111
                            11111fffff119ffffffffff119ff999991111ff11199119bffffb111
                            1111f999bff9ffffffbbfff1199f99991111111ff111999bffff1111
                            1111f1119bfffffffb91bfff199ff999991111111ff199bffffb1111
                            1111f11119fffffff9119bf1f9f9ff9111991111119ffffffff11111
                            11111f1111bffffff11199ffffffbbf111119911119bffffffb11111
                            111111f1119bfffff11199fffffbfbbff1111199199bfffffb111111
                            1111111f1199bffff11199ffffb9ffbbbff1111199bfffffb1111111
                            11111111fb99bbfffb9199bffb999ff999bff99bfffffffb11111111
                            1111111111fbbbffff999bbff9b99fff1119bffffffffb1111111111
                            1111111111ffbbffffb9bbbff9f99f9ff11119bffffb111111111111
                            1111111111fffffbfffbbbbfb9f99f99ff11119bff11111111111111
                            1111111111ffffb9fbffbbff99f99f999ffb99bbfff1111111111111
                            11111111111ffb9f9fffffff99f99f999f9fffff9ff1111111111111
                            11111111111ff11f9fb9bf1f99b91b9111b99f999ff1111111111111
                            111111111111fbf99f9bf11fb91b11b111f199f9bff1111111111111
                            111111111111ff119f1bf111f91f11f111f119f9fff1111111111111
                            111111111111ff11f1bff111fb9f11f1111b119bff11111111111111
                            1111111111111ff1f1bf11111fbf111b111f11bfff11111111111111
                            1111111111111ffb1bff11111fffb11f111f1bfff111111111111111
                            11111111111111ffbfff111111fff91f111fbfff1111111111111111
                            1111111111111111fff11111111ffb9f99bffff11111111111111111
                            1111111111111111111111111111fffffffff1111111111111111111
                            11111111111111111111111111111fffffff11111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 13:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111f111111111111111111111111
                            11111111111111f1f11111111111111111111111
                            11111111111111f1f11111111111111111111111
                            1111111111111411d41111111111111111111111
                            111111111114ff11dff411111111111111111111
                            1111111111f1141dd4dd4f111111111111111111
                            111111111f11114f4dddddf11111111111111111
                            11111111f11111111ddddddf1111111111111111
                            11111114111f411111d1f4ddf111111111111111
                            1111111f11fff111111fffdd4111111111111111
                            1111114111ff4111111ff4dd4411111111111111
                            111111f1111114ff411ddddd4f11111111111111
                            111111f11114f11d4f4dddd44f11111111111111
                            111111f11141111d4ff4ddd44f11111111111111
                            1111114111fd11d44fffddd44411111111111111
                            1111111f11444444fff4dd444111111111111111
                            111111141ddf444fff4ddd44f111111111111111
                            11111111fddd4ffff4dddd4f1111111111111111
                            111111111fddddddddddd4f11111111111111111
                            1111111111fdddddddd44f111111111111111111
                            11111111114ff4444444f1111111111111111111
                            11111111141114ffffff1111111f111111111111
                            111111111f111ddd44ff4111111f111111111111
                            111111111f11dddd41fff11111fdf11111111111
                            11111111141ddddddffff11111fdf11111111111
                            1111111111fdddddd44f41111f1ddf1111111111
                            1111111111fffddddffff1111f1ddf1111111111
                            1111111111f11ffff44ff41111ffdf1111111111
                            11111111111f11dd44f4ff44fffff11111111111
                            11111111111f1ddd444fffffff444f1111111111
                            111111111111fddddff4fffff4f4df1111111111
                            1111111111111ffffd4444f444fdf11111111111
                            11111111111111fdddd444fdddff111111111111
                            111111111111111ffddd4fdddf11111111111111
                            11111111111111111ffffffff111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 14:
                return sprites.create(img`
                            11111111111111111114fff41111111111111111
                            11111111111111111f411dddff11111111111111
                            1111111111111111f11111ddddf1111111111111
                            111111111111111fd11111dddd4f111111111111
                            111111111111114ddd111dddd444f11111111111
                            11111111111111f4ddddddd44444f11111111111
                            1111111111111f4f4dddd4fff4444f1111111111
                            1111111111111fdffddd4ffff4444f1111111111
                            1111111111111fdffdddffff4444f11111111111
                            11111111111111fdfdddfff444ff111111111111
                            1111111111111f4fdddd4444ff4f111111111111
                            111111111ff41fd1fdd444ffdd4ff11111111111
                            1111111ffdd4f1f4fffffffd14f44f1111111111
                            111111fdddd44ffff1df444f44dd4f1111111111
                            11111f1ddd444ffffff4d444fd1d4f1111111111
                            1111411dd444fff4ff4ddd44f1d4f11111111111
                            1111f1dd444fff44f4d1dd44ff4ff11111111111
                            1111fdd44ff1f444fd1dd444fffff11111111111
                            11141d44f111fdd4f1ddd44ffffff11111111111
                            111fd44f111f1dd4f1dd44fff44ff11111111111
                            111f44f1111f1d4f4dd44fff4d4f111111111111
                            111f4f11111fdd4fdd44ff11dd4f111111111111
                            111ff111111fd4ffd44fdf11d4ff111111111111
                            111f1111111f4fffd4f11dfdd4f1111111111111
                            11111111111fffff4ff1dddf4ff1111111111111
                            111111111111ffdffdfdddd4fff1111111111111
                            111111111111fddfd1dfdd4fff11111111111111
                            111111111111fd4f11dfff4fff11111111111111
                            111111111111f4f11ff444fff111111111111111
                            1111111111111ff1fdd4444fff11111111111111
                            1111111111111fdfd1dd44ffff11111111111111
                            11111111111111f4111d4ffff111111111111111
                            111111111111111fd111f44fff11111111111111
                            111111111111111f4ddf1dd4ff11111111111111
                            1111111111111111ff4f11dd4f11111111111111
                            111111111111111111ffd1dd4f11111111111111
                            11111111111111111111fd1d4f11111111111111
                            111111111111111111111ffff111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 15:
                return sprites.create(img`
                            1111111111111111111111111111111111111111114fff4111111111
                            11111111fff11111111111111111111111111114ffffffff41111111
                            1111111f4d4ff1111111111111111111111114fffff4dddddf411111
                            111111fd11dd4ff111111111111111111114ffff4dddddddddd41111
                            111111f11111d4ff1111111111111111114fff4ddd11dd11dddf1111
                            11111f111111dd4ff11111111111111114ff4ddddd11d11111dd4111
                            111114111111d1d4ff111111111111114ffddd1111ddd111111df111
                            1111fdd111dddddd4fd1111111111114ffd11d1111d1dd111111d411
                            1111f1d1dd111ddd44f111ff1111114ffd111d111dd111dd11111f11
                            1111f1dd11111d1dd44f1ffff11111ffd1111d11d111111dd11ddf11
                            1111f1dd11111d1dd44f1ff1f11114ffd1111d1d11111111dddd1f11
                            1111f1dd1111ff1dd44ff111f1111ffd11111dd1111111111d111f11
                            1111fd1dd11ff1fdd44ff11f11114fd11111ddd1111111111d111f11
                            1111fd11d1ff1d1fd44ff1f11111fdd1111dd1d111111111ddd1d411
                            1111f111dfff1d11f4fffff11111fd1111dd111d111111dd11d1f111
                            11111f11dff11d11ff4ddfdff11fdd111dd1111dd1111d1111dd4111
                            11111f111dd11d1f4fdddfdd4f4fdd11dd111111dd1dd11111df1111
                            11111f1111d11dfdddddddddd4ffdd1dd111111dddd11111ddd41111
                            111111f111dddfdddddddddddd4f4ddd1111dddd11dd11dddd411111
                            111111f1111ddf4dddddddddd4fffdd111dd1111111ddd11df111111
                            1111111f11dd44fdd111dddddfd444dddd111111fffd11ddf1111111
                            11111111fdddf1fd11111dddf11d4fddddddd4ff444ffd4f11111111
                            111111111f44fd1f11111dddf1144f4dddddff4ddd444f1111111111
                            1111111111fff4dfd1111ddf11d4ff44dd4f4dddddd44f1111111111
                            11111111111fff4f411111df1d4fff44fff4d1111ddd4f1111111111
                            111111111111fffff11111dffffffffffffd111111dd44f111111111
                            111111111111fffff11111dffffff4ffff411111111dd4f111111111
                            1111111111111fff411111d4ffff4fffffd11111111dd4f111111111
                            1111111111111ff4111111dd4ffdffffffd111111111dd4f11111111
                            11111111111114ffd11111dddfd44fffffd111111111dd4f11111111
                            11111111111111fffd111dddff444ffffffd111111111ddf11111111
                            11111111111114ffffdddddff44444ffffffd11111111dd4f1111111
                            111111114ffffffffffdd44f44444444ff44fd11111111ddf1111111
                            1111111f111d4ffff444ffff444444444f444ff11111111d4f111111
                            111111f11111d4ff4dd4444f44444444fffdd4ff1111111ddf111111
                            111111411111dd4fdddd4444f44444fffff4dd4ff1111111d4f11111
                            111114111111ddd4f1dddd444fffff4fffffddd4ff411111ddf11111
                            11111f111111ddd4f11d1ddd4f444ddfffff4dd4ffff11111d4f1111
                            11111f11111ddd44f1d11dd4ff4ddddffffffd44fff1f1111ddf1111
                            1111141111ddd44f11d11d4ff4d1dddffdfff444f4f11f1111d41111
                            111141111ddd44f11d1114fff4111ddff1ffff44f44f11f111ddf111
                            1111f111ddd44ff1dd114fdfff411d44fdffff4d4dd4f11f411d4111
                            1111f111dd44f11ff114f4fffff44444ff4fffdf11dd4f111f1ddf11
                            1111411dd44f11111ffffffff41ff444fffffff41111df1111f1df11
                            111411dd44f11111114fffff41111fffffffff11ffffff11111fdf11
                            111f11d44f11111111fffff41111111114ffff11111111111111f411
                            111f1d44f111111114fff41111111111114fff14ffff411111111111
                            1114dd4f111111111fff4111111111111114fffffd4fff4111111111
                            11fdd4f1111111111fffffff4d1111111111114ffffd4ff111111111
                            11fd4f1111111111114fffffff411111111111114ffffff411111111
                            11f4f111111111111114fd4ffff4111111111111114fffff41111111
                            11ff11111111111111114ffd4fff41111111111111114ffff4111111
                            11f11111111111111111114ffffff111111111111111114fff111111
                            1111111111111111111111114ffff411111111111111111111f11111
                            11111111111111111111111111111fff1111111111111111111f1111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 16:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111ffffff1ff1111111111111111111
                            11111111111fef3eeff13ff11111111111111111
                            11111111111ff3eef13333ef1111111111111111
                            1111111111ff3eef333eeff11111111111111111
                            111111111ff3eeffffffff111111111111111111
                            111111111ffeefffeeeeeef11111111111111111
                            1111111111ffff1fffeeeeef1111111111111111
                            1111111111fffefefffeeeeeff11111111111111
                            111111111f13ffeffffeeeeeeeff111111111111
                            11111111f133efff1ffeeeeeeeeefffffff11111
                            111111111ffeef111fee3eeeeeeef3333efff111
                            111111111f1ff111fee3eeeeeeefffffff333f11
                            111111111f1111111ef3eeeeeef3333333eee3f1
                            111111111f11111111f3eeeeeefe33333efffef1
                            111111111f311111111f3eeeeeefffffff333f3f
                            1111111111f11111111f3eeeeefe3333333efef1
                            1111111111f111111111feeeef333333efffef11
                            1111111111f3131311111ffeefeeeffffffff111
                            11111111111f3f13f111113ffffffeeefff11111
                            11111111111f3f133f111133ffeeeeeeeff11111
                            111111111111fef133ff3333feeeeeeeef111111
                            1111111111111f3fff33ffff3feeeeeeff111111
                            11111111111111f31111333333feeeeff1111111
                            11111111111ffe3f31111111333fffff11111111
                            11111111fff33333ffe1111333ffffff11111111
                            1111111f11fffe3eeefffffffff3333ef1111111
                            1111111ffffe11ffff111ff3ff333efe1f111111
                            1111111111f1ff111111f11f11efe111ff111111
                            1111111111ff1111111f1ff11f11111111111111
                            1111111111111111111ff1efe111111111111111
                        `, SpriteKind.Creature)
            case 17:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111111111111111111111f1111111111111111111111
                            11111111111111111111111ff11111111111111111111111
                            11111111111111111111fff1f11111111111111111111111
                            11111111111111111fff311f111111111111111111111111
                            1111111111effffff33333fffff111111111111111111111
                            1111111eff3333333eeeff331f1111111111111111111111
                            111111f3eeefffeeefff3331f11111111111111111111111
                            11111f3eef1333fff333333f111111111111111111111111
                            1111e3ef13efffe333333ff1111111111111111111111111
                            1111fef3eefeeeeeeeffffffffffff1111111111ff111111
                            111fefeefeeeeefffffee33111fff111111ff1ff1f111111
                            111fefefefffffffffffffffff11111111f13f111f111111
                            111feffef3333ffeeff111111111111f1f13f1113f111111
                            111fefeff1113feeeef11111111111f1f13f1113f1111111
                            111ffff1f113ffeeeeef1111111111f1f1f1113ef1111111
                            111fffffffffffeeeeeeff1111111f1f13f1113f11fff111
                            11f113f11113fffeeeeeeefff1111f1f1f1113efff11f111
                            1f113eef11113ffeeeeeeeeeefff1f3f3f113eff111f1111
                            f133eef111113ffeeeeeeeeeeeeeffefef13ef11113f1111
                            1fffff111111ffeeeeeeeeeeeeeeeefff33ef11113f11111
                            11111f11111feeeeeeeeeeeeeeeeeeeeffef111133f11111
                            11111feeeeeeeeeeeeeeeeeeeeeeeeeeeeff3133efffff11
                            11111feeeeeeeeeeeeeeeeeeeeeefeeeefe3f3eeff113f11
                            1111feeeeeeeeeeeeee3eeeeeeeeeffffe333fef1113f111
                            1111feeeeeeeeeeeeef333eeeeeeeefee33333f3133f1111
                            1111feeeeeeeeeeeeeef333eefeeefeff333333f3ef11111
                            1111feeeeeeeeeeeeeef333333fffef33ef33333ff111111
                            1111feeeeeeeeeeeeeeef333fffe33f3333ef333f1111111
                            11111ee1111eeeeeeeeeffffefef333e33333ef31e111111
                            11111f11111111eeeeeeef1eefe3f33f3333333eff111111
                            11111f1111111111eeeeef1133e33ef3333333333f111111
                            111111f1111111113eeeeef113f333ef3333333311f11111
                            111111f311111113333eeeefe33e333eef333331111f1111
                            1111111f31111133333eeeeefeef33333eef31111111e111
                            1111111f333333333333eeefefffee33333eefff1111f111
                            11111111f333333333333eeefeffffeee333333eefffff11
                            111111111f333333333333eeefeffffffeee3333111111e1
                            1111111111fff3333333333efefefffffffffff1111111f1
                            11111ffffffeefff3333333eefeffffeeeefff1fffffff11
                            1111f11f3333eeeefff3333efefffee33eff111111111111
                            111f133fff33333eeefffffffffee3333333ff1111111111
                            111f1ff111feeeefff11ff1ffff1f3333fff11f111111111
                            1111f1f1fffffff1111f1333f1333ffff111f1f111111111
                            1111111f11111111111f3fffe1fff11111111f1111111111
                            11111111111111111111f1111f1111111111111111111111
                        `, SpriteKind.Creature)
            case 18:
                return sprites.create(img`
                            111111111111111111111111fff111111111f1111111111111111111
                            11111111111111111111111111fff11111111ff11111111111111111
                            111111111111111111111111111f1f1111111f1f1111111111111111
                            1111111111111111111111111111f1f1111111ff1111111111111111
                            1111111111111111111111111111f11f111111f1f11f111111111111
                            1111111111111111111111111111f113f11111f1f111f11111111111
                            1111111111111111111111111111f133f111111f1f11f11111111111
                            1111111111111111111111111111f133f111111f1f1f3f111ff11111
                            111111111111111111111111111f1333f111111f1f1f3f11f11f1111
                            111111111111111111111111111f1333f11111f11ffe3f1f11f3f111
                            11111111111111111111111111f1333f11111f111fe33ff113e3f111
                            11111111111111111111111111f133ef1111f111ff331f111f33ef11
                            1111111111111111111111111f133ef111ff111ffe31f111f33f3f11
                            111111111111111111111111f133eef1ff1111fef31f111f333e3f11
                            11111111111111111111111f33eeefff11111fefe3f1113e33f33f11
                            1111111111111111111111feeeeff11111fffefe3f1113f333f33f11
                            111111111111111111111ffffff1111fff13efe3f1113f3333e333f1
                            1111111111111111111ff1111111fff113effe3f1113f3333f3333f1
                            1111111111111111fff11111ffff1133effe3ff11133e3333e3333f1
                            11111111111111ff11111fff11333efffe33f111133f3333f33333f1
                            1111111111111f13333ff1133effffe333ff111133f33333f33333f1
                            111111111111f3333ff113efffe333313f11111333e33333e3333f11
                            11111111111f3133f113effe3311113ff11111333f33333f33333f11
                            1111111111f1133f13effe3111333fffff111333f333333f33333f11
                            111111111f11f3f13efe31133fffff1133ff3333e333333e33333f11
                            111111111f3f1f13ef113ffffeeff113333ef33f333333f33331f111
                            11111111f3f1f13efffffeeeeeff11333eeeeff3333333e33331f111
                            11111111f3f1f3efffeeeeeeeef11133eeeeeffff3333f333331f111
                            11111111fe1f1effeeeeeeeeef11133eeeeefeeeef333f33331f1111
                            1111111f3f1f3ffeeeeeeeeef11113eeeeefeeeeeef33e33311f1111
                            1111111fe1f1ffeeeeeeeeeef11333eeeefeeeeeeef3f33331f11111
                            1111111fe1f3feeeeeeeeeef33333eeeeeeeeeeeeeeff33331f11111
                            1111111fef1ffeeeeeeeeeef33333eeeeeeeeeeeeeef33333f111111
                            111111fe3f3feeffffeeeeef3333eeeeeeeeeeeeeeff33331f111111
                            111111f3f3ffef33effeeeef3333eeeeeeeeeeeeefeef333f1111111
                            111111f3f3fefff111ffeeef3333eeeeeeeeeeeefeeeef3f11111111
                            111111ffffff1ffe31fffeef3333eeeeeeeeeeefeeeeeef111111111
                            11111f111ffffffffffffeef3333eeeeeeeeeeeeeeeeeef111111111
                            1111f11133ffff33333ffeef3333eeeeeeeeeeeeeeeeef1111111111
                            111f11133ef33111113ffeeef3333eeeeeeeeeeeeeeef3f111111111
                            11f1133eeff311111111feeef3333eeeeeeeeeeeeeef33f111111111
                            11fffffffff3111111111eeeef3333eeeeeeeeeeeef3311f11111111
                            1111111ffff111111111111eeef3333eeeeeeeeeef11111f11111111
                            1111111fe3f1111111111111111ff3333eeeeefff1111ff111111111
                            111111fe3fffffffffffff1111111fffffffff11effff333fff11111
                            111111fff11111111ffffffffffff1111111111ff3eee3eef31f1111
                            111111111111111fffff1fffffe1111111fffffe3e33e333ef33f111
                            1111111111111fffff11ffffe111111fffe33e33fff33eeff1fff111
                            111111111111ffffe1efffee111111f113fe33ffe33eeff111111111
                            111111111111ffee11fffe11111111ffffffffe33eeff11111111111
                            111111111111fe111fffe11111111f111111f33eeff1111111111111
                            1111111111111111efee111111111111111f1feff111111111111111
                            11111111111111111e1111111111111111f133f11111111111111111
                            111111111111111111111111111111111fffff111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 19:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111bbffffb11111111111111111111111111111
                            111b1111111bfb11111111111111111111111111
                            11b111fffbd111ffb11111111111111111111111
                            11bd1bddddffbd111fb111111111111111111111
                            111fddbddddb1ffbd11fb1111111111111111111
                            1111bfdddddf1111fbdd1f111111111111111111
                            111111bffbb1111111ffddf11111111111111111
                            11111111111111111111fddf1111111111111111
                            1111111111111111111bbffbf111111111111111
                            11111111111111111bb11111df11111111111111
                            11111111dbf11111b111111dddf1111111111111
                            1111111d11df111f1111dddddddf111111111111
                            1111111bddddb1f1ddbffbdddddf111111111111
                            1111111fdddbdffbdfddddfdddddb11111111111
                            1111111fddbf111dfdddb1fdddddf11111111111
                            11111f11bff11ddddddbd1fdddddf11111111111
                            1111f1f1fddddddbdddb11bddddddf1111111111
                            11111b1fddddddf1bdbd1bdddddddb1111111111
                            111111fddddddf11fdb11fdd1fddddf111111111
                            11111f1f1dddf1f1fddbfddd1fbddddf11111111
                            11111b1111111bbb1ddfffd1fbfbbddb11111111
                            111111bfff111111bfb111f1fb1fbbddb1111111
                            111111f111ff1111111fff1fb111fbddb1111111
                            11111b1b11dff111bffbdd1f11111b11db111111
                            11111f1f1bfbbf111dbdddfb11111f111b111111
                            111111fffffbbbf11dbdddf11111fd1b1b111111
                            11111111bbfbbbf1dbdddddb1111fdffb1111111
                            1111111fddbfbbf1fbbddddf1111111111111111
                            1111111fdddbff1fddfddddf1111111111111111
                            111111fddddfdff111fbdddfd111111111111111
                            111111fd11bd1111111f1dddf111111111111111
                            11111fdb1bf11111111fb1b1f111111111111111
                            11111dffff1111111111ffff1111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 20:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111bf1111111
                            111111111111111111111111111111111111111f1f111111
                            1111111111111fffff11111ff1111f111111111f11f11111
                            11111111111ffdddddfff1fdff1fddf11ffff111f11f1111
                            1bb11111fff1dddfdddddfddddfdddffbddddff11f11f111
                            b11ff11f111111fbdddd11dddddddfdddfffffdf1f11bd11
                            1ff11ff11bfff111ddddfffffffddddff11111fdf1b11f11
                            111ff1f1ff1dbff11ddf1f111fddddf11111111ff1f11f11
                            1111bf11f1111dbb111fff111bdddf111111111f11f11bd1
                            11111f1b111111df111dff11bddddf111111111df11b11f1
                            111fff1f1b111bffb111ddbbdddddff1111111df111f11f1
                            11f11bf1b111bffff111ddbbdddddddbbffffffff11f11f1
                            111fffb1f111fffff1111dddddfffffdd11111111f1f11b1
                            111111fff11ffffffb1111dddd1111111fffffffb11f111f
                            11111111ffffffffff111111111fffffbddddf11111fdd1f
                            111111111fffffffff111111111111ffddddddf1111f11df
                            111111111fffffffff11111111dff111fdddddf1111f111f
                            1111111fffffffffffb1111b111ddfffdddddddf111fbd1f
                            1111111b1f1fffffffb11111f11dddddddddddddf1f111db
                            111111f11f1bfffffdb111111ffdddddddddddfff1f111fd
                            111111f11b11fffffdb111bf111fdddddddddddf11bbb1f1
                            11111ff11111fffff1111111bf11ffdddddddddf1f111bf1
                            111bf1f11111bfffb1d1111111bf11ffddddddddf11111b1
                            1bf11fffddd11fff11111111111dbf11ffddddddfbb11fd1
                            b1bff11fdddddffd1111111111111dbf11fddddddf11bf11
                            ff1111f1fffffb11111111111111111dbf1bdddddff1db11
                            111111f11111111111111111111bb111ddfdddddddf1f111
                            1111111f111111111111111111b11f11ddddddddddf1f111
                            111fff11ff111d1d1d1111111fb11f11ddddddddddff1111
                            11f11dffbbfbd1d1d1d111fffdf1fdfdddddddddddff1111
                            11f11ddfbbbffd1d1d111f11fddfddffddddddddddf11111
                            11bb1bddfbbbfb1111111f111fdddf1fdd1ddddddf111111
                            1fdf1fdddfffff11111111ffffddf11fdf1ddddddf111111
                            1f11bddbf11fbf1111111111fddddffff11ddddddf111111
                            1f11fdbbf11ff1f1111111111fff11f111ddddddf1111111
                            11f1fbbf1ff111f11111111111f111f111ddddddf1111111
                            111f1f1f1111111f11111111111fff111ddddddf11111111
                            111111f111111111fd1111111111111dddddddf111111111
                            1111111111111111fff111111111dddddddddff111111111
                            11111111111111ffbbbff11dddddddddddbffbbf11111111
                            1111111111ffffddbbbbbfffbddddddfffbbbbdf11111111
                            1111111fffbdddddddbbbf111fffffffbbbdddddff111111
                            111111f11bbdddddddbff11111111111fbddddddddf11111
                            111111f1f11bbbddbff1111111111111fdddd11dddf11111
                            1111111ff1ff11bf111111111111111f11dbd11fddf11111
                            11111111ff1f1ff1111111111111111f1ff1ffdffdf11111
                            111111111111f1111111111111111111f1111ff1ff111111
                        `, SpriteKind.Creature)
            case 21:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111e1111eeff111111111111111111
                            111111111111ff11ef13f1111111111111111111
                            11111111111e1f1f13ef11111111111111111111
                            1111111111e1f1f33ef1111ffff1111111111111
                            111111111e13ff13eef11efee11f111111111111
                            111111111e1333efffeffe111ef1111111111111
                            111111111f133efeee333133ef11111111111111
                            1111111111f1f11333333333f111111111ff1111
                            1111111111ffe33effff333ef11111111e1f1111
                            1111111111f1feff33f3333f111fe111e11e1111
                            11111111ef1efff3fff333ef11f11f1f113e1111
                            1111111e1ee333f1f1f3eefffff11e1e13f11111
                            111111e1e333333fff3fffffffe111f33ffff111
                            111111ee333333ef33eefffffffe11feff333f11
                            111111fe33333eef33feeffffffffeffe3333f11
                            111111fe3efffff3333ffffffff13ff3333ef111
                            1111111ff111f33333eefffffff1ffe33eef1111
                            11111111111e333333eeefffffe3fe33eefff111
                            11111111111e33333e3eeffffe1fe33eefeeef11
                            11111111111e33333ef3eeffe11333eef3eeef11
                            111111111111e333efef3efe11333eff3eeef111
                            111111111111f333ef3efef11333ef33eeff1111
                            1111111111111feefe13eff11333333eff3ef111
                            11111111111111fef31133ef13333eef33eef111
                            111111111111111fe11133ff33333333eeef1111
                            11111111111111feff33effefe3333fffff11111
                            1111111111111feefffff33eefeeeeeef1111111
                            1111111effeee33ff11fffffffffffff11111111
                            111111e1e3333333ff1ffffeeff1111111111111
                            111111f1ffffffffffffeeeffeefff1111111111
                            111111ff1111111f11eefff11ffee1f111111111
                            1111111111111111ffff1111111ffff111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 22:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            111111111111ffffffffff1111111111111111111111111111111111
                            111111111fff33eeeef111ff111f1111111111111111111111111111
                            1111111ff333333eeeef1111fff1f111111111111111111111111111
                            111111f1133333eeeeeef11111ff1f11111111111111111111111111
                            11111f1111333333eefffff111131f11111111111111111111111111
                            1111f11e313333efff11111ff11113f1111111111111111111111111
                            1111f1e1111eeeffffffff333311113f111111111111111111111111
                            11111f11133ffffffffff11111f11113ff1111111111111111111111
                            1111f1113ffffffffffffffffff311113ffffff11111111111111111
                            111f1113ffffffffffffffffffff113ff33f111ffff1111111111111
                            111e113fffffffefffff3f3ffefffff3eef11111111ff11111111111
                            11f113ffffff1efffffff3ef3fffef3fef11111111111ff111111111
                            11f33ffffff1effffffe3efeeefee3eef11111113331111ff1111111
                            11f3fffff11efffffffeefeeefeeeeef11111111111331111f111111
                            11f3ffff11efffffffeeeeeeeeeeeeef1111111111111ffe31f11111
                            11f3fff11efffeefffeeeeeefeeeeef1111111133311111ffe111111
                            11f3ff1111ee111effffffeeeeeeef1111111111113331111f111111
                            111ff1111111ffff11fffffffffef11111111111111ffe3311f11111
                            111f1111ffff1111f13f1f111f333f111111111113111fe3333f1111
                            111f1fff111111113333ff11f3333f11111111111133111eff3f1111
                            1111f11113ffffffffffffff33333f1111111111111f3111eeff1111
                            11111fffff1111ffeeff13333333ef1111111111111ff3311feef111
                            111111111111ff33ff311133333ef111111111ff1111ef3311fef111
                            1111111111ff33fffff333333feffff311f11111f311fef331fef111
                            111111111f3ffffffeefff3fffffffff311f11113f311fef331fef11
                            1111111111111111fee33331113ff33ff311f3111ff311fef31fef11
                            11111111111111111fef333333ffeff33f31f3111fef31feef3fef11
                            111111111111111111ffff3ffeeeeeefff31ff311fef311fef31ff11
                            1111111111111111111feeeeeeeeee3333f3ff311feef31feef3fef1
                            111111111111111111f3feeee3333333333feef31feeef3feef3fef1
                            1111111111111111ff3ffffe333e11111ffffef3f3eeeefeeeefeef1
                            111111111111111f1ef1f3fff3f311fffeeffef3f33eeeeeeeeeeef1
                            11111111111111f1ff1f3f111fffff3333fffeefff3333eeee3f3f11
                            11111111111111ff11f3f111111f333111ffeeeefe333333333f1f11
                            1111111111111111ffef11111111f111ff1feeeef3133333331f1f11
                            111111111111111f11f1111111111ffffff333eef3111111111ff111
                            1111111111111111ff1111111111feeff1f3333ef311f111f11f1111
                            111111111111111111111111111f33f11f33333f3111f111f1ef1111
                            11111111111111111111111111f33f11f33313f33111f111f1f11111
                            1111111111111111111111111f3f3f1f11133ef3111f311ef3f11111
                            111111111111111111111111feff3ff11131ef3111ef311eff111111
                            11111111111111111111111f1ff1ef111311f3311ef311ef11111111
                            1111111111111111111111f1f1f1f111e11ef3111f311ef111111111
                            1111111111111111111111ff11ff111f11ef3111ef11ef1111111111
                            11111111111111111111111fff111ff11ef3111ef31ef11111111111
                            11111111111111111111fff1111ff11eff3111efffff111111111111
                            1111111111111111111f1111fff1efff311efff11111111111111111
                            11111111111111111111fffffffff111ffff11111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 23:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111111111bfffffbbd1111111111
                            111111111111111111bfffb111111bd111111111
                            1111111111111bbffb11111b1111111f11111111
                            11111111111bf1111dddddddbdd11111f1111111
                            1111111111f111dd111dddddbdddd1111f111111
                            111111111b1ddddbff11fdbffffbdd11dbd11d11
                            111111111ffbbbb1f1b1dff11111fd11ddf11b11
                            111111111fbdddbff1b1df1111111fddddf11f11
                            11111111b1111111bb11fb1111111bdddbf1f1f1
                            11111111f1111111111df1111111f1bbbfb1fdf1
                            11111111fdd1b111111b11111111f11ddfdbdf11
                            1111111bd111111bf1df1111111f111ddb1f1f11
                            1111111f11111bffbdf111111bf111ddff1ff111
                            11111111fbbbffffdf1111bff11111ddb1b1df11
                            1111111111fffffdf111bf11dbb11ddf11b1df11
                            11111111111f1ddf11bf1111111bddf1111ff111
                            111111111111bfb11f11111dddddfb1111f11f11
                            1111111111111111f1111ddddffb111111fddf11
                            111111111111111b1111ddbffb11111111bff111
                            1111111111111fff111ddbddbff111111b111f11
                            11111111111bfbdfddddddbbfbbf11111f11df11
                            1111111111f11dbbbbffffbb11ddbf11bf1ddf11
                            111111111f11dbd111111111b11dddbf11fbb111
                            111111111f1dbd1111111111db11dbf11ddf1111
                            1111111bfbddbd1111111111db11dbffdddf1111
                            111111f11fddbd111111111ddb1dbfbbfbdf1111
                            11111bd111ffdb11111111ddbbdffbdbbff11111
                            11111fd11b11bfd1111dddbbbfb1ddbdbf111111
                            11111fd1b1111dbffffffffb1ddb1db1bf111111
                            11111bddb1111b11111dddb111ddb1dbdb111111
                            111111fdb1111b111111ddb111ddb1dbf1111111
                            1111111db111db111111ddb111ddbdf111111111
                            11111111fbdddb11111dddb11ddbbf1111111111
                            1111111111fbddb111dddbdddbbff11111111111
                            111111111111bfffffffffffff11111111111111
                        `, SpriteKind.Creature)
            case 24:
                return sprites.create(img`
                            1111111111111111bfffffffb1111111111111111111111111111111
                            11111111111111bffdddddddffd11111111111111111111111111111
                            1111111111111ffd11111dddddffbd11111111111111111111111111
                            111111111111fdd111ddddddddddfffbd11111111111111111111111
                            11111111111fddd111dddddddddfdddffbd111111111111111111111
                            1111111111ffddbdddddddddbdddfddddfffb11111111fff11111111
                            111111111ffdbfddddddddddfbddbfbbddddffd111111fddffb11111
                            11111111fdfdf1fddddddddf1fddbffffbddddfb111111fffd1f1111
                            1111111fddfdf1ffddddddff1fddbffffffbddddf1111111fbbfb111
                            111111fdddfddfbfddddddfbfddbbfbbbbfffbdddf1111111ffff111
                            11111fddbdfddfbfddddddfbfddbffbbbbbbbfbdddf1111111fddf11
                            1111bfddfddfddffddddddffddbffbbbbbfffbfbddfb111111fd11f1
                            1111fdddffddfddddbddbddddbffbbbbbfffffbbbddf111111df11f1
                            111bfddbffffdfdddfddfddbbffbffbbffff1ffbbddfb111111ffff1
                            111fdddff1fffdbfddddddbffbbffbbffff11fffbbddf111111fd11f
                            11dfdddff111fffbffffffffbfffbbffff111fffbbddfd11111fdd1f
                            11bfddbff11111ffbffffbff1ffbbfff111b11fffbbdfb11111fbddf
                            11ffddfff11b1111ffbbffffffbbffd1ddbb11fffbbddf11111fbbbf
                            11fdddfff11dbd111ffbbffffbbffddbbbbd11fffbbbdf11111fffff
                            11fddddff111bbbd11ffbbffbbffdbbbbbb11ffffbbbdf11111fd11f
                            11fddddfff11dbbbbd1fbbbbbffdbb1dbbd11fffbbbbdf1111dfddbf
                            11fddddbff111bb11bdffbbbfffdb111bb11ffffdbbbdf1111fdddbf
                            11fdddddfff111bb11bffbbbfffdb1dbb1fffffbdbbbdf1111fdbbbf
                            11fddddddfff111bd1bffbbbffff1bbdfffffffdddbbdf1111ffffff
                            11ffddddddffff11bbfffbbbbfffffffffffffbdbdbdff111fdd11bf
                            111fdddfdddbffffffffddbbbffffffffffffbdfbdbdf111fddd11bf
                            111ffddbfdddbffffffbddddddfffffffffbddbfddbdf11fdddddbff
                            1111fdddfffdddbfffbdddfddddbbffffbdddfffdbdff1bfffddbbf1
                            1111ffddfffffdddddddbffffbdddddddddbfffbdbdf11fdddfffbf1
                            11111ffddfffffbdddbffffffffbbddddbfffffdbdff1bdddd11ff11
                            111111ffdfffffffffffffffffffffffffffffbdbdf11fdddd11bf11
                            1111111ffdbfffffffffffffffffffffffffffdbdff1bddddddbbf11
                            11111111ffddfffffffffffffffffffffffffdddff11fddddbbbbf11
                            111111111ffddbffffffffffffffffffffffdddff111fdbbffbbf111
                            1111111111ffdddbffffffffffffffffffbdddff11111fffddfff111
                            11111111fffffddddbffffffffffffffbbdddff111111fbddd11f111
                            111111ffddfffffddddbffffffffffbdddddff1111111bbddd11df11
                            1111ffddddddfbffddddbbbffffbbdddddbff11111111bfbdddddbf1
                            111fbddddd11dfbfffddddddddddddddbffff111111111ffbddddbf1
                            111fbddddd11bfbbffffddddddddddffff1bbfb11111111fbbddbbb1
                            11fbbbdddddbbffffffffddddddddffffdddbfdfb1111111fffbbff1
                            11fbbbbbbbbbfddd1ffffffbddbffffffddbfd11dfb11111fbbffff1
                            11fbbfffffbfd1111fffffffffffffbffdbbfd11ddfb111bf11dbbf1
                            11fffbddddff1111dffbbbffffffbbbffbbfbdddddbffb1fb11dddbf
                            1ffbbddd111df111ffbbbdbbffb11bbffbbfbddddddbfffffddddbbf
                            1fbbdddd111dbfddffbbdddbbb111bffbbfbbbddddbfb11dbfdddbbf
                            1fbbddddddbfddffbbfbdddddd11dbffbbfbbbbddbbfd11ddbfdbbfb
                            1fbbdddddbbfd11ddbbfbdddddddbffbffbbbbbbbbfdddddddfbbff1
                            11fbdddddbfdd11ddddbffddddbbbff11bffbbbbbbfdddddddfbff11
                            11fbbdddbbfbddddddddbbffbbbbff11111bfbbbbfbbdddddbbffb11
                            111fbbbbbbfbdddddddddbbbfffff11111111ffbfbbbbdddbbbff111
                            1111fbbbbbbfbddddddddbbbbbbf1111111111bdffbbbbbbbbff1111
                            11111ffbbbbfbbbdddddbbbbbbf1111111111111dffbbbbbbff11111
                            1111111ffbbbfbbbbbbbbbbbff111111111111111dbfffffff111111
                            111111111fffffbbbbbfffff1111111111111111111dbffbd1111111
                            111111111111fffffffff11111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 25:
                return sprites.create(img`
                            1111111111111111111111111111111111111411
                            111111111111dd1111111111111111111111ff11
                            14ff41111111ddd1111111114ffff111111f1f11
                            114fff411111ddd11111114fffff411111f11f11
                            1114fff41111dd1111111f444fff11111f111f11
                            11114f44f111d1111111fdd444f11111f1111f11
                            11111411df111111111fdddddf11111f11111f11
                            111111f1ddf11111111f1dddf11111f111111411
                            1dd1111fddd4ffffff411ddf11111f111111f111
                            ddd111114f11111111f1d4f11111fd11111f1111
                            1dd1111f1111111111111f1111111fddddf11111
                            11d111f1f11111111ff111f1111111ffdddf1111
                            1111141f1f111111f1ff114111111111fdddf111
                            11111f1fff111111ffff111f1111111fdd444f11
                            1111411dfd111111dffd1114111111f44444f111
                            1111f411111f111111114411f1111f44444f1111
                            111f444111111111111441414111f44444f11111
                            111fd411f11ff111f1114411df111f444f111111
                            111f11111f411ff411111111df1111f44f411111
                            11ff4111111111111111ff1ddf11111ffff41111
                            11f4f41111111111111f44fdd4111111ffff1111
                            11f44f11ddddd11111f14f11dd4111111fff1111
                            111f411ddddddd111111f1111df1111114ff1111
                            1111f1ddddddddd1111f111114f111111ff41111
                            11141ddddddddddd1111111444441111fff11111
                            111f1ddddddddddd11d11144444f1111fff11111
                            111f1ddddddddddd1d11144111df1114ff4111d1
                            111f1ddddddddddd1411111111df111fff111dd1
                            111fdddddddddddd411111111ddf114ff411ddd1
                            14ff4dddddddddddf11111111d4f11ff411dd111
                            1f44fdddddddddddf111111d444f4ff411111111
                            11f44fddddddddddfd1111ddd44ff41111111111
                            111f44fdddddddd4f4d11ddddddf411111111111
                            1111ff4f4dddd4444fdddddddd4f1111d1111111
                            111111111ff44444f1fdddddddf11111dd111111
                            11111111111fffff111fddddd41111111dd11111
                            11111111111111111111ff4ddf1111111ddd1111
                            11111111111111111111111f44f111111dddd111
                            11111111111111111111111f44f1111111dd1111
                            111111111111111111111111ff11111111111111
                        `, SpriteKind.Creature)
            case 26:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            1111111111111111111111111111114ffffff4111111111111111111
                            1111111111111111111111111114ffffffffffff1111111111111111
                            111111111111111111111111d4fffffff4d1111141111114fff41111
                            111111111111111111111114ffffff4dddd1111114414fffffff4111
                            1111111111111111111114ffffffffffddd111114ffffffffffff411
                            11111111111111111111ff4444444444ffdd4ffffffffff4dddfff41
                            1111111111111111111f44444444444444ffffffffff4dddddf414f1
                            111111111111111111f44444444444444444fffffff4ddd4fff111f1
                            111111111111111111ff4444444444ff44444fffff4ddd11111f1141
                            11111111111111111f1ff44444444f1ff44444ffff4dd1111111f111
                            1111111111111111fffff44444444ffff444444ffff4d11111111f11
                            111111111111111f44ff4444444444ff44ddd44ffffff4d111111f11
                            11111111111111fd444444f4444444444ddddd44f11fffff4d111d41
                            111111111111114dd4f4444444444444d11dddd4f1fffff11ff4ddf1
                            111111111111141dd44ffffffff44444d11dddd4ff4ffff11111f4f1
                            1111111111111fdd4444ffddff444444ddddddd4f444fff111111f11
                            1111111111111fd444444ffff44444444dddddff44444f4114f411f1
                            1111111111111f444444d1111d44444444ddff4444444f11f111f1f1
                            111111111111f44444d11111111d44444444444444444f1f1111f1f1
                            11111111111ff444411111111111d444444444444444f11f111f1141
                            1111111111f4f4411111111111fffd4444444444444f1111f1111f11
                            111111111f4f4411111111111fffff444444444444f1111114ff4111
                            11111111f44f4111111111111ffffff44444444444f1111111111111
                            1111111f444f411111111111ffffffffffff444444f1111111111111
                            1111111ff44f111111111111fffffffff444ff44f44f111111111111
                            1f11114ffff1111111111111fffffffff44444f4ffff111111111111
                            1f1111fffff1111111111111ff41114fff4444444ffff11111111111
                            1ff1114ff4f1111111111111f4111114ff4444444ffff41111111111
                            1ff1111111f1111111111111f11111114f44444444fffff411111111
                            1f1f111111f1111111111111f111111114f4444444fffffff4111111
                            1f1f111111f11111111111111411111111f444f444ffffffff411111
                            1f1df11111f11111111111111f11111111f4444ff44ff14ffff41111
                            1f1d4f1111f11111111111111f111111114f444fff4f1114ffff4111
                            1f11df11111f1111111111111f1111111ddf4444fff1111114fff411
                            1f11d4f1111f111111111111114111111ddf4444fff1111111ffff11
                            11f1ddf1111ff1111111111111f11111dddf4444ff111111114fff41
                            11f11d4f111fff1111111111ddfd11dddddf4444f11111111114fff1
                            11f11dd4f111fffdd11111dddddfdddddd4f444f111111111111fff1
                            11f11dd4f111ffff4dddddddddd4fdddddff4ff1111111111111fff1
                            111f11dd4f111fffff4ddddddd444f4dd4fff111111111111111fff1
                            111f11dd44f111fffffff444444444ffff111111111111111114fff1
                            111f111dd4ff1111ffffffff444ffffff111111111111111111ffff1
                            111f111ddd4f111fdff1ffffffffffffff1111111111111111dfff41
                            1111f111dd44f1fddd4f111fffff44444ff1111111111111114fffd1
                            1111f111ddd44fd11dd4f11111f44dddd4ff11111111111114fff411
                            1111f1111ddddd1111dd4f11111fd111144f4111111111114fff4111
                            11111f111dddd111111dd4f11111f111dd4ff111111111d4fff41111
                            11111f1111d41111111ddd4f11111fddd4fff1111114ffffff411111
                            11111f11114ff1111111ddd4f11114fffffffffffffffffff4111111
                            111111f11df11fff11111dd44f1111fffffffffffffffff4d1111111
                            111111f1df111111fff111dd44ffff4fffffffffffff4d1111111111
                            1111111ff1111111111ffffdd444fff4fffff1111111111111111111
                            1111111f111111111111111fffffffff4fff41111111111111111111
                            111111111111111111111111111111111ff411111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 27:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111efe11111111111111111111111111
                            1111111111e113e1111111111111111111111111
                            1111111111f3effffe1111111111111111111111
                            111111111fff3333eefeefffe111111111111111
                            11111111fe311ee113ef31111e11111111111111
                            111111ffe31e3113ee3313ef1f11111111111111
                            11111f1fe33311e333e33ef31f11111111111111
                            11111ffe13313e331113efe33e111eee11111111
                            11111fe3311e33ff33313ee3f1111e11e1111111
                            1111fe3ee3e33f1ff11133fff11111e33f111111
                            111ef33113313ffff1113eeeef1111e3e1e11111
                            111fe311111113ff3113333eef11111f13f11111
                            111fe33111111111113333333ef1111e33ee1111
                            1113fee33311111113333e331ef11111ee3f1111
                            11111ffeee3333333333eee313ef1111f11ee111
                            1111111ffeeee33333eeefe1331ee111f333f111
                            111111111fffeeeeeeeefe11313ef111fee3fe11
                            11111111efeffeeeffffee311e3eee11f11eee11
                            11111111e33efffffe311e331e33ef1ee331ef11
                            1111111e313eefffe33311333f33efffeeee3f11
                            1111111f333eeffeee3331e3ef333efe111eef11
                            1ffe111feee13fe113e3eeeffefe3efe3331ef11
                            1f11fe1f31e11e11e11efffee3efeefeee3e3e11
                            1f3311fff31e1f1e113f1e1f313ef3f333eefe11
                            11fe311fef3fef3f13ff1e11e313e1ee33eef111
                            11ee31ee33feffff1fffef13f31331eeefefe111
                            111fee313333efeefeff3ee3ee3133eeefef1111
                            111fee33e333eeeeefee111eefe13eeeeffe1111
                            111efee33e3eefeeeef31113efeeeefeefe11111
                            1111fee33efeefeeeff31113efeeeefffe111111
                            1111efee3efeeffefef31113efeeefffe1111111
                            11111feeeefeffffeff33133ffeffefe11111111
                            111111feefffeefffffe333effffffe111111111
                            1111111eff11111111ef33efffffe11111111111
                            1111111111111111111effffff11111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 28:
                return sprites.create(img`
                            1111111111111111111f1111111111111111111111111111
                            111111111111111111ff1111111111111111111111111111
                            11111111111111111e3f1111111111111111111111111111
                            11111111111111111fef1111111113effffee31111111111
                            1111111111111111f3ef1fe111eff3113fe3111111111111
                            11111111111111f1feefe1f1ef113eeefe31111111111111
                            1111111111111f1f3ef13eff33eeeeef3333111111111111
                            111111111111f13fef1eef3eeeeeeefffffffffffe331111
                            11111111111e113ff3eeefeefeeeff31111333fe31111111
                            11111111111f133feeeeefef3ffeeeeeeeeefe3111111111
                            11111efe11f1333f3eeefef13feeeeeeeeff311111111111
                            1111e111ff11333feee3ff133feeeeeeffffffffe3111111
                            1111f1113e13333f3e3ef133efeeeefffffeeeeefffe3111
                            1111f113f113333fe3ef1333feeefffffeeeeeeeeeeffe31
                            111e1113f13333f1fef13333feeffffeeeeefffffff11111
                            111f113fe13333f1f3e3333efff111feefffffeefe111111
                            111f113f33333f13fe33333ef11333fffeeeeeeeeef11111
                            111f111e33333f13ef3333ef11efe3feefffffeeeeef1111
                            111e11333333f133ef3333f11efe31ff111111feeeeee111
                            111311333333f133ef333f11efee31f11331333feeeef111
                            1111f11333333333e333ef11fee31f11ff33ff33ffeeee11
                            11111e13333333ee3333f311ee311f1f13e313e3fffeef11
                            11111e11f333333333333111e311fff113e113f3ffffeef1
                            11111f1efe3333333333311131fffff113f113fefefffef1
                            11111f1f1f133331133333111fffff1113f113fffeeefff1
                            11113f1fff1133113effff31ffffff1113f113ffeeeeffe1
                            111e1f1eff113113ff31f311fffeff1113e113fffeeeef11
                            11e11f31fe11311effefe311ffeeef111e113fffffeeeef1
                            1e11efe13e11111fffff311fffe3ef111f113fffffeeeefe
                            1e1e11f31311111ffe31113ffee33f113f13feeefffeeeff
                            1ff1133e11111111111113ffeee33ef13f13feeeeefeeeef
                            11f13fef311111111113ffffee3333f13f3fee33eeefeeef
                            11e1f111e111111113fffffeee3333f3f13fe3333eefeefe
                            111f1111f1111113fffffeeee33311f3f3fee33333effef1
                            11111111e111133f1feeeee33331111fefee333333effee1
                            111111111f3333f111f333331111111f3eee333333ef3f11
                            1111111111effe11111ef31111111111f3e333333ef31f11
                            111111111111111111113ffe31111133ff333333eefe3e11
                            111111111111111111effe3eeffffffe11ff333eeeefe111
                            11111111111111113e11e333eeeef1111111fff313eef311
                            111111111111113e11133e3eeeefe111111111f1133eee11
                            11111111111113efffffffffffe3111111111fe3333eef11
                            1111111111111111111111111111111111113fff33efff31
                            111111111111111111111111111111111111ef13fff133e1
                            111111111111111111111111111111111111f1113f1113f1
                            111111111111111111111111111111111111e313f1e133f1
                            1111111111111111111111111111111111111e3f111f3f11
                            11111111111111111111111111111111111111f11111f111
                        `, SpriteKind.Creature)
            case 29:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111ff1111ff111111111111111111
                            1111111111111f1f111f1f111111111111111111
                            111111111111f1fffff1bf111111111111111111
                            11111111111f11bbbf11fffff111111111111111
                            1111111111f11bbbf11bbbbbbf11111111111111
                            111111111f1bbbbf11bffffffbf1111111111111
                            11111111fffffff11bf666666ff1111111111111
                            111111ff111111f11fb6b66666f1111111111111
                            11111f1111111111bbbb6b66fff1ffff11111111
                            1111f1111111111111ffffff111f11bf11111111
                            111f111111111111111111111111fbf111111111
                            111f1111111fff11111111111111fbf111111111
                            11f1111111f661f1111111111111bf1111111111
                            11f111111f166111111111661111bffff1111111
                            11f111111fffff1111111666611bbf1bf1111111
                            111f6b611111111ffb11116611bbbfbf11111111
                            111f111111111ff1111111111bbbbff111111111
                            1111f6fffff1111111166111bb66bf1111111111
                            11111fbbbfff11ffb1b66111b666bf1111111111
                            111111611fff11111f11111fbb66bbf111111111
                            11111116fffffffff11111bfbbbbbbf111111111
                            111111fbbbbbfff1111bfbbbfbbbbbf111111111
                            11111fffbbfff1111bbbffffffbffbf111111111
                            1111f1bbff11fffbbbff111111fbbf1111111111
                            1111fffff11f1bbfff11111111fff11111111111
                            11111111111ffff1111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 30:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111611161111111111111111
                            1111111111111111111111111161616161ff111111111111
                            1111111f11111f611111111111f1f1616f11f11111111111
                            11111161f11ff11f1111111116111f11f1111f1111111111
                            111111f1fff111f1111111111611161116b111f111111111
                            1111161111111ff111111111fffff1111fbb111f11111111
                            11111f111111111f111111f1ff111ff116bbb11f11111111
                            111f1f1111111111f1111f1f1111111f11bbbb11f1111111
                            11f1ff111111111116111f1111bbbb11ffbbbbb11f111111
                            11f11f11111111111f11f111bbffffb111ffbbbb1f111111
                            1161b111111111111f11f11bff6f6ffb1111fbbb11f11111
                            111fbb11111111111f1f11bff6f6f6ffb16f1bbb11f11111
                            1116bbb1111b66ffffff11bf6f6f6f6fb1f111bb111f1111
                            1111fbbbbb6f11111bbf1bf6f6f6f6f6f1f11111111f1111
                            11116bbb6f111111bbf11bff66666f6ff1f11111111f1111
                            11111fbf111111111bb11f66666666f6f1f11111111f1111
                            11111ff11111111111111f666666666fb1611111111f1111
                            1111611111b1111111111f666666666f1f111111111f1111
                            1111fb111b111bfff6111f66666666fb1f111116661f1111
                            1116ff11b11bff1111111f6666666fb161111111116f1111
                            16f111111b6f1f1111111bf6666ffb1f11111116611f1111
                            6bbb1111b6ffff1f61111bbfffbbbff11111116666161111
                            fbbbb111b6fffffb11111bbbbbbff1111111116666116111
                            fbbbbb1111111111111111bbbb1111111161111661116111
                            fbbbf611111111111111111111111111116b111111116111
                            fbbbbb1111111fff1111111111111111116b111111111f11
                            1fbbb116ffff11ff11111111ffff11111116b11111111f11
                            11fffffffffff161111111bf1111fb111116bb1661111f11
                            1111ffffffffff1111111bf111111fb11bbb6bb661111f11
                            11111fbbbb1111111111bbf1111111fbbbbff6bb1111bf11
                            111111ffffbbbbbbbbbbbbf111111bfbbbf111fbbbbbbf11
                            1111111111ffffffbbbbbf111111bbfbff11111fbbbbff11
                            1111111111f66666ffffff111111bfff11111111ffffbf11
                            111111111fbbb666f111f111111bbf1111111111fbfb1f11
                            111111111fbbbb6f111f111111bbbf1111111111f1f1f111
                            11111111f6f6bbf111f11111bbbbf111111111111f1f1111
                            11111111f1f1ff11161616bbbbff11111111111111111111
                            11111111ff1f1111b1f1f1ffff1111111111111111111111
                            11111111111111111ffffff1111111111111111111111111
                        `, SpriteKind.Creature)
            case 31:
                return sprites.create(img`
                            11111111111ff111111111111111fff1111111111111111111111111
                            1111111111fbbffff111111111ff11f1111111111111111111111111
                            1111111111fbbbbbbff111116f111f11111111111111111111111111
                            111111111611bbbbbbbf116f111111f1111111111111111111111111
                            111111111f111bb6fbbbf61116ff611f111111111111111111111111
                            111111111f111bf11ffbf11fffffff11f11111111111111111111111
                            111111111f111bf11f1f11fffffffff1bf1111111111111111111111
                            111111111f111f111bf11ffffff666fbbf1111111111111111111111
                            1111111111f6f111bbf11fffff66666fbf1111111111111111111111
                            1111111116611111bf11ffffff66666fbf1111111111111111111111
                            1111111f61111bbb6f1bfffffff6666fbf1111111111111111111111
                            111111f1111bbbbbb6bbfffffff6666b661111111111111111111111
                            11111f1111bbbbbbbbbffffffff666f66f1111111111111111111111
                            16fff1111bbbbbbbbbbffffffff666f6ff1111111111111111111111
                            f111fffbbbbbbbbbbbbbbffffff66f66f6ff11111111111111111111
                            61111bb6bbbbbbbb6bbbbbbfff66f66f666bff111111111111111111
                            1f111bb6bb11bbb666bbbbbbbfff66f6666b11f11111111111111111
                            11f1bbb6bb11b661116bbbbbbbbb66f666bbbbf11111111111111111
                            111fbb6bb11b6ff1111bbbbbbbbbbf6666bbbf111111111111111111
                            11fbf66bb116ffff111bbbbbbbbbbf666bbff1111111111111111111
                            11fb66bbb1b61fff16bbbbbbbbbb6f666bf111111111111111111111
                            161bbbbbbbbfff66bbbb66bbbbb66ff66f1111111111111111111111
                            1f1bb11bbbbbbbbbbbb6116b6b6666f6f11111111111111111111111
                            1f11116fbbbbbbb6fff11116b66666fffffffff11111111111111111
                            161111fbbbb6fffbb111111b6b66666f6666b11f1111111111111111
                            11f11bbb6ffbb111111111b6b6b6666ff6666bbf1111111111111111
                            1116ffff1111111111111bf66b6ffffff66666bf1111111111111111
                            111111f111111111111bff66bff11bbbff6666f11111111111111111
                            1111111fff61111bbfff66fff11111bbb6f666f111ff111111111111
                            11111111fffffffff6666f1161111bbbb6f66f111fbf111111111111
                            1111111fff11bff66666f11f1111bbbb666f6f1ffbbf111111111111
                            111111f6f11166b66666f11f111bbff6666ffff66bf1111111111111
                            11111f666111fbbbbbbf111f11bff66ff66ff66666f1111111111111
                            1111fbb6111bf11111f11111fbfbbbb66f6ffff66f11111111111111
                            1111fbbf111b611111f111111fbbbbb666ff66ff6f11ff1111111111
                            1116ff6111bb61111f1111111fbbff6666ff6666f11fbbf111111111
                            111f1b61bbbb6111fb111111bfffbbbff6f666b6f1fbbbf111111111
                            11611bbfbbbbfb11fbb111bbbf1bbbbbbff6bbbb6f66bbf111111111
                            11f11bbfbbbbfbbbfbbbbbbbf11bbbbbbf66bbbb6f6666f111111111
                            1611bbb6fbbfbbbbbfbbbbff11bbbbbbbbf6bbbbb6f666f111111111
                            1f6bbbb66ffbbbbbbbfbbf111bbbbbbb66fbbbbbb6fff6f11111ff61
                            1f16bbbb6f6fbbbbbbbfff111bbbbb6666fbbbbbb6f6bfffffff11bf
                            1f16bbbffb6fbbbbbbbb6ff1bbbbb66666fbbbbb66ffbbbfbb1111bf
                            1f6bbff1fbb6fbbbbb666f1bbbbb66666f6bbbbb66ff6bbbfbbbbb6f
                            11fff111fbff6f66666666f1bbb66666f666bbb66f6f66bbf6bbb66f
                            111111111f6fffff66666ffff6666fff666666666f6f66666f66666f
                            11111111f111b6fffffff6666fffff1ff666666ff66f66666f6666f1
                            11111111f111b66fff6bbbbbb666f11bbffffff6666f66666f6666f1
                            111111111f1bb6666ff6bbbbb666f1111bbbbb66666f66666f666f11
                            111111111ffbb66ffffffbbb66666f11bbffffff66f666666f66f111
                            1111111ffbbffff666666ff666666fbbffbbbb66fff66666f6ff1111
                            111111f16b6bb6666666666fff6666ff11bbbbb666f66666ff111111
                            11111f111fff11f66666ffff11fffff11ff6bbb6ff6f6fff11111111
                            111111fffff1111fffff1111111111f1f1bf666f1bfff11111111111
                            11111111111ffff1111111111111111f11b6fff11bbf111111111111
                            11111111111111111111111111111111ffff111ffff1111111111111
                        `, SpriteKind.Creature)
            case 32:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111f11111111111111111111111111
                            111111111111f1bfb11111f11ff1111111111111
                            11111111111f11111f1f1f1ffddf111111111111
                            11111111111b11111b1ffb11dddf111111111111
                            1111111111f11111ddf111ddffdf111111111111
                            111111111fb1111dddf11dffbbdf111111111111
                            11111111f11111dddf1dffbbbbdf11ff11111111
                            111111111f111dddf1dffbbbbbff1f1f11111111
                            111111111b11dddf11bfbfbbbbf1f11f11111111
                            1111111fb11dddbf1dfbfbbbbdff11f111111111
                            111111f1111dddf1dbffbfbbbdf11df11ff11111
                            1111111f11dddb11dffbfbbbdf11df1ff1f11111
                            11111111f1dddf1dbfbfbbbdf1fdddf11f111111
                            1111111f11dbff1dfffbfbdf1f1fdddf1f111111
                            11111111bfb11b1bfbbbfdf1f11fddddd1fff111
                            1111111f1111b1dfbbbfdf1f11df11ddd1111f11
                            111111fffbddf1bfbdfdf11dddd11ddddfddf111
                            11111f11dfddf1fbdbdfb1dddd11dffdddff1111
                            111111fbbbddbfddffdfbdddff11dffdddddf111
                            11111b1fffddbffffbdbfddfff11dddddffddf11
                            11111f1fffdbfbddfdddfddfff11dddddffdf1f1
                            11111f1ffdbfb111fdddfdddffb11ddddddbf1f1
                            11111f111dbf111dfdddfddddddffbddddbfff11
                            11111f11ddf1f11fdddfddddddbbbffffff11111
                            11111f11ddf1f1fddbfddddddbbbf11111111111
                            11111b11ddffbbddffddddddbbbf111111111111
                            111111f11dddddbf1fddddbbbff1111111111111
                            111111fbfffff1f1fddddbbff111111111111111
                            11111fbfbbffff11fdddbbf11111111111111111
                            11111fbf11f1111fdddbbf111111111111111111
                            1111fffbff11111fffbbf1111111111111111111
                            111f1ddf111111f11dff11111111111111111111
                            1111fff11111111ffff111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 33:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111111111111111111ff11111111111111111ff11111
                            1111111111111111111fff11f1111111111111fff11f1111
                            11111111111111111ff11111f11111111111ff1111f11111
                            111111111f11111ff111111f1111111111ff11111df11111
                            11111111f1f111f11111111f11111f11ff1111111f111111
                            11111111fdf11f11111111f11111f1ff111dddd11ffff111
                            111111111fdff11111111df1f1f1f1f11ddffffd111f1111
                            111111111fdf11111111df1f1f1f11f1dffbbbbfd1f11111
                            1111111f11f111111ddddff1f1ff111dfbbbbbbfdf111111
                            111111f1f1fdddddddddfff1f1f111dfbbbbbbbbf1111111
                            111111f11fdddddddddbff1df1111dfbbbbbbbbbf1111111
                            1111111f1ddddddddddf1f1df111dfbbfffbbbbf11111111
                            11111111fbddddddddbf1f1fd11dffffbbbffbbf11111111
                            111111111fddddddbbfff1df111dfbbbbbbbbfbf11111111
                            111111111fbdddbbff1111df11dfbbbbbbbbbff11fff1111
                            1111111111fbbbbb111111f111dfbbbbbbbbbbfff1df1111
                            1111111111fbbff1111111f11dfbbbbbbbbbbff11df11111
                            111111111ffffdd1111111111dfbbbbbbbbbf111df111111
                            111111bffffffbdd111111111dfbbbbbbbbf1111df11fff1
                            111111b1111111fd111111f11dfbbbbbbff1111df1ff1df1
                            1111111bfdd111fd111111f111dfbbbffbbf111dff11df11
                            111111111bfdddb11dd11f1b111dfffbbdddf111111df111
                            111111111fdffbd1dd11f111b1111dbddddddb111ddbf111
                            111111111fdddd1ddd1ffb11b1111ddbddddddbddbbf1111
                            111111111fdddd1dd11f1f1f111111ddbdd11ddbbbbf1111
                            11111111fbddddddddffffb1111111ddb111111dfbf11111
                            11111111f1111ddddffffbddd1d111dbd1111111bff11111
                            1111111f11111dd1dfd11ddbfd1d11bd11111111dfdfb111
                            1111111f1111dbd1111ddff11f1d1111111111b11dfddfb1
                            11111111b111bf111ddfffff1fd1d11bf11111111ddbd11b
                            11111111f111111dfffffffffbfd1bb11b111111ddbfdd1f
                            111111111f111dffffffffffbfddb1111f11bb1ddb11bddf
                            1111111111ffffffffffffbbfddb111111b1bbddb111fdf1
                            111111111fbbbffffffbbbffbdbdd11111fdbddb11111f11
                            11111111fdddbbbffbbfffbbdfdddddffffddddb11111f11
                            11111111f11dddbf1fbbffddbfddffbbbdfdddb11111bf11
                            1111111f1111ddf11fdbbbffddfbbdd111bfdb111111bbf1
                            1111111f111ddf111f11dbbbffffd111111fbdbb1111bbf1
                            111111f11dddf111ffb11dbbbbf1f111111bfdbbd1111bf1
                            11111bffbfdf1111f1dbbdbbff111fd1d111fddddd1111f1
                            1111f111f1f1111f1ddddbff111111fbfbdfbfdffffff1f1
                            11111fffff111111ffffff11111111ffdfd1dffdddd11f11
                            1111111111111111111111111111111ffffff11ffffff111
                        `, SpriteKind.Creature)
            case 34:
                return sprites.create(img`
                            111111111111bbb1111111111111111111f111111111111111111111
                            11111111111b111bb11111b1111111111f1fffff1111111111111111
                            111111111111bf111f111b1f111111111f1d111bf111111111111111
                            1111111111111fffd1f11b1f1111111ff111dfff1111111111111111
                            dbf111111111fdddfd1f1f1f111111f11dbffbbf1111111111111111
                            b11f11111111fdddbff1ff1df1111fdddffbbbbbf111111111111111
                            1b11bf111111fddbbbfdf11df111fdddfbbfbbdddf11111111111111
                            11b111bf111fdddbbbfdf1ddf1ffddbffbbbfddddf11111111111111
                            111b111bb11fddbbfffffddfff1dbfffbbbbbfddddf11f1111111111
                            1111f11ddb1fddbbf1fffdd11dbbfffbbbbbbfddddf1fdf111111111
                            11111fddddffddbbf1ddbbfddbbffffbbbbbbbfdddffdbf111111111
                            111111fdddbffdbf1f1dbbbddbffffffbbbbbbfdddfdbf1111111111
                            1111111fddddbff11f1dbbdddffffffffbbbbbfddfddbf1111111111
                            11111111fddddbbff1dddddddddddbffffbbbbfddfdbf11111111111
                            1111111bffdddbbbbdddd1dddddddddbffbbbbfdfdbbf1111111ff11
                            11111bfffffdbbbbbdd11dddddddddddbffbbfffdbbbf11111ffdf11
                            1111ffbffffbbbbbbd111dbffddddddddbfffffdbbbf11111f1dbf11
                            111f11dbffffbbbbd111dbfd1bddddddddbbfddbbbbf111ff1dbf111
                            11f11dddbffdfbbdd1ddffd11bddddddddbbbffbbbbbfff11dbbf111
                            1ffdddddbfb1f1ddd1bbff111bdddddddbbffbbffbffffddddbf1111
                            f11fddddbf1111dbdbbf1f1bbdbbffbdbbbbfbbbffbbbbffdbbf1111
                            f11fdddbff1111ddbbffffbddb1ffbfbbbbbbfffbbbbbbbbfbf11111
                            f11fbbfffb1111dddddbbdddbf11fbbbbbbfffdddbbbbbbbbffffff1
                            f1fbbf11fd1111dddddddbbffff1dfbbbbfffd111dbbbfffbf111dbf
                            1fbbbf1dfdd11bffdddbbffffffdfdbbbbfffd111dbffbbfff1ddbf1
                            1ffbbbfdfdddbfddbbfffffbb1ffdddbbbffd111dbfddddbffdbbf11
                            1f1fbfffffddddbfffffffbbbf1fdddbbfffd11dbf11ddddbffbf111
                            1f1dfff111fffffbf1ffbbbbbbfbddbbbfffd11dff1bbfffbffff111
                            11ff1111111111fdfffbbbbb1fbdddbbffffbddffff111ddf11ff111
                            11111111111111fbfffbb1dffb1ddbffffffbff111111111df11ff11
                            111b11111111111fbf1ff1fbb1dbfffffffbf1111111111ddf111df1
                            11b1f1111111111fb1bffbb1dbffffff1ddf11111111111ddf111df1
                            11b1f11111111111ff1111ddfffffff1dddf111111111ddddf111df1
                            1f11f111111111111fffffffdbfffb1ffff111111ddddddddff1df11
                            1bbbf111111111111f1111dddddf1111fbffffddddddddddbbfddf11
                            1f111b11111111111f11111ddddf1111fbf11dfddddddddbbbfff111
                            fd1fff11111111111f111111dddf1111df111dfbdddddbbbbbbff111
                            fdf111f111111ff111f11111dddb1111dfffffbbbbbbbbbbbffbbf11
                            fbd1111fb111f11f11f1111ddddb111dfffbddbbddbbbbbffffbbf11
                            fbd1111dffff1111fff111dddddbf11fb11ffbbdddddfffbfffbbbf1
                            fbdd1dffbbbb1111ffdf1dddddbbf11bff11dfffffffdddddfbfbbf1
                            bfdddfddbbf1111ddbfffdddbbfffffbbfffffffff11111dddfbfbbf
                            1fbddfdddbf1111ddbbffffffbbbbbbffffffffbf1111111ddfbfbbf
                            11fbfddddbfd11ddddbbff1111dddddbbbbbbff1f111111dddfbffbf
                            11fbfbdddbbbdddddbbbffb1ddfffffbbbbbbfb1f11111dddbfbbfff
                            111ffbbbbbbfddddbbffbbffffbbbbbfffbbbf111f11ddddbbfbbfff
                            1111fbbbbbf1fbbbffbbbbbffb11ddddbbffff111f1dddbbbfbbbfff
                            11111fbbfff11fffbbbbbbbbffbdddddddbbbf111dfdbbbbbfbbbfff
                            111111fffff11ddddbbbbbbbfffbddddddbbbbf1dddffbbbfbbbdff1
                            11111111ffffddddbbbddbbbbffffbdddbbbbbffdddbbfffbbbddbf1
                            1111111111ffddddbbddddbbbffbffffbbbbbbbfdddbbbbbbbbddbbf
                            11111111ff11ffbbbbddddbfffbfbfbffffffffdddbbbbbfffbbbbbf
                            1111111f11111dfbbbbddffffffbfbfbfffffffddbbbfff111ffbbf1
                            111111fd11ddddbffffff1111bbffffffffffffffbff111111ddff11
                            1111111fffffffb1111111111111111111bbfffffffff1111ddff111
                            111111111111111111111111111111111111111111111ffffff11111
                        `, SpriteKind.Creature)
            case 35:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111113fff311111113fffff31111111
                            1111111111113f11111f3113ffddd33333111111
                            111111111113111111111ff111dd3333ff111111
                            111111111131111111111111111d33ffff111111
                            111111fff3d111111111111111d3fffff3111111
                            1111ff33d3111113fdd111111ddffffff1111111
                            111f33311f111111d3dd111113ffffff31111111
                            1113f3d11f111111dfdd111113fffff311111111
                            11113f1113f1111ddfdd1111d3fffff111111111
                            11113ffd1313ddd3fdd11111d3ffff1111111111
                            111113ff31113fffdd1111111d3ff3111ff11111
                            1111113f311111dddd1111111dd33f1ff11f1111
                            11111113111d1111f1d1111111dddff111f11111
                            1111111f11d1f111f1d11113ffdddf1111f11111
                            1111111f11d1f11111111131d1fdddf11f111111
                            1111111f1111111111dd11fd111fddf11f111111
                            11113f3111dd1dfff1111111111fddf111f31111
                            1113111111111133f11111111dd3dddf11df3111
                            111f11111111111ff11111111dd3dddfdddf3111
                            111fd1111111111111111111dd3ddddffffdd311
                            1111fddd11111111111111111ddddddfdddddf11
                            11111ffdd11111111111113ffddddddfdddddd31
                            1111111fd111111111111f1113fddddfd3ddddf1
                            1113ffff1111111111113311d3dfdddfdd3dddf1
                            1131111ffd1111111111f1333dd3dddfddfdddf1
                            1131dd3113f111111111311dddddfdfdddfdddf1
                            111333dddddf1111111f11ddddddfdfdd3dddd31
                            111fdddddddd11dddd1f11dd33dd3ffddfddd311
                            1111fd33dddddddddddf1113333ddfddfddddf11
                            11111f333ddddfdddddd3113333ddfffddddf111
                            111111f33ddd3fff3dddfdd3333dfdddddddf111
                            1111111ffdd3f1111f333fdd33ddfddddddf1111
                            111111111fff111111ff33fddddfdddddf311111
                            11111111111111111111ffd3fffddddff1111111
                            11111111111111111111111fffffff3111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 36:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            ffff11111111111111111111111111111111111111111111
                            ffffff111111111111111111111111111111111111111111
                            ffffffff3111111111111111111111111111111111111111
                            1ffff111ff31111111111111111111111111111111111111
                            1fff111111ff311111111111111111111111111111111111
                            11ff11111111ff31ffff311111111111111113ffffffff11
                            11ff1111111111ff1111ff31111111113fffff111fffffff
                            111ff11111111f11111111ff3113fffff1111111111fffff
                            1111fdd11111f11111111111ffff111111111111111fffff
                            11111fdddf11f111dfff31111111111111111111111ffff1
                            111111fddf11f111f11dfd11111111111111111111fff311
                            11fff11fdf11fd111111fd11111111111d1d1dddddf31111
                            1f11df11ff111fdd111dfd1111111111d1d1ddddff311111
                            1f1dfdf1f11111ffdddfd1111111111d1ffd1dff31111111
                            1f31d1fff1111111fffd1111111111d1f11fff3111111111
                            fdf1111f1111d1f111111f1d1111111dfd11f11111111ff1
                            fdf3111f111131f111111f13111111dfdf11f11111fffddf
                            1fdf11df111131f111111f131111111f1111f11fffddddff
                            11ffdddf11111311111111311111111f1111fffdddd3ff11
                            111ffdf111ddd111111111dddd1111f11111fdddd33f1111
                            1111fdf111ddd111111111dddd1111f1111dfdd33ff11111
                            1fffdff1111111f11111f111111111f111ddf33df1111111
                            fdddfff11111111f3ddf1111111111111ddfdddf11111111
                            1ffdddf1111111111111111111111111dddfdddf11111111
                            111ffdf111111111111111111111111ddddfddd3fffff111
                            11111ff111111111111111111111111ddddffffddddddf11
                            11111ff111111111111111111111111dddddf1dfdddff111
                            111ffdf1111111111111111111111111ddddf11df3f11111
                            11fdddf11111111111111111111111111dddf111df111111
                            111ffff11111111111111111111111111dddf1d11f111111
                            111111f11111111111111111111111111dddf13d1df11111
                            111111f11111111111111111111111111dddf1f311f11111
                            1111111f1111111111111111111111111dddf1df11df1111
                            1111111f111111111111111111111111dddddf1f11df1111
                            1111111f11111111111111111111111dffffff1f11df1111
                            11111111f111111111111111111111df11f11f1f11df1111
                            11111111f111111111111111111111ff11f11ff11d3f1111
                            111111111f1111111111111111111df1fffffff11df11111
                            111111111f1111111111111111111f1dddddddf1d3f11111
                            1111111111f1111dd11111111111df1dd3ffddfddf111111
                            1111111111f1111dddd11111111ddf1d3133fdfd3f111111
                            11111111111f111dddddffffffdddf1df333fdf3f1111111
                            11111111111f111ddddf111111ffff1ddfffddff11111111
                            11111111111ffffdddf111111111fffddddddf1111111111
                            1111111111f1f11fdf11111111111fffddddf11111111111
                            11111111111ffffff111111111111111ffff111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 37:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111114ff4111111111111111111111111111111111111
                            1111111f1111f11111111111111111111111111111111111
                            111111f11111141111111111111111111111111111111111
                            1111114111111ffff4111111111111111111111111111111
                            1111141111f4f41111f11111111111111111111111111111
                            11111f4111f4f11111441111111111111111111111111111
                            11111f44444f1111114f1111111111111111111111111111
                            1114ff4444441111144f1111111111111111111111111111
                            111f14f444f4411f444f1111111111111111111111111111
                            111f44f444f44444fff41111111111111111111111111111
                            111f444f44f4444444f4ff41111111111111111111111111
                            1114444f4444444fff414114111111111111111111111111
                            1111f44ff4444ff44444411f111111111111111111111111
                            1111f444444ff44444444414111111111111111111111111
                            1111444444444444444444f111111114fff4111111111111
                            1111f4144444444444444f1111f41f411111f11111111111
                            1111f4f444444444444441111411f1111114f41111111111
                            111144f4444f144414f41111411441111f41114f41111111
                            11144444444ff44411f11114411f4411f41111111f111111
                            111f4444444ff4111ff1111f4444444f4444441111f11111
                            111f144444441111f4f1111f44f4444f4444444fff411111
                            11141f44444111f4444f111f44f444f44444f444444f1111
                            1111f44441f1f4444444f11f44f444f4444f44444444f111
                            11111f111ff4444444444f14444f44f444f4444444441f11
                            1111114f44444444444444f1f44f44f44f44444444411411
                            1111111f411444444444444fff44f4f4f444444444111141
                            1111111441114444444444444ff4ff44f4444ff4441111f1
                            1111111ff111144444444444444fff4f44ff4444f41111f1
                            1111111f4f111f44444444444444ffff4f44444444f41141
                            111111f44fff14444444444444444ffff44444444411f411
                            111111f444ff444444444444444444ff4444444444111f11
                            111111f4444ff444444f1444444444f44444444444111141
                            1111111f444f444444f111444444444f444444ff444111f1
                            11111111f44f444444f411144444444ffffff4444f4111f1
                            111111111ff4444441ff44114444444ff444444444f41141
                            1111111111f44444f1fff44f4444444ff4444444444f1f11
                            111111111444444411ffffff4444444f1f44444441141411
                            111111111f44444f11fffffff444444f11f444444111f111
                            11111111ff4444f111fffff1ff44444f111f44ff41111411
                            11111111fff44f1114ffff411f44444f1111ff4114111f11
                            111111114ffff1111fffff1111f4444f111114111f111f11
                            1111111114fff1114fffff1111f4444f11111f1111111411
                            1111111111111114fffff11111f4444f111114111111f111
                            111111111111114ffffff11111ff44ff111111f111f41111
                            111111111111114fffff111111ffffff11111114f4111111
                            1111111111111144fff11111114ffff41111111111111111
                            1111111111111111111111111114ff411111111111111111
                        `, SpriteKind.Creature)
            case 38:
                return sprites.create(img`
                            11111111111114ff4111111111111111111111111111111111111111
                            11111111114f41111f11111111111111111111111111111111111111
                            111111111f11111111f4111111111111111111111111111111111111
                            111f1111f11111111111f11111111111111111111111111111111111
                            111ff11411111ddf411ddf1111111111111111111111111111111111
                            111f4f1f111dddf4f11dddf11111111111114f411111111111111111
                            111f4f1f11dddf44f4dddddf11141111111f1114f111111111111111
                            111f44f41dddf4d4fdf4dd44f111411111f111111f11111111111111
                            111fdd411114dddd4dddf4444f1141111f11111111f1111111111111
                            1114d411111111df444d44f444f41111fdddd111111f111111111111
                            11114111111111df44444444f4111ffffddddd11111f111111111111
                            111f11111141111df44ffff41111fdddfddddd111111f11111111111
                            111f11111ff4111d4f111111111fdddfddddddd11114f41111111111
                            111411111ff41111d411111111fddddfddddddd14f4111f411111111
                            11fd111dff411111ddf1111111fdd44fdddddddfdd111111f1111111
                            11f1111dd1111111111f1111fff4444f4dddddfddd1111111f111111
                            114111111111d1111111f11fddf4444f4ddd4fdddd11111111f11111
                            14111111114d111111111ffdddf4444f4444f4ddddd1111111141111
                            1f11111d14dd1111111111fddd4f444f4444f4dddddd1111111f1111
                            1ff114411fd11d111111111fd44f444f444f444dddddd11111114111
                            1fff4df1f4d1114111111111f44f444f444f4444dddddd111111f111
                            11111ddf141111d4111111111f44f444f44f44444dd4ffff411df111
                            1111ddf1f1111114111111111df44f44f4f444444ff4444ddfdd4111
                            111dd1114111111d4111111111d4ff44f4f44444f44444ddddf41111
                            11d4d114111114dd41111111111ddff4f4f4444f44444ddddddf1111
                            1d44d11f11111d4d411111111111d4dff4f444f444444dddddd1f111
                            1d44d11f411111d4411111111111411dfff444f444444ddddd111f11
                            d44d11fdf111114d411d1111111d111dd4ff4f44444444dddd111411
                            dd4d1f1ddf111dd4111dd11111111111dd4ffff4444444dddd111141
                            1dd14111dd4ddddf1111d41111111111ddd4fffffffff44ddd1111f1
                            1dd1f111ddf44ddf1111d4d1d1111111ddd4ff4444444ffffd1111f1
                            1d11f11dddfff44f1111dfdd41111111ddd4fff4444444444f1111f1
                            1111414d4f1114ff1111dfd411111111ddd4ff4f4444444444f11df1
                            111114f41111111f1111df4f1111111dddd4fff4f44444444d4fdd41
                            11111111111111141111dfff1111111ddd4ffff44f444444ddddf411
                            11111111111111114111df4f111111ddd4ff44f444f4444ddddddf11
                            1111111111111111f111df4f1111ddd4f444444f444f44ddddddddf1
                            1111111111111111f111df44fdddd4ff4444444f4444f4dddddd11f1
                            1111111111111111f111df444fdff44f4444444f4444f4ddddd11141
                            1111111111111111f111dffffff444f44444444f44dddfdddd111114
                            1111111111111111f111dff44444ff444444444f4dddd4dddd11111f
                            1111111111111114ffff44444444f4444444444f4dddddfdd111111f
                            111111111114ff41ddddd444444f44ddddd4444fdddddd4dd111111f
                            111111111f41111111dddd4444f4dddddddddd4fddddddd4d111111f
                            1111111f41111111111ddd4ffdddddddddddddd4dddd111f11111114
                            111111f11111111111dddf4dddddddddddddddfdd111111f11111141
                            11111f111111111ddd4f41111111111ddddddf111111111f111111f1
                            1111f1111111ddd4f411111111111111dddf41111111111f11111f11
                            111f111111dd4f411111111111111111df411111111111141111f111
                            111411111df4f1111111111111111111f11111111111114dd11f1111
                            1141114f41f4111111111111111111f411111111111111fdddf11111
                            11f14f111f111111111111111114ffd11111111111111f14f4111111
                            11ff1111f111111111111114ff4ddddd111111111111f11111111111
                            11411114111114ffffffff411114ffff4d1111114ff4111111111111
                            111111114fff4111111111111111111114fffff41111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 39:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111111111111111111ff111111111
                            1111111111ff1111111111111111f11f11111111
                            111111111fddf113ffffffff311f111d31111111
                            111111111fdddf3dddddddddd3f1133df1111111
                            11111111fddffff3111111ddddd13ff3d3111111
                            11111111fdf1f111ddd311111dd3ffffdf111111
                            11111111ff1f1111dddf111111d3ffffdf111111
                            11111111f131111dd333111111113ff3d3111111
                            1111111131f111dd33f13f311111133df1111111
                            1111111f11f11dd33f1f111f11111ddd3f111111
                            111111131ff11dd3f1f13f31f11111dddf111111
                            11111131f11f1dd31313ff13131111ddd3111111
                            111111ff1ff1f1df1f1fffff1f11111ddd311111
                            111111f1ff1f1ff11313fff31311111dd3ff3111
                            11111331ffff1f1111f13f31f111113f3111f111
                            13ff3fdf1ff1f111111f111f1111131111df1111
                            3111dfd1ffff111111113f31111111111df11111
                            3f33dfd111111111111111ddd1111111dff11111
                            113f3fd1dd1113ffff111111111111d3f3f11111
                            11113fdd11111d333f1111111111133f33f11111
                            11111fdd111111d3fd11111111111dd333f11111
                            1111133d1111111f311111111111ddd33f311111
                            111111fdd1111111111111111111dd333f111111
                            11111133dd11111111111111111ddd33f3111111
                            1111111fdddd1111111111111dddd333f1111111
                            11111111f3dddd11111111dddddd333f11111111
                            111111111f3ddddddddddddddd333ff111111111
                            1111111111f333ddddddd333333ff11111111111
                            11111111111133fff333fffffff1111111111111
                            111111111111ff333ffff33333f3111111111111
                            11111111111311d33f111f3ddd11311111111111
                            11111111111fdddf3111113fddddf11111111111
                            111111111113ff31111111113ff3111111111111
                        `, SpriteKind.Creature)
            case 40:
                return sprites.create(img`
                            1111111111111111111ffff111111111111111111111ffff
                            13ff3111111111111ff1111ff1111111111111111fffdddf
                            1f111ff111111111fd111111df1111111111111ffdddd3df
                            11fd111ff1111111f11111f111f1111111111ffddd33fddf
                            11fdddd11ff1111fd1111fd111f11111111ffddd3fff3df1
                            111fd3fddddff11fd1111fd113f1111111fddd3ffff3ddf1
                            1113dd3ffddddfffd11111f33fdffff11fdddfffff3ddf11
                            11113ddd3ffdff3fd111111ffdd3f33ff3d3ffff33ddf111
                            111113fdd3ff333fdd1111ddddd3fdd33dfffff3ddff1111
                            1111111ffdddddd3fddddddddd333ddd3d3ff3ddff111111
                            111111111fddddddf3dddddd333f3dddddd33df3d1111111
                            11111111fddddddddff333333ff3dddddddddf3d11111111
                            11111111fddddddddd3ffffff33ddddddd3ff3d111111111
                            11111113ddd3fff3dddd33333dddddddddddd3fd11111111
                            1111111fddf11111fdddddddd33ffffddddddd3311111111
                            1111113dd31d3f3d13ddddddfd11111f3ddddd3f11111111
                            111111fddf1ff3131fdddddfd133ff3113dddd3fd1111111
                            11ff13fd313ff311313ddd3d13fff3131fddddd331111111
                            13ddffddf1ffff33f1fdddf13ffff31131fdddd3f113ff11
                            1fdd3fddf1fffffff1fdddf13fffff33f1fdddd3fdfdddf1
                            1fdd3fdd313fffff313dddf13ffffffff1fdddd3dfddddf1
                            13dd3fdddf1fffff1fddddfd3fffffff31fddd3dddddd3f1
                            13ddfdddd31d3f3d13dddd3d13fffff31fdddddddddddf11
                            11fdfdddddf31111fdddddd3d133ff3113dddddddddd3f11
                            11fdfdddddd3fff3dddddddd33d1111f3dddddddddddf111
                            11fd3dddddddddddfddddddfdd3ffffdddddddddddd3f111
                            113ddddddddddddd3ffffff311dddddddddddddddddf1111
                            111fddddddddddd11f33333d11111ddddddddddddd3f1111
                            111fddddddddd1111dffffd11111111ddddddddddd3f1111
                            111fdddddddd11111111111111111111ddddddddddfd1111
                            1113fdddddd1111111111111111111111dddddddddfd1111
                            111dfdddddd1111111111111111111111dddddddd3fd1111
                            1111fddddd111111111111111111111111ddddddd3fd1111
                            1111fddddd111111111111111111111111ddddddd3fd1111
                            1111fdddd11111111111111111111111111ddddd33f11111
                            11113fddd11111111111111111111111111ddddd33f11111
                            11111fddd11111111111111111111111111dddd33f311111
                            11111f3dd11111111111111111111111111dddd33fd11111
                            111113fdd11111111111111111111111111ddd33f3111111
                            111111f3dd111111111111111111111111ddd333f1111111
                            1111113f3dd11111111111111111111111dd333f31111111
                            11111113ff3d111111111111111111111dd33fffdd111111
                            111111ff33ffdd111111111111111111dd33f333ffd11111
                            1111ff3333333fdd11111111111111dd33ff3333333ffd11
                            11ff3333333333fffdd111111111dd3fff33333333333ff1
                            1f3333333333333f33fffffffffffff33f3333333333333f
                            1f33333333fffff11111111111111111113fff333333333f
                            11ffffffff11111111111111111111111111111ffffffff1
                        `, SpriteKind.Creature)
            case 41:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111116611111111111
                            11111111ff1111111111111ff161166111111111
                            1111111ffbff111111111ffbf1f1611f11111111
                            111111f1f6bbfff1111ffbb6f1616661f1111111
                            11111f16f66bbb6fff66bb66ff1166661f111111
                            1111f166f6f6bbbbbbbbb6f6ff16166661f11111
                            1111f1666f6bbbbbbbbbb6ff11b6616666161111
                            111f16666fbbbbbbbbbbbb6f1b666166661f1111
                            111f16666fbbb61ff16bbb6fbb66661666616111
                            11f161666fbb6f1ff1f6bbbfb66666166661f111
                            11f16166b6fbffffffff6b6f666bbb616b661611
                            11f1616bb6fbfffffffffbf1f6bbbb616b666f11
                            1616b16bbb6bf1ffff1f6b616f6bbb616bb66f11
                            1f16b16bbbb6bb6ff6bbb6111f6bbbb616b66661
                            1f16bb16bbbb6bbbbbbb6111b6fbbbb616b666f1
                            1f16bb16bbbbbfffff611111b6fbbbb616bb66f1
                            f16bbb16bbbbbb611111111bb6fbbbb616bbb6f1
                            f16bbb16bbbbbbbf11111bbbb6fbbbb616bbb661
                            f16bbbb16bbbbbbbf6bbbbbb6f6bbbb616bbb661
                            f16bbbb16bbbbbbbbff666666f11bbbb16bbb661
                            1f16bbb16bbbbbbb11bffff66f111bbb16bbbb61
                            1f16bbbb16bbbb111fbbf11fbf111bbb16bbbb61
                            1f16bbbb16bbb1111bbf111fbf1111b16bbbbb61
                            11f16bbbb16b1111fb16111fbf1111b16bbbb661
                            11f16bbbb16b1116b1f1111f1f1111111bbbb661
                            111f16bbb116111f1f1111161611111111bbb6b1
                            1111f16b11111161f111111616111111111bb611
                            11111f1611111611f111116bf1111111111b6611
                            11111f1611111f1f1111116bf1111111111b6111
                            111111f1b111f1f1111111f1f111111111166111
                            1111111fb11f1f11111111f16111111111161111
                            111111111b61f111111111f16111111111161111
                            11111111116f1111111111ff1111111111611111
                            1111111116f11111111111f61111111111611111
                            111111116f111111111111f61111111111111111
                            1111111611111111111111f11111111111111111
                            1111111111111111111111611111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 42:
                return sprites.create(img`
                            11111111111111111111111111111111111111111b6fffffffffffff
                            ffff611111111111111111111111111111111b6fff11111111111f61
                            bb11fff6111111111111111111111111111bff11111666666661f111
                            1661111ff611111111111111111111111b6f111666666bbbbbbf1111
                            116666111ff111111111111111111111bf1116666bbbbbbbbbf11111
                            11fbbb66111f1111111111111111111bf11666bbbbbbb11111611111
                            11fbbbbb661161111111111f111111bf1166bbbb111111111f111111
                            11fbbbbbbb611ff1111111fbf111116116bbb1111111111116111111
                            116f11bbbbb6bfbf11111fbb61111bf16bb1111111111111f1111111
                            11bf1111bbbbbf6bf111f66bb61116116b11111111111111f1111111
                            111f11111bbbff66bfff6666bf11bf16bb1111111111111611111111
                            1116f11111bbff666b66ffffff61f116b11111111111111f11111111
                            111bf1111116ffffff6f11ff11f16116b11111111111111f11111111
                            1111f111116f11ff11fbfffffff16166b11111111111111f11111111
                            1111f1111116ffffffbbbb6666f6f166ffff6b111111111f11111111
                            1111f11111111f666bbbb6ffb66f1fff6666ffff6b11111f11111111
                            111bf11111111f6ff66666fff66f1116f1ff6666ff6b111611111111
                            1116f11111111f6ffff66ffb6fb6f1111f11ff6666ff6111f1111111
                            111f111111111f6ff6bfffbbbf6bf1111f16f66fbb66ff61f1111111
                            111f11111111bf66f611ff11bff66f111f1f6bb6f1bb66f61f111111
                            11bf111111b6bf66ff16ff61fff66f116f1fb1bb6f11bb6f6f111111
                            116f1111b6f6bbf6ff1ffff1ffff66f1f11fb11b66611bb6f1f11111
                            11f1116ff66b11f6ffbffffbffff66ff11f6b11bb6f111bb6f1f1111
                            11f1bff66b1111f6ff6ffff6fffff66f11f6b111b666111bb6f16111
                            1bf6f66b111116f6fffffffffffff6bf1f6b1111bb6f1111bb61f111
                            1b6f6bbb111116f66fffffffffffffb6f66b1111bb6f11ffffbf1f11
                            f6b6bbb1111116bf6fffffffffffff6bf66b11111b66ff1111fbff11
                            1ffbbb11111166bf6ffffffffffffffb6f6b11111bff61bbbbbf1111
                            111ffb111111f6bfb6fffffffffffff6bfb11111ff1bbbbbbbb6f111
                            11111f111111f6bfb6fffffffffffff6b6f11fff6bbbbbbb6bb6f111
                            111111611111f6bbf6ffffffffffffff6bfff611bbbbbbb6bbb6f111
                            111111f111166bbbfb6fffffffffffffff6bbb11bbbbb66bbbb6f111
                            11111116111f6bbbbf6fffffffffffff6bbbbbbbbbb66bbbbb6f1111
                            1111111f111f6b1bbf6ffffffffffff6bbbbbbbb66bbbbbbbb11b111
                            1111111f111f6b1bbf66ffffffffff6bbbbbbf6bbbbbbbbbb6f11611
                            111111116166b111bbf6fffffffff6bbbbbf6bbbbbbbbbbbff1f1611
                            11111111f1f6b111bbf66ffffffff6bbbb6bbbbbbbbbbb6f1111fb11
                            11111111f1f6b1111bbf6ffffbff6bbbf6bbbbbbbbbbbbf111111111
                            11111111f1f6b1111bbf66fff1ff6bbf6bbbbbbbbb6f611111116611
                            1111111116ffff1111bbf66ff16f6bf6bbbbbbbb6ffb161b11161bf1
                            111111111111116f11bbf66ff1bfff66bbbbb6ffb1111161b116bbf1
                            11111111111111116f1bbf66fb1ff66bbbb6ffb1111111fb11116f11
                            111111111111111111fbbf66f61ff66bb6ff6f111111111f1b111111
                            1111111111111111111fbbf66fb6ff6bbf6b6fff6111111fb6111111
                            1111111111111111116ffbf666f6ff6bb6fb6f111f61111bfb111111
                            11111111111111116f111fbf66ffff66bbfb6fb1111f111111111111
                            111111111111111f111bbbfbf66ffff6b6fb6ffbbb11f11111111111
                            1111111111111116b1b6ff1ff666ffff6f6b6f16fbb11f1111111111
                            1111111111111111f1bf11111f6b6bfff61166111fb1f61111111111
                            111111111111111fb1bf111111f66b666b116b111f11611111111111
                            11111111111116fb11b61111111f6b6b6b66f116fb1fbff611111111
                            111111111116fbb11bbbf6111111f66b6b6661fbbbbbbbbbf1111111
                            1111111111fbbbbfff6bbf1111111ff6666f11fbbfff6bbbbf111111
                            111111111fbbff611b6ff1111111116fff611116f61116ff61111111
                            1111111111ff61111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 43:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111111f111111111111111111111
                            11111111111111111f1f11111111111111111111
                            1111111111111111f111f1111111111111111111
                            11111111ffff111f11177f111ffff11111111111
                            1111111f1117ff1f11777f1ff1777f1111111111
                            111111fff17777f1777777f11777fff111111111
                            111111f11f7777f1777777f1777f11f111111111
                            1111111111f77f17777777f777f1111111111111
                            1111111ffff77f7777777f7777ffff1111111111
                            111111f1177f7f7777777f777f1777f111111111
                            11111f111777ff7777777f77f177777f11111111
                            1111f1ff77777f7777777f7f17777ff1f1111111
                            11111111f7777f7777777f7f1777f11111111111
                            111111111f7777f777777ff1777f111111111111
                            1111111111ff77f777777ff77ff1111111111111
                            111111111111f7ff7777fff7f111111111111111
                            1111111111111fffffffffff7111111111111111
                            111111111111171fffff1ffff711111111111111
                            1111111111117fffffffffffff71111111111111
                            111111111111ffff7777fffffff1111111111111
                            111111111111ffff777ffffffff1111111111111
                            1111111111117ffff7fffffffff1111111111111
                            11111111111117ffffffffffff71111111111111
                            111111111111117ffffffffff711111111111111
                            1111111111111117ffffffff7111111111111111
                            111111111111111117ff77ffff71111111111111
                            111111111111111111ff117ffff7111111111111
                            111111111111111117ff711fffff111111111111
                            11111111111111117ffff117ffff111111111111
                            1111111111111117fffff111ffff111111111111
                            111111111111111fffff71117ff7111111111111
                            1111111111111117fff711111771111111111111
                            11111111111111117f7111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 44:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111141111111111111111f1111111111111111111111
                            111111111111111141111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111114111111411111111111111111111111111111111
                            1111114111141111111fffff111111114fffff4111111111
                            11111111111111111ff44444ff1111f41111111f11111111
                            14111f11111111fff444444444ff1f4441114ff411111111
                            1111f1111411ffff44414444444fff44444f111141111111
                            1111f111111f444ff4ffffff44f444f44f11411141111111
                            1111ff11411f4444ff4444ffff44444f1111111111111111
                            1111f4f111f44444ffffffffff144444f111411111111111
                            1111f4f111f44444f444444f4f444444f141114111111111
                            1141f44f11f4444f4414441444f44444f111111111111111
                            11111f44fff444f444444444444f4444ffff111111111111
                            11111f4444ff4f44444444444444f44f1111ff1114111111
                            111411f14444ff44444444444444fff4111114f111111111
                            111111f114444f44444444444444ff444111144f11111111
                            1111111f411444f444444444444ff44444111444f1111111
                            11411111f441444ff4444444fff444444ff4444441111111
                            111111111ff44444ffffffffffff44ff1111f44444111111
                            1111411f411ffffff4ffff4ffffff411141111f44f111111
                            1111114ff41114fff1ffff1fffffff111111111f4f111111
                            111111ffff111fff1ffffff1fff1ff4114ff4111ff111111
                            1141114fff414f11ffffffff111fffffffffff11f4111111
                            11111114fffffffffffffffffffffffffffff41f41111111
                            111111114ffffffff411114fffffffffffff41f411111111
                            111111111114ffff1f444441fffff4fff441111111111111
                            111111114111fff4ff4444441fffff441114111114111111
                            111114111141fff1fff444444fffffff1111114111111111
                            1111111114114fff41111114fffffff41414111111111111
                            1111111111111fffffff1f1ffffffff11111111111111111
                            11111111411114ffffffff1fffffff411411141111111111
                            111111111111114fffffff1ffffff4111111111114111111
                            1111111111111114fffffffffff411111111111111111111
                            111111111111111114fffffff4ff11111111111111111111
                            1111111111111111111ff41114fff4111111111111111111
                            11111111111111111114ff41114fff411111111111111111
                            11111111111111111111fff11114ffff4111111111111111
                            11111111111111111111ffff1111fffff411111111111111
                            11111111111111111111ffff41114fffff11111111111111
                            11111111111111111114fffff11114ffff11111111111111
                            1111111111111111111fffff4111114ff411111111111111
                            11111111111111111114ff41111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 45:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111144fffff4411111111111111111111111
                            1111111111111111111111fff441444ff41111111111111111111111
                            11111111111ffffff1111f44444444414ff111111111111111111111
                            1111111ffff444444ff1f44444444444444f11111111111111111111
                            11111ff444444444444f4444444444444414f1111111111111111111
                            1111f444444444444444ff44444444444444fff11111111111111111
                            111f44414444444444444f44444444444444fff44111111111111111
                            11fff4444444444444444ff444444444444ffffffff1111111111111
                            11ffff444444444444444fff4444444444fff444444ff11111111111
                            11ffffff444444444444ffffff4444444f44444444444f1111111111
                            111ffffffff44444444fffffffffff44f4444444444444f111111111
                            1111ff44444fff444fff4444444444ff444444444444414f11111111
                            1111f444444444ffff444ffffffff44f4444444444444444f1111111
                            1114f44444444444ff444ffffffff444f444444444444444f1111111
                            111f4444444444444ff444111111444ff444444444444444f4111111
                            114f4444444444444fff4411111144fff444444444444444ff111111
                            11ff44414444444444ffffffffffffffff44444444444444ff111111
                            11fff444444444444f44444444444444ff4444444144414ff4111111
                            114ffff414444444f4444444444444444ff444441444ffff41111111
                            114ffffff414444f444444444444444444fffffffffffff441111111
                            11144ffff4444fff4414444444444444444fffffffffff4411111111
                            1111144fffffffff44444444444444444444ffffffff441111111111
                            11111114ffffffff44444444444444444444ffffff44111111111111
                            1111111111fff4fff444444444444444444fff111111111111111111
                            11111111114f44ffff4444444414444444fff4111111111111111111
                            1111111111fff14ffffffff44444444ffff441111111111111111111
                            1111111111fff1114fffffffffffffffff4411111111111111111111
                            1111111111fff41114ffffffffffffff441111111111111111111111
                            11111111114fff11111ff14fffffffff111111111111111111111111
                            11111111111fff41114ff44fffff14ff411111111111111111111111
                            111111111114fff411ffffffffff44fff41111111111111111111111
                            1111111111114fff44ffffffffffffffff4111111111111111111111
                            111111111111114fffffff4fff4fffffffff11111111111111111111
                            11111111111111111ffffff414fffffff44ff1111111111111111111
                            11111111111111111ffffffffffffffff114ff111111111111111111
                            11111111111111111ffffffffffffffff114ff111111111111111111
                            111111111111111111fffffffffffffffffff4111111111111111111
                            1111111111111111114fffffffffffffffff41111111111111111111
                            111111111111111111114ffffffffff4111111111111111111111111
                            111111111111111111111fff114fff11111111111111111111111111
                            111111111111111111114ff111114f41111111111111111111111111
                            1111111111111111114fff4111111ff1111111111111111111111111
                            11111111111111114ffff411111114f4111111111111111111111111
                            1111111111111114ffff4111111111fff41111111111111111111111
                            111111111111114ffff411111111114ffff411111111111111111111
                            1111111111111114ff41111111111114fffff1111111111111111111
                            111111111111111111111111111111114fff41111111111111111111
                            1111111111111111111111111111111114f411111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 46:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111ff1111111fff111111111111111
                            111111111111f11f111fff144f11114fff411111
                            11111111111f11f4f1fff11f44f14f44411f1111
                            11111111111f4ff4fffff4ff44f1f1144114f111
                            11111111111f444f41444f444f11f1144444f411
                            111111111111f4f1141444fff4f14f4411444f11
                            11111ffff1111f1111444444444f14f411444f11
                            1111f1114ff1f14fff44444fffffffff44444f11
                            111f1111444f4f11114ff4f4444ffffff4444f11
                            111f1114444ff1111444ff444444ffff1f444411
                            11f1114444fff4144444f44444444f4f11fff111
                            11f444444f4fff4444fff41144444f4f11111111
                            11f44444ff44ffffffff411144444f44f1111111
                            111f444f11f4ffffffff411144444f44f1111111
                            11f4f4f1111ff111ffff411444444fff11111111
                            11f14f11111111ffffff44444444fffff1111111
                            111f4f111111ff44fffff444444fff44f1111111
                            111f4f11111f114f11ff4ff44ff4f4444f111111
                            1111f111111f14f11ff1444fff44ff144f111111
                            1111f11111f14f111f1444ffff44ff144f111111
                            1111111111f44f11f44fff111f4f11f44f111111
                            1111111111f4f11ffff11111f44f11f44f111111
                            1111111111f4f1111ff11111fff111f441111111
                            11111111111f111111ff1111ff1111f4f1111111
                            11111111111f1111111f111ff11111ff11111111
                            111111111111111111111111111111f111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 47:
                return sprites.create(img`
                            11111111111111111111111fffffffff111111111111111111111111
                            111111111111111111111fffff444444ff1111111111111111111111
                            1111111111111111111ffff44444444444ff11111111111111111111
                            111111111111111111fff444444444444444f1111111111111111111
                            11111111111111111ff444444444444111144f111111111111111111
                            1111111111111111ff44444444444411111144f11111111111111111
                            111111111111111ff444444444444411111114441111111111111111
                            11111111111111ff4f44444444444411111114444111111111111111
                            1111111111111ff4f444444444444411111114444411111111111111
                            111111111111ff4f44444444444444411111444444f1111111111111
                            11111111111ff4f4f44444444444411111444444444f111111111111
                            1111111111f44f4f44f4444444441114444444444f44f11111111111
                            11111111ff4444f44f444444444444444444444444f44f1111111111
                            111111ff44444f44f4f4444f44444444444444f44f4f444f11111111
                            1111ff444444444f4f44f44f4444444444f4f44f44f44444ff111111
                            111ff44444444444444f44f44444444444f4f444f444444444ff1111
                            11f444444444444444f444f44444444444f44f44444444444444f111
                            1f444444444444444444444444444444444f4f444444444444444f11
                            ff444444444444444444444444444444444f444444444444444444f1
                            f44444444444444444444444444444444444444444444444444444f1
                            f444ffff44444444444444444444444444444444444444444444444f
                            f44f4444f4444444444444444444444444444444444444444444444f
                            f4f444444f444444444444444444444444444444444444444444444f
                            f4f444444f444444444444444444444444444444444444444444444f
                            f4f4444414f44444444444444444444444444444444444444444444f
                            1f44444114f44444444444444444444444444444444444444444444f
                            1f44444114f44444444444444444444444444444444444444144444f
                            1f44444444f1114444444444444444ff4444444444444444144444f1
                            1f44444444f44411114444444444ff44ff44444444444411444444f1
                            1f4444114f44444444111111444f44444f4444444444111444444f11
                            1f4444114f4444444444444444f444444ff44444411114444444f111
                            1f4444114ffff444444444444f44441144f111111114444444ff1111
                            1f4444114fff1fff44444444f444411114f11144444444444ff11111
                            1f444411f4ff1111fffffffff444411114f114444444444ff1111111
                            1f444114ffff4114f11111ff4444411114f1444444444fff11111111
                            1f44411ffffff44ff41114ff4444411114f444444fffff1111111111
                            1f44411f11ffffffff444fff4444441144fffffffffffff111111111
                            1f44411f1111ff44444444f44444444444fffffffff4444ff1111111
                            1f44414f11111fffff4444f44444444444ff4444ffff44444f111111
                            1f44414f11111111111fff44444411144f4444444f11fff4ffff1111
                            11f441f11111111111111f44444411144f444ffff4f1111f4444f111
                            11f444f11111111111111f4444441114f1ff1111ffff11114444f111
                            11f444f11111111111111f4444441144f1111111f444f111f444f111
                            111444f1111111111111f4444441144f11111111f444f1111f44f111
                            111f44f1111111111111f444441144f11111111f4444f1111f44f111
                            111f44f1111111111111444444144f111111111f4444f1111f44f111
                            111144f111111111111f44444144f11111111114444f11111f44f111
                            1111f4f11111111111f44444144f1111111111f444f11111f44f1111
                            11111ff1111111111f4444444ff1111111111f444f111111f44f1111
                            11111f4111111111f444444ff11111111111f444f1111111f44f1111
                            111111f41111111f44444ff111111111111f444f11111111f44f1111
                            1111111f11111f4444fff111111f41111ff444f11111111144f11111
                            111111111114444fff1111111111ff4444444f111111111f44f11111
                            111111111f4ffff111111111111111ffffff41111111111f44f11111
                            1111111111111111111111111111111111111111111ff4444f111111
                            111111111111111111111111111111111111111111111ffff1111111
                        `, SpriteKind.Creature)
            case 48:
                return sprites.create(img`
                            11111111bff11111111111111111111111111111
                            1111111f1dbff111111111111111111111111111
                            111111f1111dbf111fb111111111111111111111
                            111111b1dbfbdbf1b1111bfd111111ffb1111111
                            1111111ff111fdf1f111bf1111ffffbd1f111111
                            1111111b11111fb1fb1bf111ffbd111111f11111
                            11111111f1111fbfffbffbffdbfffffbd1b11111
                            11111111bffffffbfffffff1bfb11111ff111111
                            11b111111dbffffbffffff1ffffbd11111111111
                            111bb11dbfffffff1ffff1ffffffffbd11111111
                            1111bfffffdd1dffdfffdffd1ddfffffb1111111
                            11111bfffd111fdffdfdffd11f1dfffffb111111
                            111111bfd1f1f1fdfbfbfd11f1fdbfffbffb1111
                            11111dff1f1f1fdbfffff11f1fdfbfffbbffb111
                            11111bfdf1f1fdfbfffffdf1fdfdfbfffbdbffb1
                            11111ffddfdfdfbfffffffdfdfdfbbffffd11111
                            1111bffdfdfbfbfffffffffdfdfbfbffffb11111
                            1111ffffdfbfbffd11ddbfffdfbfbffffff11111
                            1111fffffbbbffd111dddbfffbbbfffffffd1111
                            111bfffffffffdbbbbbbbdbffffffffffffb1111
                            11bffff11dbffd1dfff11dbfffffffffffff1111
                            bdbfff1fbddbffd1fff1dbffffffffffffffd111
                            111dfff111ddfffd1f1dbffffffffffffffff1b1
                            1111bfffb11bfffffffffbbfffffffffffbffb11
                            1111dfb111bffffffffbd1dbffffffffffdd1111
                            1111ffffffffffffffbd11ddbffffffffb111111
                            1111ff11fbffffffff11fdddbffffffffd111111
                            1111f1ddbbffffffff1f1bfdbfffffffb1111111
                            1111f1dddbbffffffff1bfdbffffffffd1111111
                            1111fddddbbfffffffffffffffffffffd1111111
                            11111fbbbbbfffffffffffffffffffffb1111111
                            111111fbbbbbfffffffffffffffffbbffd111111
                            1111111fbbbbffffffffffffffffbd1bfb111111
                            11111111fbbbffffffffffffffffb111db111111
                            111111111fff111bfffffffbffbb11111d111111
                            1111111111111111dbfffbbbbbff111111111111
                            111111111111111111f1ddbbbbbf111111111111
                            1111111111111111111f1ddbbfbf111111111111
                            11111111111111111111f1fbbff1111111111111
                            111111111111111111111ffff111111111111111
                        `, SpriteKind.Creature)
            case 49:
                return sprites.create(img`
                            111111111111111111111111fff1111111111111111bffffb1111111
                            11111111111111111111111fbbbf11111111111bfff11ddddfb11111
                            1111111111111111111111fbbbbbf11111111bf1111ddd11dddf1111
                            111111111111111111111ffbbbbbf111111bf1ddddddd1111dddb111
                            11111111111111111111ffbbbbbbf1111bf11dddddddddddddddf111
                            1111111111111111111f1fbbbbbbf111f1dddddddddd11111dddf111
                            1111111111111111111f1fbbbbbbf11fddddddddddd11111ddddf111
                            111111111111111111ffdfbbbbbbf1f1ddddddddddddddddddddf111
                            11111111111111111ff1bfbbbbbbff1ddddddddd1111111ddddbf111
                            11111111111111111ff1fbbbbbbbf1ddddddddd11111111ddddbb111
                            1111111111111111fbfdfbbbbbbf1dddddddddd1111111ddddbf1111
                            1111111111111111ff1dfbbbbbf1ddddddddddddddddddddddbb1111
                            111111111111111fbf1dfbbbbbffddddddddd11111111dddddf11111
                            111111111111111fbfdbfbbbbf1fdddddddd111111111ddddbb11111
                            1111111111ff11fbbfdfbbbbf1fddddddddd11111111dddddf111111
                            1111111111f1f1fbb1dfbbbf1dfdddddddddddddddddddddbb111111
                            11111111111f1ffbf1bfbbf1dfddddddddd11111111ddddbf1111111
                            111111111111b1fbfdbfff1bfddddddd1111111111ddddbf11111111
                            111111111111fd1fddff1dbfddddddd11111111111ddddbb11111111
                            1111111111111bdfdbf1dbfddddddd11111111111ddddbf111111111
                            1111111111111fbddfddbfdddddddd1111ddddddddddbbf111111111
                            111111111fff1fbdbbbfffdddddddddddddd1111dddbbbf111111111
                            11111111f111fbbbbbfbdbfdddddd11111111111ddbbbbb111111111
                            1111111fdb1fbbbbbfdd11bfdddd11111111111ddbbbbf1111111111
                            1111111fbffbbbbbfbdb11dbfddd11111111111dbbbbbf1111111111
                            1111111fddfbbbbbfdbfffbdfdd111111111111bbbbbbb1111111111
                            1111111ffffbbbbbfddbfbddfbb11111bbbbbbbbbbbbf11111111111
                            11111111ffbfbfbbfbddbddbfbbbbbbbbb11111bbbbbb11111111111
                            1111ff111ffbfbfbbffbddbffbb111111111111bbbbf111111111111
                            111f11ff1fffbffbf11fffffbbbddd11111dddbbbbbf111111111111
                            1111ffddf1ffffffff111fffdfbbbbddddddbbbbbbbb111111111111
                            111111ffdffffffffffff1dffdfbbbbbbbbbbbbbbbf1111111111111
                            11111111ffffbdddbfbbbffdfdffbbbbfffffffbbf11111111111111
                            1111ffffffbfd11ddffffffffbffffffdddddbbff111111111111111
                            111f111dddffd11ddfd111ddffdfbbbd1111ddbbbf11111111111111
                            1111ffffffbfdddddbffffffdfdfbbd11111ddddbbf1111111111111
                            1111111111ffbdddbbbbbfddfbbfbd111111ddddbbbf111111111111
                            11111111111ffbbbbbbffddffbfbbddddddddddddbbf111111111111
                            1111111111fffbbbbbf11ffbbbfbddd11111dddddbbbf11111111111
                            1111111fffdbbfbbbbfffbbbbffdddd11111dddddbbbf11111111111
                            111111f111ffffbbbbbbbbbbbffdddd11111ddddddbbf11111111111
                            1111111fff1111fbbbbbbbbbffffdddd11ddddddddbbf11111111111
                            111111111111111fbbbbbbffff1fddddddddddddddbf111111111111
                            111111111111111ffffffffff111fdddd11111ddddbf111111111111
                            11111111111111fbbfffbbbff1111fdddd1111ddddbf111111111111
                            1111111111111fdbbddddbbbf11111fdddd111dddbbf111111111111
                            111111111111fdbbdddddbbdbf11111fdddddddbbbf1111111111111
                            111111111111f1bb11111bbddf111111ffbbbbbbbbdff11111111111
                            111111111111f1b111111b1ddf11111111ffffffff1ddff111111111
                            111111111111fdbddd11bb11f11111111111111111f11ddff1111111
                            1111111111111fbdddddbdd1f111111111111111111f111ddf111111
                            1111111111111fbbdddbbddf11111111111111111111f111ddf11111
                            11111111111111fbddbbddf1111111111111111111111f111ddf1111
                            111111111111111ffbbdff111111111111111111111111f111df1111
                            11111111111111111fff111111111111111111111111111ffff11111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 50:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111efffe111111111111111111111
                            111111111111fe31113ef1111111111111111111
                            11111111111f31111133ef111111111111111111
                            1111111111f3311113333ef11111111111111111
                            1111111111e33311333333ee1111111111111111
                            111111111f31f33331f333ef1111111111111111
                            111111111f31f33331f3333ee111111111111111
                            111111111f3ff3333ff3333ef111111111111111
                            111111111e3fe3333fe3333ef111111111111111
                            11111111f33333333333333eee11111111111111
                            11111111f333fffff333333eef11111111111111
                            11111111f33f13eeef33333eef11113111111111
                            11111111f33feeeeef3333eeef11131111131111
                            11111111f333fffff33333eeef11111131111111
                            11111111f333333333333eeeeff11e1311111111
                            11133111fe3e33333333eeeeefef131131111111
                            11111111fee3e3e3e3eeeeeeef1fe1ff1ee11111
                            11133111feee3e3eeeeeeeeeeffefefef1fffe11
                            11111f1ffeeeeeeeeeeeeeefefeee1e1ff3f31f1
                            1111efefefffeeefeeeffeffffefff1fffff1111
                            111effffffeffefefefffffefeffffeff3f1ff31
                            1fefffffeffeffffefefffffffffeff1eeff3ef1
                            11111fffffffffeff1ff3f3feffffef113fff1f1
                            1e11fffe1fff3fffeffffef3fff1fe1fff3f1f31
                            1f1eef1feffe11ffffefffff3f1ff11e1f1f3111
                            11fffffff11ffff1fff3fff1331fe1ef1ef11111
                            11111e1ffff1f3ff11311f1e11e1e1fff1111111
                            111111f11f1f111e1feff31ff311113331111111
                            1111111111111e11fff311113131113111111111
                            1111111111111111111131111111311111111111
                        `, SpriteKind.Creature)
            case 51:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111fffff1111111111111efffffe11111111111
                            1111111111ff11113ff111111111fe3333333ef111111111
                            111111111f311111133ff111111f33111111333f11111111
                            11111111f311111111333f1111f3311111111333f1111111
                            1111111f3311111111333f1111e3311111313133e1111111
                            1111111f33311111113333f11f333111131313333f111111
                            111111f3f3331313133333f11f3333113131333f3f111111
                            111111e3e3333333333333effe333333333333fe3e111111
                            11111e33f33333333ff33eeffee33ff3333333fe33e11111
                            11111f3313333333fe333eeffee333ef3333331333f11111
                            11111f33f33333efe333eeffffee333ff33333f333f11111
                            11111f33333333f1e33ff11113eff331f33333e333f11111
                            1111ee3ffff333ff33f111111133ef3ff333333333ee1111
                            1111fefeeeef33ef3f11111111133efff33ffff333ef1111
                            1111fefee13eff33f1111111111133ef3ffe13ef3eef1111
                            1111feefeeeeefffe11111111111333effe3eeefeeef1111
                            1111feeeffeeffff311111111113333efffeeffeeeef1111
                            1111ffeeeefffffe3311111111333333effffeeeeefff111
                            111ffefeeeeeeef33f31111113333333efeeeeeeefefff11
                            113effeeeeeeeef33ef3333333331f333feeeeeeeeffe3f1
                            13f3effeeeeeeff333ef3333333ffe333ffeeeeeeffe3f31
                            11ffffefefeefef333ff333333ffe3333fefeefefeffff11
                            13eff3fefeffefe333f133333ffe33333efeffefef3ffe31
                            1efef3ff3ffeff3333ff333331f3333333ffeff3ff3fefe1
                            31fe1ffffeffffe333ff33333ff3333333ffffeffff1ef13
                            1113e3ffff1fff3ee3ef33333ff3333ee3fff1ffff3e3111
                            1fe1f1efffffff33333333333fe33ee333fffffffe1f1ef1
                            111fffff3fffff33333ffff3333333333efffff3fffff111
                            13e31f13e3f3f33333f13eeff3333333eeff3f3e31f13e31
                            3111feffefef3fe333feeeeeef3333eeeef3fefeffef1113
                            11fef1fffefff1fe333ffeeeef333eeeee1fffefff1fef11
                            11f3e131e1efefeffeeeeffffeeeeeeffefefe1e131e3f11
                            111ffef1f1feffe3f1eeeeeeeeeeee1f3effef1f1feff111
                            1131313fff3ff3fefeffeeeeeeeeffefef3ff3fff3131311
                            1111311f1f3f1fefe3ef1ff33ff1fe3efef1f3f1f1131111
                            11f1311f13113ffef1f3f3ffff3f3f1feff31131f1131f11
                            111113f133f1e1e13f3f3effffe3f3f31e1e1f331f311111
                            111111111133e3f1e1f3fff11fff3f1e1f3e331111111111
                            1311111111fe1e111111f31ff13f111111e1ef1111111131
                            111111111111113e31f1313113131f13e311111111111111
                            111111111111e113111111f11f111111311e111111111111
                        `, SpriteKind.Creature)
            case 52:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111111111111111f1111111111111
                            11111111111111111f111111141f114ff1111111
                            111111111111111141f111111f1f4fffff111111
                            11111114ffff4111f1f11fff411fffffff111111
                            1111111ffffffff4f1f1f111f11ff4d4ff111111
                            1111111ffffffffff14fdddddfdfddddff111111
                            1111111fff4dd4ffffdf11111fdfddddf4111111
                            11111114ffddddf111ffdddddfdfddd4f1111111
                            11111111ff4df1111111f1111fddfddff1111111
                            11111111fffd1111111d1fdddfddddff4111f411
                            111111114fff11114114df11f111dddf11f41141
                            1114fff41ff111114dd4dfff111ffddff41dff11
                            11fd1111fff1d4dd4dd4fd1111f41fdd41ff1111
                            1111ffff11f11fd4ddd4d1111d1f11fdffff1111
                            11111111ff111dfff4fff1111f1f114ddf44f111
                            111111111f11111fdd111f111f1f11dddf444f11
                            111111111f1111fdd111111111d44ddddff44f11
                            111111111f1111fd1111111111111fddfddf44f1
                            11111114ff11114d4f1111114ffffdddfffd1f41
                            111114fddff1dddfdffffff4ddf1fddf1f4ff11f
                            1114fddff1fdddd4ddf1fddddddfdff111f44ff1
                            11f11ff111fddddd144fdddddffff11111f444f1
                            111ff111111fdddd111d4ffffdf1111111f444f1
                            11111111111fd4d111111ddddddf1111144444f1
                            111111111111f411111111fddddf11111f144f11
                            111111111111f11111111141dd4f1111f1111411
                            111111111111f11111111f111d4f114fd111f111
                            111111111111f11111111f111dffffdddd1f1111
                            11111111111fff111111f1111f4fdddddf411111
                            111111114ff14fdd1111f111df44fff4f1111111
                            11111ff4d111d4ddddd41111df4dddddfff41111
                            111f4ddd44dddd4fdddf111dddfdddd44dddf111
                            11fdddff444dd4fff4dfddddddfddd44444f4f11
                            11fd4f44444fff111ffffd4ddf1fff44444f4f11
                            111ffffffff1111111111ffff11111fffffff111
                        `, SpriteKind.Creature)
            case 53:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111114ff41111111111
                            1ff4d111111111111111111111d41111111111114fddddf411111111
                            1ffff44d1111111111111111d4ff411111111114ddddddddf1111111
                            11fd4ffff411111111111d4fffff41111111111fddddddddd4111111
                            114fdffffff4dd1111ddfffffff4d1111111114ddddddddddf111111
                            111fd4ffffff4fffff4ffffff44f1111111111fddddddddddd411111
                            1114fddff44d1111111fffff4df41111111111fdddd44dddddf11111
                            1111fd4f4d111111111d4ff4ddf11111111111fddd4ff4ddddd41111
                            11114df4111111111111df4ddf411111111111fddddd4f4ddddf1111
                            11111f41111ff111111111fddf1111111111114ddddd4f4ddddf1111
                            11111f4111f41f111114114df41111111111111fddd444f4ddd4d111
                            11111fd4d1fd4f111d4f111ff11111111111111f444444f4ddddf111
                            11111fdff11ff11dffff111ffff1111111111111ff444fffddddf111
                            1fff1fdff1d1111ff114111fd11ff1111111111111fff11fddddf111
                            1f11ffd4f1ddd14ff11d11fd4ff11f11111111111111111fddddf111
                            114f11f4fdddd1f1f14111ff111411f11111111111111114d11dfd11
                            11114fffd4dd11f144111111ff41111f1111111111111111f111d411
                            111114f11d44111111111ff4d111111f1111111111111111f1111f11
                            11fffff111ff4111141111114fff1111f111111111111111f1111f11
                            1f1111fd114ff111141ffff411114111f111111111111111f1111f11
                            114fffffdddfd111fd11fdd14ff411111f11111111111111f1111f11
                            111114f1fff1ffffdff114f1111111111411111111111111f1111f11
                            1114f11f41fdd111f4d4f114f111111111fff41111111111f1111f11
                            11f11f41111f4ddfddddd4f11411111111f111ff1111111411111411
                            111f41111111fffdddddd114f111111111f11111f411111f1111f111
                            111111111111fdddd111111111111111114111111141111f1111f111
                            111111111111fdddd11111111111111111d111111114111f1111f111
                            1111111111111fdd1111111111111111111111111111f11f11114111
                            1111111111111f1111111111111111111111111dd111141f111f1111
                            11111111111111f111111111111111111111114411111f14111f1111
                            111111111111114111411111111111f1111114d1111111f1111f1111
                            111111111111111f11144111111111fd11114d11111111f111141111
                            111111111111111411111f41111111d4111df111111111f111411111
                            1111111111111111f11111f11111111fd1141111111111d411f11111
                            1111111111111111411111f41111111fd11f1111111111df11f11111
                            11111111111111111411111f1111111fd11f1111111111df11f11111
                            11111111111111111f11111f111111dfddf11111111111df11411111
                            111111111111111111f1111d411111ddfdf11111111111df1f111111
                            1111111111111111114d11ddfd111dddfdf1111111111dd41f111111
                            1111111111111111111fddddf4ddddddfdf1111111111d4dd4111111
                            11111111111111111114dddddfddddddfdf411111111ddfdf1111111
                            11111111111111111111fddddfdddddddf4f11111111ddfd41111111
                            11111111111111111111fddddd4ddddddf4f1111111ddf4f11111111
                            111111111111111111114dddddfddddddf4fd111dddddff411111111
                            111111111111111111111fddddf4dddddf4fdddddddd4f4111111111
                            111111111111111111111fdddddfddddddff4dddddd4f41111111111
                            111111111114ffffffffffdddddfddddddf4f4dddd4f411111111111
                            1111111111fddddddfffffdddddffdddfff4f444d4ffff1111111111
                            111111111f4dddddfddddfddddfdddddddf4fdddddddddf111111111
                            111111111f44dddf4dddddfddfdddddddddffdddddddd44f11111111
                            11111111fff4444ff44ddddddf44ddddd44fdfff444ff44ff1111111
                            1111111f111f44f11f44ff444fff44ff4fffdf11f4f11f4f1f111111
                            1111111f1ffffff11f4f11f44f11f411f11fdf11f4f111ff11f11111
                            1111111df11111d1ffff1fffff1fff1fff1f1f1ffffff1fd4ff11111
                            111111111111111f111dfd111ffd11fd11ff1ffd1111dff111111111
                        `, SpriteKind.Creature)
            case 54:
                return sprites.create(img`
                            1111f11f41111ddd111111111111111111111111
                            11f41f4f4114fff44d1111111111111111111111
                            111f4f4f4ff444444f4d11111111111111111111
                            1111f4fff4dddd4f444f41111111111111111111
                            11111ff4dddddf11d444ffffd111111111111111
                            11111f4dddddf1111f444fd4fff4d11111111111
                            1111fdddddd4111114d4fdfdd44fff4d11111111
                            111fd1dddddf1f11fdd4fddddddd44ff11111111
                            111d11ddddd4d11fddd4fdddddddddd4fd111111
                            11f11ddddddd4f4dd4fd4fdddddddddd4f111111
                            11f11ddddddddddf4ddf44ffdddddddd4fd11111
                            14dddd444ddddf41ddd4fff4f4ddddddd4f11111
                            1fdddf11d4ddf11dd1dddddffff4ddddd4fd1111
                            1fddf1111fdf111dd11ddddddffff4ddddfd1111
                            1fdf111114d41111fddddddddddf4ffddd4fd111
                            1fdf1f11fdf111111111111dddddf44dddd4fd11
                            14d4d11fd4f111f1111111111dddd444ddddf411
                            11fd4ffddfdd1d111111111111dddf44dddd4f11
                            1ffddddddfddd11111111111111ddd444ddd4f11
                            1fdfddddddf4d11111111111111dddf44ddd4fd1
                            1411fddddddfd111111111111111ddf444dd4f41
                            11f14ffddddf1111111111111111d4f444ddd4f1
                            11fdd44ffddfd111111111111111df4444ddd4f1
                            114fddd44ffff11111111111111d4f4444ddd4f1
                            111fdddddf44fd1111111111111df4444dddd4f1
                            111f4ddddf444f111111111111d4f444ddddd4f1
                            111f4ddddd4d4fd1111111111d4f4444dddd44f1
                            111444ddddddd4fdd1111111d4f4444ddddd44f1
                            1111f444dddddddfddd11dddff4444ddddd444f1
                            11111ff444dddddd4fddd4ff44444dddddd44f41
                            1111114fffdddddddd4fff444444dddddd444fd1
                            1111111114fdddddddddddd444ddddddd444f411
                            1111111111f4dddddddddddddddddddd4444fd11
                            11111111111fddddddddddddddddddd4444fd111
                            11111111114f44ddddddddddddddd44ff1f41111
                            11111114fff1ff44ddddddddddd4fff111fd1111
                            111114ff111111ff444dddd44fff41dd111f4111
                            1111ff111dd11ddd4ffffffff444dd1ddd111f11
                            111f41dfdd1fdd44ff4d11111dff4ddf4ddfd1f1
                            1111ffffffffffff4d11111111d4ffffffffff41
                        `, SpriteKind.Creature)
            case 55:
                return sprites.create(img`
                            11111111111111111111111111111111ffb11bf11111111111111111
                            11111111111111111111f111111fff1f11fb1f1f1111111111111111
                            11111111111111111111ff1111f11bf11bbff11f1111111111111111
                            1111111111b111111111f1f11f11b9f1bb99f1bfb111111111111111
                            1111111111fb11111111f19fff1b99f1b999f1f9f111111111111111
                            1111111111f1f1111111f1f11f1b999f1ffbbfb9f111111111111111
                            1111111111f1f9111111fb111f1fffffffbbbbb9f111111111111111
                            1111111111f11b111111ff1b99fbbbbbfbbbbbb9f111111111111111
                            1111111111b119f11111f1bffffffbbbbbbbbb99fb11111111111111
                            1111111111b1119f111ff1f999bfffffbbbbb9999f11111111111111
                            11111111119b1999fff99f9999999bfffffff99999b1111111111111
                            11111111119b19999b999999999999bfb11ffbb999fb111111111111
                            11111111119b1199999999999fff999bf111fbb9999f111111111111
                            111fb111111b1119999b9999ff1f999bf1111fb99999b11111111111
                            111b1fb1111f111999f1b99ff119999bf1111fb99999f11111111111
                            1111f19fb11f919999bf99f1ffb999bfb111bfbb99999b1111111111
                            1111b1199fff99999999999fbb9999bfbffffbfb99999f1111111111
                            11111f119999ffffffb9999999999bfffbbb99fb99999f1111111111
                            11111b111999f11f1f99bfb9999bbffbbb99999b99999b1111111111
                            111111f1119991ffb999111ffbbbbffbb9999999b999f11111111111
                            1111111f91999bb9999b11119bfbffbbb9999999999f119111111111
                            11111111f919999999f11111999fffbbb999999999bb11b111111111
                            111111111bfb99999fb1111f911ffbbb999999999bf111b111111111
                            11111111111ffb999f19f119911bffb999999999bfb1191b11111111
                            1111111111111ffbf99911111999ffbb99999999fb111b1b11111111
                            111111111111119fff9111111119bffb999999999fb11b1f11111111
                            11111111111111119f91111111199ffbb99999999bf11f1f11111111
                            111111111111111119b1111111119bffb999999999fb1f1f11111111
                            111111111111111119f11111111199ffbb99999999bff11f11111111
                            111111111111111111f1111111199bffbb999999999fb19f11111111
                            111111111111111111f111111119bffbbb999999999bf19f91111111
                            1111111111111111119b1111119bffbbb9999999999bf199b1111111
                            11111111111111111119fb11199fbbb9999999999999fb99b1111111
                            1111111111111111111111ff9bfbb999999999999999bf99b1111111
                            111111111111111111bbff11ffbb9999999999999999bf99f1111111
                            1111111111111111bf1111111fbb999999999999999bbfb9f1111111
                            111111111111111f11199bff1fbbb9999999999999ffbbfff1111111
                            11111111111111f11ff9ff11bffbbb9999999999999bbffff1111111
                            11111111111111ffb11f11fffffbbb9999999999b99999fff1111111
                            111111111111111111fbffbbbfffbbb999999999b911999bbf111111
                            1111111111111111bfb111199fffbbbbb999999b911119999bf11111
                            111111111111111fb91119999bfffbbbbbbb9bbf9111199999bf1111
                            11111111111111f9999999999bfffffbbbbbbfffb9119999999bf111
                            1111111111111fb999999999bbfffffffbbffffffbb99999999bf111
                            1111111111111fb9999999bbbbfffffffffbbbbfffbbb99999bbf111
                            1111111111111fb99bbbbbbbbffffffb999fb11111ffbbb99bbbf111
                            11111111111111fbbbbbbbbbffbbbbbbbb99f1111111ffbbbbbbf111
                            111111111111111fffbbbbbbbbbbbbbbbbbbf11111111ffbbbbf1111
                            111111111111111111ffffffffffffbbbbbf1111111111ffbbff1111
                            111111111111111111111111111ffffffbbf1111111111ffbff11111
                            11111111111111111111111fff1199119bf11111111111fffff11111
                            11111111111111111111fff11999b1999bf111111111ffb9999ff111
                            1111111111111111111f119ff9bb1999bf111111111f119b19b11f11
                            111111111111111111111ff11f99ff9bf111111111f199bf11fb91f1
                            11111111111111111111111111ff11ff1111111111f1fffff1fff1f1
                            1111111111111111111111111111111111111111111f1111ff111f11
                        `, SpriteKind.Creature)
            case 56:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111ffe1111111111111ffff11111111
                            111111111eff111fe111111111ff1333ff111111
                            11111111f11111111f1111111f1111333ef11111
                            1111111f11fff31113e111111f1111ff33ef1111
                            111111f11f111f313ef11111f1111ef1f33f1111
                            11111f33f1111f33eef11111f3113f111f33f111
                            11111f33f1111feefef11111ef33f1111f33f111
                            1111f33f111111ffef11111f3fff11111f33f111
                            1111f33f111111fe3f1111f3fef111111f33f111
                            1111f33f11111fe3feffffe3fef11111f333f111
                            1111f33ef1111f333333333333f11111f333f111
                            11111f3eef11f33111111111333f111fe3ef1111
                            11111f33ef1f31ef1111111efe33f11f33ef1111
                            11111f33eef31e33e11111e331e33fe33eee1111
                            111111f33ee11f33f1111ef331f133e33ef11111
                            111111f33e311f1ff1111fff11f133333ef11111
                            11ff111f3e311f1fe1111f1f11f11333efe11111
                            1f11f11f3311113efffe31eeee111333ef111111
                            f1111e11e311111ff11ff3111111133ee1111111
                            f1fe1f11f31111f1f11f3f111111333ef1111111
                            e1ff1f11e31111e111333f111111333ef1111111
                            1f1f1f1e3313111effffee11111333eef1111111
                            11ff3f1f3331311111111111131333eef1111111
                            111f3f1e333313111111111131333eeef1111111
                            111f3e11e33331111111131313333eef11111111
                            111f33f1f3333333111131333333eeef11111111
                            1111f3f11f33e3333333333333eeeef111111111
                            1111f33f11e33ee333333333eeeeeff111111111
                            11111f33fff33eeeefffffff3333eef111111111
                            111111ffeeff33eefef11111ff333eef11111111
                            11111111ffef33efef11111111f333ef11111111
                            111111111efe33fff1111111111ff33ef1111111
                            11111effe3333ef11111111111111ff3efff1111
                            1111f33311113ef11111111111111fe111eeefe1
                            1111f111fffff3ef111111111111f11efe3eeeee
                            11111fff11111ff11111111111111ff111f33eef
                            11111111111111111111111111111111111effe1
                        `, SpriteKind.Creature)
            case 57:
                return sprites.create(img`
                            111111111111ffff111111111111111111111111111111eff1111111
                            1111111111ff3333ff111111111111111111111111111f33eff11111
                            111111111f113333eef1111111111111111111111111f1333eef1111
                            11111111f1113333eeef11111111111111111111111e111333eef111
                            1111111f11133333eeef11111111111111111111111f311333eeef11
                            1111111f113333eeeeffe1111111111111111111111fe33333eeef11
                            11111111f3333ffffffff1111111111111111111111fe3333eeeef11
                            111111111effe11f3ffff1111111111111111111111eeee33eeef111
                            111111111111111f1fffe11111111111111111111111ffeefffe1111
                            111111111111111ffeef11111111111111f111111111effff1111111
                            11111111111111e3eeef1111111111111fef11111111fff3f1111111
                            11111111111111f33eeff11111111111feef11111111fff1f1111111
                            11111111111111f33ef3ef111f11111fe33ef1111111efffee111111
                            11111111111111e13ef3ef11f3e1111e3333f111111e3eeeef111111
                            1111111111111e113f33eeff13f1effe3133ef11111f33eeef111111
                            1111111111111f133f33eef1133e1fe311e33ef111f133eee1111111
                            1111111111111f13f313ef11333f1f31e1e333efef1133eef1111111
                            1111111111111e13f13ef111331111111e1e3333111333eee1111111
                            111111111effe11333331111311111111e1eeee111133eef11111111
                            111111eee111e11313111111111111eee111111111333eee11111111
                            1111111f3111e113111111111111111111313ee11333eef111111111
                            11111111f333e111111111111111111eeee1e111133eeef111111111
                            11111111e333e111111111111111111111e11e11333eefff11111111
                            111111111e333111fe11111131e11111111fe1113333eeeefff11111
                            1111111111f111111ffe111131f11111eff3f11113333333eeefe111
                            111111111f3111111e13e111333e11eff333f111331313133ff11111
                            11111111f331331111f3fe133333ef1fe31e1111113331fff1111111
                            1111111f33e3311111e1f1f333333e1fe1e111111113ef1111111111
                            111111effe331111111efe3efffe33effe111111111133f111111111
                            111111111f311111111111f11111fe31111113311313133f11111111
                            1111111fffff111111111f1f11f133e1111133113e313133e1111111
                            111111fe3333ff1111111e1f11f133f11113111113e333133e111111
                            11111fe3333333f1111111f111333f1111311111113ee3eeeee11111
                            11111f333333333e1111111effffe111131111111313eeffe3331111
                            11111e333333333f1111111111111111111111113133ef1111111111
                            11111e3333333333e1111111111111111131311113133ee111111111
                            11111f3333333333f111331111111111113e131131333ee311111111
                            11111f3333333333f3333111111111111113e1331efffee331111111
                            111111f3333333333eee31111111111113133ee33ef1111113111111
                            111111f3333333333fe331111113111131331eeee3ef111111111111
                            1111111fe33333333e331311113e3313133133eeeeee111111111111
                            11111111fe33333333f3311133ee3131331313eeffee111111111111
                            111111111ff3333333eff31113eef313ef3133eef111311111111111
                            11111111111f3333333fff313eef1f33eff33eeeff11111111111111
                            111111111111f33333ef11f3eef111fef11efeeefffffe1111111111
                            1111111111111fe33ef1111fee11111e11111feffffeeefe11111111
                            11111111111111ffff111111e1111131111111ff3ffee333e1111111
                            11111111111111111111111131111111111111efffeee333f1111111
                            111111111111111111111111111111111111111efeeee3333e111111
                            11111111111111111111111111111111111111111fee33333f111111
                            11111111111111111111111111111111111111111eee333333e11111
                            111111111111111111111111111111111111111111f3333333f11111
                            1111111111111111111111111111111111111111111e311133f11111
                            1111111111111111111111111111111111111111111f111113e11111
                            1111111111111111111111111111111111111111111e11111f111111
                            11111111111111111111111111111111111111111111efffe1111111
                        `, SpriteKind.Creature)
            case 58:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            11111111111111111111113efffe311111111111
                            111111111111111111111e1133333fe111111111
                            11111111111111111111e3133333333f31111111
                            11111111111111111111f333333eff33ef311111
                            11111111111111111113eff333f13ef333fe3111
                            111111111111111111feeeeeffe3eeefee311111
                            11111111111111113feeeeeeeefeeeef11111111
                            111111111111111efeeee133eeefeef111111111
                            11111111111111feeeee3fff3eeeff3111111111
                            1111111111111f1ff13ef1fff3eeefe111111111
                            1111111111111ffff1111effeeeeeef111111111
                            1111111111111f3f11111113feeeeefe11111111
                            11111111111113ffff11111113eeeeff11111111
                            11111111111111ffffff111113eeeeff31111111
                            1111113effffe11fffffff113eeeefffe1111111
                            11111f1133333f111ffeeef3eeeeeffff3111111
                            1111e111133333fffeeeef1133eefffefe111111
                            1111f1111333333ffffff1133effffeeef111111
                            111333113333e3fe3f31111113333feeef111111
                            111e333333eeeff3313efe311111133fef111111
                            111f33333eefff331111133333eeff33ef111111
                            111f3333eefeff331111111113333efeff111111
                            111f3f3eeffeff3311111111113333ffff111111
                            111ef1fefffeeff3311111111133333fff111111
                            1111111efffeeef33111111111333e3eff111111
                            1111113fefffeef33311111113333ffefe111111
                            111111efefffeeef331311111333efeff3111111
                            111111feeeffeeeef33e31113333feefe1111111
                            111113feeeeffeeeeffee13333efeeef31111111
                            11111effeeeeeffeeeefee33effeeeef11111111
                            11111fffffeeeeeeeeefffe3ffffeeff11111111
                            11111fffffffeeeeeeefffffffeffffe11111111
                            11111feeeffffeeeeeefffee3feffff311111111
                            11111eeeeeeeeeeeeeefeee3efeefff111111111
                            111111feee33effffeeffffe3feeeffe11111111
                            111111ee3333f1333ff113333fee113fe1111111
                            1111111fe333333e3f3333333ff11333f1111111
                            1111111efffe3e3e3f3e3e3ef3ee33e3f1111111
                            11111111efffffffffffffffe13effff11111111
                        `, SpriteKind.Creature)
            case 59:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111fff111111111111111111111111111111111111111
                            111111111111441f11f1111111111111111111111111111111111111
                            111111111111f1f11f4fff1111111111111111111111111111111111
                            111111111f1f114ff11144f11fff1111444411111111111111111111
                            1111111141f111111111444ff441f1f4fff444111111111111111111
                            11111111f11111114444444f44ff1ff44f4111111111111111111111
                            1111111f41111144fff444f4ff444f11f41111111111111111111111
                            1111111f44444ffff11fff4ff441f411441111111141111411111111
                            111111144ffff11fff1f44ff441f1411fff11111114f114f11111111
                            111111fffff44fff1f11fffffff11111114f411111f1f1f1f1111111
                            111114f1f4144444ff11f4ffff41111111f411111f114f11f1fff111
                            11114f1f41111f4444f1444f4111111114f11111f41111114f114f11
                            1111f1111111144f444fff44411111114f11111411111111111f1111
                            11114444444111144ff444f44411111144f41141111411111111f111
                            1111f4ffff4441111111114f44441144441f11f1111411111111f111
                            11114f4fff114441111111144ff44444411f14111144411414111411
                            11111f1f4f1fff4411111114444f4441114114111444411444411f11
                            111111f411ff44ff4444f41144f4411111f11f14144444144f411f11
                            1111111ff1111114ffff4441141444444f1141144444444444411f11
                            11111111f11411111111111111144444f111f4144444444444411f11
                            11111114ff11441111111114111444444f11f4444444444444411411
                            111114f114f1444441111144114f44444441f4444444444f4441f111
                            1111f111114ff4444444444f44f1f444fff4f4444444444444114111
                            1114111111444444444f4444ff414ffffff41f44444444f4441f1111
                            111f111111444444444444444444f44fffff4f444444444444f11111
                            114411111144441144441114444f444fffff4f4444444f4444f11111
                            11f4111111441111144111114444444fff4ff4f444444f444f111111
                            1144111111411111114111111144f44fff44fff4444444f44f111111
                            11141111144111111141144111ff44fff4444ff4444444f44f411411
                            111f1111141111111111144444ffffff4444fff4444444f444ffff11
                            111141114111141111141144444444ff4444ffff4444441f4444f111
                            1111f44111111411111411444444fff4444fffff44444f11fff41111
                            1411f4f111114411111441144f4ff44444ff444f4444f41111111111
                            11ff44f11114441111444111fff4444444444444f4ffff4111111111
                            1114fff4111441111144f444ffff4fffff444444ffff4f1114141111
                            111111f4144441111144f444ffff144444ff444fff114411f4141111
                            111111f4444f4111144f4f4f4ff111444444444ff414f411f4141111
                            1111f1ff44f4f111444f4ff4f4f41444444444fff114f11f4f141111
                            1111ffff44f4f114444f4f441f4444444444ffff414f14f14f441111
                            1111f1fff4f44f1444f4444f1f444444444fffff144ff1144f4f1111
                            1111f11f4f444f4f4f4444f1f44444444ffffff414f41114f44f1111
                            1111f11ff4444f4ff44ffff1f444444ffffffff114f1114444f11111
                            1111f111f444f44f444fff11f444444444444f414411144f44411111
                            11111f11ff4ffffff4fff114ff44fff44444f41411144f444f111111
                            11111f414f4fffffffff414f4ff44fffffff4111144f4444f1111111
                            111111f14ffff4ffffff114f4114f4fff4411111ff44444f11111111
                            111111f44fff4ff4fff1144f411111111111144411144f4111111111
                            1111111f44f44ff4f4f1f1ffff41111111111111144ff11111111111
                            11111111f4444ff4444f4f1144ff4fff111114444fff411111111111
                            1111111f1144ff1144444f114f14f144f4444ffffff4111111111111
                            111111f41144f4444f444f44f114111444fff444f441111111111111
                            111111f4f444f4f4f444ff44f44f4144444f44ff4111111111111111
                            111111f4f4f4f4f4f444f444f44f44444444ff411111111111111111
                            1111111ffffffffffff4114fffffffffffff44111111111111111111
                        `, SpriteKind.Creature)
            case 60:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111111116ffffff6111111111111
                            11111111111111111116fffffffff61111111111
                            1111111111111111161ffffffff1ff6111111111
                            11111111111111116ffbfffffbfffbf611111111
                            1111111111111116b1bfffffff11bfff61111111
                            111111111111116fffff111bfffffffff6111111
                            1111111111111bfffff1ffff6fffffffff111111
                            11116ff6111116ffffff11b6ffffffffff611111
                            111f1bbbf111bffffffffffffffffffffff11111
                            116111bbbf116fffff6111111bb6fffffff61111
                            11f1111bbf1bffff61116fff61bb6fffffff1111
                            11f1111bbbf6fff6111f11111f1bb6ffffff6111
                            11f1116bbbfffff111f11fff11f1bb6ffffff111
                            11f111fbbbffff611f116111f11fbb6ffffff611
                            116111f6bb6fff11611611111f116bb6ffffff11
                            111f116fb66fff11f11f11111f11fbb6ffffff11
                            1116111f666fff11f11f1f11f1116bb6ffffff11
                            1111f116f666ff11611611ff111fbbb6fffff611
                            11111f116f66ff611f11f1111166bbb6fffff111
                            111111f116fffff111f116ff6fbbbbbfffff6111
                            1111111f116f6ff6111fbbbbbbbbbb6fffff1111
                            111111116f1ff6fffbbb6f6bbbbbbbfffff61111
                            11111111116fff6ff6bbbbbbbbbb6fffff611111
                            11111111111116f6fff6bbbbb6fffffff6111111
                            111111111111111116ffffffffffffff61111111
                            1111111111111111116ffffffffffff611111111
                            11111111111111116ffff61111116fff61111111
                            111111111111116fffff611111116ffff6111111
                            11111111111116ffffff1111111116ffff611111
                            11111111111116fffff61111111116fffff61111
                            111111111111116fff6111111111116ffff61111
                            11111111111111111111111111111116ff611111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 61:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111ffff61111111111111111111111111111
                            11111111111111f1ff6f6b11111111116ffff61111111111
                            111111111111161ff1f6f6b11111111f11116ff111111111
                            1111111111111f1ffffbff61111111f1ffffb6ff11111111
                            111111111111161ffff6ff611111161ffff1fb6f61111111
                            11111111111111f1ffbff6fff6b11f1ffffffb6ff1111111
                            111111111111116fb6fffffffffff61ffffffb6ff1111111
                            1111111111111116fff1ffffffffff61ffffb6ff61111111
                            111111111111116ffffffffbfffffff61bbb6ff611111111
                            11111111111116ffff6bbb6fffffffffffffff6111111111
                            1111111111116fff6b11111b6fffffffffff661111111111
                            111111111116ff6b111111111b6ffffff666ff6111111111
                            11111111116ff6111ffffff111b6ffffffffffff61111111
                            1111111116ff611ffffffffff11b6ffffffffffff6111111
                            111111111ff611ffff111111ff11b6ffffff61bb6f611111
                            111111116ffb1fff111111111ff1bbfffff611bbb6ff1111
                            11111111ff61fff116fff6bb11ffbb6fffffb6fffffff111
                            11111116ffbfff16fffffff6bb1ffbbfff6161111fbb6f11
                            1111111ff61ff16ffff616ff6bbfffb6f611f11111fbb6f1
                            1111116ffbff16ff6111116ff6b1fffbf111f11111fbbbf1
                            111111fff1f11ff611111116ffbb6ffbf111611111b6bbf1
                            111111fff1f16f611f111111ff6bbffbf11111111bbbbb61
                            111111fff111ff11ff111111fffbbffbf61111111bbbbfb1
                            111111fff111ff11fff11116ff6b6f6bff61111bbbb6f611
                            111111fffb11ff111ffffffff6bbffbbfff6bbbbb6fffb11
                            1111116ff6116f6111ffffff6bb6f6b6f6fffffffffff111
                            1111111fffb116f61116ff6bbb6f6bbff6fffffffffff111
                            111116f6ff61116ff61111bb6ff6bb6fff6ffffffffff111
                            111161116ff61116ffffffffff6bbbffff6fffffffff6111
                            1116f11116ff6b116fffffff6bbbb6fffff6fffffff61111
                            11616111fb6fff6bbb6ff6bbbbbb6fffffff6fffff611111
                            11f116f6bfb6ffff6bbbbbbbbbb6fffffffff66661111111
                            1161111bbbfb66fffff6bbbb6ffffffffffff61111111111
                            111f11bbbb6fff116fffffffffffffffffff611111111111
                            11161bbbb66f61111fffffffffffffffff61111111111111
                            11116fbb666611111ffff666666fffff6111111111111111
                            1111116fff6111b6ffffff11111fffff1111111111111111
                            111111111116ffffffffff11111ffffff611111111111111
                            1111111116fffffffffff111111ffffffff6111111111111
                            111111116ffbbfffffff61111116fffffffffff611111111
                            11111116ffbbffffffff11111111ffffffffffff61111111
                            1111111ffffffffffff6111111116fffffffffbbf6111111
                            11111116ffbfffffff611111111116fffffffff6bf111111
                            111111116ffffffff61111111111116fffffffff6f611111
                            1111111116fffff6b111111111111116ffffffffff611111
                            1111111111111111111111111111111116fffffff6111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 62:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111116fffff611111111111111111111111f61111111
                            11111111111111116fffffff61111111111116ff611111f1ff111111
                            1111111111111116fffffffff611111111116fffff611f11f1f11111
                            111111111111111fbb1fffffffb111111116fffffff61f11f1161111
                            11111111111111611b1ffb6fff611111116fffffb66ff111611ff111
                            11111111111111f111fffbb6fff1111111ffff1fbb6ff116111ff111
                            11111111111111fb11ff6bbb6ff11b6fffffbfffbbbff11f111fb611
                            11111111111111f611f611bbb6ffffffffffbfff11bff11f111fbf11
                            111111111111116f611111bbb6fffffffffffbfb11fff116111fbf11
                            11111111111116fff6b111bb6ffffffbffbfffbbbff1f1111116bb61
                            1111111111116ffffff6bb6ffffffffffffffffffff1f111111bb6f1
                            111111111111fffffffffffffffffffffffffffffffffbb1111b66f1
                            111111111116fffffffffffffffffff6bbbbb66fffff1bbbb11b6611
                            11111111111ffffffffffffffffff6b111111bb6fff111bbbb666f11
                            11111111116fffffffffffffffff61116ffff6bb6f1111bbbbb66f11
                            111111111bfffffffffffffffff6b11611fffffff1111bbbbbb6f111
                            1111111116fffffffffffffffffffffffffffff11111bbbbbbbf1111
                            111111111ffffffffffffffffffffffffffffff111bbbbbbbb6f1111
                            11111111bffffffffffffffffffffffffffffff6bbbbbbbbb6f11111
                            111111116fffffffffffffffffffffffffffffffbbbbbbbb6f111111
                            11111111ffffffffffffffffffffffffffffffffbbbbbb66f1111111
                            11111111ffffffffffffffffffffffffffffffff66666ffff1111111
                            11111111fffffffffffffffffffffffffffffffff66ff16ff1111111
                            111111116fffffffff6ffffffffffffffffffffffff111bff1111111
                            11111111bffffffffff6fffffffffffffffffff611f1111ff1111111
                            111111111fffffffffff66fffffffffffffff61f11f1111ffff61111
                            1111111116ffffffffffff666fffff616ff6111f11f111bff111f611
                            111111111bffffffffffffffbbfbbf11166111f61161116ff111bff1
                            1111111111ffffffffffffff6bfbbbf111111f611f111bfff1bbbf16
                            11111111116ffffffffffffff6bfbbb6ffff6111161b16ff1fbbf6bf
                            1111111111bfffffffffffffffbfbbbbbbb11111f1bbbfffbbffbbbf
                            111111111116ffffffffffffff6bfbbbbbbbb11f11bb6fffbbbbbbbf
                            11111111111bfffffffffffffffbbffbbbbbbff11bbbffffbbbbbbb6
                            1111111111116ffffffffffffff6bbb6fffff6b1bb6ffffffbbbbbf1
                            111111111111bfffffffffffffffbbbbbbbbbbbbb6ffffffffbbbf11
                            11111111111116ffffffffffffff66bbbbbbbbb6ffffffffffff6111
                            1111111111111bfffffffffffffff66bbbbbb6ffffffffffff111111
                            11111111111111ffffffffffffffffffffffffffffffffffff111111
                            11111111111111fffffffffffffffffffffffffffffffffff6111111
                            11111111111116ffffffffffff6b11111111b6fffffffffff1111111
                            1111111111111fffffffffffffb111111111116fffffffff61111111
                            1111111111116ffffffffffff61111111111111ffffffff611111111
                            111111111111ffffffffffff611111111111116fffffff6111111111
                            111111111116fffffffffff61111111111111fffffffff1111111111
                            11111111116fffffffffff611111111111111fffffffff6111111111
                            1111111116ffffffffff6b1111111111111116fffffffff611111111
                            111111116ffffffffff611111111111111111116ffffffff61111111
                            11111116fffffffffffb111111111111111111116fffffff61111111
                            1111116ffffffffffff111111111111111111111116ffff611111111
                            111116ffffffffffff61111111111111111111111111111111111111
                            11116ffffffffffff611111111111111111111111111111111111111
                            11116fffffffffff6111111111111111111111111111111111111111
                            111116fffffff6111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 63:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111ff1111111111111114f1111111
                            1111111111111f4df1111111111114f11f111111
                            1111111111f11f44df4111111114f11fff111111
                            1111111111ff11f44dd4fffff44d11f44f111111
                            1111111111fdf1f444dddddddddddf444f111111
                            111111111fd4f11fdd11ddddddddddff4f111111
                            11111111f144f11fd1111d1dddddddddff111111
                            11111111f14f11fdd1111ddddddddddddf111111
                            1111111f144f1f4ddd11ddddddddddddddf11111
                            1111111f14f1f4ddddddddddddddddddddf11111
                            111111fdd4f1fddd44dddddddd4ffddddd4f1111
                            111111f444f1f4dddf4dddddd4fddddddd4f1111
                            111111fdd4f11fddddf4dddd4fddddddd44ff111
                            111111fdd44ffffddddfddddfddddddd44f4df11
                            1111111f4d4f1dff4ddfddddfddddd44ff411df1
                            1111111fddfddd4ff4dddddddddd44fff4d11d4f
                            1111111fddf4444fff4ddddddd4fffff4dddd44f
                            11111111f44f4444fffddddd4ffffff444444ff1
                            11111111fdd4fffffff4fdf4ffffff44444ff111
                            111111111f4f11ddffff444ffffffffffffff111
                            1111111111f11d4f4fffffffffff1dfff1dff111
                            111111fff1fffd4fffdd114fffffddfffddf1f11
                            111111fddffddf4dd1ffd111d4ffdddfdddfd141
                            111111fdddfdd4f11111fd11111fdddfdddfddf1
                            1111111fddfdd4fdd44d1fd11ddf4d4fdd4f4d44
                            1111111fddfdd4fd111fddfdd44ff444444444df
                            1111111f444444f4dfd1ff44fffff4444444fd4f
                            11111111f44444ff44fddffff4ffff444444f44f
                            11111111f44444fffffffddd444fff444444f44f
                            11111111f44444ffddddddd444ffff444444f4f4
                            11111111f4444f4fddddddd444ffff4444444f41
                            11111111f4444f4ffdddd4444fffff444444f4f1
                            11111111ff444f4fff444444ffffff4fff44ff11
                            1111111f1df4f1fffffffffffffffff1d4ff4111
                            1111111fd4f4f1111111111ffffffffdd4ff1111
                            11111111ffff111111111111111111f44f111111
                            1111111111111111111111111111111ff1111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 64:
                return sprites.create(img`
                            111ff1111111111111111111111111111111111111111111
                            11f11f111111111111111111111111111111111111111111
                            1f1111411111111111111111111111111111111111111111
                            1f1111f1111114f11111111111111111114f111111111111
                            f11111f111111f1f11111111111111111f1f111111111111
                            f1111df111111f11f111111111111114f114111111111111
                            4d111d41111111f11f111111111114f111f1111111111111
                            1f11df111111114111f411111114f1111f11111111111111
                            14dddff11111111f1111f41114f11111f111111111111111
                            11fdf11f11111114111dddfffdddd11ff111111111111111
                            11fff1df11111fff11d11dddddddddf4f111111111111111
                            1f11dff11111fd44fdd11dddddddddf4f111111111111111
                            411dddf1114f1144fddddd1dddddddf4f111111111111111
                            f1ddd44f1f1f1d44fddddddddddddddf4ffff4f111111111
                            f44ff44f4f14f44ffdddddddddddddf44f444f4f4f111111
                            1f41fff1f1fd444f4fddddddddd1fff444fddf44f4f11111
                            1ffff4f1f44444f1df1ddddddd1fff44444ffd4f44f11111
                            4111dff11ff44f11dff1dddd11fdf4dd444fddf44f111111
                            f11dd4f1111fffddd4df1dd1ffd14dddd44fd44ff1111111
                            f4ff44f1111444fdd41ffddfdf114dddd4f444f111111111
                            1ffdff4f111f11ffdd41fddf1114ddd4ff444f1111111111
                            11f1f4d1f1f11ff1ff44fddf444d4fff4444f4f111111111
                            11f11f411fd11f111ff44dd4dddff444f4ff44f111111111
                            11411fd411fdf111f1df1dd4d4fff4444f11fddf11111111
                            111ff1fd41df111f1dff1dd4dff14f44f111fddf11111111
                            1111114dddd411f1df4f1dddf44f1dff11111fddf1111111
                            1111111fddf111fdff4f4dd4f444fddf11111f44f1111111
                            111111114f111f1df1f4fddf4444fddf111111fff1111111
                            1111111111111fdfffffffffffffffddf111ffdddf111111
                            1111111111111fdf111fdddddddd4ffff1ffdddd4f111111
                            1111111111111ff1111f4d4d4d4d4fddffddddd4f1111111
                            11111111111111111111fd4d44fff44dddfdd4ff11111111
                            1111111111111111111ff4dd4f4ddddddd4fff1111111111
                            11111111111111111141df4fff44ddddddff11144fff1111
                            1111111111111111141d4ffd4fff4dddd4f1144dddddf111
                            1111111111111111f1d44f14fdd4fddd4f11fddd4fffff11
                            11111111111111141d44f141dd4fddd4ff1f4dd4f1111f11
                            111111111111111fd44f141dd44f444f44ffddd4f1111111
                            1111111111111141fffd4ffd44fffff4ddffdd4f11111111
                            11111111111111fddd4f1ddf4fff4dddddffdd4f11111111
                            11111111111111fdd4f1ddddf4f4dddddf4f4dd4f1111111
                            111111111111111fdf11ddddf44fdddddf44f4d4f1111111
                            1111111111111111f41ddddf444f4ddff44f4ddd4f111111
                            111111111111111141dddddf44f1ffff4ffdddd44f111111
                            111111111111111fddddddf44f111fffffddd444f1111111
                            1111111111111ff1d4fddd4ff111111fff4444ff11111111
                            111111111111f1f44f1f44f1f111111111ffff1111111111
                            111111111111fff11fff111ff11111111111111111111111
                        `, SpriteKind.Creature)
            case 65:
                return sprites.create(img`
                            111111111111111111111111111114fff411111ff111111111111111
                            11111111111111111f44f1111114f1111df411411f11111111111111
                            11111111111ff111fd11df1111f111ddffddff111f11111111111111
                            111111114ff1141fd1111df1141111df11ffdf11df14ff1111111111
                            11111114111f1ffdd1111df11fd11ddf1fffffdddff111f111111111
                            1111111f111ffddddd11ddf11fddddf1fdddff444ff11df111111111
                            11114fff11dfdfffddddff1111fdddf1fdddd4fff4fdddfff1111111
                            111411ffdddfffffffff1111111fff111fffdd444ffdd4f4df111111
                            111f11ffdd4ff4ddfff1111111111111111ff44444f444fff1111111
                            144fdd4ff44f4ddd1f1f11111111111111f11ffff44fffff11111111
                            41ddfd44fff44ffff111ff11111111114f111dddfffffff4f1111111
                            1fffffff4fffffddd1111df4111114ff1111ddd44fdfff44f1111111
                            11111ffffffff1fddd11dd444fff4111111ddd44ffddd4444f111111
                            11111fdffff4f1fdddddd4dd1111dd111dddd44ffffddd4444f11111
                            111141dd4444f11fdddd4d1111111dd1dddd44f111fdddd4444f1111
                            111411dd444fffffddd4d11111111ddddd444f11111fddd44444f111
                            111f1dd444ff4444fdd4d11111111dddd444411ffff1fd444444f111
                            11fddd4444f41d44fddd11111111ddddd444fff4444fff44444f1111
                            11f444444ff4dd444f4d11111111dddd4f44f4dd4444f4ff44ff1111
                            111f4444f4f444444f4d1111111ddddd4f44f4ddd44fddddffdf1111
                            1111ffff1d4f4444fdfd111111ddddd4ff444fdd444fdddddff11111
                            1111111fffddf44ffdf4d111ddddddd4f4dddf4444ff44fff1111111
                            1111111111ffdff4fddfdddddddddd4f4dddddf444ffff1111111111
                            111111111111ff4fdddf4dddddddd44f4dddddf4444f111111111111
                            11111111111111f1dd41f44dddd44f1f4ddddd4ffff1111111111111
                            1111111111111f11dd411ffddd4ff11f44ddd44fff11111111111111
                            11111111111114111dd11f14ddf1f114444d44fff111111111111111
                            111111111111114f11d4411fddf11144444ffffff111111111111111
                            1111111111111111fffdd4ff11ff44444ff444fff111111111111111
                            11111111111111111fffd4df11f4444ff444444f1111111111111111
                            11111111111111111f44f4dd114444fff4ff444f1111111111111111
                            11111111111114ffff44f4ddddd444ffff44fff11111111111111111
                            111111111114f1111dffffddddd44fff4ddd111f4111111111111111
                            1114111114f1111111dddf4dddd44f4dddddd1111f1111114f111111
                            111f11114111111111dddf4dddd444ddddd111111141111141f11111
                            114df111f11111111dffff4fdfd4f4ffff411111111ff111f1ff1111
                            11fdd4ffd111111dff111f4f1fd4ff44ffff411111111f4f111df111
                            11fdddddd111114f111111f11ddff4444ff114111111111111dddf11
                            111fdddddd1dd4111111111fffff4444ff111f11111111111dddf111
                            1111ffdddddddf11111114ff4ff444ff44f111f111111111dddff111
                            111fddddddddf1111114ffdf44fffff4444fff1fdd111ddddddddf11
                            1111ffdddffffff44ff111df4444444444ff44fffdddddddddddf111
                            111111fff11fdddffd11ddddf44444444ff444444ffdddddffff1111
                            1111111111f4ddd44f4ddffff4dd4444fffff444ffffffff11111111
                            1111111111f444444f4ff1111fddd444f1111fffdd4f111111111111
                            1111111111ff444ffff1111111fdd44f111111f4dd44f11111111111
                            1111111111f1fff44f111111111f444f111111ff444fff1111111111
                            111111111411ddd444f111111111fff111111fddfff44f1111111111
                            111111111f11dddd44f111111111111111111f111dd44f1111111111
                            11111111fddddddd44ff11111111111111111f111ddd44f111111111
                            11111114fdd44ddd44f1f1111111111111111411dddd44f111111111
                            1111114114f1d4d444ff11111111111111114ddddd4444f111111111
                            1111141114111f44ff111111111111111111fdd444444d1f11111111
                            11111f1fff11ffff111111111111111111111f411ffff111f1111111
                            111111f111ff11111111111111111111111111f11f11144ff1111111
                            111111111111111111111111111111111111111ff111111111111111
                        `, SpriteKind.Creature)
            case 66:
                return sprites.create(img`
                            11111111111111111fff1ff1f111111111111111
                            1111111111111111f111fb1fbf11111111111111
                            1111111111111111fdd11fbfbf11111111111111
                            111111111111111dfffd1fbfbff1111111111111
                            11111111111111ffdddfddfbffbf111111111111
                            1111111111111fddddddfdfbffbdf11ffff11111
                            111111111111fbddd111df1ffbddbffddddf1111
                            111111111111fbdd1fffbdfffbbffffdddddf111
                            11111111111fbdddf111fddfbdf111fdddddf111
                            11111111111fbdddffb1fdddddffb1ffbbbbf111
                            11111111111fbdddfbf1fdddddfbf1fffffbf111
                            11111111111fbdddbfffbd1111bfffdfbbbddf11
                            11111111111fbbdddddd1111111dddddfddddf11
                            111111111111fbddddddddddddddddddfbdddf11
                            11111111fffffbbdddbddddddddddddbffddddf1
                            111111ff11111fbbdbfbddbfffffbbff1fddddf1
                            11111f111dddd1fbbdbffffbbbbbfffbfdddddf1
                            1111f11ddddddddfbbbbbbbddddbbfbbbddddbf1
                            1111f1ddddddddddffbbbbbbbbbffbbbdddddbf1
                            1111f1dddddddbddddfffffffffbbbbdddddbf11
                            111f1ddddddbbfbdddddbbbbbbbbbddddddbbf11
                            111f1ddddbbbfbbddddddddbbbbbddddddbbf111
                            11f1ddddbbfffb11111111ddd1111fddbbbf1111
                            1f1ddddbff11fdbbbbbbbbdddbbbbfbbbbf11111
                            f1dddfbf1111fd1111111ddddd111fbbff111111
                            f1dddbf11111fdbbbbbbbdddddbbbfff11111111
                            1f1bbbf1111fdd111111ddddddd111f111111111
                            11ffff11111fddbbbbbbdddddddbbbf111111111
                            1111111ffff11dddddddddddddddddf111111111
                            11fffffdddf11dddddddddddddddddf111111111
                            1fbbbddddbfdd1dddddddddddddddddf11111111
                            11fffbbbbbfdddddbbfffffbbbdddddf11111111
                            11111ffbbbfddddbbfbbbbbffbbdddddf1111111
                            1111111ffffbdddbbffffff11fbbddddf1111111
                            11111111111fbbddbbf1111111fbbbdddf111111
                            111111111111ffbbbbf11111111fbbbdddff1111
                            11111111111111fbbf1111111111fbbb11bbf111
                            11111111111111fbbf11111111111ffbbbbbf111
                            111111111111111ff11111111111111fffff1111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 67:
                return sprites.create(img`
                    11111111111111111111111111111111111111111111111111111111
                    11111111111111111111111111111111111111111111111111111111
                    11111111111111111111111111111111111111111111111111111111
                    11111111111111111111111111111111111111111111111111111111
                    11111111111111111111111111111111111111111111111111111111
                    1111111111111111111111fffff11111111111111111111111111111
                    11111111111111111111ff1f1dbfff11111111111111111111111111
                    1111111111111111111f1f1f1bf1dbf1111111111111111111111111
                    111111111111111111f1ff1fdbfdbfff111111111111111111111111
                    111111111111111111f1f1f1df1bfdbbff1111111111111111111111
                    11111111111111111ffdfbf1f1bfddbbbbf111111111111111111111
                    1111111111111111fddffbfdfbfdddddbbbf1bfbfffb111111111111
                    1111111111111111fbbdfbffbfddfffbdbbfffbbbbbbfb1111111111
                    1111111111111111ffbbdfbffddfdddfbdbbfbbbbbbbbbfb11111111
                    111111111111111fddfbbfbfddfd111dfdbbfbbbbbb1bbbf11111111
                    111111111111111fffdfbdffddfff111fddbfbbbbbbb1bbdf1111111
                    111111111111111f11ffbdddddfb1f1fddfdbfbbbbbdb1bddb111111
                    11111111111111fdf11fddddddfbbffdddfdbfbbbb1bdb11df111111
                    11111111111fffdddffdd11d1d1ffddddffdbfbbbdb1bdb1ddb11111
                    111111111bfbbfddddd11111d1dd1dddfffdbfbb1bdb1bdb1df11111
                    11111111fddbbfdddd1111111d1ddddfffdbffbb1bdb1bdb1ddb1111
                    1111111fddddbbfddd111dddfffffffffdbbffbb11bdb1bdb1df1111
                    111111fddddd1bbfffffffffdddddddddbbfffbbb1bddb1db1ddb111
                    11111bdd1ddd1bbbfffddddddddddbbbbfffffbbbb1ddb1db1ddf111
                    11111fdd1ddd1bdbbfffbbbbbbbbbbbfffbbbffbbbb1ddb1dbddf111
                    1111bbdd1bdd1bddbffffffffffffffffbddffffbbbb1db1dddddb11
                    1111fbbddbdd1bdddbfffbbbbbbbbfffbddfdddffbbbb1b1ddddbf11
                    1111fb1dd1bddbdddbffb11dddddbbfbddfbbddbfffbbb1d1dddbf11
                    1111fb1bddbdd1bdddfbbddddddddbbddfdfbdddfffffddddddbf111
                    1111fbb1bddbddbddddfbbbdddddddbdfdddddddbffddddbdddbf111
                    1111bbb1bddbdddbddddfbffffffbbbbfddddddbbf11bd1bddbf1111
                    11111fbb1bddbbddbdddbfbbbbbbffffdddddddbf1bdd1bddbf11111
                    11111bfbb1bbdbbdddddb111bbbddddddddddbbf1bd11bddbf111111
                    111111bfbb11bddbdddddbbbdddbbdd111dfbbf11d11bddbf1111111
                    1111111bfbbbbbdddd1dddd11ddddd11dbfdddddd1bbdbbf11111111
                    11111111bffbbbbddddd111bbbbbd11bfbdddddddbdbbff111111111
                    1111111111bffbbbbddddbbddddd1bbbfd11ddddddbff11111111111
                    111111111111bffbbbbbdddddbbbbfffd11dddddbff1111111111111
                    11111111111111bffbbbbbbbbbfffbbfdddddddbffffb11111111111
                    111111111111111bfffbbbbbffbdddbfbdddddbffdddff1111111111
                    1111111111111111bffffffffd11111dfbbbbbffddddddf111111111
                    1111111111111111fbbbfffdbb111111fffffffddddddddf11111111
                    1111111111111111fdffbbbf11bbbbbbdffbbffdddddddddb1111111
                    111111111111111bddddffbbffddddddfbbfffddddf11dddf1111111
                    111111111111111fddddddffbbffffffbffffbbdbfd11ddddb111111
                    11111111111111bd11ddddddffbbbbbbfffffbbbfbdddddddf111111
                    111111111ffbb1fd11dddddddfffffffffffbbbfbdddddddbf111111
                    11111111b11dbffd1dddddddddffffffffffffffbdddddddf1111111
                    11111111f1ddbfddddddddddddffffffb111111fbbdddddbf1111111
                    1111111bdddbbfdddddddddddf111111111111bfbbbbddbf11111111
                    111111fdddbbbbddddddddddf1111111111111fbbbbbbbf111111111
                    11111fbbbbbbbbddddddddbf111111111111bfbbbbfffff111111111
                    1111fbbbbbbfbbbddddbbbf1111111111111fbbbbbbddddff1111111
                    111fbbbbbbbbfbbbbbbbfbb1111111111111fbbbbbbbbbbbbf111111
                    111bfbbbbbbfffbbbbffb111111111111111fbbbbbbbbbbbbf111111
                    1111bffffff111ffff1111111111111111111ffffffffffffb111111
                `, SpriteKind.Creature)
            case 68:
                return sprites.create(img`
                            111111111111111fbbfff11111111111111111111111111111111111
                            111111111bffbbb111dddfb111111111111111111111111111111111
                            1111111fbbd1111dbddddbfb11111111111111111111111111111111
                            11111ffbd111dddbddddbfdf11111111111111111111111111111111
                            111ffbd1111ddddfbbbbfddfb1111111111111111111111111111111
                            11fbdd111ddddddbffffdddbf11111111111111111bb111111111111
                            1fbdd111dddddddbffbddbbbf1111111111111111b11f11111111111
                            1fdd11ddddddddbfbdfbbbfff111111111111111b1111f1bbf111111
                            1fdddddddddddbbfbdffffbbf111111111111111f11111f111f11111
                            1fddddddddddbbfffbbfbddf1111111111111111fbdd11f1111f1111
                            1fbdddddddbbbf11ffbbfff11111111111111111fbddddfdd11fff11
                            1bfbbdddbbbbff1111fff111111111111111111fbfbddddfddd1f1f1
                            11fbbbbbbbbbbbff1111ff11111111111111111fbfbddddfbddbf11f
                            11bfbbbbbbbbbbbbff1f11f1111111111111ffbbfbfbddbffbbbfddf
                            111fffffbbbffbbbbbf111df11111111111f1111ddfbbbbffbbfbbbf
                            11fdddddffbf1fbbff111dddfbffff11111f11ddddbfbbbffffbbbbf
                            1bd111ddddff11fff111dddddfbbbbbbfff1f1dddbbbfffbbffffff1
                            1f111dddbbbf11df111ddbbbbfbbbbff11fffffbbbbbbbbbbbbbbff1
                            bd111dbfffffddbf11ddbffffffbbf111dfbbbbfffffbbbbbbbbbf11
                            fd11dddddddbfbf11dbffbbbbbbff111dfbbdbbbbbbbffffbbbff111
                            fdd1ddddddbbfff1dbfbbdddddddbf1ddfbddddbbbbbbbfffff11111
                            fbdddddddbbffbfdbfbddddddddddbfdfbddddddbbbbbbfff1111111
                            bbbdddbfffffbbfbfbddddddddddddfdfdd1dddddbbbbbff11111111
                            1fbbddddbbffbbffbddddbffffbdddbfbdd11dddddbbbff111111111
                            11fbbbbbbffffbffddddbfddddfbdddfbddd11ddddbfff1111111111
                            111fffffffff1ffdddddfbd1111fddddfbddd11dddbffffff1111111
                            11bdddbbbfff1dfddbdbfffb111fddddfbddd11ddddbbbbbbf111111
                            11fd1dddbbffdffddbbf1dffd11fddddfbbddd1dddddddbbbbf11111
                            11bdd1dddbbfdffdddbfdbfffffbddddfbbddd1ddd1dddddbbbf1111
                            111fd1dddbfdffbdddddfff1111ddddbfbbddddddbd111dddbbf1111
                            111bdddddbfd11111ddd111ddddddddbfbddddddbdd1111dddbbf111
                            1111fdddbbfb11111111dddddddddbbffbddddddfbddd11dddbbf111
                            11111fbbbbfbd11111dddddddbbbfffffdddddddfbdddd1dddbbbf11
                            111111ffbbbffb1111dddbbfffffffbfbdddddddfbbdddddddbbbf11
                            11111111fffb1fbd1dbfffffffffbbfbdddddddbbfbbbddddbbbbf11
                            11111111111111fbffffffffffbbffbddddddffbffbffffbbbbbbf11
                            111111111111111fbbbbbbbbbbfffbddddddf11ffff1111fffbbf111
                            11111111111111111bffffffffffddddddddfbd1ff1111ddbbffff11
                            1111111111111111bfffffffffbbdddddddbbfbbdd11dddddb11ddf1
                            111111111111111fdddbfbbffbbbbdddddbbbffffbdddddddbddddf1
                            11111111111111fdddddbfbbfbbbbbbbbbbbf111dfbbdddddbbdddb1
                            1111111111111bf11ddddbfbbfbbbbbbbfffbdddddddbbdddbbffb11
                            1111111111111fd11dddddbffffffffffffffbbbbbbbbbbdbbf11111
                            1111111111111fddddddddbfffffffffffffffffffbbffddbf111111
                            1111111111111fdd1dddddbbfbfbfbffffffbbf11bff1ddbbf111111
                            1111111111111fbddddddbbbffffffffffbbbbfb1bf1ddbbfb111111
                            11111111111111fdddddbbbbffffffffbbbbbbbfbf11dbbbf1111111
                            11111111111111fbddbbbbbffbffffbbbbbbbbbfbf1dbbbf11111111
                            111111111111111fbbbbbfffbbf111fbbbbbbbbfffbbbbf111111111
                            1111111111111111fffffffbbfb1111ffbbbbbfffbffff1111111111
                            11111111111111111bffffbffb111111bfffffffffb1111111111111
                            111111111111111111bffffb1111111111bfffffffb1111111111111
                            1111111111111111111bffb111111111111bffffffb1111111111111
                            111111111111111111111111111111111111bffffb11111111111111
                            1111111111111111111111111111111111111bbbb111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 69:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            111111111111111117ffff711111111111111111
                            1111111111111111f111117f1111111111111111
                            111111111111111f11111117f111111111111111
                            1111111111111171111111177711111111111111
                            11111111111111f1111111117f11111111111111
                            1111111111111711111111117771111111111111
                            1111111111111f111111111177f1111111111111
                            1111111111111f177111177777f1111111111111
                            1111111111111f71f71171f777f7111111111111
                            1111111111111f7ff7117ff7777f111111111111
                            1111111111111717711117777f1f111111111111
                            1111111111111171177111777f1f111111111111
                            11111111111111f177771177f17f111111111111
                            11111111111111f71117777711f7111111111111
                            11111111111111f11177777f17f1111111111111
                            111111111117fff17ff777f11f71111111111111
                            1111111117f11f7f177f7f117f11111111111111
                            11111111f11177f17777f117f711111111111111
                            1111111f7777f777fff7f17ff111111111111111
                            111111f111777f7f777f17ff7111111111111111
                            11111771177777f7fff17fff1111111111111111
                            11111f7ff777777ff77ffff71111111111111111
                            11111ff11ff777777ffffffff111111111111111
                            111117111117ff7777fffff77711111111111111
                            11111111111117fffffffff77f11111111111111
                            11111111111111111fffff7f77f1111111111111
                            1111111117f711111ff71f7f7771111111111111
                            11111111f1117f117ff1f777f77f111111111111
                            1111111f111111f711f1f77777777f1111111111
                            1111111f1111111111f1f7777777777f11111111
                            111111f1f111111111711f77777771117f111111
                            11111f111f111111111f11f777777777117f1111
                            1111f111111111111117111f7711111177111111
                            11111111111111111111f11117fffff711111111
                            111111111111111111111f111111111111111111
                            11111111111111111111117f7111111111111111
                            111111111111111111111f111ff1111111111111
                            11111111111111111111f1111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 70:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            11111111111111111111117f711111111111111111111111
                            111111111111111111111f111f1111111111111111111111
                            11111111111111111111711111f111111111111111111111
                            11111111111111111111f117777111111111111111111111
                            111111111111111111117777777711111111111111111111
                            111111111111111111177777f77f11111111111111111111
                            1111111117fff711111f7777f77f11111111111111111111
                            11111117f77777f1111ffffff77711111111111111111111
                            111117f77777777f1117fffff7f111111111111111111111
                            1111f77777777fff11f77777ff1111111111111111111111
                            111f77777777f111ff7777777f1111111111111111111111
                            11f77777777f1111f777777777f111111111111111111111
                            1177f777777f111f77117777777f11111111111111111111
                            177777777777f11f71111777777771111111111111111111
                            1f77777777777ff7117717777777f1111111111111111111
                            1f177f77777777f711771777777777111117ffff71111111
                            17117777777777f11111777777777f1117f777777f711111
                            117177f7777777f11117777777777f11f7777777777f1111
                            11f1177f777777f11117777777777f7f7777777777777111
                            111f1177f7777ff1117777777ff777f7777777777777f111
                            11117f177777f7777777777f7777f7f77777777777777711
                            111111f1177fff77777777777ff117777777777777777f11
                            11111117f1f1ff7f777777f7ffff1f771111777777777f11
                            1111111117f1f717777777f1ffff1f777777777777777771
                            11111111111711f7777777711ff117711111177f777777f1
                            11111111111ff7777777777f1111f711111111177f7777f1
                            11111111117fffffff7777777ff77f711111777777f777f1
                            11111111f7711111777fffff7777fff711777ff7777f77f1
                            1111111f71111117777777777fffffff77f711117f7f77f1
                            111111f71111777777777777777ffffff711111111f7f771
                            1111117117777fffffffff777777ffff11111111111fff11
                            11111777777fffff771177ff77777fff111111111111f711
                            11111f7777ffff771111177ff77777ff111111111711f111
                            11111f777ffff71111111177ff7777f711111111117f1111
                            11111f777ffff77111111117ff7777f11111111111111111
                            1111177777ffff7711111177f77777f11111111111111111
                            111111f7777fffff771177ff777777711111111111111111
                            1111111f77777fffffffff7777777f111111111111111111
                            11111111f7777777777777777777f1111111111111111111
                            1111111117f777777777777777f711111111111111111111
                            111111111117f7777777777ff71111111111111111111111
                            11111111111117ffffffff71111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 71:
                return sprites.create(img`
                            111111111111111111111111117ffffff71111111111111111111111
                            111111111111111117f711111f11111117f11117ff71111111111111
                            1111111111111111f7777f11f1111777117f17fffff7111111111111
                            1111111111111117777777ff111777777777fffffff7111111111111
                            111111111111117777777fff1777717777777ffffff1111111111111
                            1111111111111f77777fffff777777777777fff777f7111111111111
                            111111111111f77ffffffffff7777771111f77777777f11111111111
                            111111111117ff711117fffff7777111777777777777711111111111
                            11111111111ff1111f777777f7771177777777777777771111111111
                            1111111111ff1111f7777ffff77117777777777777777f1111111111
                            111111111ff7111f777717fff7717777777777777777777111111111
                            11111111fff1111f777f717ff717777771777777777777f111111111
                            1111111f7ff1117777ffff77f717777777777777777777f111111111
                            111111f77ff111f777fffffff1777777777777777ff7777111111111
                            111117777ff111f7777ffffff17777777777ffff7111ff1111111111
                            11111f77f7f1111f7777fffff77fffffffff77f11111111111111111
                            11111f77f777111f77177ffff7ffff777ffff77f1111111111111111
                            11117777f77f1111f71177fffffffff717fff77f117f771111111111
                            1111f777f777f111ff711177ffffffff717f777f1111f7f711111111
                            1111f777f777f11777f7711777ffffff7117777f11111f77f1111111
                            1111f777f777f11f777ff7777777777f777777f1111111777f111111
                            111177777f77711f11f77ff77777777777777f11111111f777711111
                            11111f777f777f1711777f7ff7777777777f71111111117777f11111
                            11111f7777f77f77f111f77777ffffffff7111111111111777771111
                            11111777777f7ff777f77777f77f777f711111111111111f777f1111
                            111111f77777fff777777777f777777f111111111111111f777f7111
                            1111111f77777ff1171177777f1111f1111111111111111f777ff111
                            11111111f7777f7171111177777ff711111111111111111f77777711
                            1111111117f77f117111111777777f11111111111111111777777f11
                            111111111117ff117117111777777fffffff71111111117777f77f11
                            1111111111111f11711711711777ffffffffff71111111f777777f11
                            1111111111111f11711111711777fffffffff77f1111117777777f11
                            1111111111111f11771111711777ffffff777777f1111f777f777f11
                            1111111111111f11771171711777ffff777777777f71f777f7777711
                            1111111111111711711171711777fff777777777777f7777f777f111
                            1111111111111171711111711777f77ffff77777777ff77f77777111
                            11111111111111f1711711717777f777777ffffffffffff7777f1111
                            11111111111111f7171711717777f777777777777777ffffff711111
                            11111111111117ff171111177777fffff77777777ff7111111111111
                            1111111111111fff771117177777f1111fffffff7111111111111111
                            1111111111111ff7f77117777777f111111111111111111111111111
                            1111111111117f71177777777777f111111111111111111111111111
                            111111111117f71111f777777777f711111111111111111111111111
                            11111111117ff11111177777777fff11111111111111111111111111
                            1111111117ff71111111f77777fff711111111111111111111111111
                            111111111fff1111111111ffffff7111111111111111111111111111
                            111111117ff1111111111117ff711111111111111111111111111111
                            11111111fff1111111111111111117ffff7111111111111111111111
                            11111117ff11111111111111111177777777f7111111111111111111
                            1111111fff11111111111117fffff7777777777f7111111111111111
                            1111111fff7111111117fffffffff7777771111117f7111111111111
                            11111111ffff777ffffffffffffff7777111117f7111111111111111
                            111111117fffffffffffff71111171111117f7111111111111111111
                            11111111117fffff71111111111117ffff7111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 72:
                return sprites.create(img`
                            11111111111111111bfffffb1111111111111111
                            111111111111111bf111111ffb11111111111111
                            111111111111bffb111119bfffff111111111111
                            11111111111bfffb91119bfffffff11111111111
                            11111111111fffffb1119f11ffffff1111111111
                            1111111111b11bbfb9199f11ffbbbfb111111111
                            1111111111f11bbfb9999fff1bbbbbf111111111
                            1111111111ffb1bfb9999bfffbbbbbbb11111111
                            111111111bffbbbfb99999fffbbbbbbf11111111
                            111111111fffbbbfb99999bffbbbbbbff1111111
                            11111111fffffbfbb999999bfbbbbbbfb1111111
                            11111111fbffff9b99999999bfbbbbbfbf111111
                            11111111f9bff9b9999999999bffbbfbbf111111
                            11111111b1999b9991199999999fffbbbf111111
                            111111111f1bb9991fff9b999999bbbbbf111111
                            111111111b999991f1fff9b99b99bbbbf111ff11
                            1111111111fb9991fffbf9b999b999bbf11f19f1
                            1111111111f99999ffbbf999999999bf11f99bf1
                            1111111111fb99999fffb999999999bf11f99f11
                            11fff11111fbb9999999999999999bbf11f99f11
                            1f199f1fffffbb9999bf9999bbbbbbfffffb9bf1
                            1fbb99f119bfffbbbbbbfbbbbbffbf91199f99f1
                            11ffb9f11199ffffb1999bfffffbf99199bf99f1
                            1111f9f99999f199fb99bf1991fbf9999bff99f1
                            1111f9fff999f1119fbbf91111fbf999bfff9bf1
                            1111fb9fffbbbf1b9fbbf1b11fbb9f9bbff99f11
                            11111f9fffffff1f9fbbf1f1ffffff9ffff9bf11
                            11111fb9fffb99fff9ff9fffb99bff9fbbfbf111
                            111111f99bffb99bbbffbbbb99bbff9ffbbbf111
                            1111111ffbbbffff19f199bffbbfbffbfbbf1111
                            111111111ffff111f1f1bff11ff1111f1fff1111
                            11111111111111111fffff111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 73:
                return sprites.create(img`
                            111111111111111111111ffffff111111111111111111111
                            1111111111111111111ff111111fff111111111111111111
                            11111111111111111ffbf11111fb1bff1111111111111111
                            111111111111111f111ff11199f111bbff11111111111111
                            11111111111111f111ff999999f1111bbbf1111111111111
                            1111111111111fb11fff999999f111bfbbbf111111111111
                            111111111111fbbfffff999999ff1bfffbbbf11111111111
                            111111111111fbfffff9999999ffffffffbbbf1111111111
                            11111111111fbbfffff9999999fffffffffbbf1111111111
                            11111111111fbfffff999999999ffffffffbbbf111111111
                            1111111111fbbffffff9fff999ffffffffffbbf111111111
                            1111111111fbbffff91f11ff9f19ffffffffbbbf11111111
                            1111111111fbffff99ff11fff1b9fffffffffbbf11111111
                            1111111111fbfff99bfbfffff9b99ffffffffbbff1111111
                            111111111fffff99b9fbbffff99b99fffffffbbbf1111111
                            11111111f9fff99b999fbbff9999b99fffffffbbff111111
                            111111fb19ff99b99999fff999999b999fffffff99fb1111
                            11fffb111b99bb9999999f99999999b9999fff999bbbfff1
                            1f11111111bb999911111f911111999bbb99999bbbbbbbbf
                            1f11111119999991111ff9111111111999bbbbb999bbbbbf
                            11fb91999999999111f91111111199999999999999bbbbbf
                            111fbbbb9999ff9991f9111111999ffffbbb9999bbbbbbf1
                            1111fbbbbbffffff999f9999999ffffffffbbbbbbbbbbf11
                            111111ffbffffff9bbfbf9999bf999fffffffbbbbbff1111
                            11111111fffffff111f1ffffb1f11bfffbffffffff111111
                            1111111111111fbff11fffff111bfbbfbbbf111111111111
                            111111111111fbfbbffbbbfffffbbfbbfbbf111111111111
                            11111111111fbbbbfffbbbbfffffbffbbfbbf11111111111
                            1111111111fbbfbbffffffbfffffffffbbf99f1111111111
                            1111111111f1bfff111111ffffff1111fb1f91f111111111
                            111111111f1111f9999111111ff991199f11f91f11111111
                            111111111f11111ffff99911111ff9999f911f91f1111111
                            111111111f911111111fff9911111ffffff111f1f1111111
                            111fff1111f99999999999ff99111111111119f91f111111
                            11f111f1111fffffffff9999ff99991111199f1f1f111111
                            11f1111f11111fbfffbbffffffffff99999ff11f11f11111
                            1f111911ff11f9bfff11bbf1fbbff1ffffff111f11f11111
                            1f919f9111ff99ffff199f111fbbf1fbbfbf11f911f11111
                            11f99ff991199fff1f999f111fbbf11f9fbf11f911f11111
                            111ff11f9999fbff1f999f111f99f11f99f9f1f911f11111
                            111111111fff9bf111f99f111f99f11f99f9f1f991f11111
                            11111111111f9ff111f99f111f99f11f9f1f9f1f99f11111
                            11111111111f9f1111f99f111f99f11f9f1f9f11ff111111
                            11111111111f9f11111f9f111f9f111f9f1f9f1111111111
                            111111111111f111111f9f111f9f11f99f11f11111111111
                            1111111111111111111f9f1111f111f9f111111111111111
                            11111111111111111111f1111111111f1111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 74:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111fff11111111111111111111111
                            11111111fff1ffdddf1111111111111111111111
                            11111fffdddfdddbbf1111111111111111111111
                            111ffdddddddfdbff11111111111111111111111
                            11fdddddfddbfbf1111111111111111111111111
                            11fddfddbfbbff11111111111111111111111111
                            1fddddfbbfff1111111111111111111111111111
                            1fddbbfffbf111111bbfffff1111111111111111
                            1fdbffbbbdf111bbf111ddddffff111111111111
                            11fdbbddff11bfddb111ddddbbfbf11111111111
                            11fdffff111f11dddfffdddf111fbf1111111111
                            111fdddf111f111db11dfdf11111dbf111111111
                            111fbddbf11b111df11dfdb111ddddbf11111111
                            1111fdddf111bdddbddddddbddddddbf11111111
                            1111fbdddf1fbffddddddffffbdddddbf1111111
                            11111fbdddffdf1fbdddf1111fdddddbf1111111
                            111111fbdbbfd11dfddf111ddddddddbf1111111
                            1111111fbbbfddddddd11ddddddddddbf1111111
                            11111111ffbfddfbdbddddbf1ddddddbf1111111
                            1111111111ffdd1fdbdbdbf111ddddddf1111111
                            11111111111fdd11fddbdf111bdddddddf111111
                            11111111111fddb1fdddf111bdddddbdddf11111
                            111111111111fddbfdddf11bddddddbbdddff111
                            111111111111fdddddddfbbddddddbfbbddddf11
                            1111111111111fdddddddddfddddbffffbddddf1
                            11111111111111fdbbfbfffddddbfffbbffbdddf
                            111111111111111fdddddddddbbfffdddbbfbddf
                            1111111111111111ffdddddbbff11fdddddbfddf
                            111111111111111111fffffff1111fddfddddddf
                            11111111111111111111111111111fddbffdddf1
                            111111111111111111111111111111fddbffff11
                            111111111111111111111111111111fddbbbbf11
                            1111111111111111111111111111111ffffff111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 75:
                return sprites.create(img`
                            1111111111111111111111111111111111111bb111111111
                            1111111bf111111111111111111111111111b11f11111111
                            111111b1df11111111111111111111111111f11f111bbf11
                            1bf111b1df1111111111111111111111111b111ff1b111f1
                            b1df11fddf1111111111111111111111111f1ddffb111df1
                            b1dffffddf1111111111111111111111111fddffdf11dff1
                            fddfddfddf1111111111111111111111111fffdbbfddfffb
                            fddfbbbff111111111111111fff1111111fdddfbbbffdbbf
                            fddfbbbbbfff11111111111f111f11ff1f1dddfbbfbbbbbf
                            fffbbbbbfdddf11111111fff111fff11ffddddfdbfbbbbbf
                            1fdbbbbbfdddf111ff11fdb111dfdf111ffddfffdfbbbbf1
                            11fddbbbbfffd11f11f1fdd11ddddd1ddddffffbfffffff1
                            11fddbbbbf11111b1dbfdddb1dfffbdbdbdbfffbbbbfff11
                            11bfffbbff1111b1ddbbdddddf11bfbdbdbfbffddbbbbbf1
                            1b1dfbfff11111f1dbbbdbdbf11bbbfbbbbbfbfddbb1dbf1
                            1bdbfbbbf11111fddbbbffbdf1bbbffbbbbfbfffddbdbff1
                            11bfbbbbff111fdfbbbfddfbbbbbf11fbbbbfbffddbffff1
                            11b1bbbbfdf1fdddbbff1ddfffff11ddfbffbfbffdbbbbf1
                            11fddfffdddffffbbf1111d1d1dd1ddbbfbbfbfffffbbbf1
                            11fdb1dbfddbfbfdff11111d1dddddbbbfbbbffff1dfbbf1
                            111bdddbfbbbbfbddbd11111d1dddbdbbfbbbbfffdbfbf11
                            111fddbfbbbbfbdddf1d1d1d1dddbdbbffbbbfffbffffb11
                            1111fffbbbbbbfdddddfd1d1dddddbbfd1fbbfdffbbfff11
                            111111ffbbbbbbdddddfddddddddbdbbddbfbbddffffffb1
                            11111111ffbf1fdddddddddddddddbbbbbbfbdbdbffffff1
                            11111111fff11fdddbdbddddfdddbbbbbbffdbbffffffff1
                            11111111fbf1ddddddbddbbbdd11bbbbbbfbbbfdddfffff1
                            111111111ffdddddddffdbbfdd11dbbfffbbbbfdbbfffff1
                            1111111111fbfdddddddfdbfbd1ddffdddbbbbbbfbfffff1
                            1111111111fffddddd11dfdffddffdd111dbbbbbbfbffff1
                            111111111fddffdddd111ffbfffdf11111dbbbbbfbfffff1
                            11111111b1ddbfbddbdd111bbbf111111dbbbbbbbfbfffb1
                            1111111bdddbbfdbdbbbbbbbbbbbbbbbbbbbbbbbfbffff11
                            1111111bfffbbbfdbdbbbbddbbbbbbbbbbbbbbbbffffff11
                            111111bffbbfdffbbbbbbfddbbbbbbbbbfbbbbfddbfffb11
                            11111f11dffffbffbbbbbbfffffffffffbbbbbddddbff111
                            11111f1dbdbfbfffbbbbbbbbff11ddddfbbbbd11ddbfb111
                            111111ffbbbbfbfffbbbbbbbbbffffffbbbbbd11dbbf1111
                            111111fffbbbbf11bfbbfbbbbbbbbbbbbbbbfbdfffbbf111
                            11bfffffbbbbfbf111fbfbbbbbbbbfbfbbbffffdddfbf111
                            1f11dbdbbbbbbbf1111ffffbfbbbbbfbfbfbfffdddff1111
                            1f11ddbbbbbbbbff11111fffbfbfbfbffffffbfdddfff111
                            11fffffbbbbbbfddf11111bffffbffffffffbbfddbfbbf11
                            1111111fbbbfffddf11111111bfffffbf1ddfbbfbbfbbbf1
                            11111111fff11fff1111111111111111fdddfbbbffbbbbf1
                            11111111111111111111111111111111fdddffffffddbf11
                            111111111111111111111111111111111fff11111fdddf11
                            111111111111111111111111111111111111111111fff111
                        `, SpriteKind.Creature)
            case 76:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            11111111111111111bffb11fffffb1111111111111111111
                            111111111111111bfbbbbffdddddbffb1111111111111111
                            1111111111111bfb11ddddfd111ddbbbf111111111111111
                            111111111111fbd11dbfffffb11dddbbbf11111111111111
                            11111111111fbddbffddddddbffddbbfffff111111111111
                            1111111111ffdbfdddd111ddddbffbfd111df11111111111
                            111111111ffbfddd11111111dddbffdd11ddbf1111111111
                            111ffff1ffffdd11111111111ddbbffddddbbbf1ffff1111
                            11f11ddffffdd111111111111dddbbfffffffffff111f111
                            1f111bbbffddd11111111111ddddbbfbf11111f111111f11
                            1f111fffffddd11111111111ddddbbff1111111f11111f11
                            1f111dddffdddd11111111dddddbbbffddd1111f11111df1
                            1f11dbbbffddddd11111dddddddbbbfbfff11111f111ddf1
                            1fd11fffffdddddddddddddddbbbbbfbf111111df11ddbf1
                            1fbddddfbfbddddddddddddbbbbbbff1fddd11dbfdddbbf1
                            1ffbbbbfbfbbddddddbbbbbbbbbbff111fffddbfbbbbbf11
                            1fdffffbbffbbbbbbbbbbbbbbbbffb111fdddbbffffff111
                            11fdfbbbbbffbbbbffffffffffffbd111fbbbbfbfbbbf111
                            111ffbbbbbbfffffbdddddbfffffbdd111ffffbbfbbf1111
                            1111fbbbbbbbffbdd111111ddbffbdddd11111bbffff1111
                            11111ffbbbbfffd1111111111dffbbdddddddbbbfffbf111
                            1111fddffffffb11111111111dbffbdddddddbbbffbbf111
                            111fd11dddfffd111111bfff11dbfbbdddddbbbbffbbf111
                            111fd11dddbf1f11111bfbd1f11dffbbddbbbbbbffbbf111
                            111fbddddbbfff1111bfb111f111bfbbbbbbbbbffbbff111
                            111ffbdbbbbf1f1111bffb11f111dffbbbbbbbfffbffb111
                            111bffbbbbffff1111f1bfbfb1d1dfffbbbbffffffff1111
                            1111fffffffffb1111b11ffb1dbddffffffffffffffb1111
                            1111bffffffd1111111bffb1ddfddfffffffffffbbf11111
                            11111bfffffb11111111111ddfdddffffffffffbbbf11111
                            111111bfffffffffffffffffbdddbfbbbffffffbbff11111
                            1111111bfffffbfffffffbdddddbfbbbbbfffffbffb11111
                            11111111ffffffbfffffbddddbffbbbbbbffffffff111111
                            11111111ffbbbffbbbbbddbffffbbbbbbbfffffff1111111
                            1111111bdddbbfffffffffffffbbbbbbbbbfffbbf1111111
                            1111111f11ddbbfffbbbffffffbbbbbbbbfffbbd1f111111
                            111111b1111dbbffbbbbbfffffbbbbbbbbffbbd111f11111
                            111111fd111ddbbffbbbfffffffbbbbbfffbbdd111b11111
                            1111111fdfffbbffffffffffffffbbfffffbdd111f111111
                            11111fffbbdbff11bfffffffffffffffffbfdbfffffb1111
                            11bff11111dffbf111bffffffffbfffffb1fff111d1dffb1
                            1f11f111fdbfddbf1111bffffb11111111f11fb1fb1df11b
                            1fbdfdbdfbbfbbbf111111111111111111fdbfbbfbbbfbbf
                            1bffbfffbff1fffb111111111111111111bffbffbfffbff1
                        `, SpriteKind.Creature)
            case 77:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111f411111
                            1111111ff111ff4111111111111111111111111f44f11111
                            111111f44f44114f411111111111111111111f4114411111
                            11111f44f44111141f11111111111111114f41111f111111
                            1111f4444111111444f11111111111111411111144111111
                            11114414111111144141111111111111f4111114f1111111
                            111f111411111144441f1f41111111114111114f11111111
                            111f1141111114444441f11f11111114411444f111111111
                            111f11411111444444441444f111111f1144411f41111111
                            111f114111144f444444444444111114144441111f111111
                            111f14411114f44f444444444f1111414444411111f11111
                            111f44411114f44f444444444f1111f14444441111141111
                            1111f444114f144f44441444441111f144444411111f1111
                            1111f4441144144f444411f4114f11414444441111f11111
                            11111f41141111144441111ff441f11f144444411f111111
                            1111f411111ff111444111144441f11f14444441114f4111
                            1111f41111f1f1111444444444111f1f4444444411114111
                            1111441111fff11111444444111114f1f444444441144411
                            1114111111ff11111114444444f11444fff4444441144f11
                            111f1111111111f4111111444414ff411111f44441444f11
                            111f444111111f44111111111111111111111f4444444411
                            111f44444111f4441111111111111111111111f44444f111
                            11144444441ff4411111111111111111111111f444f41111
                            1111f4444f4ff441111111111111111111111114ff111111
                            111114ff41f1f41111111111111111111111111f11111111
                            11111111111141111111111111111f111111111f11111111
                            11111111111f44111111141111114f111111114f11111111
                            111111111ff44f11111144f1111444f11111144411111111
                            11111111f1444f1111144f444444444f1111114441111111
                            1111111f11444f11111444fffffff444f1111114f1111111
                            1111111f4444f1111144f11111ff44ffff11111144111111
                            1111111f4444f114444f1111111f44444fff11111f111111
                            11111111f444f44444f111111111f444444ff11114411f11
                            111111111ff4f444444ff41111111f44444fff1114f1f4f1
                            11111111111f44444444f111111111f4444f11f1444f44f1
                            11111111111f444444ff11111111111f444f111f444444f1
                            11111111111f44444f111111111111f4444f111f44444f11
                            1111111111f4444ffffff41111111f444444f111f444f4f1
                            1111111111f444444444f1111111f44444ff1111f4444f11
                            111111111f44444444ff11111111ff44f44f1111f444f111
                            111111111f444444ff111111111f4fff1ff11111f444f111
                            11111111fff44fff11111111111fffff11111111f44ff111
                            1111111f4fffff1111111111111fffff11111111fffff111
                            1111111ffffff11111111111111fff111111111f4ffff111
                            11111111ffff111111111111111111111111111fffff1111
                        `, SpriteKind.Creature)
            case 78:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111144111111111114fff41111111111111111111111
                            114111111ffff111144111111111f111114f11111111111111111111
                            11411111f11f4ff11141111111ff11111111f1111111111111111111
                            1144111f1111f41ff1111f411f444f44441114f11111111111111111
                            1114111111111f444f111f14f4f4444f4444111f1111111111114111
                            11111111111111f4444111f144ff44114f444441f111ff1111144111
                            11111411111111f444f1111f44f4111114f4444414ff114f11441111
                            111114111f1111f444441111f44111111444f44411444111f1111111
                            1111411114111f44444f1111f4ff111114444f44444441444f111111
                            11144111f441f4414444111f4f1f1111144444f44444141111111111
                            1114111f44f44441444114f44f4111114444444f4444414411111111
                            111111f44444411444f1f444411111114444444444444111f1111111
                            11111f444411111444f44f411111111444f44444f444411114111111
                            1114f4411111114444ff4111111111444ff444444f4444111f111111
                            11f111111111144444f411111141144fff44441144f4444411411111
                            1f1111111144444444f1f11114444fffff444111144f444441f11111
                            1411111144444444444f14fffff411f4ff4441111114f444411f1111
                            4111114444444444444f11111111f4444f4411111114444441114111
                            f111444444444444444f1111111f14444f44111111114f444111f111
                            411144444444444444f1111111f114444f441111111144f441114111
                            14144444444444444444f11111411144f4f111111111144f41111411
                            1f1444444444444444ff1111141111f444f111111111144f44111f11
                            1f144444444444444f1111111f11f44444f1111111111144f4111411
                            1f14444444444444f4fffffffff444444441141111111144f4114111
                            1f144444444444ff44111111111111144441114111111444f41f1111
                            141444444444f4411111111111111111111111141111444ff4f11111
                            11f14444444f4111111111111111111111114414414444f44f111111
                            1141444444441111111111111111111111111441444444f44f111111
                            1f1f144444f1111111111141111111111111114444444f4444411111
                            1f114444444111111111114411111111411111444444f44444441111
                            11f44f4444111111111114444111111441111144f44ff444444f1111
                            111ff1f44f1111111111144f4441114f41111114f4ffff444444f111
                            1111111f4f111111111444f44444444441111114ff111ff444444411
                            111411111f11111114444ff444444444f4111114f1114ffff4444f11
                            114411111f1111114444fffffffffffff4111114f114fff4ff444441
                            114111111f111114444ff444444f11111f411111f11fff4444ff44f1
                            114111111f1144444fff444444411111114111114114f44444444441
                            1111f111f1111444ff4f444444f1111111f1111144111ff444444f11
                            1111f1114111444f411f444444111111111f11114f111114ffff4111
                            111f4f1f111444f1111f44444f1111111111f1114f11111111111111
                            11f144ff11144f11111f4444411111111111411144f1111111111111
                            11f144441114f11111144444f111111111111f1144f1111111111111
                            111f4441114f111111114444f1111141111111f1144f111111111111
                            111f4441114411111111f444f11111441111111f144f111111111111
                            1111f441144111111ff1f444f111111441111f441444f11111111111
                            1111f4f114f111411f4ff444411111111114f1444144411111111111
                            11111f111441114411f4444444111111111114f44144ff1111111111
                            111114111411114411f444444f11111111111114f44444f111111111
                            111141114f111111111fff444f111111111111111444444f11111111
                            1111f1144f11111111111f444f1111111111111111f4444441111111
                            1111f1444111111111111f444f11111111111111114444fff4111111
                            11114144f111111111111ff444f1111111111111111fffffff111111
                            1111fffff111111111111ffffff1111111111111111fffffff111111
                            1111fffff4111111111114fffff11111111111111114fffff4111111
                            11114fffff1111111111114ffff411111111111111114fff41111111
                        `, SpriteKind.Creature)
            case 79:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111311111111111111fffffffff11111111111
                            11111f11111111111fff3ddddddd3ff111111111
                            111131ff311113fff3dddddddddddddf31111111
                            1111f11113fff31ddddddddddddddd3d3f111111
                            11113d1111d1d1d1d333333dddd3d3d3d3311111
                            11111fd111111d1dfffffff3333d3d3d33f11111
                            1111113fdddddff31111111ff3d3d3d333f31111
                            111111113fff3111111111113f3d3d333fffd111
                            11111111111111111113ffffff333333ffffd111
                            11111111111111113ff333dddddf3fffffffd111
                            1111111111111ffff333dddddddddf3fffffd111
                            1111111111ff3df3333ddddddd11dddffff31111
                            11111113f3dddf3333ddddddd1111dd11ffd1111
                            1111113dddddf33333ddddddd1111dfdd11f3111
                            111113dddfff333333ddddddd3ff3ddfddd11f31
                            111113dff3ddff33333dddddfddddfddfdddd111
                            111131f333ddd3ffffff333fddddddfdf3dddd31
                            1111f1f333dff33d11dddfffddff11fd3f3dd3f3
                            1111ff333f33dddd11dd333fdfdd11fddf333f1f
                            1111df33f11dddddddd311d33f3dd3fdd3f33f1f
                            11111df31f11ddddddd1111133f33fdd33ffff1f
                            111111ff1111dddddd3111f1133ff33333fdddf1
                            1111111f1fffffff3331111113d3f33333f11dd1
                            111111fff311111d3fff111113d333ff3f111111
                            1111d3fd111111111111ff113dd33333fff11111
                            111fff111111111111111dfffd3333dd113ff111
                            11f3df111f1111f111111111df333ddddd113f11
                            df3ddf111dddddddd11111111df3dddddd111df1
                            f1f333fdd3fffffff3dddd1131df3dddddddddf1
                            f1f3333fffffffffffffffff11df33ddddd3fff1
                            fddf3333fd1ff33333fd1ff111df3333dd3f11f1
                            fddff33f13f33333333ffff111f3f333333f1df1
                            1ff3dfff11ff3333333fff111dff3fffffffdfd1
                            11ddddd3f111fffffff3d111dfddddddddddff11
                            1111111ddf31111111111d3ffddd111ddddd1111
                            1111111111ff311111d3fffd1111111111111111
                            1111111111111ffffff1d1111111111111111111
                        `, SpriteKind.Creature)
            case 80:
                return sprites.create(img`
                            11111111111111111111111111111fff311111111111111111111111
                            111111111111111ff11111111111f3dd1fd3fffffff3d11fffff1111
                            11111111111111f31f111111111f333d3ff33333ddddf3f33d11f111
                            11111111111ffffd11ffff11111f3333f33ddddddddddf3ddff11f11
                            11111111111fd1fd111d1311111f333f3dddddddddddddddf11fdf11
                            111111111111f3fd1111f1111111ffffff33dddddddddddf3ddddf11
                            1111111111111ffdd1113f1111113f333dddddd3fff3dddff3dd3f11
                            111111111111113dd11113111113f33ddddddd3f111f3ddd3f33f111
                            1111111f31111f3dd11111f111ffffff3dddddf11111fdddd3ff1111
                            1111111f1f111f3ddd11f131ffd1111dff3333f11f11fdddd33fd111
                            1111111fd1f31f33dddfdfdfdd1111111dff33f11111fdddd33f3111
                            11111113dd11fff3ddfd1ffffd111dff111dff3f111f3ddddd33f111
                            11111111fddfd111ffdd1f3d3fddddf111111dfffff3dddddd33f111
                            11111111f3df11dddfd11fd113fffddd1111111ff3dddddddd33f111
                            111111111f3d111dddd113111df1ffffddd11111dff3dd3dd333f111
                            1111111113fd1111ddd1f11113fffffffffdd11111dff3ddd333f111
                            11111111113f1f1111f3111ddfd1ffff311ffdd11111dfddd33f3111
                            1111111111fdf1f11111ddd3fd111f1ff1fffffdddf1dfdd333fd111
                            111111111f3df1fddddd3ffdd111f1dfffffffffdfdd3fd333fd1111
                            111111111fdf31dfff33ddd1111f1ddff333f333fdddf33333f11111
                            11111111f3df3d11fddd11111dd1dddf333f3333fdddf3333fd11111
                            11111111fddf3d11f111111dddd33d1f333333ff1ddf3f33fd111111
                            1111f111f3d3f3dd111111111dddddffffffff11113ff333fffd1111
                            111f1f11f3ddf3dd31111111111dddd3fdddf11111ff3dddd33fd111
                            111fdf111f3ddf3311111111111dd3ffffdf1f111f33dddddd33f111
                            111fd1f1ff33dddd113f1111dd3fff3d11f31f1df33dddddddd3fd11
                            111f3d1f33ff333dddf1fddfff3d11111dfd11f333331dddddd33f11
                            111f3d1dddd3fffffffd1ff3d1111111df3d1df3333f11dddddd3f11
                            1113fdfdd1111dddddf311f1111111ddddd11f3333f111dddddd3f11
                            1111f3fd111111111df3d11f1111dddddd11df33ffd111ddddd33f11
                            11113fdd1111111ddd133d11f1111dddd11dfdffdd111dddddd33f11
                            11113fdd11111111dd1333d1f111111dddffdfdd1111dddddd33fd11
                            11111f3d111111111d33333f1111111111ddfdd111dddddddd33f111
                            11111f3dd111111111d333d111111111133ffdddddddddd3333f3d11
                            1111d3f3ddd111111111dd11111113ff3111fddddddd333333f33f11
                            111d3f3ff3ddd1111111111dd3ff31111111f3dd33333333ff333f31
                            11d3f33d3ff3ddddddd3ffff3111111111d13f33333333ff333333f1
                            113ff3dddddd3fffff311111111111111d31df333333ff33dd3333f3
                            1dff3dddd31111111d111d311111111dd3fdd3ffffff33ddddd3333f
                            13ff3dddff3d11111311dd311111dd3fffdddd3f3333dddd3ff3333f
                            df3f3dd31dff3d111df1df111dd3fffd3fdddd3ff1111111dd3f333f
                            3f3f3ddd111dff3d1df1dfdd3fffdd1113ddddf11111ddddddd3f33f
                            f33f3ddd1111fdf3d1df13fffddf111111dddf11111ddddddddd3f3f
                            f33df3ddf1111dd3f1df13f3d11111111dddf1111ddddddddd3d3f3f
                            f3ddf3dddf111f3d111311ddf3111111fddffff1ddddddddddd3d3f3
                            f3dddf3ddd3f3dd111111111ddff311f3df1111fddddddddddd3d3f3
                            f3dddfff3ddddd1111111111111ddf3dd3f1111f3dddddddddd3d3fd
                            f33dddf1fff33dd111111111ddddddd3ffffd1df3dddddddddd33f31
                            df3ddd311f3ffff33ddddddd333fffffff3ffddf33dddddddd333fd1
                            1f33ddd3fddf111fffffffffffff111ff333ffffff3dddddd333f311
                            1df33dddddddfffdddddddf11133f1ff3dddfdf111fdddd33333fd11
                            111f333dddd3ddd3ddddd3d333dd3ff3dddfd1fd1df33333333fd111
                            111dff333dddddddddddddddddd3ff3ddff3111fddf333333ffd1111
                            1111d3fff33ddddddddddd33ffff3ddff3d1111dff33333ff3d11111
                            1111111d3ffff333333fffff333dfff3d111111113fffffdd1111111
                            11111111111d3fffffffffffffff3dd111111111113333d111111111
                        `, SpriteKind.Creature)
            case 81:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111ff1111111111111111111111111
                            111111111111fb1f111111111111111111111111
                            11111111111fb1f1111111111111111111111111
                            11111111111fdfdf1dffffbd1111111111111111
                            111111111111f1fdffbbbddff1111ff111111111
                            111111111111111fbb1dd11dbf1ffddf11111111
                            11111111111111fbddddd11ddff1dddff1111111
                            1111111111111dfdddddddddfbb11bfddf111111
                            1111111111111fbdddbbbdddfbbfffdddf111111
                            1111111111111fdddb111bddfbbbf111ff111111
                            1111111111111fddb11111bddfbbbbff11111111
                            1111111111111fddb1f111bddbffff1111111111
                            111111111111ffbdb11111bdbbbfb11111111111
                            1111111111ffbbfddb111bddbbbffff111111111
                            11111111ff111bfbddbbbddbbbfd1b1f11111111
                            11111111fd11bfffbddddbbbbff1bdbf11111111
                            11111111fddff1bbffbbbbbffbdf1b1f11111111
                            111111111ffd111ffffffffbd111fff111111111
                            1111111111fddff1f1fddd111111111111111111
                            11111111111ff11ffffb11111111111111111111
                            111111111111111f1b1f11111111111111111111
                            111111111111111bfdbf11111111111111111111
                            1111111111111111dffd11111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 82:
                return sprites.create(img`
                            11111111111111111111111fff1111111111111111111111
                            111111111111111111111fbd11bf11111111111111111111
                            11111111111111111111fddbbb11f1111111111fb1111111
                            11111111111111111111fbfffffbf111111111fddf111111
                            111111bf1111111111111ffd1dff111111111ff11df11111
                            11111fddf1111111111111ffffb111111111ff1111f11111
                            1111fd11ff1111111111fb11111ff111111ffbb11f111111
                            1111f1111ff1111111fb111111111fb111ff1bbbf1111111
                            11111f11bdff11111f1111111111111b1ff1ddbf11111111
                            111111fbbb1ff111f11111bffb111111ffddddf11111ff11
                            11ff111fbbb1ff11bd111f1111f11111fbbbdf11111f1df1
                            1fddf111fbbbdf1fd11db111111b1111fbbbff111ff111df
                            fdd11f111fbbbbfbd11df111111f1111bbbfff1ffdbb11df
                            fd111bff1ffbbbfdddddf11f111f1111fbbbfffbddbbbff1
                            ff11bbbffffbbbfdddddb111111b1111fbbbbbbbbbbff111
                            11ffbbbbbfdbbffddddddf1111f11d1dbfbbbbbbbff11111
                            1111ffbbbbbbbffdddddddbffbd1d1d1bbffbbfff1111111
                            111111ffbbbbf11bfffddddddddfff1d1f11ff1111111111
                            11111111ffff111f1d1fbbddddf1d1f1df11111111111111
                            11111f1ff111111fdbdfbbbbddfdbdfdf11111111ff11111
                            1111f111ff11111f1d1fbbbbbbf1d1f1b1111111f11ff111
                            1111ff1dbff11111fffbbbbbbbbfffdf11111111fd11ff11
                            111f1ffbbdff111111ffbbbbbbbbdfbf111111111fd1ff11
                            111b11ffddff11111111ffbbbbbfbf1ffffb1111fdfd11f1
                            111f1dbffddff111111111bfffbffbdf11d1ffff1dbfd1f1
                            1111fbbbfddff1111111111fbfffbdf11d1d1dfb11f1ff11
                            11111fbbddbfffb1111111fbbffbdf11d1d1d11bbf111111
                            111111fbfbd111dbf1111bfbf11dfbf11d1d1111f1111111
                            1111111fd1111111df1111ff11ffbbf111d1d1111f111111
                            111111fd111111111df1111bff11ff11111d11111f111111
                            111111bd111111111db111111f11111111bffb111db11111
                            11111bdd111111111fdf1ff1fdd111111f1111f11df11111
                            11111fddd1111111bdfdfbdffddd111db111111bddf11111
                            11111fddddd111ddb1b11b1dfdddddddf11f111fddf11111
                            11111fdddddddddbbdfdfbdfbbddddddf111111fddb11111
                            11111bdddddd1ddbbfdf1ff11fbfffddb111111bdf111111
                            11111bfdffddddddbbb111111ff1d1fddf1111fddf111111
                            111111fbbbbfddddddf1111111fdbdfbddbffbddfff11111
                            11111fbbbbbbfddddf11111111f1d1fbbdddddffdddff111
                            11111fddffddfddbf1111111111fffbbbddddfbddddbbf11
                            1111fbdfffddffb11111111111111ffbddddfbbbffbb11f1
                            1111fbbffddff111111111111111111bfffbfbbfffff1fff
                            111f11fffbdf111111111111111111111111fbbffb1ffffb
                            111f11ff11ff111111111111111111111111fbbbf111ffb1
                            111fffff11f11111111111111111111111111fb11f111111
                            1111ff1ffff111111111111111111111111111fdfff11111
                            1111111fff11111111111111111111111111111fffb11111
                            111111111111111111111111111111111111111bfb111111
                        `, SpriteKind.Creature)
            case 83:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111fff1111111111111111111f1111111111111
                            1111111ff111f33f1111111ee111111111ff111111111111
                            111111f13f111f31f111111ffe111f1111fe111111111111
                            1111111f13f11fe3f11111efefe11ff111f3f11ffe111111
                            11111111fe3f11f31f1111feeef11fef11f3f1feef111111
                            111111111fe3f1fe3f111efeeefe1f3f11f33f133fe11111
                            11ff111111fe33ef31f11feeeeef1e3e11f3f113eff11111
                            1f11fff1111fe33f333fffeeeeefe1f3f1ff3111fe3f1111
                            1ff1133fff1fe333e333eeffee3ef1f3e1f13311f33ef111
                            111fffe333ff3333e333333efe3eeff33f11331f1333f111
                            111111ffe33333e3333e3333efeeeef33f3133ef113efe11
                            11111111fee333f333ef33333efee3fefe3113f3111fef11
                            1111111fe33333fe3efe33333effffffe3331ef3311f3fe1
                            1111111f333133ffeff3111333fe33ef33331f13331f1ef1
                            111111fe33ef13efff3effe133ef33f333333f1133f113f1
                            111111f33f11e13ff3f1111f13ef3e333333fe311ef111f1
                            111111f33f1efe1fee111111f3efef31333ef3311fe311f1
                            111111f33f1fffe33effe111feeef311333fe3331f131fe1
                            111111f33f1f1feeefeffe11feeef31333ef3333f113ef11
                            1fe111fe3efe1ffffe1ffe11feef333333ee333ef311ef11
                            f13fe11feeeffe33ef1ffe11eeef333333e3333fe331ef11
                            f1111effeefe331111ff311feeef3111333333ef3331fe11
                            1ff31111ffe33111111efffeeef31111133333fe333ef111
                            111ef3111fe31111111113efeef3111113333ef333eef111
                            11111ef31fee333311113333fefe11111333ef333eefe111
                            1111111fffe3331111effe3ef3fe3111333ee3333eef1111
                            111111111f3311111efe33ffe3fe333333333333eefe1111
                            11111111f3311113ffffffe3333fe3333333333eeef11111
                            1111111f3111113f1113ffee333fe33333333eeeefe11111
                            111111f1111111ff3311113fffeefee33eefffffffffe311
                            1111ff31111111eefff31113333ffffffffeeeeeeefe3111
                            111f311111111e3feeeefff33333333eeeee3fffff311111
                            11f311111111f3feeee3eeefff3333333eeeeeeffffff111
                            11f31111113f3feeee311133eeefff3333eeeeeeeee1ef11
                            11f3111113f3feeee31111133333eeefffeeeeeeee1ffef1
                            11f33111ff3feeee311111113333eeeeeeffffeeee3feef1
                            111f3eff33ffeee311111111333eeeeeeffffefffff3efe1
                            1111fffffe1fe31111111111133eeeeeffff11113eeffe11
                            111111111111fe311111111113eeeeeffff1111111133111
                            111111111fff3ff3111111113eeeefffff11111111111111
                            1111111fe11133ffe311113eeeefffffe3ffe11111111111
                            111111ffffffff33ffe33eefffffffee33333ffe11111111
                            111fff31111111ee13fffffffff1fe11fffe3111ffffe111
                            11f11111133efe113333feee11111f33111fffe11e111fe1
                            11efff333eff1111133fe331111111f3331111fe33f311f1
                            11111effffefe1333ffe31111111111ff3333fffffefff11
                            1111111111111ffffe11111111111111efffe11111111111
                        `, SpriteKind.Creature)
            case 84:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            111111111111111111111111111ff11111111111
                            1111111111111111111111111ff11ff111111111
                            111111111111111111111111f311333f11111111
                            11111111111111111111111fee333333f1111111
                            1111111111111111111111fe1fe333eeef111111
                            1111111111fff111111111feffe33e1fef111111
                            11111111ff111ff1111111f3ee333effef111111
                            111111ff111113eff11111f3333333eeef111111
                            11111f3331113333ef11111f3ff3333eef111111
                            11111f3e333333333f1fff11f11fe3eef1111111
                            1111f3e1e3333eee3efe3efff13efeef11111111
                            1111f3efe333e1ffeef3e3ef13fffff111111111
                            1111f3efe333efffeef33ef13fff111111111111
                            1111f3ee3333efffeefeef13fff1111111111111
                            1111f33333333eeeeefef13ffff1111111111111
                            11111f3ff333333eeefef3feefef111111111111
                            11111ff11f3333eeefeeefeeeeeef11111111111
                            111111f11f33eeeeffeeeeeeeeeef11111111111
                            11111f113feeeffffeeeeeeeeeeeef1111111111
                            11111f13fffffe33eeee3e3eeeeef11111111111
                            1111f13f1111fe3113e3e3e3eeeef11111111111
                            1111f1f111111f31113e3e3e3eef111111111111
                            111f13f11111fe331133e3e3eef1111111111111
                            111f3f1111111ff33113333eeff1111ff1111111
                            111ff1111111111ffe3333eff1111efeef111111
                            11f3f11111111111ffefeffffe11effeeeff1111
                            11ff1111111111111ffff1efffffffff3feef111
                            1111111111111111effe1111effff1ff3ff3ef11
                            1111111111111111fff1111111ef1f3f3f1f3f11
                            1111111111111111fff1111111111f3f1f11ff11
                            1111111111111111effe1111111111f3f1111111
                            11111111111111111fff11111111111f11111111
                            11111111111111111effe1111111111111111111
                            111111111111111111fff1111111111111111111
                            1111111111111111fffffff11111111111111111
                            11111111111111ff3feffeef1111111111111111
                            1111111111111f13f3f11ffef111111111111111
                            11111111111111ff1f11111ff111111111111111
                            111111111111111ff11111111111111111111111
                        `, SpriteKind.Creature)
            case 85:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111111111fffff11e111111111111111111111111111
                            11111111111111111111f11311fef111111111111111111111111111
                            1111111111111111111f113111eff1eff11111111111111111111111
                            11111111111ffff111f111311eff1efff11111111111111111111111
                            1111111111f1111f1f3133111ff11fff111fff111111111111111111
                            111111111f131111ff3313131ff1efe1fff111ff1111111111111111
                            11111111f11311113f333331ffffff1f31111311f111111111111111
                            11111111f11131113f333eff3efffff3311131111f11111111111111
                            11111111f11131113fe3ef3333fe33f3131331111f11111111111111
                            11111111f11133133efef33333e3333f313311111f11111111111111
                            11111111f11113333eff333333333333f31311111f11111111111111
                            111111111f3333333eff1133333333331f333111f111111111111111
                            1111111111fe3333eefff11333333111ef333333f111111111111111
                            11111111f11feefeeef3ff1133331fffefe333ef1111111111111111
                            11111111ff11fefeeef3f1f13331f1ffefeeeef11111111111111111
                            11111111eff11ffeeeef3fff333ffffeefeeef111111111111111111
                            111111111ff11effeeef3333333333eeefeef1111111111111111111
                            111111111eff1ff1feeef33effe3eeeefeef11111111111111111111
                            1111111111efffff1feeeff111feeeefeef111111111111111111111
                            111111111ffefffefffeeff113ffeffeef1111111111111111111111
                            11111111f113ffe33efffef113fffefff1111111effffe1111111111
                            1111111f1113fe3333efeef133fffeeef111111effe1111111111111
                            1111111f111ef33333efeef13effe3eeef11111ffe11111111111111
                            111111f3f133333333eefef33fee3e3eeef1fffff111111111111111
                            111111f3f1333331113efff3ef33e3eeeeffffffeffffe1111111111
                            111111f3ff333311111efff3fe333e3eeffe31feffffffe111111111
                            111111f3f333313efffefff3f3333efffe3331ffffeef11111111111
                            111111f333333fff1feefffef333effff33331efe133ef1111111111
                            1111111f333333ffffeeffff3333efffe333331e13331ef111111111
                            1111111feff33333eeefff33333e3eff3333333333311ef111111111
                            11111111f11f33eeeeffe3e33ee3eeef3333333333311ff111111111
                            11111111f111feeefffeee3efe3e3eff333333333331fff111111111
                            1111111f111fffff11ffeeeeffeeeeff333111333331fef111111111
                            1111111f133ff111111ffeeffffeefffe31ff11333333ef111111111
                            111111f113ff1111111ffffffffffffff31ffff1f333eef111111111
                            111111f13ff111111111fffffffffff1fe31f1ff333eff1111111111
                            111111f33f111111111111ffffffff111fe33333eeef11f111111111
                            11111f13f1111ffff11ffffefffff11111ffeeeeeeef111f11111111
                            11111f1ff111f33fffffeeeffffff1111111ffffffff3331f1111111
                            11111f3f111f113f3effffff11fef1111111111111ffff331f111111
                            1111f3f1111f31f3eff3ff1111fef1111111111111fffff331f11111
                            1111fff1111f3ff1eff3ef1111fef11111111111111fef1ff31f1111
                            1111ff111111ff33ff1ef1111feef11111111111111fef111f31f111
                            1111f11111111f3effeef1111fef1111111111111111fef111f3f111
                            1111111111111f3f1fff11111fef1111111111111111fef1111f3f11
                            11111111111111f111111111f1ef1111111111111111fef11111ff11
                            111111111111111111111111f3f111111111111111111fef11111f11
                            11111111111111111111111f3ef111111111111111111fef11111111
                            1111111111111111111111ffef11111111111111111111ff11111111
                            111111111111111fffffff3efef11111111111111111111f11111111
                            11111111111111f133ee3eeffef11111111111111111111111111111
                            1111111111111f33eff3eff1f1ef1111111111111111111111111111
                            1111111111111fffff1ef1111f1ef111111111111111111111111111
                            1111111111111111f1ef111111f3ee11111111111111111111111111
                            11111111111111111ff11111111fff11111111111111111111111111
                        `, SpriteKind.Creature)
            case 86:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            11111111111111111111116fff611111111111116ff61111
                            111111111111111111111611111f11111111111fbbbbf611
                            111111111111111111111ff11111f111111111f111bbbbf1
                            111111111111f111111161111111161111111f11111bbff1
                            111111111111f1111116bb1111111f111111f111111bbbbf
                            111111111111f111111fbb11111111f1111f111111bbbbbf
                            11111111111fbf111116bffb1111111f11f11111bbbbffbf
                            11111111111fbf111111fbbbb1111111f1f1111bbbbbbbff
                            11111111111fb6f111111fbbbbb11111161111bbbbbbbb6f
                            1111111111f1bbf1111116bbbbbbbb111f11b6ff66bbb6f1
                            111111111ff11b6fff61116f6bbbbbbb111b6f11fff666f1
                            1111111ff1f11b6f111f611116ffff6b11bff111111fff11
                            111111fb11f1bb6f11111ff1111111f611b6f11111111111
                            11111f11111fb6f1111111bf1111111f11b66f1111111111
                            1111f111f111ff111f11111bf1111116111b66f111111111
                            1111611f1f111111f1f1111b611111116111b6f111111111
                            111611111111111111111111bf111111f1111b6f11111111
                            111f1116f11111116f111111b6111111611111b6f1111111
                            116111f1ff11111f1ff1111bbb611116111111bb6f111111
                            11f111ffff11111ffff1111bbbf1111f111111bbbf111111
                            11f1111ff1111111ff1111bbbbf111f11111111bbbf11111
                            11ff11fff111116fff61fbbbbbf11f111111111bbb611111
                            11616f111f1ff61111161fbbbbbff1111111111bbbb61111
                            1611f11111fff11111fb1fbbbbbf11111111111bbbbf1111
                            1f111f111b6f611111611bfbb1bbf111111111bbbbb61111
                            1611bbfbbbbbbbb11f11b6fb1111bf111111bbbbbbbb6111
                            11fbb66fbf6b6f6bb6bb66f1111111f611bbbbbbbbbbf111
                            1116ff66f66b66f6fb666f1111111111f6bbbbbbbbbbf111
                            111111f6f6b666ff1ffff1111111111111f6bbbbbbbbf111
                            11111f1bf61666f111111111111111111111bbbbbbbb6111
                            11111f11f61666f11111111111111111111111bbbbbf1111
                            11111f111f666f111111111111111111111111bbbbbf1111
                            11111f1111fff11111111111111111111111111bbbb61111
                            11111f111111111111111111111111111111111bbbf11111
                            111111f1111111111111111b61111111111111bbbb611111
                            111111f1111111111111111b6f11111111111bbbbf111111
                            111111ff1111111111116111b6f111111111bbbbf1111111
                            11111fbf111111111111f111b66fb11111bbbbbf11111111
                            11111f1bf1111111111bf111bb6f6bbbbbbbbbf111111111
                            1111f11bbf111111111bf111bb66fbbbbbbb6f1111111111
                            1111f11bbbfbb1111bbbf111bbbb6f6bbb6f111111111111
                            111f111bb6ff6bbbbbbb6111bbbb66f66f11111111111111
                            11f111bbb6f11f6bbbbb6f11bbbbb66f1111111111111111
                            11f16bfb6611111ff6bbbf1bbbbbbf66f111111111111111
                            111f6f66ff111111116ffffbbfbb66fff111111111111111
                            1111ffff111111111111111ffbf6666f1111111111111111
                            1111111111111111111111111ffffff11111111111111111
                        `, SpriteKind.Creature)
            case 87:
                return sprites.create(img`
                            11111111111111111fff1111111111111111111111111111
                            111111111111111ffbbbff11111111111111111111111111
                            11111111111111f111bbbbff111111111111111111111111
                            1111111111111f1111111bbbff1111111111111111111111
                            111111111111f1111111111bbbff11111111111111111111
                            111111111111f111111111111bbbff111111111111111111
                            111111111111f1111111116ff11bbbff1111111111111111
                            111111111f11fb11111166bbb6f11bbbf111111111111111
                            11111111f1f11fb11111bbbbbbb6f1bbbff1111111111111
                            11111111f11f1fbb111111111bbbb611bbbf111111111111
                            11111111f11bfff6bb111111111bbb6f11bbff1111111111
                            11111116f1b6fbbbffbbb11111111bbbbbbbb6f111111111
                            111111f11fff11111bfbbb66611111bbbbbbbb6f11111111
                            111116b111111bbb111fbbbbb666ff1bbbbbbbb6f1111111
                            11111ffb1111bbff1111fbbbbbbbbbffff6bbbbb6f111111
                            11116f1f1111bff1f111fbbbbbbbbbb66666fbbbb6f11111
                            1111fff61111bffff1116fbbbbbbbb6666ff1fbbbb6f1111
                            1116f66bbb1111ff1111bfbbbbbb666fff1111fbbb66f111
                            111f1116f1111111111116fbbb6ffff1111111fbbbb6f111
                            111f11111111111111111b6ffff11111111111fbbbb66f11
                            1116b1111111111b111111bb6111111111111fbbbbbb6f11
                            1111fbb111111bbf11111111bff1111111111fbbbbbb66f1
                            11111fb6ff6bbbf11111111111b6ff111111fbbbbbbb66f1
                            111111ffbbfff611111111111111bbff11ffbbbbbbbbb6f1
                            11111f1fbbf1f1111111111111111bb6fffbbbbbbbbbb6f1
                            111111fbbbbf111111111111111111bbb66ffbbbbbbbb66f
                            111111fbb1111111111111111111111bbb666fbbbbbbb66f
                            111111fb111111111111116111111111bbb666fbbbbbbb6f
                            11111ffb1111111111111bb611111111bbbb66fbbbbbbb6f
                            11111ff611111111111111bbf11111111bbbb666bbbbbb6f
                            11111fbf111111111111111bf11111111b6bb66f111bbb6f
                            1111f1bf1111111111111111bf11116111b6bb6f1111bb6f
                            1111f1bb6111111111111111bbf1111611bb6b6611111bf1
                            111f1bbbf1111111111111111bf1111611bb6bf111111bf1
                            11f11bbbf11111111111111111bf1116111bb6f111111b61
                            1f11bbbb6611111111111111111f1111611bbf1111111611
                            1f1bbbbb6f111111111111111111f111611bbf1111111f11
                            1fbbb6bbb6f11111111111111111f11161bff11111116111
                            1fbb6bbbb66f11111111111111111fff1ff111111111f111
                            11fb6bbbb666f111111111111111111111111111111f1111
                            111ffbbb6666f11111111111111111111111111111f11111
                            11111fff666f1f111111111111111111111111111f111111
                            11111111fff1116f111111111111111111111111f1111111
                            1111111111111111f1111111111111111111111f11111111
                            11111111111111111f6111111111111111111f6111111111
                            11111111111111111116f61111111111111ff11111111111
                            11111111111111111111116ff61111116f61111111111111
                            111111111111111111111111116ffff61111111111111111
                        `, SpriteKind.Creature)
            case 88:
                return sprites.create(img`
                            11111111111111111111111111111bb111111111
                            11111bb11111111111111111bb11b11b11111111
                            1111b11b111111111111111b11bbbddbfff11111
                            1111b11f11111111111111b1111ddbbb11df1111
                            111b11ddb1111111111111bdddd1111dddbf1111
                            1bbddddd1ff111111111111fdd111dddbbf11111
                            b11dddd111df11111111111fbdddddbbbf111111
                            bdddbd11dddf111111111111bbdbbbbbbf111111
                            1fddddddddf111111111111fbbdddbbbbf111111
                            11fbbdddbbbfbffbbfff111fbbbdbbbbbf111111
                            11fbbbbbbffb1111dbbbbfbfdbbbbbbbbbf11111
                            111fdbbbfbdd111ddbffbbbfdbbbbbbbbbf11111
                            111fdddb11bdddddbf111fdfdddbbbddbbf11111
                            111f1dddf1fbbddbb11111bdbdddd11dbbf11111
                            111f1db111fddbbbf11f11fbf1dd11ddbf111111
                            1111fdf111b11dbbf11111fbfd1111dbbf111111
                            1111fdf11f11111dbf111fbbfd111ddbbbf11111
                            1111ff1fdddddd111dbffbbdbd111dbbbbf11111
                            1111ffddbbbbbdddd11dbbd11dd1ddbfbbbf1111
                            11111fbfffffffbbddd11111dbd1ddfbbbbf1111
                            11111fffbfffffffdbbdd1dddbbddbfbdbbf1111
                            11111fbfbbffffffdfbbff11dfbbbfbdddbf1111
                            11111fbfdbffffffdffffbddbfdffdddddfbf111
                            11111fbbddffffffdfffbbbddfdddddd11dbf111
                            11111fbbb1bfffffdfffddddbfdddd11d1dbf111
                            1111fbbbf1bffffbdbfbddbdbbd111111dbbf111
                            1111fbbbf1bfffddbbfbddbdfbbdd111dbff1111
                            1111fddbf1bffd11dbfb1dfdfbbfb111bfdf1111
                            11111fdbf1bfb111dbfdddf1fbbbfb11bfdbf111
                            11111fbbf1bfd111bbfd1dfdfbddbfddfddbf111
                            111111fbfdbbd11dbbb1ddbfbd11bfbbfddbbf11
                            11111bfdfdfbbddbbfd1dbfbbdd11bffbdbbbf11
                            11111f1dfbfbbbbbbb11dbbbbbbddddbbbbbbf11
                            11111f1dfbfbbbbbf11dbbfbbfffbbdddbbbfbf1
                            1111fdddbdfbbbbfb1dbbbfbbdbbfffbbbffbbf1
                            1111fbddb1bfbbff1dbbffbbddbbbbbfffbbbbbf
                            11111bbbf1dbffb1dbfffbbddbbbbbdbbbbbbbbf
                            111111fffd1dddddbfffbbbbbbbbbbffddbbbff1
                            11111111ffd1ddbffffbbfffbbbfff11fffff111
                            111111111bfffffbfffff111fff1111111111111
                        `, SpriteKind.Creature)
            case 89:
                return sprites.create(img`
                            1111111111111111111111111111111111111bfffb11111111111111
                            11111111111111111111111111111111111ff11dddf1111111111111
                            1111111111111111111111111111111111f1111ddddfb11111111111
                            111111111111111111111111111111111b11111ddddddf1111111111
                            111111111111111111111111111111111f1111ddddbbddf111111111
                            111111111111111111111111111111111f111ddddbbbfddf11111111
                            1111111111111111111111111111bfdf11fdddddbbbbfbdbf1111111
                            111111111111111111111111111b1111ffffdddbbbbfbbdbbf111111
                            11111111111111111111111111b11111ddddffbbbffbbbbdbf111111
                            1111111111111111111111111d11111d1d1dddfffbbbbbbddbf11111
                            1111111111111111111111111b1111d1d1ddddbbbbbbbbbdffff1111
                            1111111111111111111111111f11dddddbdddddbbbbbbbdfb111f111
                            1111111111111111111111111fdddddbbbbdddddbbbbdbbb11111f11
                            1111111111111111dbbfffb111fddbbbbbbdbbdddbbddbf11111d1f1
                            1111111111111bffd11111dffb1ffbbbbbbbbbddddb1d1f1111d1df1
                            11111111111bf111111d1d1dbbfffbbfffbbbbdbdd1d1df1d1d1ddf1
                            111111111ff1111111d1d1d1dbbffdf111ffbbbbbdd111fd1ddddddf
                            1111111bfddddd11111d1ddddbfbfdf11111fbbbbd1d1ddbbdddddbf
                            111111bddddddb11111dddbbffddfbdf11111fbffbd1d1dfbbdddbbf
                            11111fbdddbbbddbddbbbffbbddddbddf1111fbbbfbb1dbbfbbbbbbf
                            1111bbbbbbbd1bfbbbffd111b111dddddf111fdbbbfbbbbbbffbbbf1
                            111bddbbbd111dbffd111111bd1111dddbf11fdbbbbfbbbbbbbfbf11
                            111fdddd111ddbbbbb1f1111bbddd111dbf11f1bbbbbbbbbbbbbbf11
                            11b11d111ddbbbbbbbbbbbdbbbbbdddddbbf11fdbbbbfbbbbbbbbf11
                            11f11111dddbbbbbbbddddddddbbbdddbbbbf1f1bdbbbffbbbffbf11
                            11fd11d1ddddddbbbdd11ddddddbbbddbbbbdff1fddbbbbffffbbf11
                            11fb1ddddddddbbbbbd111ddbbddbbbdbbbddbf1dfddbbbbffbfbf11
                            111bdddddbdbbbbbbbbd11dbbbbdbbbbbbbddbbfdf1ddbbbfbbbdf11
                            111fbdbdbbbbbbbffffbd1dbbffddbbbbdbdddbfdbfdddbfbbbfdf11
                            1111fbbbbbbbffffffffbddbffffdbbbbddddddfddbbfffbbbbfdf11
                            111111fbbffffffffffffddbffffddbbbddddddffddbbbbbbbbf1f11
                            111111fbbbfffffffffffddbffffddddbddbbddfbddddbbbdbffbf11
                            1111111fdbbffffffffffbdbffffbdddbddbbbdfbfddddddbb11f111
                            1111111fdbfbffffffffffdbfffffdddddbbbbbfbbfddddfbf111111
                            1111111b1f1fbfffffffff1bfffffdddddbbbbfddbdbfffbbf111111
                            1111111b1f1fbfffffffff1bfffffbd1ddbbbbbddbbbbbbbbbf11111
                            1111111bdf11fbffffffff1bffffffd1ddddbbbdbbbbbbbbbbf11111
                            1111111fbf11fbffffffffdbfffbbfd11dddbdbbbbbbbbbbbf111111
                            1111111fbf111fffffffffbdfbdddfbd1dddddbbbbbddbbbbf111111
                            11111111f1111fffffffffbdfddddbfd1dddddbddbbdddbbbbf11111
                            11111111b111ffffffffbfbdfdddbbfd11dd1ddddbbddddbbbf11111
                            11111111b111bfffffbbdfbdfddbbbfd11dd11dddbbbddddbbf11111
                            11111111111fbffffbdddfb1fdbbbbf111dd111ddbbbbbddbbbf1111
                            1111111111ffbfffbd11dfb1fbbbbfb111ddd111dbbbbbbbbbbf1111
                            11111111bfbbfffbbdddddf1fbbbff111ddddddddddbbbbbbbbbf111
                            111111fbdfdffffbbbdddbfdfbbf1f111ddddbdddddbbbbbbbbbbf11
                            11111b1dfdffffbbbbbbbbfdfbbfdb11dddddddbbdddbbbbdbbbbf11
                            1111fbdb11ffffbbbbbbbbfdbfbbdddddddddddddbbdddddbdbdbf11
                            111f11bf11bfffbbbbbbbf1ddffddddbbfbbbddddddbbbbbdbdbf111
                            11bd111fbddbfffbbbbffbdddbbd1bbb1bbbbbbddddddbbbbbbbbf11
                            1bbdd1ddfb11dbfffffbb111ddddbbbfbbbbbbbbbdddddddbbbbbbf1
                            1bbbdddbbfb111111dddd11dddbfffbbbbffffbbbbbbdddbdbdbdbbf
                            1ffbbbbbbbbffb1ddddbbbbbbbbbbbbbfffffffffbbbbbbdbdbdbbbf
                            111fffbbfffffffffffffbbbbbbbfffffffffffffffffffbbbbbbfff
                            111111fffffffffff111fffffffffffffffffffffff1111ffffff111
                            1111111111111111111111111fffffffffffff111111111111111111
                        `, SpriteKind.Creature)
            case 90:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111fb111111111111111111111111111
                            11111111111bdf11111111111ff1111111111111
                            11111111111bf1f111111111f11f111111111111
                            111111111111bd1f11111111f1ddfb1111111111
                            1111111111111fd1ffffffffdddbddfb11111111
                            111111111bbffff11fddddd1bffdddddfb111111
                            1111111bfdddddb1111bbbffdddbbbddddf11111
                            11111fddddddd1bbbffddddd111ffffddddfb111
                            1111fddddddd1bfdddddddd11fbddddbbdfddf11
                            111bdddddd1bfdddddddd111fdddddddffddfb11
                            111fdddddbfdddddddd111fbddddddd1fdffb111
                            11bddddbfdddddddd1111fdddddddd1bddf1ff11
                            11fdddfbdddddddd111fbddddddddd1fddffdf11
                            11fbdfbddddddd1111fbddddddddd11fdfbdb111
                            111ffbbdddddd1111fbddddddddd11bdfbdbf111
                            1111fbdddddd1111fbddddddddd11dffbd1ff111
                            1111fbddddd1111fbddddddddd111bbdd1f1f111
                            11111fbddd1111fbddddddddd111dfdd1b11f111
                            1111ffbdd1111fbddddddddd111dfddff111f111
                            111fdbfb1111dbbddddd1111111bddd1111df111
                            111fdbbffd1dfbddddd1111111dfdd11111f1111
                            11fdbbbbfffffbddddd111111dfdd11111df1111
                            11fdbbbbffd1ffddddd11111dfddd11111ff1111
                            11fdbbbff1111ffbdddd111dfddd11111dff1111
                            11fdbbfff11f1fb1bfbbddbfbddd1111dfdf1111
                            11fdbffbff11bffbfffffffffbd11ddffbdf1111
                            111fdfbbffffffffffb11bfffffffffbbdf11111
                            1111fdbbffffffffff11f1ffffbbbbbb1df11111
                            1111fdbbfbbbffffffb11fffffbbbbbb1df11111
                            1111fdbfbbbbbbfffffffffffbbbbbb1dff11111
                            11111df1dddbbbbffffffffffbbbbbb1dff11111
                            11111f1dddbddbbfffffffbfbbbbbb1dfbf11111
                            11111f1ddbd11dbfffffbbffbbbbb1dffbf11111
                            11111f1dbd1111bfbbbbbbfddddd1ff1fbf11111
                            11111fdddd1111fbbbbbbddffffff1111ff11111
                            11111f1dd1111dfddddddff11111111111111111
                            111111fdd11ddf1ffffff1111111111111111111
                            1111111ffffff111111111111111111111111111
                        `, SpriteKind.Creature)
            case 91:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111111111111111f11111111111111111111111bf111
                            11dfb11111111111111111111bf1fb1111111111111111111bf11f11
                            1bddff111111111111111bfffdf1fdffb111111111111111f111df11
                            1f1dddfb1111111111fff1111fd1bfdddfffb1111111111f11ddbf11
                            11f1dddffd111111bf11111ddf11bfddddddbfbb111111f11dddf111
                            11f11dddbbf1111f11111dddff11dbfddddbbbbbbbf11f11dddbf111
                            111f11dddbbf1111f1ddffffbf1ddbfffffbbbbbbbf1b11dddbf1111
                            1111f11dddbf1111bfffbbbdfd1ddbfbbbbfffbbbf11f1ddddbf1111
                            1111b111ddfb11fffbbbddddf11ddbfbbbbbbbfff1111bddbbf11111
                            11111f111fbbffbbbbddddddf11dddfbbbbdddbbfd11fddfbbf11111
                            11111bf1fbdbbfbbbdddddddfd1dddbfbbbbdddbbfffdddbff111111
                            1111111fbdddbbfffddddddbddddddbfbbbbddddbbfdddf111111111
                            11111111fddddbbddddddddfdddddddfbbddddddbddddbfb11111111
                            1111111bfbdddddddbbbdddddddddddbbdddddddddddbfdf11111111
                            111111bfdfdddddfffbbbddddddbdbbdddddffbbddddbfdbf1111111
                            11111bd1ddddddf11dfbbddddddddddddddf11fbbdddddddfb111111
                            11111b1dddddddf1ddbfddd11111dddddbfd11bfbddddbddbfb11111
                            1111b11ddddddfddddbdd111fff111dddd111dbfbdddddddbbf11111
                            111bf11ddddddbdddddd11bbfffff11dddd1dddbbddddddddbbb1111
                            111b1111ddddddddddd11bddbbffff1dddddddddfddddddddbbf1111
                            11bf111111dddddddd11fddbbbfffff1bbbddddddddddddddbbfb111
                            11fd111111111dddd11fdddbbbffffff11bdddddddd111ddbbbbf111
                            11f111111dd111d111fdddbbbbbfffffb11dddd11111111bbbbbfb11
                            11f1111dbfff11111fbdddbb1111bbfffdb11111111ffff11bbbdf11
                            11fd1dffdddbfffffbdddd11bfbf11bbbbfb111bfffffffff1bbdf11
                            11fddffddbbbbffffbdd11bffbdbff1bbbdbffffffbffffbff11f111
                            111ffffdbbbbfffffb11bfffbd1dbfb1bddddd11fbbbfffbbfff1111
                            11111ff1bbbb11ffb1bffffffbdbfffb11ddd1ff11dbbffbbfff1111
                            11111fff111dff111bf11111bfbffb11bbb11fbbff111bfbbbff1111
                            11111ff1fffffffbffff111f11ff11f111ffffbbbffff1fbbbf11111
                            1111ffbb11fffbbbbffff11111ff11111fffffbbbbfff1fbbbf11111
                            1111f1bbf1ffbbbbbfffffb11ffff11ffffffbbbbbff1ffbbf111111
                            1111f1bfff1fbbbbbbfffffffffffffffbfffbbbbfff1ffbfb111111
                            1111b1bfff11dddbbbffffffffffffd11bffbbbbff11fff1f1111111
                            11111bdbfff1111dbbbffffffffd11b1bffbbbbb11ffff1f11111111
                            11111f1dfffffff1dfbbfffbd111111fffbbbbf1fffff1f111111111
                            111111f1dfffffff1ffbbbffffbd1bffbbbbbf1fffff1f1111111111
                            1111111f1dfffffbf1fffbbbffffffbbbbbbb1fffffd1f1111111111
                            11111111b1dfffbbf1dfffbbbbbbbbbbbbbb1ffffff1fb1111111111
                            11111111f11ffbbbdff1ddffbbbbbbbbbb11bbbffff1f11111111111
                            11111111b11dbbbddddff11dffbbbb1111bbbd11ff11fb1111111111
                            11111111f11dddddddbbbff11ddd111fbbddd1f1111dbf1111111111
                            11111111b111ddd1111fbffffffffffbbd111f1fb1dddbf111111111
                            1111111f1db1111ffff1ffffffffffbbd1fbff111f11ddbf11111111
                            111111b111dbbfff1ddf1ffffffffbbd1fbbf11111b11dddb1111111
                            11111b111dbb1111fdbbf1bfffffbbd1ffbbf111111f11ddf1111111
                            11111f11ddf111111fff1f11bbbbbd1f11ff11111111f1dbf1111111
                            11111b1ddf111111111111bfb11111b11111111111111bff11111111
                            111111bfb1111111111111f1dbfffb11111111111111111111111111
                            11111111111111111111111f11ddbb11111111111111111111111111
                            11111111111111111111111f1ddbb111111111111111111111111111
                            111111111111111111111111ffbb1111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 92:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111111111111d1111111111111111111111111111111
                            111111111111111111111111111d1d11111111111111111111111111
                            1111111111111111111d11d111111111111d11111111111111111111
                            11111111111111d11111111111111d11d1111111d111111111111111
                            111111111111d1111111d1111d11111d11d111111111111111111111
                            111111111d111111bd11111d11d1d111d1111d111111111111111111
                            111111111111111111d11111dddd11111111111d1111d11111111111
                            111111111111d11d1d1b1bdd11b1dddd11dd11d1111111d111111111
                            11111d111111dbdd1dd1db11bddd11b1d11dd1111d11111111111111
                            11111111d1d11d1dd111ddb11db1d1d11dd1db11d1dd111111111111
                            1111111111ddd1b11d1dbdddbdb1dbdbd11d11bd11111111d1111111
                            1111d1111dd1d1d1bdb1bbdddbbd1bdb1bddbdd11d11d111111d1111
                            111111d1111d11dbdb11bdbdb1dbdbddbbdb11db11d1b1d111111111
                            1111dd111d1dbd1db1bddbbdbdddbdbddddbd11dd1b1d11111111111
                            111111d111dd11dbbdbdbddbbdbbbdbdbbdddddb1bd111d111d11111
                            11d111dd1b1ddbbddbddddbdbbdbddbddbfbdd1dd1d11d111111d111
                            1111d11d11d11bbdbddbbdbdbbdbbdbdbbfddbdb11d1d11d11111111
                            11d1d1d1dd1dbdbbbdddbbdbbdbbdbbbbffdbd1ddddd11d11d111111
                            111dddd1dd1ddbdbbbbbdbbdbbdbbdbbfffbdddddd11b1111111d111
                            11d1dddb1bdbdbbbdbdbbddbdbddbbbfddfbbdb1bd1dd1d111d11111
                            1d1d1dd1bdbbbbbdbdbbdbbdbdbbbbfd11fbbbbd1dbd1dd1d1111111
                            111d1dddbbbbdbdbbbbdbdfdbbbbffd111bbdbdbdbd1dd1d111d1111
                            1111dbbbbdbdddbbbdbbbfbdbbbfd11111bbbddbddd1db11d1111111
                            111ddfdbddbdbbbfbbbfdbbbbbfd111111bdbbbddb11bdd11d111111
                            1d1ddfbbbdbbdbfdbdbbbdbbbfd1111111bbdbdbbdbddd11ddd1d1d1
                            11111dfbbbbdbbdbfbbfbbbbfd1111111bbbdbbbdddbd1bddb111111
                            1111ddfffbbbbdbfdbbbfbbfd11111111bbddfbddbdddd1d11111111
                            11d11dfddfffbbbbfdfbfbfd11111111dbbdbbddbdbdddd111d11111
                            1111ddbf1dddfffbbfdfffd11111111dbbbbbfbbdbbdd1ddd111d111
                            1111bdbb1111dddfffffffb11f11111bbbbbfbddbdddd11d1d111111
                            11d1dbdb1111111ddfffffff1f111dffbbbffbbddddddddd11d11111
                            1d11dbddb1111111fdfffffffd1bffbbbbffbbdbdbddddd1d1d11d11
                            1111ddddbd111111f1dfffffbfffbbbbbfffbdddbdd1bdd1d1111111
                            11d111dddbb1111111ffbfbffbbbbbbf11fbbddd1d1dd1d11d111111
                            11111bddbddbd1111ffffbfbbbbbbfff111bddbdbdddddd1d1111111
                            1d11d1bdbdddddbffbbfbbbbbbbffffff11fbdddbd1bd1d1111d1111
                            111111bd1bddddfbbbbbbbbfffffffffbf11dddd1111bd1d1d111111
                            111d11d1dbdd1dbfff111fffbbfffffbbbf1bddddbd1d11d11111111
                            11111d1bbdbbdbbbbff111bffffffbddbbbbddbdd1d11d11d1111111
                            11d1111ddb1dbbbbdbff11ffffbbbdbd1ddddddb11b11111111d1111
                            111111d11d1bdbdbbbbbf11bbbbbbb1dd1dd1bbbd1d1d11d11111111
                            11111d11d1bdb1bb1bddbf1bbbdbbd1ddbdbbdbdbb11111111111111
                            111d1111111bdbdddbddbbfbdbddbdddbd1ddd1b11111d1111111111
                            11111d11dd1111bbd1bb1bbdbbddd1d11dd11b1ddd1d11d11d111111
                            1111111d1111d1bdb1bbbddd1ddddd1d1db1db111d11111111111111
                            11111d11d1111111ddb1bdbdb1bddd1ddbbdb1d111111d1111111111
                            1111111d11d11d11dd1ddb1111dbddd1d1d1ddd111d1111d11111111
                            111111111111111111111dbd1bd111111dd1111d1111111111111111
                            11111111d1d11d1d111d1d1d1111d1d11dd11111d11d111111111111
                            11111111111111111d1111111d1111111111d11d1111111111111111
                            11111111111111d11d1d1bd11111d1d1dd1111111111111111111111
                            111111111111111111d1dd11d11d111111111d111111111111111111
                            11111111111111111111111d111d111d111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 93:
                return sprites.create(img`
                            1111111111111111d1111111111111111dddd11111111111
                            111111111d1111111111111111111111dbfbd11111111111
                            d1111d111111b11d111d11d111d1111dbffbd111d1d11111
                            ddd1111111111111d1111111111d11dbfffbdd1111111111
                            dbbdd1111d11d11d11b111db1b11ddbffffbd111111d1111
                            1dbbbdd1111bd1111111111111dddbfffffbd1b111111111
                            1dbffbbddd11111111ddddddddddbffffffbd1111b111d11
                            1dbffffbbdd111ddddbbbbbbbffffffffffbd11d111d1111
                            11dffffffbbdddbbbfffffffffffffffffbd111b1f111111
                            11dbfffffffdbbffffffffffffffffffffbd11d11111ddd1
                            11dbffffffdbffffffffffffffffffffffbd1111dddbbbd1
                            11dbfffffdbfffffffffffffffffffffffbddddbbbfffb11
                            1b1dbffffbfffffffffffffffffffffffffbbbffffffbd11
                            111dbfffdbfffffffffffffffffffffffffffffffffbd111
                            111dbfffbffffffffffffffffffffffffffffffffffd1111
                            d111dffbfffffffffffffffffffbbbffbfffffffffbd1d11
                            dbdddbfbfffffffffffffffffbb111ffbffffffffbd11111
                            dffbbbffffffffffffffffffd11111ff1fffffffbd111111
                            1dfffffffffffffffffffffd11111dff1fffffffd11f1d11
                            1dffffffffffffffffffffb111111bfd1ffffffbd1d11111
                            11dffff11ffffffffffffb111111dff11fffffbdd111d111
                            d1dbfffb111bffffffffb1fb1111bfd1bfffffbbbdd11111
                            111dffff11111bfffffb1f1f111bff11fffffffffbbdd111
                            1d1dbfffb111bf1bffff1ff11bbfff1dfffffffffffbdd11
                            ddddbfffff11f1f1bffffbbbbff1f11bfffffffddfbdd111
                            dbbbbbfdffb11ffffffffffffff1bb1ffffffdbbbdd11111
                            1dbfffffdfffbbbffffffffbfff11f1ffffffbbffbd11d11
                            11dbfffffdfffffffffffff11ff11fbfffffdbffffddd111
                            111dbfffff1dbff1bff11ff1d1f1dfffffffbfffffdbbd11
                            111dddfffff11ff11ff111f1f111bffffffdbffffdbffbd1
                            11dbbbbbffff11fd11f11b11fb11fffffffdfffffbffffbd
                            1dbfffffbdfff11fd1d11f11fff1ffffffbbffffbbffffbd
                            dbffffffffbfffdfb1f11ff1fffbffffdddffffdbfffffbd
                            dbfffffffffdfffffdfbdfffffffffdbbbdfffdbfffffbd1
                            dbfffddddddbfffffffffffffffffdbffbfffbdbffffbbd1
                            ddbfdbbfffbdbffffffffffffffdbfffbdffbdbfffbbbfbd
                            1dddbfffbddbbbfdffffffffffdbffffbdfbddbffbdbfffd
                            11dbfffbddbbfbdbdffffffffdbffffbddbddbffbdbffffd
                            1dbfffbddbffbdbfbddbffffdbfffffdddddbffddbffffb1
                            1bffffbdbffbdbffbd1ddbffdbffffbdbfffbbddbffffbdd
                            1bfffbdbfffdbfffd11d1ddfdbffffbbffffffdbfffbdd11
                            1dbfbdbfffbbfffbd1111b1bdbbffbddbbbffffdfbddd111
                            11dbdbffffbffffb111111d11dbbbbdfdddbbfffddbd1d11
                            11111bfffbffffbd1d11d11111ddddfffd1ddbbbddd11111
                            11111bfffbffffbd11111111111dbffffbd1bdddd1111111
                            11111dbbbdbffbd1111111d1d1111dbfffd1111d1111d111
                            111111ddd1dbbd11111d11111111111dbfbd1111d1111111
                            11111111111dd11111111111111111111dddd11111111111
                        `, SpriteKind.Creature)
            case 94:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            1111111111bb111111111111b11111111111111111111111
                            1111111111dfb1111b1111bbfb1111bb1111111111111111
                            1111111111dffb111fb11bfffb11bffd11111111dbdd1111
                            11111111111bffb1bffbffffffbbffd1111111dbbfbd1111
                            11111111111dfffbffffffffffffffbbbd1ddbbffbd11111
                            111111111111bfffffffffffffffffffffbbbfffbd111111
                            111111111111dffffffffffffffffffffbbffffbd1111111
                            11111111111dbbffffffffffffffffffffffffbd11111111
                            11111111111bfbfffffffffffffffffffffffbd111111111
                            1111111111dfffffffffffffffffffffffffbdbbbdd11111
                            1111111111bffffffffffffffffffffffffbffffd1111111
                            111111111dfffffffffffffffffffffffffffffd11111111
                            111111111bfbffffffffffffffffffffffffffbbbd111111
                            11111111dfbdbfffffffffffffffffffffffffffffbd1111
                            11111111dfb11bfffffffffffffffffffffffffffbd11111
                            11111111dfb111bfffffffffffffffffffffffffbd111111
                            1111111dbfbd1f1bfffffffffbdbfffffffffffbd1111111
                            1111111dbffb1f1bffffffbd111bffffffffffffbbbbd111
                            11111dbdbffbd1dfffffb111111bffffffffffffffbd1111
                            111dbbbdbfffbbfffffbdf1111dffffffffffffffbd11111
                            11dbbbbdbfffffffffff1f11dbbfffbfffffffffbd111111
                            1dbbbffdbffffffffffffbbbbffffbdbfffffffffb111111
                            dbbffffdbffb1fffffffffffffbbdddbfffffffffb111111
                            dbfffffdbfffbdbbfffffbddbdddb1bffffffffffbd11b11
                            bffffffdbffffb1b1bd1bd1db111bdbfffffffffffbdbfb1
                            bffffffdbfffffd1b1b11b111b11dbfffffffffffffbffb1
                            1bfffbbdbbfffffdb11b11b11b1dbfffffffffffffffffd1
                            1dbbbd11bbbfffffbb11b1bd1dbbfffbbffffffffffffb11
                            11dd111dbbbfffffffffddddbffffbbbfffffffdfffffd11
                            1111111dbbbffffffffffffffffddbbbfffffffdffffb111
                            1111111ddbbffffffffffffffddbbbbfffffffbbffffd111
                            11111111dbbbffffffffffffdbbbffffffffffbbfffb1111
                            11111111ddbbfffffffffffdbffffffffffffbdffbbd1111
                            11111111dbdbffffffffffdbfffffffffffffbdffbd11111
                            11111111bbdbbfffffffffdbfffffffffffffdffbd111111
                            1111111dbbfdbbfffffffdbffffffffffffbdfffbd111111
                            1111111dbbffdbbffffffdbffffffffffbddfffffd111111
                            111111dbbffffdbbbffffdbffffffffbddfffbfffbd11111
                            11111dbbfffffffddbfffdfbfbfffbddfffbbffffbd11111
                            1111dbbffffffffffdbffbfdfdffddbbbbbbfffffbd11111
                            11111ddbffffffffbbddbbb1b1bbdbbbbbbfbfffffd11111
                            1111111ddbbbbbbdd1111111111111dbbbbbffffffbd1111
                            1111111111111111111111111111111ddbbbbffffffd1111
                            111111111111111111111111111111111dbbbbfffffbd111
                            1111111111111111111111111111111111dbbbbbfffbd111
                            111111111111111111111111111111111111dbbbbbbbd111
                            1111111111111111111111111111111111111dbbdddd1111
                        `, SpriteKind.Creature)
            case 95:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111ff1111111111111111111111111111111111111111
                            1111111111111fdbf111111111111111111111111111111111111111
                            1111111111111fdbf111111111111111111111111111111111111111
                            1111111111111f1df111111111111111111111111111111111111111
                            1111111111111f1dbf11111111111111111111111111111111111111
                            11111111111111f1df11111111111111111111111111111111111111
                            11111111111111f1dfbfffffb1111111bffb11111111111111111111
                            11111111111111f1dffdddfbbffb11bffffffb111111111111111111
                            11111111111111f1dfbf1ddfbdbbfbfffffffffb1111111111111111
                            1111111111111f1fdfbfddddfdbbbffffffffffff111111111111111
                            111111111111f11f1dfbddddddbbbbffffffffdddf11111111111111
                            111111111111b11f1dfddddddfbfbdbffffffdddddf1111111111111
                            11111111111b11ddfdbdbdddfbbfdddffffffdddbbdf111111111111
                            11111111111fdddbffdbddddfbfbdddbfffffbbbddddf11111111111
                            11111111111fbdbbfbdbdbffbfbbdddbffffddddddddf11111111111
                            11111111111fbbbbbbbbbfbddbfbbbbbffffddddddddffb111111111
                            11111111111ffdbbfbbbfbddffbfbbbfffffd11111ddfffff1111111
                            111111111111ffdbfbfbbdffdfbbfffffbbffdd111ddffffbf111111
                            111111111111fdfdfdbfdfdd1fbbbbbffbbbbfdddbddfffbbdf11111
                            1111111fff11f1fffdfffdf11fbdddbfbbbbbbfdbdddfffdddf11111
                            111111ffff111fdbf1ffb111fbdddbffbbbbbbbfbbdfffdddddf1111
                            111111ffbf1111ff11bffffbbbbbbfffbbfbbbbbfffffdbdddbf1111
                            11111ffff1111f1b11bffbbbbbbbf1ffbbbfbbbbbffffbd11ddf1111
                            1111ffbbff111f1b1dffbbbbbbfff11ffbbbbbbbffffffd11ddf1111
                            1111ffbfff111f1b1dfbbdbbbffbf1111fbbbbfffbbbbffd11df1111
                            1111ffffff111bdd1fbdddbbffbf111111ffffffbbbbbbfd1ddf1111
                            1111ffbbf11111bddddddbbfffbf1111111111fbbbbbbbfddbf11111
                            111ffbbbdf1111fbddddbbfffbf11111111111fbbbbfbbbfbdf11111
                            111fbbbddf11111bffffffffbf1111111111111fbbbbbbfffff11111
                            11fffbbddf1111111bfffb1df111111111111111fbbbbfffff111111
                            11ffffbbf11111111111bffb11111111111111111fbffffffff11111
                            111ffffff111111111111111111111111111111ffffffffffff11111
                            1111fffbbf1111111111111111111111111111fbbbbfffffffff1111
                            1111ffbbbbf11111111111111111111111111fbfbbbfbdddffff1111
                            111ffbbbdddf111111111111111111111111fbbbbbbf1111dfff1111
                            111ffbbd111f111111111111111111111111fbbbbbfdd111ddf11111
                            111fffdd1dbf111111111111111111111111fbbbbbfdd11dddf11111
                            111fffddbff1111111111111111111111111fbfbbbfddddddf111111
                            111fffffffff1111111111111111111111111fbfbbfddddff1111111
                            1111fffffffff111111111111111111111fffffbbbfddfff11111111
                            111111ffffffff1111111111111111111fbbbbbfffffff1111111111
                            111111fffffffff11111111111111111fbbbbbbbfffff11111111111
                            11111fbbfddd11f1111111111111111fbbbbbbbbfddff11111111111
                            11111fbbfbd11dfffff111111fffff1fbbfbbbfffd1df11111111111
                            11111fbbbfdddfbd11df1111fbbfbbffbbbfffffddddf11111111111
                            11111ffbbfffffbd111df11fbbbbbbffffffffffdbddf11111111111
                            111111ffbffffbbddddddffbbbbbbfffffffffffddbf111111111111
                            11111111fffffbbfddbdffffbbbbffffffffffffddf1111111111111
                            111111111111fbbbfddbfffdffffffffff1fffffbf11111111111111
                            111111111111fbbbbfffffd11dddffffff11fffff111111111111111
                            1111111111111fbbffffffd111ddddffff1111111111111111111111
                            11111111111111fffffffffd11ddbddfff1111111111111111111111
                            111111111111111fffffffffdddbddddf11111111111111111111111
                            11111111111111111fff11fffdbdbddf111111111111111111111111
                            111111111111111111111111fffffff1111111111111111111111111
                        `, SpriteKind.Creature)
            case 96:
                return sprites.create(img`
                            111111111111111f411111111111111111ff111111111111
                            11111111111111fdd411111111111111ff14411111111111
                            11111111111114dddf111111111111ff1dddf11111111111
                            1111111111111fdddd4ffffffff41f114ff4f11111111111
                            1111111111114ddd4f4dddddd444fdd4ff44f11111111111
                            111111111111fd4fddddddddddd4dd4fff44411111111111
                            111111111114dfdddddddddddddddd4ff44f111111111111
                            111111111114fdddddd1dddddddddd44f44f111111111111
                            11111111111f4ddddd1d1dddddddddddd444f11111111111
                            11111111111fddddd1d1d1ddddddddddd444f11111111111
                            111111111144dddddd111ddddddddddddd444f1111111111
                            1111111111f4ddddd111dddddddddddddd444f1111111111
                            1111111111ffff4dd11dddd4fffffdddddd444f111111111
                            1111111111f11fdfddddd4fdf1111fdddddff4f1ff111111
                            111114ff11fffffdddddd44ffffffdddddf11dff1df11111
                            114ff11df1f4ddd111dddd444dddddddddfddd4fddfff111
                            141dfddd4ff4dd44444dddddddddd4dddddf444f44fddf11
                            1fdddf4d4ff4d4dd11dd44dddddddfdddddf444f44f4df11
                            4df444f44ff4ddd111dddd4dddd4fdddddddf44444f44f11
                            fddf4444411fddd11ddddddfffffdddfddddf4444444fff1
                            1fff44444ddfdd4444ddddf444dddffddfff4dd44444fddf
                            fdd444444f44f4d11dd4dff44ffff4ddf11ddddd44444ddf
                            fd44444444fffdd1ddddd4fff444ddddfdddddddd44444f1
                            1ff4444444fff4d1dddd4f44444ddddddfff44ddd4444f11
                            1114ff44ff44f4ddddd44f444dddddddddddf444444ffd11
                            111114f444444ffffffff44ddddddddddd4ddffff4444f11
                            111111f4444444f4444444dddddddddddd4dd44444444f11
                            111111f444444f4444444dddddddddddddd4dd444444f111
                            1111111f44444f4444444ddddddddddddd44f4f444ff1111
                            11111111ff444ffff444ddd44444ddddd4ffff4fffff1111
                            1111111111ffffffff44dd4fffff4ddd4fffffffffff1111
                            1111111111114ffffff44ffffffff444ffffffffffff1111
                            111111111111ffffffffffffffffffffffffffffffff1111
                            11111111111144fffffffffffffffffffffff4ddd4ff4111
                            111111111114f4ffffffffffffffffffffff4fffffd4f111
                            11111111114ffd4ffffffffffffffffffff4ff4ffff4f111
                            1111111111fffd4ffffffffffffffffffffdf4d4fffff111
                            1111111114fffd4fffffffffffffffffff4f4ddd4ffff111
                            111111111fffffd4ffffffffffffffffffdff4d4fffff411
                            1111111114ffffd4ffffffffffffffffffdfff4fffffff11
                            1111111111fffffd4fffffffffffffffffdfffffffffff11
                            11111111114fffffd44fffffffffffffff4fffffffffff11
                            11111111111ffffffdd44ffffffffffffff4ffffffffff11
                            1111111111fffffffffdd444ffffffffffff4fffffffff11
                            111111111f4f44fffffffddd444ffffffffff444d4444f41
                            1111111141f1114ffffffffffff444ffffff441d4111d4f1
                            11111111f1f1114ffffff1111114fffff44f411d41111df1
                            11111111ffffffffffff411111111111111ffffffffffff1
                        `, SpriteKind.Creature)
            case 97:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111144f11111111111111111111111111111111
                            111111111111111111111f1f11111111111111111111111111111111
                            111111111111111111114f1141111111111111111fff111111111111
                            11111111111111111111f1ddf11111111111111ff44f111111111111
                            11111111111111111114fdddd411111111111ff4dd4f111111111111
                            1111111111111111111f4ddd4f4fffff411ff4ddfdf1111111111111
                            1111111111111111111fdddff11111dd4ff4dd4f4df1111111111111
                            11111111111111111144d111111ddddddddd4ff4dffff11111111111
                            111111111111111111fd11111ddddddddd4fff4df111ffff11111111
                            1111111111111114f4d1111dddddddddddddf4ddf1111111ff111111
                            11111111111111f11fdd11dddddddddddddddfdfdddd1d1111f11111
                            1111111111111f111fdfdddddddddddddddddddfdddfddd1d11f1111
                            111111111111f1111fd1fddddddddddddddddd4fddd4fddfd11f1111
                            11111111111fd4111fd4f4ddddddddddddddddffddddfddfdfd1f111
                            11111111111141114dd41f41dddddddddddddfddfdddfdf4dfddf111
                            111111111111f111fddd4ff1dddddddddddddfddfd4fd4f44f4f1111
                            1111111114ffd111fddddf1ddddd4ffff4ddd4f4f44f44fffff11111
                            11111114ffdf1111fddd4f1dddd41f41114dd4ff4fffff444f111111
                            111114ffddfd11114dddf1dddddf4ffff44dd4f4fff4444444f11111
                            1111ffddddfd1d411fd4f1dddddf444ddddd4f4ddf4f444444f11111
                            111fdddddddfd4d11fdfddddddd4fdd44ddd4fdddf4f4444444f1111
                            114fdddddddfdf1111dfddddddd4f4ddddd4f4dddf4f4d4444df1111
                            11fddddddd44fd1111ffd11dddd4f44ddd4f4ddddf44fdd4ddd4f111
                            11fddd4fff44fd11111f1111dd4f444444fdddd4ffff4dddddddf111
                            11fdddddd4f4fd1111141111d4f444fff4ddddfd1f11fddddddd4f11
                            11fdddddddff1fd11411f11d4fffff4d1d1fd4d1dfddd4dddddddf11
                            114dddddddf11fdd4d11fd44fdddd111111dff1dfffd4fdddddd4f11
                            111fddddddd411fdfd111fff11d111111111df1d414d4fddddd4f111
                            111fdddddddf114fdd111111111111111111df1df4fd4fdd44ff4111
                            111fdddddddf111ffdd1111114111111d11dd4ddddd44fffff411111
                            111fddddddd44114dffddd11df1111114111ddf44444f41111111111
                            1114ddddddd4f111fdd4ffddfdd1111d4ddddddfffff411111111111
                            1111fdddddd4f1111fddd4ff4ffdddfffddffff44444111111111111
                            1111fddddddd441111fdddd4444fff44fff444f11111111111111111
                            1111fddddddd4f114ffddddd44444f44444444f11111111111111111
                            1111fddddddddff44d4fdddddd444444444444f11111111111111111
                            1111fdddddddd4f4ddd4dddddddd4444444444f41111111111111111
                            1111fddddddddd4fddd4ddddddddd444444ddf4f4111111111111111
                            1114fdddddd4fdd4fddddddddddddddddddddfd4f411111111111111
                            111fddddfddf44ff44ddddddddddddddddddd4dddf41111111111111
                            111fddfdfddf4d4444dddddd4444ddddddddddddddf4111111111111
                            111fddfddfddfdddddddddd4444444dddddddddddddf411111111111
                            1111fddfddfddfddddddd444ffff444dddddddddddddf41111111111
                            111114fd4fd4ffddddd444ff1111ff4ddddddddddddd4f1111111111
                            1111fddddddddddd444fff11111111f44dddddddddddd44111111111
                            1111fdddddddd444fff111111111111ff44dddddddddd4f111111111
                            11111fdddddd4fff4f111111111111111f44dddddddd44f411111111
                            1111fffdddd444444f1111111111111114ff44ddddd444fff1111111
                            11ff4ddfff44444444f111111111111111f4ff4dd444ffdddf111111
                            1fddddddddf444ddd4f111111111111111f444f444ddddff4f111111
                            fdd4fddddddddddd44f1111111111111111f4444ddddddddf4111111
                            fd4dddf4dddddd44ff111111111111111111f4dddddfffdddf111111
                            1ffddfddddd44fff111111111111111111111f4dddddddf44f111111
                            111ff44444fff1111111111111111111111111f4444444fff1111111
                            11111fffff111111111111111111111111111111ffffff1111111111
                        `, SpriteKind.Creature)
            case 98:
                return sprites.create(img`
                            11111111111111114ff11ff41111111111111111
                            1111114ff11111fff1ffff1fff11111fff111111
                            11111ff11f11ff44f4f44f4f44ff11f14ff11111
                            1111f4f144ff4444f4f44f4f4444ff144f441111
                            1111fff4444f4fff44444f44fff4f1444fff1111
                            111ff14f44f4f411f444444f114f4f44f44ff111
                            1114f444f4ff11111f4444f11111ff4f444f4111
                            111f4f444ff441f11f4444f11f144ff444f4f111
                            111f4ff44f14441114444444114441f44ff4f111
                            111f4f1ff444f44444144444444f444ff1f4f111
                            1fff4f11f44f1f444444444444f1f44f11f4fff1
                            f411f11f44f11ffff444444ffff11f44f11f411f
                            ffff411f44f14f444ff44ff444f41f44f114ffff
                            1fff111f4f444111144ff441111444f4f111fff1
                            f44fff1ff1114f111114411111ff111ff1fff44f
                            f44ff4fff11f114ff111111fff11f11fff44f44f
                            1f44f44f4f4111144f1111f1111114f4f44f4441
                            1f44ff44fff1114444f44f4411114fff44ff44f1
                            14ffffff114ff444444ff444441ff411ffffff11
                            1f114ff111111ffff411114ffff111111ff444f1
                            1f1f44fffff411111111111111114fffff44f4f1
                            11f4444f4444f41111111111114f4444f4444f11
                            11f4144f44444f411111111114f44444f4444f11
                            11f4444f444444f1111111111f44444ff4444f11
                            1f444444f444444f11111111f444444f444444f1
                            1f444444ff44444f11111111f44444ff444444f1
                            1f414444fff4414f11111111f4444fff444444f1
                            1f414444ffff114f11111111f144ffff444444f1
                            1f444444ff11f14f11111111f11f11ff444444f1
                            11f44444ff11f1f1111111111f1f11ff44444f11
                            11f44444ff114f111111111111f411ff44444f11
                            11f44444ff11111111111111111111ff44444f11
                            111f44444f11111111111111111111f44444f111
                            111f44444ff111111111111111111ff44444f111
                            1111f44444f111111111111111111f44444f1111
                            11111f11444f1111111111111111f41444f11111
                            111111f11444ff111111111111ff41114f111111
                            1111111ff44444f1111111111f444114f1111111
                            111111111ffff4111111111111ffff4111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 99:
                return sprites.create(img`
                            11111111111111111ff41111111111111111fff11111111111111111
                            111111111111111f4444f11111111111111f444ff111111111111111
                            1111111111111ff411114f111111111111f444444ff1111111111111
                            111111111111f411111114f1111111111f444444444f111111111111
                            11111111111f444444111441111111111f4444444444f11111111111
                            1111111111f444444444144f11111111f444444444444f1111111111
                            111111111f4444444444444f11111111f4444444444444f111111111
                            11111111f44444444444444411111111f44444444444444f11111111
                            11111111f444444444444444f111111f444444444444444f11111111
                            1111111f444444fff4444444f111111f4444444fff444444f1111111
                            1111111f44444f44ff44444f11111111f44444f444f44444f1111111
                            111111f44444f4fffff444ff11111111ff444fffff4f44444f111111
                            111111f4444f4fffffff4f4f11111111f4f4fffffff4f4444f111111
                            111111f444f4ffffffff4f4f14111141f4f4ffffffff4f444f111111
                            11111f4444f4ffffffffff4f14111141f4ffffffffff4f4444f11111
                            11111f444f4ffffffffff4f11f1111f11f4ffffffffff4f444f11111
                            11111f444f4ffffffffff4f14f4114f41f4ffffffffff4f444f11111
                            1111f444f4fffffffffff4f1444114441f4fffffffffff4f444f1111
                            1111f444f4fffffffffff4f1444114441f4fffffffffff4f444f1111
                            1111f44f4ffffffffffff4f1f4f11f4f1f4ffffffffffff4f44f1111
                            1111f44f4fffffffffff4f4ff4f11f4ff4f4fffffffffff4f44f1111
                            111f444f4fffffffffff4f4ff4f11f4ff4f4fffffffffff4f444f111
                            11f444f4ffffffff4fff4f44f4ffff4f44f4fff4ffffffff4f444f11
                            11f444f4fffffff444f4f4f4f4f44f4f4f4f4f444fffffff4f444f11
                            1f4444f4ffffff4444f4f4f4444444444f4f4f4444ffffff4f4444f1
                            1f4444f4fffff444444f4444444ff4444444f414444fffff4f4444f1
                            f4444fffffff4411444f44ff44f44f44ff44f1144444fffffff4444f
                            f444f444fff441144444f111f444444f111f411444444fff444f444f
                            f44f44444f4411444444f1111f4444f1111f1144444444f44444f44f
                            f4441444f441114444444f111f4444f111f411444444444f4444444f
                            f4441444f441144444444f1f11f44f11f1f414444444444f4444444f
                            4f44444f4444444444444f4111f44f1114f4144444444444f44444f4
                            4f44444f444444444444f44441444414444f444444444444f44444f4
                            1f4444f4444444444444f44444444444444f4444444444444f4444ff
                            ff4444f4444444444444f444ff4444ff444f4444444444444f4444ff
                            f1f444f444444444444f4f4f1f4444f4f4f1f444444444444f444f4f
                            f4ff44f444444444444f11f11f4444f14f41f444444444444f444f4f
                            f44f44f44444444444f411411ff44ff111411f44444444444f44f4f1
                            1fff44f44444444444f11111144ff44111111f44444444444f44ff11
                            1111f44f44444444ff44441111111111114444ff44444444f44f1111
                            1111f44f444444ff441111111111111111111444ff444444f44f1111
                            11111f4f444fff44ff11111111111111111144ff44fff444f4411111
                            11111ff4fff114f111ff4111111441111114ff144f411fff1ff11111
                            11111f1f14fff1f111111f411444444114f111144f1fff44f4f11111
                            1111f14f14f44ff41111144f44444444f11111444ff44f41f44f1111
                            11fff1f114f4444f44114444ffffffff11114444f4444f114f4fff11
                            1f44fff14f1ff444ff44444f44111144f44444ff444ff1f44fff44f1
                            11ff44ff4f111fff14fffff4111111114fffff41fff111f4ff44ff11
                            1f44ff44f11111111111111111111111111111111111111f44ff44f1
                            1fff11fff11111111111111111111111111111111111111fff11fff1
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 100:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111114fffff41111111111111111
                            1111111111111114fdddddddf411111111111111
                            11111111111114fdd4fdd44444f4111111111111
                            111111111111fd1dd411dd4ff444f11111111111
                            11111111111f4fdd4f11dffdd4444f1111111111
                            1111111111f4ddf44fdffdd111f4f4f111111111
                            1111111111411fdf44f4df11114f4ff411111111
                            111111111fd11f144444ff1114f4f4ff11111111
                            111111111fdf1ff4444444444f4f4fff41111111
                            1111111144444444fffff44444f4fffff1111111
                            11111111f4444ffdd1111dffff4ffffff1111111
                            11111111f4ffdd111111111dddfffffff1111111
                            11111111fff41111111111dddddddffff1111111
                            11111111fd1111111111dddddddddd4ff1111111
                            11111111f1111111111dddddddddddd4f1111111
                            111111114111111111dddddddddddddd41111111
                            111111111411111111ddddddddddddd411111111
                            111111111f1111111dddddddddddddd411111111
                            11111111114111111dddddddddddddf111111111
                            1111111111f111111ddddddddddddd4111111111
                            11111111111f11111144444ddddddf1111111111
                            111111111111f11114ddddd4ddddf11111111111
                            11111111111114f11411ddd4ddff111111111111
                            1111111111111114f1444441ff11111111111111
                            111111111111111114ffffff1111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 101:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111fffffffff1111111111111111
                            111111111111fff111111111fff1111111111111
                            1111111111ff111d11111111111ff11111111111
                            111111111f111111d4d1111111111ff111111111
                            11111111f1111111111d44d11111114f11111111
                            1111111f111111111111111dd4444d11f1111111
                            111111f11111111111111111111111111f111111
                            11111f1114111111111111111111111111f11111
                            11111f111f1111111111111111111111d1f11111
                            1111f1111d11111111111111111111111d1f1111
                            1111f1111df1111111111111111111111d1f1111
                            111f11111ddf1111111111111111111111d1f111
                            111f1111d11f1111111111111111111111d1f111
                            111f1111d111f111411111111111111111d1f111
                            111f1111d111f111f11111111111111111dd1f11
                            11fdf111d1111f1114111111ffffff1111dd1f11
                            11fdf111d11114f11f1111ffd11141111ddd1f11
                            11fd1f11d1f1111111414fd11111d1111ddd1f11
                            11fd1df11df11111111f11111111d1111ddd1f11
                            11fd1d4f11dddd1111111f111111d111dddd1f11
                            111fd1d4df11111111111f111ddd1111dddd1f11
                            111fd1d444df1111111dddddd1111111ddddf111
                            111f4d444444dfff111111111111111ddffff111
                            111f444444f44444dffff111111111fffffff111
                            1111f44444f4444444444dfffffffd4ffff4f111
                            1111f444444ffff4444444444444444fffff1111
                            11111f444444fffffff4444444f444ffff4f1111
                            11111f4444444fffffffffffff4444fff4f11111
                            111111f4444444fff4dd1111df444fff4f111111
                            1111111f4444444f4dd1111df444fff4f1111111
                            11111111f4444444fddd11df444fff4f11111111
                            111111111ff444444ffdddf444ff4df111111111
                            11111111111ff444444fff44444ff11111111111
                            1111111111111fff44444444ffd1111111111111
                            1111111111111111fffffffd1111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 102:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111113ff3111111111111111d33f11111111
                            11111111dd1111111111113ff1111ff311111111113f11113f111111
                            1111111ffff1111111113f11111111113f1111113f11111111f11111
                            11111331f33ff111113fd111111111111dff111311111111111f1111
                            111131133f333f111f11ffd11111111dff11f13f11111111113f1111
                            111311f113f33ffff11111ffdd1d1dff11111f1f111111111311f111
                            111f13f1131ff3dfd3111f13f1d1df31f1113f1311111111ff11f111
                            11fd313331d3ddddd333fff3d1111d3fff33331f31111113f3311f11
                            11f131111113ddddfdd111111111111111ddf13f11111ddfdd1f3f11
                            11f3133111d13dddfdd111111111111111113111113dddfdddd11f11
                            11f111f11d1d3dddfddd1111111111111113111111ffddfddddd1f11
                            113111f11ddd3dddfddd111d3ff3f3d1111fdf11d311ffdddddd1f11
                            111f111dddd333dfdddd11d31111113d111fd3fddd11f1ff3ddddf11
                            1113dddddd3dd3dfd3ffff1111111111111fddffdd31111dddddf111
                            1111fdddd3ddddf3f113f1ff111111111113dddfdddd33ddddddf111
                            111113fdd3ddff311131f111f11111111111fddddddd3ddddddf1111
                            11111113ffffdd11111f1f11df11111111113ddddddfdddddddf1111
                            11111111fddddf11111113d1df111111111d1fddddd3ddddddf11111
                            11111111f1dddf1111111d33ddf111111111ddfddddfdddddf111111
                            111111113111311111ffdd1f3ff11111111d1ddffdddfddff1111111
                            111111131111f11111f3fd113df111111111d1ddd3fffff111111111
                            1111111f1111f11111df3fddddf111111d1d1ddddd3333f111111111
                            1111111f1111f111ddddddddddfd1111d1d1ddddddd3d3f111111111
                            1111111f1d1d1f1ddddddddddfdd11111d1ddddd333ff3f111111111
                            1111111fd1d1d31ddddddddddfdd1111d1d1dd3f11111ff111111111
                            11111113ffffddf1ddddddddfddd111d1d1d3f111111131f11111111
                            111111ff1111ffd3fdddddffdddd11d1d1d3111111111d11f1111111
                            11111f11111111fdd3ffffddddd11d1dddf11111111111311f111111
                            111131111111111fddddddddddd1d1dddf1111111111111d1df11111
                            11131111111111ddfdddddddddddddddf1d1111111111113d1f11111
                            111f111111111ddddfddddddddddddd3113111111111111f1d3f1111
                            1131111111d1ddddddfddddddddddddf11f11111111111d1ff3f1111
                            11f11111111d1dddddfddddddddddd3111f111111111111df3ddf111
                            1131111111d1dddddddfddd3d3ddddf111df1111111111d13dddf111
                            131111111d1d1ddddddfdd3d3d3d33111ddf11111111111d3dddf111
                            1f11111111ddf3dd3dddf3d3d3d3df111d11f11111131113dddddf11
                            1f11111111df3dddfdddfd3d3d3d3f111f11ff111131111fdddddf11
                            1ff111111df1dddd3dddf3d3d3d3f1111f11f3f111d111d3dddddf11
                            1fdfd1113f11ddddd3ddf33d333df1111df111d113dddd3fff3ddf11
                            1fd13fd11f11fddddfdff3333333f111111ff1d11133ff11dddddf11
                            13d11f1113ffdddddffdf3333333f111111111111111f1113dddf111
                            11f3f11111dddddddfddf3333333f11111111111113d111f3dddf111
                            113111111ddddddddfddf33333333f111111111111ddff33ddddf111
                            111f1111ddddddddd3df333333333f1111131111dddddd3ddddf1111
                            1113d3fffddddddd3ddf1ff33333ff11111ff3dddddfddfddddf1111
                            1111fddddf3dddddfdf1111fffff11f1111113fffffdddddddf11111
                            111113fdddddddd3ff111111111111f11111dddddddddd3dddf11111
                            1111111ffdddddff111111111111111f1d1ddddddddddddddf111111
                            111111111fffff111111111111111111f1d1d1ddddddddddf1111111
                            111111111111111111111111111111111f3d1d1dddddddff11111111
                            11111111111111111111111111111111111f31d1ddddff1111111111
                            11111111111111111111111111111111111113ffffff111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 103:
                return sprites.create(img`
                            1111111111fffffff711111111111111111111111111111111111111
                            111111111f7777777ff7111111111111111111111111111111111111
                            1111111111fff777777ff7111ff1ff111117ffffffffffff71111111
                            1111111111117ff777777ff7ffffffff1fff777777777777ff711111
                            117ffffffffffffff777777ffffffffff7777fffffff777777fff711
                            7ff77777777777777ff77777fffffff7777ff7777777777777777ff1
                            f777777fffffffff777f7777ffffff77fff7777fffffffff7777777f
                            1fffff7777711117ff77f1777fffff7f777ffff771177777ffffffff
                            111117fffffff11177ff7f111ffff777fff77ffff711777777f11111
                            111111fffffffffffffff7ff17fff77f77fff7717fffffffff7f1111
                            1111ff77777ffffffff77f77f1ff7ff7ff777fffff7117777ffff111
                            111f777ffff777ffff77f7777f7ff77f77fff7177fffffff7777f111
                            117ffff77777777ff7ff117777ffffffff777ffff7777777ff777f11
                            1171f7777777777f7f711ffffffffffffffff7171117fff77ff777f1
                            1111f777777777f7f71ff77777777fffffffffffffff777ff7fffff7
                            111f7777777777f7f7f777777777777f77777f7f7f77ff777f7f111f
                            111f77777ff77f777f77777777777777f17777f7f7f777ff77f7f111
                            11f1f777f1117f71f7777777777777777f1177ff77f7777fff77f111
                            11f1f777f1f17f1f777771111111177777f1177f777f7777f1f77f11
                            11f1f77771117f1f7111171111171111777fff7f177f77777f1f7f11
                            117f77777ff77ff711777f17771f7777177f77fff17f777777f1ff11
                            17777777771117f777fff1777711ffff717f77777fff77777ff1ff11
                            1f77777771111f71ff111f77777f1111ff77f777777fff777ff11f11
                            11f7177711111f7117111f77777f11117117f77777f111f77ff11111
                            111ff71111111f71171f177777771f117117f77777f1f1f7777f1111
                            111ff77ff1111f7111777177777777771111f111777111777777f111
                            1111ff1ff1111f7111111717711111111111f111177f7f777777f111
                            11111fff11111f71117f7111111117111111f1111177777717ff7111
                            111111f711111f7111f17771117777711117f111111771177fff1111
                            1111111ff1111f71111ff7777777ff771117f11111117ff11fff1111
                            111111111ff111f7111777fffff77f17117f7111111177ffffff1111
                            11111111111ffff71111f1fffff1f711117f71111111177fff7f1111
                            11111111111111f71111fffffffff111117f111111111777777f1111
                            111111111111117f71117fffffff711117ff71111111117777f11111
                            11111111111117ff711117777777111117fff7111111117777f11111
                            1111111111117ffff1111111111111117fffff77111111177f111111
                            111111111117fffff771111111111117f77fffff77111177f7111111
                            11111111117ffffffff771111111777f777ffffff77777fff1111111
                            1111111117ffffff77fff7777777fff777fffff77f777f77f1111111
                            111111111f7777fff7777fffffff777777ffff7771fff7777f111111
                            11111111f7fff77fff777777777777777fff7f111f77f7111f111111
                            1111111f77777ff7f7ff777777777777f7ff7ffff77777ffff111111
                            1111117f7777777f7f77ffffffffffff77fff777777777777f111111
                            111111f777777777f7f777777777777777ff77777ffff77777f11111
                            11111f77777777777ff177777777777771ff777ff7777ff7777f1111
                            1111fffffff777777f7ff1177777777711f777f77777777f777f1111
                            111f77777777f77777ff1fff1111111ffff77f7777777777f77f1111
                            111fff77777777f777f11111fffffff111f77f71717171717f7f1111
                            11f777f777ff7777ff11111111111111111f7f17171717171f7f1111
                            1f1117f77f77f77ff1111111111111111111f7f111111111f7f11111
                            1f1111f7f1117ff7111111111111111111111fff1111111fff111111
                            1ffffffff1111f71111111111111111111111111ffffffff11111111
                            11111111fffff1111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 104:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111ff1111111111111111111111ff111111111
                            1111f1df11111ffffff11111fff1f11f11111111
                            1111f1dbf1fff11111dff11f11df11df11111111
                            1111fddbffb111111111dff11dbf1ddf11111111
                            11111fbf1111111111111df11bfdddbf11111111
                            111111fb111111111d111111dffffbbf11111111
                            111111f1111111111fd11111bffddfbf1ff11111
                            1111ff11111111111dfddd11fddfddfffbbf1111
                            111fdf11111d111ddbbfbbbd1ddfdddfbbbf1111
                            111fdf1111d111dbfffffffbddbffddfbbbf1111
                            11fddf1111111dbfffbbbbbfdbfbfdddfbf11111
                            11fdbfd11111dbfffbdbfffdfbbfddddfbf11111
                            1fddbfd11111dbffbdbff1fdfffdddddbf111111
                            1fddbbf11111dbffdbff11fdffbdddddbf111111
                            1fdbbbfd1111dbfbbfff11fdffbddddbbf111111
                            1fdbbffd11111dfdf1ff1fdffbbddfbbbf111111
                            1fbbbf1f11111dfddffffddffbbdddfbbf111111
                            11fff11f111111dfddddddfdfbbdddfbbf111111
                            1111111f1111111dffffffdfbbddddffbf111111
                            111111fd111111111111dddffbddddffff111111
                            111111f1111111111111dddffbdddbffbbf11111
                            111111f11111111111111dffbbdddbfbbbf11111
                            111111fd11111bbd11111dffbddddbfbbbf11111
                            111111fd11111bffd111dffbbdddbbffbbbf1111
                            1111111fd1111dffd1ddfffbddddbf1fbbbf1111
                            1111111fdd1111fd1ddfdfffddbbbf11fbbf1111
                            11111111fdddddddddfffff1fbbbf1111ff11111
                            111111111fdddddddf1ff111fbbf111111111111
                            1111111111fffffff1ff111fbbf1111111111111
                            11111111111111ffff1111dfff11111111111111
                            1111111111ffff1111111df11111111111111111
                            111111111f1111111111dbf11111111111111111
                            11111111f11111111111bf111111111111111111
                            11111111f1111dd1111df1111111111111111111
                            111111111f11dd11111df1111111111111111111
                            1111111111fffd1111dbf1111111111111111111
                            1111111111111ffdddbf11111111111111111111
                            111111111111111ffff111111111111111111111
                        `, SpriteKind.Creature)
            case 105:
                return sprites.create(img`
                            111111111111111111111111fff111111111111111111111
                            1111111111111111111111fffddf11111111111111111111
                            111111111111fff1fffffffddddf11111111111111111111
                            1ffff111111fddbfdddffffffff111111111111111111111
                            f1111fffffffdbbfdddbbbbbbbf111111111111111111111
                            f111111111fddbffffddfffffbbf111fff11111111111111
                            f11dd1111dfdfffdddddddbbbffffffddbf111fff1111111
                            1fdf1111ddfffbdddddddddbbbbff11ddbf11f111fff1111
                            1ff1111ddfbfb1ddddddddddbbf111ddbf11f111111df111
                            11f11dddf1fb11111dddddddbb111dddbf1f1111111ddf11
                            11f1dddf1bf1111111dddddb111ddddbf11f11111111ddf1
                            111fdddf1f111111111ddddddddddddbf11f11111111ddf1
                            1111fff1bf111111111dddddddddddbfb111fdd1111dddf1
                            11111111f1111111111ddddddddddbffbf11ffddddddddf1
                            1111111bf11111111111dddddddddfbfbf11f1fdddddddf1
                            1111111fb11111111111ddddbbddbbbfbbfff11ffddddf11
                            1111111f11111111111dddbbffbdddbfbb111f11dfdff111
                            1111111f11111111111ddbff11fdddbfb11111fffffdf111
                            1111111f1111111111dbffff11fdddbfd111111dddddf111
                            1111111f111111111dbff1ff1fddddbfd111111dddddf111
                            1111111fd1111111dbf1bffb1b1ddbfdd111111ddddf1111
                            1111111fdd1111ddbf111111f111dbfdd11111ddfff11111
                            1111111fdddddddbfdbfffbb1111bffdd111ddfff1111111
                            1111111fbdddddbbf1111111111dfbfddd11dfbbf1111111
                            11111111fdddddbf1111111111dfbbbfdd1dfbbf11111111
                            11111111fddddbbf111111111dfbbbbbfd1bfff1111111f1
                            11111111fdddbbfd111111111fddbbbbbf1dff111111fff1
                            11111111fb1dbfd111111111fdddddbbbfd1ffffffff1df1
                            11111111fb1dbfbb111111ffd11ddddbfbf1df1111111df1
                            11111111fbddbffb1111ff111111ddffbbfd11f11111dbf1
                            111111111fbbbffb11ff11111111ffdbbbbfd1fd11dddbf1
                            1111111111fffbbbff111111bffbdddbbbbfd11fdddbbbf1
                            11111111111fffff11bffffb1111ddffbbbfd11fbbbbbf11
                            11111111111111fbb11111111111ffddbbbbfd1dfbbbbf11
                            11111111111111f1bfb111111ffbdddddbbbfdddfbbbf111
                            1111111111111f11b11fffffb111dddffbbbfdddffff1111
                            1111111111111f11b111111111111fbddbbbbfddbff11111
                            111111111111f111bbf1111111bfb1dddbbbbfdbbffb1111
                            111111111111f111bbbfbffffb1111ddbbbbfbbbbfffb111
                            111111111111f11dbbbbf11111111ddbbbbbfbbbfffffb11
                            111111111111f11dbbbbff1111111bfffbbfffffffffffb1
                            1111111111111fdbbbbbffffffffff111ffffffffffffffb
                            1111111111111fbbbbbbffff111111111bbffffffffffffb
                            11111111111111fbbbfffffb11111111111bbffffffffffb
                            111111111111111fff1ffff11111111111111bfffffffffb
                            1111111111111111111bffb111111111111111bfffffffb1
                            11111111111111111111fb11111111111111111bfffffb11
                            1111111111111111111111111111111111111111bbbbb111
                        `, SpriteKind.Creature)
            case 106:
                return sprites.create(img`
                            1111111111111111111111111111111111111111eff1111111fff111
                            111111111111111111111111111111111111111e111f11111f111f11
                            111111111111111111111111111111111111111f1111ff11f31111f1
                            111111111111111111111111111111111111111f111331fff31111f1
                            1111111111111111111111111111111111111111f3333333f3331f11
                            1111111111111111111111111111111111111fffff33333333333f11
                            11111111111111111111111111111111111fe33333ff33ee33333f11
                            111111111111111111111111111111111fe333333333ffeeee333ff1
                            11111111111111111111111111111111f11333333333effeeee333f1
                            1111111111111111111111111111111f1113333ff333e1feeee333f1
                            111111111111111111111111111111f1113333ffff3e111feeeff3f1
                            11111111111111111111111111111f1111313ff1ff3e113feef1133f
                            111111fff11111111111111111111e111311f111e333113fef11133f
                            1111ff111eff3fffff1111111111f111331ff1f1f333113fff11133f
                            111e1333111ff11113effffff111f113333f11ff3333e33efff333ff
                            1111f11331f11111111111313eff13ff3333ffe33333e333ffffff3f
                            11111fe33e111111111313131333ffffff33333333333e33effffef1
                            1111111f3f11111111313333333333ff1f333333333333ffeeeeeef1
                            11111111f1111111113333333333333fff333333333333eeffeeff11
                            11111111e111111113333ffff3333333f33333333333333eeefff111
                            11111fff11111111333ffeeeeff333333f3333333333333eeeeef111
                            111fe11e1111111333fee3333eef33333f333333333333eeeeeef111
                            1fe111e11111113333fe311333ef3333eeffffff333333eeeeeef111
                            f13311e1111113333eee311333eee333eef11f11fff33eeeeeeeef11
                            f11333e1111131333feee3333eeef333eefe3efe3f1ffeefffeeef11
                            1fe133e1111313333feeeeeeeeeef33eeefeeefeeee3fff333feef11
                            111fe1e1111131333feeeeeeeeeef33eeefeeeefeefeefef333eee11
                            11111ffe1113133333feeeeeeeefe3eeeefeeeefeefeefeff33eeef1
                            1111111f1131333333feeeeeeeeeeeeeefeeeeefeefeefefef3eeef1
                            1111111f33131333333ffeeeeffeeeeeefeeeefeeefefeefefeeeef1
                            1111111fe333333333333fffeeeeeeeefeeeffeeeffefeffefeeef11
                            11111fe1fe33333333333333eeeeeeeeffffeeffffeffffffeeeef11
                            111fe1111ee3333333333eeeeeeeeeef1111ff3ffffffffffeeef111
                            11f111113feee33333eeeeeeeeeefff1111111f3333fffffeeeef111
                            111ffe3333feeeeeeeeeeeefffffe1111111111f33333ffeeeef1111
                            111111ffff1ffeeeeeeffffeeeef111111111111ff333333eef11111
                            11111111111111ffffe11fffeef111111111111111ff33333ff11111
                            11111111111111111111ffeefff11111111111111111f3333ef11111
                            1111111111111111111f33feeffff111111111111111f333eff11111
                            1111111111111111111e333ffee333f11111111111111ffffff11111
                            111111111111111111f3333eeee333f11111111111111feeffff1111
                            111111111111111111f333feeeefff111111111111111f3eefeff111
                            111111111111111111e333f3e3f1111111111111111111fffeeff111
                            11111111111111111f133f3333f1111111111111111111feeefeeff1
                            11111111111111111f11ff3333f11111111111111111111fffeeff3f
                            11111111111111111f11f1f3133f11111111111111111111feefef3f
                            111111111111111111ff11f11133f1111111111111111111fffeee3f
                            11111111111111111111111ff113f1111111111111111111e3ffe33f
                            1111111111111111111111111fff1111111111111111111f3333333f
                            11111111111111111111111111111111111111111111111f3333333f
                            111111111111111111111111111111111111111111111111f3333ef1
                            11111111111111111111111111111111111111111111111f1feef1f1
                            11111111111111111111111111111111111111111111111f1f11f1f1
                            111111111111111111111111111111111111111111111111ff11fff1
                            1111111111111111111111111111111111111111111111111f1f1111
                            11111111111111111111111111111111111111111111111111f11111
                        `, SpriteKind.Creature)
            case 107:
                return sprites.create(img`
                            111111111111111111e11111ffe111111111111111111111
                            11111111111111111fef11ef31ee11111111111111111111
                            1111111111111111ee3f1f3313ef11111111111111111111
                            11111111111111e1fe3ef33113ef1efe1111111111111111
                            1111111111111e1fe3ef331113eff11ee111111111111111
                            1111111ffe111f3fe3ef33113eff113ef111111111111111
                            111111f113ffff3e33f331113ef1113ef111111111111111
                            111111e111133fe333f33113ef1113efffe1111111111111
                            1111111f31113fe333331113ef113efe311e111111111111
                            1111111e33113fe33333113ef1113ef3113f111111111111
                            11111111f3311fee3331113e1113ee3113ef111111111111
                            11111111e3331fee333111311133e33133ef111111111111
                            111111111e333eff3331111113ff33333efffe1111111111
                            111111111f33eef1f31111113f11f333effeeefe11111111
                            111111efffffeef11f111113f111f333efee333efe111111
                            1111ef3333eefff1ff11111ff311e33efee333113efe1111
                            111f33333333efffff1111ff1f1e33effe333111113efe11
                            11f331133333eff3331113fffefe33efee333333111113e1
                            11f3111133333efe3333333fff333efeeee33333333331f1
                            1ee3311333333efe333333333333eefeeeeeffffffffffe1
                            1fe33333333333ef3e333333333eefffffffffff11111111
                            1fe33333333333efe3eeee333eeeffffeefffffef1111111
                            1eee3333333333effe33133eeefffee3eeefffeeef111111
                            11fe333333333eefefeeeeeefffe33133eeffe3effe11111
                            11fee33333333eefeffffffffeeee333eeefe33efff11111
                            111feee3333eeefeeffffffe3333ee3eeefe33fffeef1111
                            1111feeeeeeeeefefffffe3331133eeeefe3ffffefeeff11
                            11111ffeeeeeffffffffff3311133eeefeffffefeefeeef1
                            1111111ffffffffffe333efe3133eeefefefeeef33efeeef
                            111111111ffffeeeefffe33fe33eeefefeef333e3333ffef
                            1111111ffeeeeeeeeeeeff3ef3eeefeee3f13333e33333ff
                            11111efee3333333eeeeeefeefeefeee33f13333f13333ef
                            1111eee33333333333eeeefeefeffee333f13333ff133ef1
                            1111fe3333333333333eeeefeff1fe3333f1eeeefff1ef11
                            111eee33311133333333eeefef11fffffe1effffff1ff111
                            111fe333111133333333eeeff111111111111feeef111111
                            111fe333111333333333eefe1111111111111f33ef111111
                            111fe333311333333333eef11111111111111e33ffe11111
                            111fe33333333333333eef3111111111111111e3333e1111
                            111fe3333333333333eefef1111111111111111ee333fe11
                            111eee333333333333eefef111111111111111111e33ffe1
                            1111fe333333333333eeeee1111111111111111111ffeef1
                            1111fee3333333333eeeef1111111111111111111feeeef1
                            11111feee33333eeeeeeee111111111111111111e33eeef1
                            11111eeeeeeeeeeeeeeef1111111111111111111feeeefe1
                            111111efeeeeeeeeeefe11111111111111111111effffe11
                            11111111effeeeeefe111111111111111111111111111111
                            11111111111efffe11111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 108:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111ffffffff111111ff11111111111111111111
                            111111111111111111ffddddddddff111f11fff11111111111111111
                            111111111111ff11ffddddddddddddff11ffdddf1111111111111111
                            111111111fff11ff11dddddddddd3333f1fdddddf111111111111111
                            1111111ffdddfdfd11ddddddddd333333ffddddddf11111111111111
                            111111fddddd3ffddddddddddd3dd11d33fddddddf11111111111111
                            111111fdddd33fdddddddddddddd1ffdddf3ddddddf1111111111111
                            11111fddddd33fddd33333ddddddf1ff3d3fddddddf1111111111111
                            11111fdddd33f1dd3333333dddddffff3d3fddddddf1111111111111
                            11111fddd33f1111ddddd33ddddddff3dd3fddddddf1111111111111
                            11111fddd3fd11d33dd33ddddddddddddd3fddddddf1111111111111
                            11111fddd3fddddff3dff3dddddddddddd3fddddd3f1111111111111
                            111111fdd3fdddddddddddddddddddddd3fdddddd3fffff111111111
                            111111fdddf3ddd33333333dddddddddd3fddddddf11dddff1111111
                            111111f3dd3f3d3ffffffff333ddddddd3fddddd3f11dddddf111111
                            1111111fddd3f3ffffffffffff33dddd3f3ddddd3fddddddddf11111
                            1111111f3ddd3fffffffffffffff3ddd3f3dddd3fddd1ddddddf1111
                            11111111f3ddd333fffffffffffffddd3333dd33fddddddddddf1111
                            111111111f3333333f33fffffffffddd33333333fdddddddddddf111
                            1111111111ff33333f3f333fffff3dd333333333fdddddddddddf111
                            111111111111ff33fd3f333ffff3d33f3dd33333fddddddf3dddf111
                            11111111111111fffd3f333f333d3ff33ddd33333fddddddf3dddf11
                            111111111111111fd3f3333fdddfff33ddddd3333fddddddf3dddf11
                            11ffffff1111111fd3f3333fffffdd3ddddddd3333fd3d3d3f3ddf11
                            1f11d333ff1111fd133333fffdd111dddddddd3333f3d3d33f3dd3f1
                            1f11d33333f11fd13f3333fdd1111d3dddddddd3333f3d333f33d3f1
                            fddd3d33333f1fd33f3333f1111dd333ddddddd3333f333333f3d3f1
                            fd33d1d3333ffd33f3333f111dd3333dddddddd33333f33333f333f1
                            fd333d333333fd33f3333fddd33333d11dfffff33333f33333f333f1
                            fd3333333333f33f33333f333333d111df11111ff3333f3333f333f1
                            fd3333333333f33f3333f33333d11dddf11111dddf333f3333f333f1
                            1fd3333333333ff33333fdddd111d33fdffffffff3f33f3333f33f11
                            11fd333333333ff3333f111111dd333fddddddddd3f333f33f333f11
                            111fd333333333f3333fdddddd3333fddddddddddd3f33f33f333f11
                            1111ffd33333333f33f33333333331fddddddddddd3f33f33f33f111
                            111111ffd3333333ff133333333111fddddfffdddd3f33f3f1f3f111
                            11111111fffffffff111111111111dfdddf133fddd3f33f3f1f3f111
                            111111111111f1111f111111111dd3fdddf333fddd3f33ff111f1111
                            11111111111f1111ddfdddddddd333fdddf333fddd3f3ff111111111
                            11111111111f1111d33ff3333333333fdddfff3dd3f33f1111111111
                            1111111111f111ddd33fffff333333dfdddd33ddd3f3f11111111111
                            1111111111f11ddd333ffffffffffffffddddddd3f3f111111111111
                            111111111fffffff33ffff11111111111ffffffffff1111111111111
                            11111111f11dddddffff111111111111111111111111111111111111
                            111111111ffffffffff1111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 109:
                return sprites.create(img`
                            1111dd11111111111111111111111111111111111ddd1111
                            111dbddd1111dd11111111111111111111111111ddddd111
                            111dbbdd111ddddd111111dd1111111111111111dbdddd11
                            1111ddd1111dbddd11111bdd11111111dd111111bdddbd11
                            11111dd1111bdbdd111111bb1111111bddd111111bdbdb11
                            1111dddd11bdbdb111111111111111bdbdd111bdbdbdb111
                            111dddddd1dbdb11111111ffff11111bdbd1dddddbdb1111
                            111dddbdb1bdbb1111111f1dbff11111bbdddddddd111111
                            1111bbdbd11bb1111111bf1dbbf1111111bdddbdb1111111
                            11111dbdb11111111111f1ddbff11111111ddbdbdb111111
                            1111dbbb111111111bffbb1dbbffffb111ffddbdfdf11d11
                            111ddbd11111111ffbbbbbbbffbffffffdddfddfdf11dbd1
                            111dbdb11bff1bfbbbbbbbbbbbfbfbfbbdbbbfddf111bdb1
                            1d1ddbd1bfdbffbbbbbd11111dbfbfbfbfbbbf11ddb11b11
                            dddddd11fddbfbdbbb1111bbd1dbfbfbbbfbf11bdddb1111
                            ddbdb111f1dfbdbbbd1bbbbbb11bbfbbbbbfb1bdbdbb1111
                            dbdbdb111f1fdbbbb11bbddbd11bbbbbbbbf111bddbf1111
                            11bdbbd11bfbdbbbb11dd1111dbbbbbbbbbbf111dbf11111
                            111bbdd111fbbbbbbb1111111bbbbbbbbbbfbf1111111111
                            11111d111bfbbbbbbbbd1b1bdbbd1bbbbbfbff111111d111
                            11dddd111fbfbbbd11bb1bdbbb1111bbbbbfbf1111dddd11
                            1dddddd11fbbbbd1111bbbbbbdd11bbbbbfbfbb111dbdbd1
                            ddddddd11fbbbbbd1bb1dbbd11bbbbbbbfbfbff111bdbdb1
                            bbdbdd11bfbbbbbbbbbbd111dbbbbbbbfbfbfbf1111bdb11
                            bdbddb1bdfbfbbbbbbd11dbd1bd1bbbbbfbfbff111111111
                            1bdfbf1bdffbbbbb111dbbbbb1111bbbfbfbfff111111111
                            11bbf11fbfbfbbbbddbbbfbbbbd1bbbbbfbfbbbf11111111
                            1111111fbbfbbbfffffbfbfbbffffffbbbfbfd11f1111111
                            111111ddfffbbff1111fbfbbff1111fbbfbfbbd1f111dd11
                            11111dddddfbbb111f11fbbbf1f1111bbbfbfbbbf111dd11
                            11111dbdddbfbbf11111fbbbf111111bbbbbffff11111111
                            11111ddddbdbbbbbf11bbbbbb1111ffbbbbffb1111111111
                            11111dbdbb1bfbbbbbbbbbbbbbffbbbffbbff11111111111
                            11111bdbdb11dbbffffbbbbbbbbbffddfbffb1111dd11111
                            111111bbb11fdbbfffff1fffff1fdddffffbdd11dddd1111
                            11ddddd1111fbbfbffdd1fdddd1fddfffbbddddddbddb111
                            1ddddddd1111ffffbbbfffbbbbffffbbf11dbdddbdbdb111
                            dddddddd11111ff11ffbbbbbbbffbbbdf11bdbdb1bdbd111
                            dddddddb111111111111ffffff11fbdf1111bdbd11bd1111
                            dddbdbdb111111111111fbddf1111ff111111bdd11111111
                            1dbdbdb1bb111bd111111fbb111111111111bdddd1111111
                            11dbdbdddbb1bdbd1111111111dd1111111bdbdddd111111
                            11111dddfdf1dbdb111111111ddddb11111dbdddfd111111
                            11111bdfdfb11bb111111111bdddbdb1111bdbdfdf11dd11
                            111111bbfb111111111bd11bdbdddbd11111bdfdf111dd11
                            11111111111111d1111dd111bddbbd1111111fdf11111111
                            11111111111111111111111111bdd1111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 110:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111ddd11111111
                            111dddd1111111111111111111111111111111111111ddddb1111111
                            11ddddddd11111111111111111111111111111111111dddbdb111111
                            11dddddbd111111111111111111111111111bffffbd11dbdb11bd111
                            11ddbdbdb1111111111bfff111111111111f11dbbbfb11bbddbdbd11
                            11dbbbdb1111111111bdddbb1111111111fd11bbbbbfb111dddbddd1
                            111dbdb1111111111bfdbbff1111111111fbdbdbbbbbb1111dddddd1
                            11111111ffb111bffffdbffff1111111bfbdbdbbbbbbfb11dddddbb1
                            111111bfdbfffffddbbbbbbfffb11bfffbdbbbbbbbbffb11ddbdbdb1
                            111111fddbbfdbbbbbbbbbbbbffffdddbbfdbbbdbdbffb111bdbdb11
                            111111f1dbfbbbbbfffbbbbbbbdddbbbfffffbbbdbfff11111bbb111
                            11dd11bfbbbbbbbf111fbbbbbbbfbf1111ffffbfbfbfb11111111111
                            1dddb11ffbbbbbf1111bbbbbbbbbf111111fffbbfbff111111111111
                            1bdbb1ffdbbbbf1f11bf1fddbbbbbff1111fdbbbffb1111111111111
                            11bb11fdbbbbbb11bbff1fffdbbffbbfffffbdbf1111111111111111
                            11111ffdbbbffbbbbf1fffffbffbbbbbdbdbdbbf1111111111111111
                            11111fdbbbf11bbbbffffdbbffbdbbbbbdbdbfffb111111111111111
                            1111bfbbbf1f1bbbfffdbbffdb1b1bdbbbdbfbfbf111111111111111
                            111bffbbf111dbbfffdbffffb1b1b1bbbbbbbfbfbf11111111111111
                            111fbdbbf11dbbfffdbffffbbbdbdbdbdbbbbbfbfbf1111111111111
                            111fddbbbbbbf1ffdbfbfbfbbbbbbdbdbdbbbbbfbffbbfff11111111
                            111fdfbbbbbfffffbbbfbfbbbbbbbbdbdbbbbbfbfbbffd11f1111111
                            1111ffbfbb11dffdbbbbbbbbbbbbbbbdbdbbbbbbbbfddddd1f111111
                            11111ffbbbbffffdbdbbbbbbbbbbbbbbbbbbbbbbbdddbddddf111111
                            111111ffbbbdffdbfdbbbbbbbbbbbbbbbbbbbbbbbbbddbbdbf111111
                            11111bfbbbbbddbfdbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbf111111
                            11111bbfbbbbbbbfdbbbbbbfbfbbbbbbbbbbbbbbbbbbbbbff1111111
                            1111bfddbbbfbfbbffbbbbbbfbfbbbbbbbbbbbbbbbbbbffb11111111
                            1111fddbbffbfbbbddffbbbfbfbfbbbbbbbbbbbbbbbbfbff11111111
                            1111bfdffbffbbbbb1ddffbbfbfbbfbbbbbbbdbdbbbbbbff11111111
                            11111bffb1bffbbbb111fdffbfbffbbbbbbbdbdbdbbbbfbf11111111
                            111111bb11bfbbfbbf11f1ddbfbbfbbbbbbbbdbdbdbbbbff11111111
                            11111111111fbfbbbbff111bbbfbfffbbbbbbbbbdbdbbfbfbf111111
                            11111111111fbfbdbbbbffbbbbfbdfdffbbbbbbdbdbbbbbbddf11111
                            11111ddd111fbff1fbbbbbbbbbbb1f1ddffbbbbbdbdbbbbfddf11111
                            111dddddb111fbf1ffbbbbbbbbbbf1111ddffbbbbdbbbbbfbdf11111
                            111dbddddb11fbf1df1bbbbbbbbbbfb11111ddfbdbbbbbfbbbfdd111
                            11dbdbdddd1fbbf1dff1fbbbbbbbbbbfb1111bbbbbbbbbffffdddb11
                            111dbddbdb1fbbbfdffffdfbbbbbbbbbbbbbbbbbbbbbbbfb1dddbd11
                            111dddbdb1ffbbbbbbdfffffbbbbbbbbbbbbbbbbbbfbfbf11ddbdb11
                            1111dddb1fbdffbbbbbbdfff1fbbbbbbbbbbbbbbbbbfbb1111bdb111
                            111dddd11fdbfffbbbbbbbdff1ff1bbbbbbbbbbbbbfbff1111111111
                            11ddbddd1fbbbfffbbbbbbbbfff11bbbbbbbbbbbbfbfbfb111111111
                            1ddbdbdd11fbfffbd1ddbbbbbff1dffbbfbbbbbbbbfbddfb11111111
                            1dddbddb111ffbbf1111dbbbbf11dfdfbbfbbfbfbbbbdddf111ddd11
                            11ddddbdb111111bf1111dbbbb1dffffbbfbfbfbfbbdbddf11dddd11
                            11dbdbdb11111111bfb111dbbbbdffffbbbfbfbfbfbbdbfb11dddbd1
                            111dbdb1111111111bfbb11dbbbbdffbbbbfbbfbf1fbbfb11dbdbdb1
                            1111111111dd1111ddbbfb11fbfbbbbbbbbfbfff111ffb11dddbdbb1
                            111111111dbdb111ddddbffdbfbfbfbfbbfbbf11111111ddddbdbb11
                            111111111bdbb111dbddddbffffbfbfbbfffbbf111111ddddddd1111
                            111111111dbdb111bdddbd111bbffffffffbbbf111111ddbdbdb1111
                            1111111111bb11111bdbdb111111bbffffffbf1111111dbdbdb11111
                            111111111111111111bbb111111111111bbff111111111dbdb111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 111:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111111111111111ff111111111111111111111111111
                            11111111111111111111111111f11b11111111111111111111111111
                            11111111111111111111111111f1ddb1111111111111111111111111
                            1111111111111111111111111f11ddbf1111111f1111111111111111
                            1111111111111111111111111f11ddbf111111fbf111111111111111
                            111111111111111111111111ff11ddbbf1fb1fbbf111111111111111
                            1111111111111111ff11111fff1ddbbbbfbdfbbbbf11111111111111
                            1111111111f1111b11f11ffff1ddbbbbbbbdbfbbbf111fff11111111
                            111111111f1f111f11dff11dfdddbbbffddfddffff1ffbbf11111111
                            111111111f1df11f11ddbfffdddbbbf11fdfbddddffbbbbf11111111
                            111111111f1ddf1f11ddbbbdddddddfddfbbfddddddffbbf11111111
                            111111111f1ddbff11dbbbdddddddf11dbbfbfdddff11fbf11111111
                            111111111fddbbbf1dbbbbdbbbdbbbf1dbbbbbfff11ddbff11111111
                            111111111fddffff1ddbffffffbfff1ddbbbbbbf111dbbbf11111111
                            111111111fdbf111ddbf111bbffff1fdddbbbff11dddbbbfb1111111
                            111111111fbf1ddbbfff111fbbffbdffffdfff11dddbbbfdf1111111
                            111111111ffffbbffbb111dfffdbfbddddffddddddbbbbfdf1111111
                            11111111f1111ffbbbbf111fffddbfbddddddddddbbbbbfddf111111
                            1111111f11111ddbbbb111dffffdbfbdddddddddddbbbbfdddb11111
                            111111f1111ddddbbff111ddbbbdbfbbddddddddddbbbbfbbdf11111
                            111111f111ddbbbff111ddddbbbdbdbfbddddddddddbbbfffbf11111
                            11111f111ddbbfff1111dddddddbddbfbbddddddddddff11ffffff11
                            11111f11ddbfffff111ddddddbfbdfffffbddddddddbbd1111111f11
                            11111f1ddbfffff11dddddddffbbfddbfffffbdddbbffdddddddd111
                            1111f11dbbffff11dddddddbbbbbbdddbffffffbbfffdfdddbbbf111
                            1ff1fdddbfffff11dddddbffbbbfddddbffffffffdbbfbfdbbbbff11
                            b11fddbbffffff11ddddffffbbfddddbbfbbbbddddddbbbfbbbfbf11
                            f1111fbbfffff111dddbfdfbbfdddddbfbbbbbbddddbbbfbbbdfbf11
                            f11111ffffff111dddbfddfbfddddddbfbbbbbbbbbbbbfbdddddffff
                            f11111ddfffddddddbfdd1ffbddddddbfbbbbbbbbbbbffbddddddddf
                            1f1111dddfbddddddfdd11ffbdddddbbbfbbbbbbbbbffbbfdddbbbf1
                            1f1111dddbbfdddddf1111fbbddddbbbbbfbbbbbbbbfbbbbfbbbbf11
                            f1f11ddddbbbddddb1f11fbbdddddbbbbbfbbbbbbbbfbbbbbfbbfdf1
                            f1fdddddbbbbddddfff1fbbdddddffbbbbfbbbbbbbbbbbbbbfbbbfbf
                            f1fddddbbbbdddddffffbbddddbffffbbfbdddbbbbbbbbbbffbbfbdf
                            f1dfbbbbbbbddddf111ddddddffffffffbbfffddbbbbbbbfbbfffbdf
                            f1ddfbbbbbbddbf11dddddddfffffffbbfffffffdbbbbffbbfffbbbf
                            f1ddffbbbbdddf111dddddbfdfffffbbbfbbfffffbbffffffffbffbf
                            1fdddfbbbdddf111dddddffddffffbbffbbbbbfffffffffffffbfbbf
                            1fdddd1fbdddf11ddddbfddddfffbbfbddbbbbbbffffffffffffbfbf
                            11ffdd111ddf111dddffdd11fffdbbf1ddddbbbbfffffffffffbfbbf
                            11fbfd111ddf11bbbffff11fff1dbf1ddddddbbbffffffffffffbffb
                            11fbfddddddbbbbbffffffffffbffddddddddbbfbbffffffffffffb1
                            111fbdbbddbbbbfffffffffffdbfbbbbbdddbbbf11bbffffffffffb1
                            1111ffffbbfffffffffffbbbbffffffbbbddbbbf1111bffffffffb11
                            1111ffffffffffffffbbbbbbffbbbbbfffbbbbf111111bfffffffb11
                            11111ffffffffffbbbbbbbbff1111ddbbbfbbbf1111111ffbbffb111
                            11111fdffffddddddddfffff111ddddddbbfbf11111111bb11bb1111
                            111111f11dd1111bbbbff11f111dddddddbbff111111111111111111
                            1111111ff11fbbbfffff111fff1dddddddbbf1111111111111111111
                            111111111ffbffffffff11f11dfbbfffdbbbf1111111111111111111
                            1111111111fbbbf11fff1f11ddfbf11dfbbbf1111111111111111111
                            111111111fffbbf1ddff1fffff1ff1ddffff11111111111111111111
                            11111111f11fff1fff11111111111fff111111111111111111111111
                            111111111fff11111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 112:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111bbb1111111111111111bbbb1111111111111111111111111
                            11111111bddf1111111111111bb11df1111111111111111111111111
                            11111111fdddbf1111111111b11ddbf1111111111111111111111111
                            11111111fdddbbff111111bf1bffbf11111111111111111111111111
                            111111111fddbbbffffffff1bfbbbf11111111111111111111111111
                            111111111fdbbffb1111dfdbfbbbbff1111111111111111111111111
                            11111111bbffb111111d1ddfbbbbbbf111111bff1111111111111111
                            1111111f1dddd111d1d1ddddddbbbdbf1bbff11df111111111111111
                            1111ff11ffbbbbbd1d1dddddddddddddff111bbbf111111111111111
                            111f11f1fdffffdddddddddddddddddddbfbbbdf1111111111111111
                            111f111ffddbbbddddddddd1dddddddddddfbdddfff1111111111111
                            111fbd11fddbbbddddddd11ddbfdddddddddfddddbbff11111111111
                            1111fbd11fddbdddddd11ddbfbddddfddddddfdbbddddf1111111111
                            1111fbdd11f11dddd111bdbfd1bddddffddddfbbdddfff1111111111
                            11111fbdd11f1111111bddfd111bddddbfddddfddff1111111111111
                            11111fbbd1b1f11111dbdfb1111fdddbfdddddfbbbbf111111111111
                            11111fbffb111f111dbdfffb11fbdddffffddddfbddf111111111111
                            11111bfbbdd11bf11dbd1bfffbddddd1111fdfdfdff1111111111111
                            11111ffbbbddbdb1dddfbff11dddddddd1bfddfffbdf111111111111
                            11111fdfbbbbdddddddff111dddddbbbbffddfbbfbbf111111111111
                            11111fdffffdddddddddddddddddbbbffbdddbddbffff11111111111
                            1111ffddfbbbddbdddddddddddbbbbbbbfddddddddbbbf1111111111
                            111b1fdddfbbbbdddddddddbffffffbbbbfbdbddddddbbf111111111
                            11b11dfd1111dddddddddbfd11fffbbbffbdbdbddddddbbf11111111
                            11b11dfb11bfddbfddddbfd11ffffbbfbbdbbbbdddddddbf11111111
                            1b111ddff111ddddddbffff1fffdffffbbbbbbbbfbbbdddbf1111111
                            1b11dddbbff1dddbffffffffdddffffbbbbbbbff1dddbdbbf1111111
                            1b1dddbbbbffffffbbbbbdddffffffbbbbbbbf111ddddfbbf1111111
                            1fdddbbbbbbffbbbddddddffffffbbbbbbbff1111dddddfbf1111111
                            f1fddbbbffddbffffffffffffbbbbdbbbbf1f111ddddddfbf1111111
                            fdffffff1fddddddbbbbbbbbbddbdbbbbf1dfbddddddbbff11111111
                            1ff1df11fdddddddddddddddddbdbdbbbbffffbddbbbbbf111111111
                            111ff111fddddddddddddddddddbdbdbbbbf11fbbbbbbfbf11111111
                            11111111bddddddbffffffffffbdbdbbbbbf1dbffbbbfbdf11111111
                            1111111fdddddbff1111111dddffbbbbbbbbfff11fbffff111111111
                            1111111fddddbf111111111ddddbffbbfbdddbf1dfffffff11111111
                            1111111ffdddf111111111ddddbbbbf111d1dddffbbfffbbf1111111
                            111111bddddbf111111111ddddbbbf11111d1ddddfbbfbbbf1111111
                            11111fd11ddbf111111111dddbbbf11111d1ddddddfbfbbbbf111111
                            11111b111dbbffffffffffffffff1111111d1dbfbbbfbbbbbbf11111
                            1111b1111dbbfddddddddddddbbfd11111d1dbf1ffbfbbbfffbf1111
                            1111f111ddbbfd1111111dddbbfddddd1d1ddbfd1bffbbfbbbbbf111
                            1111fddddbbbfbd111111dddbbfdddddddddbbfbd1dbffffbbb1bf11
                            1111fddddbbbbfd11111dddbbbfdddddddbbbbbfddddb111b11bdf11
                            1111bdddbbbbbfbddddddddbbbfbdbffdbbbffbfbdddb1dddbddbbf1
                            11111fbbbbbbbbfffffffffffffbf11db11111fbfbddfddddbdddbf1
                            11111fbbbbbbbbbbfdddddddbbbf111b1111dddffbbfdddddfdddbf1
                            111111fbbbbbbbbbbffbddddbbb111df111dddbfffbfddbbfdbdbbf1
                            1111111fbbbbbbbbbbfffffffff11dbf111ddbbbffffbbbbfbdbbbf1
                            11111111ff11fbf11ffbbbff11f1ffffffffffbbff11fffbfbbbbf11
                            11111111f111df111ddbff11111ffffffffffffff111111ffffff111
                            11111111f11df111ddff11111111111fffffffff1111111111111111
                            111111111fffffffff11111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 113:
                return sprites.create(img`
                            1111111111111111111111111133ffffd111111111111111
                            1111111111111111111111113f1111113ff1111111111111
                            111111111111111111111d3f1111111111d3f11111111111
                            111111111111111d3ffffff1111111111111df1111111111
                            1111111d3fffffffdddd3f111111111111111df111111111
                            111111111dfddddddd3f31111ff111111111113111111111
                            111111111113fff333f11111f1111111111111df11111111
                            1111111111111111ff111d31ff11111ff11111d3f1111111
                            11111111111111ff11111113ff1111f111111113f1111111
                            1111111111111f31111111f1111111ff111111133f111111
                            11111111111f3111111111dff31113ff111111133ff11111
                            1111111111f1111d3f31111fffff113d11111111f3fffff1
                            111111111f1113311113111fff3111113311d111f3f3333f
                            11111111f111111111df13311d11111111d13111f33f3ff1
                            1111111fd1111111113fffd331111111111df1111f33f111
                            111111fd11111111d3fd11f1133d1111111ddf111f3ddf11
                            11111fd1111111df3fd1111f111111111111df1111ffddf1
                            11111d11111111fddfd11111311111111111ddfdddf1fff1
                            111131111111f3ddd1f1111113d111111111dddfdddf1111
                            1113d111111ddd11113111111113d1111111ddd3f33df111
                            111f111111111111111f11111111111111111ddd3ff33f11
                            113d111111111111111311111111111111111ddd3f1fff11
                            11f11111111111111111f1111111111111111ddd3f1111f1
                            11f11111111111111111df111111111111111dddd3f11f1f
                            131111111111111111111dfd1111111111111dddd3f11f1f
                            1f111111111111113ff311d33111111111111dddd3f1f11f
                            1f1111111111113f1111f1111111111111111dddd3f3f11f
                            1f11111111111d1111111f11111111111111ddddd33fd1df
                            1f11111111111f1111111df1111111111111ddddd33fddf1
                            1f1111111111d1111111ddd1111111111111ddddd33fddf1
                            1f1111111111f1111111dddf111111111111ddddd33fddf1
                            1f111111111f1111111dddd3f11111111111dddd333fdf11
                            13111111111f11111ddddd3fff111111111dddd3ffffff11
                            11f11111111fffddddddfff33f111111111ddddfd11d3f11
                            11f11111113dddffffffddd33331111111ddddfd1111d3f1
                            11fd111111fd11ddddddddd333f1111111dddfd111111df1
                            113d111111fd11ddddddddd333f1111111ddfd1111111df1
                            111f111111fddddddddddd3333f111111ddfd1111111ddf1
                            1113d111113dddddddddd3333f3111111dfd1111111ddf11
                            1111fd11111fdddddddd33333f111111dfd1111111ddf111
                            11111fd11113dddddd333333f311111df11111111ddf1111
                            111111fd1111ff333333333fd11111ddfd111111ddf11111
                            111111fffd1113ff33333ff11111dd3fdd11111d3f111111
                            1111ff333ffd1113ffffd11111ddd33f3dd11dd3f1111111
                            11ffdddd33fffddd11111111dd3333ff33ddd33f11111111
                            1fd111ddd33ffffffddddd33ffffffff333333f111111111
                            1f11111dffffff133fffffff3331133df333ff1111111111
                            1fffffffff11111111111111111111111fff311111111111
                        `, SpriteKind.Creature)
            case 114:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111111111111666ff111111116f11111111111111111
                            1111111116ff166f1bbb166f1116f11f1111111111111111
                            1111111661116111b666bbbb6ff11bbfff11111111111111
                            1111116111b611bb6fff6666bbbbbb6f66ff1111fff11111
                            11111611bb6f1b6ff666ffff666666f6bbbbf6ffbbbf1111
                            1111161bb6f1b6f666666f66ffffff6bbb666fbbbbbf1111
                            1111611b66f1b6ffffbb66f66f6666bb666ffbbbb6f11111
                            1111f1b66fff6f6666fbbbf666fbbbb66ffbbbb6ff111111
                            111611bff666f6bb66ffbbff6bbff66ff66bb66f6f111111
                            111f1b611bb6f1b6ff6f11fff6bbbff666666ff666f11111
                            111f16111b6f116f666f11f66f66bb1fff6ff6f66bf11111
                            111f1611b6ff1bf6f66f11ff66ff666111fff66fbbbf1111
                            111161116f6f1bf6fb6fb1fff66ffff6611bf666f6bf1111
                            1111611b6f6f1bf6fbbf6b1ff66ff66ff66bbf6bf666f111
                            1111f1b6f6bfbbfbfbb6fbb1ff6f66bb6ff6bbf6bf66f111
                            1111f1b6fbbfbbfb6fbbf6bbbbfff66bbf6f6bbfbf66f111
                            1111f6b6fbbf6bfbffbb6ff666bbbffff6fff6bf6bff1111
                            11161fbb6fbff66ffffbb66fff666f666ffff6bbfbff1111
                            111f1f6bb6fbfffffffffff666fff6fffff66f6bfbbf1111
                            116116f6116fffff11fff11fbb6f6666fff66f66f6bbf111
                            11f11f1f6116fff1111f1111fbb6f666666f66ff6fbbf111
                            11f1bbfff611fff11f1f11f1fb11fffbbb66f6666fbbf111
                            111fbb666f6bfff1111f1111ff11f66fffb6fbbbf6b6f111
                            1111ffbb6f6bbfff11fff11fff111f6f66f66fbbf6bf1111
                            111f66ffb6f6bfffffffffffff6bbfff66f66fbbf6bf1111
                            111fb6fbfff6bbfffffffffff6fbbbf66f666fbbf6bf1111
                            11fbbf1bb66f6bbbfffff66f66f6bbbffff6f6fbbf66f111
                            11fbf1ff1b66ff66bbbbf66f66bf66bbbbbf66fbbf66f111
                            111f11f6f1b666ff6666ffbbfbbbff66666f666fbbf6f111
                            11166616ff1bbbf6ffff6f6bf66bbbffffffff6f1bbf1111
                            116fff6ffbf1bfff6f66f6fbbf6666bbbbbbbbfff1bbf111
                            16fffff6fbbfffff66f66ff6bbff6666666666bbbf111f11
                            16ffffff6fbb6ff6f66fff6f6bffffffffffff666ff11f11
                            16fffffffffbb6fffff66ff6f66ff66f66f66bfff11ff111
                            116ffffffffffbb6ff6ff66ffff66ff6fbbfbf6111111111
                            1116fffffffffffbb6f11ff6ffffbbbfffffff6111111111
                            111166ffffffffffbbf111116ff6fffbbbbbff6111111111
                            1111116fffffff66ff1111111661116fffffff6111111111
                            111111166ffff61111111111111116fffffff61111111111
                            111111111666611111111111111116fffffff61111111111
                            11111111111111111111111111116fffffff611111111111
                            11111111111111111111111111116fffffff611111111111
                            111111111111111111111111111116fffff6111111111111
                            111111111111111111111111111111666661111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 115:
                return sprites.create(img`
                            11111111111111efff11111111111111111111111111111111111111
                            1111111111111f133ef1111111111111111111111111111111111111
                            111111111111f1133fef111111111111111111111111111111111111
                            11111111111fe3effffffffe11111111111111111111111111111111
                            11111111111fff3111333333fff11111111111111111111111111111
                            1111111111fff11111133333333ff111111111111111111111111111
                            111111111ff31111113333333333eff111fffffff111111111111111
                            11111111f3333111333333333333effffe3111111f11111111111111
                            111111ef33333333333333333333efe311111111f111111111111111
                            11111fe33333333333333333333ef111111111fe1111111111111111
                            1111f333333333333333333333eff11111111f111111111111111111
                            111f3333333333333efffffeeeff31111113f1111111111111111111
                            11e333333333333effe3331fffee331111ef11111111111111111111
                            11f3333333333eff3331111feeee33333ff111111111111111111111
                            11fe33333333ef1efe1111f333efe333ff1111111111111111111111
                            1f1ffeeeeeeefe1ffe1111f3333effffeff111111111111111111111
                            1f111ffff3efffeff111ef33333eeeeeef3ff1111111111111111111
                            1f1113333333effffeeff333e333eeeeee3ef1111111111111111111
                            11f33fe33333333333333333e333eeeeeeef11111111111111111111
                            11fe3333333333333333333ef333eeeeeef111111111111111111111
                            111ffffffe333333333333ef333eeeefeef111111111111111111111
                            11111113f11feffffffeeefe333eeeeefeffff111111111111111111
                            11111111f11fffffe111ffe33eeeeeeeeff1eef11111111111111111
                            11111111f1ffffffff11f33feeeeeeffff113ef11111111111111111
                            111ffff13feffffeeef1f33eeeeffff33ee3eef11111111111111111
                            11ff111fef3ffeeeeef3f3feeef1111feeeef11ff111111111111111
                            11f11111ef3feeeeeeef33feef11111ffffeef13f111111111111111
                            111fffe13f3feeeeeee33fee3ff333ff111fee33f1111111111f1111
                            11f1111ffee3eeeeeef3fee3f11fff11113fee3ff111111111e3e111
                            1f111111f3f33eefff33fee3f111f113333feee3fff1111111f3f111
                            1f1113ffe3ff3333333fee333f11ffffeffeeeeeeefff1111e13f111
                            1e33ffee33fef333ffffff3333ffff3eeeeee3eeeeff1f111f33f111
                            11fffff33ef3eeff33eeeeffff333f3333eee333eef331f1e133f111
                            1f1111ffff333f333eeffff331f33ff33333e333eff331f1f3311f11
                            1f113ff13f33f3eefff3111f111f333f33333333efe33eff133113f1
                            11eef1f13f3f3fff311fff11ffff333fe333333eeffeeef133f33ef1
                            111111f33f3f111111ff1ff13ef33efffffffeeefefeef1333f3eef1
                            111111f3fe3f3111113ffff33ef33fe33333effffeeffff3333fff11
                            1111111ffe33ffff31111333effffe33113333efeffff11ff333ef11
                            1111111efe33ff33ff3333ffff3ff3111333333ff1113f133f33ef11
                            11111111feff13fe33ffef13eff3f311133333f111133ef33f33e111
                            11111111feef13efee33f1133f33f311133333f111333efeef3ef111
                            11111111f1ef13effffff133ef3f3133333333f11133eefef3eef111
                            1111111f11ef33ef3111f3eef33f33333333333f133eee3f3eef1111
                            1111111f13eefff331111fff331f33fffeee3333fffeeeefeeef1111
                            1111111f13eef33311111113311e1f111333f333333fffffeef11111
                            111111f13ee3f331111111111133f1133333ef333333eeffefe11111
                            111111f1ff33eff11111111133fff1333333ef333333eeeffe111111
                            111111ff1133eeef1133333fffeef1333333ef33333eeeefe1111111
                            111111ff133eeeeeeffffff33eeeef33333ef33333eeeeeff1111111
                            1111ff11ffeeeeeeeefe133eeeeeeefeeeefee3efffffeeffe111111
                            111f111133fffeeeeefffeeeeeeeeefffffeeef111113ffeff111111
                            11f1111333333feeeeffffffffffff111ffeef111113333fffe11111
                            11f11333333333feeffffff111111111111ff111113333333ff11111
                            111fffffffffffffffff1111111111111111fffffffffffffff11111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 116:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111f1111111111111111111111111111111
                            1111111f9f111111111111111111111111111111
                            1111111f9f1111111111111ff111111111111111
                            1111111f9f111111111111f9bf11111111111111
                            1111111f9bffffb111111f99bf11111111111111
                            1111111ff199999fb111f99bf111111111111111
                            111111f1119999999f1f99bf1111111111111111
                            11111f111999999999f99bf11111111111111111
                            11111f999999bfffb999bf111111111111111111
                            1111f1f9999f1111f99bff111111111111111111
                            1111fbbf999fbb11f99bffffff11111111111111
                            1111ffbf999fffb1f999999999ff111111111111
                            1111f1ff199f1fb1f99bbbbfff99f11111111111
                            111ffff19999ffffb9bbbff999b99f1111111111
                            1ff11119999999999bbfbbbffb999f1111111111
                            f19991999bf99999bbfffbbbbf9b9f1111111111
                            fbfffb99bf9999bbbfbb9ffff9b99f1111111111
                            fbfffb9bfbbbbbbffbb9bbbbbb99bf1111111111
                            fbfffb9bfbbbbffbbbb9bbbbbbbff11111111111
                            1fbbb9bffffffffbb99bb99bbbfbfb1111111111
                            11fffff1111111f91bff9bbbbb99bf1111111111
                            111111111111111fff19fbbbb9bbbfb111111111
                            111111111111111f11111fb99bbbbbf111111111
                            11111111111111f1111111fbbbbbbbf111111111
                            11111111111111f1199999f99bbbbbf111111111
                            11111111111111f1999f99fbb9999fb111111111
                            11111111111111f99199ff99bbbbbf1111111111
                            11111111111111f9999999999bbbf11111111111
                            11111111111111bfb99999999bbf111111111111
                            1111111111111111fb999999bbf1111111111111
                            11111111111111111fffbbbbff11111111111111
                            1111111111111111111bffffb111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 117:
                return sprites.create(img`
                            111111111111111111111111111ff11111111111f1111111
                            111111111111111111111111111f1f1111111111f1111111
                            111111111111111111111111111f1bf11111111f1f111111
                            111111111111111111111111111f1bbf1111111f1f111111
                            111111f11111111f111111111111f1bf1111111f1f111111
                            11111f1f111111f9f11111111111f1bbf11111f91f111111
                            11111f19f11111f9f111111111111f1bf11111f1bf111111
                            111111f19f1111f9f111111111111f1bf1111f91bf111111
                            111111f19f1111f9f111111111111f1b9f111f91bf111111
                            1111111f19f111f9f1111111111111f19f111f1bf1111111
                            1111111f19f111f9f111111111fffff1bf11f91bf1111111
                            1111111f19f11f19f111111fff1111f1b9f1f91bf1111111
                            11111111f19f1f19f1111ff11111999fb9f1f1bf111f1111
                            11111111f19f1f1bf111f1f111999fffb9f1f1bf11f1f111
                            11111111f19f1ffbf11f1f1f1999f1ff1b9f91bf1f11f111
                            ffff11111f19f9fff1f1f19f999f1bff1b9f1bf1f119f111
                            f111ff111f19f9f1f1fff9bf99f19fbf1b9f1bff119f1111
                            1ff111ff1f19f9f1ffff1bf99f11bfbf1b991bf1199f1111
                            111ff911ff1999f1bff1bbf9f119fbbf11b1b11199f11111
                            11111f991f1999f1bf19bf99f119fbbf11b1b1199f111111
                            111111f991f199f9f11bbfff119fbbf111b1b199fbf11111
                            1111111f999199fbf19b999f119fbbf111b1b19bfbf11111
                            11111111f99199ff11b9999919fbbbf1111b199fbbbf1111
                            111111111f999ff919b9999999fbbbfffff999fbbbbf1111
                            1111111111f99f919b999999f99fff9999f99fbbbbbf1111
                            1111111111f9f9919b999999f999999fff99ffbbbbbf1111
                            11111111111ff919b999999bfb999ff9999fbfbbbbbf1111
                            111111111111f919b99999bf1f99f99999fbbfb99bbf1111
                            11111111111f9919bb99bff11b99f9999fbbfbb999bf1111
                            11111111111ff919bbffffff1b99f999ffffbb9999bf1111
                            111111111111ff1fb99fbfff1f9f9ffffbbbfbf999bf1111
                            111111111111ffff9999f111f99f9fbbb999fbf999bf1111
                            1111111111111fbff9999bff99bf9fff999fbf9999bf1111
                            11111111111111fff99999999ffffbbbfffbbf9999bf1111
                            111111111111111f1999fbbbf1f999fffffbf99999bf1111
                            11111111111111f1199bfbb9111fff11111f99999bf11111
                            11111111111fff11199bf1111111f1111111f9999bf11111
                            11111111fff1111199bf1111111f11119b911f999bf11111
                            1111111f1111111199bf1111111f111bfff91fb99f111111
                            1111111f11bbb9199bf1111111f1119fbff99fb9bf111111
                            11111111f1fffb999bf1111111f111bfb9999fb9bf111111
                            11111111f19fffb9bf11111111f111bfb999fb99f1111111
                            111111111f99ffb9bf11111111f1111bf99fbb9bf1111111
                            1111111111ff9999f1111111111f1111bffbb99f11111111
                            111111111111fffb11111111111f11111bbb99bf11111111
                            1111111111111111111111111111f11111999bf111111111
                            11111111111111111111111111111ff119bbbf1111111111
                            1111111111111111111111111111111ffffff11111111111
                        `, SpriteKind.Creature)
            case 118:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            1111111111111111111111111111fff11111111111111111
                            11111111111111111111111111ff4f111111111111111111
                            111111111111111111111111ff11f1111111111111111111
                            1111111111111111111111ff444f11111111111111111111
                            11111111111111111111ff1111f111111111111111111111
                            111111111111111111ff44444f1111111111111111111111
                            11111111111111114f111111f11111111111111111111111
                            111111111111114ffffff41f111111111111111111111111
                            111111111ff11ff411444ff114fff4111111111111111111
                            11111111f44ff444114444f44111114f1111111111111111
                            11111111fff4444114fffff4f1114111f111111111111111
                            1111111f4f1144ff44f1fff4441411111f11111111111111
                            1111111ff1111141111fff4444f111111141111111111111
                            111111f44ff1111f1111f444444f111411f1111111111111
                            11111f11444f11114fff44444444f14111f1111111111111
                            11111f1f4444f1111111144444444f111141111111111111
                            111111f144f411111111144444444f111114111111111111
                            1111111fff11111111114444444444f4441f111111111111
                            1111111f44144111111144f4444444f1111f111111111111
                            1111111f4111144411444444f444444f144f111111111111
                            1111111f41111144444411144ff4444f4444111111111111
                            1111111f11111111444f111f444f4444f441111111111111
                            111111441111111144411411f4444f44f4f1111111111111
                            11111f144111111114f11f111f444444ff11111111111111
                            1111f11ff111111111f11f1111f144f4f111111111111111
                            111f1144f111111111f11f1111414f44f111111111111111
                            111411f44111111111f11f111111f444f111111111111111
                            1111f1f44f11111111f1141114ff444f1111111111111111
                            111114f44441111111411111f444444f1111111111111111
                            11111114fff41111111f111f444444f11111111111111111
                            111111111111f41111114f44444444f11111111111111111
                            11111111111111f41111114444444f111111111111111111
                            11111111111111114ffff44444444ff11111111111111111
                            11111111114fff411111114ff444444f1111111111111111
                            111111111f11144f4111f44444444444f111111111111111
                            11111111f111111444f44411444444444ff1111111111111
                            11111114111111111144411144444444444f111111111111
                            1111111f1111111114441111144444444444f11111111111
                            1111111f41111144444111111444444444444f1111111111
                            1111111444444444441111111144444444444f1111111111
                            11111111f444444f41111111114444144444444111111111
                            1111111114fffff44111111111444111444444f111111111
                            11111111111111f41111111111444111444444f111111111
                            111111111111111f11111111144fffff4444444111111111
                            11111111111111141111111144f111111f444f1111111111
                            1111111111111111f1111114f4111111114f411111111111
                            111111111111111114ffff41111111111111111111111111
                        `, SpriteKind.Creature)
            case 119:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            1111111111111114f411111111111111111111111111111111111111
                            11111111111111f111f1111111111111111111111111111111111111
                            1111111ff1111f111114111111111111111111111111111111111111
                            11111f4414f1f111111f111111111111111111111111111111111111
                            1111f41111444111111f111111111111111111111111111111111111
                            111f4111144f41114414111114f41111111111111111111111111111
                            11144111144441114411f11f4111f111111111111111111111111111
                            11f4411144f4111144111f4111111411111111111111111111111111
                            114411114444111441111111111111411114ff411111111111111111
                            144411414f44411441111111444111f114f4111f4111111111111111
                            1f4411414f44411441111114444111fff44411111f11111111111111
                            1f4411444f4441114411114411111ff4441f111111f1111111111111
                            1f4411444f44441144111441114f4444111141111414111111111111
                            1444111444444441441144114444111f1111f111141f111111111111
                            4444111441f444441441444ff444411f11414111141f111111111111
                            f4444114441f4444444ffffffff44444144f1111f11f111111111111
                            f444441144414f444fffffffffffff4444444141411f111111111111
                            f4444441144444fffff44fffffffffff44f4444f1144111111111111
                            4444444444444ffff444444444fffffffff444f444f1111111111111
                            1f4444444444ffff4ff11444ffffffffffffff4444f1111111111111
                            14444444444ffff4f4444fff4ffffffffffff4444f11111111111111
                            11f4444444fffffff14444f4fffff444ffffff444f111111111114f4
                            111f4444fffffff4ff144444ff4444ffffffff44f4111111114ff44f
                            11114f4114ff4f4f44f4444f4444fffffffffff4ff411114ff4444f1
                            111111111ff4f4f4444f44f4444444fffffffffffffffff444411f11
                            111111111ff444444444f4444444f44444ffffffffff44444111f111
                            111111114f44444444444f444444444fff44444ffff44441141f1111
                            11111111ff44444444444f444444fff444444444ff44411111f11111
                            11111111f4444444444f4444f4ff4444444444444f4414111f111111
                            11111111f444444444f44444fff44444444444444f111141f1111111
                            11111111f44444444f44444fff444444444444444f11111f11111111
                            11111111f44444444444444ff44444444444444444f111f111111111
                            11111111f44444444444444f44444444444fff444444f41111111111
                            11111111f4444444444444f4444444444f11111f4444f11111111111
                            1111111144444444444444f444444444411ff4114444f11111111111
                            111111111f444444444444444f444444111fff41f444f11111111111
                            111111111f444f44444444444f44444f1ffffff1f444f11111111111
                            111111111444f44114444f444f44444f1fffff41f444f11111111111
                            1111111111f4441411444f444ff4444f14fff4114444411111111111
                            11114ffff444411411f44f4444ff4444114f411f4444111111111111
                            114f44444444414111f44ff44444f444f11111f44444111111111111
                            144444444444141114f4f44f4444444444fff444444ff41111111111
                            1f4444444441141114f4f444f44444444444444444f444f111111111
                            114f44444411411114f4f4144f444444444444444444111f11111111
                            11114f444414111114f4f41144444444444444444f41111f11111111
                            111111f44444111144444f414444444444444444f4f411f111111111
                            111111441141111144444f4111444444444444444f114f1111111111
                            1111111f111111144ff444f411144444444444f41f11111111111111
                            1111111411111144f14f44f44111144444444ff41141111111111111
                            111111114f11144f11114ff4444111114ffffff411f1111111111111
                            11111111114fff411111111114fffff44444441f1141111111111111
                            1111111111111111111111111111111f1441f1114f11111111111111
                            11111111111111111111111111111111f11f11111111111111111111
                            111111111111111111111111111111111f4111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 120:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111f11111111111111111111111111111
                            11111111111111111f4ff111111111111111111111111111
                            11111111111111114144f111111111111111111111111111
                            1111111111111111414444f1111111111111111111111111
                            1111111111111111f14444f1111111111111111111111111
                            1111111111111111f144444f111111111111111111111111
                            111111111111111f1144444f111111111111111111111111
                            111111111111111f11444444f11111111111111111111111
                            111111111111111f111444444ff111111fffffff11111111
                            111111111111111f11144444f44f11fff1111114f1111111
                            11111111111111f11114444ff44fff4411114444f1111111
                            11111111111111f111144ff144f4444111114444f1111111
                            1111111111111f11ffffff144ff444111114444ff1111111
                            1111111111111f1f11114f14444f44111444444ff1111111
                            11111111111ffff4111444144444f1114f4444f4f1111111
                            111111fffff14444414444444444f114f4f44f4f11111111
                            1111ff1111f14444111114444444f44f4f444f4f11111111
                            111f11111114144114fff144444444fff4f4f4f111111111
                            111f4111111414414fffff14444ff114ff4ff4f111111111
                            1111f4444444f1114f11fff144111444f4ff4f1111111111
                            11111f444444f114ff14fff14411444f4f4f4f1111111111
                            111111f4444f4114f1fff441444444fffffff11111111111
                            1111111f44f41114ff4ff4414444444444fff11111111111
                            11111111ff111114ff4444414444444444444f1111111111
                            111111111ff444114fff44f14444444444ffff1111111111
                            1111111111fff44114ffff1444444444ffff4f1111111111
                            11111111111f1f41114441444444ffffffff44f111111111
                            111111111111f411141114444144fff4f4f4f4f111111111
                            111111111111ff411444444441144f4f4f4f4f4f11111111
                            111111111111f1f4f14444444f1114f4f4444f4f11111111
                            111111111111f11f1144444444f111ff444444f4f1111111
                            11111111111f141f144f44444f1ffff4444444f4f1111111
                            11111111111f11f144f144444f1111444444444ff1111111
                            11111111111f41f44f4ff4444f1111114444444fff111111
                            11111111111f1144ff444ffffff1111111144444ff111111
                            11111111111411444444f4f1111fffff11111444ff111111
                            1111111111f11444444f4f1111111111ffff1111ff111111
                            1111111111f1144444fff111111111111111ffff11111111
                            1111111111f144444fff1111111111111111111111111111
                            1111111111f14444ff111111111111111111111111111111
                            11111111111f44ff11111111111111111111111111111111
                            111111111111ff1111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 121:
                return sprites.create(img`
                            1111111111111111111111ff111111111111111111111111
                            111111111111111111111ffff11111111111111111111111
                            11111111111111111111f1dfbf1111111111111111111111
                            1111111111fff111111f11dfbf11111111111fff11111111
                            111111111fbfdf11111f11ddfbf11111111ffddf11111111
                            111111111fbdfdf111f111ddfbf111111ff1dddf11111111
                            111111111fbbdfdf11f11ddddfbf111ff11dddbf11111111
                            111111111fbbddfdff111ddddfbf1ff11ddddbbf11111111
                            111111111fbbbddfdf11ffbdddfbf11dddddbbff11111111
                            111111111fbbbddbf11f1dfbddfbfbdddddbbbff11111111
                            111111111fbbbbdf111f1dfbdddfbfbdddbbbfbf11111111
                            111111111fbbbbdf11b11ddbbddfbfbddbbbbfbf11111111
                            111111111fbbbbf111f11ddfbbddfbfbbbbbbfbf11111111
                            11111bbfffffff11fff11ddfffbdfbfffbbbfbf111111111
                            1bfff1111f111fbf111111111dfbbf111ffbfbf111111111
                            f11111111fd111f1bffffff1111ff111dffffffbd1111111
                            1fd111111ffd111fdddddddfd111111ddffbddddfffb1111
                            1fdddd1111ffd1f1bbbbbff1fd1111ddffbd11111111ff11
                            11fdddddd1ff1f1b1dddbbfd1fd111dffbd11111111dddf1
                            111fddddddfdb11111111fdfd1fd11dfbd1111111dddff11
                            111fdddddf1b11dbfffffdfffd1fd11dfb1111ddddfffd11
                            1111fdddbf1b1dbfffffffdfffddbd11dfbddddddfbfd111
                            11111fbbbfdf1bfffffffffdddfdbd111fbdddddfbfd1111
                            111111fff1df1fff11fffffbfffdfd111fffbddfbbf11111
                            111111f111df1f1f11bbfffbfffdfd111111fffbbf111111
                            11111f1111df1ffffbbbbffbfffdfd11111111fbf1111111
                            1111fffddddf1ffffbbbbffbfffdfdddddddddfff1111111
                            111f1bfffbdfdfffffbbfffbfffdfdddddddbfffbf111111
                            11f1dddbffdfbdffffffffbfbbbdfddddffffffbddf11111
                            11fddddddfdbffdffffffbfffffdbdddbfbbffbddddf1111
                            11fbbbbbbfdbfffddddbbfffffddbd1dbfbdfbfdddddf111
                            111fbbbbf1f1f1fbfffffbfff1dfd11bfbdddfbfdddddf11
                            1111fbbbf11f1f1fbfffffbf1dfd1d1fbddddfbfbbddddf1
                            11111fbf1111f1f1bffffff1dfd111dfbd11dfbfbbbbbdf1
                            111111ff111f11df1dddddddfddd111fbd11ddfbfbbbff11
                            1111111f11b11dddbbfffffbddddd111fb111dfbfbff1111
                            1111111f11fdddffdddddddddddffdd11fd11dbffb111111
                            111111f111fddffffff111dddfffffdd1fb111dffb111111
                            111111f111fffdddbbff11ddffbbbbfddfb111dfbf111111
                            111111f11ddddddbbbbf11ddfbdddbbfffb111dfbf111111
                            111111f1ddddddbbbffff1dffffdddddbbd1111dff111111
                            111111fdddddfffffffff1dffffffddddddd111df1111111
                            1111111fffff111111ffbfffbffffffdddddd11df1111111
                            1111111111111111111fbffffbfff11ffffddd11f1111111
                            11111111111111111111fbbbbfbf1111111fffff11111111
                            111111111111111111111fbbfbf111111111111111111111
                            1111111111111111111111ffff1111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 122:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111ffffff111111fffffff11111fffffff11111111
                            1111111ffffffffffffff1111111fffffffffffff1111111
                            111111fffffffffffff11111111111ffffffffffff111111
                            11111fffffffffffff1111111111111fffffffffff111111
                            11111fffffffffffff1111111111111ffffffffffff11111
                            1111ffff1111fffff111111111111111fffff1111ff11111
                            1111ff11111111fff1111dd1111dd111fff1111111f11111
                            1111f1111111111ff111d11d11d11d11f111111111111111
                            1111f1111111111ff111df1d11df1d11f1ffff1111111111
                            1111111111ff111f1111d11d11d11d11df1d33ff11111111
                            11111111ff11f11f11111dd1111dd111dfd33333f1111111
                            1111ff11f1331ff1111111111111f133ddf33333f1111111
                            111f11f1f1331ff1d3331f11111f13333df333333f111111
                            11f1331f3f11f3fd333331f1111f13333df333333f111111
                            11f1331f3f11f3fd33333133fff3d3333dff33ff3f111111
                            111f1111ffddff3f33333d3111113133dfdf3fddff111111
                            1111ff1ddddddf3ff333df11ddd11dddfdddfdd11f111111
                            11ff11fdddddddf11ffd111dddddddffddfffdd111f11111
                            1f11ffddddddd11331ffffdddddfffdddf11ffdd111f1111
                            f13311ddddddd11331f111fffffdddddf1331ffdff11f111
                            f1331fdddddddff11f1111111111ddddf1331f1f11f13ff1
                            1f11f1fddddff33ff1111111111111dddf11f1f1331f111f
                            11ff111ffff33ff1111111111111ffffdf11f1f1331f11df
                            111111111ffff1111111111111ff3333ffddff1111fddff1
                            1111111111f11111111111111f3dd3f1fdddddd1ff1ff111
                            1111111111ffff1111111111f3d1f11fdddddddf11ff1111
                            111111111f11d3ff11111111f3df13311dddddddff11f111
                            111111111f11d333f1111111f33f13311ddddddd11331f11
                            11111111f3dd3333f1111111f333f11ffdddddddf1331f11
                            11111111f33333333f111111f3333ff33ffddddf3f11f111
                            1111fffff33333333f1111111ff3333ffddffff33fff1111
                            111f111ddfff333333f11111111ffffddff33333f1111111
                            111f11dfffddff3333f11111111111dff3333333ff111111
                            1111fffddd111df333fffffffffffffff333333fddf11111
                            1111111ffffd11dfff11111111113ffffffffffddddff111
                            11111111111ffd11ddff1111111113fffffddddffffddf11
                            11111111111113ffdddd3f311111113fffffffdddfdddf11
                            111111111ff31111ff1d3fff1111111ffff111fffffff111
                            11111111fff113ffffffffff11111113ffff111111111111
                            11111111f3ffffffffffffff11111111ffffff11f1111111
                            111111111fffffffffffff31111111111fff33fff1111111
                            111111111113fffffff311111111111111ffffff11111111
                        `, SpriteKind.Creature)
            case 123:
                return sprites.create(img`
                            1111111111111111111111111111111ff11111111111111111111111
                            11111111111111ff11111ff1111111f77f1117711111111111111111
                            1111111111111f77f111711f11111f77f71171171111111111111111
                            111111111111177f1f177117f1111f7f171711171111111111111111
                            111111111111f7f111f77777f111f77f177111711111111111111111
                            11111111111f77f111f77777f111f7f1117111711111111111111111
                            1111111111f77f1111f777fff11f77f111711171111111111117ffff
                            11111111ff77f1111f777f77f11f7f111171171111111117fff7777f
                            1111117f17ff11117fffff77f1ff7f1111711711111117f7777fffff
                            11111711ff7111171f111f777ff77f11117171111117f77fff771171
                            11111f1f7111117111f111f77ff7f1111171711117f77f7711111171
                            111177771111771111f111f7fff7f11117171111f71f771111111711
                            1111f7f11117111111f111ff7f77f11117f111f711f1111111111711
                            111f7f1117711111ff111ff77f7f11117fffff77f711111111117111
                            111f7f11711111ff11111f1f7f7f1117f777f11f1111111111171711
                            11f771171111ff111f111f1f7f7f117f777f77711111111111711711
                            11f7f117111f1111f1f1f17f7f7f11f777f77f111111111177117111
                            11f7f17111f11111f1f1f177ffff1f777f77f7111111117711117111
                            177f11711f111111f77f1177ffff7ffff77f71111117771111171111
                            1f7f1711f1111111f77f1177fffffffffff777117771111111711111
                            1f7f171f11111111fff117777fffffff777f777777711111771ff111
                            7771171f11111111f771177777fff77777fff7777711777711f77f11
                            f7f171f1111111ff77111177777711177f7f7777777711111f1f77f1
                            f7f171f11111ff7f711111177711117ff777fffff777fffff11f77f1
                            f7f17f11111ff7f77111117777777fff777777fff777fff7f111f77f
                            f7f71f1111f1f7f771111777777ff77f7777ff777ff7f17f1111f77f
                            f7f7f11111f1ff77111171177ff777ff777f7117777f117f1111f77f
                            f7f7f1111f117f1711771117f77777fff77f111177ff777f1111f77f
                            f77f11111f117f71177117ff7f777f7ffff711117f1f77f1711f71f1
                            1f7f11111f177ff117711fff1f777f777ff77117f11f77f1711f11f1
                            1f7f1111ff777ff77771771f1777ff77fff77777f111ff11711f11f1
                            11f11111f1777f177777f711f777f77ffff777777f17ff1171f71f11
                            1111111f11f7f111777ffff7777f77fff77f77777ffff11711f71f11
                            1111111fff1f111177f7777777ff7ff7777f777777ff111711f77f11
                            1111111111ff11177f7777777fff7f7777ffff777fff111711f77f11
                            11111111111f1177f77777ffffff7f77fffffffff77f111711777f11
                            111111111111f77777fffffffff7f1fffffff7777ff11117111f7f11
                            1111111111111ff77ff11ffffff7f1f7fff777777ffff111711f71f1
                            111111111111111ff1fffffffff7f1f7777777777777f111711f71f1
                            111111111111111111f7ffff1f7f1f7711777777777ff111711771f1
                            1111111111111111111f7fffff7f1f711177777777f1f11171f77f11
                            1111111111111111111f7fff77f11f71177777777f11f11711f77f11
                            11111111111111111111ff777f1111f7777777777f11f11711f77f11
                            1111111111111111111111fff11111f777777777f111f1171177f111
                            111111111111111111111111111111ff7777777f1111f1171f77f111
                            11111111111111111111111111111f77f7777ff11111f1711f7f1111
                            11111111111111111111111111fff11777fff111111f1171177f1111
                            1111111111111111111111111f777f111f111111111f1171f7f11111
                            11111111111111111111111ff77777f1f1111111111f171177f11111
                            111111111111111111111f7777777777ff111111111f171f7f111111
                            1111111111111111111ff777777777777f11111111f171f7f1111111
                            111111111111111111f1f77777ff7777ff11111111f1717f11111111
                            111111111111111111f17ff77f17ffff1f11111111f717f111111111
                            111111111111111111fff11ff177fff117f111111f717f1111111111
                            111111111111111111111111f17f111f1ff11111177ff11111111111
                            1111111111111111111111111ff1111ff11111111ff1111111111111
                        `, SpriteKind.Creature)
            case 124:
                return sprites.create(img`
                            111111111111111111fff1111ffff1111111111111111111
                            1111111111111111ffdddf1fffdddff11111111111111111
                            11111111111111ff111dddfddd11111f1111111111111111
                            1111111111111f11dbdddfddddbd1111f111111111111111
                            111111111111f11d111ddbdd1111dd111f11111111111111
                            11111111111b11d11dddddddddd111d111b1111111111111
                            11111111111f1111dbffdbddffbd111d11f1111111111111
                            1111111111b1111dbfdbfbffbbfbd111111b111111111111
                            1111111111f1111dfdddbfbbddbfd111111f111111111111
                            111111111b11111bffffbdbbffffd1111111b11111111111
                            111111111f11111bfffffdffffffd1111111f11111111111
                            11111111b11111dffddfffffddffd11111111fbb11111111
                            11111111f11111dfd11dfff11fbfbd1111111fffb1111111
                            11111111f11111bf11f1fff1f11ffd1111111bffb1111111
                            111bb11f111111bff11fffff11fffd1111111bffb1111111
                            11bffb1f111111ffffff111ffffffb111111bfffb1111111
                            11bffb1f111111fffff11111fffffb11111bfffb1b111111
                            11bfffbfbb1111fffff1ffb1ffffff1111bfffffffbb1111
                            111bffffffb111fdfffbffdbffffff111bffffffffffb111
                            111bfffffffb11fddfffbdbff11ddf111bffffff1ffffb11
                            11bffffffffb11fffdffffffdfffff111bffffffb1bffb11
                            1bfffbfffffb11fbbf1ffffdfbbbbf111bfffffffb1bb111
                            1fffb1fffffb11f1dbf1ff1f1dbbf11111bfff1fffb11111
                            bffbfffffffb11f1dbbfd1f11dbbf111111bfff1bffb1111
                            bb1ffffbffb111fddbbfd1fddbbbf111d111bffb1fffb111
                            11ffffbfffb111fbbbbfd1fbbbbbf111d111bffb1bffb111
                            1bffbddffb1111fbbbfd11dfbbbf1111d111bfffb1bb1111
                            1bbb1fdff11111ffffd1ff1dffff111db1111bffb1111111
                            11111fdbb1d111fddddffff1dddf111bf11111bb11111111
                            11111fdf11b111fffff1111ffffd11dff111d11f11111111
                            11111fdfd1b11dffbbf1d1dfbbfd11bff1d1d11f11111111
                            11111fdfb1d11dfddbfd1d1fbfdd1dfff1d1b11f11111111
                            11111fdfd1b11bfdddf1d1dfdfd11bfff1b1b1f111111111
                            111111fdf1b11bfdddfddddfdfd1dfbff1b1b1f11111ff11
                            111111fdf1d11dfddfddddddfd11bfbf11b1d1ff11ffdf11
                            111111fdf11d1bdfdfddddddfd1dfbbf11d1dfb1ff1ddf11
                            111111fffd1b1bdfdfddddddfddbfbdf1d1d1fbd11ddf111
                            11111fdddf1d1ddfdfddddddf1dfbbdf1b1bfb1dddff1111
                            11fffd1d1fddd1dffddddddf11bfbdf11b1bfbd1ff111111
                            ffdddddd1dfdd1dffddddddf1dfbbdf1dd1fbbd11f111111
                            11fffd1dd1fdddddfddbdbdf1bfbddfdb1dfbdd1d1f11111
                            11111fdd11dfddddfdbdbdbfdfbbdfdd1ffbd1dddddf1111
                            111111f11dd1fdddfbdbdbdfbfbddfdffbbdddd1ddddf111
                            111111f1df1ddfddffbdbdbdffbddffbbdd1d1ddd1dddff1
                            11111f1df1ddddfdffdbdbdbdfbdfbbddddddffffffdddf1
                            1111fddffffffddffdfbbbbbfbbddddddd1df111111ffff1
                            1111ffff11111fddffffbbbffffffffffdddf11111111111
                            11111111111111fff111fff111111111ffff111111111111
                        `, SpriteKind.Creature)
            case 125:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111111ffffff111111111111ff111111111111111111
                            11111111ffddf1ddff11111f111fdf111111111111111111
                            1111111f1111df1dfdf111f4f1fdf1111111111111111111
                            1111111f1fd1ddfddfdf11f4f1fdf1111111ff1111111111
                            111111ff4ffdd4f44f4f11fdffdf1111111f11f111111111
                            11111ff444f44ffffff11ffdf4df11111fff114111111111
                            1111ffff444ffffffffffdfd4d44f11ff1dff41111111111
                            111fdfff44444fdd4ffdddddddd44ff114f1111111111111
                            11ffddd44f444fdd4fddddddddfddf1d4f11111111111111
                            1ffffdd44ffff4fffdfddddddffddfd4f111111111111111
                            1fffffd44fff111f4ddffddfffddddff1111111111111111
                            fdddfff44f111114dddffdfffddddddf1111111111111111
                            fdddd4444f114f4d1fdfffffddddddd4f111111111111111
                            fddd4f444f14dddd1dfdfffd44ff1dddf111111111111111
                            fdd44fffff1fddd4d1fdffd4ffdd1ddddff1111111111111
                            fdd444fff4ff4ddd44fdfd4f1f111dddd44f11111111ff11
                            1f44f4ff444ff4dddddddddd4444dddd4444f111111ffff1
                            1f4ff4f4444fff4dddddddddddddd4444444f111111ffff1
                            1ff11f1f44f4ffff4ddfdfddd44ff44444ff111111ff44ff
                            1f111f11ffffffffdffdddd44ff11ffffff1111111f444df
                            111111111fffffff1ffffffff4fd1ffffffff11111f444df
                            1111111111ffff44f4f4dd444fffdffff444ff1111f44ddf
                            1111111111f4dddd4ffffffff4ffffff444444fff1f44ddf
                            111111111f4dddd4ffffffffffff44ff44444ddd4ffffddf
                            111111111fdddd4fffffffffff444444f44dddddf1ffffdf
                            11111111f4ddd4fffffffff44444444ffddddddf11fffff1
                            11111111fddd4ffffffffffffff444ff4d1ff4d4f1fffff1
                            11111111fdddfffff4fffffff44444f4d11dffff1ffffff1
                            11111111fddffff4dfffffffffffff4d11ddfff11f44ff11
                            11111111fddddddd4fffff4f1d4f44f4ddddf4111f4ddf11
                            11111111f4ddddddfffff4f11df4d4ff444f4111f4ddf111
                            111111111fddddd4fff444f1df11d4fffff1111fffddf111
                            111111111f4ddddfff4444fddf1ddf444fff11ffffff1111
                            1111111111f44ddff444444ffdddfdd4ffffffffffff1111
                            11111111111f444f44444fffffdfdddf44ff444dfff11111
                            11111111111ff4444444ffffffffddfd4fff44ddff111111
                            1111111111f444444444f444fdddffddffff4ddff1111111
                            1111111111fd44ff444444444fddffff44ffdff111111111
                            1111111111fdd44fffffffffffffff4444fffff111111111
                            11111fffffddd4f1111114fffffffff4444ffff111111111
                            111ffdddddddd44f1111111114fffff44dddddfff1111111
                            11f1ffddddd4444f11111111111111f4dddddddddf111111
                            1f1ffff44444fff1111111111111111ff4ddddffffff1111
                            11ff111fffff111111111111111111111fffff111ff1f111
                            1111fff1111111111111111111111111111111fff11ff111
                        `, SpriteKind.Creature)
            case 126:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            11111111111111111f111111111111111111111111111111
                            111111111111111ff4f1111111111111f111111111111111
                            11111111111111f114f11111111111ff1f11111111111111
                            1111111111111f1444f1111111111f111f11111111111111
                            1111111111111f14ff11111111111f1111f1111111111111
                            11111111f11111f4f1111111111f11f11f11111f11111111
                            111111ff1f1111f44f1111111ff1ff14f11111f1fff11111
                            11111f1f1f111f1444ff1111f1111144f111111f111ff111
                            1111f1f1f11ff1144444ffff1111114f11111111ff111f11
                            111ffff1f1f1111444ff11111111144f114f111111f111f1
                            11f11f4f4f11111444111111111144f114f4f11111f141f1
                            11f1f4444f11114441111111111144f4f44f1111ff1441f1
                            1f4f4444f4111444111111111111444f44f1111f44444f11
                            1f444444f4414444111111111114444f4f11111f44444f11
                            11f4444ff44444f4411111111444444ff11111f44444f111
                            11ffffff1f4444f4444111144444444f111ff1f444444f11
                            111f444f1fff44f4444444444444444f1ff14f1f44444f11
                            111f4ff4f11fffff444444444444444ff144f11f4444f111
                            1111f44f411f1f11fff44444444444ff444f1111ff4f1111
                            11111fff4444f4114f14fff44444ffffff1111111f4f1111
                            111111ff444ff1114ff11111fffffff111f11111f4f11111
                            11111111fff1111444f1f11f4444ff41111f1111f4f11111
                            11111111f1111444444ffff44444f4411114f11f44f11111
                            111111111f444444ff444444444f44441144f11f44f11111
                            1111111111fffffff44ff44444ff444444444ff44f111111
                            11111111111ff4fff4f44444fff4444444444f444f111111
                            111111111141f4ff44fffffffff4444444ffff4f4f111111
                            111111114ff11f444fffffffffff44444f4f4ff1f1111111
                            1111111f11f114fff4fffffff44f4444fff4ff11f11f1111
                            111111f111f11444444444444444ff44ff4fff1ff1f1f111
                            111111f111f1144444444444444444ffffff44f44f11f111
                            11111f11111f11444444444444444444ff11f444f11f1111
                            11111f11111f1114444444444444444f111f44444fff1111
                            11111f111111f11144444444444444f4ffff444444ff1111
                            111111f411111f1111444444444444f4fffff444fff11111
                            111111f4441144ff1111444444444f44ffff1f44f1f11111
                            111111ff44444444f4111444444ff44ffff111ffff1f1111
                            11111f44ff4444ff11ff4444fff444ffff11111111ff1111
                            1111f4ff4fffff1111111fff4444fff4f111111111111111
                            1111ff11f44ff11111111111ffff44444f11111111111111
                            1111111f14ff11111111111111f4ffff1f11111111111111
                            1111111f4f1111111111111111f1f111f111111111111111
                            1111111ff111111111111111111f11111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 127:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            111111111111111111111111111ff111111111111111111111111111
                            1111111111111111111111111ff13f11111111111111111111111111
                            111111111111111111111111f1133f11111111111111111111111111
                            11111111111111111111111f1113f111111111111111111111111111
                            1111111111111111111f11f1113ef111111111111111111111111111
                            111111111111111111f1ff11113fef111111111111111111111ef111
                            111111111111111111f113f1133ff111111111111111111111e11e11
                            1111111111111111111f33f313ef1111111111111111111111f11f11
                            1111111111111111111fff3313f1111111111111111111111e111f11
                            1111111111111111111f133133f1111111111111111111111f111f11
                            111111111111111111f111113ef111111111111111111111f1311f11
                            11111111111111ff1ff111113ef1111111111111111111fff1311f11
                            1111111111ff1f11f13f11113f1111111111111111111e113f31fef1
                            111111111f11fe311f3f11113f11111111111111111111feef31ff11
                            11111111e311ffe11ff311133ff111111111111111111f1ff311f111
                            11111111f311ffeeee311113efef1111111111111111f11ee311e111
                            11111111f331fffef1111113efeef111111111111f1f1113311f1111
                            11111111fe3fefff11111113f1ff111111111111e1f11133311f1111
                            1111111f1feffeffe1111113f111111111111111f31f133311f11111
                            11111ff13fffef31f1111133ffffffe11111111efeef333311ff1111
                            1111f113efffffff11fff133f111111ffe11111feffe33311feef111
                            111f113eef11111f1f113f33ef11111333ff11feeee33331feff1111
                            11f113eff111111f11f33f33ef1113333333ffeeeee33311ff111111
                            11f1ffff11111111f11ff33eef1333333333efeeee33331f11111111
                            11ff13ff11111111f111333ef33f3333333fefeeee33311f11111111
                            111f13ef111111111f1333eef331ff333eefeefee33311f111111111
                            1111f13ef111fff111f33eef333ff33331feeefe33311ff111111111
                            1111f13eefff333f1ffffff3333333333ffeeefe331111f111111111
                            11111f13ef131133fffff33333333333eeeeeeef311f331f11111111
                            11111f13ef13113eef1f33333333ffffeeeeeeef111ffff111111111
                            111111f3ff1333eeef1f3333333f1ffffeeeeeef11f1111111111111
                            111111fff1133eeeef11f33333f133f13feeeeefff11111111111111
                            111111f11133eeeeef111f333ff3ffff3feeeeff111ff11111111111
                            1111111f133eeeeef11133ffff313f113feeeef1fff11f1ff1111111
                            11111111ffeeeeeef3333333effffff3ffeeef311f113ef11f111111
                            1111111111ffeeef3f3333333f1efefffeffff33ef113ff113e11111
                            111111111111fff33f3333333f33f13feeeef33eee33eff113f11111
                            1111111111111f33eef33333eefffffeeeeef3eeeff3fff133f11111
                            1111111111111ffeef1feeeefffff3eeeeefeeeeefffffef3ef11111
                            111111111111f11ff111ffff33333fffeeffeeeeffeffeffef111111
                            11111111111f1113f11113333333eeeefff1feeffff13fefff111111
                            1111111111f11113f111333eeeeeeeeeeef11fffffffffffff111111
                            111111111f1111333f133eeffff3333eefef111111ffffff11111111
                            11111111ff111333effffff3333ffff3ff3ef1111111111111111111
                            11111111fff1333eef11113333eeeefff313f1111111111111111111
                            1111111f111f33eeeef11333eeeeeeef333fef111111111111111111
                            1111111f1113feeeeef3333fff3eeefee33f3f111111111111111111
                            111111f111133feeeefffffeeef33feee3f13f111111111111111111
                            111111f11133eeffeff1111eeeeffeeeff333f111111111111111111
                            111111ff113eeeefff11333eeeffffffee33f1111111111111111111
                            11111ff13ffffeffff33eeefffffffefeff3fff11111111111111111
                            1111f1133f113ff111fffff11ffffffff33ff33ff111111111111111
                            111f113ef1133ef111111111111fffffee311f333f11111111111111
                            1111ffffffffff1111111111111111fffffffffff111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 128:
                return sprites.create(img`
                            1111111111fff1111111111111111111111111111111111111111111
                            111111111f11df1111111111111ffffffff111111111111111111111
                            11111111f11fbbf11ffffff11ffbbbfffffffff11111111111111111
                            11111111f1f1ffbffdbbbbbffdffbbbfffbbbbbfff11111111111111
                            11111111fdf111fdddfffbfdddf1fffbbbbbbbbbbbff111111111111
                            1111111fffff1fddff111fddddf1fbbbbbbbbbbbbbbbff1111111111
                            11111fb1ddbbffdfbf11fddddff11fbbbbbbbffffffbbbf111111111
                            1111f111fffbbfdfbbffddddfbf111fbfffbfddbbd1ffbbf11111111
                            1111b11f1fdfffdffbbd1ddfbbbf111fbddfdddddbd11fbbf1111111
                            111f11f11fdbfddf1fd1ddfbbbbfd1ddfd1fdddddff111fbf1111111
                            111f1f111fdfddf11b11dfbbbbbdfdddf11fddddf11f11fff111111f
                            111fdf1111f1df11fd1ddfbbbbddfddbf11f11ddfd1fd11fdf111bff
                            111fdf111f11f111fd1ddfbbbddbbfbbb11ff11ddffdd11f1fffb11b
                            111fdbf1f11fffb1bdddfbbbdddbbbffddf1df1ddddddd1f1f1111f1
                            1111fbbf11ffffffddddfbbbd1dbbbbbffffbf11dddd11ff1fddddb1
                            11111fbf1f11ffffddddfbbbd1dbbbbbfbfffdf1dddd1fff1fddfb11
                            111111f11f11fffbdddfbbbbd1dbbbbbbfbff1f1ddd1fffdfffb1111
                            111111fdfb11fffbdddfbbdbd1ddbbbbbfbbbffbddd1fbffbbf11111
                            111111fdffb1bffbdddfbdbbd11ddbbbbfbbbbbddddddbfbbbf11111
                            1111bffbfff11ffbdddfbddbd11ddbbbbbfbbddddddddfbbbbf11111
                            111ffffbfff11ffbbddfbddbbd11ddbbbbfbbddddddddfbbbbf11111
                            11bfffffbff11bffbddfbddbbddd1dbbbbbfbbbfdddbdfbbbf111111
                            11ffffffbfb111bfbbdfbddbbbdd1ddbbbbbfbbbfddfbfbbbf111111
                            11ffffffbf11111bbbbfbbdbbbbdd1dbbbbbbfbbbbbbfbdbbf111111
                            1bfffffffbf11111fbbbfbddbbbbdddbbbbbbbffffffbddbbf111111
                            1ffffffffff11111ffbbfbbddbbbbdddbbbbbbbbbbbbbdbbf1111111
                            1fffff11fff111111ffbfbbbdbfbbbddbbbbbbbbbbbddbbbf1111111
                            1fffb11bfffb11111fffbfbbbbfbbbbdbbbbbbbbddddbbbf11111111
                            1ff1111fffff11111ffbbffbbbfbbbbbdbbbbdddddfbbbff11111111
                            1f1111ffffff11111ffbbbffbbfbbbbbdbbbddddbbfbbff111111111
                            11f11fffffff11111fbbbbfffbbfbbbbdbbd1dbbbffffff111111111
                            1111bfffffff11111fbbbbffffbffbbbbbd1ddbbbfffff1111111111
                            1111ffffffff111111fbbdffbfbffbbbbbd1dbbbffffff1111111111
                            111bfffffffb111111fbddfbbbffffbbbbddbbbffbfff11111111111
                            111ffffffff1111111fbddfbbbbfffbbbddbbbffbbbff11111111111
                            111fffffffb11111111fddfbbbbbffbbbdbbbffbbbbf111111111111
                            111ffffffb111111111fddbfbddbbffbbdbbfbbbbbf1111111111111
                            111bfffff1111111111fdddfdd1dbbfbbbbfbbbbbbf1111111111111
                            1111fffff1111111111fbbddfd11dffbfffbbbdddf11111111111111
                            1111bfff11111111111fbbbddffff11fffbbddddf111111111111111
                            11111ffb11111111111fbbbbbf11111ffbbddddf1111111111111111
                            11111bfb1111111111ffbbbbbf11111fbddddddf1111111111111111
                            111111bf1111111111ffbbbbbf11111fddddddf11111111111111111
                            11111111b111111111fffbbbf111111fddd1df111111111111111111
                            111111111111111111bfffffb11111bddd1df1111111111111111111
                            1111111111111111111bfffb111111fddd1f11111111111111111111
                            11111111111111111111111111111bddd1df11111111111111111111
                            11111111111111111111111111111fd111f111111111111111111111
                            11111111111111111111111111111f111df111111111111111111111
                            1111111111111111111111111111bd11df1111111111111111111111
                            1111111111111111111111111111fdddf11111111111111111111111
                            111111111111111111111111111bffddf11111111111111111111111
                            111111111111111111111111111ffffff11111111111111111111111
                            111111111111111111111111111ffffffb1111111111111111111111
                            111111111111111111111111111bfffbff1111111111111111111111
                            1111111111111111111111111111bfffff1111111111111111111111
                        `, SpriteKind.Creature)
            case 129:
                return sprites.create(img`
                            111111ff4111111111111111f11111111111111111111111
                            11111f111f4111111111111f1f1111111111111111111111
                            11111f44411f1111111111141f111114ff11111111111111
                            111111fff441f111111111f11f1111f11f11111111111111
                            111111f44f444f11111141411f11f4114f11111111111111
                            111111f444f4444111141f111f1f1114f111111111111111
                            111111f4141f44f11114111114f11144f111111111111111
                            111111f14141f44f111f11111111144f1111111111111111
                            111111411414f44f111f11111111444f1111111111111111
                            11111f4441414f44f1ffff11111144f11111111111111111
                            11111f1144141f44ff1144f1111111f11111111111111111
                            11111f1111414f444f4444f11111111f1111111111111111
                            11111f111114444f1144444ff1111114ff11111111111111
                            1111141111114f11114444444f111144f4ff111111111111
                            1111f111111411111444444444f1144f4444f11111111111
                            1111f1111141111114444444444f44fff4444f1111111111
                            1111f111141111114444ff44444f4f111f4444f111111111
                            111141111f11111444f111f44444f1111f44444f11111111
                            111f1111411111444411111444444f114444444411111111
                            111f1111f11144444f11111f44444f4444f44444f1111111
                            111f114f441444444f111f1144444ff444f4444441111111
                            11f4441f4ff4444444111111f44444f444f444444f111111
                            11f1111f4111f44444f11111f44444f444f4444444111111
                            11411141111111f444411111f44444f44ff4444444f11111
                            114111f111111114444f1111444444fff11f444444f11111
                            14111ff14ff4111f4444f11f444444ff1144f4444ffffff1
                            141f44fffffff111444444444444444f4444fffff444444f
                            ff444f11fffff411f44444444444444f4fff44444ffffff1
                            f44ff1114fffff11f44ff4444444444ff444ffff41111f11
                            1ff111111fffff11f4411f44444444444ff411111111f111
                            11111111ffff4f11f44ff11f4444444f41111111111f1111
                            1111111f1ff44f11f4444f114444444111111144444f1111
                            1111111f1ff44f11f44444f1f44444f11444441111f11111
                            111111f1fff44f114444444f144444f44111111111f11111
                            111ffff14f1ff11f4444444f1f44444f111111111f111111
                            1ff44f11ff11111f444444441f444fff441111111f111111
                            f44fff1f44f111f444444444f1f44f4f11444111f1111111
                            1ff44f1f444fff4444444444f1f4f444f1111441f1111111
                            111fff1f44444f4444444444f1f4ff444f11114f11111111
                            111111f1f11444f444444444414f11f444f1111f11111111
                            111111f1f111444ff44444444f1f111f44ff111f11111111
                            11111141f11441144ff44444ff1f4111ff11f11f11111111
                            11111f1f1f4111114f1fffff11f1f44ff1f11f1f11111111
                            11fff11411ff1111f1111f1111f11ff1f11f1f1f11111111
                            14111f411111ff1f11111f11111ff11f1114f1f111111111
                            11ff4111111111f111111f114111fff1f11f111111111111
                            111111111111111111111f11fff11f111ff1111111111111
                            1111111111111111111111ff111ff1111111111111111111
                        `, SpriteKind.Creature)
            case 130:
                return sprites.create(img`
                            11111111111111111111111111111f1111111111fff1111111111111
                            111111111111111166111111111161f11111fff611f1111111111111
                            111111111111111611f11111111f11f11ff611111f11111111111111
                            111111111111111f11f11111111611ff611111bbf111111111111111
                            111111111111111f1bf1111111f11bb11111bbbf1111111111111111
                            11111111111111611bf1111fff111b111bbbbbffff111111116f1111
                            1111111116111161bbf111f11611b1bbbbbb1b1b11f111111f11f111
                            1111111161f111f1b6111f1bf11b1bbfffbbb1b1bf111111f111f111
                            1111111161f111f1bf1fffbb61bfff666bfb1b16f111116f111f1111
                            11111111f16f1f1bbff111ff1ff666bbbbbfb1ff11116f111bbf1111
                            11111111f16f1f1bbf111111ff66bbbbbbbbff6ff16f111bbbf11111
                            ff111111fbb6f61b6f111111bbfbbbbbbbbbf6666ff111bbbbf11111
                            f6ff111116b6fbbb6f1111bbbbbfbbbbbbb1bf6666f1bbbbbbff1111
                            1f66ff111fb6fbb6f111bbbbbbbbfbbbbb111bf6666fbbbbb1b11ff1
                            11f666f11fbf6bb6fbbbbbbbbbbbfbbbb11111bf666fbbbb1b1b111f
                            11f1666f1fbf11b6fbbbbfffffffffffb111111bf666fbb1b1b111f1
                            111f1166ff6f11b6fffff11111111111fbbbbbbbf666fb1b1b1fff11
                            111f1116ff6611b6bbb111166666ffffbbbbbbbbf66bfbb1bff1f111
                            1116bb1bf1f111b66666666fffffffbbbb6666ff66bb6fbff1f1f111
                            11f11bbbfff11bb6666fffff6bbbbfbb666fff666bb6bff111f1f111
                            11f111bffff11b66fff611ffbbbb1f66fffff666bbbb6ff11111f111
                            111f11ffbbfbbffff11111f6bb111fffffff666bb6b6f1f1111f1111
                            1111ff1f6bbffbbbf1ff16fbb111fff6f6ff666b6b6bf1f1111f1111
                            1111ff111f6bbffbbffffff6bbffff6f6f6f6666b6ff1f11111f1111
                            11116bff111fffbbbf66ff6bbbbffff6f6f666666ff11f11111f1111
                            111f1f1bff1111ffbbfbbbbbbb1111fffff666fffff1ff11bfff1111
                            1111ff11bffff111fbbbbbbb1111111bbbbfffffff1fffffbbff1111
                            11111f61fffffff116bbbb11611bbbbbbb6f666ffffbbbbbffbffff1
                            111111f1fffff61f1fbb1166bbbbbbbb666f666666fffbbb66fff11f
                            111111ff6ffff611f161166bbbbbfffffff1111b6666bf66bff111f1
                            11111fbb6fffff11f1f166bbb6ff1b1b1b1b111111fff66ff11111f1
                            11111fbf1ffff61f6f1666bbbb66f1b1b1b111111ffffff1111111f1
                            1111fbf16fffbbf66fbf6bbbffff6b1b111111111ff666ff1111111f
                            1111fbf1fffbbbbbb6fbfbffbbbbb16611111111ff666666f111bbbb
                            1116bff1ff6bbbbbb6fbff1fbb1b1bbb66111111ff666b16fbbb66ff
                            111fbf1fffbbbbbbb6fbfb11ffb1b1bbbb61ffff6f66b1116fb11fff
                            111fbf11f6bbbbbbbfbfb1f111fb1b1b1bb6f666fffff1116fff116f
                            111f1ff1f66bfbbbfbbff1f1111fb1b1bbff6ff6f6666f1666fff66f
                            11ff1fbff6661f66fbf1f1f1111f1b1b1f66666f666b66f66f66666f
                            1f66fff61f661f6fbbf1f1f11161f111bfb6666f66b1b6f66f6666f1
                            6b6ff1f611ff11ffbf11fbf111f1f111fbb666ff6b11166ffbb666f1
                            fbf1f1f1f11ffffbbf11fbf11611f111fbb666ff6f11166f1fb66ff1
                            f1ff1f1116f11bbff1116bf11f111f11fb666f6ff6f1666f1ffff6f1
                            f11f1f111116fff1111fbf111ff1f1ffbbfff6ffb6f666f11fb666f1
                            1f11f11111111111111f1f11611f1fffff6666ff1b6f66f1ffb66f11
                            11ff111111111111111f1f11f11f1f1bb6666ff6116f6f1f6fbbf6f1
                            1111111111111111111f1f16f11f1f11bb666ff11b6f6ff616bbf6f1
                            1111111111111111111161f61ff1f111bb6ff66fb66ff6b116bbf16f
                            11111111111111111111f11fff1f111bfff6666f666ffb11fbbf116f
                            111111111111111111111ff111fbffff666f666ff6ff611161bf1116
                            1111111111111111111111ffff111bbbbb66f6fffff6b11161bf1116
                            111111111111111111111111f111111bbbb6f6fff1f6b11f1bf11116
                            1111111111111111111111116111111bbbb66ff111ffbff61bff1116
                            1111111111111111111111111f1111bbbb66ff111111f1fbfbf1ff1f
                            111111111111111111111111116fbbbbbfff11111111111ffbf11f1f
                            111111111111111111111111111166fff1111111111111111f1111f1
                        `, SpriteKind.Creature)
            case 131:
                return sprites.create(img`
                            111111bb11111bbb1111111111111111111111111111111111111111
                            11111b11f11bb119ff11111bff111111111111111111111111111111
                            11111f119ff1119999f11bf111ff1111111111111111111111111111
                            111111f119bff9999ffff1119911f111111111111111111111111111
                            111111f1199bbb999999911ff991f111111111111111111111111111
                            1111111f1199bbb9999999f11f99bf11111111111111111111111111
                            1111111fb1999b9999999f911b99bf11111111111111111111111111
                            1111111bf999999999999f99999bbf11111111111111111111111111
                            111111b1f999999999999fb99bbbf111111111111111111111111111
                            11111b119199999999999bfbbbbbf111111111111111111111111111
                            1111b11119199119999b99bfbbbf1111111111111111111111111111
                            1111f1119199111bffbb9999bff11111111111111111111111111111
                            111f111919991bff91ff99999f111111111111111111111111111111
                            11f1119191999f1f11b999999f111111111111111111111111111111
                            11f111199999bffff99999999f111111111111111111111111111111
                            1b11199999999999999199bbf1111111111111111111111111111111
                            1f111bb99999999999f99bbbf1111111111111111111111111111111
                            1f119f999999999bff999bbbf1111111111111111111111111111111
                            11f99999999bfff1111b99bf1111bb11111111111111111111111111
                            111ffbbfffb111111ff9999f111f11f1111111111111111111111111
                            11111ff1111111ffbbb9999b111f11f1111111111111111111111111
                            1111111bffffffbbbb9999f111fb19bf111111111111111111111111
                            111111111111f119999999f111f11bbf111111111111111111111111
                            111111111111b11199999bf1bb119bbf111111111111111111111111
                            111111111111f11119999f1f1f99bbbf111111111111111111111111
                            11111111111b111119999ff91fbbb999f11111111111111111111111
                            11111111111f111119999f9999fb9999bff111111111111111111111
                            1111111111f1111119999fbb9999b999111bf1111111111111111111
                            1111111111b1111119999bfbbb99999191111fbff111111111111111
                            111111111f11111199999bffbbbb9999191919fbbf11111111111111
                            111111111f1111119bb999bfffbbbb9b999191fbbf111ff111111111
                            11111111b11111119bbb999fffffbbb9b999999fbf1ff11b11111111
                            11111111f111111199bb9999bffffbbb9b999999fff1119f11111111
                            1111111b11111111999999999bbfffbbb9b9b9b9111199bf11111111
                            1111111f11111111999999bb999bbfbb9b9b9b9b11999bf111111111
                            1111111f1111111999999bbbb9999bfbb9bbbfb9999bbbf111111111
                            111111b111111119999999bbb99999fbbbbbf1f999bbbf1111111111
                            111111f1111111199999999b9999999fbbff11999bbbbf1111111111
                            111111f111111111999999999999999fbb91119bbbbbbbf111111111
                            111111f111111111999999999999999fbbb999bbbfffbbf111111111
                            111111b111111111999999bf9999999bfbbbbbbffb9bff1111111111
                            1111111f1111111119999b1199999999fbbbbbfbbbb99bf111111111
                            111111bf111111111999b111199bb999bfbbbf99bbbb99bf11111111
                            11111b9bf11111111199f111199bbb9999fff9999bb9999bf1111111
                            1111b99bf11111111119f1111999bb99999999bbb9999999f1111111
                            111f1999bf11111111919b1111999999999ff9bbb99999999b111111
                            11f19999bbf1111911191f11119999999999bf999999999bbf111111
                            11b199999bbf1191919191f111199999999999bf9999999bbf111111
                            1f19999999bbff191919199f111199999bbb9999f9999999bbf11111
                            1f199999999bbfff91919199fb11119999bbb9999ff99999999f1111
                            b19999999bbfff11ffb999999ff111119999999999bf99999999f111
                            f9999999fff11111111bffff9bbff111119999999999b99199999f11
                            f999ffff1111111111111111bffffffb1111999999999fb9119999f1
                            1fff1111111111111111111111111111ffb1111199999bfff119991b
                            11111111111111111111111111111111111ffffb1111ff111ff11ff1
                            1111111111111111111111111111111111111111bfff111111bff111
                        `, SpriteKind.Creature)
            case 132:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111111111111111111111fff11111
                            1111111111111111111111111111111fd11f1111
                            1111111111111111111111111fff111bd11f1111
                            11111111111111111fff1111fd11f11fdddf1111
                            1111111111111111fd11ffffdd11f1fbdd1f1111
                            1111111111111111fd11dddddddddfbbdd1f1111
                            111111111111fff1fdddddddddddddbbdd1f1111
                            11111111111fbd1fdddddddfddddddbdddbf1111
                            11111111111fbdd1dddddddddddfddbdddbf1111
                            11111111111fbbddddfddddddbfddbdddbfb1111
                            111111111111fbdddddddddffddddddddbfd1111
                            111111111111fbddddddffbddddddddddbf11111
                            111111111111fbdddffbddddddddddddbfb11111
                            111111111111bfbdddddddddddddddddbfd11111
                            1111111111111fbddddddddddddddddbbf111111
                            1111111111111fbdddddddddddddddbbbfd11111
                            111111111111fbdddddddddddddddbbbbfb11111
                            111111111111fbdddddddddddddddbbbbbf11111
                            11111111111b1ddddddddddddddddbbbbbfb1111
                            1111111111bf1dddddddddddddddddbbbbbf1111
                            11111111bff1ddddddddddddddddddbbffffb111
                            111111dffb1ddddddddddddddddddffffffff111
                            11111bfb11ddddddddddddddddddd11bffb1fb11
                            11111fb11dddddddddddddddddddddd1111ffb11
                            11111fbb1ddddddddddddbbbbddddddddd11bf11
                            11111bfbbbbbdddddddbbbddddddddddbb11bff1
                            111111ffffffffffbbbbdddddddddbbbff11bff1
                            1111111dbffffffffbbbbddddbbbfffffffbfff1
                            111111111111111111fff1111111111111bffb11
                            11111111111111111111dbfffffffffffffb1111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 133:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            11111111111111111111111111111ff111111111
                            11ffff1111111111111111111111fdfb11111111
                            11fdddff111111111111111111ffdbff11111111
                            11fdd11bf111111111111111ffdddfff11111111
                            11fbdd1bbff11111111111ffddddbfff111ffff1
                            11bfbdddbbbffffffb11ffdddddbffff1ff11ddf
                            111ffbddbbbdddddddbfbbdddbbffffff1111df1
                            111bffdbbd11ddddddddbbbbbbfffff111111df1
                            1111ffbbd11ddddddddddbbbbfffffd11111df11
                            1111bfbd11dddddd1111dbbffffffb11111ddf11
                            11111fffb11dddd1bfbdddbfffffbdd111ddf111
                            111111ffdb1ddddbfd1bddbbffffbddddddbf111
                            111111ff1bddddbffb1bbdbbfffbbbddddbbf111
                            11111bbffbddddbffffbddbbffffbbbddbbf1111
                            11111f1bbdddddddffbdddbffffffbbbbbbf1111
                            11111b1dddbfdddddddddbbfffffffbbbbbf1111
                            111111b1dddddfddddddbbfbfffbbfbbbbbf1111
                            11111fbfddbffddddddbffbfbffbbfbbbbbf1111
                            11111f11bbdddddddbffbbbbfffbbbfbbbbf1111
                            1111f11111bfffffbdddbbbbbfbbbbfbbbf11111
                            1111f111111111111ddddbbbbfbbbbfbbbf11111
                            1111f111d111111111dddbbbbfbbbbfbbf111111
                            1111f11db1111111d1dddfbbfbbbbbfbf1111111
                            11111fdb11111111dbdddfbfbbbbbbbf11111111
                            11111fdb1111111ddbddfbffbbbbbbbf11111111
                            111111ff111111ddbddbffbffbbbbbbf11111111
                            11111111f111ddbbbfffbbffffddbbbf11111111
                            111111111fbfbbbbfbbbbbf11fbdddbf11111111
                            111111111bddffffbbbbbf1111fddddf11111111
                            1111111111f1dbf1dbbbbf1111fddddf11111111
                            1111111111f11fbdddbbf11111fddddf11111111
                            11111111111bffdddddbf1111fdddddf11111111
                            1111111111111b1ddddf11111f11dddf11111111
                            111111111111f1ddddf111111fb1b1f111111111
                            11111111111f11dddb11111111ffff1111111111
                            11111111111b11dddf1111111111111111111111
                            11111111111f1bdbf11111111111111111111111
                            111111111111bffb111111111111111111111111
                        `, SpriteKind.Creature)
            case 134:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111ff1111111111111111111111111111111111111111
                            11111fbbf111111111111111111111111111111111111111
                            1111f9bbf11111111111111111111ff11111111111111111
                            111f999f111111111111ff1111111fbff111111111111111
                            111f999f111111111111f9f111111ffbff11111111111111
                            11f1999f11fff1111111f9ff11111ffb9f11111111111111
                            11f1999fffbbff111111f99ff1111fff99f11111111111f1
                            11f1999bfbbbf1111111f999ff111fff9bf111111111ffbf
                            11f19999fbbf11111111f919bff111ff9b9f111111ffbb9f
                            11f19999b9f1111111111f199fff11ffb9bf11111ffbb99f
                            11f1199999f1111111111f199bffffff9bbfff1ffffbb91f
                            111f19999f111111111111f19fffffffbfffffffffbb919f
                            111f11999f111111111111f9ffffbbfffbbffffffbb911f1
                            1111f119ff111111111111ffffbb99ffb99bffffb99111f1
                            11111f119bf111111111ffbfffb999fb9999fbfb91111f11
                            11111f9119bf1111111ff111f99999f9999999bbb99ff111
                            11111f91199bf111111f111bf999999999999bbbfffff111
                            11111f911199bff111ff119bf9fb9999119ffbbffbbbbf11
                            111111f91119bbbfffff19bbf9ff999119fffbbfbbbbbbf1
                            111111f911199bbbfbbf9bbbf9f1b9919f1ffbbfbb9999f1
                            1111111f91119bbbbbf11199f99fb999bfffbbfb911199f1
                            1111111f911119b9bbf111119f9999999999bbfb911119f1
                            11111111f9111f999bf111111f9999999999bf99bb99bf11
                            111111111fb99f19999f111119f99fb99fbff11199bbfb11
                            1111111111fbf111999bf11119bf99999ffb91111199f111
                            11111111111ff1111999bf1199bbbffffbbbf1111119b111
                            111111111111f1111999bf9999bbf11119bbbf11111f1111
                            111111111111f1111199bbf999bb1111199bbbb1119f1111
                            111111111111b11111999bbfbb9111111999bbbb99f11111
                            1111111111111f1111999bbbff1111119999bfffff911111
                            1111111111111f111199bffffffb1111999bfffbff111111
                            111111111111b111199bfffffffffffffffffbbbbf111111
                            1111111111fff11199bffffffffffbbbbbbfbbb9bf111111
                            111111111f11f11199ff1ffffff11fbbbbbbfb99f1111111
                            11111111f91f11199f111ffffff11f99bbbbbf9f11111111
                            11111111f19111999f1111fffff111f9999bbff111111111
                            111111111fb11199f1111ffffff1111f119999f111111111
                            1111111111f11199f1111ffffff11111f111999f11111111
                            1111111111f1119f11111fffffff111f19111999f1111111
                            1111111111f1111f111111ffffffb11f11f111199f111111
                            1111111111f1111f11111111ffffff11ffff111119f11111
                            1111111111b11111f11111111ffffff11111f111111f1111
                            11111111111f1f1ff111111111bfffb111111f1f1f1f1111
                            111111111111bffb1111111111111111111111bfffb11111
                        `, SpriteKind.Creature)
            case 135:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111111111f1111111111111111111111111111111111
                            111111111111ff111111111111111111111111111111ff11
                            11111111111f4f11111111111111111111111111111fdf11
                            1111111111ff4f1111111111111ffff4ff11111111fdf111
                            1111111111ff4f11111111111ff4444ff11111111fddf111
                            111111111ff44f111f111111fddd4fff41111111fddf1111
                            111111111ff4ff11ff1111ffdddffff411111f1fdd1f1111
                            111111111ff4ffff4f111fdddfffff411111f1fdd1f11111
                            111111111ffffff44f11fdddffff4d11111f1fdd1f1111ff
                            111111111ff4fdd4fd4fdd4fffffff1111f1fdd11f11ff1f
                            111111111f4fdd44ddf4d4ffff4111111f1fdd11f1ff11f1
                            11111111f4ddddddddfdd4fffffffff4fdfdd111ffd11f11
                            111111114ddddddddd4dd44fff44df4ddfdd111fdd11f111
                            1111111fddddddddddddddf44f4d44ddfdddddfdd111f111
                            1111ff1f4ddddddddd4f4d4f4fffffffddddd4dd111f1111
                            1111fdfff1dddddd4fff4d44f444ddd44fff4dd111f11111
                            111141d4ffdddddf1fffdd4f44dddd1111111fdddffffff1
                            111114d44fdddd4ffff4d44f4dd11111114ffdddddd111f1
                            1ffff44fd4dddd44f4ddd444f11111dff44ddddd1111f411
                            11f11d4fdddddddddddd4ffffdf44f4444dddd1114f41111
                            111ff4df4df4ddddddd4ffddddd4f444dddd1114f4111111
                            1111f1d4fddddddfdd4fdddddddd4f4ddddd44f411111111
                            111f111ddf4dddff4ffd1111ddddddf4dddddff111111111
                            11f11ddddd1ffff4111dd1111111dddfdddddddf11111111
                            1f1ddddff41111111111ddddd111111dfdddddddf1111111
                            f1d4fff1f11d1111dd11dddddddfff11df111ddddf111111
                            4f41111f11dd1111dd111dddfdddfffffff1111dddf11111
                            111111f11dd41111ddf11dddfffdfffff4fff111dddf1111
                            11111f1dddff1111d4ff11ddffffffff44444ff11dddf111
                            1111f1ddffff4111d4fff1ddfffffff444444ffff4dddf11
                            111ffffffffff11ddfffffddfffffff4444444ff11f4ddf1
                            11111111fffff41d4ffffffdffffffff444444f11111f4df
                            1111111ff44fff1dffffff1ffffff414444444f1111111f4
                            1111111f44df1f4df44ff111fffff111f4444f1111111111
                            111111f1dddf11f4f444f111ffff4111fdd44f1111111111
                            11111f111df111ff444f1114ffff1111fddd4f1111111111
                            1111f111ddf11f4d444f111fffff11114ddddf1111111111
                            1111414ddf111fdd44f1114ffff41114111ddf1111111111
                            111114ff4111fd1d44f1114fff41111f1111d41111111111
                            111111111114111d4f111111111111144141f11111111111
                            11111111111f111d4f111111111111114ff4111111111111
                            111111111114414df1111111111111111111111111111111
                            1111111111114ff411111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 136:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            11111111111111111fffffff1111ffff1111111111111111
                            111111111111111ff1111111ffff4444f111111111111111
                            1111111111fff1f111ff11111f4444ff1111111111111111
                            111111111f111f11fff44411fff44f111111111111f11111
                            11111111f111f11fff44444f4444f111111111111f1ffff1
                            11111111f111f14ff4444111f44f1f111111f1111f11111f
                            1111111f111f11fff4444fff444f1f11111f1f1ff111111f
                            11111ff1111f11ff444ff44444f1f4f111ff11f11114f11f
                            1111f11111f114ff44f44444ffff44f11f11111114ff41f1
                            1111f11111f11ff444f44fff111144f1f111114ffff441f1
                            111f111111f11ff44f44ff1111444fff11144ffffff41f11
                            111f111111f14ff44f4f11111444fff1144fffffff441f11
                            11f1111111f44ff44ff111111444f1f144fffffff4411f11
                            11f1111111f44ff4fff111111444ff114fffffff4411f111
                            11f11111111f44f4fff11111144fff144ffffff4411f1111
                            11f41111111f444ffff11111444ff114ffffff4411f11111
                            11f411111114f4ff4ff11444444ff114fffff4444f111111
                            11f411111144fff4444f444444fff14fffff4444f1111111
                            111f41111144ff444444ff444ff4444fff4444ff11111111
                            111f4411144f4ff4444444fff444444ff444ff1111111111
                            11f1f44414f44fff4444441144444444444ffff111111111
                            11f41f4444f4f1f1f44441144ffff4444ff4f44f11111111
                            1f4411111f44f1fff444444ffffff4444f444f44ff111111
                            1f4441111f44f14ff44444ff1fff4444f44444f411f11111
                            1f4444411f44f144444444fffff44444f44444f1111f1111
                            1f444444f4444f144444444fff44444f4444444f1111f111
                            1f444444f4444f1444444444444444f44444444f1111f111
                            11f44444f44444f14ff4444444444f444444444f1111f111
                            11f44444f411444ff44444f4444ff4444444444f1111f111
                            111f4444f11111444ff44f44fff44444444444f1111f1111
                            111f4444f1111111111fffff41111144444444f111f11111
                            1111f4444f11111111111111111111114444441111f11111
                            11111f444f111111111111111111111114444f1111f11111
                            111111f4f4f11111111111111111111114444f1111f11111
                            1111111f444f111111111111111111111144f411111f1111
                            111111f14444f1111111111111111111114ff4411111f111
                            1111ff1114444f1111111111111111114ffff4441114f111
                            111f1111144444f4111111111111114fffff44444444f111
                            11f1111114444ffff41111114fffffff4fff4444444f1111
                            1f11111111444ffffffffffff444444f44ff444444f11111
                            1f1f1111114ffffff444fff44444444f44f44444ff111111
                            1ff111f11fffff41111114f11444444f4f4fffff11111111
                            11fffffff111111111111f11114444f44f11111111111111
                            111111111111111111111f11111444f4f111111111111111
                            11111111111111111111f11111114ff41111111111111111
                            11111111111111111111f11f11f1f1111111111111111111
                            111111111111111111111fffffff11111111111111111111
                        `, SpriteKind.Creature)
            case 137:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            1111111111111111111111111111111111fb111111111111
                            111111111111111111111111111111111b1f111111111111
                            111111111111dffffffbbd11111111111f1f111111111111
                            1111111111dbbddddddddfd1111111111f1f111111111111
                            1111111111bbbddddddddbfd11111111b1df111111111111
                            111111111bdbdddddddddbbfd1111111f1df111111111111
                            11111111ddbddddddddddbdbfd111111f1bf111111111111
                            11111111bdb1111111111dddbfd1111b11bf111111111111
                            1111111bdbbb11111111bffddbf1111f11bf111111111111
                            111111dbb111f111111b111fddfd111f11ff111111111111
                            111111bb11111b1111b11111fdbf11b11dff111111111111
                            111111fb11ff1b1111f1ff11fbdf11f11dff111111111111
                            111111fb11ff1b1111b1ff11bddf11f11bff111111111111
                            111111fdb111b111111b111fdddf1b111bfb111111111111
                            111111bfdffb1111111dbffddddf1f111bfb111111111111
                            111111dfdd11111111dd111dddbfdf11dffb111111111111
                            1111111fdd1111111ddd111dddfbffdddffb111111111111
                            1111111bddd111dddddd11dddbfbbbffdffd111111111111
                            1111111dfdd1ffffffff11dddfbbb11bfffd111111111111
                            11111111fdff1111111dffddffbb11111bf1111111111111
                            11111111ffd11111111ddbbdfbbb11111dbf111111111111
                            11111111bfd11111111ddbbbfbdb1111dddfd11111111111
                            1111111b1fd1111111dddbbfbdddb111dddbf11111111111
                            111111db1fd1111111ddbbbfbdddb111ddddfd1111111111
                            111111b11fd1111111ddbbfbdddddb1dddddbf1111111111
                            11111bf11dbd111111ddbbfbddddbb1ddddddff111111111
                            11111fdf11fd111111ddbfbdddbbbbbdddddfffffffbd111
                            11111fddf1fd111111dbbfbdbbbbbbdbdddfbddffffffbd1
                            1111bddddffb11111ddbfbbbbbbbbbddbddfbdddddffffbd
                            1111bdddddfbd1111ddbfbbbbbbbbbdddbdfddddddd1fffd
                            111bdddddddfd1111dbfbbbbbbbbbbddddbfddddddd1bbfd
                            111dfdddddddfdddbbffbbbbbbbbbbdddbfbddddddd1bbfd
                            1111fbdddddbfffffffffbbbbbbbbbdbbbfbdddddddbbbf1
                            1111dfbdddbbbbbbbbbbbffbbbbbbdbbbbfddddddd1bbfb1
                            1111bbfbbbddddbbbbbbddbfbbbbbbbbdbfddddddd1bbfb1
                            111dbdbfbddddddddddddddbbfbbbbbddbfddddddd1bbfd1
                            111bdddbfdddddddddddddbbbbfffbd1dfbddddddd1bfbd1
                            11dbddddbfbdddddbbbbbbddddbfbd11bfbdddddddbbfb11
                            11bdddddddfbbbbbddddddbbbbfbd111bfddddddd1bbfd11
                            1dbdddddffffbdddbbbbbbbbbfbd1111bfddddddd1bfbd11
                            1bfbbffffffffbbbbbbbbbbbfbd11111dffffffffbbfd111
                            1bbbbbbbffffdfffffffffffbd1111111dbfffffffbfd111
                            1bbbbbbbbfbd11dddddddddd1111111111dbfffffffd1111
                            11bbbbbbbbd111111111111111111111111dbfffffbd1111
                            1111dddddd111111111111111111111111111dddddd11111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 138:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111111116fffff61111111111111
                            11111111111111116ff66611161ff11111111111
                            111111111111111fbb11116611611ff111111111
                            11111111111111f6666111116161116f11111111
                            1111111111111fb11116661116161161f1111111
                            111111111111fb1111111b6116b61b6166111111
                            11111111111fb666666111b61b66b6116f111111
                            11111111116b61111116611b6b66b6bb6b611111
                            1111111111f611111111b66b6b6b6bb6b1f11111
                            111111111161666666111bb6b66fff6bb6661111
                            1111111116b611111166111b66fbb6f66bbf1111
                            111111111f611111111166bbbf6b16fbb1bf1111
                            111111111fb111111111bb6b6fb1f6bf116f1111
                            111111111fb6666666611bb6fb166fbf66bf1111
                            111111111f61111111166bb6fb1fbb1fbb661111
                            111111111fb11111111bb66ffb1f16f6b1f11111
                            111111111fb111111bbbbbb6fb16ff6b66f11111
                            111111111fb66666666bbbbb6f16bb61bb611111
                            11111111116ffffffff6bbbb6fff6b166f111111
                            1111111111fffffffffff6fb66f6666bf1111111
                            1111111111fbbffffffbbf6f666f66ff11111111
                            111111111fb161ffff161bff6666ff1111111111
                            1111111fff11f1f66f1f11fbfffff11111111111
                            111111f111f1616bb6161fb11111f11111111111
                            11111f1111fff6b11b6ffbbbb1111f1111111111
                            11111f11f1bbbb1111bbbbbffbb111f111111111
                            11111fb1bf11111111111bbbbff11bf111111111
                            111111fbbf111111111111bbfb11bbf111111111
                            1111111ff1bf11bf11bf1bfbfbbbbf1111111111
                            1111111f1bf1bff1ff1bf1bfbffff11111111111
                            111111f1bf1bf11111f1bf1bfbbf111111111111
                            1111111ff1ff1111111ff1ff1ff1111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 139:
                return sprites.create(img`
                            11111111111111111111111111ff11111111111111111111
                            1111111111111111111111111f11f1111111111111111111
                            11111111111111111b6f11111fbb1f111111ff1111111111
                            11111111111111111611f1111f6bb16f611f1bf111111111
                            11111111111111111f111f16f6f666fbbff1bbf111111111
                            11111111111111111fb111fbb16fff66116ffbf111111111
                            11111111111111111ff1111fbb1661166116bff111111111
                            11111111111111116bfb1111fb11161161116bf611111111
                            1111111111111116b1f6b111fb11116116116b6f61111111
                            11111111111111fb111f6b11fb66111616116b6bf1111111
                            11111111111116b1111f666fb1116116b6bb6b6bf6111111
                            1111166111111fb6666b6ffb111116bb66b6b6bb66111111
                            1111611f11116b611111bbb66611116b66b6b6bb6f111111
                            11116111f111f6111111111111611bb66b6bbbb6bf111111
                            1111f1111f16bf11ff1111111116bbb66666bb6bbf611111
                            1111f1111f1fb11f11f6661111116b6bffff6bbb6bf11111
                            1111f11111ff1b6f111fb166611bb66fbbb6f666bbf11111
                            1111f6111b61111fb111fb1116bbbbfb6bb6bfbbb6f11111
                            11111f11b1f111bf6b111fb1116bbbfbb6f66bf66bf11111
                            11111f1b1bfbb1bf66b11fb111b6bf666f6f6bfbb6f11111
                            11111fb1b1fbb66f666b16611bbb6fbbfb6f6bf666f11111
                            11111fbbbbf66bbbf666f6b66bbb6fbbf66f66f66f611111
                            11161f6bbb6ffff66fff66b6ffff66b6f666ff666f111111
                            11ff11fbb666fbbf6666bb6ffbbbbf666fff66666f111111
                            1f1f11fbb66fb61bfbbbbbbfb161bbf6f6ff66666f111111
                            611f11fbb66f1f11f6bbbb6f11f111ff6666f666f6111111
                            f11f61f6b66f1f11ff6666ff11f111f666666f66f1111111
                            f1bbf11fbb66f61ffffffff6f1611f66666666f6f1111111
                            fbbbbfffbbb66ff6666666666ffff6666bbbb66f61111111
                            fbbbbb6f6bbb6666fffffffff666666bbbbbbb6f11111111
                            1fbbb666fbbb66fbbbffffbbbbf66bbbbbbbbbb6f1111111
                            11ff6666fbbb66b111bffb111b6f6bbbbbbbbbb6f1111111
                            1f11ff6ffbbb6fb111bff1111b6666bbbb6bbbbbf1111111
                            f111f1fff6bb6ffb11bff111bb6ff6bbb6f6bbbbff111111
                            f1bbf1ffffbb6ffffffff1bb6ffff6bbb6f6bbbbff111f11
                            fbbbbf66ffbb6f616ffffffff666f6bb6f61b1b6ff11f6f1
                            1fbbbb66ffbbb6b1116ffb11bb666bbb6f1b1b6f6bf1f6f1
                            11ffbb66ffbbb6fb116ffb11bb6fbbbb6f6111f6bbfff6f1
                            1111ffff1fbbbb6fb1bffb1bb6f6bbbbb6f611bfbbbff6f1
                            111111111fbbbbb6fbb6f6bb6f6bbbbbbb6fffffbbbf66f1
                            111fff11fbbbbbbb6f66ff6ff6bbbbbbbbb6fff66bb66f11
                            11fbbbffbbbbbbbbb6fffff6666bbbbbbbbb6fff6666f6f1
                            11f6bbbbbbbbbbbb666666666666bbbbbbbb66ffffff66f1
                            111f6bbbbbbbbbb66666ffffffff6bbbbbbb66ff666666f1
                            1111f666bbbbbb666fff1111111bf6bbbb6666f666666f11
                            11111f66666666fff1111111111f666666666f1f6666f111
                            111111f6666fff1111111111111f6666666ff1116ff61111
                            1111111ffff11111111111111111fffffff1111111111111
                        `, SpriteKind.Creature)
            case 140:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            1111111111111111111111111111111111111111
                            111111111111111111111fff11fffffff1111111
                            111111111111111111fffeefffefefefeff11111
                            1111111111111111ffeeeffeeefefefefeff1111
                            11111111111111ffeeeefeeeeeeeefefefef1111
                            111111111111ffeeeeeeee33eeeeeeeefefef111
                            11111111111feeeeeeee33333333eeeeefeeff11
                            1111111111feeeeeee3333333333333eeeefeef1
                            111111111feeeeee333333333333333333efeef1
                            11111111feeeeee3333333333333333333feeef1
                            1111111feeeeee33333333333333333333eeee3f
                            111111feeeeee33333333333333333333333ee3f
                            111111feeeee333333333333333333333333ee3f
                            11111feeeee3333333333333333333333333ee3f
                            11111feeeffe333333333333333333333333ee3f
                            11111feef1ff333333333333333333333333ee1f
                            11fffeeeeffe333333333333333333333333e11f
                            1f13feeeee3333333311333333333333333331f1
                            1f33feeeee3333333111133333333333333331f1
                            1f33feeee33333333111133333333333333311f1
                            f333f3eee333333333113ee33333333333331f11
                            f313ff3ee33333333333effe3333333333311f11
                            f313ff3ee3333333333ef1ffe33333333331f111
                            f313f1f3e33333333333effe333333333311f111
                            f333f1f33e33333333333ee333333333311f1111
                            1f13f11f13e33333333333333333333311f11111
                            1f33f111f13ee33333333333333333311ff11111
                            11f33f111f113e333333333333333111f31f1111
                            11f33f1111ff111333333333331111ff313f1111
                            111f33f11111ff11113333311111ff33113f1111
                            1111fff1111111fff11111111ffff33113f11111
                            11111111111111111fffffffffff33113f111111
                            1111111111111111111111111f331133f1111111
                            111111111111111111111111f33133ff11111111
                            1111111111111111111111ff3113ff1111111111
                            111111111111111111111f3311ff111111111111
                            111111111111111111111fffff11111111111111
                            1111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 141:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111ffe111111111111111111111111111111fff111111
                            111111f31fe11111111111111111111111111ffe3f111111
                            111111e1113fe1111113eefffffe3111111ffe333f111111
                            1111113311333fe111e13333333eef111ffe3333ef111111
                            1111111f1133333efe1133333333eefffe333333ff111111
                            1111111f113333333e11333333333efee3333333fe111111
                            1111111e113333333e11333333333efe33333333fe111111
                            1111111e313333333e11333333333efe3333333ef11ff111
                            11111113f13333333e11333333333fe33333333ff1f11f11
                            11111111f11333333e1333333333efe33333333fe31113f1
                            11111111e11333333e1333333333efe33333333f1f1113f1
                            11111111e313333313e333333333ef13333333efef11113e
                            111111113f13333e13e333333333f31e333333fff1111e3e
                            111111111f11333e11e33333333ef31f333333ffe1111e3f
                            111111111e31333e1ff33333333eff1f333333ff11f11e3f
                            1111111113f1133e1ff33333333eff1f33333ffe1ef11e3f
                            1111ff1111e31333e13e3333333f31f33333eff31ef11e3f
                            111e11f1111f31333e1e333333ef1ee33333fff1f1f11e3e
                            11e111f11111f11333ef333333efee3333ef33f3f1f1133e
                            11f1111f11111ff13333e13333fee333effeeeef1e11e3f1
                            13111e11f1111feff333e13333f333effeeefff11f11e3e1
                            1e111ee1ef11feeeeff33e333eeefff1fffff111e1113f11
                            1f111e3efef1feeef13fffeeeffffffffff11111e11e3e11
                            1f11333fe11feeeff133333fffff33eff1111111f111f111
                            1f11e33f1e1feeefff13333e13333effe111111e1113e111
                            1f11e3e11ffeeef1ffeffff3ffffffffe311111f113f1111
                            1f1133f11f33eef1eff13333e13333effe31111f113e1111
                            1e1133f111f3ef1efffe333ef1333efffffe31e113f11111
                            131133e111f3efeffffffff33fffffffe11111f113e11111
                            11f1331e111ff1111eeffe133eeff13fffe13f133f111111
                            11f1331f1111111eefffffe33e3fe313eeef113fe1111111
                            11e1331f11111ef1133efff3eefffe3eeff13ff111111111
                            111f333e111ef133eeeeeff3e3fffeeeffffeeef11111111
                            111e3331e1f133eeeefff3ff3ff311ffeeeeeeef11111111
                            1111f331f1feeeefff13eeffffe31111fffeeefe11111111
                            1111e331f11ffff1111113fffffe31111feffff111111111
                            11111f331e1f3ef31111113effeee311feeeefe111111111
                            11111ee31f11feee1111113fff31111fffffe11111111111
                            111111fe31f1feef1111111fff1111feee3ffe3111111111
                            1111111ef31ffeef1111111efe1113effeeeeffffe111111
                            111111111ff11fef11111113f3111113effeeeef31f31111
                            11111111111ff31fe3111111e111111113efff13ffe31111
                            1111113efffeeff11e111111311111111113ef11f1111111
                            111111f11ef1feeffff1111111111111111111ff31111111
                            111113eff111ffffe3111111111111111111111111111111
                            11111111efffe31111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 142:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            111111111f1111111111111111111111111111111111111111111111
                            11111111fdf11111111111111111111fffffffff1111111111111111
                            1111111fddf111111111111111111111fdddddbb1111111111111111
                            1111111fddbf111111111111111111111fddbdddffff111111111111
                            111111fbdddf1111111111111111111111fddbffbbbbff1111111111
                            111111fddddbf1111111111111111111111fdf11fffbbbff11111111
                            11111fbdddddf11111111111111111111111f111111ffbbbf1111111
                            11111fddddddbf1111111111111111111111111111111fdbbf111111
                            11111fdddddddbf111111111111111111111111111111fdbbf111111
                            1111fbddddddddf111111111111111111111f111111ffddbf1111111
                            1111fbdddddddddf1111111111111111111f1f11fffdddbbf1111111
                            1111fddddd1bddddf11111111111111111f11fffdddddbbf11111111
                            111fdddd1dbddddddff1111111111fffffdddfbbddddbbf111111111
                            111ffd11dbdddddddddfffffff1ff111fdddbbbddddbbf1111111111
                            11ffd11dbdddddddddddbbbf11f11ddddddddddddbbbf11111111111
                            1fddf1dbdddddddddddbbbff11dfbbdddddddddbbbff111111111111
                            fdbfdfbfddbffddddbbbff1f1ddbfbddddddddbbff11111111111111
                            fbfdffdffbf1dfddbbbf11dfddbbbddddddddddf1111111111111111
                            1fdf1fdf1ff1ddfbbbf1111ddddddddddddddddf1111111111111111
                            1ff111f111f1ddbfbf11ddddddffdddddddddddbf111111111111111
                            11111111111f1dfbff1ddddbff11fddddddddddbf111111111111111
                            11111111111f1ddfd1dddbf11ddbfddddddddddbf111111111111111
                            11111111111ff1111bfff11dddbfddddddddddbbf111111111111111
                            1111111111f111ddddddddddbffdddddddddddbf1111111111111111
                            111111111f1111dddddddddbfbdddddddddddbbf1111111111111111
                            111111111f11ddddddfdddbfbdddddddddddbbbf1111111111111111
                            1111bff11fdddd1ddffddbfbddddddddddbbbbf11ff1111111111111
                            111b111ff1ddb111f11fdfbbdddddddfffbbbbf1fbbf111111111111
                            111f111111ddb11ff11fdfbbbdddddddddffbfffbbbf111111111111
                            11b1111bfbdddff1f11ddfbbbbdddddddddbfffbbfbf111111111111
                            11fd111fbddddddbbbbdddfbfbdddddddddddbfffbbbf11111111111
                            1bdddddddddddddddddddddf1fbdddddddddddddbffffffff1111111
                            1fddddddbbbbbdddddbddddf11fbddddddddddddddddbfbf11111111
                            1fdddbbbfffffffdddfddddf111fbddddddddddddddddff111111111
                            11fbbffffffffbbfffddddbf1111fbdddddddddddddddbf111111111
                            11fbf111f1fbbbbbfddddbbf1111fbbdddddddddddddddf111111111
                            111f111fffbbbfffddddbbf11111fbbdddddddddddddddf111111111
                            111111f1fbbbbf1fddddbf111111fbbddddddddddd1bddbf11111111
                            11111fffbbbbbbfdddbff1111111fbddddddddddd1bddddf11111111
                            1111f1fbbbbfffdddff111111111fddddddddddd1bdddddbf1111111
                            1f1fffbbbbbf1fddf11111ff111fddddddbdddd1bbddddddbf111111
                            f1f1ffbbbbbbfddf11111fdbfffbddddbbddd11bbddddddddbf11111
                            f11ffbbbbffffdf11111fdffffdbbbbbdd111bbbdddddddddbbf1111
                            1f1ffbbbbf1fddb11111ff1fdbfbbb1111bbbbbddddddddddbbbf111
                            1ffffbbbbffddf11111111fdffbfffbbbbbbbbdddddddddbbbbbbf11
                            1bddfbbbf1fddb1111111fdfdbf111ffbbbbbbbbbdddbbbbbbbbbbf1
                            11fddfff1fddf11111111ffdff111111fffbbbbbbbbbbbbbbbbbbbbf
                            111bfddffdddb1111111111f11111111111fffbbbbbbbbbbbbbbbff1
                            11111bfdddfb11111111111111111111111111ffffbbbbbbbbbff111
                            1111111bff11111111111111111111111111111111fffffffff11111
                        `, SpriteKind.Creature)
            case 143:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111131111111111111111111111111
                            11111111111111111111111111111ff3111111111111111111111111
                            111111111111f1111111111111113ffff11111111111111111111111
                            11111111111f1311111111111111ffff3f1111111111111111111111
                            1111111111f11f11f3111111111ffff333f111111111111111111111
                            111111111fd11f1f1f111111113ffff3333f11111111111111111111
                            11111111fd11dff11f11111111ffff333333fd111111111111111111
                            1111111f333dff111f111fd113fffffffffff33d1111111111111111
                            111113f111111333df13f1f11ffff3dddd3fffff3d11111111111111
                            1111fd111111111dfff11df1ff3d11111111dfffff31111111111111
                            1113d11111111111d31113ffddd1111f3d1111ffffffd11111111111
                            111f1111111111111df11ffff3d111111f31113ffffffd1111111111
                            11fd111d333d11111131dffffffd1111111f11dffffff3d111111111
                            13f111333333d11111113fffffff31111111f1dffffffff333ddd111
                            1f311d3333dd3d111113ffffffffff111fd111dff333fffffffffff1
                            1fd1133333dd331111dffffffffffff1f1f1113d111d3ffffffff3f1
                            1fd113333333331111dffffffffff1df33f111111f1111ffffff3f31
                            1fd11d3333333d1111df33ffffffff1f11dfd11111f1113ffff33f11
                            1fd111d33333d111ddffff3fffff1df3d11dfd3ff11311dfff33f311
                            1f3d11dd333d11ddd3fff3dd311ff1f11311dff1f11f11dff333f111
                            1dfddddddddddddddffffddddf1fdf11111d1d3f31113113f33f3111
                            11f3dddddddddddd3ffff3ddddfd1d111111d1131111f11df33f1111
                            111f3ddddddddd3fffffff3d1ddd11111111131d1111311df3f31111
                            1113ff3dddd3fffffffffffd11d11111111111311111111df3f11111
                            11df3ffffffffffffffffffd1111111111111113111111ddff311111
                            113ff33ffffffffffffffff11111111111111113d11111d3ff111111
                            11fffff3333ffffffffffff1111111111111111131111dd3fd111111
                            11ffffffffffffffffffff311111111111111111fd11dddf3d111111
                            11ffffffffffffffffffff3111111111111111113fdddd3ff3111111
                            11ffffffffffffffffffffd11111111111111111df3dddfdff311111
                            11ffffffffffffffffffffd11111111111111111df3dd3f111311111
                            11fffffffffffffffffff3d11111111111111111d3f33f1fff111111
                            11fffffffffffffffffffdd11111111111111111d3f3ffd1ff111111
                            113fffffffffffffffff3ddd1111111111111111d3ffdffd1f111111
                            11dffffffffffffff3113ddd1111111111111111d3ff3fffff111111
                            111ffffffffffff11111fdddd11111111111111ddfffffffff111111
                            111fffffffff3d33111dfddddd1111111111111d3ffffffff3111111
                            111fffffff3d111d3113ffff3d1111111111111d3ffffffffd111111
                            1113ffff3d11111113dff3d1fdd11111111111ddffffffff31111111
                            111d3f3d111111111133d11df3ddd11111111dddffffff3d11111111
                            111133dd11111111111d111fffddddd1111dddd3fff3d11111111111
                            11113dd1111d33d11111d13ffff3dddddddddddf3111111111111111
                            1111fdd11133333311113dffffffff3dddddd3ffd111111111111111
                            1113dd111d333dd3d111dfffffffffff33333ff31111111111111111
                            111fdd1113333dd33111d311111ffffffffffffd1111111111111111
                            111fdd11133333333111dd311dffffffffffff311111111111111111
                            111fddd11d333333d11ddd313ffffffffffff3111111111111111111
                            111fddd111333333111dd3ffffffffffffff31111111111111111111
                            1113ddd1111d33d111dddfffffffffffff3d11111111111111111111
                            111dfddd11dddd11ddddffffffffffff3d1111111111111111111111
                            1111fddddddddddddd3ffffffffff3d1111111111111111111111111
                            1111dfdddddddddddffffffff33d1111111111111111111111111111
                            11111d3fdddddddff33333dd11111111111111111111111111111111
                            1111111d3ffffff3d111111111111111111111111111111111111111
                            111111111dddddd11111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 144:
                return sprites.create(img`
                            ffff11111111111111111111111111111111111111111111116fffff
                            fb11f1111111111111111111111111111111111111111111ff11111f
                            fbb1f11111111111111111111111111111111111111111ff1111111f
                            fbbb1f11111111111111111111111111111111111111ff111111111f
                            1fbb1f111111111111111111111111111111111111ff111111111116
                            1fbbb1f111111111111111111111111111111111ff11111111111f61
                            11fbb1f1111111111111111111111111111111ff11bb1111111f6111
                            ffffbb1f1111111111111111116fff661111ff11bb11111116f11111
                            f116bb1f1111111111111111ff11111611ff116b11111116ffff6111
                            f11b6bb1f11fff611111116f111111611f11b6b1111116ffb1111f11
                            f11bb6b1f11f111f6116ffb11111f611f1bf6b111bbff111111111f1
                            1fbbb6bb1f1f6b111ffff11116ff111f1bf6b1111111111111111f11
                            11fbbbb11f11ffb11166bb6fffff111f1f66b1bb111111111111f111
                            1fffbbb61f11fffb1116fffb1111fff11f6bbb66b111111ffff61111
                            f11ffbbf11f11fff611f1116fb111bf1bf6bb6bbb1116ffff1111111
                            f11116b6b1f11ffff61fff1116fffff1f6666bbb116611111f111111
                            fbb111bbf11f6ff6f16f61f1f6f111f1f666bbb11111111111f11111
                            1ffbbb1b6b11f66611fbffffbf1111f1f66bbb1111111111111f1111
                            111ffbbbbfbf66111b61111b6111161bf6bb61111111111111f11111
                            11f11fbbbbff111bffb111bbf1111f1f666611111166ffffff111111
                            1fb1111bbb6ffffff6bbbbf611111f1f666bbbb111116f1111111111
                            11fbbb1b66b6666ff6666f111111611f66bbb111111111f111111111
                            111fff11b66bb66f6bbb66111111f1bf6bb111111111111611111111
                            1111f1111b66b6f661bbf111111611bf6bbbb111fbb1111f11111111
                            111f11111b6666fb111bf111111f11f6666bb1111f6bbbbf11111111
                            111fbbf1bbb6ffb1111bf11111f11bf666bb111111f6ffff11111111
                            1111ff11b66fb6611111bff61f11bf66bbb11111111f111111111111
                            11111f1666f6611bb1111bb6f111fbbbb1111f6bb111611111111111
                            111111ffbf6b111bbb111bbf111bb1b11111bbf6bbbbff6111111111
                            1111111fbf6b111bb611116111bb11111bbbbbbf6bbbf66ff6111111
                            1111111ff6b1111bb6111611111111111fbbbbbfffff666666f11111
                            1111111f6bb111bbf611111111111b11b1fbbbbf1111ff66b66f1111
                            1111111f6b1111bbf6111111111bbbfbbbbfbbbf111111fbbb666111
                            1116f11f6b111bbf6111111111b6bbbfbbbfffff1111111fb1b6f111
                            11f11f11fbb1bbf61111111111b6bbbbffff111111111111fb1b6611
                            1f1111f1f6bbbf6111111111bbb66bbbf1111111111111116bbb6f11
                            1f11111fff6bbf6b11111bbbbb6666fff1111111111111111f1bb661
                            61111111ffffb6f6b6fffff66666666111111111111111111f1bbbf1
                            f11111111f66fffffbbbbbbb6ff66f1111111111111111111f161bf1
                            fb11111116f66ffbb1111111111fff1111111111111111111f161b66
                            fb111111116ffbbb11111111111111f611111111111111111f1616bf
                            fbb1111111116fbb1116fffff6111111f6111111111111111f1f16bf
                            f6bbb1111111116fff61111111fff61111f111111111111166bf16bf
                            1fbbbbbbbbbbbb11111bbbbb111111fff11f611111111111fbbf1fbf
                            1f6bbbbbbbbbbbbbbbbbbbbbbbbb11111ff11f611111111f6b6b1f6f
                            11f6666bbbbbb666ffffffff666bbbb1111ff11ff61116f6bbfbf666
                            1116ff6666666fffb111111bfffff66bbb111ff111fff1bbbbfbf6f1
                            1111116ffffffb1111111111111bbfff66bbb11ffb11bbb66fbbf661
                            111111111ffb1111111111111111111bff66bbb11ff6666ffbbf6f11
                            111111116b1111111111bffffffbb1111bff666bbbb6fffbbbf66611
                            11111111f111111111bff111111fffbb1111ffff6bbbbbbbf666f111
                            11111116111111111bf11111111111ffbbbb11fff6fffff6666f1111
                            1111111f1111111bff11111111111111ff6bbb111bbbbbbb6f611111
                            11111161111111bf11111111111111111116ff6bbbbbbfff61111111
                            111111f111bfff6111111111111111111111116ffff6611111111111
                            111111ffff6111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 145:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            1111111111111111111f111111111111111111111111111111111111
                            111111111111111111fdf11111111111111111111111111111111111
                            111111111111111111fdf11111111111111111111111111111111111
                            1111111ff11111111fddf11111111111114f11111111111111111111
                            1111111fdf1111f11fddf111111111111f1411111111111111111111
                            1111111fddf11f1f1fddf11111111111f14111111111111111111111
                            11111111fddf1411fdddf1111111111f1f11111111111111114ff111
                            11111111fdddfff1fdddf111111111f1f1111111111111114fddf111
                            11111111fdd11f411fddf11111111f11411111111111114fdddf1111
                            111111111f11111f11fdf1111111f11f1111111111114f111df11111
                            111111111f11111411fdf111111f11d411111111114f1111df111111
                            1111111111f11111f11ff11111f11df1111111114f11111df1111111
                            1111114411f11111f111f1111f111d41111114ff111111df11111111
                            1111114ff4f111ff1411f111f111df1114fff11111111df111111111
                            11111114ffff1f11ff11df1f111d4ffff11111111111df1111111111
                            1111ffffffff4f11df11ddf111dd4111dfffff41111df11111111111
                            1111fdddffff44fdddf114111111dd4ffdddd41111df1144fff41111
                            11111fddddddffffddf114111dd4ffddd11f41111dfffffff4111111
                            111111f11ddddfd4fddf111d4ffdddd11f411111dffffff411111111
                            1111111f1111ddf4ffdfdddff4ddd11f4111111dfffff41111111111
                            11111111f1111ddf4ffddd4fffdddff1111111dffff4111111111111
                            111111111f1111ddffffd411ffd1111f11111dffffffffffff411111
                            1111111111f111ddfffdfff1fdd11111f4111111dddddddddddf4111
                            1111111114ff111f4f11dfffddfff11111f11111111ddddd4ff11111
                            11111114fffff11ff4111dfddddffff4111f11111111d4ff11111111
                            111111114ffff41df111d44fffddfddd4ff441111d4fff11fffff111
                            111111111ff4111d41114f4fddffdfddddddddd4fffffffffff11111
                            1111111ff11111df1114f44fddddf4dd111d4ffffffffffff1111111
                            11111ff1111dddd411dff4fddddddd111111ddddd4fffff111111111
                            1111ff1fddddddf11dfff4fddddd4111111111111dddd4ffff411111
                            11111f11fddfff4114ffdf111dddd4111111111111111dddddd44111
                            111111f114f11f11dff1df1f11dddf41111111111111d4ffff411111
                            1111111f1f11f41df1f1f1fdf1ddfdf4111111ffffffff1111111111
                            1111111fddf1f11f114df1f1dfddf1ff411111dffffff11111111111
                            11111111fdf14141141df11f1fddf1fff4111114ffff111111111111
                            1ff11111fddf1df11f1f111f1fddf1f11f41111dfffff11111111111
                            f11ff1111fdfdf114fdff111f1fdf1f111f4111df14fff1111111111
                            1ff1dff111fdf111ffffff11f1ff1df1111f4d1df1114ff111111111
                            1114fddff1fdf11fddfff4fd4f1414f11111f4dddf11111111111111
                            11111ffddfdfdff1dfff41fd4f14df1111111f4ddf11111111111111
                            1111111fdddfdf11f1111ffddf1ddf11111111f4df11111111111111
                            111111114fdddd1f1111f14dddf1fff11111111f44f1111111111111
                            1111111111fddff1111f1fddddf1ffdf11111111f4f1111111111111
                            11111111111fdf4111f11fd4ddf1ffddf11111111ff1111111111111
                            111111111114ddf11f11f4dfdf11f4fd1f1111111141111111111111
                            111111111111fdf1f11ffddfdf1fddff1f1111111111111111111111
                            111111111111f1ff11fffdfff11ffdff11f111111111111111111111
                            111111111111f1f11fff4dffd1fffd41f1f111111111111111111111
                            1111111111141f1f41ff1fffd4ffff1f1f1f11111111111111111111
                            11111111111f1ff114141fffffffff141f1f11111111111111111111
                            111111111111ff111141f1fdfdf1f1f1f1f1f1111111111111111111
                            111111111111111111f141fdfdf1f1f1f11ff1111111111111111111
                            11111111111111111f1f114d4d41411f1f1111111111111111111111
                            11111111111111111414111f1f111114141111111111111111111111
                            11111111111111111141111111111111411111111111111111111111
                        `, SpriteKind.Creature)
            case 146:
                return sprites.create(img`
                            11111111111111114411111111111111111111111111fff111111111
                            1111111111111f1411411114f411111111111114111f1f4ff1111111
                            111411111111f14111111ff111f1111114f41114414111f44ff11111
                            111444111111f1f11111f111111f1114f144f1114411111f444f1111
                            11114444111f114111114ff411414f4111114f4114411111f444f111
                            111114441114111f111f111141f1f1111111111f4111111f4444f111
                            111111444111f111f1141111f1f141111111111444ffff444444f111
                            11111114411141111f11111f4441111111111111144444444444f111
                            1111111441111f1111f411444f111111f4111111114444444444f111
                            11111fff111111f111144ff44411111f1111111111444444444f1141
                            1111f44f11111114ff444444f1111f4111114fff444444444ff11441
                            1111f444f1111111111f44444411f1114fffffff1f444444f1114411
                            111f4444fff111111111f44f441f11ff111fffffff1f44444f111111
                            11f44444ff4f111111111f4444f11f11f411ffff44ff14f444f11111
                            11f41444f444ffff1111144444f14f4111411f444444f111f4111111
                            1f41444f4444ff4ff11111444f1f114ffffff4f444444f1111f11111
                            4441444f4444f444f11111f44f4fffffff444444f44444f11f441111
                            f41144444444f444fff111f44f4ffffff4ff44444f44444ff44f1111
                            141144f4444f4444ff4f111f4444ffffff44ff4444f44444f4441111
                            1f1444f4444f444fff44f1fff44fffff44f4444f444f444444f11111
                            1f1444f144f4444ff444ffff44444ffff44f4444f444f44444f11111
                            1f1144f114f4444f4444f4ff4444444fff44f4444f444f44444f1f11
                            1f1144111144444f444f44f444444444fff44444444414414444f4f1
                            1f1144111444444f444f444f444444444fff44441144414414444f11
                            1411441114444444444f444f4444444444fff4441114441444444f11
                            411144111444444444f4444f44444444444ff444411444444444f111
                            f11144111444444444f444f4444444444444f4444411444444444f11
                            4111144114441444444444f44444444444444f444444444444444f11
                            1411144111441144444444444444444444444f444444444444444f11
                            1f111144111441144444444444444444444444f444ff44f4444444f1
                            14111144111444114444444444444444444444ff4f11ff4f444444f1
                            114141144111444414444444f4441444444444fffff11111f44444f1
                            11f141144111144444144444ff414444444444fff41111111f444f11
                            11f114114444411144444444ff41144444f444ff41111114f4444f11
                            11141141144444444144444ff4411144444f4fff44ff44444ff4f111
                            111f1144114444444444444f444111444444ffff44444f44444f4111
                            111f111441114444444444ff44411111444444f11144444444fff111
                            1411411444441144444444ff44441111114444411111144f44ffff11
                            11f1f1114444444444444f11f4444111144444111fff444444fff111
                            111f1111444444444444f1111ff44444444f441114fff444f4f41111
                            1111f11114444444444f11111f4f4fff441ff41111f1f444ff111111
                            11111f411444444444f111111f4f11111111ff11111ff444f1111111
                            1111111f1144444444f11111114f111111111ff11114f44441111111
                            11111111f4144444f441114111f44111111111ff114444f411111111
                            1111111111f444ff1f1144414ff4f11ff11111f4f4444f4f11111111
                            111141f1f4144f111f144411f4f44ff44f11111f4ffff44441111111
                            11414f1f11114111414441111f4f41f411f1111f4f14ff44f1111111
                            111441111114111111111111f4f1f41fff1f11141f114ff14f111111
                            11111111111111111111111f1f111f1f11f11111f111114f14f11111
                            11111111144441111111111414111411f111111111111114f1141111
                            111111114441111111111111f11111f141111111111111114f1f1111
                            1111144444111111111111111111111f111111111111111114f1f111
                            111111111111111111111111111111111111111111111111114f1f11
                            1111111111111111111111111111111111111111111111111114ff41
                            11111111111111111111111111111111111111111111111111114ff1
                            111111111111111111111111111111111111111111111111111114f1
                        `, SpriteKind.Creature)
            case 147:
                return sprites.create(img`
                            1111111111111111111111111111111111111111
                            111111111111111111bfffb11111111111111111
                            1111111111111111bf11111f1111111111111111
                            111111111111111fd11111f11111111111111111
                            11111111111111fdddb11f111111111111111111
                            111111111111bffffbddf1111111111111111111
                            1111111111bfbbbbbbff1111111bfffb11111111
                            111111111fbbb1fbbbbbf1111bf1111f11111111
                            11111111ffbbbffbbbbbbf11f11111f111111111
                            11111111ffbbbbbbbbbbbbbf11111b1111111111
                            11111111fbbbbbbbbf11bbfdd1111f1111111111
                            111111bfbbbbbbbbffd1bfddddddb11111111111
                            11111f11dbbbbbbfffbfbfbdbfddf11111111111
                            1111b111ddbbbbbfffffbbfbddbfdb1111111111
                            1111f11ddddbbbbbfffbbbffbbddff1111111111
                            1111fddddddbbbbbbbbbbff1fbbbbf1111111111
                            1111bddddddbbbbbbfbbbf111fbbbf1111111111
                            11111fdddddbbbbbfbbbf11111fbbb1111111111
                            111111bfddbbbbffbbbf1111111fb11111111111
                            11111111bfffffbbbbbf11111111111111111111
                            11111111111ffdbbbbf111111111111111111111
                            11111111111fdddbbbf111bfb111111111111111
                            1111111111f11dddbbf1bfbbbfb11111b1111111
                            111111111fdd11ddbbffbbbbbbbf11111b111111
                            11111111f111d11ddffbbbbbbbbbb1111fb11111
                            11111111f1111d1ddfbbbbbbbbbbbf111ff11111
                            1111111fd1111ddddfbbbbbbbbbbbbb11ffb1111
                            1111111f1dd111ddfbbbbbbbbbbbbbf1bfff1111
                            111111b1111dd1ddfbbbbbbbbbbbbbbfffff1111
                            111111f111111dddfbbbbbbbdfbbbbbffffb1111
                            111111fd111111dddbbbbbbddfbbbbbbfff11111
                            111111f1dddddddddfbbbddddfbbbbbfbfb11111
                            111111b11111111ddddddddddbdbbbbbff111111
                            1111111f1111111d1d1d11ddbdddbbbfbb111111
                            1111111b111111d11d11d11dfddddbddf1111111
                            11111111f111dd111d11dd1bffdddddbf1111111
                            111111111fdd11111d111df111fdddfb11111111
                            1111111111f11111d1111b11111bfb1111111111
                            11111111111fb11d11bfb1111111111111111111
                            1111111111111bfffb1111111111111111111111
                        `, SpriteKind.Creature)
            case 148:
                return sprites.create(img`
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                            111161111111111111ff1111111111111111111111111111
                            11161f11111111111f11f111111111111111111111111111
                            111f116111111111f111f111111111116fffff6111111111
                            111ff1f11111111f1111f111111116f6bbbbbbbff1111111
                            111f11ff1111116111bf1111111f6bbbbbbbbbbbbf111111
                            111f116fff6111f11b6f111111f11111111bbbbbbbf11111
                            111f1fbbb66ff6b166b1f1111f11111111111bbbbbbf1111
                            111f61111bb66fb111bbf111f1111111111111bbbbbbf111
                            11f6111111b66f11111f111f1111111111111111bbbb6111
                            11f116f6111b6611b6ff11f111111111111111111bbbb611
                            16f161bb611bb6b111bf1f1111111111111111111bbbbf11
                            1f11f11bf11bb66b11bf1f11111111111111111111bbb611
                            1f611f11611ff6fb11f1f111111111111111111111bbbb61
                            16f611f6111f166fbbf1f11111111bbb1111111111bbbbf1
                            116f111111f1bf66ff1fb11111bbbbbbbb11111111bbbbf1
                            11ff1111bfbf6f6ff11fbbbbbbbbbbb6f6b11111111bbbf1
                            11fb111bbf66ff66f1fbbbbbbbbbbf61116b1111111bbbf1
                            1161111bbffff66bf1fbbbbbbbb6f11111fb1111111bbbf1
                            16111111bbff666bbf66bbbbb66f1111116b1111111bbbf1
                            1f11111111bb6fbbbbf66666666f111116b11111111bbbf1
                            1f11111111b6fffffbbff66666f111111fb1111111bbbb61
                            11f111111b6f66666fbbbff666f111111611111111bbb611
                            111f1111b6f666ff66fbbbbfff111111f11111111bbbbf11
                            11116fff61f11ffff6fbbbbbb6ff11f61111111bbbbb6f11
                            1111111111f11ffff6fb11111111ff111111111bbbbbf111
                            1111111111f666ff66f1111111111111111111bbbbb6f111
                            11111111111f66666fb11111111111111111bbbbbb6f1111
                            111111111111fffffbbb11111111111111bbbbbbb6f11111
                            111111111111111f6fbbbbb1111111bbbbbbbbbb6f111111
                            111111111111111f66ffbbbbbbbbbbbbbbbbbb66f1111111
                            111111111111111f6666ffbbbbbbbbbbbbbb66f611111111
                            1111111111111111f66666ffbbbbbbbbb666f6b111111111
                            1111111111111111f6666666fff666666ff6b11111111111
                            11111111111111111fb666666f16ffff6b11111111111f11
                            11111111111111111fbb666666f111111111111111111f11
                            111111111111111111fbb66666f11111111111111111ff11
                            1111111111111111111fbbb6666f11111111111111ffff11
                            11111111111111111111f6bbbb66ff1111111fff1f16f111
                            111111111111111111111ff6bbb666ff1111f611ff66f111
                            11111111111111111111111ff6bb6666ff1f66116fff1111
                            1111111111111111111111111ffff66666ff6ff66f111111
                            11111111111111111111111111111fffffff6ff66f111111
                            111111111111111111111111111111111111f666f1111111
                            1111111111111111111111111111111111111fff11111111
                            111111111111111111111111111111111111111111111111
                            111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 149:
                return sprites.create(img`
                            11111111111111111111111111111111111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                            111f1111111fff11ff11111111111111111111111111111111111111
                            11f3e11111f11eff31f1111111111111ffff11111111111111111111
                            11f1f1111f1133f1ff1111111111111f1113f1111111111111111111
                            11f1f111f333ef1ff11111111111111f11113f111111111111111111
                            11f1f111f3eef1fe3f111111111111f1133333f11111111f11111111
                            11f3e111f3eef3fe3f11111111111f313fff333f111111e3e1111111
                            111f3e11ffff13fe33f1111111111f33fff3f333f11111f3f1111111
                            111f3ffe333f1fefe3f111111111f333fff3ef333f1111f33e111111
                            1111f3f3333f3feefe3f11111111f33ff3ef1ef333f111f33f111111
                            1111f3ef133f3f33ef3f1111111f33fef3ef1eef333f11f133e11111
                            1111ff3f1133f3333fef1111111f3feef1ef1eeef333f1f133f11111
                            111f1ff1111331133efef11111f3feef1eef1eeeef33f1f133e11111
                            111f11111113113ffefef1111f3feeef1eeef1eeeef33ff1133e1111
                            111f1111113311e13f3ff111f3feeeef1eeef1eeeeef33f1133f1111
                            111f1111113313ff3f3fff1fffeeeef1eeeef1ffffffffe1133e1111
                            111ffe1111333eff3f3efffffeeeeef1eeefff1111111f111333e111
                            1111f1e11333eff1ff3eeffffeeeeef1eff1111111111f111333f111
                            1111ffffe333eefff33eeeffffeeeef1f111111111111e111333f111
                            11111fff1333333333eeeeeefffeef1f111111111111f1111333f111
                            111111fff3333333e3feeeeeeeeffff1111111111111e1111333f111
                            1111111f13333333f3feeeeee33333effff11ff1111f11113333f111
                            1111111f133333333feeeeeee33113333eeff13f111e11113333f111
                            11111111f1333f333feeeeeeef331111133efffff1f111133333e111
                            11111111f1f33333fe33eeeeeefe33111113eef1ff311333333e1111
                            111111111f3333efe33333eeeeefe33111113efff3333333333f1111
                            111111111ffffffe311333eeeeeefe3331113ef1f333333333ef1111
                            1111111ffeefffee3111113eeeeeffee3333ef1fe3333333eeef1111
                            11111ffeeeefffe111111133eeeeefffeeeefffeee3333eeeeef1111
                            11fff1133eefff11111133113eeeefffffffeffeeeeeeeeeeef11111
                            1f1f1133eeeff3333333111333eefffe333efffeeeeeeeeeeef11111
                            1eff33eeeefff1111111111313eefe3111333effeeeeeeeeeff11111
                            1f1feeeeeefff1111111133113eee311111333efffeeeeefff111111
                            1f3ffeeeeffff111111331111eeee3111113333effffffffff111111
                            11f33ffff111f33333311111e33e311111133333effffffff1111111
                            111ff1111111f111111111ee333e311111133333effffffff1111111
                            111111111111f333333eee3333ee311111333333eeffffff11111111
                            111111111111ffeeeee33333ee3e311111333333eeffffff11111111
                            111111111111ff33333333ee333ee31113333333eefffff111111111
                            11111111111ffffeeeeeee3333eef3311333333eeeffff1111111111
                            11111111111ffef3333333333e33ef33333333eeeeeff11111111111
                            11111111111f3efe3333333ee333eefe3333eeeeeeef111111111111
                            11111111111f33efeeeeeee3333eeeefeeeeeeeeeeeeff1111111111
                            11111111111f133efeee33333eeeeeeefffeeeeeeeeeeef111111111
                            111111111111f133effeeeeeeeeeeeeefffffffe33eeeeef11111111
                            111111111111f113eeefffeeeeeeeeefffffffe3333eeeef11111111
                            1111111111111f13eeeefffffeeeeffffffe11f31133eeeef1111111
                            11111111111111ffeeeffffffffffffffe1111f31133eeeef1111111
                            1111111111111111fffffffffffffff11111111f3113eeeff1111111
                            1111111111111111111111fffffffff11111111fe333efff3f111111
                            111111111111111111111111fffffff111111111ffeff133ff111111
                            111111111111111111111111fffffff1111111111ff13f11f1111111
                            1111111111111111111111111fffffe111111111111ff1ff11111111
                            11111111111111111111111111fffe11111111111111111111111111
                            11111111111111111111111111111111111111111111111111111111
                        `, SpriteKind.Creature)
            case 150:
                return sprites.create(img`
                            111111ff111111111111bff111111111111111111111111111111111
                            11111b11f1111111111b111f11111111111111111111111111111111
                            11111f111f111111111f111df1111111111111111111111111111111
                            11111f1111f11bffb1f111ddf1111111111111111111111111111111
                            11111f11ddfbf111fff111ddb1111111111111111111111111111111
                            11111f11ddd1111111b11ddb11111111111111111111111111111111
                            11111b1dddd11111df111ddf11111111111111111111111111111111
                            1111b11ddd11111ddb111ddb11111111111111111111111111111111
                            1111f111d111111db1111dddf1111111111111111111111111111111
                            111d11111111111111111dddb1111111111111111111111111111111
                            111b11111111111111111dddbfb11111111111111111dbff11111111
                            11f111111111111111111dddbddff1111111111111db1111ff111111
                            1f1111111111111111111ddddbdddf11111111111b11111111ff1111
                            b11111111dd1111111111ddddbdd1ff111111111b111111111ddf111
                            f1111111d11111bbd111dddddbd111ff1111111b1111111ffddddf11
                            f111111d1111bfbddddddddddff1111f1111111f111111f11fdddf11
                            ff11111b111fd1bddddddddddf1f1111b11111b111111b1111fdddf1
                            bf1d11b11dff111dd1ddddddf111f111f11111f111111f11111fddf1
                            1f1b11d1dfbf111d111dddddf111f11ddf1111f111111f11111fddf1
                            1bbd111dbfbf11b111ddddddf11fffdddf111b1111111f111111bddf
                            11f111ddf1f1db1111dddddbdffddfffff111f11111111f11111fddf
                            11f111ddfd1d11111ddddddbdddddd111df11f11111111b11111fddf
                            11f1111d1111111ddfffbdddbdddd1111fff1f11111111df1111fddf
                            11b11111111fb1dff1ffffdddddbd1111f11f1f1111111db1111bddf
                            111b11111bf11ff11fb1fdf1ddbbddd1f111b1f111111d1df11fddbf
                            1111ff1bf11ffd11b1f1f1b111bdddd1f1111ff1111111ddb11bddbf
                            111111ffffb11111b1f1f11b1111dd11f1111ff111111d1db1fdddbf
                            11111111111111b11df1111111dd1111df11df1f1111d1ddbfddddb1
                            11111111111111f1ddff111dffbdd11dff11df1f11111d1ddfdddbf1
                            1111111111111b1ddff1fddbdddfbddff1f11dff11d1d1dddfdddbf1
                            1111111111111f1df1111ff111dddffdfff11dff1d1d1ddddbddbf11
                            1111111111111fddf11111f11111dddddfff11fdffd1ddddddfbbf11
                            111111111111bddf111111b111111dddddbdf1dfddfdddddddfff111
                            111111111111fbdf11111b11111111dddbddf11dfddfddddddf11111
                            11111111111bddf111111f11bbd1111ddb1ddf1dfdd1fdddddf11111
                            11111111111fddf111111f1ddddb111db111dfbdfdd1bdddddf11111
                            1111111111b11dd11111bfbdddddb111b111df1dfdd11fddddf11111
                            1111111111b11ddf1111f1b11dddbb11b11ddb111b111bddddf11111
                            1111111111f111df111b11f11dddbb11b11df1111f1111fddbf11111
                            1111111111f111df111b11fddddbbbb1bdddb111df1111fddbf11111
                            1111111111f111dfff1f111bdddbdbbddbdf111ddf111dfddbf11111
                            1111111111f111f111ff111fddbdbdbbdbbb111ddf11ddfdbb111111
                            1111111111b111f11df1f111fbdbdbbbbdf1111dbdddddfbbf111111
                            11111111111b11f1ddf1f111dfbbbbffffb111ddfddddbbbbf111111
                            11111111111f11dfffdf1f1d1dfbbf1ddf1111ddfddddfbbf1111111
                            11111111111fbbdddddf11f1dddbffddb1111dddfdddbbbbf1111111
                            11111111111ff1bdddbbf11fddddd1fb11111ddfddddfbbf11111111
                            11111111111b111fdb111f111fddf1ff1111dddf1ddddff111111111
                            11111111111b11dffb111f111ffbbffb111dddfbf1ddd1f111111111
                            111111111111fddfffddff11ffbbbf1db1ddddfbf111111bf1111111
                            1111111111111bffbfffffff1ddbbfdddfbbdfbbf11111111bf11111
                            1111111111111111ffbbbb1111ddbbffff1dfbbff1bbf111111f1111
                            111111111111111f11b1111111ddddbbbfff1ff1fb11df111111f111
                            111111111111111f11f11111ddddbffff11111111f11dfdd111df111
                            1111111111111111fffddddbffff1111111111111fdddfffdddf1111
                            1111111111111111111ffff1111111111111111111fff111fff11111
                        `, SpriteKind.Creature)
            case 151:
                return sprites.create(img`
                            1111111111111111111111111111111bfb111111
                            11111111111111111111111111111bf111fb1111
                            1111111111111111111111111111b1111111f111
                            111111111111111111111111111f11111111db11
                            111111111111111111111111111b11111111df11
                            1111111111111111111111111111bff1111dddb1
                            1111111111111111111111111111111bfffdddf1
                            11111111111111111111111111111111111bddf1
                            111111111bffb111ffffffb1111fff111111bdf1
                            111111111fd11ffbd11111ddbff11f111111f1f1
                            111111111fbd111111111111df11df111111f1f1
                            1111111111fbd11111111111111dbf111111f1b1
                            1111111111fb111111111111111dbb11111b1db1
                            1111111111b1111111111111111df111111f1f11
                            111111111bd11fbd111111dbf111db1111f1db11
                            111111111f11bddbd1111dbddb111f11fb1df111
                            111111111f11bdffbd111bffdb11dffbdddf1111
                            111111111bd1b1f1f1111f1f1b11dfdddfb11111
                            1111111111f111fff1111fff1111dbbfb1111111
                            1111111111f1111fbddddbf1111df11111111111
                            1111111bffbd11ddddddddd111df111111111111
                            11111bfddddfbd111111111d1fb1111111111111
                            1111b11ddffffbb11111111bf111111111111111
                            1111f11fb11111fb11111bff1111111111111111
                            111b11f111111111ffffffbbf111111111111111
                            111fd1f11111111ffbbbbddddfb1111111111111
                            111bd11b1111bfffbbbbd111dddff11111111111
                            1111f11f111b11dfbbdd1111bddddf1111111111
                            1111b11b111f11dfdd111111dbddddf111111111
                            11111fddf111bffd11111111dffddf1111111111
                            11111bdddf111ffd1111111ddf1ff11111111111
                            111111fdbbfbfffd111111b1ddb1111111111111
                            1111111bfbbfbffbd1111f111df1111111111111
                            111111111fffbfffbd111f111df1111111111111
                            11111111111fbbfffbdddb11ddf1111111111111
                            111111111111fbffffffb1fddfbf111111111111
                            11111111bfffffffffb1111fbdddff1111111111
                            111111bffffbbffff111111fbdd111ffb1111111
                            11111bffffffffff11111111ff11d11ddf111111
                            11111111111111111111111111bfffffb1111111
                        `, SpriteKind.Creature)
        }

    }

    function getMoveFromType(creatureType: CreatureType): string {
        switch (creatureType) {
            case CreatureType.Bug:
                return "Bug Bite";
                break;
            case CreatureType.Dark:
                return "Bite";
                break;
            case CreatureType.Dragon:
                return "Dragon Claw";
                break;
            case CreatureType.Electric:
                return "Thunderbolt";
                break;
            case CreatureType.Fairy:
                return "Moonblast";
                break;
            case CreatureType.Fighting:
                return "Brick Break";
                break;
            case CreatureType.Fire:
                return "Flame Thrower";
                break;
            case CreatureType.Flying:
                return "Wing Attack";
                break;
            case CreatureType.Ghost:
                return "Hex";
                break;
            case CreatureType.Grass:
                return "Razor Leaf";
                break;
            case CreatureType.Ground:
                return "Earthquake";
                break;
            case CreatureType.Ice:
                return "Ice Beam";
                break;
            case CreatureType.Normal:
                return "Swift";
                break;
            case CreatureType.Poison:
                return "Sludge Bomb";
                break;
            case CreatureType.Psychic:
                return "Psychic";
                break;
            case CreatureType.Rock:
                return "Rock Tomb";
                break;
            case CreatureType.Steel:
                return "Flash Cannon";
                break;
            case CreatureType.Water:
                return "Surf";
                break;
            case CreatureType.None:
                return "Tackle";
                break;
        }
        return "";
    }

    function getTypeFromMove(move: string): CreatureType {
        switch (move) {
            case "Bug Bite":
                return CreatureType.Bug;
                break;
            case "Bite":
                return CreatureType.Dark;
                break;
            case "Dragon Claw":
                return CreatureType.Dragon;
                break;
            case "Thunderbolt":
                return CreatureType.Electric;
                break;
            case "Moonblast":
                return CreatureType.Fairy;
                break;
            case "Brick Break":
                return CreatureType.Fighting;
                break;
            case "Flame Thrower":
                return CreatureType.Fire;
                break;
            case "Wing Attack":
                return CreatureType.Flying;
                break;
            case "Hex":
                return CreatureType.Ghost;
                break;
            case "Razor Leaf":
                return CreatureType.Grass;
                break;
            case "Earthquake":
                return CreatureType.Ground;
                break;
            case "Ice Beam":
                return CreatureType.Ice;
                break;
            case "Swift":
                return CreatureType.Normal;
                break;
            case "Sludge Bomb":
                return CreatureType.Poison;
                break;
            case "Psychic":
                return CreatureType.Psychic;
                break;
            case "Rock Tomb":
                return CreatureType.Rock;
                break;
            case "Flash Cannon":
                return CreatureType.Steel;
                break;
            case "Surf":
                return CreatureType.Water;
                break;
            case "Tackle":
                return CreatureType.Normal;
                break;
        }
        return CreatureType.None;
    }

    //% blockId=makeCreatureFromID 
    //% block="make creature from id $id || with\n level $level xp $xp hp $hp attackValue $attackValue"
    //% expandableArgumentMode=toggle
    //% blockSetVariable=myCreature
    //% group="Create"
    //% weight=99
    export function makeCreatureFromID(id: number, level: number = 5, xp: number = 50): Creature {
        //return null;
        let sprite = makeCreatureImageDex(id);
        if (id > 151) {
            return null;
        }

        switch (id) {
            case 0:
                return new Creature(sprite, CreatureType.None, CreatureType.None, "Missingno", level, 0, 0, xp, 100, 100);
                break;
            case 1:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Bulbasaur", level, 16, 2, xp, 25, 5);
                break;
            case 2:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Ivysaur", level, 32, 3, xp, 42, 12);
                break;
            case 3:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Venosaur", level, 0, 0, xp, 70, 18);
                break;
            case 4:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Charmander", level, 16, 5, xp, 25, 5);
                break;
            case 5:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Charmeleon", level, 32, 6, xp, 42, 12);
                break;
            case 6:
                return new Creature(sprite, CreatureType.Fire, CreatureType.Flying, "Charizard", level, 0, 0, xp, 70, 18);
                break;
            case 7:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Squirtle", level, 16, 8, xp, 25, 5);
                break;
            case 8:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Wartortle", level, 32, 9, xp, 42, 12);
                break;
            case 9:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Blastoise", level, 0, 0, xp, 70, 18);
                break;
            case 10:
                return new Creature(sprite, CreatureType.Bug, CreatureType.None, "Caterpie", level, 7, 11, xp, 20, 3);
                break;
            case 11:
                return new Creature(sprite, CreatureType.Bug, CreatureType.None, "Metapod", level, 10, 12, xp, 22, 5);
                break;
            case 12:
                return new Creature(sprite, CreatureType.Bug, CreatureType.Flying, "Butterfree", level, 0, 0, xp, 40, 8);
                break;
            case 13:
                return new Creature(sprite, CreatureType.Bug, CreatureType.None, "Weedle", level, 7, 14, xp, 20, 3);
                break;
            case 14:
                return new Creature(sprite, CreatureType.Bug, CreatureType.None, "Kakuna", level, 10, 15, xp, 24, 4);
                break;
            case 15:
                return new Creature(sprite, CreatureType.Bug, CreatureType.None, "Beedrill", level, 0, 0, xp, 36, 9);
                break;
            case 16:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Flying, "Pidgey", level, 18, 17, xp, 20, 4);
                break;
            case 17:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Flying, "Pidgeotto", level, 36, 18, xp, 40, 8);
                break;
            case 18:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Flying, "Pidgeot", level, 0, 0, xp, 58, 13);
                break;
            case 19:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Rattata", level, 20, 20, xp, 18, 5);
                break;
            case 20:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Raticate", level, 0, 0, xp, 44, 12);
                break;
            case 21:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Flying, "Spearow", level, 20, 22, xp, 20, 5);

                break;
            case 22:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Flying, "Fearow", level, 0, 0, xp, 50, 11);

                break;
            case 23:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Ekans", level, 22, 24, xp, 25, 5);

                break;
            case 24:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Arbok", level, 0, 0, xp, 50, 12);

                break;
            case 25:
                return new Creature(sprite, CreatureType.Electric, CreatureType.None, "Pikachu", level, 20, 26, xp, 25, 5);

                break;
            case 26:
                return new Creature(sprite, CreatureType.Electric, CreatureType.None, "Raichu", level, 0, 0, xp, 48, 13.5);

                break;
            case 27:
                return new Creature(sprite, CreatureType.Ground, CreatureType.None, "Sandshrew", level, 22, 28, xp, 34, 8);

                break;
            case 28:
                return new Creature(sprite, CreatureType.Ground, CreatureType.None, "Sandslash", level, 0, 0, xp, 60, 13);

                break;
            case 29:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Nidoran (f)", level, 16, 30, xp, 24, 6);

                break;
            case 30:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Nidorina", level, 32, 31, xp, 40, 10);

                break;
            case 31:
                return new Creature(sprite, CreatureType.Poison, CreatureType.Ground, "Nidoqueen", level, 0, 0, xp, 64, 13);

                break;
            case 32:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Nidoran (m)", level, 16, 33, xp, 24, 6);

                break;
            case 33:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Nidorino", level, 32, 34, xp, 40, 10);

                break;
            case 34:
                return new Creature(sprite, CreatureType.Poison, CreatureType.Ground, "Nidoking", level, 0, 0, xp, 64, 13);

                break;
            case 35:
                return new Creature(sprite, CreatureType.Fairy, CreatureType.None, "Clefairy", level, 20, 36, xp, 25, 5);

                break;
            case 36:
                return new Creature(sprite, CreatureType.Fairy, CreatureType.None, "Clefable", level, 0, 0, xp, 58, 10);

                break;
            case 37:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Vulpix", level, 20, 38, xp, 22, 6);

                break;
            case 38:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Ninetales", level, 0, 0, xp, 66, 17);

                break;
            case 39:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Fairy, "Jigglypuff", level, 20, 40, xp, 30, 4);

                break;
            case 40:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Fairy, "Wigglytuff", level, 0, 0, xp, 52, 10);

                break;
            case 41:
                return new Creature(sprite, CreatureType.Poison, CreatureType.Flying, "Zubat", level, 22, 42, xp, 20, 5);

                break;
            case 42:
                return new Creature(sprite, CreatureType.Poison, CreatureType.Flying, "Golbat", level, 0, 0, xp, 52, 13);

                break;
            case 43:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Oddish", level, 21, 44, xp, 25, 5);

                break;
            case 44:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Gloom", level, 34, 45, xp, 42, 10);

                break;
            case 45:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Vileplume", level, 0, 0, xp, 55, 14);

                break;
            case 46:
                return new Creature(sprite, CreatureType.Bug, CreatureType.Grass, "Paras", level, 24, 47, xp, 20, 7);

                break;
            case 47:
                return new Creature(sprite, CreatureType.Bug, CreatureType.Grass, "Parasect", level, 0, 0, xp, 48, 9);

                break;
            case 48:
                return new Creature(sprite, CreatureType.Bug, CreatureType.Poison, "Venonat", level, 31, 49, xp, 26, 5.5);

                break;
            case 49:
                return new Creature(sprite, CreatureType.Bug, CreatureType.Poison, "Venomoth", level, 0, 0, xp, 50, 11);

                break;
            case 50:
                return new Creature(sprite, CreatureType.Ground, CreatureType.None, "Diglett", level, 26, 51, xp, 16, 6);

                break;
            case 51:
                return new Creature(sprite, CreatureType.Ground, CreatureType.None, "Dugtrio", level, 0, 0, xp, 44, 15.5);

                break;
            case 52:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Meowth", level, 28, 53, xp, 24, 6);

                break;
            case 53:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Persian", level, 0, 0, xp, 50, 11);

                break;
            case 54:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Psyduck", level, 33, 55, xp, 25, 5);

                break;
            case 55:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Golduck", level, 0, 0, xp, 60, 11.5);

                break;
            case 56:
                return new Creature(sprite, CreatureType.Fighting, CreatureType.None, "Mankey", level, 28, 57, xp, 25, 7);

                break;
            case 57:
                return new Creature(sprite, CreatureType.Fighting, CreatureType.None, "Primeape", level, 0, 0, xp, 54, 14);

                break;
            case 58:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Growlithe", level, 20, 59, xp, 34, 8);

                break;
            case 59:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Arcanine", level, 0, 0, xp, 75, 13.5);

                break;
            case 60:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Poliwag", level, 25, 61, xp, 28, 6);

                break;
            case 61:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Poliwhirl", level, 34, 62, xp, 42, 9);

                break;
            case 62:
                return new Creature(sprite, CreatureType.Water, CreatureType.Fighting, "Poliwrath", level, 0, 0, xp, 64, 13);

                break;
            case 63:
                return new Creature(sprite, CreatureType.Psychic, CreatureType.None, "Abra", level, 16, 64, xp, 25, 7);

                break;
            case 64:
                return new Creature(sprite, CreatureType.Psychic, CreatureType.None, "Kadabra", level, 32, 65, xp, 40, 12);

                break;
            case 65:
                return new Creature(sprite, CreatureType.Psychic, CreatureType.None, "Alakazam", level, 0, 0, xp, 65, 16);

                break;
            case 66:
                return new Creature(sprite, CreatureType.Fighting, CreatureType.None, "Machop", level, 28, 67, xp, 26, 7);

                break;
            case 67:
                return new Creature(sprite, CreatureType.Fighting, CreatureType.None, "Machoke", level, 38, 68, xp, 44, 10);

                break;
            case 68:
                return new Creature(sprite, CreatureType.Fighting, CreatureType.None, "Machamp", level, 0, 0, xp, 64, 14);

                break;
            case 69:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Bellsprout", level, 21, 70, xp, 28, 6);

                break;
            case 70:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Weepinbell", level, 34, 71, xp, 46, 9.5);

                break;
            case 71:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Poison, "Victreebel", level, 0, 0, xp, 60, 13);

                break;
            case 72:
                return new Creature(sprite, CreatureType.Water, CreatureType.Poison, "Tentacool", level, 30, 73, xp, 38, 8);

                break;
            case 73:
                return new Creature(sprite, CreatureType.Water, CreatureType.Poison, "Tentacruel", level, 0, 0, xp, 70, 12);

                break;
            case 74:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Ground, "Geodude", level, 25, 75, xp, 28, 6);

                break;
            case 75:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Ground, "Graveler", level, 35, 76, xp, 44, 10);

                break;
            case 76:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Ground, "Golem", level, 0, 0, xp, 65, 18);

                break;
            case 77:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Ponyta", level, 40, 78, xp, 42, 10);

                break;
            case 78:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Rapidash", level, 0, 0, xp, 62, 19);

                break;
            case 79:
                return new Creature(sprite, CreatureType.Water, CreatureType.Psychic, "Slowpoke", level, 37, 80, xp, 34, 6);

                break;
            case 80:
                return new Creature(sprite, CreatureType.Water, CreatureType.Psychic, "Slowbro", level, 0, 0, xp, 58, 10);

                break;
            case 81:
                return new Creature(sprite, CreatureType.Electric, CreatureType.Steel, "Magnemite", level, 30, 82, xp, 28, 6);

                break;
            case 82:
                return new Creature(sprite, CreatureType.Electric, CreatureType.Steel, "Magneton", level, 0, 0, xp, 55, 12);

                break;
            case 83:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Flying, "Farfetchd", level, 0, 0, xp, 37, 9);

                break;
            case 84:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Flying, "Doduo", level, 31, 85, xp, 32, 8);

                break;
            case 85:
                return new Creature(sprite, CreatureType.Normal, CreatureType.Flying, "Dodrio", level, 0, 0, xp, 58, 13);

                break;
            case 86:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Seel", level, 34, 87, xp, 35, 7);

                break;
            case 87:
                return new Creature(sprite, CreatureType.Water, CreatureType.Ice, "Dewgong", level, 0, 0, xp, 60, 13);

                break;
            case 88:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Grimer", level, 38, 89, xp, 34, 7);

                break;
            case 89:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Muk", level, 0, 0, xp, 60, 12.5);

                break;
            case 90:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Shelder", level, 26, 91, xp, 36, 7);

                break;
            case 91:
                return new Creature(sprite, CreatureType.Water, CreatureType.Ice, "Cloyster", level, 0, 0, xp, 70, 12);

                break;
            case 92:
                return new Creature(sprite, CreatureType.Ghost, CreatureType.Poison, "Gastly", level, 25, 93, xp, 33, 8);

                break;
            case 93:
                return new Creature(sprite, CreatureType.Ghost, CreatureType.Poison, "Haunter", level, 35, 94, xp, 48, 13);

                break;
            case 94:
                return new Creature(sprite, CreatureType.Ghost, CreatureType.Poison, "Gengar", level, 0, 0, xp, 68, 19);

                break;
            case 95:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Ground, "Onix", level, 0, 0, xp, 44, 10);

                break;
            case 96:
                return new Creature(sprite, CreatureType.Psychic, CreatureType.None, "Drowsee", level, 26, 97, xp, 38, 8);

                break;
            case 97:
                return new Creature(sprite, CreatureType.Psychic, CreatureType.None, "Hypno", level, 0, 0, xp, 60, 13.5);

                break;
            case 98:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Krabby", level, 28, 99, xp, 40, 8);

                break;
            case 99:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Kingler", level, 0, 0, xp, 75, 16);

                break;
            case 100:
                return new Creature(sprite, CreatureType.Electric, CreatureType.None, "Voltorb", level, 30, 101, xp, 33, 8);

                break;
            case 101:
                return new Creature(sprite, CreatureType.Electric, CreatureType.None, "Electrode", level, 0, 0, xp, 55, 15);

                break;
            case 102:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Psychic, "Exeggcute", level, 30, 103, xp, 36, 7);

                break;
            case 103:
                return new Creature(sprite, CreatureType.Grass, CreatureType.Psychic, "Exeggutor", level, 0, 0, xp, 75, 13);

                break;
            case 104:
                return new Creature(sprite, CreatureType.Ground, CreatureType.None, "Cubone", level, 28, 105, xp, 30, 7);

                break;
            case 105:
                return new Creature(sprite, CreatureType.Ground, CreatureType.None, "Marowak", level, 0, 0, xp, 42, 12);

                break;
            case 106:
                return new Creature(sprite, CreatureType.Fighting, CreatureType.None, "Hitmonlee", level, 0, 0, xp, 41, 13);

                break;
            case 107:
                return new Creature(sprite, CreatureType.Fighting, CreatureType.None, "Hitmonchan", level, 0, 0, xp, 38, 13.5);

                break;
            case 108:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Lickitung", level, 0, 0, xp, 42, 11);

                break;
            case 109:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Koffing", level, 35, 110, xp, 36, 9);

                break;
            case 110:
                return new Creature(sprite, CreatureType.Poison, CreatureType.None, "Weezing", level, 0, 0, xp, 64, 18);

                break;
            case 111:
                return new Creature(sprite, CreatureType.Ground, CreatureType.Rock, "Rhyhorn", level, 42, 112, xp, 40, 11);

                break;
            case 112:
                return new Creature(sprite, CreatureType.Ground, CreatureType.Rock, "Rhydon", level, 0, 0, xp, 70, 13);

                break;
            case 113:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Chansey", level, 0, 0, xp, 76, 10);

                break;
            case 114:
                return new Creature(sprite, CreatureType.Grass, CreatureType.None, "Tangela", level, 0, 0, xp, 55, 12);

                break;
            case 115:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Kangaskhan", level, 0, 0, xp, 70, 12.5);

                break;
            case 116:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Horsea", level, 32, 117, xp, 30, 7);

                break;
            case 117:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Seadra", level, 0, 0, xp, 57, 13);

                break;
            case 118:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Goldeen", level, 33, 119, xp, 38, 8);

                break;
            case 119:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Seaking", level, 0, 0, xp, 52, 13);

                break;
            case 120:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Staryu", level, 30, 121, xp, 37, 9);

                break;
            case 121:
                return new Creature(sprite, CreatureType.Water, CreatureType.Psychic, "Starmie", level, 0, 0, xp, 65, 14);

                break;
            case 122:
                return new Creature(sprite, CreatureType.Psychic, CreatureType.Fairy, "Mr. Mime", level, 0, 0, xp, 40, 12);

                break;
            case 123:
                return new Creature(sprite, CreatureType.Bug, CreatureType.Flying, "Scyther", level, 0, 0, xp, 62, 16.5);

                break;
            case 124:
                return new Creature(sprite, CreatureType.Ice, CreatureType.Psychic, "Jynx", level, 0, 0, xp, 44, 11);

                break;
            case 125:
                return new Creature(sprite, CreatureType.Electric, CreatureType.None, "Electabuzz", level, 0, 0, xp, 55, 13);

                break;
            case 126:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Magmar", level, 0, 0, xp, 55, 13);

                break;
            case 127:
                return new Creature(sprite, CreatureType.Bug, CreatureType.None, "Pinsir", level, 0, 0, xp, 52, 14);

                break;
            case 128:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Tauros", level, 0, 0, xp, 60, 15.5);

                break;
            case 129:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Magikarp", level, 20, 130, xp, 18, 5);

                break;
            case 130:
                return new Creature(sprite, CreatureType.Water, CreatureType.Flying, "Gyarados", level, 0, 0, xp, 68, 14);

                break;
            case 131:
                return new Creature(sprite, CreatureType.Water, CreatureType.Ice, "Lapras", level, 0, 0, xp, 63, 13.5);

                break;
            case 132:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Ditto", level, 0, 0, xp, 22, 5);

                break;
            case 133:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Eevee", level, 10, 134, xp, 24, 5);

                break;
            case 134:
                return new Creature(sprite, CreatureType.Water, CreatureType.None, "Vaporeon", level, 20, 135, xp, 44, 10);

                break;
            case 135:
                return new Creature(sprite, CreatureType.Electric, CreatureType.None, "Jolteon", level, 30, 136, xp, 52, 13);

                break;
            case 136:
                return new Creature(sprite, CreatureType.Fire, CreatureType.None, "Flareon", level, 0, 0, xp, 65, 17);

                break;
            case 137:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Porygon", level, 0, 0, xp, 42, 11);

                break;
            case 138:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Water, "Omanyte", level, 40, 139, xp, 42, 8);

                break;
            case 139:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Water, "Omastar", level, 0, 0, xp, 75, 16.5);

                break;
            case 140:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Water, "Kabuto", level, 40, 141, xp, 36, 10);

                break;
            case 141:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Water, "Kabutops", level, 0, 0, xp, 72, 17);

                break;
            case 142:
                return new Creature(sprite, CreatureType.Rock, CreatureType.Flying, "Aerodactyl", level, 0, 0, xp, 75, 17.5);

                break;
            case 143:
                return new Creature(sprite, CreatureType.Normal, CreatureType.None, "Snorlax", level, 0, 0, xp, 80, 15);

                break;
            case 144:
                return new Creature(sprite, CreatureType.Ice, CreatureType.Flying, "Articuno", level, 0, 0, xp, 100, 22);

                break;
            case 145:
                return new Creature(sprite, CreatureType.Electric, CreatureType.Flying, "Zapdos", level, 0, 0, xp, 100, 22);

                break;
            case 146:
                return new Creature(sprite, CreatureType.Fire, CreatureType.Flying, "Moltres", level, 0, 0, xp, 100, 22);

                break;
            case 147:
                return new Creature(sprite, CreatureType.Dragon, CreatureType.None, "Dratini", level, 30, 148, xp, 25, 7);

                break;
            case 148:
                return new Creature(sprite, CreatureType.Dragon, CreatureType.None, "Dragonair", level, 55, 149, xp, 50, 14);

                break;
            case 149:
                return new Creature(sprite, CreatureType.Dragon, CreatureType.Flying, "Dragonite", level, 0, 0, xp, 105, 23);

                break;
            case 150:
                return new Creature(sprite, CreatureType.Psychic, CreatureType.None, "Mewtwo", level, 0, 0, xp, 120, 25);

                break;
            case 151:
                return new Creature(sprite, CreatureType.Psychic, CreatureType.None, "Mew", level, 0, 0, xp, 120, 25);

                break;
            default:
                return null;
                break;
        }
    }




    //% blockId=makeCreatureFromSprite 
    //% block="make creature from $sprite=variables_get of type %creatureType1 %creatureType2 with name $name || with\n xp $xp hp $hp attackValue $attackValue"
    //% expandableArgumentMode=toggle
    //% blockSetVariable=myCreature
    //% group="Create"
    //% weight=100
    export function makeCreatureFromSprite(sprite: Sprite, creatureType1: CreatureType, creatureType2: CreatureType, name: string, xp: number = 0, hp: number = 20, attackValue: number = 5, xpReward: number = 10): Creature {
        return new Creature(sprite, creatureType1, creatureType2, name);
    }

    //% group="Value"
    //% blockId="creatures_getCreatureType"
    //% expandableArgumentMode=toggle
    //% block="$creature=variables_get(myCreature) CreatureType1" callInDebugger
    export function getCreatureType1(creature: Creature): CreatureType {
        return creature.creatureType1;
    }


    //% group="Value"
    //% blockId="creatures_setCreatureType"
    //% expandableArgumentMode=toggle
    //% block="set $creature=variables_get(myCreature) CreatureType1 to %creatureType1" callInDebugger
    export function setCreatureType1(creature: Creature, creatureType1: CreatureType) {
        creature.creatureType1 = creatureType1;
    }

    //% group="Value"
    //% blockId="creatures_getCreatureTypeTwo"
    //% expandableArgumentMode=toggle
    //% block="$creature=variables_get(myCreature) CreatureType2" callInDebugger
    export function getCreatureType2(creature: Creature): CreatureType {
        return creature.creatureType2;
    }


    //% group="Value"
    //% blockId="creatures_setCreatureTypeTwo"
    //% expandableArgumentMode=toggle
    //% block="set $creature=variables_get(myCreature) CreatureType2 to %creatureType2" callInDebugger
    export function setCreatureType2(creature: Creature, creatureType2: CreatureType) {
        creature.creatureType2 = creatureType2;
    }


    //% group="Value"
    //% blockId="creatures_getSprite"
    //% expandableArgumentMode=toggle
    //% block="$creature=variables_get(myCreature) Sprite" callInDebugger
    export function getCreatureSprite(creature: Creature): Sprite {
        return creature.sprite;
    }

    //% group="Value"
    //% blockId="creatures_setSprite"
    //% expandableArgumentMode=toggle
    //% block="set $creature=variables_get(myCreature) Sprite to $sprite=variables_get(mySprite)" callInDebugger
    export function setCreatureSprite(creature: Creature, sprite: Sprite) {
        creature.sprite = sprite;
    }



    export function creatureBattleCreature(creature1: Creature, creature2: Creature): boolean {
        let turn: number = 0;

        creature1.sprite.setPosition(45, 52)
        creature2.sprite.setPosition(115, 52)
        creature1.setSayHP(true);
        creature2.setSayHP(true);
        creature1.sprite.setFlag(SpriteFlag.Invisible, false);
        creature2.sprite.setFlag(SpriteFlag.Invisible, false);
        creature1.healthbar.attachToSprite(null);
        creature2.healthbar.attachToSprite(null);
        creature1.healthbar.setPosition(40, 25)
        creature2.healthbar.setPosition(120, 25)
        creature1.healthbar.setFlag(SpriteFlag.Invisible, false);
        creature2.healthbar.setFlag(SpriteFlag.Invisible, false);
        creature1.healthbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true);
        creature2.healthbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true);

        //game.splash(creature1.level.toString())
        let creature1LevelTextSprite = textsprite.create("Lvl. " + creature1.level.toString(), 1, 15)
        let creature2LevelTextSprite = textsprite.create("Lvl. " + creature2.level.toString(), 1, 15)
        creature1LevelTextSprite.setPosition(30, 18);
        creature2LevelTextSprite.setPosition(130, 18);

        let creature1HealthTextSprite = textsprite.create(Math.round(creature1.hp).toString(), 1, 15)
        let creature2HealthTextSprite = textsprite.create(Math.round(creature2.hp).toString(), 1, 15)
        creature1HealthTextSprite.setPosition(20, 25);
        creature2HealthTextSprite.setPosition(140, 25);

        //picture.fillRect(0, 0, 0, 0, 0)
        while (creature1.hp > 0 && creature2.hp > 0) {
            pause(200)
            if (turn == 0) {
                let attackType: CreatureType = null;
                story.printDialog("Pick a move.", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast)
                const move1Type = getMoveFromType(getCreatureType1(creature1));
                const move2Type = getMoveFromType(getCreatureType2(creature1));
                //game.splash(getCreatureType1(creature1));
                //game.splash(getCreatureType2(creature1));
                story.showPlayerChoices(move1Type, move2Type);

                pauseUntil(() => !story.isMenuOpen());
                attackType = getTypeFromMove(story.getLastAnswer());

                animation.runMovementAnimation(creature1.sprite, animation.animationPresets(animation.easeRight), 5000, false)
                pause(500)
                animation.stopAnimation(animation.AnimationTypes.All, creature1.sprite)
                //animation.runMovementAnimation(creature1.sprite, animation.animationPresets(animation.bobbing), 5000, true)
                animation.runMovementAnimation(creature1.sprite, animation.animationPresets(animation.easeLeft), 2000, false)
                pause(200)
                animation.stopAnimation(animation.AnimationTypes.All, creature1.sprite)
                let mult = calculateAttackMult(attackType, [creature2.creatureType1, creature2.creatureType2]);

                if (Math.percentChance(6.25)) {
                    creature2.hp -= Math.round(creature1.attackValue * mult * 1.5);
                    pause(50)
                    game.showLongText("Critical Hit", DialogLayout.Bottom)
                    creature2HealthTextSprite.setText(Math.round(creature2.hp).toString());
                } else {
                    creature2.hp -= Math.round(creature1.attackValue * mult);
                    creature2HealthTextSprite.setText(Math.round(creature2.hp).toString());
                }
                if (mult > 1) {
                    game.showLongText("Super Effective", DialogLayout.Bottom);
                } else if (mult == 0) {
                    game.showLongText("Does not effect " + creature2.name, DialogLayout.Bottom);
                } else if (mult < 1) {
                    game.showLongText("Not very Effective", DialogLayout.Bottom);
                }
                turn = 1;
            } else {
                const move1Type = getMoveFromType(getCreatureType1(creature2));
                const move2Type = getMoveFromType(getCreatureType2(creature2));
                let enemyMove = "";
                if (Math.percentChance(50)) {
                    enemyMove = move1Type;
                } else {
                    enemyMove = move2Type;
                }
                game.showLongText("Enemy " + creature2.name + " used " + enemyMove, DialogLayout.Bottom);
                animation.runMovementAnimation(creature2.sprite, animation.animationPresets(animation.easeLeft), 5000, false)
                pause(500)
                animation.stopAnimation(animation.AnimationTypes.All, creature2.sprite)
                //animation.runMovementAnimation(creature2.sprite, animation.animationPresets(animation.bobbing), 5000, true)
                animation.runMovementAnimation(creature2.sprite, animation.animationPresets(animation.easeRight), 2000, false)
                pause(200)
                animation.stopAnimation(animation.AnimationTypes.All, creature2.sprite)
                let mult = calculateAttackMult(getTypeFromMove(enemyMove), [creature1.creatureType1, creature1.creatureType2]);
                if (mult > 1) {
                    game.showLongText("Super Effective", DialogLayout.Bottom);
                } else if (mult == 0) {
                    game.showLongText("Does not effect " + creature1.name, DialogLayout.Bottom);
                } else if (mult <1){
                    game.showLongText("Not very Effective", DialogLayout.Bottom);
                }
                if (Math.percentChance(6.25)) {
                    creature1.hp -= Math.round(creature2.attackValue * mult * 1.5);
                    pause(50)
                    game.showLongText("Critical Hit", DialogLayout.Bottom)
                    creature1HealthTextSprite.setText(Math.round(creature1.hp).toString());
                } else {
                    creature1.hp -= Math.round(creature2.attackValue * mult);
                    creature1HealthTextSprite.setText(Math.round(creature1.hp).toString());
                }
                turn = 0;
            }
        }

        if (creature1.hp > 0) {
            //game.showLongText(creature1.name + " knocked out " + creature2.name + " and earned " + creature2.xpReward + " xp.", DialogLayout.Bottom)
            creature1.xp += creature2.xpReward;
        } else {
            //game.showLongText(creature2.name + " knocked out " + creature1.name + " and earned " + creature2.xpReward + " xp.", DialogLayout.Bottom)
            creature2.xp += creature1.xpReward;
        }
        pause(1000)

        creature1LevelTextSprite.setText("")
        creature2LevelTextSprite.setText("")
        creature1HealthTextSprite.setText("")
        creature2HealthTextSprite.setText("")
        
        creature1.sprite.setPosition(0, 0)
        creature2.sprite.setPosition(0, 0)
        creature1.setSayHP(false);
        creature2.setSayHP(false);
        creature1.sprite.setFlag(SpriteFlag.Invisible, true);
        creature2.sprite.setFlag(SpriteFlag.Invisible, true);
        creature1.healthbar.setFlag(SpriteFlag.Invisible, true);
        creature2.healthbar.setFlag(SpriteFlag.Invisible, true);

        pause(100)
        creature1LevelTextSprite.destroy();
        creature2LevelTextSprite.destroy();
        creature1HealthTextSprite.destroy();
        creature2HealthTextSprite.destroy();
        if (creature1.hp > 0) {
            return true;
        } else {
            return false;
        }

    }


    //% blockId=creatures_trainerBattleTrainer
    //%block="make $player=variables_get(myTrainer) battle $opponent=variables_get(opponent)"
    //% expandableArgumentMode=toggle
    //% group="Battle"
    //% weight=80
    export function trainerBattleTrainer(player: Trainer, opponent: Trainer) : boolean {
        let battleResult = false;
        let playerCurrentCreature = player.partyPokemon[0];
        let opponentCurrentCreature = opponent.partyPokemon[0];
        let playerCurrentIndex = 0;
        let opponentCurrentIndex = 0;

        let playerRemainingPokemon = player.partyPokemon.length;
        for (let creature of player.partyPokemon) {
            if (creature.hp <= 0) {
                playerRemainingPokemon--;
            }
        }
        let opponentRemainingPokemon = opponent.partyPokemon.length;

        let map: tiles.TileMapData = game.currentScene().tileMap.data;
        tiles.setCurrentTilemap(tilemap` `)
        scene.setBackgroundImage(img`
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777ceeebec7777cecccebbbbbbbe77777cee77b77b7cebbbebeeec777cee77777777cbbbeebebe
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777ceebbbeb7777cecceebebbbbbe777777bebcee7b77ebbbebeeeec77cee77777777beebeebbbe
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777cebbbbeb7777ebcceebebbbbbe7777777ee7ee777bebbbebeeeec7ceee77777777bebbeebbbe
            777777777777777777c77777777777777777777777777777777777777777777777777777777777777777eebbbe777777ebeeeebebbbbbb77777777ebee77777bbbbeebeee7eeec777777777ceeeebbbe
            777777777777777777c77777777777777777777777777777777777777777777777777777777777777777eebbbe777777ebeeeebebbbbb7777777777ebbe7777bbbbebbeeeebee77777777777eeeebbee
            777777777777777777c777777cc777777777777777777777777777777777777777777777777777777777eebbbe777777eebbeebebbbbb77777777b77eebbbb7ebbbebbeeebbee77777777777ebeebbee
            77777777777777777cc7777ccc777777777777777777777777777777777777777777777777c777777777eebbbe7777777ebbeebebbbbe7777777777777ebb77ebbbebbbeeebe7777777777777beebbee
            777777777777cc77cccc77cccc7777777b77777777777777777777777777777777777c7777c77777777cebbbbe7777777eebeebbbbbbe7777777777777ebbe7ebbbbbbbbeeec7777777777777bbebbbe
            777777777777cc77cccc77ccc777c77777cc77777777c77777777777777777777777cc777cc7777777bcebebbb7777777eeeeeebbbbbeb777777777777bebbeeebbbbbebeee77777777777777ebebbbe
            7777777cc777cc77cccc7cccc77cc7777cc777777777c77c77777b77777777777c77cc7777c7777777beebbbe77777777ceeeeebbbbbe777777777777777ebbbebbbbbeeeeec777777777c77cceebbbe
            777c7777c7777cc7cccccccccb7cc7c77cc77777777cc7cc77777777777777777c77cc77cc777c77777eebebe77b77777ceeeeebbbbe7777777777777777bbbbbbbbbbebeeec7777777777c7ccbebbbb
            7777cc77cc7777c7ccccccccc7ccc7c7ccc77777c77cc7cc7c77c777c77777777cc7ccc7ccc77cc7c7cebeebe77b77b77ceeeeebbbbe7777777777777777cbebbeebbbebeeee777b7c77c7ccc7debbbb
            7c77ccc7ccc77ccccccccccccccc7cc7cc77cc77c7cccccccc7cc777c77cc7777cccccccccccccccccceeeeec77777b77ceeeebbbbbeb777777777777777777beeebbbebbeeecc7b7ccbcccccbbebbbb
            77c7ccc7ccc77cccccccccccccccccccccc7cc7cccccccccccccc777c7cc77cc7cccccc7ccccccccccceeeee77cb77777eeeeebbbbbe777777777777777777bbeeebbbebbeeec7c77c77cccccbbebebb
            7cc7ccc7ccc7ccccccccccccccccccccccc7cc7cccccc77ccccccc7cccccc7cccccccccccccccccccceeeeee77cb77777eeeeebbbbb777777777777777777777bebbbbebbeeeebccbcccccc77b7eebbb
            cccccc7cccc7cccccccccccccccccccccc77cc7cccccccccc77ccc7cccccc7cccccccccc77777ccccc77ccee7c777777ceeeeebbbbb777777777777777777777bebbbbbbbeeeeccc7ccccccc777ebbbb
            ccccccccccccccccccccccccccccccccccccccccccccc7ccccccccccccccccccccccccc7bdb7b7bbe77777cccc777777ceeeeebbbbbb777777777777777777777ebbbbbbebeeeccc7ccccb77777ebbbb
            ccccc7777cccccccccccccccccccccccccc7cc777ccc77cccccccccccc777ccccccccccdbbbbbbbbb7bb7777cc77c7ccceeeeebbbbbb7777777777777777777777bbbbbbeeeeeecccccbdb77777ebbbb
            77c777777cccccccccccccccccccccccc7c7c7777ccccc77cccccc777777777777cccc7bbdbbdddbbbbdb777ccc7c7cceeeeeebbbbe7c77777777777777777777bbbbbebeeeeeecccccddb77777ebbbe
            7777777777ccccccccc7cc7c7cccccc7cc7c77ccc7cc77777777c777777777777bccb7c7dbdbdbddbb7bdb77ccccccceeeceeebebbccc777777777777c77777ccbbbbbb7ccceeecccccbdbb7777ebbbe
            7777777777777ccccccccccccccccc77ccccccccccc77777777777777777777777bddb77bbdbbbbb77bbbdb77cccccccccceec7ebbccc777c77777777cc7777cc7bbbec7bbbceecccc7bbbb7777ebbee
            777777777777777cccccccccccc7cc777ccccccccc77777777777777777777777ddddd7bbdbbbbb777dbbdb777c7ccc77ceeccccbbccccc7c77777777cc7777ccccbbc777bbbeccccc777b77777ebbee
            777777777777777c7ccbccccc777c777cccc7ccc7777777777777777777777777bdddddbbddbbbbbbbdbbb7777777c777ccc77cbbccc7c7777777c7777ccccc7cccbc7777bbddccccc777b77777ebbeb
            777777777777777ccc77cccc777cc777ccc77cc77777777777777777777777db77dddbdbbbbb77bdbbb77777777776777cc777cccc77cc7cc777ccc777ccccccccccc777bbb777c7777bbbb7777ebbeb
            777777777777777ccc777cc7777c7777c777ccc77777777777777777777777ddb7bdb7bddbb777bdbb77777777777c777777cccc777ccc7cc7c777c77ccccccc7bddb777bb77777bb7bdbbb7777ebbeb
            7777777777777777c777cc77777c77777777cc77777777777777777777777bddbdddb7bdddbb7bbbbb77777777c77c7c77777cc7777ccccccc7c77777ccc7ccc77dbd777bb7777db77bbbb77777ebbeb
            77777777777777777777ccc7777c777777777777777777777777777777777dddddddddddddbb7bbbbb77777777cc777777c7cc7777cccccccccc777c77ccc7c777b7777777777777777b7777777ebbbb
            777777777777777777777777777777c77777c7777777777777777777777cbdddddbbddddddbb77777777777777cc77777cc777777ccccccccc7ccccc7cccc77c777777777777777777777777777ebebb
            777777777777777777c77777777777c7777c77777777777777777777777cdbdbddddddddddb777777777777777c777c77d7c777777ccccccccc7cccc7cccc77777777c777777777777777777777eebbb
            777777777777777777777777777777777ccc7777777777777777777777777bb7bddbbbddddb777777777777777cc777bbdb7777777c7ccccccccccccccccc777777777777777777777777777777ebbbb
            77777777777777777c7777cc777c77777ccc777777777777777777777bbbbb77bbbb77bddb777777777777777777777bbddbb7777777ccc77ccc7cccccccc777777777777777777777777777777eeebb
            77777777777777777cccc777777cc7c77ccc777777777777777777777dddddb777777777b777777777777777bbb7777777bbbbc77777cc77cc77ccccccccc777b77777b77777777777777777777eebbb
            7777777777777777777777777777c77c7c7777777777777777777777bddbbdb777777777777777777777777bb777777777bb777777777cc76777ccccccccc77777777777c77777777c77777777cebbeb
            77777777777777777777777777777777c7777777777777777777777bddd7bbb7777777777777777777777777b77777777777777777777cccc777cccccc7cc777777c7777777777777c777777777ebbeb
            7777777777777777777777cc77777777777777777777777777777c7bbbb7777777777777777777777777777777777777777777777c777777777cc7ccc777c777777cc7777c7777777c777777777ebeeb
            777777777777777777c7777777777777777777777777777777777c777b777777777777777777777bb77777777777777777777777777777777777777cc777c7777777c7777c7777777c77c777777ebeeb
            77777777777777777777777c77777777777777777777777777777777777777777777777bbb77777777777777777777777777777bb777cc7777777777c7777c777777c777767777777c777777777ebeee
            777777777777777777c7777c77c7c777777777777777777777777c777777777777777bddb777777777777777777777777777777b77777c77777777ccc777bc77777777777777777c7c777777777ebeee
            c77777777777777777c77c7c777cc777777777777777777bb777777777777777777bbddddb77777777777777777777777777777777777cc777777777c77777777777777767777c77cc7777777ccebebe
            cc7777777777777777c777cc777cc7777c77777777cbbdbddbb7cc777777777777777dbbdb7777777777777777777777777777777777777777777777777777777777777ccc777777cc77777777cebebe
            c7c7777777777777777cb7cc7777c7777c777777777ddbddddbb77777777777777777b77b77777777777777777777777777777777777777777777c777c7777777777777777c77777cc7777c7c7cebbbe
            77c7c77777777777777c777c7777c7777777777777ddddddddb77c777777777777777777777777777777777777777777777777777777777c777777c77777777777777777c777c7777c7777c7c7cebbbe
            7777c77777777777777c777777777777777c777c7bbbdddbbbb777777777777777777777777777777777c77777777777777777777777777cc777cccc7777777777777777c77cc77c777777c777cebbbe
            777cc77777777777777c77777ccc777777777777bdbdbb77bdb777777777777777cc7777777777777777777777777777777777777c777777777c7ccc77c77777777777777c77c7c7c777777c77cbbbbe
            7777777777777777c777777777d7777777cc777bdbd777777bb77777777777777777777777777777777777777777c7777777777777c7c7c777777c7c7c77c777c777777c77c77c77cc7cc77c77cbbbee
            7777777777777777c7777777bdb77bbddd77c77bbbb7777777777777777777c77cc7777777777777777c77777777c777777c7ccc7777c7777cc777cc7c777cc7c77c7ccc77c77777c77c77777cebbbee
            777c77777777777cc7777777b77777b77b77777bb7b7777777777777777777777777777c777777777777c7777777c7c7777777777777777777777777777777777777777c777c777777777c777cbbbbee
            777777cc77777777c777bbb777777777777777777777777777777777777777777c77777cc77777777c7777777777777777777777777777777777777777777777777777777777777777cc7c777cbbbbee
            7777777c7777c77c77cdb777777777777b77777777777777777777c7777c7777c77c77cc7777c7c777777777777777777777777777777777777777777777777777777777777777777777bc7ccebbbbee
            7777777c7ccc777c77cbb777777777777c77777777777777777777c777c77777c7c777ccc7777cc7777777777777777777777777777777777777777777777777777777777777777777777cc7cebbbeee
            77c777777ccc77cc7777777777777777777777c777777777777777c777c77777c77777ccc77777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeee
            777777777cc777c7c7777777777777777777c77777777777777c77cc77cc777c77777cc7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbebe
            77777777777777cc777777777777777c7c77c777c7777777777c77777cc777cc77777cc7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbebb
            7777777777777c7777777777777777777c7777777777777777c777777777777c7777c777777777777777777777777777777777777777777777777777777777777777777777777777777777777eebbbbb
            777777777777777777777777777777c77c7777777777c77777c77777777777777777ccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            777777777777777777777777777777777cc77777c7777777c7c77c7777777777777cc7cc777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            77777777777777777777777777777777777777777cc7777777767c7cc7777777777cccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            77777777777777777777777777777777c777777777c777777776cc777777777777ccc77c777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            777777777777777777777777777777777777777777777777777cc7777777777777ccc77c777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            777777777777777777777777777777777777777777777777777c7777777777777c7777c7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbe
            77777777777777777777777777777777777777777777777777cc7777777c777777777cc777777777777777777777777777777777777777777777777777777777777777777777777777777777eebeebbe
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbebbee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeebee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbebee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebe
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeeee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeeee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777eebeeeeb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeeeb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeeeb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeebb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebe
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeebe
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bebbbebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbbbe
            77777777777777777777777777777777777777777777777777777777777777b7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebbe
            77777777777777777777777777777777777777777777777777777777777777b7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bbbbeeebe
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbeeee
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbeeee
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cbebbbeeee
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cbeebbeeee
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cbebeee777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ceeeec7777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cc777ee77777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c7777777c7777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777779977777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cccc77777777777777777
            77777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777c77777c7777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c7777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c777777777777777777777777
            7777777777777777777777777777777777777777777777ccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c77777777777777777777777
            777cccc77777777777777777777777777777777777777c7777c7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cc7777
            7cccc7777777777777777b7777777777777777777777c7bb777777777777777777777777777777777777777777777777777777777777777777777777777c777777777777777777777777777777777777
            c77c77777777777777777777777777777777777777cbb7bddb777bb77777777777777777777777777777777777777777777777777777777777777777777777c777777c77777777777777777777777777
            777c777777777777777777777777777777777cccc7cbdbbddb7777b7777c7777777777777777777777777777777777777777777777777777777777777777777c77ccc7c7777777777777777777777777
            77c7777777777777777777777777777777777bd7777bb77b77777777777777777777777777777777ccc77777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777cccc777777777777777777777777bdddbb777777777777777777767777777777777777777777777777777777777777777777777cc77c77c777777777777777777777777777777777777777777
            7c77cc77777777777777777777777777c7cdddddb7777777777777777777c76cc7777777777777777c77c77c777777777777777777777777777cc7777777777777777777777777777777777777777777
            7ccc77777777777777776777777777b7777b777b777777777777777777777777777777777777c777777776ccc77777777777777777777777777777777777777777777777777777777777777777777777
            777777777ccccc777777777777777dd77777bbb77777b7777777777777777777777cc7777777c7c777c777c77c7cc7777777777777777777777777777777777777777777777777777777777777777777
            c7cc7777ccc77677c7c777c7ccc777777777bbb7777777777777777777777777777777777777c77c77c777c77c7ccc777767777777777777777777777777777777777777777777777777777777777777
            77ccc77cbb7dbcceecbbbb6bbbbbbbb777d9b77db7e7c77bbbb7b777e7bc7777777777777777777777e777bbb777b7bbbb77bb77777b77777777777777777b77b777777777e77777b7bb7777777e7777
            777777cb999999999bcc999999999bbeee99bececbbcebeb9999ccceb99bc7777777777777eeeeeebbbebbbbbbebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbebebbeeeeebbbbbbeebbbbbbbbeebbe
        `)
        scene.centerCameraAt(80, 60);
        scene.backgroundImage().fillRect(5, 8, 150, 100, 1)
        scene.backgroundImage().drawRect(5, 8, 150, 100, 15)
        let enemySprite = sprites.create(opponent.sprite.image,SpriteKind.Enemy);
        enemySprite.setPosition(80,45);
        enemySprite.z=100;
        enemySprite.setFlag(SpriteFlag.Invisible, false);
        game.setDialogFrame(img`
            ..99999999999999999999..
            .9966666666666666666699.
            996661111111111111166699
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            996661111111111111166699
            .9966666666666666666699.
            ..99999999999999999999..
        `)
        game.showLongText("You challenged " + opponent.name + " to a battle.", DialogLayout.Bottom)

        
        game.showLongText("You sent out " + playerCurrentCreature.name + " to battle!", DialogLayout.Bottom)
        game.showLongText("They sent out " + opponentCurrentCreature.name + " to battle!", DialogLayout.Bottom)
        enemySprite.setFlag(SpriteFlag.Invisible, true);
        enemySprite.destroy();

        while (playerRemainingPokemon > 0 && opponentRemainingPokemon > 0) {
            let win = creatureBattleCreature(playerCurrentCreature, opponentCurrentCreature)
            if (win) {
                game.showLongText("You knocked out " + opponentCurrentCreature.name + " and earned " + opponentCurrentCreature.xpReward + " xp.", DialogLayout.Bottom)
                opponentRemainingPokemon--;
                if (opponentRemainingPokemon > 0) {
                    opponentCurrentIndex++;
                    opponentCurrentCreature = opponent.partyPokemon[opponentCurrentIndex];
                    game.showLongText(opponent.name + " sent out " + opponentCurrentCreature.name, DialogLayout.Bottom);
                } else {
                    game.showLongText("You won the battle and defeated " + opponent.name +"!", DialogLayout.Bottom);
                    battleResult = true;
                }
            } else {
                game.showLongText("They knocked out " + playerCurrentCreature.name, DialogLayout.Bottom)
                playerRemainingPokemon--;
                if (playerRemainingPokemon > 0) {

                    let choices = [];
                    for (let creature of player.partyPokemon) {
                        if (creature.hp > 0) {
                            choices.push(creature.name);
                        }
                    }
                    switch (choices.length) {
                        case 0:
                            //you lose 
                            break;
                        case 1:
                            game.showLongText("You only have " + choices[0] + " remaining. You sent out " + choices[0] + ".", DialogLayout.Bottom);
                            break;
                        case 2:
                            story.printDialog("Pick a Pokemon to send out:", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                            story.showPlayerChoices(choices[0], choices[1]);
                            break;
                        case 3:
                            story.printDialog("Pick a Pokemon to send out:", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                            story.showPlayerChoices(choices[0], choices[1], choices[2]);
                            break;
                        case 4:
                            story.printDialog("Pick a Pokemon to send out:", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                            story.showPlayerChoices(choices[0], choices[1], choices[2], choices[3]);
                            break;
                        case 5:
                            story.printDialog("Pick a Pokemon to send out:", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                            story.showPlayerChoices(choices[0], choices[1], choices[2], choices[3], choices[4]);
                            break;
                    }
                    pauseUntil(() => !story.isMenuOpen());
                    if (choices.length >= 2) {
                        for (let creature of player.partyPokemon) {
                            if (creature.name == story.getLastAnswer()) {
                                playerCurrentCreature = creature;
                                game.showLongText("You sent out " + playerCurrentCreature.name + " to battle.", DialogLayout.Bottom);
                                break;
                            }
                        }
                    } else if (choices.length == 1) {
                        for (let creature of player.partyPokemon) {
                            if (creature.name == choices[0]) {
                                playerCurrentCreature = creature;
                                game.showLongText("You sent out " + playerCurrentCreature.name + " to battle.", DialogLayout.Bottom);
                                break;
                            }
                        }
                    } else {
                        game.showLongText("You lost the battle!.", DialogLayout.Bottom);
                        battleResult = false;
                    }

                }
            }
        }


        scene.setBackgroundImage(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
        `);
        tiles.setCurrentTilemap(map)
        scene.centerCameraAt(player.sprite.x, player.sprite.y);
        scene.cameraFollowSprite(player.sprite);
        pause(100);
        for (let creature of player.partyPokemon) {
            checkLevelUp(creature);
            checkEvolve(creature);
        }

        return battleResult;

    }

    //% blockId=creatures_trainerBattleWild
    //% block="make $player=variables_get(myTrainer) battle wild $wildCreature=variables_get(wildCreature)"
    //% expandableArgumentMode=toggle
    //% group="Battle"
    //% weight=80
    export function trainerBattleWild(player: Trainer, wildCreature: Creature) {
        let battleResult = false;
        let playerCurrentCreature = player.partyPokemon[0];
        let playerCurrentIndex = 0;

        let playerRemainingPokemon = player.partyPokemon.length;
        for (let creature of player.partyPokemon) {
            if (creature.hp <= 0) {
                playerRemainingPokemon--;
            }
        }

        let map: tiles.TileMapData = game.currentScene().tileMap.data;
        tiles.setCurrentTilemap(tilemap` `)
        scene.setBackgroundImage(img`
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777ceeebec7777cecccebbbbbbbe77777cee77b77b7cebbbebeeec777cee77777777cbbbeebebe
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777ceebbbeb7777cecceebebbbbbe777777bebcee7b77ebbbebeeeec77cee77777777beebeebbbe
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777cebbbbeb7777ebcceebebbbbbe7777777ee7ee777bebbbebeeeec7ceee77777777bebbeebbbe
            777777777777777777c77777777777777777777777777777777777777777777777777777777777777777eebbbe777777ebeeeebebbbbbb77777777ebee77777bbbbeebeee7eeec777777777ceeeebbbe
            777777777777777777c77777777777777777777777777777777777777777777777777777777777777777eebbbe777777ebeeeebebbbbb7777777777ebbe7777bbbbebbeeeebee77777777777eeeebbee
            777777777777777777c777777cc777777777777777777777777777777777777777777777777777777777eebbbe777777eebbeebebbbbb77777777b77eebbbb7ebbbebbeeebbee77777777777ebeebbee
            77777777777777777cc7777ccc777777777777777777777777777777777777777777777777c777777777eebbbe7777777ebbeebebbbbe7777777777777ebb77ebbbebbbeeebe7777777777777beebbee
            777777777777cc77cccc77cccc7777777b77777777777777777777777777777777777c7777c77777777cebbbbe7777777eebeebbbbbbe7777777777777ebbe7ebbbbbbbbeeec7777777777777bbebbbe
            777777777777cc77cccc77ccc777c77777cc77777777c77777777777777777777777cc777cc7777777bcebebbb7777777eeeeeebbbbbeb777777777777bebbeeebbbbbebeee77777777777777ebebbbe
            7777777cc777cc77cccc7cccc77cc7777cc777777777c77c77777b77777777777c77cc7777c7777777beebbbe77777777ceeeeebbbbbe777777777777777ebbbebbbbbeeeeec777777777c77cceebbbe
            777c7777c7777cc7cccccccccb7cc7c77cc77777777cc7cc77777777777777777c77cc77cc777c77777eebebe77b77777ceeeeebbbbe7777777777777777bbbbbbbbbbebeeec7777777777c7ccbebbbb
            7777cc77cc7777c7ccccccccc7ccc7c7ccc77777c77cc7cc7c77c777c77777777cc7ccc7ccc77cc7c7cebeebe77b77b77ceeeeebbbbe7777777777777777cbebbeebbbebeeee777b7c77c7ccc7debbbb
            7c77ccc7ccc77ccccccccccccccc7cc7cc77cc77c7cccccccc7cc777c77cc7777cccccccccccccccccceeeeec77777b77ceeeebbbbbeb777777777777777777beeebbbebbeeecc7b7ccbcccccbbebbbb
            77c7ccc7ccc77cccccccccccccccccccccc7cc7cccccccccccccc777c7cc77cc7cccccc7ccccccccccceeeee77cb77777eeeeebbbbbe777777777777777777bbeeebbbebbeeec7c77c77cccccbbebebb
            7cc7ccc7ccc7ccccccccccccccccccccccc7cc7cccccc77ccccccc7cccccc7cccccccccccccccccccceeeeee77cb77777eeeeebbbbb777777777777777777777bebbbbebbeeeebccbcccccc77b7eebbb
            cccccc7cccc7cccccccccccccccccccccc77cc7cccccccccc77ccc7cccccc7cccccccccc77777ccccc77ccee7c777777ceeeeebbbbb777777777777777777777bebbbbbbbeeeeccc7ccccccc777ebbbb
            ccccccccccccccccccccccccccccccccccccccccccccc7ccccccccccccccccccccccccc7bdb7b7bbe77777cccc777777ceeeeebbbbbb777777777777777777777ebbbbbbebeeeccc7ccccb77777ebbbb
            ccccc7777cccccccccccccccccccccccccc7cc777ccc77cccccccccccc777ccccccccccdbbbbbbbbb7bb7777cc77c7ccceeeeebbbbbb7777777777777777777777bbbbbbeeeeeecccccbdb77777ebbbb
            77c777777cccccccccccccccccccccccc7c7c7777ccccc77cccccc777777777777cccc7bbdbbdddbbbbdb777ccc7c7cceeeeeebbbbe7c77777777777777777777bbbbbebeeeeeecccccddb77777ebbbe
            7777777777ccccccccc7cc7c7cccccc7cc7c77ccc7cc77777777c777777777777bccb7c7dbdbdbddbb7bdb77ccccccceeeceeebebbccc777777777777c77777ccbbbbbb7ccceeecccccbdbb7777ebbbe
            7777777777777ccccccccccccccccc77ccccccccccc77777777777777777777777bddb77bbdbbbbb77bbbdb77cccccccccceec7ebbccc777c77777777cc7777cc7bbbec7bbbceecccc7bbbb7777ebbee
            777777777777777cccccccccccc7cc777ccccccccc77777777777777777777777ddddd7bbdbbbbb777dbbdb777c7ccc77ceeccccbbccccc7c77777777cc7777ccccbbc777bbbeccccc777b77777ebbee
            777777777777777c7ccbccccc777c777cccc7ccc7777777777777777777777777bdddddbbddbbbbbbbdbbb7777777c777ccc77cbbccc7c7777777c7777ccccc7cccbc7777bbddccccc777b77777ebbeb
            777777777777777ccc77cccc777cc777ccc77cc77777777777777777777777db77dddbdbbbbb77bdbbb77777777776777cc777cccc77cc7cc777ccc777ccccccccccc777bbb777c7777bbbb7777ebbeb
            777777777777777ccc777cc7777c7777c777ccc77777777777777777777777ddb7bdb7bddbb777bdbb77777777777c777777cccc777ccc7cc7c777c77ccccccc7bddb777bb77777bb7bdbbb7777ebbeb
            7777777777777777c777cc77777c77777777cc77777777777777777777777bddbdddb7bdddbb7bbbbb77777777c77c7c77777cc7777ccccccc7c77777ccc7ccc77dbd777bb7777db77bbbb77777ebbeb
            77777777777777777777ccc7777c777777777777777777777777777777777dddddddddddddbb7bbbbb77777777cc777777c7cc7777cccccccccc777c77ccc7c777b7777777777777777b7777777ebbbb
            777777777777777777777777777777c77777c7777777777777777777777cbdddddbbddddddbb77777777777777cc77777cc777777ccccccccc7ccccc7cccc77c777777777777777777777777777ebebb
            777777777777777777c77777777777c7777c77777777777777777777777cdbdbddddddddddb777777777777777c777c77d7c777777ccccccccc7cccc7cccc77777777c777777777777777777777eebbb
            777777777777777777777777777777777ccc7777777777777777777777777bb7bddbbbddddb777777777777777cc777bbdb7777777c7ccccccccccccccccc777777777777777777777777777777ebbbb
            77777777777777777c7777cc777c77777ccc777777777777777777777bbbbb77bbbb77bddb777777777777777777777bbddbb7777777ccc77ccc7cccccccc777777777777777777777777777777eeebb
            77777777777777777cccc777777cc7c77ccc777777777777777777777dddddb777777777b777777777777777bbb7777777bbbbc77777cc77cc77ccccccccc777b77777b77777777777777777777eebbb
            7777777777777777777777777777c77c7c7777777777777777777777bddbbdb777777777777777777777777bb777777777bb777777777cc76777ccccccccc77777777777c77777777c77777777cebbeb
            77777777777777777777777777777777c7777777777777777777777bddd7bbb7777777777777777777777777b77777777777777777777cccc777cccccc7cc777777c7777777777777c777777777ebbeb
            7777777777777777777777cc77777777777777777777777777777c7bbbb7777777777777777777777777777777777777777777777c777777777cc7ccc777c777777cc7777c7777777c777777777ebeeb
            777777777777777777c7777777777777777777777777777777777c777b777777777777777777777bb77777777777777777777777777777777777777cc777c7777777c7777c7777777c77c777777ebeeb
            77777777777777777777777c77777777777777777777777777777777777777777777777bbb77777777777777777777777777777bb777cc7777777777c7777c777777c777767777777c777777777ebeee
            777777777777777777c7777c77c7c777777777777777777777777c777777777777777bddb777777777777777777777777777777b77777c77777777ccc777bc77777777777777777c7c777777777ebeee
            c77777777777777777c77c7c777cc777777777777777777bb777777777777777777bbddddb77777777777777777777777777777777777cc777777777c77777777777777767777c77cc7777777ccebebe
            cc7777777777777777c777cc777cc7777c77777777cbbdbddbb7cc777777777777777dbbdb7777777777777777777777777777777777777777777777777777777777777ccc777777cc77777777cebebe
            c7c7777777777777777cb7cc7777c7777c777777777ddbddddbb77777777777777777b77b77777777777777777777777777777777777777777777c777c7777777777777777c77777cc7777c7c7cebbbe
            77c7c77777777777777c777c7777c7777777777777ddddddddb77c777777777777777777777777777777777777777777777777777777777c777777c77777777777777777c777c7777c7777c7c7cebbbe
            7777c77777777777777c777777777777777c777c7bbbdddbbbb777777777777777777777777777777777c77777777777777777777777777cc777cccc7777777777777777c77cc77c777777c777cebbbe
            777cc77777777777777c77777ccc777777777777bdbdbb77bdb777777777777777cc7777777777777777777777777777777777777c777777777c7ccc77c77777777777777c77c7c7c777777c77cbbbbe
            7777777777777777c777777777d7777777cc777bdbd777777bb77777777777777777777777777777777777777777c7777777777777c7c7c777777c7c7c77c777c777777c77c77c77cc7cc77c77cbbbee
            7777777777777777c7777777bdb77bbddd77c77bbbb7777777777777777777c77cc7777777777777777c77777777c777777c7ccc7777c7777cc777cc7c777cc7c77c7ccc77c77777c77c77777cebbbee
            777c77777777777cc7777777b77777b77b77777bb7b7777777777777777777777777777c777777777777c7777777c7c7777777777777777777777777777777777777777c777c777777777c777cbbbbee
            777777cc77777777c777bbb777777777777777777777777777777777777777777c77777cc77777777c7777777777777777777777777777777777777777777777777777777777777777cc7c777cbbbbee
            7777777c7777c77c77cdb777777777777b77777777777777777777c7777c7777c77c77cc7777c7c777777777777777777777777777777777777777777777777777777777777777777777bc7ccebbbbee
            7777777c7ccc777c77cbb777777777777c77777777777777777777c777c77777c7c777ccc7777cc7777777777777777777777777777777777777777777777777777777777777777777777cc7cebbbeee
            77c777777ccc77cc7777777777777777777777c777777777777777c777c77777c77777ccc77777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeee
            777777777cc777c7c7777777777777777777c77777777777777c77cc77cc777c77777cc7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbebe
            77777777777777cc777777777777777c7c77c777c7777777777c77777cc777cc77777cc7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbebb
            7777777777777c7777777777777777777c7777777777777777c777777777777c7777c777777777777777777777777777777777777777777777777777777777777777777777777777777777777eebbbbb
            777777777777777777777777777777c77c7777777777c77777c77777777777777777ccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            777777777777777777777777777777777cc77777c7777777c7c77c7777777777777cc7cc777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            77777777777777777777777777777777777777777cc7777777767c7cc7777777777cccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            77777777777777777777777777777777c777777777c777777776cc777777777777ccc77c777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            777777777777777777777777777777777777777777777777777cc7777777777777ccc77c777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbb
            777777777777777777777777777777777777777777777777777c7777777777777c7777c7777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbe
            77777777777777777777777777777777777777777777777777cc7777777c777777777cc777777777777777777777777777777777777777777777777777777777777777777777777777777777eebeebbe
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbebbee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeebee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbebee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebe
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeeee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeeee
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777eebeeeeb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeeeb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeeeb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeebb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebb
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebe
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeeebe
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbeebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bebbbebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbbbe
            77777777777777777777777777777777777777777777777777777777777777b7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebbe
            77777777777777777777777777777777777777777777777777777777777777b7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbeebbe
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bbbbeeebe
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbeeee
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ebbbbbeeee
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cbebbbeeee
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cbeebbeeee
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cbebeee777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777ceeeec7777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cc777ee77777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c7777777c7777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777779977777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cccc77777777777777777
            77777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777c77777c7777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c7777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c777777777777777777777777
            7777777777777777777777777777777777777777777777ccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c77777777777777777777777
            777cccc77777777777777777777777777777777777777c7777c7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cc7777
            7cccc7777777777777777b7777777777777777777777c7bb777777777777777777777777777777777777777777777777777777777777777777777777777c777777777777777777777777777777777777
            c77c77777777777777777777777777777777777777cbb7bddb777bb77777777777777777777777777777777777777777777777777777777777777777777777c777777c77777777777777777777777777
            777c777777777777777777777777777777777cccc7cbdbbddb7777b7777c7777777777777777777777777777777777777777777777777777777777777777777c77ccc7c7777777777777777777777777
            77c7777777777777777777777777777777777bd7777bb77b77777777777777777777777777777777ccc77777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777cccc777777777777777777777777bdddbb777777777777777777767777777777777777777777777777777777777777777777777cc77c77c777777777777777777777777777777777777777777
            7c77cc77777777777777777777777777c7cdddddb7777777777777777777c76cc7777777777777777c77c77c777777777777777777777777777cc7777777777777777777777777777777777777777777
            7ccc77777777777777776777777777b7777b777b777777777777777777777777777777777777c777777776ccc77777777777777777777777777777777777777777777777777777777777777777777777
            777777777ccccc777777777777777dd77777bbb77777b7777777777777777777777cc7777777c7c777c777c77c7cc7777777777777777777777777777777777777777777777777777777777777777777
            c7cc7777ccc77677c7c777c7ccc777777777bbb7777777777777777777777777777777777777c77c77c777c77c7ccc777767777777777777777777777777777777777777777777777777777777777777
            77ccc77cbb7dbcceecbbbb6bbbbbbbb777d9b77db7e7c77bbbb7b777e7bc7777777777777777777777e777bbb777b7bbbb77bb77777b77777777777777777b77b777777777e77777b7bb7777777e7777
            777777cb999999999bcc999999999bbeee99bececbbcebeb9999ccceb99bc7777777777777eeeeeebbbebbbbbbebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbebebbeeeeebbbbbbeebbbbbbbbeebbe
        `)
        scene.centerCameraAt(80, 60);
        scene.backgroundImage().fillRect(5, 8, 150, 100, 1)
        scene.backgroundImage().drawRect(5, 8, 150, 100, 15)

        game.setDialogFrame(img`
            ..99999999999999999999..
            .9966666666666666666699.
            996661111111111111166699
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            966611111111111111116669
            996661111111111111166699
            .9966666666666666666699.
            ..99999999999999999999..
        `)
        game.showLongText("A wild " + wildCreature.name + " appeared.", DialogLayout.Bottom)
        game.showLongText("You sent out " + playerCurrentCreature.name + " to battle!", DialogLayout.Bottom)

        while (playerRemainingPokemon > 0 && wildCreature.hp > 0) {
            let win = creatureBattleCreature(playerCurrentCreature, wildCreature);
            if (win) {
                game.showLongText("You knocked out " + wildCreature.name + " and earned " + wildCreature.xpReward + " xp.", DialogLayout.Bottom)
                game.showLongText("You won the battle", DialogLayout.Bottom)
            } else {
                game.showLongText("The wild pokemon knocked out " + playerCurrentCreature.name, DialogLayout.Bottom)
                playerRemainingPokemon--;
                if (playerRemainingPokemon > 0) {

                    let choices = [];
                    for (let creature of player.partyPokemon) {
                        if (creature.hp > 0) {
                            choices.push(creature.name);
                        }
                    }
                    switch (choices.length) {
                        case 0:
                            //you lose 
                            break;
                        case 1:
                            game.showLongText("You only have " + choices[0] + " remaining. You sent out " + choices[0] + ".", DialogLayout.Bottom);
                            break;
                        case 2:
                            story.printDialog("Pick a Pokemon to sent out:", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                            story.showPlayerChoices(choices[0], choices[1]);
                            break;
                        case 3:
                            story.printDialog("Pick a Pokemon to sent out:", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                            story.showPlayerChoices(choices[0], choices[1], choices[2]);
                            break;
                        case 4:
                            story.printDialog("Pick a Pokemon to sent out:", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                            story.showPlayerChoices(choices[0], choices[1], choices[2], choices[3]);
                            break;
                        case 5:
                            story.printDialog("Pick a Pokemon to sent out:", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                            story.showPlayerChoices(choices[0], choices[1], choices[2], choices[3], choices[4]);
                            break;
                    }
                    pauseUntil(() => !story.isMenuOpen());
                    if (choices.length >= 2) {
                        for (let creature of player.partyPokemon) {
                            if (creature.name == story.getLastAnswer()) {
                                playerCurrentCreature = creature;
                                game.showLongText("You sent out " + playerCurrentCreature.name + " to battle.", DialogLayout.Bottom);
                                break;
                            }
                        }
                    } else if (choices.length == 1) {
                        for (let creature of player.partyPokemon) {
                            if (creature.name == choices[0]) {
                                playerCurrentCreature = creature;
                                game.showLongText("You sent out " + playerCurrentCreature.name + " to battle.", DialogLayout.Bottom);
                                break;
                            }
                        }
                    } else {
                        game.showLongText("You lost the battle!.", DialogLayout.Bottom);
                        battleResult = false;
                    }
                } else {
                    game.showLongText("You lost the battle!.", DialogLayout.Bottom);
                    battleResult = false;
                }
            }

        }
        scene.setBackgroundImage(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
        `);
        tiles.setCurrentTilemap(map)
        wildCreature.sprite.destroy();

        scene.centerCameraAt(player.sprite.x, player.sprite.y);
        pause(100);
        for (let creature of player.partyPokemon) {
            checkLevelUp(creature);
            checkEvolve(creature);
        }


    }

    //% blockId=creatures_trainerHealAll
    //% block="$player=variables_get(myTrainer) heal all pokemon"
    //% group="Other"
    //% weight=75
    export function trainerHealAll(player: Trainer){
        for(let creature of player.partyPokemon){
            creature.hp = creature.maxHP;
        }
    }


    export function checkEvolve(creature: Creature) {
        if (creature.evolutionLevel == 0) {
            return;
        }
        if (creature.level >= creature.evolutionLevel) {
            if (creature._evolutionID != 0) {
                const oldSprite = creature.sprite;
                controller.moveSprite(myTrainer.sprite, 0, 0);
                creature.sprite.setFlag(SpriteFlag.Invisible, false);
                creature.sprite.setPosition(scene.cameraLeft() + 80, scene.cameraTop() + 30)
                story.printDialog(creature._name + " is evolving...", 80, 90, 50, 150, 15, 1, story.TextSpeed.VeryFast);
                pause(200)
                creature.sprite.startEffect(effects.warmRadial, 1500)
                pause(500)

                animation.runMovementAnimation(creature.sprite, animation.animationPresets(animation.bobbing), 500, false)
                pause(500);

                animation.runMovementAnimation(creature.sprite, animation.animationPresets(animation.bobbing), 500, false)
                pause(500);
                creature.sprite.startEffect(effects.warmRadial, 1500)
                animation.runMovementAnimation(creature.sprite, animation.animationPresets(animation.bobbing), 500, false)
                pause(500);

                animation.runMovementAnimation(creature.sprite, animation.animationPresets(animation.bobbing), 500, false)
                pause(500);

                animation.runMovementAnimation(creature.sprite, animation.animationPresets(animation.bobbing), 500, false)
                pause(500);
                creature.sprite.startEffect(effects.warmRadial, 1500)
                pause(500)

                const evId = creature._evolutionID;
                let evolution = makeCreatureFromID(evId);
                creature.sprite = evolution.sprite;
                oldSprite.setImage(creature._sprite.image);
                oldSprite.setPosition(scene.cameraLeft() + 80, scene.cameraTop() + 30)
                creature.healthbar.destroy();
                creature.creatureType1 = evolution.creatureType1;
                creature.creatureType2 = evolution.creatureType2;
                creature.name = evolution.name;
                creature.evolutionID = evolution.evolutionID;
                creature.xp = 0;
                creature.hp = evolution.hp;
                creature.maxHP = evolution.maxHP;
                creature.attackValue = evolution.attackValue;
                for(let i = 0; i < creature.level-5; i++) {
                    creature.maxHP *= 1.05;
                    creature.hp *= 1.05;
                    creature.attackValue *= 1.05;
                }
                creature.xpReward = evolution.xpReward;
                creature._sayHP = false;
                creature._sayXP = false;
                creature.sprite.setFlag(SpriteFlag.Invisible, true);
                creature.healthbar = statusbars.create(20, 4, StatusBarKind.Health)
                creature.healthbar.attachToSprite(creature.sprite) 
                creature.healthbar.max = creature.maxHP;
                creature.healthbar.value = creature.hp;
                creature.healthbar.setFlag(SpriteFlag.Invisible, true);
                pause(500);
                game.showLongText("Your Pokemon evolved into " + creature.name + ".", DialogLayout.Bottom);
                oldSprite.destroy();
                controller.moveSprite(myTrainer.sprite, 80, 80);
            }
        }
    }



    export function checkLevelUp(creature: Creature) {
        let levelUpThresholds = [5, 6, 7, 8, 9, 10, 12, 14, 18, 25]
        for (let i = 0; i < 90; i++) {
            levelUpThresholds.push(levelUpThresholds[9 + i] + (i * 5) + 3)
        }
        let xpForLevel: number[] = []
        for (let i = 0; i < 100; i++) {
            xpForLevel.push(levelUpThresholds[i])
            for (let j = 0; j < 100; j++) {
                if (j <= i) {
                    xpForLevel[i] += levelUpThresholds[j];
                }
            }
        }


        if (creature.xp > xpForLevel[creature.level]) {
            creature.level++;
            game.showLongText(creature.name + " leveled up to level " + creature.level, DialogLayout.Bottom);
            creature.maxHP *= 1.05;
            creature.attackValue *= 1.05;
            checkLevelUp(creature);
        }
        //throw "test"

    }

    export function getXpForLevel(level: number) {
        let levelUpThresholds = [5, 6, 7, 8, 9, 10, 12, 14, 18, 25]
        for (let i = 0; i < 90; i++) {
            levelUpThresholds.push(levelUpThresholds[9 + i] + (i * 5) + 3)
        }
        let xpForLevel: number[] = []
        for (let i = 0; i < 100; i++) {
            xpForLevel.push(levelUpThresholds[i])
            for (let j = 0; j < 100; j++) {
                if (j <= i) {
                    xpForLevel[i] += levelUpThresholds[j];
                }
            }
        }
        return xpForLevel[level];
    }

    interface TypeChart {
        [attackingType: number]: {
            [defendingType: number]: number;
        };
    }

    const typeChart: TypeChart = {
        12: { 15: 0.5, 8: 0 },
        6: { 15: 2, 17: 0.5, 9: 2, 11: 2, 0: 2 },
        17: { 10: 2, 9: 0.5, 6: 2 },
        9: { 10: 2, 15: 2, 17: 0.5, 6: 0.5, 11: 2 },
        3: { 10: 0, 17: 2, 7: 2 },
        11: { 9: 2, 10: 2, 16: 0.5, 6: 2, 2: 2 },
        5: { 12: 2, 15: 2, 16: 2, 8: 0, 14: 0.5, 7: 0.5, 0: 0.5 },
        13: { 9: 2, 10: 0.5, 16: 0.5, 14: 2 },
        10: { 15: 0.5, 3: 2, 9: 0.5, 11: 2, 13: 2, 0: 0.5 },
        7: { 15: 0.5, 3: 0.5, 16: 0.5, 9: 2, 0: 2 },
        14: { 5: 2, 13: 2, 16: 0.5 },
        0: { 9: 2, 14: 2, 1: 2, 6: 0.5, 7: 0.5, 16: 0.5 },
        15: { 5: 0.5, 10: 0.5, 6: 2, 9: 2, 17: 2 },
        8: { 12: 0, 5: 0, 8: 2, 16: 0.5, 14: 2, 1: 0.5 },
        2: { 2: 2, 16: 0.5, 11: 2 },
        1: { 8: 2, 14: 2, 5: 0.5 },
    };


    //% group="Value"
    //% blockId="creatures_getAttackMultiplier"
    //% expandableArgumentMode=toggle
    //% block="Calculate Attack Multiplier %attackType vs %defenseTypes"
    export function calculateAttackMult(attackType: CreatureType, defenseTypes: CreatureType[]): number {
        let multiplier: number = 1.0;
        //game.splash(attackType);
        for(let defenseType of defenseTypes){
            //game.splash("Starting defenseType " + defenseType);
            if (typeChart[attackType]!=null) {
                //game.splash("attack type exists in chart");
                // Check if defense type exists in attack type's chart
                if (typeChart[attackType][defenseType] != null) {
                    //game.splash("defense type exists in chart of " + attackType);
                    // Get effectiveness multiplier
                    const effectiveness = typeChart[attackType][defenseType];

                    // Update multiplier
                    multiplier *= effectiveness;
                }
            }
        }
        //game.splash(multiplier);
        return multiplier;

    }


    //% group="Create"
    //% weight=98
    //% blockId="creatures_setMap"
    //% expandableArgumentMode=enabled
    //% block="set map to $tilemap with grass $grass || house $door1 lab $door2 pokemon center $door3 gym $door4"
    //% tilemap.fieldEditor="tilemap"
    //% tilemap.fieldOptions.decompileArgumentAsString="true"
    //% tilemap.fieldOptions.filter="tile"
    //% tilemap.fieldOptions.taggedTemplate="tilemap"
    //% grass.shadow=tileset_tile_picker
    //% grass.decompileIndirectFixedInstances=true
    //% door1.shadow=tileset_tile_picker
    //% door1.decompileIndirectFixedInstances=true
    //% door2.shadow=tileset_tile_picker
    //% door2.decompileIndirectFixedInstances=true
    //% door3.shadow=tileset_tile_picker
    //% door3.decompileIndirectFixedInstances=true
    //% door4.shadow=tileset_tile_picker
    //% door4.decompileIndirectFixedInstances=true
    export function setCreatureMap(tilemap: tiles.TileMapData, grass: Image, door1?: Image, door2?: Image, door3?: Image, door4?: Image) {
        tiles.setCurrentTilemap(tilemap)

        if(grass && !grass.equals(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)){
            tileUtil.createSpritesOnTiles(grass, img`
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . c 6 7 7 6 c . . . . . 
        . . . . c 6 7 5 7 7 6 c . . . . 
        . . 6 6 c c 6 5 5 6 c c 6 6 . . 
        6 6 6 5 5 5 6 7 5 6 5 5 7 6 6 6 
        6 6 7 7 7 5 7 6 7 5 5 7 7 7 7 6 
        . c c c 6 6 7 6 6 5 7 6 c c 6 . 
        6 c 6 6 6 6 6 c c 6 6 6 6 6 c 6 
        6 6 7 7 7 c c c c c c 7 7 7 6 6 
        6 7 7 7 6 6 c c c c 6 6 7 7 7 6 
        c 6 c c 6 7 6 c c 6 7 6 c c 6 c 
        . c c 5 5 7 6 7 7 6 7 5 5 c c . 
        . c 6 7 5 5 6 7 7 6 5 5 7 6 c . 
        . 6 6 7 7 6 6 5 5 6 6 7 7 6 6 . 
        . . 6 6 6 6 c 6 7 6 c 6 6 6 . . 
        . . . 6 6 c . 6 6 6 . c 6 . . . 
        `, SpriteKind.Grass)
        }
        
        if (door1 && !door1.equals(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)) {
            for (let value of tiles.getTilesByType(door1)) {
                let mySprite = sprites.create(img`
                    dddddddddddd1ddddddddddddddd1ddddddddddddddd1ddddddddddddddd1ddddddddddddddd1d
                    ddddddddddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddd
                    ddddddddbb44444444444444444444444444444444444444444444444444444444eeccdddddddd
                    d1ddddbbdd44444444444444444444444444444444444444444444444444444444eeeecc9ddddd
                    ddddbb4ddd44444444444444444444444444444444444444444444444444444444eeeeeeccdd9d
                    ddbbdd4ddd444eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee4eeeeeeeeccdd
                    bb4ddd4ddd444e4444444444444444444444444444444444444444444444444444eeeeeeeeeecc
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd444eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee44eeeeeeeeeeee
                    dd4ddd4ddd444e4444444444444444444444444444444444444444444444444e44eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd444eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee44eeeeeeeeeeee
                    dd4ddd4ddd444e4444444444444444444444444444444444444444444444444e44eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd444eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee44eeeeeeeeeeee
                    dd4ddd4ddd444e4444444444444444444444444444444444444444444444444e44eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4ddd44444444444444444444444444444444444444444444444444444444eeeeeeeeeeee
                    dd4ddd4deccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeee
                    dd4dddcceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeecceeeeee
                    dd4dcceeecccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeecceeee
                    ddcceeeccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcceeeccee
                    cceeeccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcceeecc
                    eeeccbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbcceee
                    eccbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbcce
                    ccbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbcc
                    bc1dddbdddddddddccccccccccccccccccccccddccccccccccccccccccccccdddddddddbdddbcb
                    bc1dddbdddddddddc666666666cc666666666cddc666666666cc666666666cdddddddddbdddbcb
                    bc1dddbdddddddddc666666666cc666666666cddc666666666cc666666666cdddddddddbdddbcb
                    bc1dddbdddddddddc999999999cc999999999cddc999999999cc999999999cdddddddddbdddbcb
                    bc1dddbdddddddddc999999999cc999999999cddc999999999cc999999999cdddddddddbdddbcb
                    bc1dddbdddddddddc999999999cc999999999cddc999999999cc999999999cdddddddddbdddbcb
                    bc1dddbdddddddddc999999999cc999999999cddc999999999cc999999999cdddddddddbdddbcb
                    bc1dddbdddddddddcbbbbbbbbbccbbbbbbbbbcddcbbbbbbbbbccbbbbbbbbbcdddddddddbdddbcb
                    bc1dddbdddddddddccccccccccccccccccccccddccccccccccccccccccccccdddddddddbdddbcb
                    bc1dddbddddddddd1111111111111111111111dd1111111111111111111111dddddddddbdddbcb
                    bc1dddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdddbcb
                    bc1dddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdddbcb
                    bc1dddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdddbcb
                    bc1dddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddbcb
                    bc1dddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdddbcb
                    bc1dddbddddddddccccccccccccccccddddddddddddddddddddddddddddddddddddddddbdddbcb
                    bc1dddbddddddddcbbbbbbbbbbbbbbcdddddddddccccccccccccccccccccccdddddddddbdddbcb
                    bc1dddbddddddddcbccccccccccccbcdddddddddc666666666cc666666666cdddddddddbdddbcb
                    bc1dddbddddddddcec6666666666cecdddddddddc666666666cc666666666cdddddddddbdddbcb
                    bc1dddbddddddddcec6666666666c3cdddddddddc999999999cc999999999cdddddddddbdddbcb
                    bc1dddbddddddddcec6666666666c3cdddddddddc999999999cc999999999cdddddddddbdddbcb
                    bc1dddbddddddddcec9999999999c3cdddddddddc999999999cc999999999cdddddddddbdddbcb
                    bc1dddbddddddddcec9999999999c3cdddddddddc999999999cc999999999cdddddddddbdddbcb
                    bc1dddbddddddddcecccccccccccc3cdddddddddcbbbbbbbbbccbbbbbbbbbcdddddddddbdddbcb
                    bc1dddbddddddddccc333333333333cdddddddddccccccccccccccccccccccdddddddddbdddbcb
                    bc1dddbddddddddc1dc44444444444cddddddddd1111111111111111111111dddddddddbdddbcb
                    bcddddbddddddddcddceeeeeeeeeeecddddddddddddddddddddddddddddddddddddddddbdddbcb
                    bcddddbddddddddccceeeeeeeeeeeecddddddddddddddddddddddddddddddddddddddddbdddbcb
                    bcddddbddddddddceeeeeeeeeeeeeecddddddddddddddddddddddddddddddddddddddddbdddbcb
                `, SpriteKind.Structure)
                tiles.placeOnTile(mySprite, value)
                mySprite.x += 16
                mySprite.y += -32
                for (let i = value.column-1; i < 4 + value.column; i++) {
                    for (let j = value.row-4; j < value.row +1; j++) {
                        tiles.setWallAt(new tiles.Location(i,j,game.currentScene().tileMap), true);
                    }
                }
                tiles.setWallAt(value, false);
            }
        }
        if (door2 && !door2.equals(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)) {
            for (let value2 of tiles.getTilesByType(door2)) {
                let mySprite = sprites.create(img`
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    bdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd111111111111111111111111ddddddb
                    dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccbbbbbbbbbbbbb
                    dbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbeccccccccccbbb
                    dbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbecccccccccccbb
                    dbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbeeeeeeeeeebecccccccccccbb
                    dbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbeeeeeeeeeebecccccccccccbb
                    dbcbbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbccccbbeeeeeeeeeebeccccbbbbbbcbb
                    dbcbbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbbbbbcbbbcbbcbbeeeeeeeeeebecbbcbbbbbbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddcebcbbccccccccccbecbecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceecbbccccccccccbeceecbbdddbcbb
                    dbcbbddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddceecbbccccccccccbeceecbbdddbcbb
                    dbccccccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbccceecbbccccccccccbeceecbbcccbcbb
                    dbcbbddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddceecbbccccccccccbeceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceecbbccccccccccbeceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceecbbbbbbbbbbbbbeceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceecbbbbbbbbbbbbbeceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceeceeeeeeeeeeeeeeceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceeceeeeeeeeeeeeeeceecbbdddbcbb
                    dbcbbddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddceeceeeeeeeeeeeeeeceecbbdddbcbb
                    dbccccccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbccceeceeeeeeeeeeeeeeceecbbcccbcbb
                    dbcbbddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddceeceeeeeeeeeeeeeeceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceeceeeeeeeeeeeeeeceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceecccccccccccccccceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceeceeeeeeeeeeeeeeceecbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceceeeeeeeeeeeeeeeececbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddceceeeeeeeeeeeeeeeececbbdddbcbb
                    dbcbbddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddcceeeeeeeeeeeeeeeeeeccbbdddbcbb
                    dbccccccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbcccccbbbccccccccccccccccccccccccbbcccbcbb
                    dbcbbddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddddddbdddbbbbbbbbbbbbbbbbbbbbbbbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcddddbbbbbbbbbbbbbbbbbbbbbbbdddbcbb
                    dbcbbddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcdddddddcddddddbcbb
                    dbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbb
                    dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
                    cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc
                    cdbbbdddddd4d1111d4dddddddd4d1111d4dddddddddddddddddddddddddddddddddddddddd4d1111d4dddddddd4d1111d4ddddddbbbbc
                    c1dddddddd411bccb114dddddd411bccb114dddddddddddddddddddddddddddddddddddddd411bccb114dddddd411bccb114dddddddbbc
                    c1dddddddbd1c6666c1dbddddbd1c6666c1dbddddddddddddddddddddddddddddddddddddbd1c6666c1dbddddbd1c6666c1dbddddddbbc
                    c1bbbdddd41b666666b14dddd41b666666b14dddddddddddddddddddddddddddddddddddd41b666666b14dddd41b666666b14ddddbbbbc
                    c1bbbdddd41c666666c14dddd41c666666c14dddddddddddddddddddddddddddddddddddd41c666666c14dddd41c666666c14ddddbbbbc
                    c1ddddddd41c999999c14dddd41c999999c14dddddddddddddddddddddddddddddddddddd41c999999c14dddd41c999999c14ddddddbbc
                    c1ddddddd41b499994b14dddd41b499994b14dddddddddddddddddddddddddddddddddddd41b499994b14dddd41b499994b14ddddddbbc
                    c1bbbddddbd1c4444c1dbddddbd1c4444c1dbddddddddddddddddddddddddddddddddddddbd1c4444c1dbddddbd1c4444c1dbddddbbbbc
                    c1bbbddddd411bccb114dddddd411bccb114dddddddddddddddddddddddddddddddddddddd411bccb114dddddd411bccb114dddddbbbbc
                    c1ddddddddd4d1111d4dddddddd4d1111d4dddddddddddddddddddddddddddddddddddddddd4d1111d4dddddddd4d1111d4ddddddddbbc
                    c1ddddddddddb4444bddddddddddb4444bddddddddddddddddddddddddddddddddddddddddddb4444bddddddddddb4444bdddddddddbbc
                    c1bbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbc
                    c1bbbddddddddddccccccccccccccccccccccccddddddddddddddddddddddddddddddddccccccccccccccccccccccccddddddddddbbbbc
                    c1dddddddddddddcbebbbbbbbbbbbbbbbbbbebcddddddddccccccccccccccccddddddddcbebbbbbbbbbbbbbbbbbbebcddddddddddddbbc
                    c1dddddddddddddcbebbbbbbbbbbbbbbbbbbebcddddddddcbbbbbbbbbbbbbbcddddddddcbebbbbbbbbbbbbbbbbbbebcddddddddddddbbc
                    c1bbbddddddddddceeeeeeeeeeeeeeeeeeeeeecddddddddcbbbbccccccbbbbcddddddddceeeeeeeeeeeeeeeeeeeeeecddddddddddbbbbc
                    c1bbbddddddddddccccccccccccccccccccccccddddddddc666c666666c666cddddddddccccccccccccccccccccccccddddddddddbbbbc
                    c1ddddddddddddddc666666666cc666666666cdddddddddc66c66666666c66cdddddddddc666666666cc666666666cdddddddddddddbbc
                    c1ddddddddddddddc666666666cc666666666cdddddddddc66c66666666c66cdddddddddc666666666cc666666666cdddddddddddddbbc
                    c1bbbdddddddddddc666666666cc666666666cdddddddddc66c66666666c66cdddddddddc666666666cc666666666cdddddddddddbbbbc
                    c1bbbdddddddddddc999999999cc999999999cdddddddddc66c99999999c66cdddddddddc999999999cc999999999cdddddddddddbbbbc
                    c1ddddddddddddddc999999999cc999999999cdddddddddc666c999999c666cdddddddddc999999999cc999999999cdddddddddddddbbc
                    c1ddddddddddddddc444444444cc444444444cdddddddddccc66cccccc6666cdddddddddc444444444cc444444444cdddddddddddddbbc
                    c1bbbdddddddddddccccccccccccccccccccccdddddddddc1dc66666666666cdddddddddccccccccccccccccccccccdddddddddddbbbbc
                    c1bbbddddddddddd1111111111111111111111dddddddddcddc66666666666cddddddddd1111111111111111111111dddddddddddbbbbc
                    c1dddddddddddddddddddddddddddddddddddddddddddddccc666666666666cdddddddddddddddddddddddddddddddddddddddddddddbc
                    c1dddddddddddddddddddddddddddddddddddddddddddddc66666666666666cdddddddddddddddddddddddddddddddddddddddddddddbc
                    c1dddddddddddddddddddddddddddddddddddddddddddddccccccccccccccccdddddddddddddddddddddddddddddddddddddddddddddbc
                `, SpriteKind.Structure)
                tiles.placeOnTile(mySprite, value2)
                mySprite.x += 0
                mySprite.y += -32
                for (let i = value2.column - 3; i < 4 + value2.column; i++) {
                    for (let j = value2.row - 4; j < value2.row+1; j++) {
                        tiles.setWallAt(new tiles.Location(i, j, game.currentScene().tileMap), true);
                    }
                }
                tiles.setWallAt(value2, false);
            }
        }
        if (door3 && !door3.equals(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)) {
            for (let value3 of tiles.getTilesByType(door3)) {
                let mySprite = sprites.create(img`
                    dd3444444444444444444444444444444444444444444444444444444444444444444444444444ddddbbd
                    444444e44444444444444444444444444444444444444444444444444444e4444444444444e434443bdbb
                    4ee444444444444444444444444444444444444444444444444444444444444444444444444434ee443db
                    eee444444444444444444444444444444444444444444444444444444444444444444444444434eeee4bb
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    ee4444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    ee4444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    ee4444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    ee44444444444444444444444444444444444e4444444444444444444444444444e44444444444eeeeeee
                    ee4444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    ee4444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444e44444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444344444444344444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444434eeeeeee
                    eee444444444444444444444443444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee4444444444444444e4444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444434444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444443444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    eee444444444444444444444444444444444444444444444444444444444444444444444444444eeeeeee
                    e4444444444444444444444444444444444444444444444444444444444444444444444444444444eeeee
                    444444444444444444444444444444444444444444444444444444444444444444444444444444444eeee
                    4344444444444444444444444444444444444444344444444444444444444444444444444444444444eee
                    44ee4444444444444444444444444444444444444444444444444444444444444444444444444e44444ee
                    4eeeeee4344434444344434444344433444444443344434444444434443344434444444434eeeeee444be
                    4eeeeee444444444444444444444444444444444444444444444444444444444444444444eeeeeee444be
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee43b
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebe
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeedd1111111dbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111111dbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeec
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebd11ddddddd11deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeec
                    eeeeeeeeeeeeeeeeeeeeeeeeecccccccd11bdbbbbbbbdd1dbcccccceeeeeeeeeeeeeeeeeeeeeeeeeeeecc
                    beeeeeeeeeeeeeeeeeeeeeeebddddddd11ddbbbbbbbbbdd1ddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeccc
                    cccccccccccccccccccccccb11111111dddbb44bbb444bddd11111111dcccccccccccccccccccccccdbcb
                    bbcccccccccccccccccccccbddddddddddbeeb3333beebbddddddddd1dccccccccccccccccccccccb1bcb
                    dbbbbbcc66666bbcc66666cbddddddddddeeebddddbeeeedddddddddddc66666ccbb66666ccbbbbb11bcb
                    11ddbbbc66666bbcc66666bbddbdddddddbbbdbeeeddbbbdddddddbddb666666cbbb66666ccbbddd11bcb
                    111dddbc66666bdbc66666cbdbb1ddddddddddeeeeddddddddddddbddbc66666cbdb66666cbddd1111bcb
                    dd11ddb6999969dbc9999bcbdd1dddddddbb3deeeeddbbbddddddddddbc69999cd1969999cbd111d111cc
                    1d11ddb6999969dbc9999bcbdddddddd1bceedbeee33eeeddddddddddbc6999bcd1969999cbd11dd111cc
                    1dd1d1bc666669dbc66666cbdddddddd1beeeb3db3beeeeddddddddd1bc66666cd1966666cbd11dd111cc
                    11ddddbd1ddddddbbdddd1bcdddddddddddeeeeeeeeeeeddddddddddbcd1ddddddddddd1dbbddd1111dcc
                    111dddd111111ddd111111bbbbbbbbbbbd1eeeeeeeeeeb1bbbbbbbbbbbd111111ddd11111ddddd111dbcc
                    d1111dddddddddddddddd1bbbbbbbbbbbbc1deeeeeebddcbbbbbbbbbbbd1dddddddddddddddd1111ddbcb
                    dd11ddddddddddddddddddbbbbbbbbbbbbcbdbbbbbbddbcbbbbbbbbbbbbdddddddddddddddddd11dd1bcb
                    1d11ddddddddddddddddddbbbbbbbbbbbbbcbdddddddbcbbbbbbbbbbbbbddddddddddddddddd11dd11bcb
                    11ddddddddddddddddddddbbddddddbbbbbbbcccccccbbbbbbddddddddbdddddddbbbbdddddbddd111bcb
                    111dddddddddddddddddddbdddddddbcccccccccccccccccccdddddd1dbbbbbbbbbbbbbbbbbbbd1111bcb
                    111d111dddd11111dddd11bbddddddbc6666666666666666ccdddddd1dbddddddddddddddddddd1111bcc
                    111d11d222222112222211bdddddddbc6666666666666666ccdddddd1dbddddddddddddddddddd1111dcc
                    111d11d222222212222211bb1dddddbc6666666666666666ccdddddd1dbddddddddddddddddddd111ddcc
                    b11d11d222dd2212222211bbddddddbcbb6666666666666bccdddddd1dbddddddddddddddddddd11bd1cc
                    bd1d11d222dd22122dd111bb1dddddbcbb6666666666666bccd1ddd11dbddddddddddddddddddd1dd11cc
                    1ddd11d222222d122ddd11bbbbbbbbbcbb66666666666666ccbbbbbbdbbddddddddddddddddddddd1ddcc
                    d1bd11d22211dd12222211bbbbbbbbbc6b66666666666666ccbbbbbbbbd1ddddddddddddddddddd1dddcc
                    dddb11d22211dd122222d1bbddddddbc6b6666666666666bccbddddd1dbddddddddddddddddddb1ddd1cc
                    ddd1bbbbbbbbbbbbb222bbbbddddddbc6b6666666666666bccbdddddddbbbbbbbbbbbbbbbbbbd1ddd1dcc
                    ddddddddddddddddddddddbbbbbbbbbc6b6666666666666bccbbbbbbbbbdddddddddddddddddddddddbcc
                    ddddbbbbbbbbbbbbbbbdbbbd1dddddbcbb6666666666666bccdddddd1dbdbbbbbbbbbbbbbddbddddbccbc
                    bddddbbbbbbbbdbbbbbdddbd1dddddbcb999999999999999ccdddddd1dbdbbbbbbbbbbbbbbbddd11cccc.
                    cbddddddddddddbbddbdddbdddddddbc9999999999999999ccdddddd1dbdbbdddddddddddddddddbcc...
                    ccbdddddddddddddddddddbbddddddbcc666666666666c6cccbdddddddbdddddddddddddddddddccbc...
                    c.cbbbbbbbbbbbbbbbbbbbbbddddddbcccccccccccccccccccbdddddddbbbbbbbbbbbbbbbbbbbbcbc....
                    ..ccccccccccccccccccccccccccccccc.cccccc.......cccccccccbccccccccccccccccccccccc.....
                    ......................cccccccccc.................cccccccccc..........................
                `, SpriteKind.Structure)
                tiles.placeOnTile(mySprite, value3)
                mySprite.x += 3
                mySprite.y += -32
                for (let i = value3.column - 3; i < 4 + value3.column; i++) {
                    for (let j = value3.row - 4; j < value3.row + 1; j++) {
                        tiles.setWallAt(new tiles.Location(i, j, game.currentScene().tileMap), true);
                    }
                }
                tiles.setWallAt(value3,false);
            }
        }
        if (door4 && !door4.equals(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)) {
            for (let value4 of tiles.getTilesByType(door4)) {
                let mySprite = sprites.create(img`
                    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222.
                    22dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd222
                    2dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd22
                    dddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222ddd2222
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    ddddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    bdddd22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c
                    bdddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    bdddd2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    bdd222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222e222c
                    bdd22e22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222eee22c
                    d2222eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee222e2c
                    222e22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc22222c
                    22eecccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccce222c
                    222eccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc222c
                    e22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222c222222222222c
                    ceccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                    cbbbbbcc666666ccc666666ccc666666cc88888888ccc44444444444444444444444444444ccc8888c888cc666666cc666666ccc666666cc88888cc
                    cb99bbbc6666666cc666666cc6666666c888888888ccc44444444444444444444444444444cc888888888cc666666cc6666666cc666666cc88898cb
                    cb999bbc6666666cc666666cc6666666c888888888cc444444444444444444444444444444cc8888888888c666668cc6666666cc6666666888998cb
                    cb999bbc6666666cc666666cc6666666c888888888cc444444444444441114444444444444cc8888888888c666668cc666666bcc6b66666888998cc
                    cb199bbc9999999ccb9999bccb9999968888888888ccdd444444441111111111444444444d4c8888888888cc9bb98ccbb999bbcc6966666889999cc
                    cb1199bcbddddbbccdddddbccbddddd8c888999988cbdd44444441111111111114444444dd4c889999988888dddd8ccbdddddbcc8d8ddd8889919cc
                    cb1199bcbbbbbbcccbbbbbbccc888888c889999988cbd4444444111111111111114444444d4c8899999998c888888ccc88888ccc888888c899119cc
                    cb1119bbbbbbbbbbbbbbbbbbc88888888889999988cc4444444441111111111111444444444c8899999b988888888888888888888888888899119cc
                    cb1199999999999999999999999999999899999988cc444444444444411111444444444444cc8899999b999999999999999999999999999899119cc
                    cb1119999999999999999999999999999999999988cc444444444444411111444444444444cc8899999bb9999999999999999999b999999899119cc
                    cb1199889999999998999999999999999999999988cc4d444444111111111b1111444444444c8899999bb9999999999999999999b999999999119cc
                    cb1199888888889988888999989998899999999988cbdd44444441111b11b11111444444dd4c8899999999999999999999999999999999989911bcc
                    cbd119888888888999988888888888888888899988cbdd44444441111111111114444444dd4c8888888899888888889888888899898888889919bcc
                    cbb999888888888888888888888888888888889988cbdd44444444111111111114444444dd4c8888888889888888888888888888888888899999bcc
                    cb9998888888888888888888888888888888888988cbd4444444444111111114444444444d4c8888888888888888888886888888888888888999bcc
                    cb1988888888888888812222212112121112188998cc4444444444444444444444444444444c8888888888888888888888888888888888888891dcc
                    cb9198888888888888812111112112122122188888ccc4eeee444444444444444444444444cc8888888888888888888888888888888888888899bbb
                    cb9998888888888888812122212222121212188888cccccccccccccccccccccccccccccccccc8888888888888888888888888888888888888919bbb
                    cb999999888dd88888812111211112121112188888cccccccccccccccccccccccccccccccccc8d888888ddd8dd888ddddddd8dddd8dd888d89999cc
                    cb19988888888888888122222122221211121888d8cccdbbbccc666666ccc666666ccbbbdccc88888888888888888888888888888888888889919cc
                    cb1199888888888888888888888888888888888888cccddbbbcc666666cc6666666cbbbddccc88888888888888888888888888888888888889119cc
                    cbd119999999999988888888888888888888888888ccc11ddbc6666666cc6666666cbdd11ccc8999999999999999999999999999999999999911bcc
                    .cbd19999999999999999999999999999999999999ccc11ddbc6b66666cc6666666cbdd11ccc899999999999999999999999999999999999991bbc.
                    .ccb999999999999999999999999999999999999988ccd1ddbcbb66666cc6b6b666cbdd1dccc899999999999999999999999999999999999999cc..
                    ..cccccccccccccccccccccccccccccccccccccccccccd1ddbc6b66666cc6b6b666cbdd1dccccccccccccccccccccccccccccccccccccccccccc...
                    ...6cccccccccccccccccccccccccccccccccccccccccddddbcbb66666cc6b6b666cbddddcccccccccccccccccccccccccccccccccccccccccc....
                    ...........................................ccbdddbcbbb99bbcc6bbbbbbcbdddbcc............................................
                    ...........................................ccddbbbcb99999bcc699999bcbbbddcc............................................
                    ...........................................ccddbeecb99999bcc6b9999bceebddcc............................................
                    ...........................................cbdddbbcb99999bcc699999bcbbdddcc............................................
                `, SpriteKind.Structure)
                tiles.placeOnTile(mySprite, value4)
                mySprite.x += 0
                mySprite.y += -32
                for (let i = value4.column - 3; i < 5 + value4.column; i++) {
                    for (let j = value4.row - 4; j < value4.row + 1; j++) {
                        tiles.setWallAt(new tiles.Location(i, j, game.currentScene().tileMap), true);
                    }
                }
                tiles.setWallAt(value4, false);
            }
        }

    }
    //let myTrainer : Trainer = null;

    //% group="Create"
    //% blockId=creatures_setTrainer 
    //% block="make player creature trainer with starter %starter || Sprite: %player=screen_image_picker Moving Up Animation %moveUp=animation_editor Moving Down Animation %moveDown=animation_editor Moving Left Animation %moveLeft=animation_editor Moving Right Animation %moveRight=animation_editor"
    //% expandableArgumentMode=toggle
    //% blockSetVariable=myTrainer
    //% weight=97 
    export function makeCreatureTrainer(starter: StarterPokemon, player?: Image, moveUp?: Image[], moveDown?: Image[], moveLeft?: Image[], moveRight?: Image[]): Trainer {
        let myPlayer = null;
        if (!player) {
            myPlayer = sprites.create(img`
                . . . . f f f f . . . . .
                . . f f f f f f f f . . .
                . f f f f f f c f f f . .
                f f f f f f c c f f f c .
                f f f c f f f f f f f c .
                c c c f f f e e f f c c .
                f f f f f e e f f c c f .
                f f f b f e e f b f f f .
                . f 4 1 f 4 4 f 1 4 f . .
                . f e 4 4 4 4 4 4 e f . .
                . f f f e e e e f f f . .
                f e f b 7 7 7 7 b f e f .
                e 4 f 7 7 7 7 7 7 f 4 e .
                e e f 6 6 6 6 6 6 f e e .
                . . . f f f f f f . . . .
                . . . f f . . f f . . . .
            `, SpriteKind.Player)
        } else {
            myPlayer = sprites.create(player, SpriteKind.Player)
        }
        if (!moveDown) {
            characterAnimations.loopFrames(
                myPlayer,
                [img`
        . . . . f f f f . . . . . 
        . . f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f f f c c f f f c . 
        f f f c f f f f f f f c . 
        c c c f f f e e f f c c . 
        f f f f f e e f f c c f . 
        f f f b f e e f b f f f . 
        . f 4 1 f 4 4 f 1 4 f . . 
        . f e 4 4 4 4 4 4 e f . . 
        . f f f e e e e f f f . . 
        f e f b 7 7 7 7 b f e f . 
        e 4 f 7 7 7 7 7 7 f 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f f f f f f f . . 
        . . f f f f f f c f f f . 
        f f f f f f f c c f f f c 
        f f f f c f f f f f f f c 
        . c c c f f f e e f f c c 
        . f f f f f e e f f c c f 
        . f f f b f e e f b f f f 
        . f f 4 1 f 4 4 f 1 4 f f 
        . . f e 4 4 4 4 4 e e f e 
        . f e f b 7 7 7 e 4 4 4 e 
        . e 4 f 7 7 7 7 e 4 4 e . 
        . . . f 6 6 6 6 6 e e . . 
        . . . f f f f f f f . . . 
        . . . f f f . . . . . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . . f f f f . . . . . 
        . . f f f f f f f f . . . 
        . f f f c f f f f f f . . 
        c f f f c c f f f f f f f 
        c f f f f f f f c f f f f 
        c c f f e e f f f c c c . 
        f c c f f e e f f f f f . 
        f f f b f e e f b f f f . 
        f f 4 1 f 4 4 f 1 4 f f . 
        e f e e 4 4 4 4 4 e f . . 
        e 4 4 4 e 7 7 7 b f e f . 
        . e 4 4 e 7 7 7 7 f 4 e . 
        . . e e 6 6 6 6 6 f . . . 
        . . . f f f f f f f . . . 
        . . . . . . . f f f . . . 
        `],
                160,
                characterAnimations.rule(Predicate.MovingDown)
            )
        } else {
            characterAnimations.loopFrames(myPlayer, moveUp, 160, characterAnimations.rule(Predicate.MovingDown));
        }

        if (!moveUp) {
            characterAnimations.loopFrames(
                myPlayer,
                [img`
        . . . . f f f f . . . . . 
        . . f f c c c c f f . . . 
        . f f c c c c c c f f . . 
        f f c c c c c c c c f f . 
        f f c c f c c c c c c f . 
        f f f f f c c c f c c f . 
        f f f f c c c f c c f f . 
        f f f f f f f f f f f f . 
        f f f f f f f f f f f f . 
        . f f f f f f f f f f . . 
        . f f f f f f f f f f . . 
        f e f f f f f f f f e f . 
        e 4 f 7 7 7 7 7 7 c 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f c c c c f f . . 
        . f f f c c c c c c f f . 
        f f c c c c c c c c c f f 
        f c c c c f c c c c c c f 
        . f f f f c c c c f c c f 
        . f f f f c c f c c c f f 
        . f f f f f f f f f f f f 
        . f f f f f f f f f f f f 
        . . f f f f f f f f f f . 
        . . e f f f f f f f f f . 
        . . e f f f f f f f f e f 
        . . 4 c 7 7 7 7 7 e 4 4 e 
        . . e f f f f f f f e e . 
        . . . f f f . . . . . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f c c c c f f . . 
        . . f f c c c c c c f f . 
        . f f f c c c c c c c f f 
        f f f c c c c c c c c c f 
        f f c c c f c c c c c c f 
        . f f f f f c c c f c f f 
        . f f f f c c f f c f f f 
        . . f f f f f f f f f f f 
        . . f f f f f f f f f f . 
        . . f f f f f f f f f e . 
        . f e f f f f f f f f e . 
        . e 4 4 e 7 7 7 7 7 c 4 . 
        . . e e f f f f f f f e . 
        . . . . . . . . f f f . . 
        `],
                160,
                characterAnimations.rule(Predicate.MovingUp)
            )
        } else {
            characterAnimations.loopFrames(myPlayer, moveUp, 160, characterAnimations.rule(Predicate.MovingUp));
        }

        if (!moveRight) {
            characterAnimations.loopFrames(
                myPlayer,
                [img`
        . . . . . . . . . . . . . 
        . . . f f f f f f . . . . 
        . f f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f c f f f c f f f . 
        f c f f c c f f f c c f f 
        f c c f f f f e f f f f f 
        f f f f f f f e e f f f . 
        f f e e f b f e e f f f . 
        f f e 4 e 1 f 4 4 f f . . 
        . f f f e 4 4 4 4 f . . . 
        . 4 4 4 e e e e f f . . . 
        . e 4 4 e 7 7 7 7 f . . . 
        . f e e f 6 6 6 6 f f . . 
        . f f f f f f f f f f . . 
        . . f f . . . f f f . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . f f f f f f . . . . 
        . f f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f c f f f c f f f . 
        f c f f c c f f f c c f f 
        f c c f f f f e f f f f f 
        f f f f f f f e e f f f . 
        f f e e f b f e e f f . . 
        . f e 4 e 1 f 4 4 f f . . 
        . f f f e e 4 4 4 f . . . 
        . . f e 4 4 e e f f . . . 
        . . f e 4 4 e 7 7 f . . . 
        . f f f e e f 6 6 f f . . 
        . f f f f f f f f f f . . 
        . . f f . . . f f f . . . 
        `, img`
        . . . f f f f f . . . . . 
        . f f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f c f f f c f f . . 
        f c f f c c f f f c c f f 
        f c c f f f f e f f f f f 
        f f f f f f f e e f f f . 
        f f e e f b f e e f f . . 
        . f e 4 e 1 f 4 4 f . . . 
        . f f f e 4 4 4 4 f . . . 
        . . f e e e e e f f . . . 
        . . e 4 4 e 7 7 7 f . . . 
        . . e 4 4 e 7 7 7 f . . . 
        . . f e e f 6 6 6 f . . . 
        . . . f f f f f f . . . . 
        . . . . f f f . . . . . . 
        `],
                160,
                characterAnimations.rule(Predicate.MovingRight)
            )
        } else {
            characterAnimations.loopFrames(myPlayer, moveRight, 160, characterAnimations.rule(Predicate.MovingRight));
        }


        if (!moveLeft) {
            characterAnimations.loopFrames(
                myPlayer,
                [img`
        . . . . . f f f f f . . . 
        . . . f f f f f f f f f . 
        . . f f f c f f f f f f . 
        . . f f c f f f c f f f f 
        f f c c f f f c c f f c f 
        f f f f f e f f f f c c f 
        . f f f e e f f f f f f f 
        . . f f e e f b f e e f f 
        . . . f 4 4 f 1 e 4 e f . 
        . . . f 4 4 4 4 e f f f . 
        . . . f f e e e e e f . . 
        . . . f 7 7 7 e 4 4 e . . 
        . . . f 7 7 7 e 4 4 e . . 
        . . . f 6 6 6 f e e f . . 
        . . . . f f f f f f . . . 
        . . . . . . f f f . . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . . f f f f f f . . . 
        . . . f f f f f f f f f . 
        . . f f f c f f f f f f . 
        . f f f c f f f c f f f f 
        f f c c f f f c c f f c f 
        f f f f f e f f f f c c f 
        . f f f e e f f f f f f f 
        . . f f e e f b f e e f f 
        . . f f 4 4 f 1 e 4 e f . 
        . . . f 4 4 4 e e f f f . 
        . . . f f e e 4 4 e f . . 
        . . . f 7 7 e 4 4 e f . . 
        . . f f 6 6 f e e f f f . 
        . . f f f f f f f f f f . 
        . . . f f f . . . f f . . 
        `, img`
            . . . . . . . . . . . . .
            . . . . f f f f f f . . .
            . . . f f f f f f f f f .
            . . f f f c f f f f f f .
            . f f f c f f f c f f f f
            f f c c f f f c c f f c f
            f f f f f e f f f f c c f
            . f f f e e f f f f f f f
            . f f f e e f b f e e f f
            . . f f 4 4 f 1 e 4 e f f
            . . . f 4 4 4 4 e f f f .
            . . . f f e e e e 4 4 4 .
            . . . f 7 7 7 7 e 4 4 e .
            . . f f 6 6 6 6 f e e f .
            . . f f f f f f f f f f .
            . . . f f f . . . f f . .
        `],
                160,
                characterAnimations.rule(Predicate.MovingLeft)
            )
        } else {
            characterAnimations.loopFrames(myPlayer, moveLeft, 160, characterAnimations.rule(Predicate.MovingLeft));
        }
        if (!moveUp) {
            moveUp = [img`
                . . . . f f f f . . . . .
                . . f f c c c c f f . . .
                . f f c c c c c c f f . .
                f f c c c c c c c c f f .
                f f c c f c c c c c c f .
                f f f f f c c c f c c f .
                f f f f c c c f c c f f .
                f f f f f f f f f f f f .
                f f f f f f f f f f f f .
                . f f f f f f f f f f . .
                . f f f f f f f f f f . .
                f e f f f f f f f f e f .
                e 4 f 7 7 7 7 7 7 c 4 e .
                e e f 6 6 6 6 6 6 f e e .
                . . . f f f f f f . . . .
                . . . f f . . f f . . . .
            `, img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f c c c c f f . . 
        . f f f c c c c c c f f . 
        f f c c c c c c c c c f f 
        f c c c c f c c c c c c f 
        . f f f f c c c c f c c f 
        . f f f f c c f c c c f f 
        . f f f f f f f f f f f f 
        . f f f f f f f f f f f f 
        . . f f f f f f f f f f . 
        . . e f f f f f f f f f . 
        . . e f f f f f f f f e f 
        . . 4 c 7 7 7 7 7 e 4 4 e 
        . . e f f f f f f f e e . 
        . . . f f f . . . . . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f c c c c f f . . 
        . . f f c c c c c c f f . 
        . f f f c c c c c c c f f 
        f f f c c c c c c c c c f 
        f f c c c f c c c c c c f 
        . f f f f f c c c f c f f 
        . f f f f c c f f c f f f 
        . . f f f f f f f f f f f 
        . . f f f f f f f f f f . 
        . . f f f f f f f f f e . 
        . f e f f f f f f f f e . 
        . e 4 4 e 7 7 7 7 7 c 4 . 
        . . e e f f f f f f f e . 
        . . . . . . . . f f f . . 
        `]
        }
        if (!moveDown) {
            moveDown = [img`
        . . . . f f f f . . . . . 
        . . f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f f f c c f f f c . 
        f f f c f f f f f f f c . 
        c c c f f f e e f f c c . 
        f f f f f e e f f c c f . 
        f f f b f e e f b f f f . 
        . f 4 1 f 4 4 f 1 4 f . . 
        . f e 4 4 4 4 4 4 e f . . 
        . f f f e e e e f f f . . 
        f e f b 7 7 7 7 b f e f . 
        e 4 f 7 7 7 7 7 7 f 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . . . f f f f . . . . 
        . . . f f f f f f f f . . 
        . . f f f f f f c f f f . 
        f f f f f f f c c f f f c 
        f f f f c f f f f f f f c 
        . c c c f f f e e f f c c 
        . f f f f f e e f f c c f 
        . f f f b f e e f b f f f 
        . f f 4 1 f 4 4 f 1 4 f f 
        . . f e 4 4 4 4 4 e e f e 
        . f e f b 7 7 7 e 4 4 4 e 
        . e 4 f 7 7 7 7 e 4 4 e . 
        . . . f 6 6 6 6 6 e e . . 
        . . . f f f f f f f . . . 
        . . . f f f . . . . . . . 
        `, img`
            . . . . . . . . . . . . .
            . . . . f f f f . . . . .
            . . f f f f f f f f . . .
            . f f f c f f f f f f . .
            c f f f c c f f f f f f f
            c f f f f f f f c f f f f
            c c f f e e f f f c c c .
            f c c f f e e f f f f f .
            f f f b f e e f b f f f .
            f f 4 1 f 4 4 f 1 4 f f .
            e f e e 4 4 4 4 4 e f . .
            e 4 4 4 e 7 7 7 b f e f .
            . e 4 4 e 7 7 7 7 f 4 e .
            . . e e 6 6 6 6 6 f . . .
            . . . f f f f f f f . . .
            . . . . . . . f f f . . .
        `]
        }
        if (!moveLeft) {
            moveLeft = [img`
        . . . . . f f f f f . . . 
        . . . f f f f f f f f f . 
        . . f f f c f f f f f f . 
        . . f f c f f f c f f f f 
        f f c c f f f c c f f c f 
        f f f f f e f f f f c c f 
        . f f f e e f f f f f f f 
        . . f f e e f b f e e f f 
        . . . f 4 4 f 1 e 4 e f . 
        . . . f 4 4 4 4 e f f f . 
        . . . f f e e e e e f . . 
        . . . f 7 7 7 e 4 4 e . . 
        . . . f 7 7 7 e 4 4 e . . 
        . . . f 6 6 6 f e e f . . 
        . . . . f f f f f f . . . 
        . . . . . . f f f . . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . . f f f f f f . . . 
        . . . f f f f f f f f f . 
        . . f f f c f f f f f f . 
        . f f f c f f f c f f f f 
        f f c c f f f c c f f c f 
        f f f f f e f f f f c c f 
        . f f f e e f f f f f f f 
        . . f f e e f b f e e f f 
        . . f f 4 4 f 1 e 4 e f . 
        . . . f 4 4 4 e e f f f . 
        . . . f f e e 4 4 e f . . 
        . . . f 7 7 e 4 4 e f . . 
        . . f f 6 6 f e e f f f . 
        . . f f f f f f f f f f . 
        . . . f f f . . . f f . . 
        `, img`
            . . . . . . . . . . . . .
            . . . . f f f f f f . . .
            . . . f f f f f f f f f .
            . . f f f c f f f f f f .
            . f f f c f f f c f f f f
            f f c c f f f c c f f c f
            f f f f f e f f f f c c f
            . f f f e e f f f f f f f
            . f f f e e f b f e e f f
            . . f f 4 4 f 1 e 4 e f f
            . . . f 4 4 4 4 e f f f .
            . . . f f e e e e 4 4 4 .
            . . . f 7 7 7 7 e 4 4 e .
            . . f f 6 6 6 6 f e e f .
            . . f f f f f f f f f f .
            . . . f f f . . . f f . .
        `]
        }
        if (!moveRight) {
            moveRight = [img`
        . . . . . . . . . . . . . 
        . . . f f f f f f . . . . 
        . f f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f c f f f c f f f . 
        f c f f c c f f f c c f f 
        f c c f f f f e f f f f f 
        f f f f f f f e e f f f . 
        f f e e f b f e e f f f . 
        f f e 4 e 1 f 4 4 f f . . 
        . f f f e 4 4 4 4 f . . . 
        . 4 4 4 e e e e f f . . . 
        . e 4 4 e 7 7 7 7 f . . . 
        . f e e f 6 6 6 6 f f . . 
        . f f f f f f f f f f . . 
        . . f f . . . f f f . . . 
        `, img`
        . . . . . . . . . . . . . 
        . . . f f f f f f . . . . 
        . f f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f c f f f c f f f . 
        f c f f c c f f f c c f f 
        f c c f f f f e f f f f f 
        f f f f f f f e e f f f . 
        f f e e f b f e e f f . . 
        . f e 4 e 1 f 4 4 f f . . 
        . f f f e e 4 4 4 f . . . 
        . . f e 4 4 e e f f . . . 
        . . f e 4 4 e 7 7 f . . . 
        . f f f e e f 6 6 f f . . 
        . f f f f f f f f f f . . 
        . . f f . . . f f f . . . 
        `, img`
            . . . f f f f f . . . . .
            . f f f f f f f f f . . .
            . f f f f f f c f f f . .
            f f f f c f f f c f f . .
            f c f f c c f f f c c f f
            f c c f f f f e f f f f f
            f f f f f f f e e f f f .
            f f e e f b f e e f f . .
            . f e 4 e 1 f 4 4 f . . .
            . f f f e 4 4 4 4 f . . .
            . . f e e e e e f f . . .
            . . e 4 4 e 7 7 7 f . . .
            . . e 4 4 e 7 7 7 f . . .
            . . f e e f 6 6 6 f . . .
            . . . f f f f f f . . . .
            . . . . f f f . . . . . .
        `]
        }
        let myTrainer = new Trainer("Ash", 0, myPlayer, moveUp, moveDown, moveLeft, moveRight);
        //game.splash(starter)
        myTrainer.addPartyPokemon(makeCreatureFromID(starter, 5, 12000));
        //myTrainer.addPartyPokemon(makeCreatureFromID(150));
        //myTrainer.addPartyPokemon(makeCreatureFromID(1));
        //myTrainer.addPartyPokemon(makeCreatureFromID(4));
        //myTrainer.addPartyPokemon(makeCreatureFromID(7));
        //myTrainer.addPartyPokemon(makeCreatureFromID(88));


        controller.moveSprite(myPlayer, 80, 80)
        myPlayer.z = 90
        tiles.placeOnTile(myPlayer, tiles.getTileLocation(32, 32))
        scene.cameraFollowSprite(myPlayer)
        return myTrainer;
    }

    //% group="Create"
    //% blockId=creatures_setEnemyTrainer 
    //% block="make enemy creature trainer with ids $ids levels $levels || $sprite and name"
    //% expandableArgumentMode=toggle
    //% blockSetVariable=opponent
    //% weight=96 
    export function makeEnemyTrainer(ids: number[], levels: number[], sprite?: Image, name?: string){
        let enemySprite = null;
        if (!sprite){
            enemySprite = sprites.create(img`
                . . . . f f f f . . . .
                . . f f e e e e f f . .
                . f f e e e e e e f f .
                f f f f 4 e e e f f f f
                f f f 4 4 4 e e f f f f
                f f f 4 4 4 4 e e f f f
                f 4 e 4 4 4 4 4 4 e 4 f
                f 4 4 f f 4 4 f f 4 4 f
                f e 4 4 4 4 4 4 4 4 e f
                . f e 4 4 b b 4 4 e f .
                . f f e 4 4 4 4 e f f .
                e 4 f b 1 1 1 1 b f 4 e
                4 d f 1 1 1 1 1 1 f d 4
                4 4 f 6 6 6 6 6 6 f 4 4
                . . . f f f f f f . . .
                . . . f f . . f f . . .
            `, SpriteKind.Enemy);
        } else {
            enemySprite = sprites.create(sprite, SpriteKind.Enemy);
        }
        let trainerName = "Brock";
        if(name){
            trainerName=name;
        }
        enemySprite.setFlag(SpriteFlag.Invisible, true);
        let enemyTrainer = new Trainer(trainerName, 0, enemySprite, [enemySprite.image], [enemySprite.image], [enemySprite.image], [enemySprite.image]);
        //game.splash(starter)
        for(let i = 0; i < ids.length && levels.length; i++) {
            enemyTrainer.addPartyPokemon(makeCreatureFromID(ids[i], levels[i], getXpForLevel(levels[i])));
        }

        return enemyTrainer;
        
    }
    
    //% group="Battle"
    //% blockId=creatures_battleGym
    //% block="make $player=variables_get(myTrainer) battle gym at location $location=variables_get(location)"
    //% weight=70
    export function battleGym(player: Trainer, location: tiles.Location) {

        timer.throttle("gym", 500, function () {
            tiles.setTileAt(location, assets.tile`transparency16`)
            player.sprite.setFlag(SpriteFlag.GhostThroughTiles, true)
            game.showLongText("Welcome to the Gym. Do you wish to battle?", DialogLayout.Bottom)
            story.startCutscene(function () {
                controller.moveSprite(player.sprite, 0, 0)
                pause(200)
                story.showPlayerChoices("Yes", "No")
                scene.centerCameraAt(80, 60)
                pause(200)
                pauseUntil(() => !(story.isMenuOpen()))
                if (story.checkLastAnswer("Yes")) {
                    tiles.placeOnTile(player.sprite, tiles.getTileLocation(location.column, location.row + 1))
                    let gym = player.badges + 1;
                    let gymLeader = null;
                    switch (gym) {
                        case 1:
                            gymLeader = makeEnemyTrainer([74, 95], [12, 14], img`
                    . . . . f f f f . . . .
                    . . f f e e e e f f . .
                    . f f e e e e e e f f .
                    f f f f 4 e e e f f f f
                    f f f 4 4 4 e e f f f f
                    f f f 4 4 4 4 e e f f f
                    f 4 e 4 4 4 4 4 4 e 4 f
                    f 4 4 f f 4 4 f f 4 4 f
                    f e 4 4 4 4 4 4 4 4 e f
                    . f e 4 4 b b 4 4 e f .
                    . f f e 4 4 4 4 e f f .
                    e 4 f b 1 1 1 1 b f 4 e
                    4 d f 1 1 1 1 1 1 f d 4
                    4 4 f 6 6 6 6 6 6 f 4 4
                    . . . f f f f f f . . .
                    . . . f f . . f f . . .
                `, "Brock");
                            break;
                        case 2:
                            gymLeader = makeEnemyTrainer([120, 121], [18, 21], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Misty");
                            break;
                        case 3:
                            gymLeader = makeEnemyTrainer([100, 25, 26], [21, 18, 24], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Lt. Surge");
                            break;
                        case 4:
                            gymLeader = makeEnemyTrainer([71, 114, 45], [29, 24, 29], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Erika");
                            break;
                        case 5:
                            gymLeader = makeEnemyTrainer([109, 89, 109, 110], [37, 39, 37, 43], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Koga");
                            break;
                        case 6:
                            gymLeader = makeEnemyTrainer([64, 122, 49, 65], [38, 37, 38, 43], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Sabrina");
                            break;
                        case 7:
                            gymLeader = makeEnemyTrainer([58, 77, 78, 59], [42, 40, 42, 47], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Blaine");
                            break;
                        case 8:
                            gymLeader = makeEnemyTrainer([111, 51, 31, 34, 112], [45, 42, 44, 45, 50], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Giovanni");
                            break;
                        case 9:
                            gymLeader = makeEnemyTrainer([87, 91, 80, 124, 131], [54, 53, 54, 56, 56], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Lorelei");
                            break;
                        case 10:
                            gymLeader = makeEnemyTrainer([95, 106, 107, 95, 68], [53, 55, 55, 56, 58], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Bruno");
                            break;
                        case 11:
                            gymLeader = makeEnemyTrainer([94, 42, 93, 24, 94], [56, 56, 55, 58, 60], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Agatha");
                            break;
                        case 12:
                            gymLeader = makeEnemyTrainer([130, 148, 148, 142, 149], [58, 56, 56, 60, 62], img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, "Lance");
                            break;
                        case 13:
                            gymLeader = makeEnemyTrainer([18, 65, 112, 59, 130, 9], [61, 59, 61, 63, 61, 65], img`
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                            `, "Gary");
                            break;
                    }
                    if (!gymLeader) {
                        return;
                    }

                    let win = trainerBattleTrainer(player, gymLeader);


                    if (win) {
                        game.showLongText("You defeated the gym! Now battle the next.", DialogLayout.Bottom)
                        controller.moveSprite(player.sprite, 80, 80)
                        player.badges += 1
                        tiles.setTileAt(location, assets.tile`myTile11`)
                        if (player.badges == 14) {
                            game.gameOver(true)
                        }
                    } else {
                        game.showLongText("You lost. Get stronger and try again!", DialogLayout.Bottom)
                        controller.moveSprite(player.sprite, 80, 80)
                        tiles.setTileAt(location, assets.tile`myTile11`)
                    }
                } else {
                    tiles.placeOnTile(player.sprite, tiles.getTileLocation(location.column, location.row + 1))
                    game.showLongText("Not feeling strong enough yet?", DialogLayout.Bottom)
                    controller.moveSprite(player.sprite, 80, 80)
                    tiles.setTileAt(location, assets.tile`myTile11`)
                }
                player.sprite.setFlag(SpriteFlag.GhostThroughTiles, false)
            })
        })

    }

    //% group="Events"
    //% blockId=creatures_overlapGrass
    //% block="Player $sprite=variables_get(sprite) overlap Grass $otherSprite=variables_get(otherSprite) with ids $ids"
    export function overlapGrass(ids: number[], sprite: Sprite, otherSprite: Sprite) {
        // If player is running through grass, run a chance to start a wild battle with a random pokemon from the route list
        if (characterAnimations.matchesRule(sprite, characterAnimations.rule(Predicate.Moving))) {
            timer.throttle("battleChance", 200, function () {
                if (Math.percentChance(15)) {
                    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
                    controller.moveSprite(sprite, 0, 0)
                    const wildCreature = creatures.makeCreatureFromID(
                        ids._pickRandom(), 5, 0
                    )
                    creatures.trainerBattleWild(myTrainer, wildCreature);
                    scene.cameraFollowSprite(sprite)
                    timer.after(500, function () {
                        controller.moveSprite(sprite, 80, 80)
                        //heal pokemon in first slot;
                        myTrainer.partyPokemon[0].hp = myTrainer.partyPokemon[0].maxHP;
                    })
                    timer.after(7000, function () {
                        sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
                    })
                }
            })
            timer.throttle("animateGrass", 160, function () {
                animation.runImageAnimation(
                    otherSprite,
                    [img`
                5 7 5 7 7 7 6 6 6 6 7 7 7 7 7 7 
                7 7 7 7 7 c 6 7 7 6 c 7 7 1 7 7 
                7 7 7 1 c 6 7 5 7 7 6 c 1 7 1 7 
                7 7 6 6 c c 6 5 5 6 c c 6 6 6 7 
                6 6 6 5 5 5 6 7 5 6 5 5 7 6 6 6 
                6 6 7 7 7 5 7 6 7 5 5 7 7 7 7 6 
                7 c c c 6 6 7 6 6 5 7 6 c c 6 7 
                6 c 6 6 6 6 6 c c 6 6 6 6 6 c 6 
                6 6 7 7 7 c c c c c c 7 7 7 6 6 
                6 7 7 7 6 6 c c c c 6 6 7 7 7 6 
                c 6 c c 6 7 6 c c 6 7 6 c c 6 c 
                7 c c 5 5 7 6 7 7 6 7 5 5 c c 1 
                7 c 6 7 5 5 6 7 7 6 5 5 7 6 c d 
                7 6 6 7 7 6 6 5 5 6 6 7 7 6 6 6 
                7 7 6 6 6 6 c 6 7 6 c 6 6 6 6 7 
                7 7 5 6 6 c 7 6 6 6 7 c 6 7 7 7 
                `, img`
                7 7 7 7 6 6 7 6 6 6 c 1 d 6 7 7 
                7 7 1 6 6 7 6 c 6 7 6 c c 6 6 7 
                7 1 7 6 6 7 c 6 7 7 c c 6 6 6 7 
                7 7 1 6 7 7 c 6 7 7 c 5 7 7 6 6 
                7 7 c c 5 7 6 6 7 6 6 5 5 7 6 c 
                7 c 6 c 5 5 7 6 c 6 7 7 5 6 c 7 
                6 6 7 6 6 5 5 6 c c 6 6 6 6 6 6 
                6 7 7 5 5 7 6 c c c c 7 7 5 7 6 
                6 7 5 5 7 6 6 c c c c 7 7 5 6 6 
                6 6 7 6 6 7 7 6 c c 6 6 6 6 c 7 
                7 c 6 c 5 5 6 6 c 6 7 7 5 6 6 c 
                7 7 c c 5 7 6 6 7 6 6 5 5 7 6 6 
                7 7 1 6 5 7 c 6 7 7 c 5 7 7 6 6 
                5 7 7 6 6 7 c 6 7 7 c c 6 6 6 5 
                7 7 7 7 6 6 c c 6 7 6 c c 6 7 7 
                5 7 7 7 6 6 7 6 6 6 c 7 7 7 7 7 
                `, img`
                7 7 7 6 c 7 6 6 6 7 c 6 6 5 7 7 
                7 6 6 6 6 c 6 7 6 c 6 6 6 6 7 7 
                6 6 6 7 7 6 6 5 5 6 6 7 7 6 6 7 
                d c 6 7 5 5 6 7 7 6 5 5 7 6 c 7 
                1 c c 5 5 7 6 7 7 6 7 5 5 c c 7 
                c 6 c c 6 7 6 c c 6 7 6 c c 6 c 
                6 7 7 7 6 6 c c c c 6 6 7 7 7 6 
                6 6 7 7 7 c c c c c c 7 7 7 6 6 
                6 c 6 6 6 6 6 c c 6 6 6 6 6 c 6 
                7 6 c c 6 7 5 6 6 7 6 6 c c c 7 
                6 7 7 7 7 5 5 7 6 7 5 7 7 7 6 6 
                6 6 6 7 5 5 6 5 7 6 5 5 5 6 6 6 
                7 6 6 6 c c 6 5 5 6 c c 6 6 7 7 
                7 1 7 1 c 6 7 7 5 7 6 c 1 7 7 7 
                7 7 1 7 7 c 6 7 7 6 c 7 7 7 7 7 
                7 7 7 7 7 7 6 6 6 6 7 7 7 5 7 5 
                `, img`
                    7 7 7 7 7 c 6 6 6 7 6 6 7 7 7 5
                    7 7 6 c c 6 7 6 c c 6 6 7 7 7 7
                    5 6 6 6 c c 7 7 6 c 7 6 6 7 7 5
                    6 6 7 7 5 c 7 7 6 c 7 5 6 1 7 7
                    6 6 7 5 5 6 6 7 6 6 7 5 c c 7 7
                    c 6 6 5 7 7 6 c 6 6 5 5 c 6 c 7
                    7 c 6 6 6 6 c c 6 7 7 6 6 7 6 6
                    6 6 5 7 7 c c c c 6 6 7 5 5 7 6
                    6 7 5 7 7 c c c c 6 7 5 5 7 7 6
                    6 6 6 6 6 6 c c 6 5 5 6 6 7 6 6
                    7 c 6 5 7 7 6 c 6 7 5 5 c 6 c 7
                    c 6 7 5 5 6 6 7 6 6 7 5 c c 7 7
                    6 6 7 7 5 c 7 7 6 c 7 7 6 1 7 7
                    7 6 6 6 c c 7 7 6 c 7 6 6 7 1 7
                    7 6 6 c c 6 7 6 c 6 7 6 6 1 7 7
                    7 7 6 d 1 c 6 6 6 7 6 6 7 7 7 7
                `],
                    100,
                    false
                )
            })
        }
    }

}// Add your code here
