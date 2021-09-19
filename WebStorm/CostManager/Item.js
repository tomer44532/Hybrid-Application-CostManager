class Item
{

    //class properites
    #name;
    #description;
    #category;
    #amount;
    #price;
    #day;
    #month;
    #year;
    //static id;
    #myId;

    //constructor
    constructor(obj,isTest,name, description,category,amount,price,day, month,year) {
        if(arguments.length >2){//normal constructor
            var idIndex;
            if(isTest){
                idIndex = localStorage.getItem("id_indexTest");

            }
            else {
                idIndex = localStorage.getItem("id_index");
            }

            if(idIndex == null){
                idIndex = 0;
                this.myId = idIndex;

            }
            else {
                idIndex++;
                this.myId = idIndex;
            }
            if(isTest){//check if test so test won't override db
                localStorage.setItem("id_indexTest",idIndex);
            }
            else {
                localStorage.setItem("id_index",idIndex);
            }

            this.#name = name;
            this.#description = description;
            this.#category = category;
            this.#amount = amount;
            this.#price = price;
            this.#day = day;
            this.#month = month;
            this.#year = year;



        }
        else {//copy constructor
            obj && Object.assign(this, obj);

        }

    }


//getters and setters
    get name(){
        return this.#name;
    }

    set name(name){
        this.#name = name;
    }

    get description(){
        return this.#description;
    }

    set description(description){
        this.#description = description;
    }

    get category(){
        return this.#category;
    }

    set category(category){
        this.#category = category;
    }

    get amount(){
        return this.#amount;
    }

    set amount(amount){
        this.#amount = amount;
    }

    get price(){
        return this.#price;
    }

    set price(price){
        this.#price = price;
    }

    get day(){
        return this.#day;
    }

    set day(day){
        this.#day = day;
    }

    get month(){
        return this.#month;
    }

    set month(month){
        this.#month = month;
    }

    get year(){
        return this.#year;
    }

    set year(year){
        this.#year = year;
    }


    get myId(){
        return this.#myId;
    }

    set myId(id){
        this.#myId = id;
    }


    toJSON() {
        return {
            name: this.#name,
            description: this.#description,
            category: this.#category,
            amount: this.#amount,
            price: this.#price,
            day: this.#day,
            month: this.#month,
            year: this.#year,
            myId: this.#myId
        }
    }

    fromJson(){
    }
}