
interface CardData {
    name: string;
    imageSrc: string;
    cardType: string;
    craft: string;
    attack?: number;
    defend?: number;
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
