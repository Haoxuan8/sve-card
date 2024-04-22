import defaultConfig from "../src/config/config";

type Craft = "Dragon" | "Forest" | "Haven" | "Neutral" | "Abyss" | "Rune" | "Sword";
type CardType = "Follower" | "FollowerEvo" | "FollowerAdv" | "Spell" | "Amulet" | "Leader" | "AmuletToken" | "SpellToken" | "FollowerToken" | "EP";
type Rarity = "BR" | "SR" | "GR" | "LG" | "UR";
type CardStyle = "Normal" | "Tarot" | "TarotReverse";


interface CardData {
    name: string;
    cardStyle: CardStyle;
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
    speech?: string;
    race?: string;
}

interface FromImage {
    src: string;
    height: number;
    width: number;
}

interface CardShowcaseData {
    tip?: string;
    tokenTip?: string;
    fromImage?: FromImage;
}

declare class Card {
    static defaultConfig: object;
    static defaultEPData: object;

    constructor(params: {
        data: CardData,
        canvas: HTMLCanvasElement,
        height: number,
        config: object,
    });

    draw();

    setData(data: Partial<CardData>);
    setSize(size: number[]);
    setConfig(config: object);
}

declare const version: string;

declare class CardShowcase {
    static defaultConfig: object;
    static defaultTip: string;

    constructor(params: {
        cardData: CardData,
        canvas: HTMLCanvasElement,
        showcaseData: CardShowcaseData,
        height: number,
        config: object,
        showcaseConfig: object,
    });

    setShowcaseData(data: object);
    setCardData(data: Partial<CardData>);
    setCardConfig(config: object);
    setShowcaseConfig(config: object);
    setSize(size: number[]);

    draw();
}

declare namespace SVECard {
    export {
        Card,
        CardShowcase,
        version,
    }
}

export = SVECard;
