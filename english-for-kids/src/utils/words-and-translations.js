export default function allWords() {
    const allWords = {};
    allWords.en = {
        actionA: ['cry', 'dance', 'dive', 'draw', 'fish', 'fly', 'hug', 'jump'],
        actionB: ['open', 'play', 'point', 'ride', 'run', 'sing', 'skip', 'swim'],
        actionC: ['argue', 'puild', 'carry', 'catch', 'drive', 'drop', 'pull', 'push'],
        adjectives: ['big', 'small', 'fast', 'slow', 'friendly', 'unfriendly', 'young', 'old'],
        animalB: ['bird', 'fish', 'frog', 'giraffe', 'lion', 'mouse', 'turtle', 'dolphin'],
        animalA: ['cat', 'chick', 'chicken', 'dog', 'horse', 'pig', 'rabbit', 'sheep'],
        emotions: ['sad', 'angry', 'happy', 'tired', 'surprised', 'scarred', 'smile', 'laugh'],
        clothes: ['skirt', 'pants', 'blouse', 'dress', 'boots', 'shirt', 'coat', 'shoes']
    };
    allWords.ru = {
        actionA: ['плакать', 'танцевать', 'нырять', 'рисовать', 'рыбачить', 'летать', 'обнимать', 'прыгать'],
        actionB: ['открывать', 'играть', 'указывать', 'ездить', 'бегать', 'петь', 'скакать', 'плавать'],
        actionC: ['спрорить', 'строить', 'переносить', 'ловить', 'водить', 'бросать', 'тянуть', 'толкать'],
        adjectives: ['большой', 'маленький', 'быстрый', 'медленный', 'дружелюбный', 'недружелюбный', 'молодой', 'старый'],
        animalB: ['птица', 'рыба', 'лягушка', 'жираф', 'лев', 'мышь', 'черепаха', 'дельфин'],
        animalA: ['кот', 'курица', 'цыпленок', 'собака', 'лошадь', 'свинья', 'кролик', 'овца'],
        emotions: ['грустный', 'сердитый', 'счастливый', 'усталый', 'удивленный', 'испуганный', 'улыбающийся', 'смеющийся'],
        clothes: ['юбка', 'брюки', 'блузка', 'платье', 'ботинки', 'рубашка', 'пальто', 'туфли']
    };
    return allWords;
}