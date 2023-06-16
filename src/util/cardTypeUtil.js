
// 无攻击与防御
export const getIsNoStatus = (cardType) => {
    return ["Spell", "Amulet", "SpellToken", "AmuletToken"].includes(cardType);
};

export const isToken = (cardType) => {
    return ["AmuletToken", "FollowerToken", "SpellToken"].includes(cardType);
};
