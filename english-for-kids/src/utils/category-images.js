//categories
import actionA from '../assets/images/run.jpg';
import actionB from '../assets/images/skip.jpg';
import actionC from '../assets/images/dive.jpg';
import animalA from '../assets/images/bird.jpg';
import animalB from '../assets/images/cat.jpg';
import adjectives from '../assets/images/turtle.jpg';
import emotions from '../assets/images/happy.jpg';
import clothes from '../assets/images/blouse.jpg';

//words
//['actionA','actionB','actionC','animalA','animalB','adjectives','emotions','clothes']
import cat11 from '../assets/images/cry.jpg';
import cat12 from '../assets/images/dance.jpg';
import cat13 from '../assets/images/dive.jpg';
import cat14 from '../assets/images/draw.jpg';
import cat15 from '../assets/images/fish.jpg';
import cat16 from '../assets/images/fly.jpg';
import cat17 from '../assets/images/hug.jpg';
import cat18 from '../assets/images/jump.jpg';

import cat21 from '../assets/images/open.jpg';
import cat22 from '../assets/images/play.jpg';
import cat23 from '../assets/images/point.jpg';
import cat24 from '../assets/images/ride.jpg';
import cat25 from '../assets/images/run.jpg';
import cat26 from '../assets/images/sing.jpg';
import cat27 from '../assets/images/skip.jpg';
import cat28 from '../assets/images/swim.jpg';

import cat31 from '../assets/images/argue.jpg';
import cat32 from '../assets/images/build.jpg';
import cat33 from '../assets/images/carry.jpg';
import cat34 from '../assets/images/catch.jpg';
import cat35 from '../assets/images/drive.jpg';
import cat36 from '../assets/images/drop.jpg';
import cat37 from '../assets/images/pull.jpg';
import cat38 from '../assets/images/push.jpg';

import cat41 from '../assets/images/big.jpg';
import cat42 from '../assets/images/small.jpg';
import cat43 from '../assets/images/fast.jpg';
import cat44 from '../assets/images/slow.jpg';
import cat45 from '../assets/images/friendly.jpg';
import cat46 from '../assets/images/unfriendly.jpg';
import cat47 from '../assets/images/young.jpg';
import cat48 from '../assets/images/old.jpg';

import cat51 from '../assets/images/cat.jpg';
import cat52 from '../assets/images/chick.jpg';
import cat53 from '../assets/images/chicken.jpg';
import cat54 from '../assets/images/dog.jpg';
import cat55 from '../assets/images/horse.jpg';
import cat56 from '../assets/images/pig.jpg';
import cat57 from '../assets/images/rabbit.jpg';
import cat58 from '../assets/images/sheep.jpg';

import cat61 from '../assets/images/bird.jpg';
import cat62 from '../assets/images/fish.jpg';
import cat63 from '../assets/images/frog.jpg';
import cat64 from '../assets/images/giraffe.jpg';
import cat65 from '../assets/images/lion.jpg';
import cat66 from '../assets/images/mouse.jpg';
import cat67 from '../assets/images/turtle.jpg';
import cat68 from '../assets/images/dolphin.jpg';

import cat71 from '../assets/images/skirt.jpg';
import cat72 from '../assets/images/pants.jpg';
import cat73 from '../assets/images/blouse.jpg';
import cat74 from '../assets/images/dress.jpg';
import cat75 from '../assets/images/boot.jpg';
import cat76 from '../assets/images/shirt.jpg';
import cat77 from '../assets/images/coat.jpg';
import cat78 from '../assets/images/shoe.jpg';

import cat81 from '../assets/images/sad.jpg';
import cat82 from '../assets/images/angry.jpg';
import cat83 from '../assets/images/happy.jpg';
import cat84 from '../assets/images/tired.jpg';
import cat85 from '../assets/images/surprised.jpg';
import cat86 from '../assets/images/scared.jpg';
import cat87 from '../assets/images/smile.jpg';
import cat88 from '../assets/images/laugh.jpg';
export default function images() {
    const allImages = {};
    allImages.catImg = [];
    allImages.catName = [];
    allImages.innerImg = {
        actionA : [cat11,cat12,cat13,cat14,cat15,cat16,cat17,cat18],
        actionB : [cat21,cat22,cat23,cat24,cat25,cat26,cat27,cat28],
        actionC : [cat31,cat32,cat33,cat34,cat35,cat36,cat37,cat38],
        adjectives : [cat41,cat42,cat43,cat44,cat45,cat46,cat47,cat48],
        animalA : [cat51,cat52,cat53,cat54,cat55,cat56,cat57,cat58],
        animalB : [cat61,cat62,cat63,cat64,cat65,cat66,cat67,cat68],
        clothes : [cat71,cat72,cat73,cat74,cat75,cat76,cat77,cat78],
        emotions : [cat81,cat82,cat83,cat84,cat85,cat86,cat87,cat88]
    };

    const cat1 = new Image;
    cat1.src = actionA;
    allImages.catImg.push(cat1);
    allImages.catName.push('actions A');

    const cat2 = new Image;
    cat2.src = actionB;
    allImages.catImg.push(cat2);
    allImages.catName.push('actions B');

    const cat3 = new Image;
    cat3.src = actionC;
    allImages.catImg.push(cat3);
    allImages.catName.push('actions C');

    
    const cat4 = new Image;
    cat4.src = animalA;
    allImages.catImg.push(cat4);
    allImages.catName.push('animals A');

    const cat5 = new Image;
    cat5.src = animalB;
    allImages.catImg.push(cat5);
    allImages.catName.push('animal B');

    const cat6 = new Image;
    cat6.src = adjectives;
    allImages.catImg.push(cat6);
    allImages.catName.push('adjectives');

    const cat7 = new Image;
    cat7.src = emotions;
    allImages.catImg.push(cat7);
    allImages.catName.push('emotions');

    const cat8 = new Image;
    cat8.src = clothes;
    allImages.catImg.push(cat8);
    allImages.catName.push('clothes');

    return allImages;
}
