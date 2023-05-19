import '@fortawesome/fontawesome-free/js/all';

import CalorieTracker from './Tracker';
import { Meal,WorkOut } from './Item';

import './css/bootstrap.css';
import './css/style.css';

import {Modal, Collapse} from 'bootstrap';








// const tracker = new CalorieTracker();

// const breakfast = new Meal("breakfast",400);
// const lunch = new Meal('lunch',300);
// const dinner = new Meal('dinner',1500);
// tracker.addMeal(dinner)

// tracker.addMeal(breakfast);
// tracker.addMeal(lunch);
// const run = new WorkOut("morning run",300);
// tracker.addWorkout(run);

// console.log(tracker._meals);
// console.log(tracker._workouts);


// console.log(tracker._totalCalories)


//Class APP


class App{
    constructor(){
        this._tracker = new CalorieTracker();
        this._loadEventListeners();

        this._tracker.loadItems();
        
    }

    // _newMeal(e){
    //     e.preventDefault();
    //     const name = document.getElementById('meal-name');
    //     const calories = document.getElementById('meal-calories');

    //     //Validate inputs
    //     if(name.value== ''|| calories.value== ''){
    //         alert("Please fill in all fields");
    //     }
    //     const meal = new Meal(name.value,+calories.value);
    //     this._tracker.addMeal(meal);
    //     name.value = '';
    //     calories.value = '';
    //     const collapseMeal = document.getElementById('collapse-meal');
    //     const bsCollapse = new bootstrap.Collapse(collapseMeal,{
    //         toggle: true,
    //     })

    // }
    // _newWorkout(e){
    //     e.preventDefault();
    //     const name = document.getElementById('workout-name');
    //     const calories = document.getElementById('workout-calories');
    //     if(name.value==='' || calories.value===''){
    //         alert("Please fill all the fields");
    //     }
    //     const workout = new WorkOut(name.value,+calories.value);
    //     this._tracker.addWorkout(workout);
    //     name.value = '';
    //     calories.value='';
    //     const collapseWorkOut = document.getElementById('collapse-workout');
    //     const bsCollapse = new bootstrap.Collapse(collapseWorkOut,{
    //         toggle:true,
    //     })
    // }

    _loadEventListeners(){
        document.getElementById('meal-form').addEventListener('submit',this._newItem.bind(this,'meal'));
        document.getElementById('workout-form').addEventListener('submit',this._newItem.bind(this,'workout'));
        document.getElementById('meal-items').addEventListener('click',this._removeItem.bind(this,'meal'));
        document.getElementById('workout-items').addEventListener('click',this._removeItem.bind(this,'workout'));
        document.getElementById('filter-meals')
        .addEventListener('keyup',this._filterItems.bind(this,'meal'));
        document.getElementById('filter-workouts')
        .addEventListener('keyup',this._filterItems.bind(this,'workout'));
        document.getElementById('reset').addEventListener('click',this._reset.bind(this));
        document.getElementById('limit-form')
        .addEventListener('submit',this._setLimit.bind(this));
    }


    _newItem(type,e){
        e.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);
        if(name.value==='' || calories.value===''){
            alert("please fill all the fields")
        }
        if(type==='meal'){
            const meal = new Meal(name.value,+calories.value);
            this._tracker.addMeal(meal);
        }else{
            const workout = new WorkOut(name.value,+calories.value);
            this._tracker.addWorkout(workout);
        }
        name.value = '';
        calories.value= '';
        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new Collapse(collapseItem,{
            toggle:true,
        })
    }

    _removeItem(type,e){
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
            if(confirm('Are you sure?')){
                const id = e.target.closest('.card').getAttribute('data-id');
                console.log(id);
                type === 'meal'?this._tracker.removeMeal(id)
                : this._tracker.removeWorkOut(id);

                e.target.closest('.card').remove();
            }
        }
    }

    _filterItems(type,e){

        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach(item=>{
            const name = item.firstElementChild.firstElementChild.textContent;
            if(name.toLowerCase().indexOf(text)!=-1){
                item.style.display = 'block';
            }else{
                item.style.display = 'none';
            }
        })
    }

    _reset(e){
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value='';
        document.getElementById('filter-workouts').value='';
    }

    _setLimit(e){
        e.preventDefault();
        const limit = document.getElementById('limit');
        if(limit.value===''){
            alert('Please add a limit');
            return;
        }

        this._tracker.setLimit(+limit.value);
        limit.value = '';

        const modalEl = document.getElementById('limit-modal');
        const modal = Modal.getInstance(modalEl);
        modal.hide();
    }
}

const app = new App();




