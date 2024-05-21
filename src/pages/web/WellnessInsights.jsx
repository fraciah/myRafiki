import RqQuotes from "../../RQ/RqQuotes";

const WellnessInsights = () => {
  const { data, isLoading } = RqQuotes();

  return (
    <div className="page-container">
      <h1>Wellness Insights.</h1>
      {isLoading && <p>Loading...</p>}
      {data ? (
        data.map((quote) => (
          <div key={quote.id}>
            <p>{quote.content}</p>
          </div>
        ))
      ) : (
        <p>No wellness insights available</p>
      )}
    </div>
  )
}
export default WellnessInsights;
