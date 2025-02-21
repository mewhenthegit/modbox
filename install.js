(()=>{
    let example = `class AlertMod extends modbox.Mod {
    name = "AlertMod";
    description = "me when the alert"
    version = "1.0.0"
    namespace = "alert-mod";
    init() {
        alert('helo');
    }
}`

    let stuff = fetch("http://localhost:8080/dist/bundle.js").then((d) => d.text() ).then( (code) => {
        $file.save("/a/modbox/alert.js", example, (e)=>{})
        $file.save("/a/boot/modbox.js", stuff, (content) => {
            $alert("Finished le installation", () => {
                location.reload();
            })
        })
    })
})();