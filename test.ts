module Test{
    export class Optionss {
        url: string;
        constructor(url: string) {this.url=url;}
        
    }
    export class res{
        
        public result = (resu: Optionss=new Optionss("./answers.json")) : void =>{
            $.ajax({
                url:resu.url,
                type:"get",
                success:function (data){
                    var andata=data.answers;
                    for(var i:number =1;i<6;i++){
                        var page:string="page"+i;
                        var lodata=JSON.parse(localStorage.getItem(page))
                        for(var pdata in andata){
                            var pagedata=andata[pdata];
                            for(var quest in pagedata){
                                if(!pagedata[quest]==lodata[quest])

                            }
                        }
                    }
                    

                },
                error: function(error){

                }
            })
        }
    }
    var result= new res();
    result.result()
}