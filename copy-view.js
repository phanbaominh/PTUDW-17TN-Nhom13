let shell = require("shelljs");

shell.mkdir("-p", "build/views");
shell.cp("-R", "server/views", "build");
