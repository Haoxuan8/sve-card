import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import {forEach, isEmpty} from "lodash";

const hashCode = s => s.split("").reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0);

class Annotator {
    kuroshiro = null;
    previousDictPath = null;

    constructor(config) {
        this.config = config;
    }

    initKuroshiro = async () => {
        const path = this.config.kuroshiro.dictPath;
        if (this.kuroshiro == null && this.previousDictPath !== path) {
            this.kuroshiro = new Kuroshiro();
            this.previousDictPath = path;
            await this.kuroshiro.init(new KuromojiAnalyzer({dictPath: path}));
        }
    };

    annotateAsync = async (text) => {
        if (window && window.DOMParser) {
            await this.initKuroshiro();
            const result = await this.kuroshiro.convert(text, {mode: "furigana", to: "hiragana"});
            const parser = new window.DOMParser();
            const doc = parser.parseFromString(result, "text/html");
            const nodes = [];
            forEach(doc.body.childNodes, node => {
                let formattedNode;
                if (node.nodeName === "RUBY") {
                    formattedNode = {
                        type: "RUBY",
                        text: node.childNodes[0].nodeValue,
                        annotation: node.childNodes[2].innerText,
                    };
                } else {
                    formattedNode = {
                        type: "TEXT",
                        text: node.nodeValue,
                    };
                }
                nodes.push(formattedNode);
            });
            return nodes;
        }
        return text;
    };

    previousHashCode = null;
    previousResult = null;
    // TODO: 目前每次渲染只能同时调用一次此任务
    annotate = (text, callback) => {
        const hashCodeText = hashCode(text);
        if (hashCodeText === this.previousHashCode && this.previousResult != null) {
            return this.previousResult;
        }
        this.annotateAsync(text).then((res) => {
            this.previousResult = res;
            this.previousHashCode = hashCodeText;
            if (typeof callback === "function") callback();
        });
        return text;
    };
}

export default Annotator;