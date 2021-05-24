// luxon time set
DateTime = luxon.DateTime;
var dt = luxon.DateTime.now();
$('#currentDay').text(dt.toLocaleString(DateTime.DATETIME_FULL));

var schedule = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
};

$(document).ready(function(){
    if(!localStorage.getItem('schedule')) {
      updateTask(schedule);
    } else {
      updateTask(JSON.parse(localStorage.getItem('schedule')));
    }
})

// count hour, set color class
var counter = 8;
for(var property in schedule) {
    var textInput = "#text-input" + counter;
    $(textInput).text(schedule[property]);
    var hourId = "#hour" + counter;
    var presentHour = dt.hour;
    var timeString = $(hourId).text();
    var time = hourStringToNumber(timeString);
    
    if(time < presentHour) {
        $(textInput).addClass("past");
    } else if (time > presentHour) {
        $(textInput).addClass("future");
    } else {
        $(textInput).addClass("present");
    }
    counter ++;
}

// string to number for counter
function hourStringToNumber(hourString) {
    switch(hourString) {
        case "8 AM": return 8;
        case "9 AM": return 9;
        case "10 AM": return 10;
        case "11 AM": return 11;
        case "12 PM": return 12;
        case "1 PM": return 13;
        case "2 PM": return 14;
        case "3 PM": return 15;
        case "4 PM": return 16;
        case "5 PM": return 17;
    }
}

// save button
$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    saveSchedule(hourString, value);
});


function initializeLocalStorage() {
    localStorage.setItem('schedule', JSON.stringify(schedule));
};

function saveToLocalStorage(dayEl) {
    localStorage.setItem('schedule', JSON.stringify(dayEl));
}

function saveSchedule(hourString, val) {
    if(!localStorage.getItem('schedule')) {
        initializeLocalStorage();
    }
    var workHours = JSON.parse(localStorage.getItem('schedule'));
    workHours[hourString] = val
    saveToLocalStorage(workHours);
}

function updateTask(dayElement) {
    $(".schedule-row").each(function() {
        var res = $(this).children("div");
        $(this).children("textarea").text(dayElement[res.text()]);
    })
}