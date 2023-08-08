function toggleBacklinks(enabled, fn) {
    const textLinks = document.querySelectorAll('a[href^="#f"]');
    // Iterate over each text link
    textLinks.forEach((link) => {
        // Get the footnote number from the 'href' attribute of the text link
        // f{num}n
        let href=link.getAttribute('href')
        const footnoteNum = parseInt(href.match(/#f(\d+)n/)?.[1])

        // Add or delete the 'name' attribute to the text link
        if (enabled){
            link.setAttribute(
                'name', `t${footnoteNum}n`
            )
        } else if (link.hasAttribute('name')){
            link.removeAttribute('name')
        }

        // Get the corresponding footnote using the 'name' attribute
        const footnote = document.querySelector(`a[name="f${footnoteNum}n"]`);

        // Add or delete the 'href' attribute to the footnote using the text link's 'name' attribute
        if (enabled){
            footnote.setAttribute(
                'href', `#t${footnoteNum}n`
            );
        } else if (footnote.hasAttribute('href')){
            footnote.removeAttribute('href')
        }
    });
}


chrome.storage.onChanged.addListener(function (changes, namespace) {
    if ("enabled" in changes) {
        const newEnabledValue = changes.enabled.newValue || false;
        toggleBacklinks(newEnabledValue, "onChanged");
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.storage.local.get(
            ["enabled"],
            (state) => {
                toggleBacklinks("enabled" in state ? state.enabled : false,
                                request.function);
            }
        )
    }
);
