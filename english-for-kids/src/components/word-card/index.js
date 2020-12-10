import create from '../../utils/create.js';

export default function newWordCard(image, wordEn, wordRu) {
    const wordCard = {};

    const wordElement = create( 'div', 'wordCard' , null, null, ['english', wordEn], ['russian', wordRu]);
    const enWord = create( 'div', 'enWord' , wordEn, wordElement);
    const ruWord = create( 'div', 'ruWord' , wordRu, wordElement);
    wordElement.style.backgroundImage = 'url('+image+')';
    wordCard.domElement = wordElement;
    return wordCard;
}