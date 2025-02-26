class AlertMod extends modbox.Mod {
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
}