System.register(['@angular/core', '@angular/platform-browser', '@angular/forms', './controls-components/dynamic-form-component', './control-meta/PropertyHandler', './controls-components/text-control', './controls-components/number-control', './controls-components/date-control', './controls-components/time-control', './controls-components/checkbox-control', './controls-components/radio-control', './controls-components/email-control', './controls-components/select-control', './controls-components/validation-messages-block'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, forms_1, dynamic_form_component_1, PropertyHandler_1, text_control_1, number_control_1, date_control_1, time_control_1, checkbox_control_1, radio_control_1, email_control_1, select_control_1, validation_messages_block_1;
    var DynaFormModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (dynamic_form_component_1_1) {
                dynamic_form_component_1 = dynamic_form_component_1_1;
            },
            function (PropertyHandler_1_1) {
                PropertyHandler_1 = PropertyHandler_1_1;
            },
            function (text_control_1_1) {
                text_control_1 = text_control_1_1;
            },
            function (number_control_1_1) {
                number_control_1 = number_control_1_1;
            },
            function (date_control_1_1) {
                date_control_1 = date_control_1_1;
            },
            function (time_control_1_1) {
                time_control_1 = time_control_1_1;
            },
            function (checkbox_control_1_1) {
                checkbox_control_1 = checkbox_control_1_1;
            },
            function (radio_control_1_1) {
                radio_control_1 = radio_control_1_1;
            },
            function (email_control_1_1) {
                email_control_1 = email_control_1_1;
            },
            function (select_control_1_1) {
                select_control_1 = select_control_1_1;
            },
            function (validation_messages_block_1_1) {
                validation_messages_block_1 = validation_messages_block_1_1;
            }],
        execute: function() {
            DynaFormModule = (function () {
                function DynaFormModule() {
                }
                DynaFormModule.forRoot = function () { return { ngModule: DynaFormModule, providers: [PropertyHandler_1.PropertyHandler] }; };
                DynaFormModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
                        declarations: [dynamic_form_component_1.DynaFormComponent, text_control_1.TextControl,
                            number_control_1.NumberControl, checkbox_control_1.CheckBoxControl,
                            radio_control_1.RadioControl, email_control_1.EmailControl,
                            select_control_1.SelectControl, date_control_1.DateControl,
                            time_control_1.TimeControl,
                            validation_messages_block_1.DynaValidationBlock],
                        exports: [dynamic_form_component_1.DynaFormComponent, text_control_1.TextControl,
                            number_control_1.NumberControl, checkbox_control_1.CheckBoxControl,
                            radio_control_1.RadioControl, email_control_1.EmailControl,
                            select_control_1.SelectControl, date_control_1.DateControl,
                            time_control_1.TimeControl,
                            validation_messages_block_1.DynaValidationBlock],
                        providers: [PropertyHandler_1.PropertyHandler]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DynaFormModule);
                return DynaFormModule;
            }());
            exports_1("DynaFormModule", DynaFormModule);
        }
    }
});
//# sourceMappingURL=dynaform.module.js.map