//http://plnkr.co/edit/KQM31HTubn0LfL7jSP5l?p=info
//https://twitter.github.io/typeahead.js/examples/
//https://embed.plnkr.co/nqKUSPWb6w5QXr8a0wEu/?show=preview
import { Component, /*DynamicComponentLoader,*/ ElementRef, Input, OnInit,  forwardRef  } from '@angular/core';
import { NgModel, ControlValueAccessor , NG_VALUE_ACCESSOR} from "@angular/forms";
import { PropertyHandler } from './PropertyHandler';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoComplete),
    multi: true
};
@Component({
      selector: 'typehead[ngModel][typeHeadSetup]',
//    selector: 'typehead[ngModel][typeHeadSetup]',
    providers: [NgModel, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
//    host: {
//        '(input)': 'onInputChange()'
//    },
    template: `
   <div class="ng2-typehead">
    <input type="text" class="ng2typehead" value="" (keyup)="onInputChange($event)" value="{{autoCompleteSelectedLabel}}" />
    <input type="text" style="display:none" [(ngModel)]="value" />
    <div class="typehead-list" *ngIf="dataList && dataList.length">
        <ul>
            <li  class="typehead-item" *ngFor="let item of dataList">
              <div *ngIf="!typeHeadSetup.customTemplate" (click)="selectedItem(item)">{{getLabel(item)}}
              </div>
              <div *ngIf="typeHeadSetup.customTemplate" (click)="selectedItem(item)">
                <html-outlet [html]="typeHeadSetup.customTemplate" [item]="item"></html-outlet>
              </div>
            </li>
        </ul>
    </div>
   </div>
  <div #attach></div>`,
    styles: ['.ng2-typehead{width:100%}.typehead-list{position:absolute;left:0px;z-index:100;display:block;border:1px solid #ddd;background-color:#fff;width:100%} .typehead-list ul{list-style: none;padding-left: 3px; width:100%; max-height:200px;} .typehead-item{border-top:1px solid #ddd;width:100%} .ng2typehead{width:100%} .typehead-item:hover{background-color: #428BCA;color:#fff}']
})
export class AutoComplete implements OnInit, ControlValueAccessor {
    @Input('typeHeadSetup') typeHeadSetup: TypeHeadSetup;
    dataList: Array<any>;
    type: string; //static or dynamic
    enable: boolean = false;
    template: string;
    selectedObjectItem: any;
    autoCompleteSelectedLabel: any;
    private innerValue: any = '';
     private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    constructor(
        private propertyHandler: PropertyHandler, private inputEle: ElementRef) {
//        this.typeheadNgModel.valueAccessor = this;
    }
    ngOnInit() {
        this.dataList = this.typeHeadSetup.staticData ? this.typeHeadSetup.staticData : [];
        this.type = this.typeHeadSetup.type ? this.typeHeadSetup.type : 'dynamic';
        this.enable = true;
    }
    onInputChange($event:any) {
       let value = $event.target.value;
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
            let serchPropList = this.typeHeadSetup.searchProperty.split(',');
            if (this.typeHeadSetup.staticData && this.typeHeadSetup.staticData) {
                this.dataList = this.typeHeadSetup.staticData.filter((item) => {
                    let isValid = false;
                    for (let i = 0; i < serchPropList.length; i++) {
                        let originalValue = this.propertyHandler.getValueByProperty(item, serchPropList[i]);
                        if (originalValue && originalValue.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                            isValid = true;
                        }
                    }
                    return isValid;
                });
                console.log(this.dataList);
            }
        } else {
            this.typeHeadSetup.asynchDataCall(value, (dataList: Array<any>) => {
                this.dataList = dataList;
            });
        }
    }
    getLabel(item: any) {
        return this.propertyHandler.getValueByProperty(item, this.typeHeadSetup.textPrperty);
    }
    selectedItem(item: any) {
        this.selectedObjectItem = item;
        this.value = this.propertyHandler.getValueByProperty(item, this.typeHeadSetup.valueProperty);
        this.autoCompleteSelectedLabel = this.propertyHandler.getValueByProperty(item, this.typeHeadSetup.textPrperty);
        this.dataList = [];
    }
    

     //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.value) {
            this.value = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}

export interface IView {
    template: string;
}
export interface TypeHeadSetup {
    customTemplate: string;
    timeDelay: number;
    type: string;
    textPrperty: string;
    valueProperty: string;
    searchProperty: string;
    asynchDataCall: any;
    staticDataFilterkey: any;
    staticData: Array<any>;
}
