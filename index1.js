var Ajaxx;
(function (Ajaxx) {
    var Optionss = /** @class */ (function () {
        function Optionss(url) {
            this.url = url;
        }
        return Optionss;
    }());
    Ajaxx.Optionss = Optionss;
    var req = /** @class */ (function () {
        function req() {
            this.pag = "page1";
            // constructor(page?:string) {this.page=page;}
            this.get = function (pagee, reqq) {
                if (reqq === void 0) { reqq = new Optionss("./db.json"); }
                $.ajax({
                    url: reqq.url,
                    type: "get",
                    success: function (data) {
                        var q = pagee;
                        var padata = data.questions;
                        console.log(pagee);
                        for (var p in padata) {
                            if (p == q) {
                                // console.log(padata[p]);
                                var qlist = padata[p];
                                var i = 1;
                                for (var que in qlist) {
                                    // console.log();
                                    //    for(var i=1;i<6;i++){
                                    var parent = $("#Q" + i);
                                    // console.log(parent);
                                    parent.children("#ques1title").children("#ques1titlee").html(qlist[que].ques);
                                    parent.children("#quesopt1").children("#q1op1").html(qlist[que].optoin1);
                                    parent.children("#quesopt2").children("#q1op2").html(qlist[que].optoin2);
                                    parent.children("#quesopt3").children("#q1op3").html(qlist[que].optoin3);
                                    parent.children("#quesopt4").children("#q1op4").html(qlist[que].optoin4);
                                    console.log(i);
                                    i++;
                                    //    }
                                }
                                break;
                            }
                        }
                    },
                    error: function (data) {
                        console.log("error");
                    }
                });
            };
            this.fill = function (pagee, fill) {
                if (fill === void 0) { fill = new Optionss("./submit.json"); }
                $.ajax({
                    url: fill.url,
                    type: "get",
                    success: function (data) {
                        var page = pagee;
                        var subdata = data.submit;
                        for (var s in subdata) {
                            if (s == page) {
                                var qlist = subdata[s];
                                var i = 1;
                                for (var que in qlist) {
                                    var parent = $("#Q" + i);
                                    parent.children("#quesopt1").children("#r1").prop('checked', qlist[que].optoin1);
                                    parent.children("#quesopt2").children("#r2").prop('checked', qlist[que].optoin2);
                                    parent.children("#quesopt3").children("#r3").prop('checked', qlist[que].optoin3);
                                    parent.children("#quesopt4").children("#r4").prop('checked', qlist[que].optoin4);
                                    // console.log(qlist[que].optoin3);
                                    i++;
                                }
                                break;
                            }
                        }
                    },
                    error: function (data) {
                        console.log("sub error");
                    }
                });
            };
            this.submit = function (page) {
                var i = 1;
                var obj = {
                    "ques1": { "optoin1": null, "optoin2": null, "optoin3": null, "optoin4": null },
                    "ques2": { "optoin1": null, "optoin2": null, "optoin3": null, "optoin4": null },
                    "ques3": { "optoin1": null, "optoin2": null, "optoin3": null, "optoin4": null },
                    "ques4": { "optoin1": null, "optoin2": null, "optoin3": null, "optoin4": null },
                    "ques5": { "optoin1": null, "optoin2": null, "optoin3": null, "optoin4": null }
                };
                for (var qu in obj) {
                    var parent1 = $("#Q" + i);
                    var parent2 = obj[qu];
                    // console.log(parent1.children("#quesopt1").children("#r1").is(":checked"),parent1.children("#quesopt1").children("#q1op1").html() );
                    if (parent1.children("#quesopt1").children("#r1").is(":checked"))
                        parent2.optoin1 = parent1.children("#quesopt1").children("#q1op1").html();
                    else
                        parent2.optoin1 = null;
                    if (parent1.children("#quesopt2").children("#r2").is(":checked"))
                        parent2.optoin2 = parent1.children("#quesopt2").children("#q1op2").html();
                    else
                        parent2.optoin2 = null;
                    if (parent1.children("#quesopt3").children("#r3").is(":checked"))
                        parent2.optoin3 = parent1.children("#quesopt3").children("#q1op3").html();
                    else
                        parent2.optoin3 = null;
                    if (parent1.children("#quesopt4").children("#r4").is(":checked"))
                        parent2.optoin4 = parent1.children("#quesopt4").children("#q1op4").html();
                    else
                        parent2.optoin4 = null;
                    i++;
                }
                localStorage.setItem(page, JSON.stringify(obj));
                // console.log(obj)
                console.log(JSON.parse(localStorage.getItem(page)));
            };
        }
        return req;
    }());
    Ajaxx.req = req;
    var i = 1;
    var pag = "page" + i.toString();
    var exec = new req();
    // console.log(i);
    exec.get(pag);
    exec.fill(pag);
    check(pag);
    document.getElementById("next").onclick = function () { exec.submit(pag); i++; pag = "page" + i.toString(); exec.get(pag); exec.fill(pag); document.getElementById("hi").innerHTML = pag; check(pag); };
    document.getElementById("prev").onclick = function () { exec.submit(pag); i--; pag = "page" + i; exec.get(pag); exec.fill(pag); document.getElementById("hi").innerHTML = pag; check(pag); };
    function check(pag) {
        $('html,body').scrollTop(0);
        if (pag == "page1") {
            document.getElementById("prev").disabled = true;
            return;
        }
        if (pag == "page5") {
            document.getElementById("next").disabled = true;
            return;
        }
        document.getElementById("prev").disabled = false;
        document.getElementById("next").disabled = false;
    }
    $("#clear").click(function () {
        function uncheckAll() {
            var allInp = document.getElementsByTagName("input");
            for (i = 0; i < allInp.length; i++) {
                if (allInp[i].type == "radio") {
                    allInp[i].checked = false;
                }
            }
        }
        uncheckAll();
    });
    $("#submit").click(function () {
        localStorage.setItem("time", $("#time").html());
        exec.submit(pag);
        console.log($("#time").html());
        // console.log(JSON.parse(localStorage.getItem('page1')));
        // console.log(JSON.parse(localStorage.getItem('page2')));
        // console.log(JSON.parse(localStorage.getItem('page3')));
        // console.log(JSON.parse(localStorage.getItem('page4')));
        // console.log(JSON.parse(localStorage.getItem('page5')));
        window.location.href = "./result.html";
    });
    // function prevPage(){i--;}
})(Ajaxx || (Ajaxx = {}));
// export {req};
