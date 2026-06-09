import type { t_person_Data } from "@/types/t_person_data"

 export type t_data={
            persons:{
                datas:{
                    [page:string]:t_person_Data[]
                }
            }

    }