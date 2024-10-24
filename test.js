const date = new Date();
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());

// ok so lets say we started the timer at 12:00 now at 12:25 pomodoro will complete and at 12:30 break will be completed

// lets say i just landed on the site at 12:00 the pomodoro timer starts now the timer lapsed 6 mins 3 seconds => 12:06:03

// now let's say someone else landed on the site at 12:06:03, we can get that 6 mins 3 seconds elapsed.

// currently server is updating every single seconds, this is not efficient

// My solution

// 1. When the user lands on the site we will only send the time pomodoro started.
// 2. the client will calculate the time elapsed and start timer client side.

// 12 17 -> 5 hours -> 10 pomodoro

// but the problem with this approach is that the user can change the time and start the timer again.

// we can send the timer state only through socket when the user connected.
