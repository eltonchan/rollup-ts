
import typescript from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        typescript({ useTsconfigDeclarationDir: true }),
        sourceMaps()
    ]
};