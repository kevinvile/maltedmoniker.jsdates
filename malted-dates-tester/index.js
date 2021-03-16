import { MonthDateRange, WeekDateRange, YesterdayDateRange, DateRange } from 'malted-dates'

var m = MonthDateRange(new Date(), false)

m.dates.forEach(d => console.log(d.toString()))
console.log('')

const m1 = m.getNext()
m1.dates.forEach(d => console.log(d.toString()))
console.log('')

const m2 = m.getPrevious()
m2.dates.forEach(d => console.log(d.toString()))
console.log('')

console.log(m.start.startOf("week").weekday)
console.log(m1.start.startOf("week").weekday)
console.log(m2.start.startOf("week").weekday)


console.log(m.start.endOf("week"))
console.log(m1.start.endOf("week").weekday)
console.log(m2.start.endOf("week").weekday)

const w = WeekDateRange(new Date(), false);
w.dates.forEach(d => console.log(d.toString()))
console.log('')

const w2 = w.getNext();
w2.dates.forEach(d => console.log(d.toString()))
console.log('')

console.log(w2)

// const y = YesterdayDateRange()
// y.dates.forEach(d => console.log(d.toString()))
// console.log('')

// const y2 = y.getNext();
// y2.dates.forEach(d => console.log(d.toString()))
// console.log('')

// const y3 = y.getPrevious();
// y3.dates.forEach(d => console.log(d.toString()))
// console.log('')


// const r = DateRange(new Date(2021,3,12), new Date(2021,3,30))
// r.dates.forEach(d => console.log(d.toString()))
// console.log('')

// const r2 = r.getNext();
// r2.dates.forEach(d => console.log(d.toString()))
// console.log('')

// const r3 = r.getPrevious();
// r3.dates.forEach(d => console.log(d.toString()))
// console.log('')

// const t = DateRange()
// t.dates.forEach(d => console.log(d.toString()))
// console.log('')

// const t2 = t.getNext();
// t2.dates.forEach(d => console.log(d.toString()))
// console.log('')

// const t3 = t.getPrevious();
// t3.dates.forEach(d => console.log(d.toString()))
// console.log('')