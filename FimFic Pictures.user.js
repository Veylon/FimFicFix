// ==UserScript==
// @name         FimFic Pictures
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replace Character Tags with Pictures
// @author       Veylon
// @grant        none
// @include      https://www.fimfiction.net/*
// @run-at document-end
// ==/UserScript==

function getCharacterTags()
{
    console.log("Getting Character Tags");
    return document.querySelectorAll("a.tag-character");
}

function getPictureName(datatag)
{
        switch(datatag) {
            case "applejack-eqg":
                return "applejack-eg";
            case "big-macintosh":
                return "big_mac";
            case "bonbon":
                return "bon_bon";
            case "cheerilee":
                return "cherilee";
            case "cutie-mark-crusaders":
                return "cmc";
            case "dj-p0n3":
                return "dj_pon3";
            case "fluttershy-eqg":
                return "fluttershy-eg";
            case "iron-will":
                return "ironwill";
            case "main-7-eqg":
                return "main-7-eg";
            case "original-character":
                return "oc";
            case "pinkie-pie-eqg":
                return "pinkie-pie-eg";
            case "princess-cadance":
                return "cadance";
            case "princess-celestia":
                return "celestia";
            case "rainbow-dash-eqg":
                return "rainbow-dash-eg";
            case "rarity-eqg":
                return "rarity-eg";
            case "screwball":
                return "screwball head";
            case "shadowbolts-eqg":
                return "shadowbolts-eg";
            case "spike-eqg":
                return "spike-eg";
            case "twilight-sparkle-eqg":
                return "twilight-sparkle-eg";                
            case "adagio-dazzle":
            case "aria-blaze":
            case "bat-pony":
            case "bulk-biceps":
            case "button-mash":
            case "chancellor-puddinghead":
            case "cloud-chaser":
            case "clover-the-clever":
            case "coco-pommel":
            case "commander-hurricane":
            case "coriander-cumin":
            case "dean-cadance":
            case "filthy-rich":
            case "flurry-heart":
            case "fluttershy-eg":
            case "gloriosa-daisy":
            case "indigo-zap":
            case "lemon-zest":
            case "limestone-pie":
            case "main-7-eg":
            case "mane-iac":
            case "marble-pie":
            case "micro-chips":
            case "midnight-sparkle":
            case "moonlight-raven":
            case "mr-stripes":
            case "night-glider":
            case "nightmare-rarity":
            case "parcel-post":
            case "party-favor":
            case "pinkie-pie-eg":
            case "plaid-stripes":
            case "pony-joe":
            case "princess-amore":
            case "princess-platinum":
            case "principal-celestia":
            case "principal-cinch":
            case "private-pansy":
            case "quibble-pants":
            case "radiant-hope":
            case "rarity-eg":
            case "royal-guard":
            case "ruby-pinch":
            case "saffron-masala":
            case "sassy-saddles":
            case "self-insert":
            case "sky-stinger":
            case "smart-cookie":
            case "sonata-dusk":
            case "sour-sweet":
            case "spike-eg":
            case "spoiled-rich":
            case "starlight-glimmer":
            case "starswirl-the-bearded":
            case "steven-magnet":
            case "sugar-belle":
            case "sunny-flare":
            case "sunset-shimmer-demon":
            case "sunshine-smiles":
            case "suri-polomare":
            case "tender-taps":
            case "the-dazzlings":
            case "the-smooze":
            case "timber-spruce":
            case "trouble-shoes":
            case "twinkle-shine":
            case "vapor-trail":
            case "vice-principal-luna":
            case "white-lightning":
            case "wind-rider":
            case "zephyr-breeze":
                return datatag;
             default:
                return datatag.replace("-","_").replace("-","_");
        }
}

function swapForPictures(tags)
{
    console.log("swapForPictures");
    console.log("Tags Found: " + tags.length);
    var i;
    for (i = 0; i < tags.length; i++) {
        var picname = getPictureName(tags[i].getAttribute('data-tag'));
        tags[i].innerHTML = "<img src='//static.fimfiction.net/images/characters/" + picname + ".png'>";
    }
}

console.log("Running Script");
swapForPictures(getCharacterTags());