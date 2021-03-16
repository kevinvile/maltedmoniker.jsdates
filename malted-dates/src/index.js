import { DateTime, Interval } from 'luxon'

export const Now = () => DateTime.now()
export const Yesterday = () => Now().minus({days: 1})

const daysInInterval = (interval) =>
    interval
        .splitBy({days: 1})
        .map(d1 => d1.start)

const getDaysInRange = (interval, ignoreSunday = false) => 
    ignoreSunday 
        ? daysInInterval(interval).filter(day => day.weekday != 7)
        : daysInInterval(interval)

const ensureLuxon = (date) => 
    !DateTime.isDateTime(date)
        ? DateTime.fromJSDate(date)
        : date

const luxonInterval = (luxonStart, luxonEnd) =>
    Interval.fromDateTimes(luxonStart, luxonEnd)

const getInterval = (startingDate, type) => {
    const start = ensureLuxon(startingDate).startOf(type.toLowerCase())
    const end = start.endOf(type.toLowerCase())
    return luxonInterval(start, end)
}

const getPreviousDaysInterval = (startingDate, numberOfDays) => {
    const end = ensureLuxon(startingDate).endOf('day')
    const start = end.minus({days: numberOfDays}).startOf('day')
    return luxonInterval(start, end)
}

const getIntervalFromDates = (startingDate, endingDate) => {
    const start = ensureLuxon(startingDate).startOf('day')
    const end = ensureLuxon(endingDate).endOf('day')
    return luxonInterval(start, end)
}

const getCurrentWeekDateInterval = (date, rolling) => 
        rolling 
            ? getPreviousDaysInterval(date, 6)
            : getInterval(date, 'week')

const isNextFuture = (interval) => 
    (excludeToday) => 
        interval.end.plus({days : 1}) > (excludeToday ? Yesterday() : Now())

const createRange = (interval, { getNext, getPrevious, ...rest }, ignoreSunday=false) => 
    ({
        start: interval.start,
        end: interval.end,
        dates: getDaysInRange(interval, ignoreSunday),
        isNextFuture: isNextFuture(interval),
        getNext,
        getPrevious,
        ...rest
    })

export const DateRange = (start, end, rest={}) => {
    const interval = getIntervalFromDates(start || Now(), end || Now())
    const days = interval.splitBy({days: 1}).length;

    return createRange(interval, {
        getNext: () => DateRange(interval.start.plus({days}), interval.end.plus({days}), rest),
        getPrevious: () => DateRange(interval.start.minus({days}), interval.end.minus({days}), rest),
        ...rest
    })
}

export const TodayDateRange = () => DateRange(Now(), Now())

export const YesterdayDateRange = (startingDate) => {
    const yesterday = ensureLuxon(startingDate || Now()).minus({days: 1})
    return DateRange(yesterday, yesterday)
}

export const WeekDateRange = (endingDate, rolling=false) => {
    const interval = getCurrentWeekDateInterval(endingDate, rolling);
    return DateRange(interval.start, interval.end, {rolling})
}

export const MonthDateRange = (startingDate, ignoreSunday=true) => {
    const interval = getInterval(startingDate, 'month');
    return createRange(interval, {
        getNext: () => MonthDateRange(interval.end.plus({ days: 1}), ignoreSunday),
        getPrevious: () => MonthDateRange(interval.start.minus({days: 1}), ignoreSunday),
    }, ignoreSunday)
}





