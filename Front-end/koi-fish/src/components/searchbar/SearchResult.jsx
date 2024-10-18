import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={() => alert(`You selected: ${result.title || result.name}!`)}
    >
      {result.title || result.name}
    </div>
  );
};
