const { NODE_ENV } = process.env; // eslint-disable-line no-undef
const EsLint = module.exports = {}; // eslint-disable-line no-multi-assign

// Use base configuration
EsLint.extends = [
    '@gik',
];

// This is code for a browser.
EsLint.env = {
    browser: true,
    node: false,
};

// Add eslint-plugins-jsx package for JSX validation
EsLint.plugins = ['jsx'];

// Specify parser behaviour
EsLint.parserOptions = {
    ecmaVersion: 2018,
    ecmaFeatures: {
        // Don't freak out when using JSX
        jsx: true,
    },
};

// Importer
EsLint.settings = {
    react: {
        pragma: 'React',
        version: '16.5',
    },
    'import/resolver': {
        node: {
            extensions: ['.js', '.jsx'],
        },
        webpack: {
            config: {
                resolve: {
                    modules: ['src', 'node_modules'],
                },
            },
        },
        'babel-plugin-root-import': {
            rootPathPrefix: '~',
            rootPathSuffix: 'src',
        },
    },
};

// Allow these globals to be used
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
        'jsx/uses-factory': ['error', { pragma: 'React' }],
        'jsx/mark-used-vars': 'error',
        'jsx/no-undef': 'error',
        // ----------------------------------------------------------------------- Warning
        'spaced-comment': ['warn', 'always', { markers: ['/'] }], // for ifdef
        // ---------------------------------------------------------------------- Disabled
        'jsx/factory-in-scope': ['off', { pragma: 'React' }],
    },
    NODE_ENV === 'production' ? {
        // Production only
        'no-console': 'error', // having console on production would be a fail.
        'no-debugger': 'error', // error doesn't cut it. This would be apocalyptical.
    } : {
        // Development only
        'no-console': 'warn',
        'no-debugger': 'warn',
        'global-require': 'off', // Used by hot-module-reloading
    },
);
