$kernel.on("splash:ready", ()=>{ // run when w93 boots
    alert("launched")
    setInterval(()=>{
        for (let iframe of document.getElementsByTagName("iframe")) {
            if (iframe.src == "https://www.windows93.net/trollbox/index.php" && iframe.contentWindow.modbox == null) {
                // alert('new trollbox iframe detected')
                iframe.contentWindow.modbox = 69;
                setTimeout(()=>{
                    iframe.contentWindow.eval("$loader.script('http://localhost:8080/dist/bundle.js')")
                }, 1000)
            }
        }
    })
})