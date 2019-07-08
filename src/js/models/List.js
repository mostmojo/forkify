import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
    }

    deleteItem(id) {
        const index = this.items.findIndex(item => item.id === id); // does current item id === the passed in id?
        // [2,4,8] splice(1,2); -> [4,8], original array is [2] - mutated.
        // [2,4,8] slice(1,2); -> 4, original array is [2,4,8] - not mutated. Only returns 4 because the end index is never included
        this.items.splice(index, 1);
    }
}