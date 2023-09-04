# sve-card

DIY Shadowverse EVOLVE card in browser.

## Example

[gh-pages](https://haoxuan8.github.io/sve-card/)

## Usage

`git clone` this project.

### UMD

```bash
yarn
yarn build
```

```html
<script src="./svecard.min.js"></script>
<script>
    const {Card} = SVECard;
    const canvas = document.getElementById("canvas");
    const card = new Card({
        data: {
            desc: "/quick\n"
                + "お互いのリーダーに1ダメージ。\n"
                + "お互いの場にフォレストバット1体を出す。",
            craft: "Abyss",
            cardType: "Follower",
            imageSrc: "https://svgdb.me/assets/fullart/1086340100.png",
            cost: 6,
            attack: 6,
            defense: 6,
            rarity: "BR",
            race: "眷属",
            name: "眷属への贈り物",
            cardNo: "TE01-001 2023",
        },
        height: 2000,
        canvas,
    });
    card.draw();
</script>
```

Please move `sve-card-asset` to your static directory, ensure `./sve-card-asset/***.png` can be accessed.

### ES Module

```bash
yarn
yarn build-es
```

```javascript
import {Card} from "./sve-card"; // SVECard project path
```

Configure the `rules` how to handle `.png`, `.ttf` and `.css` resources.

### Data Description Icon

| Code       | 日本語　|   中文    |
|------------|:-------:|:-------:|
| /act       | アクト |   横置    |
| /quick     | クイック |   快速    |
| /start     | 起動 |   起动    |
| /fanfare   | ファンファーレ |  入场曲   |
| /lastword  | ラストワード |   谢幕曲   |
| /attack    | 攻撃力 |  攻击力   |
| /defense   | 体力 |  体力    |
| /eat | 食事 |  吃饭    |
| /evo | 進化 |  进化    |
| /cost{0-9} | コスト{0-9} | 花费{0-9} |  
| /costx| コスト10 |  花费10   |
| /forest | エルフ | 妖精 |
| /sword | ロイヤル | 皇家 |
| /heaven | ビショップ | 主教 |
| /rune | ウィッチ | 巫师 |
| /dragon | ドラゴン | 龙族 |
| /abyss | ナイトメア | 梦魇 |
| /neutral | ニュートラル | 中立 |

## Development

```bash
yarn
yarn dev
```

modify `examples/index.html` to see result.

## TODO

- [ ] replace`【`, `】`to image
- [ ] update example page

## Thanks

- [noteRE]() provides card resources.
