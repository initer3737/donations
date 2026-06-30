import { writable,readable } from "svelte/store";


 const data_set_bread_crumbs=writable<Array<string>>([''])
 const data_bread_crumbs=readable<Array<string>>([''])

 
export {
    data_set_bread_crumbs,
    data_bread_crumbs
}