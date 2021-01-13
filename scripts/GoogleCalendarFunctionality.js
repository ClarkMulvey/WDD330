
// Select all of the appointments from the Google Calendar
items = document.querySelectorAll('div.ynRLnc');

// Gets the strings for the appointments in the format:
// "5:15am to 6am, Scriptures/Bfast, Clark Mulvey, Accepted, No location, January 11, 2021"
let appointments = []

items.forEach(
    item => {
        appointments.push(item.innerHTML);
    }
);

// separates the appointments and gets the time and appointment names
// alone
let timeAndAppointmentNameList = []

appointments.forEach(
    item => {
        timeAndAppointmentNameList.push(
            {
                "Time" : item.split(",")[0],
                "AppointmentName" : item.split(",")[1].slice(1)
            }
        );
    }
);

// Tells if a character is a digit or not
// returns a boolean
function isDigit(char) {
    var re = /^\d$/;
    return re.test(char);
}

// This will convert a string in format:
// 1am
// OR
// 12:45pm
// into a float and return
function convertTo24HourDecimal(timeString) {
    let hour = 0;
    let decimal = 0;
    let isPm = timeString[timeString.length-2] == 'p' ? true : false;

    // ###### Get the Hour ##########
    // hour is 10 or above
    if (timeString[0] == 1 && isDigit(timeString[1])) {
        hour = parseFloat(timeString.slice(0,2));
    } 
    // hour is less than 10
    else {
        hour = parseFloat(timeString[0]);
    }

    // ######### Get the Decimal ##########
    // Has a decimal
    if (timeString.includes(':')) {
        decimal = parseFloat(timeString.slice(timeString.length - 4, timeString.length - 2))/60;
    }
    
    // ############ Convert to Military ########
    // if pm - add 12 to the hour
    if (isPm && hour != 12) {
        hour += 12;
    } 
    // midnight - want hour to be zero
    else if (!isPm && hour == 12) {
        hour -= 12;
    }

    return hour += decimal;
}

// Takes a string in the format
// 4:15am to 6am 
// as an argument, and will find out how long
// the appointment is in terms of hours/decimals
// For eaxample if the were the argument
// The result would be 1.75
function getLengthOfAppointment(appointment) {
    const splitString = appointment.split(" ");
    const startTime = convertTo24HourDecimal(splitString[0]);
    const endTime = convertTo24HourDecimal(splitString[2]);

    return endTime - startTime;
}


function doesListContain(item, list) {

    list.forEach (
        listItem => {
            if (listItem.AppointmentName == item) {
                return true;
            }
        }
    )

    return false;
}

function convertAppointments(list) {
    
    let finishedListOfAppointments = [];

    list.forEach(
        item => {
            // If completely new item, add it to our list with it's time and AppointmentName attributes
            if (!doesListContain(item.AppointmentName, finishedListOfAppointments)) {
                finishedListOfAppointments.push( {
                    Time: getLengthOfAppointment(list.Time), AppointmentName: item.AppointmentName
                });
            } 
            
            // If we already have an item with this AppointmentName, update that object's time to +=
            // the current appointment's time
            else {
                
            }
        }
    ); 

    console.log(finishedListOfAppointments);
    return finishedListOfAppointments;

}



const items = [
    {Time: "5:15am to 6am", AptTitle: "Scriptures/Bfast"},
    {Time: "6am to 7:30am", AptTitle: "Exercise/Eat/Ready for day"},
    {Time: "7:30am to 9:45am", AptTitle: "School"},
    {Time: "10am to 12:15pm", AptTitle: "School"},
    {Time: "10:15am to 11:15am", AptTitle: "Calculus"},
    {Time: "12:15pm to 1pm", AptTitle: "Lunch"},
    {Time: "1pm to 4:30pm", AptTitle: "School"},
    {Time: "4:30pm to 5pm", AptTitle: "Dinner"},
    {Time: "5pm to 10pm", AptTitle: "DoorDash"},
    {Time: "5:15am to 6am", AptTitle: "Scriptures/Bfast"},
    {Time: "6am to 7:30am", AptTitle: "Exercise/Eat/Ready for day"},
    {Time: "7:30am to 9:45am", AptTitle: "School"},
    {Time: "8am to 9:30am", AptTitle: "Human Anatomy &amp;amp; Physiology I"},
    {Time: "10am to 12:15pm", AptTitle: "School"},
    {Time: "10:15am to 11:15am", AptTitle: "Calculus"},
    {Time: "12:15pm to 1pm", AptTitle: "Lunch"},
    {Time: "1pm to 4:30pm", AptTitle: "School"},
    {Time: "2:30pm to 4pm", AptTitle: "Web Frontend Development II"},
    {Time: "4:30pm to 5pm", AptTitle: "Dinner"},
    {Time: "6pm to 10pm", AptTitle: "School"},
    {Time: "5:15am to 6am", AptTitle: "Scriptures/Bfast"},
    {Time: "6am to 7:30am", AptTitle: "Exercise/Eat/Ready for day"},
    {Time: "7:30am to 9:45am", AptTitle: "School"},
    {Time: "9am to 9:30am", AptTitle: "Meeting with Prof. Thayne"},
    {Time: "10am to 12:15pm", AptTitle: "School"},
    {Time: "10:15am to 11:15am", AptTitle: "Calculus"},
    {Time: "12:15pm to 1pm", AptTitle: "Lunch"},
    {Time: "1pm to 4:30pm", AptTitle: "School"},
    {Time: "4:30pm to 5pm", AptTitle: "Dinner"},
    {Time: "5pm to 10pm", AptTitle: "DoorDash"},
    {Time: "5:15am to 6am", AptTitle: "Scriptures/Bfast"},
    {Time: "6am to 7:30am", AptTitle: "Exercise/Eat/Ready for day"},
    {Time: "7:30am to 9:45am", AptTitle: "School"},
    {Time: "8am to 9:30am", AptTitle: "Human Anatomy &amp;amp; Physiology I"},
    {Time: "10am to 12:15pm", AptTitle: "School"},
    {Time: "10:15am to 11:15am", AptTitle: "Calculus"},
    {Time: "12:15pm to 1pm", AptTitle: "Lunch"},
    {Time: "1pm to 4:30pm", AptTitle: "School"},
    {Time: "2:30pm to 4pm", AptTitle: "Web Frontend Development II"},
    {Time: "4:30pm to 5pm", AptTitle: "Dinner"},
    {Time: "6pm to 7:30pm", AptTitle: "School"},
    {Time: "5:15am to 6am", AptTitle: "Scriptures/Bfast"},
    {Time: "6am to 7:30am", AptTitle: "Exercise/Eat/Ready for day"},
    {Time: "7:30am to 9:45am", AptTitle: "School"},
    {Time: "10am to 12:15pm", AptTitle: "School"},
    {Time: "10:15am to 11:15am", AptTitle: "Calculus"},
    {Time: "12:15pm to 1pm", AptTitle: "Lunch"},
    {Time: "1pm to 4:30pm", AptTitle: "School"},
    {Time: "4:30pm to 5pm", AptTitle: "Dinner"},
    {Time: "5pm to 11pm", AptTitle: "DoorDash"},
    {Time: "5pm to 11pm", AptTitle: "DoorDash"}
]