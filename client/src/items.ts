import { reactive } from "vue";

export type Item = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
}

// let id = 0;
const apiURL = import.meta.env.VITE_API_URL;

export const items = reactive({
    itemList: [] as Item[],
    activeId: -1,
})

export function fetchItems() {
    fetch(apiURL + "/api/items", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())
    .then((response) => {
        const newItems = response.items;

        items.itemList = updateAllItems(newItems);
    });
}

export function getDefaultItem() {
    return items.itemList[0];
}

export function addItem(text: string): void {
    fetch(apiURL + "/api/new-item", {
        method: "POST",
        body: JSON.stringify({
            text: text
        }),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        fetchItems();
    }).catch((error) => {
        console.error(error)
    })
}

export function getItemById(id: number) {
    return items.itemList[getItemIndexById(id)]
}

export function getItemIndexById(id: number) {
    return items.itemList.findIndex((item: Item) => {
        return item.id == id;
    })
}

export function toggleItemCompleted(id: number) {
    const index =  getItemIndexById(id);

    const newItem = items.itemList[index];

    newItem.completed = !newItem.completed;

    if (newItem.completed) {
        newItem.date = new Date(Date.now());
    }

    fetch(apiURL + "/api/update-item", {
        method: "POST",
        body: JSON.stringify({
            item: newItem,
        }),
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        fetchItems();
    }).catch((error) => {
        console.error(error);
    }) 
}

export function itemFromObject(obj: object): Item | undefined {
    const item: Item = obj as Item;

    if (item.id == undefined || item.text == undefined) {
        return;
    }

    if (item.completed == undefined) {
        item.completed = false;
    }

    if (item.date != undefined) {
        item.date = new Date(item.date);
    }
        
    return item;
}

export function updateItem(item: Item) {

    const index = items.itemList.findIndex((value: Item) => {
        return value.id == item.id;
    });

    const newTodoList = items.itemList;
    newTodoList[index] = item;
}

export function updateAllItems(items: object[]): Item[] {
    const itemList: Item[] = [] as Item[];

    items.forEach((item: object) => {
        const newItem = itemFromObject(item);

        if (newItem == undefined) {
            return;
        }
        itemList.push(newItem);
    })

    return itemList;
}

// export function updateSomeItems(itemsToModify: object[]): Item[] {
//     let itemList: Item[] = items.itemList;

//     itemsToModify.forEach((item: object) => {
//         const newItem = itemFromObject(item);

//         if (newItem == undefined) {
//             return;
//         }

//         itemList = updateItem(newItem, itemList);
//     })

//     return itemList;
// }