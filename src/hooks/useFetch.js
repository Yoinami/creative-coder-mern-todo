import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) Error("didn't connect to the database");
                return res.json();
            })
            .then(
                res => {
                    setData(res);
                    setLoading(false);
                    setError(null);
                }
            )
            .catch(
                err => {
                    console.log(err);
                    setError(err)
                }
            )
    }, [url])


    return {data, error, loading}
}