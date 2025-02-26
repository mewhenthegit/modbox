import { Mod } from "./modapi";
export default class ModStorage extends Mod {
    public name: string = "ModStorage";
    public description: string = "A mod that stores mod data";
    public version: string = "0.0.1";
    public namespace: string = "storage";
    public init() {}
    public GetStorage(name: string): StorageData {
        return new StorageData(name);
    }
}
class StorageData {
    constructor(public name: string) {}
    public Get(key: string, c: Function): any {
        //@ts-ignore
        $db.get(`modbox/${this.name}/${key}`, (_, content) => {
            // console.log(_, content)
            c(content);
        })
        // return localStorage.getItem(`modbox/${this.name}/${key}`);
    }
    public Set(key: string, value: any) {
        //@ts-ignore
        $db.set(`modbox/${this.name}/${key}`,value);
        // localStorage.setItem(`modbox/${this.name}/${key}`, value);
    }
    public Remove(key: string) {
        //@ts-ignore
        $db.del(`modbox/${this.name}/${key}`);
        // localStorage.removeItem(`modbox/${this.name}/${key}`);
    }
    public List(c: Function) {
        //@ts-ignore
        return $db.keys((_, keys: Array<String>) => {
            let mods = [];
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].startsWith("modbox/"+this.name+"/")) {
                    mods.push(keys[i].replace(`modbox/${this.name}/`, ""));
                }
            }
            c(mods);
        });
        // let keys = Object.keys(localStorage);
    }
    public Clear() {
        //@ts-ignore
        this.List((keys)=> {
            //@ts-ignore
            keys.forEach(key => {
                this.Remove(key);
            });
        })
    }
}