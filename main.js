function EventSetCapsules(){
    try{
        if(CapsulesNumber.value == ""){
            alert("The field is empty or you insert a non-numeric value.");
            CapsulesNumber.value = "";
            return;
        }
        if(CapsulesNumber.value < 0){
            alert("Only positive numbers are allowed!");
            CapsulesNumber.value = "";
            return;
        }    
        TotalCapsules += Number(CapsulesNumber.value);  
        CapsulesAvailable.value = TotalCapsules;
        CapsulesNumber.value = "";
    } catch (e){
        alert("EventSetCapsules " + e);
    }
}
 
function EventReset(){
    try{
        TotalCapsules = Number(0);
        CapsulesAvailable.value = TotalCapsules;
    } catch (e){
        alert("EventReset " + e);
    }
}

function EventSetCode(){
    try{
        var Code = UserCode.value;
        if(UserCode.value == ""){
            alert("The User Code field is empty.");
            return;
        }
        if(Code.length != 4){
            alert("The User Code should be 4 characters long."); 
            UserCode.value = "";
            return;
        }
        
        if(Hidden){
            CoffeeDispenser();
        }

        var E = false;
        for(var I = 0; I < ID.length; I++){
            if(UserCode.value == ID[I]){
                E = true;
                CoffeeToPay.value = UserCoffee[I] + " coffee to pay.";
            }
        }

        if(!E){
            ID.push(UserCode.value);
            UserCoffee.push(Number(0));
            alert("User code " + UserCode.value + " added to the system!");
            CoffeeToPay.value = "";
        }
            
    } catch (e){
        alert("EventSetCode " + e);
    }
}

function CoffeeDispenser(){
    try{
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");

        var CoffeeNumber = document.createElement("input");
        CoffeeNumber.setAttribute("type", "number");
        CoffeeNumber.setAttribute("id", "CoffeeNumber");
        CoffeeNumber.setAttribute("placeholder", "Number of Coffee");

        CoffeeToPay = document.createElement("input");
        CoffeeToPay.setAttribute("type", "text");
        CoffeeToPay.setAttribute("id", "CoffeeToPay");
        CoffeeToPay.setAttribute("placeholder", "Coffee to Pay");
        CoffeeToPay.setAttribute("readonly", "readonly");

        var Erogation = document.createElement("input");
        Erogation.setAttribute("type", "submit");
        Erogation.setAttribute("value", "Erogation");
        Erogation.setAttribute("id", "Erogation");
        p1.appendChild(Erogation);
        p1.insertBefore(CoffeeNumber, Erogation);
        p2.appendChild(CoffeeToPay);
        CoffeeDiv.appendChild(p2);
        CoffeeDiv.insertBefore(p1, p2);

        Erogation.onclick = EventSetErogation;

        // Enter Key Press activation
        CoffeeNumber.addEventListener('keyup', function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                EventSetErogation();
            }
        });

        Hidden = false;
    } catch(e){
        alert("CoffeeDispenser " + e);
    }
}

function EventSetErogation(){
    try{
        if(CoffeeNumber.value == ""){
            alert("The field is empty or you insert a non-numeric value.");
            CoffeeNumber.value = "";
            return;
        }
        if(CoffeeNumber.value <= 0){
            alert("Only positive values are allowed!");
            CoffeeNumber.value = "";
            return;
        }
        if(TotalCapsules > 0){
            if(CoffeeNumber.value > TotalCapsules){
                if(TotalCapsules == 1)
                    alert("There is only 1 capsule left.");
                else
                    alert("There are only " + TotalCapsules + " capsules available.");
                CoffeeNumber.value = "";
                return;
            }
            for(var I = 0; I < ID.length; I++){
                if(ID[I] == UserCode.value){
                    UserCoffee[I] += Number(CoffeeNumber.value);
                    alert("Erogation of " + CoffeeNumber.value + " coffee...!");
                    CoffeeToPay.value = UserCoffee[I] + " coffee to pay.";
                    TotalCapsules -= CoffeeNumber.value;
                    CapsulesAvailable.value = TotalCapsules;
                    CoffeeNumber.value = "";
                }
            }
        } else {
            alert("Sorry, no more capsules are left! Please, add more.")
        }
        
    } catch (e) {
        alert("EventSetErogation " + e);
    }
}


// Variables
var CapsulesAvailable;
var CapsulesNumber;
var SetCapsules;
var Reset;
var UserCode;
var SetCode;
var ID = new Array();
var UserCoffee = new Array();
var CoffeeDiv; 
var CoffeeToPay;

// State Variables
var TotalCapsules = 0;
var Hidden = true;

function LoadManager(){
    try{
        CapsulesAvailable = document.getElementById("CapsulesAvailable");
        CapsulesNumber = document.getElementById("CapsulesNumber");
        SetCapsules = document.getElementById("SetCapsules");
        Reset = document.getElementById("Reset");
        UserCode = document.getElementById("UserCode");
        SetCode = document.getElementById("SetCode");
        CoffeeDiv = document.getElementById("CoffeeDiv");

        CapsulesAvailable.value = "";
        CapsulesNumber.value = "";
        UserCode.value = "";

        SetCapsules.addEventListener('click', EventSetCapsules);
        Reset.addEventListener('click', EventReset);
        SetCode.addEventListener('click', EventSetCode);

        // Enter Key Press activation
        CapsulesNumber.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            EventSetCapsules();
        }
        });

        UserCode.addEventListener('keyup', function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                EventSetCode();
            }
        });
     
    } catch (e){
        alert("LoadManager " + e);
    }
}

window.onload = LoadManager;