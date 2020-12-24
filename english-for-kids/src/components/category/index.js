import create from '../../utils/create.js';

export default function newCategory(categoryName, image, dataName) {
    const category = {};

    const categoryNameElement = create('div', 'category__name', categoryName, null);
    const cartegoryElement = create( 'div', 'category mdc-ripple-surface' , categoryNameElement, null, ['name', dataName]);
    if (image) cartegoryElement.style.backgroundImage = 'url('+image.src+')';

    category.domElement = cartegoryElement;
    category.name = categoryName;

    return category;
}