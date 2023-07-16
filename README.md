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
            craft: "Nightmare",
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

| Code       |   中文    |
|------------|:-------:|
| /act       |   横置    |
| /quick     |   快速    |
| /start     |   起动    |
| /fanfare   |   入场曲   |
| /lastword  |   谢幕曲   |
| /attack    |   攻击力   |
| /defense   |   体力    |
| /eat |   吃饭    |
| /evo |   进化    |
| /cost{0-9} | 花费{0-9} |  
| /costx|  花费10   |

## Development

```bash
yarn
yarn dev
```

modify `examples/index.html` to see result.

## Thanks

- [noteRE]() provides card resources.
