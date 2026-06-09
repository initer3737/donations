    export type t_person_Data={
        id:number ,
        name:string,
        youtube_profile:{
             src: string, 
             type: string
        },
        youtube_channel:{
            src:string
        },
        links:{
            name:string,
            url:string
        }[],
        image: string,
        story: string,
        country_name:string
    }