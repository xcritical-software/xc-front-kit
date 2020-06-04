import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import tsPlugin from '@rollup/plugin-typescript';
import autoExternal from 'rollup-plugin-auto-external';
import commonjs from '@rollup/plugin-commonjs';
const distDir = path.resolve(__dirname, 'dist/types');
const getPlugins = (options) => [
    autoExternal(),
    options.declaration ? typescript({
        rollupCommonJSResolveHack: false,
        tsconfigOverride: {
            compilerOptions: {
                declarationDir: distDir,
                ...options
            }
        },
        useTsconfigDeclarationDir: true,
    }) : tsPlugin(options),
    commonjs({ extensions: ['.js', '.ts'] }),
];

const createConfig = (pkg) => {
    return [
        {
            input: 'src/index.ts',
            output: [
                // {
                //     file: pkg.main,
                //     format: 'cjs',
                //     exports: 'named',
                //     sourcemap: true,
                //     plugins: getPlugins({ target: "es5" }),
                // },
                {
                    dir: pkg.module,
                    format: 'es',
                    sourcemap: true,

                },
                // {
                //     name: 'xcritical-theme',
                //     file: pkg.browser,
                //     format: 'umd',
                //     exports: 'named',
                //     sourcemap: true,
                //     plugins: getPlugins({ target: "es5" }),
                // },
            ],
            plugins: getPlugins({ target: "esnext", module: "esnext", declaration: true }),
        },
        {
            input: 'src/index.ts',
            output: [
                {
                    file: pkg.main,
                    format: 'cjs',
                    esModule: false,
                    sourcemap: true,
                },


            ],
            plugins: getPlugins({ target: "es5" }),
        },
        {
            input: 'src/index.ts',
            output: [
                {
                    name: pkg.name.replace('@xcritical/', ''),
                    file: pkg.browser,
                    format: 'umd',
                    esModule: false,
                    sourcemap: true,
                },
            ],
            plugins: getPlugins({ target: "es5" }),
        }
    ]
};

export default createConfig;