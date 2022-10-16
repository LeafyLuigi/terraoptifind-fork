const pylonBiomes = ["Forest", "Hallow", "Caverns", "Desert", "Jungle", "Ocean", "Snow", "Mushroom"]
const pylonBiomesModded = {
    "Astral": {"mod": "Calamity"},
    "Sulphur": {"mod": "Calamity"},
    "Sunken": {"mod": "Calamity"}
}
var pylons = pylonBiomes.concat(Object.keys(pylonBiomesModded))
// Dungeon can be found using Fargo's Mutant with the Abomination as a disliked biome. This bime lacks a pylon in Fargo's Mutant.
// Brimstone Crags is from Calamity and can be found with the Brimstone Witch as a disliked biome. A pylon exists for this biome but lacks any NPC requirements.
// Sky can be seen using Fargo's Mutant with the Mutant, Deviantt or Abominationn with all three loving the biome. This biome lacks a pylon in Fargo's Mutant.
// Sky only appears to affect those three above.
const biomes1 = [
    ["Forest"],             // Effectively a fallback biome
    ["Hallow"],
    ["Caverns"],
    ["Desert"],
    ["Jungle"],
    ["Ocean"],
    ["Snow"],
    ["Mushroom"]
]
const biomes1Modded = {
    "Sky": {"mod": "Fargo's Mutant", "note":"Only applies if NPC has opinion of Sky biome"},
    "Sulphur": {"mod": "Calamity"},
    "Sunken": {"mod": "Calamity"},
    "Astral": {"mod": "Calamity"}
}
var biomes = biomes1.concat(Object.keys(biomes1Modded))

// Location-based biomes:
    // Horizontal
        // Ocean
    // Vertical
        // Caverns (inc underground, underworld)
        // Sky (Not *exactly* modded but doesn't apply in Vanilla)

// Tile-based biomes:
    // Hallow
    // Desert
    // Snow
    // Jungle
    // Mushroom
    
    // Modded
        // Astral
        // Brimstone Crags (doesn't have to be in underworld but generates there)
        // Sunken (can be artificial but generates underground)
        // Sulphur (artificial can be made but location based IS forced however)

const biomes2Natural = [
    ["Hallow", "Caverns"],
    ["Caverns", "Desert"],
    ["Caverns", "Jungle"],
    ["Caverns", "Ocean"],
    ["Caverns", "Snow"],
    ["Caverns", "Mushroom"]
]
const biomes2Easy = [
    ["Hallow", "Desert"],
    ["Hallow", "Jungle"],
    ["Hallow", "Snow"],
    ["Hallow", "Mushroom"]
]
const biomes2Rest = [
    ["Hallow", "Ocean"],
    ["Desert", "Jungle"],
    ["Desert", "Mushroom"],
    ["Desert", "Snow"],
    ["Desert", "Mushroom"],
    ["Jungle", "Ocean"],
    ["Jungle", "Snow"],
    ["Jungle", "Mushroom"],
    ["Ocean", "Snow"],
    ["Ocean", "Mushroom"],
    ["Snow", "Mushroom"]
]

const biomes3Easy = [
    ["Hallow", "Caverns", "Desert"],
    ["Hallow", "Caverns", "Snow"],
    ["Hallow", "Desert", "Ocean"],
    ["Caverns", "Jungle", "Mushroom"]
]
const biomes3Rest = [
    ["Hallow", "Caverns", "Jungle"],
    ["Hallow", "Desert", "Jungle"],
    ["Hallow", "Caverns", "Mushroom"],
    ["Hallow", "Desert", "Snow"],
    ["Hallow", "Desert", "Mushroom"],
    ["Hallow", "Jungle", "Ocean"],
    ["Hallow", "Jungle", "Snow"],
    ["Caverns", "Desert", "Jungle"],
    ["Hallow", "Jungle", "Mushroom"],
    ["Hallow", "Ocean", "Snow"],
    ["Caverns", "Desert", "Snow"],
    ["Caverns", "Desert", "Mushroom"],
    ["Hallow", "Ocean", "Mushroom"],
    ["Caverns", "Jungle", "Snow"],
    ["Hallow", "Snow", "Mushroom"],
    ["Desert", "Jungle", "Snow"],
    ["Caverns", "Snow", "Mushroom"],
    ["Desert", "Jungle", "Mushroom"],
    ["Desert", "Snow", "Mushroom"],
    ["Jungle", "Ocean", "Snow"],
    ["Jungle", "Ocean", "Mushroom"],
    ["Jungle", "Snow", "Mushroom"],
    ["Ocean", "Snow", "Mushroom"]
]

var npcdict = {
    "Guide": {
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Ocean"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Clothier",
            "Zoologist"
        ],
        "dislikes": [
            "Steampunker"
        ],
        "hates": [
            "Painter"
        ],
        "weighting": 1.0
    },
    "Merchant": {
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Golfer",
            "Nurse"
        ],
        "dislikes": [
            "Tax Collector"
        ],
        "hates": [
            "Angler"
        ],
        "weighting": 1.0
    },
    "Zoologist": {
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [
            "Witch Doctor"
        ],
        "likes": [
            "Golfer"
        ],
        "dislikes": [
            "Angler"
        ],
        "hates": [
            "Arms Dealer"
        ],
        "weighting": 1.0
    },
    "Golfer": {
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Caverns"
        ],
        "biomes_hated": [],
        "loves": [
            "Angler"
        ],
        "likes": [
            "Painter",
            "Zoologist"
        ],
        "dislikes": [
            "Pirate"
        ],
        "hates": [
            "Merchant"
        ],
        "weighting": 1.0
    },
    "Nurse": {
        "biomes_loved": [],
        "biomes_liked": [
            "Hallow"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Arms Dealer"
        ],
        "likes": [
            "Wizard"
        ],
        "dislikes": [
            "Dryad",
            "Party Girl"
        ],
        "hates": [
            "Zoologist"
        ],
        "weighting": 1.0
    },
    "Tavernkeep": {
        "biomes_loved": [],
        "biomes_liked": [
            "Hallow"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Demolitionist"
        ],
        "likes": [
            "Goblin Tinkerer"
        ],
        "dislikes": [
            "Guide"
        ],
        "hates": [
            "Dye Trader"
        ],
        "weighting": 1.0
    },
    "Party Girl": {
        "biomes_loved": [],
        "biomes_liked": [
            "Hallow"
        ],
        "biomes_disliked": [
            "Caverns"
        ],
        "biomes_hated": [],
        "loves": [
            "Wizard",
            "Zoologist"
        ],
        "likes": [
            "Stylist"
        ],
        "dislikes": [
            "Merchant"
        ],
        "hates": [
            "Tax Collector"
        ],
        "weighting": 1.0
    },
    "Wizard": {
        "biomes_loved": [],
        "biomes_liked": [
            "Hallow"
        ],
        "biomes_disliked": [
            "Ocean"
        ],
        "biomes_hated": [],
        "loves": [
            "Golfer"
        ],
        "likes": [
            "Merchant"
        ],
        "dislikes": [
            "Witch Doctor"
        ],
        "hates": [
            "Cyborg"
        ],
        "weighting": 1.0
    },
    "Demolitionist": {
        "biomes_loved": [],
        "biomes_liked": [
            "Caverns"
        ],
        "biomes_disliked": [
            "Ocean"
        ],
        "biomes_hated": [],
        "loves": [
            "Tavernkeep"
        ],
        "likes": [
            "Mechanic"
        ],
        "dislikes": [
            "Arms Dealer",
            "Goblin Tinkerer"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Goblin Tinkerer": {
        "biomes_loved": [],
        "biomes_liked": [
            "Caverns"
        ],
        "biomes_disliked": [
            "Jungle"
        ],
        "biomes_hated": [],
        "loves": [
            "Mechanic"
        ],
        "likes": [
            "Dye Trader"
        ],
        "dislikes": [
            "Clothier"
        ],
        "hates": [
            "Stylist"
        ],
        "weighting": 1.0
    },
    "Clothier": {
        "biomes_loved": [],
        "biomes_liked": [
            "Caverns"
        ],
        "biomes_disliked": [
            "Hallow"
        ],
        "biomes_hated": [],
        "loves": [
            "Truffle"
        ],
        "likes": [
            "Tax Collector"
        ],
        "dislikes": [
            "Nurse"
        ],
        "hates": [
            "Mechanic"
        ],
        "weighting": 1.0
    },
    "Dye Trader": {
        "biomes_loved": [],
        "biomes_liked": [
            "Desert"
        ],
        "biomes_disliked": [
            "Forest"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Arms Dealer",
            "Painter"
        ],
        "dislikes": [
            "Steampunker"
        ],
        "hates": [
            "Pirate"
        ],
        "weighting": 1.0
    },
    "Arms Dealer": {
        "biomes_loved": [],
        "biomes_liked": [
            "Desert"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Nurse"
        ],
        "likes": [
            "Steampunker"
        ],
        "dislikes": [
            "Golfer"
        ],
        "hates": [
            "Demolitionist"
        ],
        "weighting": 1.0
    },
    "Steampunker": {
        "biomes_loved": [],
        "biomes_liked": [
            "Desert"
        ],
        "biomes_disliked": [
            "Jungle"
        ],
        "biomes_hated": [],
        "loves": [
            "Cyborg"
        ],
        "likes": [
            "Painter"
        ],
        "dislikes": [
            "Dryad",
            "Wizard",
            "Party Girl"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Dryad": {
        "biomes_loved": [],
        "biomes_liked": [
            "Jungle"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Witch Doctor",
            "Truffle"
        ],
        "dislikes": [
            "Angler"
        ],
        "hates": [
            "Golfer"
        ],
        "weighting": 1.0
    },
    "Painter": {
        "biomes_loved": [],
        "biomes_liked": [
            "Jungle"
        ],
        "biomes_disliked": [
            "Forest"
        ],
        "biomes_hated": [],
        "loves": [
            "Dryad"
        ],
        "likes": [
            "Party Girl"
        ],
        "dislikes": [
            "Truffle",
            "Cyborg"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Witch Doctor": {
        "biomes_loved": [],
        "biomes_liked": [
            "Jungle"
        ],
        "biomes_disliked": [
            "Hallow"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Dryad",
            "Guide"
        ],
        "dislikes": [
            "Nurse"
        ],
        "hates": [
            "Truffle"
        ],
        "weighting": 1.0
    },
    "Stylist": {
        "biomes_loved": [],
        "biomes_liked": [
            "Ocean"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Dye Trader"
        ],
        "likes": [
            "Pirate"
        ],
        "dislikes": [
            "Tavernkeep"
        ],
        "hates": [
            "Goblin Tinkerer"
        ],
        "weighting": 1.0
    },
    "Angler": {
        "biomes_loved": [],
        "biomes_liked": [
            "Ocean"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Demolitionist",
            "Party Girl",
            "Tax Collector"
        ],
        "dislikes": [],
        "hates": [
            "Tavernkeep"
        ],
        "weighting": 1.0
    },
    "Pirate": {
        "biomes_loved": [],
        "biomes_liked": [
            "Ocean"
        ],
        "biomes_disliked": [
            "Caverns"
        ],
        "biomes_hated": [],
        "loves": [
            "Angler"
        ],
        "likes": [
            "Tavernkeep"
        ],
        "dislikes": [
            "Stylist"
        ],
        "hates": [
            "Guide"
        ],
        "weighting": 1.0
    },
    "Mechanic": {
        "biomes_loved": [],
        "biomes_liked": [
            "Snow"
        ],
        "biomes_disliked": [
            "Caverns"
        ],
        "biomes_hated": [],
        "loves": [
            "Goblin Tinkerer"
        ],
        "likes": [
            "Cyborg"
        ],
        "dislikes": [
            "Arms Dealer"
        ],
        "hates": [
            "Clothier"
        ],
        "weighting": 1.0
    },
    "Tax Collector": {
        "biomes_loved": [],
        "biomes_liked": [
            "Snow"
        ],
        "biomes_disliked": [
            "Hallow"
        ],
        "biomes_hated": [],
        "loves": [
            "Merchant"
        ],
        "likes": [
            "Party Girl"
        ],
        "dislikes": [
            "Demolitionist",
            "Mechanic"
        ],
        "hates": [
            "Santa Claus"
        ],
        "weighting": 1.0
    },
    "Cyborg": {
        "biomes_loved": [],
        "biomes_liked": [
            "Snow"
        ],
        "biomes_disliked": [
            "Jungle"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Steampunker",
            "Pirate",
            "Stylist"
        ],
        "dislikes": [
            "Zoologist"
        ],
        "hates": [
            "Wizard"
        ],
        "weighting": 1.0
    },
    "Santa Claus": {
        "biomes_loved": [
            "Snow"
        ],
        "biomes_liked": [],
        "biomes_disliked": [],
        "biomes_hated": [
            "Desert"
        ],
        "loves": [],
        "likes": [],
        "dislikes": [],
        "hates": [
            "Tax Collector"
        ],
        "weighting": 1.0
    },
    "Truffle": {
        "biomes_forced": [
            "Mushroom"
        ],
        "biomes_excluded": [
            "Caverns"
        ],
        "biomes_loved": [],
        "biomes_liked": [
            "Mushroom"
        ],
        "biomes_disliked": [],
        "biomes_hated": [],
        "loves": [
            "Guide"
        ],
        "likes": [
            "Dryad"
        ],
        "dislikes": [
            "Clothier"
        ],
        "hates": [
            "Witch Doctor"
        ],
        "weighting": 1.0
    },
    "Princess": {
        "biomes_loved": [],
        "biomes_liked": [],
        "biomes_disliked": [],
        "biomes_hated": [],
        "loves": [],
        "likes": [],
        "dislikes": [],
        "hates": [],
        "weighting": 1.0
    },
}

// Modded NPCs start here
var npcdictModded = {
    // Magic Storage
    "Automation": {
        "mod": "Magic Storage",
        "biomes_loved": [
            "Snow"
        ],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [
            "Hallow"
        ],
        "loves": [
            "Mechanic"
        ],
        "likes": [
            "Witch Doctor"
        ],
        "dislikes": [
            "Wizard"
        ],
        "hates": [
            "Tax Collector"
        ],
        "weighting": 1.0
    },

    // Gensokyo
    "Curio Trader": {
        "mod": "Gensokyo",
        "biomes_loved": [],
        "biomes_liked": [
            "Forest",
            "Snow"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [
            "Caverns"
        ],
        "loves": [],
        "likes": [
            "Goblin Tinkerer",
            "Princess",
            "Zoologist"
        ],
        "dislikes": [
            "Guide",
            "Party Girl"
        ],
        "hates": [],
        "weighting": 1.0
    },

    // Fargo's Mutant
    "Squirrel": {
        "mod": "Fargo's Mutant",
        "biomes_loved": [
            "Forest"
        ],
        "biomes_liked": [],
        "biomes_disliked": [],
        "biomes_hated": [
            "Caverns"
        ],
        "loves": [],
        "likes": [
            "LumberJack",
        ],
        "dislikes": [],
        "hates": [],
        "weighting": 1.0
    },
    "Mutant": {
        "mod": "Fargo's Mutant",
        "biomes_loved": [
            "Sky"
        ],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Hallow"
        ],
        "biomes_hated": [],
        "loves": [
            "Abominationn"
        ],
        "likes": [
            "Deviantt"
        ],
        "dislikes": [
            "LumberJack",
        ],
        "hates": [],
        "weighting": 1.0
    },
    "LumberJack": {
        "mod": "Fargo's Mutant",
        "biomes_loved": [
            "Forest"
        ],
        "biomes_liked": [],
        "biomes_disliked": [],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Squirrel"
        ],
        "dislikes": [
            "Dryad",
        ],
        "hates": [
            "Demolitionist"
        ],
        "weighting": 1.0
    },
    "Deviantt": {
        "mod": "Fargo's Mutant",
        "biomes_loved": [
            "Sky"
        ],
        "biomes_liked": [
            "Jungle"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [
            "Desert"
        ],
        "loves": [
            "Mutant"
        ],
        "likes": [
            "Abominationn"
        ],
        "dislikes": [
            "Zoologist",
        ],
        "hates": [
            "Angler"
        ],
        "weighting": 1.0
    },
    // Abomination dislikes the Dungeon but since that biome sorta acts similar to the evils, it's been excluded.
    "Abominationn": {
        "mod": "Fargo's Mutant",
        "biomes_loved": [
            "Sky"
        ],
        "biomes_liked": [
            "Ocean"
        ],
        "biomes_disliked": [],
        "biomes_hated": [],
        "loves": [
            "Mutant"
        ],
        "likes": [
            "Deviantt"
        ],
        "dislikes": [],
        "hates": [
            "Nurse"
        ],
        "weighting": 1.0
    },

    // Calamity's Vanities
    "Oracle": {
        "mod": "Calamity's Vanities",
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Zoologist"
        ],
        "dislikes": [
            "Arms Dealer"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Jelly Priestess": {
        "mod": "Calamity's Vanities",
        "biomes_loved": [
            "Ocean"
        ],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Painter"
        ],
        "dislikes": [
            "Demolitionist"
        ],
        "hates": [],
        "weighting": 1.0
    },
    // Currently commented out as no idea how to obtain without cheats nor have I tested it
    // "Jungle Tyrant": {
    //     "mod": "Calamity's Vanities",
    //     "biomes_loved": [],
    //     "biomes_liked": [],
    //     "biomes_disliked": [],
    //     "biomes_hated": [],
    //     "loves": [],
    //     "likes": [],
    //     "dislikes": [],
    //     "hates": [],
    //     "weighting": 1.0
    // },

    // Bags
    "Bag Manipulator": {
        "mod": "Bags",
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Jungle"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [],
        "dislikes": [],
        "hates": [],
        "weighting": 1.0
    },
    "Bag Expert": {
        "mod": "Bags",
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [],
        "dislikes": [],
        "hates": [],
        "weighting": 1.0
    },

    // Anime Vanity & Pets
    "Speedwagon": {
        "mod": "Anime Vanity & Pets",
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [
            "Stylist"
        ],
        "likes": [
            "Clothier"
        ],
        "dislikes": [
            "Merchant"
        ],
        "hates": [
            "Demolitionist"
        ],
        "weighting": 1.0
    },

    // AlchemistNPC Lite
    "Young Brewer": {
        "mod": "AlchemistNPC Lite",
        "biomes_loved": [
            "Forest"
        ],
        "biomes_liked": [
            "Desert"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Brewer"
        ],
        "likes": [
            "Alchemist"
        ],
        "dislikes": [
            "Goblin Tinkerer"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Tinkerer": {
        "mod": "AlchemistNPC Lite",
        "biomes_loved": [
            "Snow"
        ],
        "biomes_liked": [
            "Caverns"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [
            "Steampunker"
        ],
        "likes": [
            "Mechanic"
        ],
        "dislikes": [
            "Dye Trader"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Operator": {
        "mod": "AlchemistNPC Lite",
        "biomes_loved": [
            "Snow"
        ],
        "biomes_liked": [
            "Ocean"
        ],
        "biomes_disliked": [
            "Caverns"
        ],
        "biomes_hated": [],
        "loves": [
            "Cyborg"
        ],
        "likes": [
            "Steampunker"
        ],
        "dislikes": [
            "Clothier"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Musician": {
        "mod": "AlchemistNPC Lite",
        "biomes_loved": [
            "Hallow"
        ],
        "biomes_liked": [
            "Underground"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Party Girl"
        ],
        "likes": [
            "Wizard"
        ],
        "dislikes": [
            "Goblin Tinkerer"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Jeweler": {
        "mod": "AlchemistNPC Lite",
        "biomes_loved": [
            "Forest"
        ],
        "biomes_liked": [
            "Jungle"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Merchant"
        ],
        "likes": [
            "Tax Collector"
        ],
        "dislikes": [
            "Party Girl"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Brewer": {
        "mod": "AlchemistNPC Lite",
        "biomes_loved": [
            "Forest"
        ],
        "biomes_liked": [
            "Jungle"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Young Brewer"
        ],
        "likes": [
            "Alchemist"
        ],
        "dislikes": [
            "Witch Doctor"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Architect": {
        "mod": "AlchemistNPC Lite",
        "biomes_loved": [
            "Jungle"
        ],
        "biomes_liked": [
            "Ocean"
        ],
        "biomes_disliked": [
            "Snow"
        ],
        "biomes_hated": [],
        "loves": [
            "Painter"
        ],
        "likes": [
            "Goblin Tinkerer"
        ],
        "dislikes": [
            "Tax Collector"
        ],
        "hates": [],
        "weighting": 1.0
    },

    // Calamity
    // Brimstone Witch dislikes the Brimstone Crags but due to the Pylon not requiring any NPCs nearby, it's been excluded from calculations
    "Brimstone Witch": {
        "mod": "Calamity",
        "biomes_loved": [],
        "biomes_liked": [
            "Forest"
        ],
        "biomes_disliked": [],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Clothier"
        ],
        "dislikes": [
            "Party Girl"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Bandit": {
        "mod": "Calamity",
        "biomes_loved": [],
        "biomes_liked": [
            "Desert"
        ],
        "biomes_disliked": [
            "Jungle"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Goblin Tinkerer"
        ],
        "dislikes": [
            "Dryad"
        ],
        "hates": [],
        "weighting": 1.0
    },
    "Sea King": {
        "mod": "Calamity",
        "biomes_loved": [],
        "biomes_liked": [
            "Ocean"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Pirate"
        ],
        "dislikes": [
            "Demolitionist"
        ],
        "hates": [
            "Angler"
        ],
        "weighting": 1.0
    },
    "Drunk Princess": {
        "mod": "Calamity",
        "biomes_loved": [
            "Hallow"
        ],
        "biomes_liked": [
            "Ocean"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [
            "Caverns"
        ],
        "loves": [
            "Stylist",
            "Zoologist"
        ],
        "likes": [
            "Truffle",
            "Party Girl"
        ],
        "dislikes": [
            "Tavernkeep",
            "Tax Collector"
        ],
        "hates": [
            "Goblin Tinkerer",
            "Angler"
        ],
        "weighting": 1.0
    },
    "Archmage": {
        "mod": "Calamity",
        "biomes_loved": [],
        "biomes_liked": [
            "Snow"
        ],
        "biomes_disliked": [
            "Desert"
        ],
        "biomes_hated": [],
        "loves": [],
        "likes": [
            "Wizard"
        ],
        "dislikes": [
            "Cyborg"
        ],
        "hates": [],
        "weighting": 1.0
    },
}

var npcs = Object.keys(npcdict).concat(Object.keys(npcdictModded))