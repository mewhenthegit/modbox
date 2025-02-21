(()=>{
    let example = `class AlertMod extends modbox.Mod {\n    name = "AlertMod";\n    description = "me when the alert"\n    version = "1.0.0"\n    namespace = "alert-mod";\n    init() {\n        alert('helo');\n    }\n}`
    let stuff = fetch("http://localhost:8080/dist/bundle.js").then((d) => d.text() ).then( (code) => {
        $file.save("/a/modbox/alert.js", example, (e)=>{})
        $file.save("/a/boot/modbox.js", code, (content) => {
            $alert("Finished le installation", () => {
                location.reload();
            })
        })
    })
})();

// i *would* have created some link thing but w93 is not helping
// so now you have to copy it into a file on your w93 desktop, name it "install.js", right click and then run js
// afterwards you may delete the file