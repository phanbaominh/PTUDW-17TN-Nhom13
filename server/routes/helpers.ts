import { Response, Request } from "express";
function redirectWithOption(req: Request, res: Response<any>, url: string, options = null) {
  req.session.options = options;
  res.redirect(url);
}

function getRedirectOption(req: Request) {
  let options = {};
  if (req.session.options) {
    options = req.session.options;
    req.session.options = null;
  }
  return options;
}

export { redirectWithOption, getRedirectOption };
