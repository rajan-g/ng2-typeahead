System.register(["@angular/core", "@angular/router", "@angular/common"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    function createComponentFactory(compiler, metadata) {
        const cmpClass = class DynamicComponent {
        };
        const decoratedCmp = core_1.Component(metadata)(cmpClass);
        let DynamicHtmlModule = class DynamicHtmlModule {
        };
        DynamicHtmlModule = __decorate([
            core_1.NgModule({ imports: [common_1.CommonModule, router_1.RouterModule], declarations: [decoratedCmp] })
        ], DynamicHtmlModule);
        return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
            .then((moduleWithComponentFactory) => {
            return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
        });
    }
    exports_1("createComponentFactory", createComponentFactory);
    var core_1, router_1, common_1, HtmlOutlet;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }
        ],
        execute: function () {
            HtmlOutlet = class HtmlOutlet {
                constructor(vcRef, compiler) {
                    this.vcRef = vcRef;
                    this.compiler = compiler;
                }
                ngOnChanges() {
                    const html = this.html;
                    if (!html)
                        return;
                    if (this.cmpRef) {
                        this.cmpRef.destroy();
                    }
                    const compMetadata = new core_1.Component({
                        selector: 'dynamic-html',
                        template: this.html,
                    });
                    createComponentFactory(this.compiler, compMetadata)
                        .then(factory => {
                        const injector = core_1.ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                        this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
                        this.cmpRef.instance['item'] = this.item;
                    });
                }
                ngOnDestroy() {
                    if (this.cmpRef) {
                        this.cmpRef.destroy();
                    }
                }
            };
            __decorate([
                core_1.Input('html'),
                __metadata("design:type", String)
            ], HtmlOutlet.prototype, "html", void 0);
            __decorate([
                core_1.Input('item'),
                __metadata("design:type", Object)
            ], HtmlOutlet.prototype, "item", void 0);
            HtmlOutlet = __decorate([
                core_1.Directive({ selector: 'html-outlet' }),
                __metadata("design:paramtypes", [core_1.ViewContainerRef, core_1.Compiler])
            ], HtmlOutlet);
            exports_1("HtmlOutlet", HtmlOutlet);
        }
    };
});
//# sourceMappingURL=html-outlet.js.map