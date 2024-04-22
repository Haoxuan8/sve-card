import {defaultsDeep} from "lodash";
import path from "path-browserify";

const frameMap = {
    Dragon: {
        Leader: "image/leader/dragon.png",
        Follower: {
            normal: "image/dragon/dragon.png",
            LG: "image/dragon/dragon_LG.png",
            UR: "image/dragon/dragon_UR.png",
            tarot: "image/dragon/dragon_tarot.png",
        },
        FollowerEvo: {
            normal: "image/dragon/dragon_evo.png",
            LG: "image/dragon/dragon_evo_LG.png",
            UR: "image/dragon/dragon_evo_UR.png",
            tarot: "image/dragon/dragon_evo_tarot.png",
            tarotReverse: "image/dragon/dragon_evo_tarot_reverse.png",
        },
        FollowerAdv: {
            normal: "image/dragon/dragon_adv.png",
            LG: "image/dragon/dragon_adv.png",
            UR: "image/dragon/dragon_adv.png",
            tarot: "image/dragon/dragon_adv_tarot.png",
        },
        Spell: {
            normal: "image/dragon/dragon_spell.png",
            LG: "image/dragon/dragon_spell_LG.png",
            UR: "image/dragon/dragon_spell_UR.png",
            tarot: "image/dragon/dragon_spell_tarot.png",
        },
        Amulet: {
            normal: "image/dragon/dragon_amulet.png",
            LG: "image/dragon/dragon_amulet_LG.png",
            UR: "image/dragon/dragon_amulet_UR.png",
            tarot: "image/dragon/dragon_amulet_tarot.png",
        },
        AmuletToken: "image/dragon/dragon_amulet_token.png",
        SpellToken: "image/dragon/dragon_spell_token.png",
        FollowerToken: "image/dragon/dragon_token.png",
        showcase: "image/dragon/dragon_showcase.png",
    },
    Forest: {
        Leader: "image/leader/forest.png",
        Follower: {
            normal: "image/forest/forest.png",
            LG: "image/forest/forest_LG.png",
            UR: "image/forest/forest_UR.png",
            tarot: "image/forest/forest_tarot.png",
        },
        FollowerEvo: {
            normal: "image/forest/forest_evo.png",
            LG: "image/forest/forest_evo_LG.png",
            UR: "image/forest/forest_evo_UR.png",
            tarot: "image/forest/forest_evo_tarot.png",
            tarotReverse: "image/forest/forest_evo_tarot_reverse.png",
        },
        FollowerAdv: {
            normal: "image/forest/forest_adv.png",
            LG: "image/forest/forest_adv.png",
            UR: "image/forest/forest_adv.png",
            tarot: "image/forest/forest_adv_tarot.png",
        },
        Spell: {
            normal: "image/forest/forest_spell.png",
            LG: "image/forest/forest_spell_LG.png",
            UR: "image/forest/forest_spell_UR.png",
            tarot: "image/forest/forest_spell_tarot.png",
        },
        Amulet: {
            normal: "image/forest/forest_amulet.png",
            LG: "image/forest/forest_amulet_LG.png",
            UR: "image/forest/forest_amulet_UR.png",
            tarot: "image/forest/forest_amulet_tarot.png",
        },
        AmuletToken: "image/forest/forest_amulet_token.png",
        SpellToken: "image/forest/forest_spell_token.png",
        FollowerToken: "image/forest/forest_token.png",
        showcase: "image/forest/forest_showcase.png",
    },
    Haven: {
        Leader: "image/leader/haven.png",
        Follower: {
            normal: "image/haven/haven.png",
            LG: "image/haven/haven_LG.png",
            UR: "image/haven/haven_UR.png",
            tarot: "image/haven/haven_tarot.png",
            tarotReverse: "image/haven/haven_evo_tarot_reverse.png",
        },
        FollowerEvo: {
            normal: "image/haven/haven_evo.png",
            LG: "image/haven/haven_evo_LG.png",
            UR: "image/haven/haven_evo_UR.png",
            tarot: "image/haven/haven_evo_tarot.png",
        },
        FollowerAdv: {
            normal: "image/haven/haven_adv.png",
            LG: "image/haven/haven_adv.png",
            UR: "image/haven/haven_adv.png",
            tarot: "image/haven/haven_adv_tarot.png",
        },
        Spell: {
            normal: "image/haven/haven_spell.png",
            LG: "image/haven/haven_spell_LG.png",
            UR: "image/haven/haven_spell_UR.png",
            tarot: "image/haven/haven_spell_tarot.png",
        },
        Amulet: {
            normal: "image/haven/haven_amulet.png",
            LG: "image/haven/haven_amulet_LG.png",
            UR: "image/haven/haven_amulet_UR.png",
            tarot: "image/haven/haven_amulet_tarot.png",
        },
        AmuletToken: "image/haven/haven_amulet_token.png",
        SpellToken: "image/haven/haven_spell_token.png",
        FollowerToken: "image/haven/haven_token.png",
        showcase: "image/haven/haven_showcase.png",
    },
    Neutral: {
        Leader: "image/leader/neutral.png",
        Follower: {
            normal: "image/neutral/neutral.png",
            LG: "image/neutral/neutral_LG.png",
            UR: "image/neutral/neutral_UR.png",
            tarot: "image/neutral/neutral_tarot.png",
        },
        FollowerEvo: {
            normal: "image/neutral/neutral_evo.png",
            LG: "image/neutral/neutral_evo_LG.png",
            UR: "image/neutral/neutral_evo_UR.png",
            tarot: "image/neutral/neutral_evo_tarot.png",
            tarotReverse: "image/neutral/neutral_evo_tarot_reverse.png",
        },
        FollowerAdv: {
            normal: "image/neutral/neutral_adv.png",
            LG: "image/neutral/neutral_adv.png",
            UR: "image/neutral/neutral_adv.png",
            tarot: "image/neutral/neutral_adv_tarot.png",
        },
        Spell: {
            normal: "image/neutral/neutral_spell.png",
            LG: "image/neutral/neutral_spell_LG.png",
            UR: "image/neutral/neutral_spell_UR.png",
            tarot: "image/neutral/neutral_spell_tarot.png",
        },
        Amulet: {
            normal: "image/neutral/neutral_amulet.png",
            LG: "image/neutral/neutral_amulet_LG.png",
            UR: "image/neutral/neutral_amulet_UR.png",
            tarot: "image/neutral/neutral_amulet_tarot.png",
        },
        AmuletToken: "image/neutral/neutral_amulet_token.png",
        SpellToken: "image/neutral/neutral_spell_token.png",
        FollowerToken: "image/neutral/neutral_token.png",
        showcase: "image/neutral/neutral_showcase.png",
        EP: "image/neutral/evolve_point.png",
    },
    Abyss: {
        Leader: "image/leader/abyss.png",
        Follower: {
            normal: "image/abyss/abyss.png",
            LG: "image/abyss/abyss_LG.png",
            UR: "image/abyss/abyss_UR.png",
            tarot: "image/abyss/abyss_tarot.png",
        },
        FollowerEvo: {
            normal: "image/abyss/abyss_evo.png",
            LG: "image/abyss/abyss_evo_LG.png",
            UR: "image/abyss/abyss_evo_UR.png",
            tarot: "image/abyss/abyss_evo_tarot.png",
            tarotReverse: "image/abyss/abyss_evo_tarot_reverse.png",
        },
        FollowerAdv: {
            normal: "image/abyss/abyss_adv.png",
            LG: "image/abyss/abyss_adv.png",
            UR: "image/abyss/abyss_adv.png",
            tarot: "image/abyss/abyss_adv_tarot.png",
        },
        Spell: {
            normal: "image/abyss/abyss_spell.png",
            LG: "image/abyss/abyss_spell_LG.png",
            UR: "image/abyss/abyss_spell_UR.png",
            tarot: "image/abyss/abyss_spell_tarot.png",
        },
        Amulet: {
            normal: "image/abyss/abyss_amulet.png",
            LG: "image/abyss/abyss_amulet_LG.png",
            UR: "image/abyss/abyss_amulet_UR.png",
            tarot: "image/abyss/abyss_amulet_tarot.png",
        },
        AmuletToken: "image/abyss/abyss_amulet_token.png",
        SpellToken: "image/abyss/abyss_spell_token.png",
        FollowerToken: "image/abyss/abyss_token.png",
        showcase: "image/abyss/abyss_showcase.png",
    },
    Rune: {
        Leader: "image/leader/rune.png",
        Follower: {
            normal: "image/rune/rune.png",
            LG: "image/rune/rune_LG.png",
            UR: "image/rune/rune_UR.png",
            tarot: "image/rune/rune_tarot.png",
        },
        FollowerEvo: {
            normal: "image/rune/rune_evo.png",
            LG: "image/rune/rune_evo_LG.png",
            UR: "image/rune/rune_evo_UR.png",
            tarot: "image/rune/rune_evo_tarot.png",
            tarotReverse: "image/rune/rune_evo_tarot_reverse.png",
        },
        FollowerAdv: {
            normal: "image/rune/rune_adv.png",
            LG: "image/rune/rune_adv.png",
            UR: "image/rune/rune_adv.png",
            tarot: "image/rune/rune_adv_tarot.png",
        },
        Spell: {
            normal: "image/rune/rune_spell.png",
            LG: "image/rune/rune_spell_LG.png",
            UR: "image/rune/rune_spell_UR.png",
            tarot: "image/rune/rune_spell_tarot.png",
        },
        Amulet: {
            normal: "image/rune/rune_amulet.png",
            LG: "image/rune/rune_amulet_LG.png",
            UR: "image/rune/rune_amulet_UR.png",
            tarot: "image/rune/rune_amulet_tarot.png",
        },
        AmuletToken: "image/rune/rune_amulet_token.png",
        SpellToken: "image/rune/rune_spell_token.png",
        FollowerToken: "image/rune/rune_token.png",
        showcase: "image/rune/rune_showcase.png",
    },
    Sword: {
        Leader: "image/leader/sword.png",
        Follower: {
            normal: "image/sword/sword.png",
            LG: "image/sword/sword_LG.png",
            UR: "image/sword/sword_UR.png",
            tarot: "image/sword/sword_tarot.png",
        },
        FollowerEvo: {
            normal: "image/sword/sword_evo.png",
            LG: "image/sword/sword_evo_LG.png",
            UR: "image/sword/sword_evo_UR.png",
            tarot: "image/sword/sword_evo_tarot.png",
            tarotReverse: "image/sword/sword_evo_tarot_reverse.png",
        },
        FollowerAdv: {
            normal: "image/sword/sword_adv.png",
            LG: "image/sword/sword_adv.png",
            UR: "image/sword/sword_adv.png",
            tarot: "image/sword/sword_adv_tarot.png",
        },
        Spell: {
            normal: "image/sword/sword_spell.png",
            LG: "image/sword/sword_spell_LG.png",
            UR: "image/sword/sword_spell_UR.png",
            tarot: "image/sword/sword_spell_tarot.png",
        },
        Amulet: {
            normal: "image/sword/sword_amulet.png",
            LG: "image/sword/sword_amulet_LG.png",
            UR: "image/sword/sword_amulet_UR.png",
            tarot: "image/sword/sword_amulet_tarot.png",
        },
        AmuletToken: "image/sword/sword_amulet_token.png",
        SpellToken: "image/sword/sword_spell_token.png",
        FollowerToken: "image/sword/sword_token.png",
        showcase: "image/sword/sword_showcase.png",
    },
};

export const cardTypeMap = {
    follower: {
        src: "image/desc/follower.png",
        height: 50,
        width: 153,
    },
    spell: {
        src: "image/desc/spell.png",
        height: 50,
        width: 155,
    },
    amulet: {
        src: "image/desc/amulet.png",
        height: 50,
        width: 153,
    },
    evolve: {
        src: "image/desc/evolve.png",
        height: 43,
        width: 124,
    },
    token: {
        src: "image/desc/token.png",
        height: 50,
        width: 149,
    },
    advance: {
        src: "image/desc/advance.png",
        height: 46,
        width: 153,
    },
};

const defaultOptions = {
};

export const getFrame = (data, options = {}) => {
    defaultsDeep(options, defaultOptions);
    const getPath = p => path.join(options.assetPath, p);

    if (data.cardType === "EP") {
        return getPath(frameMap["Neutral"]["EP"]);
    }

    const craft = frameMap[data.craft];
    const isLG = data.rarity === "LG";
    const isUR = data.rarity === "UR";
    const isTarot = data.cardStyle === "Tarot" || data.cardStyle === "TarotReverse";
    if (data.cardType === "Leader") {
        return getPath(craft[data.cardType]);
    } else {
        if (["AmuletToken", "SpellToken", "FollowerToken"].includes(data.cardType)) {
            return getPath(craft[data.cardType]);
        } else if (["Spell", "Amulet", "Follower", "FollowerEvo", "FollowerAdv"].includes(data.cardType)) {
            const obj = craft[data.cardType];
            let key;
            if (isTarot && !isUR) {
                key = "tarot";
                if (data.cardStyle === "TarotReverse" && data.cardType === "FollowerEvo") key = "tarotReverse";
            } else {
                key = isLG ? "LG" : isUR ? "UR" : "normal";
            }
            return getPath(obj[key]);
        }
    }
};

export const getShowcaseFrame = (data, options) => {
    defaultsDeep(options, defaultOptions);
    const getPath = p => path.join(options.assetPath, p);
    const craft = frameMap[data.craft];
    return getPath(craft["showcase"]);
};
