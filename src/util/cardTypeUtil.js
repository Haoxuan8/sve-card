
// 无攻击与防御
export const getIsNoStatus = (card) => {
    return ["Spell", "Amulet", "SpellToken", "AmuletToken"].includes(card.cardType);
};

export const isToken = (card) => {
    return ["AmuletToken", "FollowerToken", "SpellToken"].includes(card.cardType);
};

export const isEvo = (card) => {
    return ["FollowerEvo"].includes(card.cardType);
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