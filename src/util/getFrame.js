import {defaultsDeep} from "lodash";
import path from "path-browserify";

const frameMap = {
    Dragon: {
        Leader: "image/leader/dragon.png",
        Follower: {
            normal: "image/dragon/dragon.png",
            LG: "image/dragon/dragon_LG.png",
            UR: "image/dragon/dragon_UR.png",
        },
        FollowerEvo: {
            normal: "image/dragon/dragon_evo.png",
            LG: "image/dragon/dragon_evo_LG.png",
            UR: "image/dragon/dragon_evo_UR.png",
        },
        Spell: {
            normal: "image/dragon/dragon_spell.png",
            LG: "image/dragon/dragon_spell_LG.png",
            UR: "image/dragon/dragon_spell_UR.png",
        },
        Amulet: {
            normal: "image/dragon/dragon_amulet.png",
            LG: "image/dragon/dragon_amulet_LG.png",
            UR: "image/dragon/dragon_amulet_UR.png",
        },
        AmuletToken: "image/dragon/dragon_amulet_token.png",
        SpellToken: "image/dragon/dragon_spell_token.png",
        FollowerToken: "image/dragon/dragon_token.png",
    },
    Forest: {
        Leader: "image/leader/forest.png",
        Follower: {
            normal: "image/forest/forest.png",
            LG: "image/forest/forest_LG.png",
            UR: "image/forest/forest_UR.png",
        },
        FollowerEvo: {
            normal: "image/forest/forest_evo.png",
            LG: "image/forest/forest_evo_LG.png",
            UR: "image/forest/forest_evo_UR.png",
        },
        Spell: {
            normal: "image/forest/forest_spell.png",
            LG: "image/forest/forest_spell_LG.png",
            UR: "image/forest/forest_spell_UR.png",
        },
        Amulet: {
            normal: "image/forest/forest_amulet.png",
            LG: "image/forest/forest_amulet_LG.png",
            UR: "image/forest/forest_amulet_UR.png",
        },
        AmuletToken: "image/forest/forest_amulet_token.png",
        SpellToken: "image/forest/forest_spell_token.png",
        FollowerToken: "image/forest/forest_token.png",
    },
    Heaven: {
        Leader: "image/leader/heaven.png",
        Follower: {
            normal: "image/heaven/heaven.png",
            LG: "image/heaven/heaven_LG.png",
            UR: "image/heaven/heaven_UR.png",
        },
        FollowerEvo: {
            normal: "image/heaven/heaven_evo.png",
            LG: "image/heaven/heaven_evo_LG.png",
            UR: "image/heaven/heaven_evo_UR.png",
        },
        Spell: {
            normal: "image/heaven/heaven_spell.png",
            LG: "image/heaven/heaven_spell_LG.png",
            UR: "image/heaven/heaven_spell_UR.png",
        },
        Amulet: {
            normal: "image/heaven/heaven_amulet.png",
            LG: "image/heaven/heaven_amulet_LG.png",
            UR: "image/heaven/heaven_amulet_UR.png",
        },
        AmuletToken: "image/heaven/heaven_amulet_token.png",
        SpellToken: "image/heaven/heaven_spell_token.png",
        FollowerToken: "image/heaven/heaven_token.png",
    },
    Neutral: {
        Leader: "image/leader/neutral.png",
        Follower: {
            normal: "image/neutral/neutral.png",
            LG: "image/neutral/neutral_LG.png",
            UR: "image/neutral/neutral_UR.png",
        },
        FollowerEvo: {
            normal: "image/neutral/neutral_evo.png",
            LG: "image/neutral/neutral_evo_LG.png",
            UR: "image/neutral/neutral_evo_UR.png",
        },
        Spell: {
            normal: "image/neutral/neutral_spell.png",
            LG: "image/neutral/neutral_spell_LG.png",
            UR: "image/neutral/neutral_spell_UR.png",
        },
        Amulet: {
            normal: "image/neutral/neutral_amulet.png",
            LG: "image/neutral/neutral_amulet_LG.png",
            UR: "image/neutral/neutral_amulet_UR.png",
        },
        AmuletToken: "image/neutral/neutral_amulet_token.png",
        SpellToken: "image/neutral/neutral_spell_token.png",
        FollowerToken: "image/neutral/neutral_token.png",
    },
    Abyss: {
        Leader: "image/leader/abyss.png",
        Follower: {
            normal: "image/abyss/abyss.png",
            LG: "image/abyss/abyss_LG.png",
            UR: "image/abyss/abyss_UR.png",
        },
        FollowerEvo: {
            normal: "image/abyss/abyss_evo.png",
            LG: "image/abyss/abyss_evo_LG.png",
            UR: "image/abyss/abyss_evo_UR.png",
        },
        Spell: {
            normal: "image/abyss/abyss_spell.png",
            LG: "image/abyss/abyss_spell_LG.png",
            UR: "image/abyss/abyss_spell_UR.png",
        },
        Amulet: {
            normal: "image/abyss/abyss_amulet.png",
            LG: "image/abyss/abyss_amulet_LG.png",
            UR: "image/abyss/abyss_amulet_UR.png",
        },
        AmuletToken: "image/abyss/abyss_amulet_token.png",
        SpellToken: "image/abyss/abyss_spell_token.png",
        FollowerToken: "image/abyss/abyss_token.png",
    },
    Rune: {
        Leader: "image/leader/rune.png",
        Follower: {
            normal: "image/rune/rune.png",
            LG: "image/rune/rune_LG.png",
            UR: "image/rune/rune_UR.png",
        },
        FollowerEvo: {
            normal: "image/rune/rune_evo.png",
            LG: "image/rune/rune_evo_LG.png",
            UR: "image/rune/rune_evo_UR.png",
        },
        Spell: {
            normal: "image/rune/rune_spell.png",
            LG: "image/rune/rune_spell_LG.png",
            UR: "image/rune/rune_spell_UR.png",
        },
        Amulet: {
            normal: "image/rune/rune_amulet.png",
            LG: "image/rune/rune_amulet_LG.png",
            UR: "image/rune/rune_amulet_UR.png",
        },
        AmuletToken: "image/rune/rune_amulet_token.png",
        SpellToken: "image/rune/rune_spell_token.png",
        FollowerToken: "image/rune/rune_token.png",
    },
    Sword: {
        Leader: "image/leader/sword.png",
        Follower: {
            normal: "image/sword/sword.png",
            LG: "image/sword/sword_LG.png",
            UR: "image/sword/sword_UR.png",
        },
        FollowerEvo: {
            normal: "image/sword/sword_evo.png",
            LG: "image/sword/sword_evo_LG.png",
            UR: "image/sword/sword_evo_UR.png",
        },
        Spell: {
            normal: "image/sword/sword_spell.png",
            LG: "image/sword/sword_spell_LG.png",
            UR: "image/sword/sword_spell_UR.png",
        },
        Amulet: {
            normal: "image/sword/sword_amulet.png",
            LG: "image/sword/sword_amulet_LG.png",
            UR: "image/sword/sword_amulet_UR.png",
        },
        AmuletToken: "image/sword/sword_amulet_token.png",
        SpellToken: "image/sword/sword_spell_token.png",
        FollowerToken: "image/sword/sword_token.png",
    },
};

const defaultOptions = {
};

const getFrame = (data, options = {}) => {
    defaultsDeep(options, defaultOptions);
    const getPath = p => path.join(options.assetPath, p);

    const craft = frameMap[data.craft];
    const isLG = data.rarity === "LG";
    const isUR = data.rarity === "UR";
    if (data.cardType === "Leader") {
        return getPath(craft[data.cardType]);
    } else {
        if (["AmuletToken", "SpellToken", "FollowerToken"].includes(data.cardType)) {
            return getPath(craft[data.cardType]);
        } else if (["Spell", "Amulet", "Follower", "FollowerEvo"].includes(data.cardType)) {
            return getPath(craft[data.cardType][isLG ? "LG" : isUR ? "UR" : "normal"]);
        }
    }
};

export default getFrame;
