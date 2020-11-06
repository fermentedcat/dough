document.addEventListener("DOMContentLoaded", function(e) {
    
    let sourdough = new Bake();
    sourdough.importSteps(sourdoughSteps);

})

class Bake {
    constructor() {
        this.steps = [];
        
        // let endTime = 8;
        this.main = document.querySelector("main");
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
        this.isAlerted = false;
    }
    updateTime(endTime) {
        this.startTime = endTime - this.minutesBeforeDone;
    }
    displayTime() {
        console.log(this.startTime);
    }
}

let sourdoughSteps = [
    {
        name: "step1",
        minutesBeforeDone: 810,
        description: "..."
    },
    {
        name: "step2",
        minutesBeforeDone: 750,
        description: "..."
    },
    {
        name: "step3",
        minutesBeforeDone: 630,
        description: "..."
    },
    {
        name: "step4",
        minutesBeforeDone: 600,
        description: "..."
    },
    {
        name: "step5",
        minutesBeforeDone: 570,
        description: "..."
    },
    {
        name: "step6",
        minutesBeforeDone: 540,
        description: "..."
    },
    {
        name: "step7",
        minutesBeforeDone: 510,
        description: "..."
    },
    {
        name: "step8",
        minutesBeforeDone: 495,
        description: "..."
    },
    {
        name: "step9",
        minutesBeforeDone: 60,
        description: "..."
    },
    {
        name: "step10",
        minutesBeforeDone: 30,
        description: "..."
    }
]