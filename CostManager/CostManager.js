window.CostManager = {};

window.CostManager.CostManagerException = function (msg){

}
window.CostManager.addItem = function(title, description, category, amount, price, isTest) {//add item to db
    //check input
    if(amount <=0){
        throw "Amount must be greater then 0";
    }
    if(!Number.isInteger(parseFloat(amount))){
        throw "Amount must be whole number";
    }
    if(price <=0){
        throw "price must be greater then 0";
    }
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() +1;
    var year = date.getFullYear();
    category = category.toString();
    ob = new Item(undefined,isTest,title,description,category,amount,price,day,month,year);
    window.CostManager.addCategory(category);
    if(isTest){//check if test so test won't override db
        var data = localStorage.getItem("todoTest");

    }
    else{
        var data = localStorage.getItem("todo");

    }

    if(data==null) {
        // running the application for the first time
        var arrayOfObjects = [];
        arrayOfObjects.push(ob);
        var text = JSON.stringify(arrayOfObjects);
        if(isTest){
            localStorage.setItem("todoTest", text);
        }
        else {
            localStorage.setItem("todo", text);
        }

    } else {
        // the data already exists in the local storage
        var arrayOfObjects = JSON.parse(data);
        arrayOfObjects.push(ob);
        var text = JSON.stringify(arrayOfObjects);
        if(isTest){//check if test so test won't override db
            localStorage.setItem("todoTest", text);
        }
        else{
            localStorage.setItem("todo", text);
        }

    }







};
window.CostManager.getItems = function(isTest) {//get item from db
    if(isTest){//check if test so test won't override db
        var data = localStorage.getItem("todoTest");

    }
    else{
        var data = localStorage.getItem("todo");
    }
    if(data==null) {
        return [];
    } else {
        var result = JSON.parse(data);
        return result;
    }
}


window.CostManager.getItemsPerMonth = function (month, isTest){//get all items from month
    var items = [];
    var vec = window.CostManager.getItems(isTest);//get all items
    var i = 0;
    vec.forEach(
        function (ob) {//check if same month
            if(ob.month == month){
                items[i] = ob;
                i++;
            }
        }
    );
    return items;
}


window.CostManager.findItem = function (id, isTest){//get specific item by id
    var vec = window.CostManager.getItems(isTest);
    var foundItem;
    vec.forEach(
        function (ob){
            if(ob.myId == id){
                foundItem = ob;
            }
        }
    )
    return foundItem;
}

window.CostManager.updateItem = function (id, name, description, category, date, amount, price, isTest){//change existing item
    //check input is valid
    if(amount <=0){
        throw "Amount must be greater then 0";
    }
    if(!Number.isInteger(parseFloat(amount))){
        throw "Amount must be whole number";
    }
    if(price <=0){
        throw "price must be greater then 0";
    }
    var vec = window.CostManager.getItems(isTest);
    category = category.toString();
    window.CostManager.addCategory(category,isTest);
    var i = 0;

    vec.forEach(
        function (ob){
            if(ob.myId == id){

                vec[i].name = name;
                vec[i].description = description;
                vec[i].category = category;
                vec[i].amount = amount;
                vec[i].price = price;
                vec[i].year = date.getFullYear();
                vec[i].month = date.getMonth() +1;
                vec[i].day = date.getDate();

                var text = JSON.stringify(vec);
                if(isTest){//check if test so test won't override db
                    localStorage.removeItem("todoTest")
                    localStorage.setItem("todoTest",text);
                }
                else {
                    localStorage.removeItem("todo")
                    localStorage.setItem("todo",text);
                }

                return;
            }
            i++;
        }
    )


}


window.CostManager.getCategories = function (isTest){//get all categories
    if(isTest){
        var data = localStorage.getItem("categoriesTest");
    }
    else{
        var data = localStorage.getItem("categories");
    }
    if(data==null) {
        return ["New Category"];
    } else {
        var result = JSON.parse(data);
        return result;
    }
}

window.CostManager.addCategory = function(category, isTest){//add category to db
    var categories = window.CostManager.getCategories(isTest);
    var found = false;
    categories.forEach(function (ob){
        if(ob.toString().toUpperCase().valueOf() == category.toString().toUpperCase().valueOf()){
            found = true;
        }
    })
    if(found){
        return;
    }

    categories.push(category);
    var text = JSON.stringify(categories);
    if(isTest){
        localStorage.setItem("categoriesTest", text);
    }
    else {
        localStorage.setItem("categories", text);
    }
}

window.CostManager.getCategoryAmount = function (category, isTest){//get amount of items from specific category
    var count = 0;
    var items = window.CostManager.getItems(isTest);
    items.forEach(
        function (ob) {
            if(ob.category == category){
                count++;
            }
        }
    );
    return count;
}


window.CostManager.filterDates = function (startDate, endDate, isTest){//get all items from range of dates
    var items = window.CostManager.getItems(isTest);
    var filteredItems = [];
    items.forEach(
        function (ob) {
            var itemDate = new Date(ob.year,ob.month,ob.day);
            if(startDate <= itemDate && itemDate <=endDate){
                filteredItems.push(ob);
            }
        }
    );
    return filteredItems;
}


window.CostManager.getCategoryAmountByDate = function (category, startDate, endDate, isTest){//get amount of items from specific category in specific range
    var count = 0;
    var items = window.CostManager.getItems(isTest);
    items.forEach(
        function (ob) {
            var itemDate = new Date(ob.year,ob.month-1,ob.day);
            if(ob.category == category && startDate <= itemDate && itemDate <=endDate){
                count++;
            }
        }
    );
    return count;
}


window.CostManager.clearItems = function (isTest){//clear all items from db
    if(isTest){//check if test so test won't override db
        localStorage.removeItem("todoTest");
    }
    else{
        localStorage.removeItem("todo");
        //localStorage.setItem("todo",null);
    }
}


window.CostManager.clearCategories = function (isTest){//clear all categories from db
    if(isTest){//check if test so test won't override db
        localStorage.removeItem("categoriesTest");
        //localStorage.setItem("categoriesTest",null);
    }
    else{
        localStorage.removeItem("categories");
        //localStorage.setItem("categories",null);
    }
}

window.CostManager.clearIds = function (isTest){//clear all ids from db
    if(isTest){//check if test so test won't override db
        localStorage.removeItem("id_indexTest");
        //localStorage.setItem("categoriesTest",null);
    }
    else{
        localStorage.removeItem("id_index");
        //localStorage.setItem("categories",null);
    }
}



window.CostManager.getCostPerCategory = function (category, isTest){//get total of item costs in category
    var items;
    if(isTest){//check if test so test won't override db
        items = window.CostManager.getItems(true);
        //items = window.CostManager.filterDates(startDate,endDate,true)
    }
    else{
        items = window.CostManager.getItems();
        //items = window.CostManager.filterDates(startDate,endDate);
    }
    if(items != null){
        var costSum = 0;
        for(var i = 0; i < items.length; i++){
            var ob = items[i];
            if(ob.category.toString().toUpperCase().valueOf() == category.toString().toUpperCase().valueOf()){
                costSum = costSum + (parseInt(ob.amount) * parseFloat(ob.price));
            }
        }

        return costSum;
    }
}


window.CostManager.getCostPerCategoryByDate = function (category,startDate,endDate, isTest){//get total of item costs in category
    var costSum = 0;
    var items = window.CostManager.getItems(isTest);
    items.forEach(
        function (ob) {
            var itemDate = new Date(ob.year,ob.month-1,ob.day);
            if(ob.category == category && startDate <= itemDate && itemDate <=endDate){
                costSum = costSum + (parseInt(ob.amount) * parseFloat(ob.price));
            }
        }
    );
    return costSum;

}


