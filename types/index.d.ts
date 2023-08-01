import defaultConfig from "../src/config/config";

type Craft = "Dragon" | "Forest" | "Heaven" | "Neutral" | "Abyss" | "Rune" | "Sword";
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
    static defaultConfig: object;

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

declare const version: string;
declare const defaultConfig: object;

declare namespace SVECard {
    export {
        Card,
        version,
    }
}

export = SVECard;
