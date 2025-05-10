import _ from "lodash";

export const crafts = ["Dragon", "Forest", "Haven", "Neutral", "Abyss", "Rune", "Sword"];
export const cardTypes = ["Follower", "FollowerEvo", "FollowerAdv", "Spell", "SpellEvo", "SpellAdv", "Amulet", "AmuletEvo", "AmuletAdv", "Leader", "FollowerToken", "SpellToken", "AmuletToken", "EP"];

export const craftJPMap = {
    Abyss: "ナイトメア",
    Dragon: "ドラゴン",
    Rune: "ウィッチ",
    Haven: "ビショップ",
    Sword: "ロイヤル",
    Forest: "エルフ",
    Neutral: "ニュートラル",
};

export const craftCHSMap = {
    Abyss: "梦魇",
    Dragon: "龙族",
    Rune: "巫师",
    Haven: "主教",
    Sword: "皇家护卫",
    Forest: "妖精",
    Neutral: "中立",
};

export const cardTypeCHSMap = {
    Follower: "从者",
    FollowerEvo: "从者·进化",
    FollowerAdv: "从者·高等",
    Spell: "法术",
    SpellEvo: "法术·进化",
    SpellAdv: "法术·高等",
    Amulet: "护符",
    AmuletEvo: "护符·进化",
    AmuletAdv: "护符·高等",
    Leader: "主战者",
    FollowerToken: "随从·衍生物",
    SpellToken: "法术·衍生物",
    AmuletToken: "护符·衍生物",
    EP: "进化点",
};


export const craftCHSOptions = _.map(crafts, it => ({
    value: it,
    label: craftCHSMap[it],
}));

export const cardTypeCHSOptions = _.map(cardTypes, it => ({
    value: it,
    label: cardTypeCHSMap[it],
}));