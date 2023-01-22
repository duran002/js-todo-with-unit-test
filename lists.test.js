 /**
  * @author: Duran Can Yılmaz
  * @mail: durancanyilmaz@hotmail.com
  * @date: 2023-01-23
  * @description: This file contains the lists class which is used to store the lists. It was made as a study case for the Gizil company.
  * @version: 1.0.0
  * @license: GNU General Public License v3.0
  */
"use strict"
class testlists extends lists{
    constructor(){
        super();
    }
    expect(expected, actual){
        this.clearLists();
        //get the name of the method that called this method
        var method_name = new Error().stack.split("at ")[2].split(" ")[0].split(".")[1];
        if(expected === actual && actual !== false){
            console.log(method_name+" Test passed 🟢");
        }else{
            console.log(method_name+" Test failed 🔴");
        }
    }
    testAddList(){
        var list = new lists();
        list.addList({id:1, name:"list1"});
        list.addList({id:2, name:"list2"});
        list.addList({id:3, name:"list3"});
        list.addList({id:4, name:"list4"});
        this.expect(4, list.lists.length);
    }
    testAddListWrong(){
        var list = new lists();
        list.addList({id:1, name:"list1"});
        this.expect(2, list.lists.length);
    }
    testUpdateList(){
        var list = new lists();
        list.addList({id:1, name:"list1"});
        list.addList({id:2, name:"list2"});
        list.addList({id:3, name:"list3"});
        list.addList({id:4, name:"list4"});
        list.updateList({id:1, name:"new list name updated"});
        this.expect("new list name updated", list.getList(1).name);
    }
    testUpdateListWrong(){
        var list = new lists();
        list.addList({id:1, name:"list1"});
        list.updateList({id:2, name:"new list name updated"});
        this.expect("new list name updated", list.getList(1).name);
    }
    testUpvote(){
        var list = new lists();
        list.addList({id:1, name:"list1", votes:0});
        list.voteUp(1);
        this.expect(1, list.getList(1).votes);
    }
    testUpvoteWrong(){
        var list = new lists();
        this.expect(1, list.voteUp(1));
    }
    testDownvote(){
        var list = new lists();
        list.addList({id:1, name:"list1", votes:0});
        list.voteDown(1);
        this.expect(-1, list.getList(1).votes);
    }
    testDownvoteWrong(){
        var list = new lists();
        this.expect(1, list.voteDown(1));
    }
    testSetHtmlPagination(){
        var list = new lists();
        list.addList({id:1, name:"list1", votes:0});
        list.addList({id:2, name:"list2", votes:0});
        list.addList({id:3, name:"list3", votes:0});
        list.addList({id:4, name:"list4", votes:0});
        $("body").append("<div id='test2'>"+list.setHtmlPagination(1,2)+"</div>");
        this.expect(2, document.querySelectorAll("#test2 .list").length);
        $("#test2").remove();
    }

}
var test = new testlists();
console.log("%cSuccess Tests", "color: green; font-size: 20px;");
test.testAddList(); // Test passed 🟢
test.testUpdateList(); // Test passed 🟢
test.testUpvote(); // Test passed 🟢
test.testDownvote(); // Test passed 🟢
test.testSetHtmlPagination(); // Test passed 🟢

console.log("%cFailure Tests", "color: red; font-size: 20px;");
test.testAddListWrong(); // Test failed 🔴
test.testUpdateListWrong(); // Test failed 🔴
test.testUpvoteWrong(); // Test failed 🔴 
test.testDownvoteWrong(); // Test failed 🔴
