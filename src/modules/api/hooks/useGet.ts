import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL} from "../../core/env";

type Props = {
    path: string;
};

export const useGet = <T>({
                              path,
                          }: Props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_URL}${path}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [path]);

    return {
        data: data as T,
        loading,
        error
    };
};
