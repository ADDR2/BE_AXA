Object.defineProperties(String.prototype, {
    blue: {
        enumerable: false,
        configurable: false,
        get: function() {
            return `\x1b[34m${this}\x1b[0m`;
        }
    },
    red: {
        enumerable: false,
        configurable: false,
        get: function() {
            return `\x1b[31m${this}\x1b[0m`;
        }
    },
    green: {
        enumerable: false,
        configurable: false,
        get: function() {
            return `\x1b[32m${this}\x1b[0m`;
        }
    },
    cyan: {
        enumerable: false,
        configurable: false,
        get: function() {
            return `\x1b[36m${this}\x1b[0m`;
        }
    },
    yellow: {
        enumerable: false,
        configurable: false,
        get: function() {
            return `\x1b[33m${this}\x1b[0m`;
        }
    },
});