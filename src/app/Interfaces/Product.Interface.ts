import { RaitingInterface } from "./Raiting.Interface";

export  interface ProductInterface{

    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: RaitingInterface
}