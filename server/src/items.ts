import {io} from "./server"

let id = 0;

export type Item = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
    description: string;
}
export let itemList: Item[] = [] as Item[];

export function addItem(text: string) {
    itemList.push({
        id: id++,
        text: text,
        completed: false,
        date: undefined,
        description: "",
    })

    io.emit("itemsUpdated")
}

export function clear() {
    itemList = [] as Item[];

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