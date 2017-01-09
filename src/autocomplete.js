System.register(['@angular/core', "@angular/forms", './PropertyHandler'], function(exports_1, context_1) {
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
    var core_1, forms_1, PropertyHandler_1;
    var noop, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, AutoComplete;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (PropertyHandler_1_1) {
                PropertyHandler_1 = PropertyHandler_1_1;
            }],
        execute: function() {
            noop = function () {
            };
            exports_1("CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR", CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return AutoComplete; }),
                multi: true
            });
            AutoComplete = (function () {
                function AutoComplete(propertyHandler, inputEle) {
                    this.propertyHandler = propertyHandler;
                    this.inputEle = inputEle;
                    this.enable = false;
                    this.innerValue = '';
                    this.onTouchedCallback = noop;
                    this.onChangeCallback = noop;
                    //        this.typeheadNgModel.valueAccessor = this;
                }
                AutoComplete.prototype.ngOnInit = function () {
                    this.dataList = this.typeHeadSetup.staticData ? this.typeHeadSetup.staticData : [];
                    this.type = this.typeHeadSetup.type ? this.typeHeadSetup.type : 'dynamic';
                    this.enable = true;
                };
                AutoComplete.prototype.onInputChange = function ($event) {
                    var _this = this;
                    var value = $event.target.value;
                    /* let value = this.inputEle.nativeElement.value;
                     this.template = `<input type="text" class="ng2typehead" value=""  [typeHeadSetup]="typeHeadSetup"/>
                                     <div>
                               <div class="typehead-list">
                               <ul>
                               <li  class="typehead-item" *ngFor="let item of dataList">
                                 <div (click)="selectedItem(item)">{{getLabel(item)}}
                                 </div>
                               </li>
                               </ul>
                               </div>
                               </div>
                             `;
                     //         this.inputEle.nativeElement.insertAdjacentHTML('afterend', '<html-outlet [html]="template"></html-outlet>');*/
                    //         this.inputEle.nativeElement.append(template);
                    if (this.type === 'static') {
                        this.dataList = [];
                        var serchPropList_1 = this.typeHeadSetup.searchProperty.split(',');
                        if (this.typeHeadSetup.staticData && this.typeHeadSetup.staticData) {
                            this.dataList = this.typeHeadSetup.staticData.filter(function (item) {
                                var isValid = false;
                                for (var i = 0; i < serchPropList_1.length; i++) {
                                    var originalValue = _this.propertyHandler.getValueByProperty(item, serchPropList_1[i]);
                                    if (originalValue && originalValue.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                                        isValid = true;
                                    }
                                }
                                return isValid;
                            });
                            console.log(this.dataList);
                        }
                    }
                    else {
                        this.typeHeadSetup.asynchDataCall(value, function (dataList) {
                            _this.dataList = dataList;
                        });
                    }
                };
                AutoComplete.prototype.getLabel = function (item) {
                    return this.propertyHandler.getValueByProperty(item, this.typeHeadSetup.textPrperty);
                };
                AutoComplete.prototype.selectedItem = function (item) {
                    this.selectedObjectItem = item;
                    this.value = this.propertyHandler.getValueByProperty(item, this.typeHeadSetup.valueProperty);
                    this.autoCompleteSelectedLabel = this.propertyHandler.getValueByProperty(item, this.typeHeadSetup.textPrperty);
                    this.dataList = [];
                };
                Object.defineProperty(AutoComplete.prototype, "value", {
                    //get accessor
                    get: function () {
                        return this.innerValue;
                    },
                    //set accessor including call the onchange callback
                    set: function (v) {
                        if (v !== this.innerValue) {
                            this.innerValue = v;
                            this.onChangeCallback(v);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                //Set touched on blur
                AutoComplete.prototype.onBlur = function () {
                    this.onTouchedCallback();
                };
                //From ControlValueAccessor interface
                AutoComplete.prototype.writeValue = function (value) {
                    if (value !== this.value) {
                        this.value = value;
                    }
                };
                //From ControlValueAccessor interface
                AutoComplete.prototype.registerOnChange = function (fn) {
                    this.onChangeCallback = fn;
                };
                //From ControlValueAccessor interface
                AutoComplete.prototype.registerOnTouched = function (fn) {
                    this.onTouchedCallback = fn;
                };
                __decorate([
                    core_1.Input('typeHeadSetup'), 
                    __metadata('design:type', Object)
                ], AutoComplete.prototype, "typeHeadSetup", void 0);
                AutoComplete = __decorate([
                    core_1.Component({
                        selector: 'typehead[ngModel][typeHeadSetup]',
                        //    selector: 'typehead[ngModel][typeHeadSetup]',
                        providers: [forms_1.NgModel, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                        //    host: {
                        //        '(input)': 'onInputChange()'
                        //    },
                        template: "\n   <div class=\"ng2-typehead\">\n    <input type=\"text\" class=\"ng2typehead\" value=\"\" (keyup)=\"onInputChange($event)\" value=\"{{autoCompleteSelectedLabel}}\" />\n    <input type=\"text\" style=\"display:none\" [(ngModel)]=\"value\" />\n    <div class=\"typehead-list\" *ngIf=\"dataList && dataList.length\">\n        <ul>\n            <li  class=\"typehead-item\" *ngFor=\"let item of dataList\">\n              <div *ngIf=\"!typeHeadSetup.customTemplate\" (click)=\"selectedItem(item)\">{{getLabel(item)}}\n              </div>\n              <div *ngIf=\"typeHeadSetup.customTemplate\" (click)=\"selectedItem(item)\">\n                <html-outlet [html]=\"typeHeadSetup.customTemplate\" [item]=\"item\"></html-outlet>\n              </div>\n            </li>\n        </ul>\n    </div>\n   </div>\n  <div #attach></div>",
                        styles: ['.ng2-typehead{width:100%}.typehead-list{position:absolute;left:0px;z-index:100;display:block;border:1px solid #ddd;background-color:#fff;width:100%} .typehead-list ul{list-style: none;padding-left: 3px; width:100%; max-height:200px;} .typehead-item{border-top:1px solid #ddd;width:100%} .ng2typehead{width:100%} .typehead-item:hover{background-color: #428BCA;color:#fff}']
                    }), 
                    __metadata('design:paramtypes', [PropertyHandler_1.PropertyHandler, core_1.ElementRef])
                ], AutoComplete);
                return AutoComplete;
            }());
            exports_1("AutoComplete", AutoComplete);
        }
    }
});
//# sourceMappingURL=autocomplete.js.map