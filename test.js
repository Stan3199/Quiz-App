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
                        var ansno = 1;
                        var andata = data.answers;
                        for (var i = 1; i < 6; i++) {
                            var page = "page" + i;
                            var lodata = JSON.parse(localStorage.getItem(page));
                            // for(var pdata in andata){
                            var pagedata = andata[page];
                            for (var quest in pagedata) {
                                $("#ans" + ansno).html();
                                // console.log(pagedata[quest])
                                // console.log(lodata[quest])
                                if (JSON.stringify(pagedata[quest]) == JSON.stringify(lodata[quest])) {
                                    var questt = pagedata[quest];
                                    count++;
                                    console.log(count);
                                    for (var op in questt) {
                                        console.log(questt);
                                        if (questt[op] != null) {
                                            console.log(questt[op]);
                                            $("#ans" + ansno).append(questt[op] + " ");
                                        }
                                    }
                                    $("#ans" + ansno).css("color", "green");
                                }
                                else {
                                    $("#ans" + ansno).css("color", "red");
                                    // $("#ans"+ansno).append(pagedata[quest]);
                                    var questt = lodata[quest];
                                    var count2 = 0;
                                    for (var op in questt) {
                                        // console.log(questt)
                                        if (questt[op] != null) {
                                            console.log(questt[op]);
                                            $("#ans" + ansno).append(questt[op]);
                                        }
                                        else
                                            count2++;
                                        if (count2 == 4)
                                            $("#ans" + ansno).append("Not attempted");
                                        // console.log(count2,(questt[op])
                                    }
                                    $("#ans" + ansno).css("color", "red");
                                }
                                var questt = pagedata[quest];
                                console.log(questt);
                                for (var op in questt) {
                                    if (questt[op] != null) {
                                        $("#crans" + ansno).append(questt[op] + " ");
                                        console.log("asdasdasdsa");
                                    }
                                }
                                ansno++;
                                // }
                            }
                        }
                        $("#perc").html(((count / 25) * 100) + "%");
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
