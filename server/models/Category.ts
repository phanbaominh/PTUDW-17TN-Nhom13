import Chance from "chance";

const chance = new Chance();

interface Category {
    name: string;
    desc: string;
    image: string;
}

function generate (n: number): Category[]{
    const categories: Category[] = [];
    for (let i = 0; i < n; i++){
        categories.push({
            name: chance.sentence({words: 5}),
            desc: chance.sentence(),
            image: '/images/default-category.jpg',
        });
    }
    return categories
}
const DUMMY_CATEGORIES = generate(6);

export default Category;
export { DUMMY_CATEGORIES };