module Ajaxx {
    export class Optionss {
        url: string;
        constructor(url: string) {this.url=url;}
        
    }
    export class req {
        page="page1";
        constructor(page?:string) {this.page=page;}
        public get =(pagee:string,reqq: Optionss=new Optionss("./db.json")) : void =>{
            $.ajax({
                url: reqq.url,
                type : "get",
                success: function(data){
                    var q:String=pagee;
                        var padata = data.questions;
                        console.log(pagee);
                        for(let p in padata){
                            if(p==q) {
                                // console.log(padata[p]);
                                var qlist=padata[p]
                                console.log(qlist)
                                var i=1;
                                for(let que in qlist){
                                    // console.log();
                                //    for(var i=1;i<6;i++){
                                    var parent= $("#Q"+i);
                                    console.log(parent);
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
                error: function(data){
                    console.log("error");
                }
            });
        }
    }
    var i=1;
    var pag="page"+i.toString();
    var exec = new req();
    // console.log(i);
    exec.get(pag);
    check(pag);
    document.getElementById("next").onclick = function () {i++; pag="page"+i.toString();exec.get(pag);console.log(i);document.getElementById("hi").innerHTML=pag;check(pag)};
    document.getElementById("prev").onclick= function() {i--; pag="page"+i; exec.get(pag);document.getElementById("hi").innerHTML=pag;check(pag)}
    function check(pag){
        console.log("asds");
        $('html,body').scrollTop(0);
        if(pag=="page1")  {document.getElementById("prev").disabled=true;return;}
        if(pag=="page5")  {document.getElementById("next").disabled=true;return;}
        document.getElementById("prev").disabled=false;
        document.getElementById("next").disabled=false;
    }
    // function prevPage(){i--;}
    
}

// export {req};