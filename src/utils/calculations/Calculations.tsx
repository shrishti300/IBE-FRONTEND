export function calcAvg(startDate : string, endDate : string, roomRates : {[date : string] : number}){
    let startDateObj = new Date(startDate);
    let endDateObj = new Date(endDate);
    let prices = 0, nights = 0;

    while(startDateObj <= endDateObj){
        prices += roomRates[startDateObj.toISOString().split("T")[0]];
        nights++;
        startDateObj.setDate(startDateObj.getDate() + 1); 
    }

    return prices/nights;
}

export function calcDiscPrice(price:number, priceFactor: number){
    return price * priceFactor;
}

export function checkValidWeekend(startDate: string, endDate: string){
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isStartWeekend = start.getDay() === 6; 
    const isEndWeekend = end.getDay() === 0;

    return isStartWeekend && isEndWeekend && end.getTime() - start.getTime() === 24 * 60 * 60 * 1000;
}

export function checkValidLongWeekend(startDate: string, endDate: string){
    const start = new Date(startDate);
    const end = new Date(endDate);

    let days = 0;
    let sat = false, sun = false;

    while(start <= end){
        if(start.getDay() === 0)    sun = true;
        if(start.getDay() === 6)    sat = true;
    
        start.setTime(start.getTime() + 24 * 60 * 60 * 1000);
        days++;
    }

    return sat && sun && days > 2;
}

export function checkMinValidDays(startDate: string,endDate : string, minDays: number){
    const start = new Date(startDate), end = new Date(endDate);
    if(minDays * 24 * 60 * 60 * 1000 <= (end.getTime() - start.getTime()) ){
        return true;
    }
    return false;
}

export function convertDateFormat(startDate: string){
    const start = new Date(startDate);
    return start.toDateString();
}

export function countDates(startDateObj: Date, endDateObj: Date){
    let nights = 0;
    while(startDateObj <= endDateObj){
        nights++;
        startDateObj.setDate(startDateObj.getDate() + 1); 
    }
    return nights;
}

export function countTotalPrice(hashmap: {[date: string] : number}){
    let price = 0;
    for(let date in hashmap){
        price += hashmap[date];
    }
    return price;
}

