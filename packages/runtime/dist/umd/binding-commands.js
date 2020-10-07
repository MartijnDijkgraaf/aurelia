var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./binding-command", "./flags", "./instructions", "./semantic-model"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ForBindingCommand = exports.CallBindingCommand = exports.DefaultBindingCommand = exports.TwoWayBindingCommand = exports.FromViewBindingCommand = exports.ToViewBindingCommand = exports.OneTimeBindingCommand = void 0;
    const binding_command_1 = require("./binding-command");
    const flags_1 = require("./flags");
    const instructions_1 = require("./instructions");
    const semantic_model_1 = require("./semantic-model");
    let OneTimeBindingCommand = /** @class */ (() => {
        let OneTimeBindingCommand = class OneTimeBindingCommand {
            constructor() {
                this.bindingType = 49 /* OneTimeCommand */;
            }
            compile(binding) {
                return new instructions_1.OneTimeBindingInstruction(binding.expression, binding_command_1.getTarget(binding, false));
            }
        };
        OneTimeBindingCommand = __decorate([
            binding_command_1.bindingCommand('one-time')
        ], OneTimeBindingCommand);
        return OneTimeBindingCommand;
    })();
    exports.OneTimeBindingCommand = OneTimeBindingCommand;
    let ToViewBindingCommand = /** @class */ (() => {
        let ToViewBindingCommand = class ToViewBindingCommand {
            constructor() {
                this.bindingType = 50 /* ToViewCommand */;
            }
            compile(binding) {
                return new instructions_1.ToViewBindingInstruction(binding.expression, binding_command_1.getTarget(binding, false));
            }
        };
        ToViewBindingCommand = __decorate([
            binding_command_1.bindingCommand('to-view')
        ], ToViewBindingCommand);
        return ToViewBindingCommand;
    })();
    exports.ToViewBindingCommand = ToViewBindingCommand;
    let FromViewBindingCommand = /** @class */ (() => {
        let FromViewBindingCommand = class FromViewBindingCommand {
            constructor() {
                this.bindingType = 51 /* FromViewCommand */;
            }
            compile(binding) {
                return new instructions_1.FromViewBindingInstruction(binding.expression, binding_command_1.getTarget(binding, false));
            }
        };
        FromViewBindingCommand = __decorate([
            binding_command_1.bindingCommand('from-view')
        ], FromViewBindingCommand);
        return FromViewBindingCommand;
    })();
    exports.FromViewBindingCommand = FromViewBindingCommand;
    let TwoWayBindingCommand = /** @class */ (() => {
        let TwoWayBindingCommand = class TwoWayBindingCommand {
            constructor() {
                this.bindingType = 52 /* TwoWayCommand */;
            }
            compile(binding) {
                return new instructions_1.TwoWayBindingInstruction(binding.expression, binding_command_1.getTarget(binding, false));
            }
        };
        TwoWayBindingCommand = __decorate([
            binding_command_1.bindingCommand('two-way')
        ], TwoWayBindingCommand);
        return TwoWayBindingCommand;
    })();
    exports.TwoWayBindingCommand = TwoWayBindingCommand;
    let DefaultBindingCommand = /** @class */ (() => {
        let DefaultBindingCommand = class DefaultBindingCommand {
            constructor() {
                this.bindingType = 53 /* BindCommand */;
            }
            compile(binding) {
                let mode = flags_1.BindingMode.default;
                if (binding instanceof semantic_model_1.BindingSymbol) {
                    mode = binding.bindable.mode;
                }
                else {
                    const command = binding.syntax.command;
                    switch (command) {
                        case 'bind':
                        case 'to-view':
                            mode = flags_1.BindingMode.toView;
                            break;
                        case 'one-time':
                            mode = flags_1.BindingMode.oneTime;
                            break;
                        case 'from-view':
                            mode = flags_1.BindingMode.fromView;
                            break;
                        case 'two-way':
                            mode = flags_1.BindingMode.twoWay;
                            break;
                    }
                }
                switch (mode) {
                    case flags_1.BindingMode.default:
                    case flags_1.BindingMode.toView:
                        return ToViewBindingCommand.prototype.compile(binding);
                    case flags_1.BindingMode.oneTime:
                        return OneTimeBindingCommand.prototype.compile(binding);
                    case flags_1.BindingMode.fromView:
                        return FromViewBindingCommand.prototype.compile(binding);
                    case flags_1.BindingMode.twoWay:
                        return TwoWayBindingCommand.prototype.compile(binding);
                }
            }
        };
        DefaultBindingCommand = __decorate([
            binding_command_1.bindingCommand('bind')
        ], DefaultBindingCommand);
        return DefaultBindingCommand;
    })();
    exports.DefaultBindingCommand = DefaultBindingCommand;
    let CallBindingCommand = /** @class */ (() => {
        let CallBindingCommand = class CallBindingCommand {
            constructor() {
                this.bindingType = 153 /* CallCommand */;
            }
            compile(binding) {
                return new instructions_1.CallBindingInstruction(binding.expression, binding_command_1.getTarget(binding, true));
            }
        };
        CallBindingCommand = __decorate([
            binding_command_1.bindingCommand('call')
        ], CallBindingCommand);
        return CallBindingCommand;
    })();
    exports.CallBindingCommand = CallBindingCommand;
    let ForBindingCommand = /** @class */ (() => {
        let ForBindingCommand = class ForBindingCommand {
            constructor() {
                this.bindingType = 539 /* ForCommand */;
            }
            compile(binding) {
                return new instructions_1.IteratorBindingInstruction(binding.expression, binding_command_1.getTarget(binding, false));
            }
        };
        ForBindingCommand = __decorate([
            binding_command_1.bindingCommand('for')
        ], ForBindingCommand);
        return ForBindingCommand;
    })();
    exports.ForBindingCommand = ForBindingCommand;
});
//# sourceMappingURL=binding-commands.js.map