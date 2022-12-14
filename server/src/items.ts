let id = 0;

export type Item = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
}
export let itemList: Item[] = [] as Item[];

export function addItem(text: string) {
    itemList.push({
        id: id++,
        text: text,
        completed: false,
        date: undefined,
    })
}

export function clear() {
    itemList = [] as Item[];
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
}
