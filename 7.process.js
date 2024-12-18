//argumentos de entrada
console.log(process.argv);

// controlar eventos del proceso
process.on('exit', () => {});

// current working directory
console.log(process.cwd());

// controllar el proceso y su salida
process.exit(1);
