$kernel.on("splash:ready", ()=>{ // run when w93 boots
    setInterval(()=>{
        for (let iframe of document.getElementsByTagName("iframe")) {
            if (iframe.src == "https://www.windows93.net/trollbox/index.php" && iframe.contentWindow.modbox == null) {
                iframe.contentWindow.modbox = 69;
                $db.get("modbox/init/bundle.js", (_, content) => {
                    setTimeout(()=>{
                        // dumb fix
                        iframe.contentWindow.$alert = $alert
                        iframe.contentWindow.$confirm = $confirm
                        iframe.contentWindow.$exe = $exe
                        iframe.contentWindow.$explorer = $explorer
                        iframe.contentWindow.$kernel = $kernel
                        iframe.contentWindow.$log = $log
                        iframe.contentWindow.$notif = $notif
                        iframe.contentWindow.$prompt = $prompt
                        iframe.contentWindow.$window = $window
                        
                        iframe.contentWindow.eval(content); // possibly be dangerous but oh well lol
                    }, 1000)
                })
            }
        }
    })
})