import mongoose, { Schema } from "mongoose";
// import { v4 as uuidv4} from "uuid";
import shortUUID from "short-uuid";

import {io} from "./server"

let id = 0;

export type Item = {
    id: string;
    text: string;
    completed: boolean;
    date?: Date;
    description: string;
}

export const itemSchema = new Schema<Item>({
    id: { type: String, required: true },
    text: { type: String, required: true },
    completed: { type: Boolean, required: true },
    date: Date,
    description: {type: String, required: false},
})

export const ItemModel = mongoose.model<Item>("Item", itemSchema);

export async function dbConnect() {
    mongoose.set('strictQuery', false)
    if (process.env.DB_CONN_STRING === undefined) throw new Error("No database");
    await mongoose.connect(process.env.DB_CONN_STRING);
}

export async function syncFromDb() {
    const items = await ItemModel.find();

    // console.log(items);

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
        id: shortUUID.generate(),
        text: text,
        completed: false,
        date: undefined,
        description: "",
    }

    itemList.push(newItem)

    const newItemModel = new ItemModel(newItem);
    newItemModel.save();

    io.emit("itemsUpdated")
}

export async function clear() {
    itemList = [] as Item[];

    const items = await ItemModel.find();

    items.forEach(item => {
        item.delete();
    });

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

export async function modifyItem(item: Item) {
    const index = itemList.findIndex((value: Item) => {
        return item.id == value.id 
    })

    if (index === -1) {
        return;
    }

    itemList[index] = item;

    await ItemModel.updateOne({id: item.id}, item);

    io.emit("itemsUpdated")
}

export async function deleteItem(id: string) {
    itemList.splice(getItemIndexById(id), 1);
    
    console.log(id);

    await ItemModel.deleteOne({id: id});

    io.emit("itemsUpdated")
}

// util functions 
export function getItemIndexById(id: string) {
    return itemList.findIndex((item: Item) => {
        return item.id == id;
    })
}