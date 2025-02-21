import { ModAPI, Mod, ModAPI_C } from "./modapi";
import MBLogger, { Logger } from "./mblogger";
import trollbox from "./trollbox";
import ModStorage from "./modstorage";
import LoaderMod from "./loader-js";

type TModBox = {
    ModAPI: ModAPI_C
    Mod: any
}

const ModBox: TModBox = {
    ModAPI: ModAPI,
    Mod: Mod
}

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
        // let modList = mods.List();
        mods.List((modList: Array<string>)=>{
            this.logger.info(`Found ${modList.length} mods`);
            for (let i = 0; i < modList.length; i++) {
                let modName: string = modList[i]
                mods.Get(modName, (mod: string)=>{
                    this.logger.info(`Loading ${modName}`);
                    let loaders = ModAPI.FilterMods<LoaderMod>("loader-");
                    let loaded = false;
                    for (let loader of loaders) {
                        if (loader.CanLoad(modName)) {
                            this.logger.info(`Loading mod ${modName} with loader ${loader.name}`);
                            ModAPI.LoadMod(loader.Load(mod));
                            this.logger.info(`Loaded ${modName}`);
                            loaded = true;
                            break;
                        }
                    }
                    if (!loaded) {
                        this.logger.error(`Could not load mod ${modName}: no loader found for it`);
                    }
                })
            }
        })

        this.logger.info(`${ModAPI.GetMods().length} Mods loaded`);
    }
}

export { Mod, ModAPI, ModAPI_C };

// setTimeout(() => {
//     alert("balls")
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(MBLogger);
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(rmtrollbox);
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(ModStorage);
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(LoaderMod);
//     // //@ts-ignore
//     // window.modbox.ModAPI.LoadMod(ModLoader);
// }, 500)

//@ts-ignore
$kernel.on("splash:ready", ()=>{ // run when w93 boots
    // TODO: make this less shitty
    // alert("launched!")
    //@ts-ignore
    window.modbox = ModBox;
    setInterval(()=>{
        for(let frame of document.getElementsByTagName("iframe")) {
            console.log(frame.src);
            if (frame.src == "https://www.windows93.net/trollbox/index.php") {
                //@ts-ignore
                if (frame.contentWindow.modbox != null) { continue; }

                //@ts-ignore
                frame.contentWindow.modbox = ModBox;

                setTimeout(()=> {
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(MBLogger);
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(trollbox);
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(ModStorage);
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(LoaderMod);
                    //@ts-ignore
                    frame.contentWindow.modbox.ModAPI.LoadMod(ModLoader);
                },500)
            }
        }
    })
})