import { useEffect, useState } from 'react';
import axios from 'axios';
import { token } from '../config';
const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = res.data;
                if (res.status !== 200) {
                    throw new Error(result.data.message);
                }
                setData(result.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        };
        fetchData();
    }, [url]);
    return { data, loading, error };
};

export default useFetchData;
