import { Service } from "entities/Service";
import { useEffect, useState } from "react";
import { getServiceRef, listService } from "repositories/Services";

export function useListService(userID?: string){
    const [serviceList, setServiceList] = useState<Service[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    useEffect(()=>{
        const fn = async()=>{
            setIsLoading(true);
            if(userID){
                const ref = getServiceRef();
                const query = await ref.where("userID", "==", userID);
                const data = await listService(query);
                setServiceList(data);
                setIsLoading(false);
                if(data){
                    setIsEmpty(false);
                } else {
                    setIsEmpty(true);
                }
            } else {
                setServiceList(null);
                setIsLoading(false);
                setIsEmpty(true);
            }
        };
        fn();
    }, [userID]);
    // console.log(serviceList, isLoading, isEmpty)
    return {serviceList, setServiceList, isLoading, isEmpty};
}