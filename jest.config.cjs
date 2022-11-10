module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  //* Este es  para hacer que ciertos patrones sean ignorados por jest, esto para que no alla algun cambio, por ej en la parte de firebase que no alla ningun cambio etc..
  transformIgnorePatterns: [],
};
