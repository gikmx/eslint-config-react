/* globals process */

const PATH = require('path');

const { NODE_ENV } = process.env; // eslint-disable-line no-undef

const extensions = [
    '.js',
    '.jsx',
    '.json',
    '.mjs',
];

const EsLint = module.exports = { // eslint-disable-line no-multi-assign

    // Baseguide is Airbnb's (with react extensions) and @gik's own base overwriting it.
    extends: [
        '@gik',
        'airbnb/rules/react',
        'airbnb/rules/react-a11y',
    ],

    // This is code for a browser.
    env: {
        browser: true,
        node: false,
    },

    settings: {
        react: {
            pragma: 'React',
            version: '16.5', // bump Airbnb's version
        },
        'import/extensions': extensions,
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        modules: ['src', 'node_modules'],
                    },
                },
            },
            alias: {
                map: [
                    ['~', PATH.resolve(process.cwd(), 'src')]
                ],
                extensions,
            },
        },
    },
};

// Allow these globals to be used (only losers use globals on production)
EsLint.globals = Object.assign(
    {
        // Common
    },
    NODE_ENV === 'production' ? {
        // production only
    } : {
        // Development only
        module: null, // used by hot-module-reloading
        require: null, // used by hot-module-reloading
    },
);

// Add new rules specific for frontend.
EsLint.rules = Object.assign(
    {
        // Common
        // ------------------------------------------------------------------------- Error
        'no-unused-vars': ['error', { // Disallow declaring something is not used.
            varsIgnorePattern: 'React', // This is used by wabpack for JSX
        }],
        // ----------------------------------------------------------------------- Warning
        'spaced-comment': ['warn', 'always', { markers: ['/'] }], // for ifdef
        // ---------------------------------------------------------------------- Disabled
    },
    NODE_ENV === 'production' ? {
        // Production only
        'no-console': 'error', // having console on production would be a fail.
        'no-debugger': 'error', // error doesn't cut it. This would be apocalyptical.
        'global-require': 'error', // if you're doing globals, you're failing in life.
    } : {
        // Development only
        'no-console': 'warn',
        'no-debugger': 'warn',
        'global-require': 'warn', // Used by hot-module-reloading
    },
);
