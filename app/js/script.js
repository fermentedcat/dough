document.addEventListener("DOMContentLoaded", function(e) {
    
    let sourdough = new Bake();
    sourdough.importSteps(sourdoughSteps);

    sourdough.displaySteps();

})

class Bake {
    constructor() {
        this.steps = [];
        
        // let endTime = 8;
        this.main = document.querySelector("main");
        this.stepsWrapper; //div
        this.displayTimePicker();
    }
    displayTimePicker() {
        let timePicker = document.createElement("div");
        timePicker.className = "timePicker";
        this.main.appendChild(timePicker);
        let inputDate = document.createElement("input");
        inputDate.setAttribute("type", "date");
        let inputTime = document.createElement("input");
        inputTime.setAttribute("type", "time");
        let submitInput = document.createElement("button");
        submitInput.innerHTML = "Set time"
        timePicker.appendChild(inputDate);
        timePicker.appendChild(inputTime);
        timePicker.appendChild(submitInput);
        
        submitInput.addEventListener("click", e => {

            let minutes = parseInt(inputTime.value.substring(inputTime.value.length - 2));
            let hoursInMinutes = parseInt(inputTime.value.substring(0, 2));
            let endTimeInMinutes = (hoursInMinutes * 60) + minutes;

            this.setTimes(endTimeInMinutes);
            this.displayTimes();
            let startButton = document.createElement("button");
            startButton.innerHTML = "Start baking";
            startButton.className = "startButton"
            console.log(this.main.firstElementChild);
            timePicker.appendChild(startButton);
        })
    }
    importSteps(data) {
        for (let obj of data) {
            this.steps.push(new Step(obj));
        }
    }

    setTimes(endTime) {
        for (let step of this.steps) {
            step.updateTime(endTime)
        }
    }

    displaySteps() {
        this.stepsWrapper = document.createElement("div");
        this.stepsWrapper.className = "allSteps";
        this.main.appendChild(this.stepsWrapper);
        console.log(this.steps);
        for (let step of this.steps) {
            step.displayStep(this.stepsWrapper);
            this.stepsWrapper.appendChild(step.wrapper);
        }
    }

    displayTimes() {
        for (let step of this.steps) {
            step.displayTime();
        }

    }
    
}

class Step {
    constructor(step) {
        this.name = step.name;
        this.minutesBeforeDone = step.minutesBeforeDone;
        this.description = step.description;
        this.startTime = 0; //// in minutes
        this.startHour = ""; // 12.30
        this.isAlerted = false;
        this.status = "inactive"; // this.active = false;

        this.wrapper;
    }
    updateTime(endTime) {
        this.startTime = endTime - this.minutesBeforeDone;
        let divideByHours = this.startTime / 60;
        let minutes = Math.trunc((divideByHours % 1) * 60);
        let hours = Math.trunc(divideByHours);
        if (hours < 10) {
            hours = "0" + hours;
        }
        let time = hours + ":" + minutes;
        this.startHour = time;
    }
    displayTime() {
        let time = document.createElement("h4");
        time.className = "stepTime";
        time.innerHTML = this.startHour;
        this.wrapper.firstChild.append(time);
    }
    displayStep() {
        this.wrapper = document.createElement("div");
        let h4 = document.createElement("h4");
        h4.innerHTML = this.name;
        this.wrapper.appendChild(h4);
        for (let part of this.description) {
            let p = document.createElement("p");
            p.innerHTML = part;
            this.wrapper.appendChild(p);
        }
    }
}

let sourdoughSteps = [
    {
        name: "Step 1",
        minutesBeforeDone: 810,
        description: ["Mix together in a bowl:",  "65-70g active sourdough", "350g water", "450-470g flour"]
    },
    {
        name: "Step 2",
        minutesBeforeDone: 750,
        description: ["Fold in:", "10g salt", "Additional seasoning"]
    },
    {
        name: "Step 3",
        minutesBeforeDone: 630,
        description: ["Fold"]
    },
    {
        name: "Step 4",
        minutesBeforeDone: 600,
        description: ["Fold"]
    },
    {
        name: "Step 5",
        minutesBeforeDone: 570,
        description: ["Fold"]
    },
    {
        name: "Step 6",
        minutesBeforeDone: 540,
        description: ["Fold"]
    },
    {
        name: "Step 7",
        minutesBeforeDone: 510,
        description: ["Pour onto floured countertop", "Form a little"]
    },
    {
        name: "Step 8",
        minutesBeforeDone: 495,
        description: ["Shape the dough", "Put into basket and let it rest in the fridge"]
    },
    {
        name: "Step 9",
        minutesBeforeDone: 60,
        description: ["Take out from the fridge", "Set the oven to 250°C", "Put oven plate in to heat up"]
    },
    {
        name: "Step 10",
        minutesBeforeDone: 30,
        description: ["When the temperature reaches 250°C:", "Flip the dought onto a baking sheet", "Cut the dough across center", "Put in oven", "Add a couple of ice cubes to the bottom of the oven", "After 15 min: open to let some humidity out", "Lower the temp to about 200-225°C if the bread is gettig too dark", "Bake for around 30 min", "Bread is done at an inner temp of 98°C"]
    }
]