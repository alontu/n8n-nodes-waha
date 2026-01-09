"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_DESCRIPTION = exports.BASE_DESCRIPTION = void 0;
exports.BASE_DESCRIPTION = {
    name: 'WAHA',
    displayName: 'WAHA Tuval',
    icon: 'file:waha.svg',
    description: 'Connect with Whatsapp HTTP API',
    group: ['transform'],
    usableAsTool: true,
};
exports.NODE_DESCRIPTION = {
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    inputs: ["main"],
    outputs: ["main"],
    defaults: {
        name: 'WAHA Tuval',
    },
    credentials: [
        {
            name: 'wahaApi',
            required: true,
        },
    ],
    requestDefaults: {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        baseURL: '={{$credentials.url}}',
    },
};
//# sourceMappingURL=node.js.map