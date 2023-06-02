
type Craft = "Dragon" | "Forest" | "Heaven" | "Neutral" | "Nightmare" | "Rune" | "Sword";
type CardType = "Follower" | "FollowerEvo" | "Spell" | "Amulet" | "Leader" | "AmuletToken" | "SpellToken" | "FollowerToken";
type Rare = "BR" | "SR" | "GR" | "LG" | "SL" | "UR";

interface CardData {
    name: string;
    imageSrc: string;
    cardType: CardType;
    craft: Craft;
    rare: Rare;
    attack?: number;
    defend?: number;
    desc?: string;
}

declare class Card {
    constructor(params: {
        data: CardData,
        canvas: HTMLCanvasElement,
    });
}

declare namespace SVECard {
    export {
        Card,
    }
}

export = SVECard;
