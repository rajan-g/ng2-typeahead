System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "./PropertyHandler", "./autocomplete", "../src/html-outlet"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, forms_1, PropertyHandler_1, autocomplete_1, html_outlet_1, TypeAheadModule, TypeAheadModule_1;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (PropertyHandler_1_1) {
                PropertyHandler_1 = PropertyHandler_1_1;
            },
            function (autocomplete_1_1) {
                autocomplete_1 = autocomplete_1_1;
            },
            function (html_outlet_1_1) {
                html_outlet_1 = html_outlet_1_1;
            }
        ],
        execute: function () {
            TypeAheadModule = TypeAheadModule_1 = class TypeAheadModule {
                static forRoot() { return { ngModule: TypeAheadModule_1, providers: [PropertyHandler_1.PropertyHandler] }; }
            };
            TypeAheadModule = TypeAheadModule_1 = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
                    declarations: [autocomplete_1.AutoComplete, html_outlet_1.HtmlOutlet],
                    exports: [autocomplete_1.AutoComplete, html_outlet_1.HtmlOutlet],
                    providers: [PropertyHandler_1.PropertyHandler]
                })
            ], TypeAheadModule);
            exports_1("TypeAheadModule", TypeAheadModule);
        }
    };
});
//# sourceMappingURL=typeahead.module.js.map