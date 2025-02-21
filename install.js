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



    let stuff = fetch("http://localhost:8080/dist/boot.js").then((d) => d.text() ).then( (code) => {
        $file.save("/a/modbox/alert.js", example, (e)=>{})
        $file.save("/a/boot/modbox.js", code, (content) => {
            $alert("Finished le installation", () => {
                location.reload();
            })
        })
    })
})();


// install installer: try { fetch('http://localhost:8080/install.js').then((r)=>r.text()).then((c)=>eval(c)); } catch(e) { alert(e) }