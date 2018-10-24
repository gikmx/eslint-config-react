/* globals process */

const PATH = require('path');

const { NODE_ENV } = process.env;

const extensions = [
    '.js',
    '.jsx',
    '.json',
    '.mjs',
];

const EsLint = module.exports = { // eslint-disable-line no-multi-assign
    root: true,

    // Baseguide is Airbnb's (with react extensions) and @gik's own base overwriting it.
    extends: [
        '@gik',
        'airbnb/rules/react',
        'airbnb/rules/react-a11y',
    ],

    // Declare globals for testing and for browser.
    env: {
        browser: true,
        es6: true,
        jest: true,
        commonjs: false,
        node: false,
    },

    // parse using babel, to get newest features.
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            generators: false,
        },
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
                    ['~', PATH.resolve(process.cwd(), 'src')],
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
        // Use 4 spaces instead of AirBnb"s 2.
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        indent: ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoredNodes: ['JSXElement', 'JSXElement *'],
            FunctionDeclaration: {
                parameters: 1,
                body: 1,
            },
            FunctionExpression: {
                parameters: 1,
                body: 1,
            },
            CallExpression: {
                arguments: 1,
            },
        }],
        'arrow-parens': ['error', 'always'], // Always require parens on arrow functions
        // Determine the order of elements inside a React class
        'react/sort-comp': ['error', {
            order: [
                'static-methods',
                'lifecycle',
                'render',
                '/^on.+$/',
                '/^handle.+$/',
                'everything-else',
            ],
        }],
        // Maximum line-width
        'max-len': ['error', {
            code: 90,
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: false,
            ignoreStrings: false,
            ignoreTemplateLiterals: false,
            ignoreRegExpLiterals: false,
        }],
        // never force the use of newlines on properties, just be consistent,
        'object-curly-newline': ['error', {
            ObjectExpression: {
                minProperties: undefined, multiline: true, consistent: true,
            },
            ObjectPattern: {
                minProperties: undefined, multiline: true, consistent: true,
            },
            ImportDeclaration: {
                minProperties: undefined, multiline: true, consistent: true,
            },
            ExportDeclaration: {
                minProperties: undefined, multiline: true, consistent: true,
            },
        }],

        // ----------------------------------------------------------------------- Warning
        'spaced-comment': ['warn', 'always', { markers: ['/'] }], // for ifdef
        // ---------------------------------------------------------------------- Disabled
        'react/jsx-wrap-multilines': 0, // No need to wrap JSX in parens
        'react/jsx-closing-tag-location': 0, // when not using parent for JSX this is req.
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
