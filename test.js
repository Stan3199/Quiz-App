var Test;
(function (Test) {
    var Optionss = /** @class */ (function () {
        function Optionss(url) {
            this.url = url;
        }
        return Optionss;
    }());
    Test.Optionss = Optionss;
    var res = /** @class */ (function () {
        function res() {
            this.result = function (resu) {
                if (resu === void 0) { resu = new Optionss("./answers.json"); }
                var count = 0;
                $.ajax({
                    url: resu.url,
                    type: "get",
                    success: function (data) {
                        var andata = data.answers;
                        for (var i = 1; i < 6; i++) {
                            var page = "page" + i;
                            var lodata = JSON.parse(localStorage.getItem(page));
                            for (var pdata in andata) {
                                var pagedata = andata[pdata];
                                for (var quest in pagedata) {
                                    // console.log(pagedata[quest])
                                    // console.log(lodata[quest])
                                    if (JSON.stringify(pagedata[quest]) == JSON.stringify(lodata[quest])) {
                                        count++;
                                        console.log(count);
                                    }
                                }
                            }
                        }
                    },
                    error: function (error) {
                    }
                });
            };
        }
        return res;
    }());
    Test.res = res;
    var result = new res();
    result.result();
})(Test || (Test = {}));
