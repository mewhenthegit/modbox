import { ModAPI, Mod } from "./modapi";
import MBLogger from "./mblogger";
import rmtrollbox from "./rmtrollbox";
import ModStorage from "./modstorage";
import LoaderMod from "./loader-js";

class ModLoader extends Mod {
    public name: string = "Mod Loader";
    public description: string = "A mod that loads mods";
    public version: string = "0.0.1";
    public namespace: string = "modloader";
    private logger = ModAPI.GetMod<MBLogger>("mblogger").CreateLogger("modloader");
    public init() {
        /*//@ts-ignore
        window.ModAPI = ModAPI; // expose the ModAPI to the window
        this.logger.info('ModAPI exposed to window');
        //@ts-ignore
        window.Mod = Mod;
        this.logger.info('Mod class exposed to window');*/
        this.logger.info('Loading mods...');
        let mods = ModAPI.GetMod<ModStorage>("storage").GetStorage("mods")
        let modList = mods.List();
        let modText = modList.map(x => mods.Get(x));
        let priorityMods: number[] = [];
        modText.forEach((value, index) => {
            if (value.startsWith('//@modloader-priority')) {
                priorityMods.push(index);
            }
        })
        this.logger.info(`Found ${mods.List().length} mods`);
        for (let index of priorityMods) {
            this.logger.info(`Loading prioritized mod ${modList[index]}`);
            ModAPI.LoadMod(modList[index]);
            modList.splice(index, 1);
        }
        for (let i = 0; i < mods.List().length; i++) {
            let mod = mods.Get(mods.List()[i])
            this.logger.info(`Loading ${mod}`);
            let loaders = ModAPI.FilterMods<LoaderMod>("loader-");
            let loaded = false;
            for (let loader of loaders) {
                if (loader.CanLoad(mod)) {
                    this.logger.info(`Loading mod ${mod} with loader ${loader.name}`);
                    ModAPI.LoadMod(loader.Load(mod));
                    this.logger.info(`Loaded ${mod}`);
                    loaded = true;
                    break;
                }
            }
            if (!loaded) {
                this.logger.error(`Could not load mod ${mod}: no loader found for it`);
            }
        }
        this.logger.info(`${ModAPI.GetMods().length} Mods loaded`);
    }
}
ModAPI.LoadMod(MBLogger);
ModAPI.LoadMod(rmtrollbox);
ModAPI.LoadMod(ModStorage);
ModAPI.LoadMod(LoaderMod);
ModAPI.LoadMod(ModLoader);

export { Mod, ModAPI };