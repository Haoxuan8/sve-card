
// 无攻击与防御
export const isNoStatus = (card) => {
    return ["Leader", "Spell", "SpellEvo", "SpellAdv", "Amulet", "AmuletEvo", "AmuletAdv", "SpellToken", "AmuletToken", "EP"].includes(card.cardType);
};

export const isToken = (card) => {
    return ["AmuletToken", "FollowerToken", "SpellToken"].includes(card.cardType);
};

export const isEvo = (card) => {
    return ["FollowerEvo", "SpellEvo", "AmuletEvo"].includes(card.cardType);
};

export const isAdv = (card) => {
    return ["FollowerAdv", "SpellAdv", "AmuletAdv"].includes(card.cardType);
};

export const isUR = (card) => {
    return card.rarity === "UR";
};

export const isLG = (card) => {
    return card.rarity === "LG";
};

export const isLeader = (card) => {
    return card.cardType === "Leader";
};

export const isFollower = (card) => {
    return ["Follower", "FollowerEvo", "FollowerAdv", "FollowerToken"].includes(card.cardType);
};

export const isSpell = (card) => {
    return ["Spell", "SpellEvo", "SpellAdv", "SpellToken"].includes(card.cardType);
};

export const isAmulet = (card) => {
    return ["Amulet", "AmuletEvo", "AmuletAdv", "AmuletToken"].includes(card.cardType);
};

export const isEP = (card) => {
    return "EP" === card.cardType;
};