function openFeatures() {
    let allElems = document.querySelectorAll('.elem')
    let fullElemPage = document.querySelectorAll('.fullElem')
    let fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}
openFeatures()

function todoList() {

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    let currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is Empty');

    }


    function renderTask() {
        let allTask = document.querySelector('.allTask')

        let sum = ''

        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
        <h5>${elem.task}<span class = ${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`
        })

        allTask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)

                renderTask()
            })
        })
    }
    renderTask()


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let taskValue = taskInput.value.trim();
        let detailsValue = taskDetailsInput.value.trim();
        let errorEl = document.getElementById('task-error');

        if (!taskValue) {
            errorEl.style.display = 'block'; // show error
            return;
        } else {
            errorEl.style.display = 'none'; // hide error
        }

        currentTask.push({
            task: taskValue,
            details: detailsValue,
            imp: taskCheckbox.checked
        });

        renderTask();

        taskCheckbox.checked = false;
        taskInput.value = '';
        taskDetailsInput.value = '';
    });


}
todoList()

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDaySum = ''

    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${savedData}>
                </div>`
    })


    dayPlanner.innerHTML = wholeDaySum

    var dayPlannerInput = document.querySelectorAll('.day-planner input')


    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}
dailyPlanner()


function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let responese = await fetch('https://api.adviceslip.com/advice')
        let data = await responese.json()

        motivationQuoteContent.innerHTML = `${data.slip.advice}`
        motivationAuthor.innerHTML = "Advice Bot";

    }

    fetchQuote()
}

motivationalQuote()

function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1')
    let startBtn = document.querySelector('.pomo-timer .start-timer')
    let pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    let resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    let isWorkSession = true

    let timerInterval = null
    let totalSeconds = 25 * 60

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {


            timerInterval = setInterval(() => {

                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60

                }
            }, 1000);
        } else {


            timerInterval = setInterval(() => {

                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60

                }
            }, 1000);
        }



    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }

    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()
    }

    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)

}

pomodoroTimer()


function wheatherFunctionality() {
    const apikey = "87cf32deedd9442793a70453250305";
    const city = "Bhubaneswar";

    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    // const data = null

    async function weatherAPICall() {
        var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)

        let data = await response.json()

        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heatindex: ${data.current.heatindex_c}%`
    }

    weatherAPICall()

    function timeDate() {
        const totalDaysOfWeak = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeak = totalDaysOfWeak[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeak}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`
        } else {
            header1Time.innerHTML = `${dayOfWeak}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);
}

wheatherFunctionality()

function changeTheme() {
    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#7d7266ff')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }
    })

}

changeTheme()

function dailyGoals() {
    document.addEventListener("DOMContentLoaded", () => {
        const goalInput = document.getElementById("goalInput");
        const goalDate = document.getElementById("goalDate");
        const goalPriority = document.getElementById("goalPriority");
        const addBtn = document.getElementById("addBtn");
        const errorMessage = document.getElementById("errorMessage");
        const goalList = document.getElementById("goalList");

        // Add goal handler
        addBtn.addEventListener("click", () => {
            const text = goalInput.value.trim();
            const date = goalDate.value;
            const priority = goalPriority.value;

            if (text === "") {
                errorMessage.textContent = "⚠️ Please enter a goal!";
                return;
            }

            errorMessage.textContent = "";
            createGoal(text, false, date, priority);

            goalInput.value = "";
            goalDate.value = "";
            goalPriority.value = "low";

            saveGoals();
            updateProgress();
        });

        // Create Goal Element
        function createGoal(text, completed, date = "", priority = "low") {
            const li = document.createElement("li");

            // Store raw text & meta in dataset
            li.dataset.text = text;
            li.dataset.date = date;
            li.dataset.priority = priority;

            if (completed) li.classList.add("completed");

            // ✅ Clicking on <li> (not buttons) toggles complete
            li.addEventListener("click", (e) => {
                if (e.target.tagName === "BUTTON") return; // don’t toggle when clicking buttons
                li.classList.toggle("completed");
                updateProgress();
                saveGoals();
            });

            // Goal text
            const goalText = document.createElement("span");
            goalText.textContent = text + (date ? ` (${date})` : "");

            // Priority label
            const priorityLabel = document.createElement("small");
            priorityLabel.textContent = `[${priority}]`;
            priorityLabel.className = "priority-label";

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.textContent = "✏️";
            editBtn.className = "edit-btn";
            editBtn.onclick = (e) => {
                e.stopPropagation();
                if (goalText.contentEditable === "true") {
                    goalText.contentEditable = "false";
                    editBtn.textContent = "✏️";
                    li.dataset.text = goalText.textContent.replace(/\s\(\d{4}-\d{2}-\d{2}\)$/, "");
                    saveGoals();
                } else {
                    goalText.contentEditable = "true";
                    goalText.focus();
                    editBtn.textContent = "💾";
                }
            };

            // Delete button
            const delBtn = document.createElement("button");
            delBtn.textContent = "X";
            delBtn.className = "delete-btn";
            delBtn.onclick = (e) => {
                e.stopPropagation();
                goalList.removeChild(li);
                updateProgress();
                saveGoals();
            };

            li.appendChild(goalText);
            li.appendChild(priorityLabel);
            li.appendChild(editBtn);
            li.appendChild(delBtn);
            goalList.appendChild(li);
        }

        // Save goals to localStorage
        function saveGoals() {
            const goals = [];
            document.querySelectorAll("#goalList li").forEach((li) => {
                goals.push({
                    text: li.dataset.text,
                    completed: li.classList.contains("completed"),
                    date: li.dataset.date,
                    priority: li.dataset.priority,
                });
            });
            localStorage.setItem("dailyGoals", JSON.stringify(goals));
        }

        // Load goals from localStorage
        function loadGoals() {
            const storedGoals = JSON.parse(localStorage.getItem("dailyGoals")) || [];
            storedGoals.forEach((goal) => {
                createGoal(goal.text, goal.completed, goal.date, goal.priority);
            });
            updateProgress();
        }

        // Update progress bar
        function updateProgress() {
            const allGoals = document.querySelectorAll("#goalList li");
            const completedGoals = document.querySelectorAll("#goalList li.completed");
            const progress = document.getElementById("progress");
            const progressBar = document.getElementById("progressBar");

            const total = allGoals.length;
            const completed = completedGoals.length;

            progress.textContent = `✅ ${completed}/${total} goals completed`;
            progressBar.value = total === 0 ? 0 : (completed / total) * 100;
        }

        // Initialize
        loadGoals();
    });
}

dailyGoals();
