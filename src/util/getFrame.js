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
import NightmarePng from "../asset/image/nightmare/nightmare.png";
import NightmareEvoPng from "../asset/image/nightmare/nightmare_evo.png";
import NightmareLGPng from "../asset/image/nightmare/nightmare_LG.png";
import NightmareEvoLGPng from "../asset/image/nightmare/nightmare_evo_LG.png";
import NightmareTokenPng from "../asset/image/nightmare/nightmare_token.png";
import NightmareSpellTokenPng from "../asset/image/nightmare/nightmare_spell_token.png";
import NightmareAmuletTokenPng from "../asset/image/nightmare/nightmare_amulet_token.png";
import NightmareSpellPng from "../asset/image/nightmare/nightmare_spell.png";
import NightmareSpellLGPng from "../asset/image/nightmare/nightmare_spell_LG.png";
import NightmareAmuletPng from "../asset/image/nightmare/nightmare_amulet.png";
import NightmareAmuletLGPng from "../asset/image/dragon/dragon_amulet_LG.png";
import RunePng from "../asset/image/rune/rune.png";
import RuneEvoPng from "../asset/image/rune/rune_evo.png";
import RuneLGPng from "../asset/image/rune/rune_LG.png";
import RuneEvoLGPng from "../asset/image/rune/rune_evo_LG.png";
import RuneTokenPng from "../asset/image/rune/rune_token.png";
import RuneSpellTokenPng from "../asset/image/rune/rune_spell_token.png";
import RuneAmuletTokenPng from "../asset/image/rune/rune_amulet_token.png";
import RuneSpellPng from "../asset/image/rune/rune_spell.png";
import RuneSpellLGPng from "../asset/image/rune/rune_spell_LG.png";
import RuneAmuletPng from "../asset/image/rune/rune_amulet.png";
import RuneAmuletLGPng from "../asset/image/rune/rune_amulet_LG.png";
import SwordPng from "../asset/image/sword/sword.png";
import SwordEvoPng from "../asset/image/sword/sword_evo.png";
import SwordLGPng from "../asset/image/sword/sword_LG.png";
import SwordEvoLGPng from "../asset/image/sword/sword_evo_LG.png";
import SwordTokenPng from "../asset/image/sword/sword_token.png";
import SwordSpellTokenPng from "../asset/image/sword/sword_spell_token.png";
import SwordAmuletTokenPng from "../asset/image/sword/sword_amulet_token.png";
import SwordSpellPng from "../asset/image/sword/sword_spell.png";
import SwordSpellLGPng from "../asset/image/sword/sword_spell_LG.png";
import SwordAmuletPng from "../asset/image/sword/sword_amulet.png";
import SwordAmuletLGPng from "../asset/image/sword/sword_amulet_LG.png";
import NeutralPng from "../asset/image/neutral/neutral.png";
import NeutralEvoPng from "../asset/image/neutral/neutral_evo.png";
import NeutralLGPng from "../asset/image/neutral/neutral_LG.png";
import NeutralEvoLGPng from "../asset/image/neutral/neutral_evo_LG.png";
import NeutralTokenPng from "../asset/image/neutral/neutral_token.png";
import NeutralSpellTokenPng from "../asset/image/neutral/neutral_spell_token.png";
import NeutralAmuletTokenPng from "../asset/image/neutral/neutral_amulet_token.png";
import NeutralSpellPng from "../asset/image/neutral/neutral_spell.png";
import NeutralSpellLGPng from "../asset/image/neutral/neutral_spell_LG.png";
import NeutralAmuletPng from "../asset/image/neutral/neutral_amulet.png";
import NeutralAmuletLGPng from "../asset/image/neutral/neutral_amulet_LG.png";
import HeavenPng from "../asset/image/heaven/heaven.png";
import HeavenEvoPng from "../asset/image/heaven/heaven_evo.png";
import HeavenLGPng from "../asset/image/heaven/heaven_LG.png";
import HeavenEvoLGPng from "../asset/image/heaven/heaven_evo_LG.png";
import HeavenTokenPng from "../asset/image/heaven/heaven_token.png";
import HeavenSpellTokenPng from "../asset/image/heaven/heaven_spell_token.png";
import HeavenAmuletTokenPng from "../asset/image/heaven/heaven_amulet_token.png";
import HeavenSpellPng from "../asset/image/heaven/heaven_spell.png";
import HeavenSpellLGPng from "../asset/image/heaven/heaven_spell_LG.png";
import HeavenAmuletPng from "../asset/image/heaven/heaven_amulet.png";
import HeavenAmuletLGPng from "../asset/image/heaven/heaven_amulet_LG.png";
import ForestPng from "../asset/image/forest/forest.png";
import ForestEvoPng from "../asset/image/forest/forest_evo.png";
import ForestLGPng from "../asset/image/forest/forest_LG.png";
import ForestEvoLGPng from "../asset/image/forest/forest_evo_LG.png";
import ForestTokenPng from "../asset/image/forest/forest_token.png";
import ForestSpellTokenPng from "../asset/image/forest/forest_spell_token.png";
import ForestAmuletTokenPng from "../asset/image/forest/forest_amulet_token.png";
import ForestSpellPng from "../asset/image/forest/forest_spell.png";
import ForestSpellLGPng from "../asset/image/forest/forest_spell_LG.png";
import ForestAmuletPng from "../asset/image/forest/forest_amulet.png";
import ForestAmuletLGPng from "../asset/image/forest/forest_amulet_LG.png";
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
        Follower: {
            normal: ForestPng,
            LG: ForestLGPng,
        },
        FollowerEvo: {
            normal: ForestEvoPng,
            LG: ForestEvoLGPng,
        },
        Spell: {
            normal: ForestSpellPng,
            LG: ForestSpellLGPng,
        },
        Amulet: {
            normal: ForestAmuletPng,
            LG: ForestAmuletLGPng,
        },
        AmuletToken: ForestAmuletTokenPng,
        SpellToken: ForestSpellTokenPng,
        FollowerToken: ForestTokenPng,
    },
    Heaven: {
        Follower: {
            normal: HeavenPng,
            LG: HeavenLGPng,
        },
        FollowerEvo: {
            normal: HeavenEvoPng,
            LG: HeavenEvoLGPng,
        },
        Spell: {
            normal: HeavenSpellPng,
            LG: HeavenSpellLGPng,
        },
        Amulet: {
            normal: HeavenAmuletPng,
            LG: HeavenAmuletLGPng,
        },
        AmuletToken: HeavenAmuletTokenPng,
        SpellToken: HeavenSpellTokenPng,
        FollowerToken: HeavenTokenPng,
    },
    Neutral: {
        Follower: {
            normal: NeutralPng,
            LG: NeutralLGPng,
        },
        FollowerEvo: {
            normal: NeutralEvoPng,
            LG: NeutralEvoLGPng,
        },
        Spell: {
            normal: NeutralSpellPng,
            LG: NeutralSpellLGPng,
        },
        Amulet: {
            normal: NeutralAmuletPng,
            LG: NeutralAmuletLGPng,
        },
        AmuletToken: NeutralAmuletTokenPng,
        SpellToken: NeutralSpellTokenPng,
        FollowerToken: NeutralTokenPng,
    },
    Nightmare: {
        Follower: {
            normal: NightmarePng,
            LG: NightmareLGPng,
        },
        FollowerEvo: {
            normal: NightmareEvoPng,
            LG: NightmareEvoLGPng,
        },
        Spell: {
            normal: NightmareSpellPng,
            LG: NightmareSpellLGPng,
        },
        Amulet: {
            normal: NightmareAmuletPng,
            LG: NightmareAmuletLGPng,
        },
        AmuletToken: NightmareAmuletTokenPng,
        SpellToken: NightmareSpellTokenPng,
        FollowerToken: NightmareTokenPng,
    },
    Rune: {
        Follower: {
            normal: RunePng,
            LG: RuneLGPng,
        },
        FollowerEvo: {
            normal: RuneEvoPng,
            LG: RuneEvoLGPng,
        },
        Spell: {
            normal: RuneSpellPng,
            LG: RuneSpellLGPng,
        },
        Amulet: {
            normal: RuneAmuletPng,
            LG: RuneAmuletLGPng,
        },
        AmuletToken: RuneAmuletTokenPng,
        SpellToken: RuneSpellTokenPng,
        FollowerToken: RuneTokenPng,
    },
    Sword: {
        Follower: {
            normal: SwordPng,
            LG: SwordLGPng,
        },
        FollowerEvo: {
            normal: SwordEvoPng,
            LG: SwordEvoLGPng,
        },
        Spell: {
            normal: SwordSpellPng,
            LG: SwordSpellLGPng,
        },
        Amulet: {
            normal: SwordAmuletPng,
            LG: SwordAmuletLGPng,
        },
        AmuletToken: SwordAmuletTokenPng,
        SpellToken: SwordSpellTokenPng,
        FollowerToken: SwordTokenPng,
    },
};

const defaultOptions = {
};

const getFrame = (data, _options = {}) => {
    const options = mergeDeep(_options, defaultOptions);
    const craft = frameMap[data.craft];
    const isLG = data.rarity === "LG";
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
