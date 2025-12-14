import useAxiosSecure from "../hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();
export const saveOrUpdateUser = async userData => {
    const {data} = await axiosSecure.post('/users', userData);
    return data;
}