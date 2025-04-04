'use client'

import { useEffect, useState } from "react";
import { apiFunc } from "../../lib/api"

const usePlansData = () => {
    const [planAndDetails, setPlanAndDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    let successFunc = (data) => {
        const planNames = {};
        const planDetails = Object.entries(data).map(([key, value])=>{
            planNames[key] = value.map(item=>{
                return {
                    value: item?.account_balance,
                    name: item.account_balance
                }
            });
        })
        setPlanAndDetails(planNames);
        console.log("Updated plan : ",planNames)
    };
    let errorFunc = (error) => {
        console.log("errorFunc data : ", error)
    };

    useEffect(() => {

        let url = `v2/challenges/admin/`;
        let method = "GET";
        apiFunc(url, method, null, successFunc, errorFunc, setIsLoading);
    }, []);

    return [isLoading, planAndDetails];
};

export default usePlansData;
