import { Seeder } from "typeorm-seeding";
import { Category } from "../entities/Category";

let DUMMY_CATEGORY_LIST = [
  {
    name: "Công nghệ Phần mềm",
    desc:
      "Công nghệ phần mềm là sự áp dụng một cách tiếp cận có hệ thống, có kỷ luật, và định lượng được cho việc phát triển, sử dụng và bảo trì phần mềm",
    image: "/images/category__cong-nghe-phan-mem.jpg",
    position: 1,
  },
  {
    name: "Công nghệ Tri thức",
    desc: "Lĩnh vực nghiên cứu: An toàn thông tin, xử lý ngôn ngữ.",
    image: "/images/category__cong-nghe-tri-thuc.jpg",
    position: 2,
  },
  {
    name: "Hệ thống Thông tin",
    desc:
      "Lĩnh vực nghiên cứu: Executive Information Systems (EIS), Tiếp cận hướng đối tượng trong phân tích và thiết kế hệ thống thông tin/Cơ sở dữ liệu, Hệ thống thông tin đa ngôn ngữ (Việt, Pháp, Anh,...), Hệ thống quản lý luồng công việc.",
    image: "/images/category__he-thong-thong-tin.jpg",
    position: 3,
  },
  {
    name: "Khoa học Máy tính",
    desc:
      "Lĩnh vực nghiên cứu: Các hệ Cơ sở Tri thức, Tính toán mềm, Xử lý hình ảnh, Mạng nơron, Máy học, Nhận dạng, Lập trình tiến hóa, Xử lý ảnh và tín hiệu số trong Y học, Semantic Web, Xử lý âm thanh.",
    image: "/images/category__khoa-hoc-may-tinh.jpg",
    position: 4,
  },
  {
    name: "Mạng máy tính",
    desc:
      "Lĩnh vực nghiên cứu: Các công nghệ mạng và truyền thông cao cấp, Các hệ thống phân tán, Hệ thống VoIP, WAP / PKI và Bảo mật mạng, Mobile Agent.",
    image: "/images/category__mang-may-tinh.png",
    position: 5,
  },
  {
    name: "Thị giác Máy tính",
    desc:
      "Lĩnh vực nghiên cứu: Visual Information Retrieval, Visual Slam, Visual Recognition, 3D Object Reconstruction & Modeling, Medical Image Processing, BioInformatics, Data Science.",
    image: "/images/category__thi-giac-may-tinh.png",

    position: 6,
  },
];

class CreateCategories implements Seeder {
  public async run(): Promise<any> {
    await Promise.all(
      DUMMY_CATEGORY_LIST.map(function (rawCategory) {
        let category = new Category();
        category.name = rawCategory.name;
        category.desc = rawCategory.desc;
        category.image = rawCategory.image;
        category.position = rawCategory.position;
        return category.save();
      }),
    );
  }
}

module.exports = {
  CreateCategories,
};
