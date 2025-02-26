(()=>{
    let example = `class AlertMod extends modbox.Mod {
    name = "AlertMod";
    description = "me when the alert"
    version = "1.0.0"
    namespace = "alert-mod";
    init() {
        $alert('helo');
        let tb = modbox.ModAPI.GetMod("trollbox")

        tb.RegisterCommand({
            namespace: "alertmod",
            name: "hello",
            description: "HEllo!!!",
            usage: "/hello",
            aliases: [],
            execute: (args) => {
                tb.PrintMessage({
                    nick: "alertmod",
                    color: "#FF0000",
                    msg: "HELLO!!!",
                    date: Date.now(),
                    home: "helloman"
                })
            }
        })
    }
}`



    fetch("https://mewhenthegit.github.io/modbox/dist/boot.js").then((d) => d.text() ).then( (bootcode) => { // i hate promises
        $file.save("/a/modbox/mods/alert.js", example, (e)=>{})
        fetch("https://mewhenthegit.github.io/modbox/dist/bundle.js").then(d => d.text()).then((bundlecode) => {
            $file.save("/a/modbox/init/bundle.js", bundlecode, (_)=>{
                $file.save("/a/boot/modbox.js", bootcode, (content) => {
                    $alert("Finished le installation", () => {
                        location.reload();
                    })
                })
            })
        })
    })
})();


// dev installer: try { fetch('http://localhost:8080/install.js').then((r)=>r.text()).then((c)=>eval(c)); } catch(e) { alert(e) }
// install installer: try { fetch('http://modbox.codersquack.nl/install.js').then((r)=>r.text()).then((c)=>eval(c)); } catch(e) { alert(e) }

// funny https://windows93.net/#!js%20try%20%7B%20fetch%28%27http%3A%2F%2Fmodbox.codersquack.nl%2Finstall.js%27%29.then%28%28r%29%3D%3Er.text%28%29%29.then%28%28c%29%3D%3Eeval%28c%29%29%3B%20%7D%20catch%28e%29%20%7B%20alert%28e%29%20%7D 
// funny dev https://windows93.net/#!js%20try%20%7B%20fetch%28%27http%3A%2F%2Flocalhost%3A8080%2Finstall.js%27%29.then%28%28r%29%3D%3Er.text%28%29%29.then%28%28c%29%3D%3Eeval%28c%29%29%3B%20%7D%20catch%28e%29%20%7B%20alert%28e%29%20%7D