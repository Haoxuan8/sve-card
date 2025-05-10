import Card from "./Card";
import CardShowcase from "./CardShowcase";
import pkg from "../package.json";
import {craftCHSOptions, cardTypeCHSOptions} from "./config/constant";

const version = pkg.version;

const Constant = {
    craftCHSOptions,
    cardTypeCHSOptions,
};

export {
    Card,
    CardShowcase,
    version,
    
    Constant,
};