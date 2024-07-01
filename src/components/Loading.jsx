import { Loader } from "lucide-react";
import PropTypes from "prop-types";

const Loading = ({ isLoading }) => {
  return (
    <div className={`loading-container ${isLoading === true ? "loading" : ""}`}>
      <div className="loading-spinner">
        <Loader />
      </div>
    </div>
  )
};

Loading.propTypes = {
  isLoading: PropTypes.bool
};

export default Loading;