import { QUOTABLE_API } from "../utilities/apis";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const RqQuotes = () => {
    const fetchQuotes = async () => {
        const quotes = [];
        for(let i = 0; i < 10; i++) { 
            const response = await axios.get(QUOTABLE_API);
            quotes.push(response.data);
        }
        return quotes;
    }
    
    return useQuery({
        queryKey: ["quotes"],
        queryFn: fetchQuotes,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 15,
    })
}
export default RqQuotes;