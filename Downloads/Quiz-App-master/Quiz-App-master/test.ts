import * as aj from "./index1";


        class Page{
            page : number =1;
            constructor(page?:number){ this.page=page;}
        }
    
        class getPage{
            page : number =1;
            constructor(page?:number){ this.page=page;}
            pg : Page= new Page();
            getpg=new aj.Ajaxx.req(this.pg.page);
        }
        
        function nextPage(){geage.page+=1; geage.getpg;}
        function prevPage(){geage.page-=1; geage.getpg;}
    
        var geage= new getPage();
        geage.getpg;
    

     
// export =null;