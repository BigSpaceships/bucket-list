import { reactive } from "vue";
import { useRoute } from "vue-router";

export type Item = {
    id: number;
    text: string;
    completed: boolean;
    date?: Date;
    description: string;
}

// let id = 0;
const apiURL = import.meta.env.VITE_API_URL;

export const items = reactive({
    itemList: [] as Item[],
})

export function getActiveId(): number {
    const params = useRoute().params;
    if (params['id'] != undefined) {
        if (!isNaN(Number(params['id']))) {
            return Number(params['id']);
        }
    }

    return -1
}

// modifying functions
export function addItem(text: string): void {
    fetch(apiURL + "/api/new-item", {
        method: "POST",
        body: JSON.stringify({
            text: text
        }),
        headers: {
            "content-type": "application/json"
        }
    }).then(updateFromResponse);
}

export function updateItem(item: Item) {

    const index = items.itemList.findIndex((value: Item) => {
        return value.id == item.id;
    });

    items.itemList[index] = item;

    fetch(apiURL + "/api/update-item", {
        method: "POST",
        body: JSON.stringify({
            item: item,
        }),
        headers: {
            "content-type": "application/json"
        }
    }).then(updateFromResponse);
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

export function toggleItemCompleted(id: number) {
    const index = getItemIndexById(id);

    const newItem = items.itemList[index];

    newItem.completed = !newItem.completed;

    if (newItem.completed) {
        newItem.date = new Date(Date.now());
    }

    updateItem(newItem);
}

export function deleteItem(id: number) {
    fetch(apiURL + "/api/delete-item", {
        method: "POST",
        body: JSON.stringify({
            id: id,
        }),
        headers: {
            "content-type": "application/json"
        }
    }).then(updateFromResponse);
}

// util functions 
export function getItemById(id: number) {
    return items.itemList[getItemIndexById(id)]
}

export function getItemIndexById(id: number) {
    return items.itemList.findIndex((item: Item) => {
        return item.id == id;
    })
}

export function getDefaultItem() {
    return items.itemList[0];
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

export function updateFromResponse(response: Response) {
    try {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        fetchItems();
    } 
    catch (error) {
        console.error(error)
    }
}

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