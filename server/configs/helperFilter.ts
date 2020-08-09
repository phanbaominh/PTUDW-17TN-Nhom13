import nunjucks from "nunjucks";
import moment from "moment";

function setupMomentFilter(env: nunjucks.Environment) {
  env.addFilter("moment", function (date: Date, formatString: string) {
    return moment(date).format(formatString);
  });
}

export { setupMomentFilter };
