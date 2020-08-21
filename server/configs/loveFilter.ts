import nunjucks from "nunjucks";
import { Love } from "../entities/Love";

export default function setupLoveFilter(env: nunjucks.Environment) {
  env.addFilter("getLoveForm", (status: Boolean, bookId: number) => {
    return Love.getLoveForm(status, bookId);
  });
}
