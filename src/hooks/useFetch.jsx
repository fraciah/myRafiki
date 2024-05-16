import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const useFetch = (collectionName) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = () => {
            const postRef = query(collection(db, collectionName));
            onSnapshot (postRef, (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setLoading(false);
            });
        };
        getData();
    }, []);
  return {
    data,
    loading,
  };
};

export default useFetch;