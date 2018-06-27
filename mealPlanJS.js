

// this function only does something visible if user will have to add money
/* determines how many days are left once mealplan reaches 0
only runs if predicted future total wasted is greater than whats
left in their meal plan
returns how much $ to add back based
on days leftover when money reaches 0 * avg money spent every day */
const moneyToAdd = (predictedTotal, actualTotal, avg, daysRemaining) => {
    for(let i = daysRemaining; i > 0; i = i -1){
        actualTotal = actualTotal - avg;
        if(actualTotal <= 0){
            return [i, (i * avg).toFixed(2)];
        }
    }
}

//  function that returns how much money to spend everyday to reach last day without adding any money
const suggestedSpending = (actualTotal, avg, daysRemaining) =>{
    let moneySuggested = actualTotal / daysRemaining;
    return moneySuggested.toFixed(2);
} 

const nowMoment = moment();
// sets the last day of the semester
const endDateMoment = moment("20180822", "YYYYMMDD"); 
const myMealPlan = document.getElementById('mealPlan');
const avgSpent = document.getElementById('average');
const myButton = document.getElementById('gone');
const h2 = document.getElementById("Results");


// after selecting elements, I added an event listener, that when 
// button clicked, it logs the value inside the input and alerts that value / 4

myButton.addEventListener('click', () => {
    
    h2.textContent  = "";
    
    // checks for empty, neg, not num
    let inputTotal = myMealPlan.value;
    let inputAvg = avgSpent.value;
    
    if(inputTotal == "" || inputTotal == null ||
      inputAvg == "" || inputAvg == null){
        
        alert("You need to put number in");
        
    }else{

        //  gets how many days are left until the semester is over
        let daysLeft = endDateMoment.dayOfYear() - nowMoment.dayOfYear();
        let total = myMealPlan.value;  // grabs user input of meal plan total
        let averageMoney = avgSpent.value;  // grabs user input of avg $ spent
        let futureWasted = averageMoney * daysLeft; // predicts future wasted total based on days left and avg spent


        h2.innerHTML = "With a meal plan of $" +total+ " and an average spending of $" +averageMoney+ ": ";
        if(futureWasted> total){
            const cashToAdd = moneyToAdd(futureWasted, total, averageMoney, daysLeft);

            // daysBroke is how many days remain where mealplan is 0
            let daysBroke = cashToAdd[0];

            // numDayYouAreBroke is the day of the year that you will hit 0 (0 - 365)
            let numDayYouAreBroke = endDateMoment.dayOfYear() - daysBroke;

            //  displays that day in terms of date (actual month and day of that month)
            let displayBrokeDate = moment(numDayYouAreBroke, "DDD DDDD").format("dddd, MMMM Do YYYY");
            h2.innerHTML += "</br>You will, at this rate, have no money left by " +displayBrokeDate+ ". This is "+daysBroke+ " days before the semester finishes. You would have to add $" +cashToAdd[1]+ " into your account.";

        }
        else{

            h2.innerHTML += "</br>Luckily, at this rate, you won't have to add any money."

        }

        h2.innerHTML += "<br><br>We suggest spending $" +suggestedSpending(total, averageMoney, daysLeft)+
            " everyday so that your mealplan will last for the semester.";

        myMealPlan.value = "";
        avgSpent.value = "";
    
    }
});

