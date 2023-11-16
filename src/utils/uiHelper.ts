export function returnDayOfWeek(day: number){
    if(day < 0 || day > 6) throw new Error('day must be between 0 and 6');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + day);
    return nextDate
}