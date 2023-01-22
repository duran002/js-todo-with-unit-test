 /**
  * @author: Duran Can Yılmaz
  * @mail: durancanyilmaz@hotmail.com
  * @date: 2023-01-23
  * @description: This file contains the lists class which is used to store the lists. It was made as a study case for the Gizil company.
  * @version: 1.0.0
  * @license: GNU General Public License v3.0
  */
 class lists{
    constructor(){
        this.lists = [];
        this.order= "top";
    }
    addList(list){
        try{
            list.last_voted = Date.now();
            this.lists.push(list);
        }catch(e){
            return false;
        }
    }
    removeList(list_id){
        try{
            this.lists = this.lists.filter(l => l.id !== list_id);
        }catch(e){
            return false;
        }
    }
    saveLocalstorageLists(){
        try{
            localStorage.setItem("lists", JSON.stringify(this.lists));
        }catch(e){
            return false;
        }
    }
    getLocalstorageLists(){
        try{
            var lists = JSON.parse(localStorage.getItem("lists"));
            if(lists !== null){
                this.lists = lists;
            }
        }catch(e){
            return false;
        }
    }
    getList(id){
        try{
            return this.lists.find(l => l.id === id);
        }catch(e){
            return false;
        }
    }
    updateList(list){
        try{
            this.lists = this.lists.map(l => l.id === list.id ? list : l);
            //this.orderListsByVote();
            var order = this.order;
            if(order === "top"){
                this.orderListsByVote();
            }else if(order === "least"){
                this.orderListsByVote(false);
            }else if(order === "last_added"){
                this.orderListByLastAdded();
            }
        }catch(e){
            return false;
        }
    }
    getLists(){
        try{
            return this.lists;
        }catch(e){
            return false;
        }
    }
    voteUp(id){
        try{
            var list = this.getList(id);
            list.votes++;
            list.last_voted = Date.now();
            this.updateList(list);
        }catch(e){
            return false;
        }
    }
    voteDown(id){
        try{
            var list = this.getList(id);
            list.votes--;
            list.last_voted = Date.now();
            this.updateList(list);
        }catch(e){
            return false;
        }
    }
    clearLists(){
        //clear the lists array
        this.lists = [];
    }
    changeOrder(order){
        try{
            this.order = order;
            if(order === "top"){
                this.orderListsByVote();
            }else if(order === "least"){
                this.orderListsByVote(false);
            }else if(order === "last_added"){
                this.orderListByLastAdded();
            }
        }catch(e){
            return false;
        }
    }
    orderListsByVote(highest = true){
        try{
            //order the lists by votes if the votes are equal order by last voted
            if(highest){
                this.lists = this.lists.sort((a,b) => b.votes - a.votes || b.last_voted - a.last_voted);
            }else{
                this.lists = this.lists.sort((a,b) => a.votes - b.votes || b.last_voted - a.last_voted);
            }
        }catch(e){
            return false;
        }
    }
    orderListByLastAdded(){
        try{
            this.lists = this.lists.sort((a,b) => b.id - a.id);
        }catch(e){
            return false;
        }
    }
    paginateLists(page, limit,search = false){
        try{
            var lists = this.lists;
            if(search){
                lists = lists.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));
            }
            var start = (page - 1) * limit;
            var end = page * limit;
            return lists.slice(start, end);
            /**
             * var start = (page - 1) * limit;
            var end = page * limit;
            return this.lists.slice(start, end);
             */
        }catch(e){
            return false;
        }
    }
    paginationButtons(page, limit){
        try{
            var pages = Math.ceil(this.lists.length / limit);
            var buttons = [];
            for(var i = 1; i <= pages; i++){
                buttons.push(i);
            }
            return buttons;
        }catch(e){
            return false;
        }
    }
    setHtmlPagination(page, limit,search = false){
        try{
            var html = '';
            var lists = this.paginateLists(page, limit,search);
            if (lists.length === 0) {
                html += `
                    <div class="col-12 row list">
                            <div class="col-12 text-center">
                                <h3>No lists found</h3>
                            </div>
                    </div>
                `;
                return html;
            }
            var buttons = this.paginationButtons(page, limit);
            html+= `
                <div class="col-12 text-center fw-bold text-muted row mx-0 px-0 border-bottom">
                    <div class="col-8"></div>
                    <div class="col-4">
                        <select class="form-select" onchange="changeOrder(this.value)">
                            <option value="top"  ${this.order == 'top' ? 'selected' : ''}>top voted</option>
                            <option value="least" ${this.order == 'least' ? 'selected' : ''}>least voted</option>
                            <option value="last_added" ${this.order == 'last_added' ? 'selected' : ''}>last added</option>
                        </select>
                    </div>
                    <div class="col-2">votes</div>
                    <div class="col-8">name</div>
                    <div class="col-2">vote</div>
                </div>
            `;
            lists.forEach(list => {
                html += `
                    <div class="col-12 row mx-0 px-0 list border-bottom">
                            <div class="col-2 d-flex text-white text-center ${list.votes > 0 ? 'bg-success ' : ''} ${list.votes <= 0 ? 'bg-danger' : ''}">
                                <h5 class="my-auto text-center justify-content-center">${list.votes}</h5>
                            </div>
                            <div class="col-8 mx-0">
                                <div class="d-grid h-100 position-relative mx-0">
                                    <a href="#${list.id}" data-id="${list.id}" class="mx-0 d-flex link-dark "><h5 class="my-auto text-center justify-content-center">${list.name}</h5></a>
                                    <button class="trash" id="trash${list.id}" onclick="removeList(${list.id})"><i class="bi bi-trash"></i></button>
                                </div>
                            </div>
                            <div class="col-2 d-flex justify-content-around">
                                    <button class="btn btn-outline-secondary rounded-circle shadow-sm" onclick="voteUp(${list.id})"><i class="bi bi-chevron-up"></i></button>
                                    <button class="btn btn-outline-secondary rounded-circle shadow-sm" onclick="voteDown(${list.id})"><i class="bi bi-chevron-down"></i></button>
                            </div>
                    </div>
                `;
            });
             html += `
                <div class="col-12  mx-0 mt-3">
            `;
            buttons.forEach(button => {
                html += `
                    <button class="btn btn-sm btn-primary" onclick="paginate(${button})">${button}</button>
                `;
            });
            html += `
                </div>
            `; 
            return html;
        }catch(e){
            return false;
        }
    }
    searchLists(search){
        try{
            var lists = this.lists.filter(list => list.name.toLowerCase().includes(search.toLowerCase()));
            return lists;
        }catch(e){
            return false;
        }
    }

}




