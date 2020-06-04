import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';

const distDir = path.resolve(__dirname, 'types');
const createConfig = (pkg) => {
    return [
        {
            input: 'src/index.ts',
            output: [
                {
                    file: pkg.main,
                    format: 'cjs',
                    exports: 'named',
                    sourcemap: true,
                },
                {
                    dir: pkg.module,
                    format: 'es',
                    exports: 'named',
                    sourcemap: true,
                },
                {
                    name: 'xcritical-theme',
                    file: pkg.browser,
                    format: 'umd',
                    exports: 'named',
                    sourcemap: true,
                },
            ],
            plugins: [
                autoExternal(),
                typescript({
                    rollupCommonJSResolveHack: false,
                    tsconfigOverride: {
                        declarationDir: distDir,
                        declaration: true,
                    },
                    // verbosity: 3,
                    clean: true,
                    check: true,
                    exclude: ["test/*.*"],
                    useTsconfigDeclarationDir: true
                })
            ],
        }
    ]
};

export default createConfig;