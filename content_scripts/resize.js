(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;


    //var x = 400;
    //var y = 200;
    // var url = "https://www.youtube.com/watch?v=1Lhw_HRYhU4&ab_channel=21languages";

    function getPosition(id) {
        switch (id) {
            case 1:
                return [1, 1];
            case 2:
                return [2, 1];
            case 3:
                return [3, 1];
            case 4:
                return [1, 2];
            case 5:
                return [2, 2];
            case 6:
                return [2, 3];
            case 7:
                return [3, 1];
            case 8:
                return [3, 2];
            case 9:
                return [3, 3];
            default:
                return [0, 0];
        }
    }

    function calPosition(id) {
        let col, row = getPosition(id);
        let screenWidth = screen.availWidth;
        let screenHeight = screen.availHeight;
        let xPosition = Math.round(screenWidth / col) * (col - 1);
        let yPosition = Math.round(screenHeight / row) * (row - 1);
        return [xPosition, yPosition];

    }

    function getWidth(col) {
        var screenWidth = screen.availWidth;
        var currentWidth = window.getWidth();
        if (col != 0) {
            return Math.round(screenWidth / col);
        } else {
            return currentWidth;
        }
    }

    function getHeight(row) {
        var screenHeight = screen.availHeight;
        var currentHeight = window.getHeight();
        if (row != 0) {
            return Math.round(screenHeight / row);
        } else {
            return currentHeight;
        }
    }

    function openWin(id) {
        //window.open(url, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=" + getWidth(x) + ", height=" + getHeight(y));
        let col, row = getPosition(id);
        let width = getWidth(col);
        let height = getHeight(row);
        let xPosition, yPosition = calPosition(id)
        window.resize(width, height);
        window.moveTo(xPosition, yPosition);
        window.scrollTo(0, 100);
    }

    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "resize") {
            openWin(message.buttonId);
        }
    });

})();