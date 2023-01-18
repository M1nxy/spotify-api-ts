import tracks from "./modules/tracks/index.js";
import albums from "./modules/albums/index.js";
import ContextProvider from "./ContextProvider.js";
export default ContextProvider({
    tracks,
    albums
})
