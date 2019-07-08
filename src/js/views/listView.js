import { elements } from './base';

// export renderItem to use in index controller
export const renderItem = item => {
    const markup = `
        <li class="shopping__item" data-item-id=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count--value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentElement('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[date-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};