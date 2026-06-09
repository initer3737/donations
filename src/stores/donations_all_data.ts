import { writable,readable } from 'svelte/store';
import axios from 'axios'
import type { t_data } from './t_data';
import type { t_person_Data } from '@/types/t_person_data';

   interface StoreType {
    max_page: number;
    data: {
        [page: string]: t_person_Data[];
    };
}
  // 1. Buat store dengan data awal kosong agar browser tidak crash saat nunggu API
export const datas_donations_persons = writable<StoreType>({
    max_page: 0,
    data: {}
});

// 2. Buat fungsi fetch mandiri di dalam store
export const fetchDonationsData = async ({q_param=undefined}:{q_param?:string|undefined}) => {
    try {
        let q_params=""
        if(q_param !== undefined)q_params=`?q_search=${q_param}`
        // Ambil URL API, pastikan ada fallback jika env Astro tidak terbaca di client
        const url = import.meta.env.PUBLIC_API_URL || import.meta.env.PUBLIC_API_URL+q_params
        
        if (!url) {
            console.error("API URL tidak ditemukan di ENV!");
            return;
        }

        const response = await axios.get(url);
        const countriesData = Object.values(response.data.data.countries);
        
        if (countriesData.length > 0) {
            const rawData: any = countriesData[0];
            const finalData = rawData.persons.datas;
            const data_page_max = Object.entries(finalData).length;

            // 3. Update isi store secara reaktif!
            datas_donations_persons.set({
                data: finalData,
                max_page: data_page_max
            });
        }
    } catch (error) {
        console.error("Gagal mengambil data donasi di store:", error);
    }
};