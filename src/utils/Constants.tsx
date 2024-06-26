export interface FilterMapper {
    price: number[];
    roomType: string[];
    beds: string[];
}

export const filterMapper : FilterMapper = {
    "price": [75, 100, 125],
    "roomType": ["SUITE", "DELUXE"],
    "beds": ["SINGLE", "DOUBLE"]
}