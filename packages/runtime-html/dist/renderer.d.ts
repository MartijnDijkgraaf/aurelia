import { IServiceLocator, IContainer, Class, IRegistry } from '@aurelia/kernel';
import { BindingMode, IExpressionParser, IObserverLocator, Interpolation, IsBindingBehavior, LifecycleFlags, IInterceptableBinding, ForOfStatement, DelegationStrategy } from '@aurelia/runtime';
import { IEventDelegator } from './observation/event-delegator';
import { CustomElementDefinition, PartialCustomElementDefinition } from './resources/custom-element';
import { ICompiledRenderContext } from './templating/render-context';
import { RegisteredProjections, SlotInfo } from './resources/custom-elements/au-slot';
import { INode } from './dom';
import { IPlatform } from './platform';
import type { IHydratableController, IController } from './templating/controller';
export declare const enum InstructionType {
    hydrateElement = "ra",
    hydrateAttribute = "rb",
    hydrateTemplateController = "rc",
    hydrateLetElement = "rd",
    setProperty = "re",
    interpolation = "rf",
    propertyBinding = "rg",
    callBinding = "rh",
    letBinding = "ri",
    refBinding = "rj",
    iteratorBinding = "rk",
    textBinding = "ha",
    listenerBinding = "hb",
    attributeBinding = "hc",
    stylePropertyBinding = "hd",
    setAttribute = "he",
    setClassAttribute = "hf",
    setStyleAttribute = "hg"
}
export declare type NodeInstruction = HydrateElementInstruction | HydrateTemplateController | HydrateLetElementInstruction | TextBindingInstruction;
export declare type AttributeInstruction = InterpolationInstruction | PropertyBindingInstruction | IteratorBindingInstruction | CallBindingInstruction | RefBindingInstruction | SetPropertyInstruction | LetBindingInstruction | HydrateAttributeInstruction | ListenerBindingInstruction | AttributeBindingInstruction | StylePropertyBindingInstruction | SetAttributeInstruction | SetClassAttributeInstruction | SetStyleAttributeInstruction;
export declare type Instruction = NodeInstruction | AttributeInstruction;
export declare type InstructionRow = [Instruction, ...AttributeInstruction[]];
export declare type InstructionTypeName = string;
export interface IInstruction {
    readonly type: InstructionTypeName;
}
export declare const IInstruction: import("@aurelia/kernel").InterfaceSymbol<IInstruction>;
export declare function isInstruction(value: unknown): value is IInstruction;
export declare class InterpolationInstruction {
    from: string | Interpolation;
    to: string;
    get type(): InstructionType.interpolation;
    constructor(from: string | Interpolation, to: string);
}
export declare class PropertyBindingInstruction {
    from: string | IsBindingBehavior;
    to: string;
    mode: BindingMode;
    get type(): InstructionType.propertyBinding;
    constructor(from: string | IsBindingBehavior, to: string, mode: BindingMode);
}
export declare class IteratorBindingInstruction {
    from: string | ForOfStatement;
    to: string;
    get type(): InstructionType.iteratorBinding;
    constructor(from: string | ForOfStatement, to: string);
}
export declare class CallBindingInstruction {
    from: string | IsBindingBehavior;
    to: string;
    get type(): InstructionType.callBinding;
    constructor(from: string | IsBindingBehavior, to: string);
}
export declare class RefBindingInstruction {
    readonly from: string | IsBindingBehavior;
    readonly to: string;
    get type(): InstructionType.refBinding;
    constructor(from: string | IsBindingBehavior, to: string);
}
export declare class SetPropertyInstruction {
    value: unknown;
    to: string;
    get type(): InstructionType.setProperty;
    constructor(value: unknown, to: string);
}
export declare class HydrateElementInstruction {
    res: string;
    instructions: IInstruction[];
    slotInfo: SlotInfo | null;
    get type(): InstructionType.hydrateElement;
    constructor(res: string, instructions: IInstruction[], slotInfo: SlotInfo | null);
}
export declare class HydrateAttributeInstruction {
    res: string;
    instructions: IInstruction[];
    get type(): InstructionType.hydrateAttribute;
    constructor(res: string, instructions: IInstruction[]);
}
export declare class HydrateTemplateController {
    def: PartialCustomElementDefinition;
    res: string;
    instructions: IInstruction[];
    get type(): InstructionType.hydrateTemplateController;
    constructor(def: PartialCustomElementDefinition, res: string, instructions: IInstruction[]);
}
export declare class HydrateLetElementInstruction {
    instructions: LetBindingInstruction[];
    toBindingContext: boolean;
    get type(): InstructionType.hydrateLetElement;
    constructor(instructions: LetBindingInstruction[], toBindingContext: boolean);
}
export declare class LetBindingInstruction {
    from: string | IsBindingBehavior | Interpolation;
    to: string;
    get type(): InstructionType.letBinding;
    constructor(from: string | IsBindingBehavior | Interpolation, to: string);
}
export declare class TextBindingInstruction {
    from: string | Interpolation;
    get type(): InstructionType.textBinding;
    constructor(from: string | Interpolation);
}
export declare class ListenerBindingInstruction {
    from: string | IsBindingBehavior;
    to: string;
    preventDefault: boolean;
    strategy: DelegationStrategy;
    get type(): InstructionType.listenerBinding;
    constructor(from: string | IsBindingBehavior, to: string, preventDefault: boolean, strategy: DelegationStrategy);
}
export declare class StylePropertyBindingInstruction {
    from: string | IsBindingBehavior;
    to: string;
    get type(): InstructionType.stylePropertyBinding;
    constructor(from: string | IsBindingBehavior, to: string);
}
export declare class SetAttributeInstruction {
    value: string;
    to: string;
    get type(): InstructionType.setAttribute;
    constructor(value: string, to: string);
}
export declare class SetClassAttributeInstruction {
    readonly value: string;
    readonly type: InstructionType.setClassAttribute;
    constructor(value: string);
}
export declare class SetStyleAttributeInstruction {
    readonly value: string;
    readonly type: InstructionType.setStyleAttribute;
    constructor(value: string);
}
export declare class AttributeBindingInstruction {
    /**
     * `attr` and `to` have the same value on a normal attribute
     * Will be different on `class` and `style`
     * on `class`: attr = `class` (from binding command), to = attribute name
     * on `style`: attr = `style` (from binding command), to = attribute name
     */
    attr: string;
    from: string | IsBindingBehavior;
    to: string;
    get type(): InstructionType.attributeBinding;
    constructor(
    /**
     * `attr` and `to` have the same value on a normal attribute
     * Will be different on `class` and `style`
     * on `class`: attr = `class` (from binding command), to = attribute name
     * on `style`: attr = `style` (from binding command), to = attribute name
     */
    attr: string, from: string | IsBindingBehavior, to: string);
}
export interface ITemplateCompiler {
    compile(partialDefinition: PartialCustomElementDefinition, context: IContainer, targetedProjections: RegisteredProjections | null): CustomElementDefinition;
}
export declare const ITemplateCompiler: import("@aurelia/kernel").InterfaceSymbol<ITemplateCompiler>;
export interface IInstructionTypeClassifier<TType extends string = string> {
    instructionType: TType;
}
export interface IRenderer<TType extends InstructionTypeName = InstructionTypeName> extends Partial<IInstructionTypeClassifier<TType>> {
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: unknown, instruction: IInstruction): void;
}
export declare const IRenderer: import("@aurelia/kernel").InterfaceSymbol<IRenderer<string>>;
declare type DecoratableInstructionRenderer<TType extends string, TProto, TClass> = Class<TProto & Partial<IInstructionTypeClassifier<TType> & Pick<IRenderer, 'render'>>, TClass> & Partial<IRegistry>;
declare type DecoratedInstructionRenderer<TType extends string, TProto, TClass> = Class<TProto & IInstructionTypeClassifier<TType> & Pick<IRenderer, 'render'>, TClass> & IRegistry;
declare type InstructionRendererDecorator<TType extends string> = <TProto, TClass>(target: DecoratableInstructionRenderer<TType, TProto, TClass>) => DecoratedInstructionRenderer<TType, TProto, TClass>;
export declare function renderer<TType extends string>(instructionType: TType): InstructionRendererDecorator<TType>;
export declare class SetPropertyRenderer implements IRenderer {
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: IController, instruction: SetPropertyInstruction): void;
}
export declare class CustomElementRenderer implements IRenderer {
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: HydrateElementInstruction): void;
}
export declare class CustomAttributeRenderer implements IRenderer {
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: HydrateAttributeInstruction): void;
}
export declare class TemplateControllerRenderer implements IRenderer {
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: HydrateTemplateController): void;
}
export declare class LetElementRenderer implements IRenderer {
    private readonly parser;
    private readonly observerLocator;
    constructor(parser: IExpressionParser, observerLocator: IObserverLocator);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: Node & ChildNode, instruction: HydrateLetElementInstruction): void;
}
export declare class CallBindingRenderer implements IRenderer {
    private readonly parser;
    private readonly observerLocator;
    constructor(parser: IExpressionParser, observerLocator: IObserverLocator);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: IController, instruction: CallBindingInstruction): void;
}
export declare class RefBindingRenderer implements IRenderer {
    private readonly parser;
    constructor(parser: IExpressionParser);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: INode, instruction: RefBindingInstruction): void;
}
export declare class InterpolationBindingRenderer implements IRenderer {
    private readonly parser;
    private readonly observerLocator;
    private readonly platform;
    constructor(parser: IExpressionParser, observerLocator: IObserverLocator, platform: IPlatform);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: IController, instruction: InterpolationInstruction): void;
}
export declare class PropertyBindingRenderer implements IRenderer {
    private readonly parser;
    private readonly observerLocator;
    private readonly platform;
    constructor(parser: IExpressionParser, observerLocator: IObserverLocator, platform: IPlatform);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: IController, instruction: PropertyBindingInstruction): void;
}
export declare class IteratorBindingRenderer implements IRenderer {
    private readonly parser;
    private readonly observerLocator;
    private readonly platform;
    constructor(parser: IExpressionParser, observerLocator: IObserverLocator, platform: IPlatform);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: IController, instruction: IteratorBindingInstruction): void;
}
export declare function applyBindingBehavior(binding: IInterceptableBinding, expression: IsBindingBehavior, locator: IServiceLocator): IInterceptableBinding;
export declare class TextBindingRenderer implements IRenderer {
    private readonly parser;
    private readonly observerLocator;
    private readonly platform;
    constructor(parser: IExpressionParser, observerLocator: IObserverLocator, platform: IPlatform);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: ChildNode, instruction: TextBindingInstruction): void;
}
export declare class ListenerBindingRenderer implements IRenderer {
    private readonly parser;
    private readonly eventDelegator;
    constructor(parser: IExpressionParser, eventDelegator: IEventDelegator);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: ListenerBindingInstruction): void;
}
export declare class SetAttributeRenderer implements IRenderer {
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: SetAttributeInstruction): void;
}
export declare class SetClassAttributeRenderer implements IRenderer {
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: SetClassAttributeInstruction): void;
}
export declare class SetStyleAttributeRenderer implements IRenderer {
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: SetStyleAttributeInstruction): void;
}
export declare class StylePropertyBindingRenderer implements IRenderer {
    private readonly parser;
    private readonly observerLocator;
    private readonly platform;
    constructor(parser: IExpressionParser, observerLocator: IObserverLocator, platform: IPlatform);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: StylePropertyBindingInstruction): void;
}
export declare class AttributeBindingRenderer implements IRenderer {
    private readonly parser;
    private readonly observerLocator;
    constructor(parser: IExpressionParser, observerLocator: IObserverLocator);
    render(flags: LifecycleFlags, context: ICompiledRenderContext, controller: IHydratableController, target: HTMLElement, instruction: AttributeBindingInstruction): void;
}
export {};
//# sourceMappingURL=renderer.d.ts.map