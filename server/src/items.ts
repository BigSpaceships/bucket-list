import mongoose, { Schema } from "mongoose";
import {io} from "./server"

let id = 0;

export type Item = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
    description: string;
}

export const itemSchema = new Schema<Item>({
    id: { type: Number, required: true },
    text: { type: String, required: true },
    completed: { type: Boolean, required: true },
    date: Date,
    description: {type: String, required: true},
})

export const ItemModel = mongoose.model<Item>("Item", itemSchema);

export async function dbConnect() {
    mongoose.set('strictQuery', false)
    if (process.env.DB_CONN_STRING === undefined) throw new Error("No database");
    await mongoose.connect(process.env.DB_CONN_STRING);
}

export async function syncFromDb() {
    const items = await ItemModel.find();

    console.log(items);

    itemList = [] as Item[];
    items.forEach((itemObject) => {
        const newItem = itemFromObject(itemObject);

        if (newItem === undefined) return;

        itemList.push(newItem);
    })

    io.emit("itemsUpdated");
}

export let itemList: Item[] = [] as Item[];

export function addItem(text: string) {
    const newItem: Item = {
        id: id++, // TODO: new method of ids
        text: text,
        completed: false,
        date: undefined,
        description: "boo",
    }
    console.log("newItem");

    itemList.push(newItem)

    const newItemModel = new ItemModel(newItem);
    newItemModel.save();

    io.emit("itemsUpdated")
}

export function clear() {
    itemList = [] as Item[];
    ItemModel.deleteMany();

    io.emit("itemsUpdated")
}

export function itemFromObject(obj: object): Item | undefined {
    const item: Item = obj as Item;

    if (item.id == undefined || item.text == undefined) {
        return;
    }

    if (item.completed == undefined) {
        item.completed = false;
    }
        
    return item;
}

export function modifyItem(item: Item) {
    const index = itemList.findIndex((value: Item) => {
        return item.id == value.id 
    })

    if (index === -1) {
        return;
    }

    itemList[index] = item;
    
    io.emit("itemsUpdated")

    // console.log("update")
}

export function deleteItem(id: number) {
    itemList.splice(getItemIndexById(id), 1);
    
    io.emit("itemsUpdated")
}

// util functions 
export function getItemIndexById(id: number) {
    return itemList.findIndex((item: Item) => {
        return item.id == id;
    })
}