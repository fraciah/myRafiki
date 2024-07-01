import { useEffect } from "react";
import RqQuotes from "../../RQ/RqQuotes";

const WellnessInsights = ({ setIsLoading }) => {
  const { data, isLoading } = RqQuotes();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="page-container">
      <div className="title">Wellness Insights</div>
      {data ? (
        data.map((quote) => (
          <div key={quote.id}>
            <p>✨{quote.content}</p>
          </div>
        ))
      ) : (
        <p>No wellness insights available</p>
      )}
    </div>
  )
}
export default WellnessInsights;
