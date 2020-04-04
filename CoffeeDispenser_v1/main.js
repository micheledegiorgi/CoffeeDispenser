function EventAddCapsule(){
    try{
        var Capsules = CapsulesNumber.value;
        if(isNaN(Capsules)){
            alert("Only numeric values are allowed!");
            CapsulesNumber.value = "";
            return;
        }
        if(Capsules < 0){
            alert("Only positive numbers are allowed!");
            CapsulesNumber.value = "";
            return;
        }
        Capsules++;
        CapsulesNumber.value = Capsules;
    } catch (e){
        alert("EventAddCapsule " + e);
    }
}

function EventSetCapsules(){
    try{
        if(CapsulesNumber.value == ""){
            alert("One or more fields are empty.");
            return;
        }
        if(isNaN(CapsulesNumber.value)){
            alert("Only numeric values are allowed!");
            CapsulesNumber.value = "";
            return;
        }
        if(CapsulesNumber.value < 0){
            alert("Only positive numbers are allowed!");
            CapsulesNumber.value = "";
            return;
        }
        var Capsules = CapsulesNumber.value;
        Capsules = Number(Capsules);    
        StateCapsules += Capsules;  
        alert("We got it! " + StateCapsules + " capsules remaining.");  
        CapsulesNumber.value = "";
    } catch (e){
        alert("EventSetCapsules " + e);
    }
}

function EventErogation(){
    try{
        if(StateCapsules > 0){
            if(CoffeeNumber.value == ""){
                alert("One or more fields are empty.");
                return;
            }
            if(isNaN(CoffeeNumber.value)){
                alert("Only numeric values are allowed in the Coffee Number field!");
                CoffeeNumber.value = "";
                UserCode.value = "";
                return;
            }
            if(CoffeeNumber.value <= 0){
                alert("Only positive numbers > of 0 are allowed!");
                CoffeeNumber.value = "";
                UserCode.value = "";
                return;
            }
            if(CoffeeNumber.value > StateCapsules){
                alert("Only " + StateCapsules + " capsules are available.");
                CoffeeNumber.value = "";
                return;
            }
            var Code = UserCode.value;
            if(Code.length != 4){
                alert("The User Code should be 4 characters long."); 
                UserCode.value = "";
                return;
            }
            
            var N = Number(CoffeeNumber.value);
            if(L < 1){
                Users.push({UserID: Code, UserCoffee: 0});
                alert("User " + Users[0].UserID + " added!");
                L = 1;
            }
            
            var E = false;
            var J;
            if(!E){
                for(var I = 0; I < Users.length; I++){
                    if(UserCode.value == Users[I].UserID){
                        E = true;
                        J = I;
                    }      
                }
            }

            if(E){
                Users[J].UserCoffee += N;
                TotalCoffee += N;
                if(CoffeeNumber.value > 1)
                    alert("Erogation of " + CoffeeNumber.value + " coffee...! Aren't they a bit too much?")
                else
                    alert("Erogation of 1 coffee...!");
            } else {
                Code = UserCode.value;
                N = Number(CoffeeNumber.value);
                Users.push({UserID: Code, UserCoffee: N});
                alert("User " + Users[Users.length-1].UserID + " added!");
                if(Users[I].UserCoffee > 1)
                    alert("Erogation of " + CoffeeNumber.value + " coffee...! Aren't they a bit too much?")
                else
                    alert("Erogation of 1 coffee...!");
                StateCapsules -= N;
                if(StateCapsules == 0)
                    alert("No more capsules are left. Add more!")
                else
                    alert("Only " + StateCapsules + " capsules remaining.");
                CoffeeNumber.value = "";
                UserCode.value = "";
                return;
            }

            StateCapsules -= N;
            if(StateCapsules == 0)
                alert("No more capsules are left. Add more!")
            else
                alert("Only " + StateCapsules + " capsules remaining.");
            CoffeeNumber.value = "";
            UserCode.value = "";
        } else {
            alert("Sorry! No more capsules are left.")
            UserCode.value = "";
            CoffeeNumber.value = "";
        }
    
    } catch (e){
        alert("EventErogation " + e);
    }
}

function EventCheckToPay(){
    try{
        if(UserCodeCheck.value == ""){
            alert("One or more fields are empty.");
            return;
        }
        var Code = UserCodeCheck.value
            if(Code.length != 4){
                alert("The User Code should be 4 characters long."); 
                UserCode.value = "";
                return;
            }
        if(L == 0){
            alert("No user in memory.")
            UserCodeCheck.value = "";
            return;
        }
        var E = false;
        if(!E){
            for(var I = 0; I < Users.length; I++){
                if(UserCodeCheck.value == Users[I].UserID){
                    E = true;
                }      
            }
        }

        if(E){
            for(var I = 0; I < Users.length; I++){
                if(UserCodeCheck.value == Users[I].UserID)
                    CoffeeToPay.value = Users[I].UserCoffee + " coffee to pay...";
            }
        } else {
            alert("The user " + UserCodeCheck.value + " was not found.");
            CoffeeToPay.value = "";
            UserCodeCheck.value = "";
        }
    } catch (e){
        alert("EventErogation " + e);
    }
}

// Variables
var CapsulesNumber;
var AddCapsule;
var SetCapsules;
var CoffeeNumber;
var UserCode;
var Erogation;
var UserCodeCheck; 
var CheckToPay;
var CoffeeToPay;
var L = 0;
var Users = new Array(L);

// State Variables
var StateCapsules = 0;
var TotalCoffee = 0;


function LoadManager(){
    try{
        CapsulesNumber = document.getElementById("CapsulesNumber");
        AddCapsule = document.getElementById("AddCapsule");
        SetCapsules = document.getElementById("SetCapsules");
        CoffeeNumber = document.getElementById("CoffeeNumber");
        UserCode = document.getElementById("UserCode");
        Erogation = document.getElementById("Erogation");
        UserCodeCheck = document.getElementById("UserCodeCheck");
        CheckToPay = document.getElementById("CheckToPay");
        CoffeeToPay = document.getElementById("CoffeeToPay");

        CapsulesNumber.value = "";
        CoffeeNumber.value = "";
        UserCode.value = "";
        UserCodeCheck.value = "";
        CoffeeToPay.value = "";

        AddCapsule.onclick = EventAddCapsule;
        SetCapsules.onclick = EventSetCapsules;
        Erogation.onclick = EventErogation;
        CheckToPay.onclick = EventCheckToPay;
    } catch (e){
        alert("LoadManager " + e);
    }
}

window.onload = LoadManager;