
class Storage{
    static getCalorieLimit(defaultLimit = 2000){
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null){
            calorieLimit = defaultLimit;
        }else{
            calorieLimit = + localStorage.getItem('calorieLimit');
        }

        return calorieLimit;

    }

    static setCalorieLimit(calorieLimit){
        localStorage.setItem('calorieLimit',calorieLimit);
    }

    static getTotalCalories(defaultCalories = 0){
        let totalCalories;
        if(localStorage.getItem('totalCalories') === null){
            totalCalories = defaultCalories;
        }else{
            totalCalories = + localStorage.getItem('totalCalories');
        }

        return totalCalories;
    }


    static updateTotalCalories(calories){
        localStorage.setItem('totalCalories',calories);
    }

    static getMeals(){
        let meals;
        if(localStorage.getItem('meals')===null){
            meals = []
        }else{
            meals = JSON.parse(localStorage.getItem('meals'));
        }

        return meals;
    }

    static saveMeal(meal){
        const meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meals',JSON.stringify(meals));

    }

    static removeMeal(id){
        const meals = Storage.getMeals();
        meals.forEach((meal,index)=>{
            if(meal.id === id){
                meals.splice(index,1);
            }
        })
        localStorage.setItem('meals',JSON.stringify(meals));
    }

    static getWorkOuts(){
        let workouts;
        if(localStorage.getItem('workouts')===null){
            workouts = []
        }else{
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;
    }

    static saveWorkOut(workout){
        const workouts = Storage.getWorkOuts();
        workouts.push(workout);
        localStorage.setItem('workouts',JSON.stringify(workouts));
    }

    static removeWorkOut(id){
        const workouts = Storage.getWorkOuts();
        workouts.forEach((workout,index)=>{
            if(workout.id === id){
                workouts.splice(index,1);
            }
        })
        localStorage.setItem('workouts',JSON.stringify(workouts));
    }

    static clearAll(){
        localStorage.clear();
    }


}
export default Storage;