interface Category {
  id: number;
  name: string;
  desc: string;
  image: string;
}

// function generate(n: number): Category[] {
//   const categories: Category[] = [];
//   for (let i = 0; i < n; i++) {
//     categories.push({
//       id: ++categoryId,
//       name: chance.sentence({ words: 5 }),
//       desc: chance.sentence(),
//       image: "/images/default-category.jpg"
//     });
//   }
//   return categories;
// }

let DUMMY_CATEGORY_LIST: Array<Category> = [
  {
    id: 1,
    name: "Công nghệ Phần mềm",
    desc: "Description for Công nghệ Phần mềm",
    image: "/images/category__cong-nghe-phan-mem.jpg"
  },
  {
    id: 2,
    name: "Công nghệ Tri thức",
    desc: "Description for Công nghệ Trí thức",
    image: "/images/category__cong-nghe-tri-thuc.jpg"
  },
  {
    id: 3,
    name: "Hệ thống Thông tin",
    desc: "Description for Hệ thống Thông tin",
    image: "/images/category__he-thong-thong-tin.jpg"
  },
  {
    id: 4,
    name: "Khoa học Máy tính",
    desc: "Description for Khoa học Máy tính",
    image: "/images/category__khoa-hoc-may-tinh.jpg"
  },
  {
    id: 5,
    name: "Mạng máy tính",
    desc: "Description for Mạng máy tính",
    image: "/images/category__mang-may-tinh.png"
  },
  {
    id: 6,
    name: "Thị giác Máy tính",
    desc: "Description for Thị giác Máy tính",
    image: "/images/category__thi-giac-may-tinh.png"
  }
];

export default Category;
export { DUMMY_CATEGORY_LIST };
