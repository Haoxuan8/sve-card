import DragonPng from "../asset/image/dragon/dragon.png";
import DragonEvoPng from "../asset/image/dragon/dragon_evo.png";
import DragonLGPng from "../asset/image/dragon/dragon_LG.png";
import DragonEvoLGPng from "../asset/image/dragon/dragon_evo_LG.png";
import DragonTokenPng from "../asset/image/dragon/dragon_token.png";
import DragonSpellTokenPng from "../asset/image/dragon/dragon_spell_token.png";
import DragonAmuletTokenPng from "../asset/image/dragon/dragon_amulet_token.png";
import DragonSpellPng from "../asset/image/dragon/dragon_spell.png";
import DragonSpellLGPng from "../asset/image/dragon/dragon_spell_LG.png";
import DragonAmuletPng from "../asset/image/dragon/dragon_amulet.png";
import DragonAmuletLGPng from "../asset/image/dragon/dragon_amulet_LG.png";
import mergeDeep from "./mergeDeep";

const frameMap = {
    Dragon: {
        Follower: {
            normal: DragonPng,
            LG: DragonLGPng,
        },
        FollowerEvo: {
            normal: DragonEvoPng,
            LG: DragonEvoLGPng,
        },
        Spell: {
            normal: DragonSpellPng,
            LG: DragonSpellLGPng,
        },
        Amulet: {
            normal: DragonAmuletPng,
            LG: DragonAmuletLGPng,
        },
        AmuletToken: DragonAmuletTokenPng,
        SpellToken: DragonSpellTokenPng,
        FollowerToken: DragonTokenPng,
    },
    Forest: {

    },
    Heaven: {

    },
    Neutral: {

    },
    Nightmare: {

    },
    Rune: {

    },
    Sword: {

    },
};

const defaultOptions = {
};

const getFrame = (data, _options = {}) => {
    const options = mergeDeep(_options, defaultOptions);
    const craft = frameMap[data.craft];
    const isLG = data.rare === "LG";
    if (data.cardType === "Leader") {

    } else {
        if (["AmuletToken", "SpellToken", "FollowerToken"].includes(data.cardType)) {
            return craft[data.cardType];
        } else if (["Spell", "Amulet", "Follower", "FollowerEvo"].includes(data.cardType)) {
            return craft[data.cardType][isLG ? "LG" : "normal"];
        }
    }
};

export default getFrame;
