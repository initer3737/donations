import { writable,readable } from 'svelte/store';
import axios from 'axios'
import type { t_data } from './t_data';
import type { t_person_Data } from '@/types/t_person_data';

   interface StoreType {
    max_page: number;
    data:t_person_Data[];
}
  // 1. Buat store dengan data awal kosong agar browser tidak crash saat nunggu API
export const datas_donations_person = writable<StoreType>({
    max_page: 0,
    data:[]
});

function resolveApiRequestUrl(rawUrl: string, qParam?: string): string | undefined {
    const trimmed = rawUrl.trim();
    if (!trimmed) return undefined;

    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
        const url = new URL(withProtocol);
        if (qParam) {
            url.searchParams.set('q_search', qParam);
        }
        return url.href;
    } catch {
        // console.error('PUBLIC_API_URL tidak valid:', rawUrl);
        return undefined;
    }
}

// 2. Buat fungsi fetch mandiri di dalam store
export const fetchDonationsDataSingle = async ({q_param=undefined,id,country}:{q_param?:string|undefined,id:number,country:string}) => {
    try {
        const raw_url = import.meta.env.PUBLIC_API_URL+`/${id}/${country}`;
        const fullUrl = raw_url ? resolveApiRequestUrl(String(raw_url), q_param) : undefined;
        if (!fullUrl) {
            // console.error('API URL tidak ditemukan atau tidak valid di ENV (PUBLIC_API_URL)');
            return;
        }
        const response = await axios.get(fullUrl);
        const countriesData = Object.values(response.data.data.countries);
        
        if (countriesData.length > 0) {
            const rawData: any = countriesData[0];
            const finalData = rawData.persons.datas;
            const data_page_max = Object.entries(finalData).length;

            // 3. Update isi store secara reaktif!
            datas_donations_person.set({
                data: finalData,
                max_page: data_page_max
            });
        }
    } catch (error) {
        // console.error("Gagal mengambil data donasi di store:", error);
    }
};