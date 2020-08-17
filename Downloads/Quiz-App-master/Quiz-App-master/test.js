"use strict";
exports.__esModule = true;
var aj = require("./index1");
var Page = /** @class */ (function () {
    function Page(page) {
        this.page = 1;
        this.page = page;
    }
    return Page;
}());
var getPage = /** @class */ (function () {
    function getPage(page) {
        this.page = 1;
        this.pg = new Page();
        this.getpg = new aj.Ajaxx.req(this.pg.page);
        this.page = page;
    }
    return getPage;
}());
function nextPage() { geage.page += 1; geage.getpg; }
function prevPage() { geage.page -= 1; geage.getpg; }
var geage = new getPage();
geage.getpg;
// export =null;
