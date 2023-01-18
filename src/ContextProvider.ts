type ModuleExports = Record<string, Function>;

export default <T extends Record<string, ModuleExports>>(obj: T) => {
    return function (this: any) {
        let self = this;
        console.log(self); // nice
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => {
                return [key, Object.fromEntries(
                    Object.entries(value).map(([key, value]) => {
                        return [key, value.bind(self)]
                    })
                )]
            })
        ) as T;
    }
}

// Courtesy of snoicy <3
// provides static typing while making sure `this` is in the correct context for all submodules
// also categorizes them based on export. e.g. `sub.ts` -> `tracks/index.ts` -> Spotify.tracks.sub()
