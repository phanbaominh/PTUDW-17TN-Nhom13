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
    desc: "Lĩnh vực nghiên cứu: Các phương pháp cao cấp trong thiết kế phần mềm, Lập trình Hướng Đối tượng với UML, GIS, Phần mềm hỗ trợ giảng dạy, Mã hóa và ứng dụng.",
    image: "/images/category__cong-nghe-phan-mem.jpg"
  },
  {
    id: 2,
    name: "Công nghệ Tri thức",
    desc: "Lĩnh vực nghiên cứu: An toàn thông tin, xử lý ngôn ngữ.",
    image: "/images/category__cong-nghe-tri-thuc.jpg"
  },
  {
    id: 3,
    name: "Hệ thống Thông tin",
    desc: "Lĩnh vực nghiên cứu: Executive Information Systems (EIS), Tiếp cận hướng đối tượng trong phân tích và thiết kế hệ thống thông tin/Cơ sở dữ liệu, Hệ thống thông tin đa ngôn ngữ (Việt, Pháp, Anh,...), Hệ thống quản lý luồng công việc.",
    image: "/images/category__he-thong-thong-tin.jpg"
  },
  {
    id: 4,
    name: "Khoa học Máy tính",
    desc: "Lĩnh vực nghiên cứu: Các hệ Cơ sở Tri thức, Tính toán mềm, Xử lý hình ảnh, Mạng nơron, Máy học, Nhận dạng, Lập trình tiến hóa, Xử lý ảnh và tín hiệu số trong Y học, Semantic Web, Xử lý âm thanh.",
    image: "/images/category__khoa-hoc-may-tinh.jpg"
  },
  {
    id: 5,
    name: "Mạng máy tính",
    desc: "Lĩnh vực nghiên cứu: Các công nghệ mạng và truyền thông cao cấp, Các hệ thống phân tán, Hệ thống VoIP, WAP / PKI và Bảo mật mạng, Mobile Agent.",
    image: "/images/category__mang-may-tinh.png"
  },
  {
    id: 6,
    name: "Thị giác Máy tính",
    desc: "Lĩnh vực nghiên cứu: Visual Information Retrieval, Visual Slam, Visual Recognition, 3D Object Reconstruction & Modeling, Medical Image Processing, BioInformatics, Data Science.",
    image: "/images/category__thi-giac-may-tinh.png"
  }
];

export default Category;
export { DUMMY_CATEGORY_LIST };
