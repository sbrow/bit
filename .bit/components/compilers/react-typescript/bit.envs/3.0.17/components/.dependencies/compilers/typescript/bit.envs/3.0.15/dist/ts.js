'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compile = undefined;

var _compile = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(context) {
        var pathToTSC, dists, mainFile;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        pathToTSC = require.resolve('typescript/bin/tsc');

                        print('path to tsc: ' + pathToTSC);
                        _context2.next = 4;
                        return runNodeScriptInDir(context.directory, pathToTSC, ['-d']);

                    case 4:
                        _context2.next = 6;
                        return collectDistFiles(context);

                    case 6:
                        dists = _context2.sent;
                        mainFile = findMainFile(context, dists);
                        return _context2.abrupt('return', { dists: dists, mainFile: mainFile });

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function _compile(_x5) {
        return _ref3.apply(this, arguments);
    };
}();

var createContext = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(res, directory, distPath) {
        var componentObject;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        componentObject = res.componentWithDependencies.component.toObject();
                        return _context3.abrupt('return', {
                            main: componentObject.mainFile,
                            dist: distPath,
                            name: componentObject.name,
                            dependencies: getCustomDependencies(directory),
                            capsule: res.capsule,
                            directory: directory
                        });

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function createContext(_x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

var runNodeScriptInDir = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(directory, scriptFile, args) {
        var result, cwd;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        result = null;
                        cwd = process.cwd();
                        _context4.prev = 2;

                        process.chdir(directory);
                        _context4.next = 6;
                        return (0, _execa2.default)(scriptFile, args);

                    case 6:
                        result = _context4.sent;
                        _context4.next = 13;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](2);

                        process.chdir(cwd);
                        throw _context4.t0;

                    case 13:
                        process.chdir(cwd);
                        return _context4.abrupt('return', result);

                    case 15:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[2, 9]]);
    }));

    return function runNodeScriptInDir(_x9, _x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();

//@TODO refactor out of here and share with angular compiler.
var isolate = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(api) {
        var uuidHack, targetDir, componentName, res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        uuidHack = 'capsule-' + Date.now().toString().slice(-5);
                        targetDir = _path2.default.join(os.tmpdir(), 'bit', uuidHack);
                        componentName = api.componentObject.name;

                        print('\n building ' + componentName + ' on directory ' + targetDir);

                        _context5.next = 6;
                        return api.isolate({ targetDir: targetDir, shouldBuildDependencies: true });

                    case 6:
                        res = _context5.sent;
                        return _context5.abrupt('return', { res: res, directory: targetDir });

                    case 8:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function isolate(_x12) {
        return _ref6.apply(this, arguments);
    };
}();

var collectDistFiles = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(context) {
        var capsuleDir, compDistDir, files, readFiles;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        capsuleDir = context.directory;
                        compDistDir = _path2.default.resolve(capsuleDir, 'dist');
                        _context6.next = 4;
                        return (0, _recursiveReaddir2.default)(compDistDir);

                    case 4:
                        files = _context6.sent;
                        _context6.next = 7;
                        return Promise.all(files.map(function (file) {
                            return _fs.promises.readFile(file);
                        }));

                    case 7:
                        readFiles = _context6.sent;
                        return _context6.abrupt('return', files.map(function (file, index) {
                            return new _vinyl2.default({
                                path: _path2.default.join(context.name, file.split(_path2.default.join(capsuleDir, 'dist'))[1]),
                                contents: readFiles[index]
                            });
                        }));

                    case 9:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function collectDistFiles(_x13) {
        return _ref7.apply(this, arguments);
    };
}();

exports.findMainFile = findMainFile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _recursiveReaddir = require('recursive-readdir');

var _recursiveReaddir2 = _interopRequireDefault(_recursiveReaddir);

var _vinyl = require('vinyl');

var _vinyl2 = _interopRequireDefault(_vinyl);

var _fs = require('fs');

var _bitUtilsObject = require('@bit/bit.utils.object.group-by');

var _bitUtilsObject2 = _interopRequireDefault(_bitUtilsObject);

require('typescript');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var os = require('os');
var DEBUG_FLAG = 'DEBUG';

var compiledFileTypes = ['ts', 'tsx'];
var tsconfig = require(_path2.default.join(__dirname, './tsconfig.json'));

var compile = exports.compile = function compile(files, distPath, context) {
    var compilerOptions = tsconfig;
    return typescriptCompile(files, distPath, context, { fileTypes: compiledFileTypes, compilerOptions: compilerOptions });
};

var typescriptCompile = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_files, distPath, api, extra) {
        var _ref2, res, directory, context, results;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return isolate(api);

                    case 2:
                        _ref2 = _context.sent;
                        res = _ref2.res;
                        directory = _ref2.directory;
                        _context.next = 7;
                        return createContext(res, directory, distPath);

                    case 7:
                        context = _context.sent;
                        _context.next = 10;
                        return createTSConfig(context, extra.compilerOptions);

                    case 10:
                        _context.next = 12;
                        return _compile(context);

                    case 12:
                        results = _context.sent;

                        if (process.env[DEBUG_FLAG]) {
                            _context.next = 16;
                            break;
                        }

                        _context.next = 16;
                        return context.capsule.destroy();

                    case 16:
                        return _context.abrupt('return', results);

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function typescriptCompile(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

function findMainFile(context, dists) {
    var getNameOfFile = function getNameOfFile(val, split) {
        return val.split(split)[0];
    };
    var res = dists.find(function (val) {
        return getNameOfFile(context.main, '.ts') === getNameOfFile(val.basename, '.js');
    });
    return (res || {}).path;
}


function createTSConfig(context, content) {
    var pathToConfig = getTSConfigPath(context);
    content.compilerOptions.outDir = 'dist';
    return _fs.promises.writeFile(pathToConfig, JSON.stringify(content, null, 4));
}

function getTSConfigPath(context) {
    return _path2.default.join(context.directory, 'tsconfig.json');
}

function getCustomDependencies(dir) {
    return Object.keys(require(dir + '/package.json').dependencies || {});
}

function print(msg) {
    process.env[DEBUG_FLAG] && console.log(msg);
}

//# sourceMappingURL=ts.js.map