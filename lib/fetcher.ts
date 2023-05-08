//It's a good place to put utility functions, data fetching logic, API wrappers, and other modules that are not directly related to rendering UI.
// for get calls since these are used more often.
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
