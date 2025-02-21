import { Mod, ModAPI } from "./modapi";
import MBLogger from "./mblogger";
import EventEmitter, {Event} from "./events";

export interface Message {
    nick: string;
    home: string;
    msg: string;
    date: number;
    color: string;
}
export interface Command {
    namespace: string;
    name: string;
    description: string;
    usage: string;
    aliases: string[];
    execute: (args: string[]) => void;
}

export default class trollbox extends Mod {
    public name: string = "trollbox";
    public description: string = "trollbox API";
    public version: string = "0.0.1";
    public namespace: string = "trollbox";
    public logger = ModAPI.GetMod<MBLogger>("mblogger").CreateLogger("trollbox");
    private registeredCommands: Command[] = [];
    public frame: HTMLIFrameElement = document.createElement("iframe");
    public init() {
        this.logger.log("Initializing trollbox API");
        for (let iframe of document.getElementsByTagName("iframe")) {
            if (iframe.src == "https://www.windows93.net/trollbox/index.php") {
                this.frame = iframe;
                break;
            }
        }

        let sndMsgHook = ModAPI.Hook("sendMsg");
        sndMsgHook.on("call", (ev: Event) => {
            let msg = ev.data.funcargs[0];
            if (msg.startsWith('/')) {
                let args = msg.substr(1).split(' ');
                let cmd = args.shift();
                let namespace = "";
                if (cmd.includes(':')) {
                    namespace = cmd.split(':')[0];
                    cmd = cmd.split(':')[1];
                }
                let cmds = this.registeredCommands.filter(c => {
                    if (namespace) {
                        return c.namespace === namespace && (c.name === cmd || c.aliases.includes(cmd))
                    } else {
                        return c.name == cmd || c.aliases.includes(cmd)
                    }
                });
                if (cmds.length > 0) {
                    ev.preventDefault();
                    cmds[0].execute(args);
                }
            }
        })
        this.logger.info("trollbox api initialized");
        this.PrintMessage({
            nick: "modbox",
            color: "green",
            home: "balls",
            date: Date.now(),
            msg: "Modbox active!"
        })
    }
    public PrintMessage(msg: Message) {
        //@ts-ignore
        this.frame.contentWindow.printMsg(msg);
    }
    public RegisterCommand(cmd: Command) {
        this.registeredCommands.push(cmd);
    }
    public GetElement(uielement: UIElement) {
        return document.querySelector(`#trollbox > ${uielement.GetSelector()}`);
    }
    // public OpenPopup(html: string) { // prob doesnt exist in trollbox anymore
    //     return new Promise(resolve => {
    //         //@ts-ignore
    //         frame.contentWindow.popup(html,resolve); // resolve gets called when the popup is open
    //     })
    // }
}
class UIElement {
    private _children: UIElement[] = [];
    constructor(public name: string, public element: string) {}
    public GetSelector() {
        return this.element;
    }
    public SetChildren(childs: UIElement[]) {
        this._children = childs.map(x => {
            x.element = `${this.element} > ${x.element}`;
            return x;
        });
        return this;
    }
    public Get(name: string) {
        let a = this._children.find(x => x.name === name);
        if (!a) throw new Error(`No child named ${name}`);
        return a;
    }
    get children(): {[key: string]: UIElement} {
        return Object.fromEntries(this._children.map(x => [x.name, x]))
    }
}
/*export const UI = {
    Form: {
        __combine: "#trollbox_form",
        get Input() {
            return `${this.__combine} > textarea#trollbox_input`;
        },
        get SendButton() {
            return `${this.__combine} > button`;
        },
        get NickButton() {
            return `${this.__combine} > button#trollbox_nick_btn`;
        },
        get UploadButton() {
            return `${this.__combine} > button#trollbox_upload_btn`;
        }
    }
}*/
export const UI = {
    Form: new UIElement("Form", "#trollbox_form").SetChildren([
        new UIElement("Input", "textarea#trollbox_input"),
        new UIElement("SendButton", "button"),
        new UIElement("NickButton", "button#trollbox_nick_btn"),
        new UIElement("UploadButton", "button#trollbox_upload_btn")

    ])
}
