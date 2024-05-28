import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useSingleUser = (collectionName, id) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = () => {
            if (id) {
                const userRef = doc(db, collectionName, id);
                onSnapshot(userRef, (snapshot) => {
                    setUser({
                        ...snapshot.data(),
                        id: snapshot.id,
                    });
                    setLoading(false);
                });
            }
        };
        getUser();
    }, [id, collectionName]);

    return {
        user,
        loading,
    };
};

export default useSingleUser;
