// module.exports = {
//   moduleFileExtensions: ['js', 'json', 'ts'],
//   rootDir: '.',
//   testRegex: '.*\\.spec\\.ts$',
//   transform: {
//     '^.+\\.(t|j)s$': 'ts-jest',
//   },
//   collectCoverageFrom: [
//     'src/**/*.(t|j)s',
//     '!src/**/*.spec.ts',
//     '!src/**/*.interface.ts',
//     '!src/**/*.enum.ts',
//     '!src/**/*.type.ts',
//     '!src/**/*.dto.ts',
//     '!src/main.ts',
//     '!src/**/*.module.ts',
//     '!src/database/data-source.ts',
//     '!src/database/migrations/**',
//   ],
//   coverageDirectory: './coverage',
//   testEnvironment: 'node',
//   roots: ['<rootDir>/src/', '<rootDir>/test/'],

//   // IMPORTANTE: Configurar moduleNameMapper para path aliases
//   moduleNameMapper: {
//     '^src/(.*)$': '<rootDir>/src/$1',
//     '^test/(.*)$': '<rootDir>/test/$1',
//   },

//   // Configuración adicional recomendada
//   setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
//   testTimeout: 10000,
//   verbose: true,
// };
