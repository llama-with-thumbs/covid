import bird from '../assets/sounds/bird.mp3';
export default function getSound() {
    return new Audio(bird);
}


// import bird from '../assets/sounds/bird.mp3';
// import angry from '../assets/sounds/angry.mp3';
// import blouse from '../assets/sounds/blouse.mp3';
// import boot from '../assets/sounds/boot.mp3';
// import cat from '../assets/sounds/cat.mp3';
// import chick from '../assets/sounds/chick.mp3';
// import chicken from '../assets/sounds/chicken.mp3';
// import coat from '../assets/sounds/coat.mp3';
// import correct from '../assets/sounds/correct.mp3';
// import cry from '../assets/sounds/cry.mp3';
// import dance from '../assets/sounds/dance.mp3';
// import dive from '../assets/sounds/dive.mp3';
// import dog from '../assets/sounds/dog.mp3';
// import dolphin from '../assets/sounds/dolphin.mp3';
// import draw from '../assets/sounds/draw.mp3';
// import dress from '../assets/sounds/dress.mp3';
// import error from '../assets/sounds/error.mp3';
// import failure from '../assets/sounds/failure.mp3';
// import fish from '../assets/sounds/fish.mp3';
// import fly from '../assets/sounds/fly.mp3';
// import frog from '../assets/sounds/frog.mp3';
// import giraffe from '../assets/sounds/giraffe.mp3';
// import happy from '../assets/sounds/happy.mp3';
// import horse from '../assets/sounds/horse.mp3';
// import hug from '../assets/sounds/hug.mp3';
// import jump from '../assets/sounds/jump.mp3';
// import laugh from '../assets/sounds/laugh.mp3';
// import lion from '../assets/sounds/lion.mp3';
// import mouse from '../assets/sounds/mouse.mp3';
// import open from '../assets/sounds/open.mp3';
// import pants from '../assets/sounds/pants.mp3';
// import pig from '../assets/sounds/pig.mp3';
// import play from '../assets/sounds/play.mp3';
// import point from '../assets/sounds/point.mp3';
// import rabbit from '../assets/sounds/rabbit.mp3';
// import ride from '../assets/sounds/ride.mp3';
// import run from '../assets/sounds/run.mp3';
// import sad from '../assets/sounds/sad.mp3';
// import scared from '../assets/sounds/scared.mp3';
// import sheep from '../assets/sounds/sheep.mp3';
// import shirt from '../assets/sounds/shirt.mp3';
// import shoe from '../assets/sounds/shoe.mp3';
// import sing from '../assets/sounds/sing.mp3';
// import skip from '../assets/sounds/skip.mp3';
// import skirt from '../assets/sounds/skirt.mp3';
// import smile from '../assets/sounds/smile.mp3';
// import success from '../assets/sounds/success.mp3';
// import surprised from '../assets/sounds/surprised.mp3';
// import swim from '../assets/sounds/swim.mp3';
// import tired from '../assets/sounds/tired.mp3';
// import turtle from '../assets/sounds/turtle.mp3';




// //
// export default function getSound(word) {
//     const birdAudio = new Audio(bird);
//     const angryAudio = new Audio(angry);
//     const blouseAudio = new Audio(blouse);
//     const bootAudio = new Audio(boot);
//     const catAudio = new Audio(cat);
//     const chickAudio = new Audio(chick);
//     const chickenAudio = new Audio(chicken);
//     const coatAudio = new Audio(coat);
//     const correctAudio = new Audio(correct);
//     const cryAudio = new Audio(cry);
//     const danceAudio = new Audio(dance);
//     const diveAudio = new Audio(dive);
//     const dogAudio = new Audio(dog);
//     const dolphinAudio = new Audio(dolphin);
//     const drawAudio = new Audio(draw);
//     const dressAudio = new Audio(dress);
//     const errorAudio = new Audio(error);
//     const failureAudio = new Audio(failure);
//     const fishAudio = new Audio(fish);
//     const flyAudio = new Audio(fly);
//     const frogAudio = new Audio(frog);
//     const giraffeAudio = new Audio(giraffe);
//     const happyAudio = new Audio(happy);
//     const horseAudio = new Audio(horse);
//     const hugAudio = new Audio(hug);
//     const jumpAudio = new Audio(jump);
//     const laughAudio = new Audio(laugh);
//     const lionAudio = new Audio(lion);
//     const mouseAudio = new Audio(mouse);
//     const openAudio = new Audio(open);
//     const pantsAudio = new Audio(pants);
//     const pigAudio = new Audio(pig);
//     const playAudio = new Audio(play);
//     const pointAudio = new Audio(point);
//     const rabbitAudio = new Audio(rabbit);
//     const rideAudio = new Audio(ride);
//     const runAudio = new Audio(run);
//     const sadAudio = new Audio(sad);
//     const scaredAudio = new Audio(scared);
//     const sheepAudio = new Audio(sheep);
//     const shirtAudio = new Audio(shirt);
//     const shoeAudio = new Audio(shoe);
//     const singAudio = new Audio(sing);
//     const skipAudio = new Audio(skip);
//     const skirtAudio = new Audio(skirt);
//     const smileAudio = new Audio(smile);
//     const successAudio = new Audio(success);
//     const surprisedAudio = new Audio(surprised);
//     const swimAudio = new Audio(swim);
//     const tiredAudio = new Audio(tired);
//     const turtleAudio = new Audio(turtle);

//     const allSounds = {
//         angry : angryAudio, 
//         bird : birdAudio, 
//         blouse : blouseAudio, 
//         boot : bootAudio, 
//         cat : catAudio, 
//         chick : chickAudio, 
//         chicken : chickenAudio, 
//         coat : coatAudio, 
//         correct : correctAudio, 
//         cry : cryAudio, 
//         dance : danceAudio, 
//         dive : diveAudio, 
//         dog : dogAudio, 
//         dolphin : dolphinAudio, 
//         draw : drawAudio, 
//         dress : dressAudio, 
//         error : errorAudio, 
//         failure : failureAudio, 
//         fish : fishAudio, 
//         fly : flyAudio, 
//         frog : frogAudio, 
//         giraffe : giraffeAudio, 
//         happy : happyAudio, 
//         horse : horseAudio, 
//         hug : hugAudio, 
//         jump : jumpAudio, 
//         laugh : laughAudio, 
//         lion : lionAudio, 
//         mouse : mouseAudio, 
//         open : openAudio, 
//         pants : pantsAudio, 
//         pig : pigAudio, 
//         play : playAudio, 
//         point : pointAudio, 
//         rabbit : rabbitAudio, 
//         ride : rideAudio, 
//         run : runAudio, 
//         sad : sadAudio, 
//         scared : scaredAudio, 
//         sheep : sheepAudio, 
//         shirt : shirtAudio, 
//         shoe : shoeAudio, 
//         sing : singAudio, 
//         skip : skipAudio, 
//         skirt : skirtAudio, 
//         smile : smileAudio, 
//         success : successAudio, 
//         surprised : surprisedAudio, 
//         swim : swimAudio, 
//         tired : tiredAudio,
//         turtle : turtleAudio,
//         };
//     return allSounds[word];
// }


