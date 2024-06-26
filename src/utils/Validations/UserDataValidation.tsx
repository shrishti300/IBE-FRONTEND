import zipcodes from 'zipcodes';


export const isValidPhoneNumber = (phoneNumber: string): boolean => {
    // Regular expression to match a valid 10-digit phone number
    const phoneRegex: RegExp = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
};

export const isValidEmail = (email: string): boolean => {
    // Regular expression to match a valid email address
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


export const isValidZip = (zip:string,  selectedCity: string) : boolean =>{
    const zipInfo = zipcodes.lookup(zip);
    if (zipInfo) {
        const zipCity = zipInfo.city;
        // Check if the city name matches the selected city
        return zipCity.toLowerCase() === selectedCity.toLowerCase();
    }
    // Return false if the zip code is invalid or not found
    return false;

}