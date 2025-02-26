import { Mod } from "./modapi";
export default class LoaderMod extends Mod {
    public name: string = "JavaScript Loader";
    public description: string = "The default loader for modbox.";
    public version: string = "0.0.1";
    public namespace: string = "loader-js";
    Load(data: string): Mod {
        try {
            return eval(`(function(){return ${data}})();`);
        } catch(e) {
            console.error(e);
            return new Mod;
        }
    }
    CanLoad(file: string): boolean {
        return file.endsWith(".js");
    }
}