export interface IProperty {
    propertyName: string;
    propertyId: number;
}

export interface SearchParams {
    propertyName: string;
    startDate: string;
    endDate: string;
    roomCount: number;
}

export interface IRoomType {
    roomTypeName: string;
    roomTypeId: number;
    singleBed: number;
    doubleBed: number;
    maxCapacity: number;
    areaInSquareFeet: number;
}

export interface IPropertyDetailDTO {
    propertyAddress: string;
    propertyName: string;
    propertyContact: string;
    propertyRoomDTOList: { [key: string]: IRoomType };
}

export interface IMinPriceHmap {
    [roomTypeName: string]: { [date: string]: number };
}

export interface IRoomTypePrice {
    roomTypeName: string;
    price: number;
    maxCapacity: number,
    area: number
}

export interface IRoomData {
    propertyDetailDTO: IPropertyDetailDTO;
    minPriceHmap: IMinPriceHmap;
    roomTypePrices: IRoomTypePrice[];
    size: number
}

export interface Booking {
    bookingId: string;
    roomType: string;
    image: string;
    startDate: string;
    endDate: string;
    promotion: string[];
    guestInfo: string;
    roomCount: number;
    nightlyRate: number;
    subtotal: number;
    taxes: number;
    vat: number;
    total: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    mailAddress1: string;
    mailAddress2: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    cardName: string;
    cardNumber: string;
    cancelled: boolean;
    bookedBy: string
    bookingId2: number;
}