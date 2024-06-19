(function(global, configKey) {
    console.log("Script initialized with configKey:", configKey);

    global[configKey] = global[configKey] || function(config) {
        console.log("customConfig called with:", config);
        (global[configKey].q = global[configKey].q || []).push(config);
        processQueue();
    };

    // Default configuration
    const defaultConfig = {
        siteId: 'defaultSiteId',
        popupText: 'Welcome to our site!',
        popupColor: '#ffffff',
        popupCorner: 'top-right'
    };

    // Function to track visitors
    function trackVisitor(config) {
        console.log("Tracking visitor with config:", config);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://eo5yzla6isyvxnm.m.pipedream.net', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            siteId: config.siteId || 'unknown'
        }));
    }

    // Function to manipulate the DOM
    function manipulateDOM(config) {
        console.log("Manipulating DOM with config:", config);
        var shadowHost = document.createElement('div');
        shadowHost.id = 'custom-popup-host';
        shadowHost.style.position = 'fixed';
    
        switch (config.popupCorner) {
            case 'top-left':
                shadowHost.style.top = '10px';
                shadowHost.style.left = '10px';
                break;
            case 'top-right':
                shadowHost.style.top = '10px';
                shadowHost.style.right = '10px';
                break;
            case 'bottom-left':
                shadowHost.style.bottom = '10px';
                shadowHost.style.left = '10px';
                break;
            case 'bottom-right':
            default:
                shadowHost.style.bottom = '10px';
                shadowHost.style.right = '10px';
                break;
        }
    
        shadowHost.style.width = '300px';
        shadowHost.style.height = '100px';
        shadowHost.style.zIndex = '1000';
        document.body.appendChild(shadowHost);
    
        var shadow = shadowHost.attachShadow({ mode: 'open' });
    
        // Add styles
        var style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
    
            .popup-content {
                background-color: ${config.popupColor};
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                border-radius: 5px;
                font-family: Arial, sans-serif;
                animation: slideUp 0.5s ease-out;
                position: relative;
            }
    
            .close-button {
                position: absolute;
                top: 5px;
                right: 5px;
                cursor: pointer;
                background: transparent;
                border: none;
                font-size: 16px;
            }
        `;
        shadow.appendChild(style);
    
        // Add popup content
        var popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        popupContent.textContent = config.popupText;
    
        var closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(shadowHost);
        });
    
        popupContent.appendChild(closeButton);
        shadow.appendChild(popupContent);
    }
    
    function updatePopupPreview(config) {
        const preview = document.getElementById('popupPreview');
        const previewMessage = document.getElementById('popupMessagePreview');
    
        // Set popup message text
        previewMessage.textContent = config.popupText;
    
        // Set popup background color
        preview.style.backgroundColor = config.popupColor;
    
        // Set the popup position
        preview.className = ''; // Reset class names
        switch (config.popupCorner) {
            case 'top-left':
                preview.classList.add('top-left');
                break;
            case 'top-right':
                preview.classList.add('top-right');
                break;
            case 'bottom-left':
                preview.classList.add('bottom-left');
                break;
            case 'bottom-right':
            default:
                preview.classList.add('bottom-right');
                break;
        }
    }
    
    // Process the queue of configurations
    function processQueue() {
        console.log("Processing config queue");
        var queue = global[configKey].q || [];
        for (var i = 0; i < queue.length; i++) {
            var config = Object.assign({}, defaultConfig, queue[i]);
            trackVisitor(config);
            manipulateDOM(config);
            updatePopupPreview(config);
        }
        global[configKey].q = [];
    }

    document.getElementById('popupForm').addEventListener('input', function() {
        const popupMessage = document.getElementById('popupMessage').value;
        const popupColor = document.getElementById('popupColor').value;
        const popupCorner = document.getElementById('popupCorner').value;
    
        updatePopupPreview({
            popupText: popupMessage,
            popupColor: popupColor,
            popupCorner: popupCorner
        });
    });

    processQueue();
})(window, 'customConfig');
