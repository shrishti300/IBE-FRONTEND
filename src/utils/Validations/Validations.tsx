// validate.tsx

export const validateSearchParams = (
    propertyNameParam: string  ,
    startDateParam: string ,
    endDateParam: string ,
    roomCountParam: string ,
    bedsParam: string ,
    adultCountParam: string ,
    kidCountParam: string ,
    teenCountParam: string ,
    sortKeyParam: string ,
    pageNoParam: string 
  ): boolean => {
    const today = new Date();
    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);
    const maxDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();

    console.log(startDate.getTime(), today.getTime())

  
    if (
      parseInt(roomCountParam) <= 0 ||
      parseInt(bedsParam) <= 0 ||
      parseInt(adultCountParam) <= 0 ||
      parseInt(kidCountParam) < 0 ||
      dateDifference(startDate, endDate) > 14 ||
      startDate > endDate ||
      endDate.getDate() > maxDaysInMonth ||
      startDate.getDate() > maxDaysInMonth ||
      startDate.getTime() < 0 ||
      endDate.getTime() < 0 ||
      startDate.getTime()  < today.getTime() - 86400000||
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      console.log("Invalid parameters");
      return false;
    } else {
      return true;
    }
  };
  
  // Helper function for date difference calculation
  const dateDifference = (startDate: Date, endDate: Date): number => {
    const timeDifference = endDate.getTime() - startDate.getTime();
    console.log(timeDifference);
    return timeDifference / (1000 * 3600 * 24);
  };
  