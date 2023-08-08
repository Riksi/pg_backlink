document.addEventListener("DOMContentLoaded", () => {
    let enabledCheckbox = document.getElementById('enabled');
    
    
    chrome.storage.local.get(['enabled'], (state) => {
        enabledCheckbox.checked = ('enabled' in state) && state.enabled;
    });

    enabledCheckbox.addEventListener('change', () => {
        chrome.storage.local.set(
            {
                "enabled": enabledCheckbox.checked
            })
    });

});

