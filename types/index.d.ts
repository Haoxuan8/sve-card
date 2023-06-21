
type Craft = "Dragon" | "Forest" | "Heaven" | "Neutral" | "Nightmare" | "Rune" | "Sword";
type CardType = "Follower" | "FollowerEvo" | "Spell" | "Amulet" | "Leader" | "AmuletToken" | "SpellToken" | "FollowerToken";
type Rarity = "BR" | "SR" | "GR" | "LG" | "UR";

interface CardData {
    name: string;
    imageSrc: string;
    cardType: CardType;
    craft: Craft;
    rarity: Rarity;
    attack?: number;
    defense?: number;
    cost?: number;
    desc?: string;
    cardNo?: string;
    copyright?: string;
}

declare class Card {
    constructor(params: {
        data: CardData,
        canvas: HTMLCanvasElement,
        height: number,
    });

    draw();

    setData(data: Partial<CardData>);
    setSize(size: number[]);
    setConfig(config: object);
}

declare namespace SVECard {
    export {
        Card,
    }
}

export = SVECard;
