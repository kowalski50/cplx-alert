import { ɵɵdefineInjectable, Injectable, Pipe, forwardRef, EventEmitter, Input, Output, ViewChild, ElementRef, HostListener, Component, NgModule } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CplxAutocompleteService = /** @class */ (function () {
    function CplxAutocompleteService() {
    }
    CplxAutocompleteService.ɵprov = ɵɵdefineInjectable({ factory: function CplxAutocompleteService_Factory() { return new CplxAutocompleteService(); }, token: CplxAutocompleteService, providedIn: "root" });
    CplxAutocompleteService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], CplxAutocompleteService);
    return CplxAutocompleteService;
}());

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, searchText, visible, params) {
        if (!items)
            return [];
        if (!searchText || !visible)
            return items;
        if (!isNullOrUndefined(params) && params.length > 0)
            return items.filter(function (data) { return new RegExp(searchText, 'gi').test(data["search"]); });
    };
    FilterPipe.prototype.matchValue = function (data, value) {
        return Object.keys(data).map(function (key) {
            return new RegExp(value, 'gi').test(data[key]);
        }).some(function (result) { return result; });
    };
    FilterPipe.prototype.matchValueParams = function (data, value, params) {
        return params.map(function (key) {
            return new RegExp(value, 'gi').test(data[key]);
        }).some(function (result) { return result; });
    };
    FilterPipe = __decorate$1([
        Pipe({ name: 'filter' })
    ], FilterPipe);
    return FilterPipe;
}());
var noop = function () {
};
var ɵ0 = noop;
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return CplxAutocompleteComponent; }),
    multi: true
};
var CplxAutocompleteComponent = /** @class */ (function () {
    function CplxAutocompleteComponent() {
        this.visible = false;
        this.filter = false;
        this.selectedObject = new EventEmitter(true);
        this.textChange = new EventEmitter(true);
        this.timeout = 500;
        this.minlength = 2;
        this.loading = false;
        this.disabled = false;
        this.required = false;
        this.formulario = new FormGroup({
            value: new FormControl(null)
        });
        this.search = "search";
        this._value = '';
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    CplxAutocompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.idcontainer = Math.random().toString().split(".")[1];
        if (!this.filter) {
            fromEvent(this.inputSearch.nativeElement, 'keyup').pipe(map(function (event) {
                return event.target.value;
            }), filter(function (res) { return res.length >= _this.minlength; }), debounceTime(this.timeout), distinctUntilChanged()).subscribe(function (text) {
                _this.value = text;
                _this.visible = true;
                _this.textChange.emit(text);
                //this.loading = true;
            });
        }
        if (this.required) {
            this.set_validator(this.formulario, "value", this.required);
        }
        this.formulario.controls.value.updateValueAndValidity();
    };
    CplxAutocompleteComponent.prototype.set_validator = function (formgroup, control, required) {
        if (required)
            formgroup.controls[control].setValidators([Validators.required]);
        else
            formgroup.controls[control].clearValidators();
        formgroup.controls[control].updateValueAndValidity();
    };
    CplxAutocompleteComponent.prototype.select = function (object) {
        this.selectedObject.emit(object);
        this.writeValue(object[this.search]);
        this.visible = false;
    };
    CplxAutocompleteComponent.prototype.ngOnChanges = function (changes) {
        this.completar();
    };
    CplxAutocompleteComponent.prototype.completar = function () {
        var _this = this;
        if (this.data) {
            this.data.forEach(function (d) {
                var items = [];
                _this.params.map(function (key) {
                    items.push(d[key]);
                });
                d[_this.search] = items.join(" - ");
            });
            setTimeout(function () {
                if (_this.data && _this.reflectparam && _this.reflectvalue && _this.filter) {
                    var object = _this.data.filter(function (d) { return d[_this.reflectparam] == _this.reflectvalue; })[0];
                    if (!isNullOrUndefined(object)) {
                        _this.value = object[_this.search];
                        _this.selectedObject.emit(object);
                        _this.textChange.emit(object[_this.reflectparam]);
                    }
                }
            }, 200);
        }
        this.formulario.controls.value.updateValueAndValidity();
    };
    CplxAutocompleteComponent.prototype.onClick = function (targetElement) {
        var _this = this;
        var clases = targetElement.className.split(" ");
        var clasecontrol = clases.filter(function (clase) { return clase == 'form-control-search'; });
        var clasecontainer = clases.filter(function (clase) { return clase == _this.idcontainer; });
        this.visible = (clasecontrol.length == 0 || clasecontainer.length == 0) ? false : true;
        this.formulario.controls.value.updateValueAndValidity();
    };
    Object.defineProperty(CplxAutocompleteComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.formulario.controls.value.setValue(v);
                this.formulario.controls.value.updateValueAndValidity();
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    CplxAutocompleteComponent.prototype.writeValue = function (value) {
        this._value = value;
        this.formulario.controls.value.setValue(value);
        this.formulario.controls.value.updateValueAndValidity();
        this.onChange(value);
    };
    CplxAutocompleteComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    CplxAutocompleteComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    __decorate$1([
        Input(),
        __metadata$1("design:type", Array)
    ], CplxAutocompleteComponent.prototype, "params", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Array)
    ], CplxAutocompleteComponent.prototype, "data", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", String)
    ], CplxAutocompleteComponent.prototype, "placeholder", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Boolean)
    ], CplxAutocompleteComponent.prototype, "filter", void 0);
    __decorate$1([
        Output(),
        __metadata$1("design:type", Object)
    ], CplxAutocompleteComponent.prototype, "selectedObject", void 0);
    __decorate$1([
        Output(),
        __metadata$1("design:type", Object)
    ], CplxAutocompleteComponent.prototype, "textChange", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Object)
    ], CplxAutocompleteComponent.prototype, "timeout", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Object)
    ], CplxAutocompleteComponent.prototype, "minlength", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Object)
    ], CplxAutocompleteComponent.prototype, "loading", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Boolean)
    ], CplxAutocompleteComponent.prototype, "disabled", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Object)
    ], CplxAutocompleteComponent.prototype, "reflectparam", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Object)
    ], CplxAutocompleteComponent.prototype, "reflectvalue", void 0);
    __decorate$1([
        Input(),
        __metadata$1("design:type", Object)
    ], CplxAutocompleteComponent.prototype, "required", void 0);
    __decorate$1([
        ViewChild('inputSearch', { static: true }),
        __metadata$1("design:type", ElementRef)
    ], CplxAutocompleteComponent.prototype, "inputSearch", void 0);
    __decorate$1([
        HostListener('window:click', ['$event.target']),
        __metadata$1("design:type", Function),
        __metadata$1("design:paramtypes", [Object]),
        __metadata$1("design:returntype", void 0)
    ], CplxAutocompleteComponent.prototype, "onClick", null);
    CplxAutocompleteComponent = __decorate$1([
        Component({
            selector: 'cplx-autocomplete',
            template: "<div [formGroup]=\"formulario\" class=\"search selection dropdown {{visible ? 'active': ''}} box-search\"\r\n\t[style.cursor]=\"disabled ? 'not-allowed' : 'default'\">\r\n\t<input #inputSearch class=\"form-control form-control-sm form-control-search search {{idcontainer}}\"\r\n\t\t(change)=\"selectedObject.emit(null)\" autocomplete=\"off\" formControlName=\"value\" [placeholder]=\"placeholder\"\r\n\t\t[ngClass]=\"{'disabled': disabled}\">\r\n\t<div class=\"menu transition {{visible ? 'visible': 'hidden'}}\" *ngIf=\"!disabled\">\r\n\t\t<ng-container *ngIf=\"loading && !filter; else templateName\">\r\n\t\t\t<div class=\"item\">Buscando ...</div>\r\n\t\t</ng-container>\r\n\t\t<ng-template #templateName>\r\n\t\t\t<div *ngFor=\"let li of filter ? (data | filter : inputSearch.value : visible : params) : data\" class=\"item\"\r\n\t\t\t\t(click)=\"select(li)\"> {{li[search]}}\r\n\t\t\t</div>\r\n\t\t</ng-template>\r\n\t</div>\r\n</div>\r\n<!--input #inputSearch class=\"form-control form-control-sm\" [(ngModel)]=\"value\" [placeholder]=\"placeholder\"\r\n\t(change)=\"selectedObject.emit(null)\" [ngClass]=\"{'disabled': disabled}\" list=\"browsers\" autocomplete=\"off\">\r\n<ng-container *ngIf=\"loading && !filter; else templateName\">\r\n\t<datalist id=\"browsers\">\r\n\t\t<option> Cargando ...</option>\r\n\t</datalist>\r\n</ng-container>\r\n<ng-template #templateName>\r\n\t<datalist id=\"browsers\">\r\n\t\t<option *ngFor=\"let li of filter ? (data | filter : value : visible : params) : data\"\r\n\t\t\t(click)=\"selectedObject.emit(li)\" [value]=\"li[search]\"> {{li[search]}}</option>\r\n\t</datalist>\r\n</ng-template-->\r\n",
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
            styles: [".disabled{pointer-events:none!important;cursor:not-allowed!important;background-color:#e9ecef!important;opacity:1!important}.search.dropdown .menu{overflow-x:hidden;overflow-y:auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-overflow-scrolling:touch;max-height:14rem}.selection.dropdown .menu{overflow-x:hidden;overflow-y:auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-overflow-scrolling:touch;border-top-width:0!important;width:auto;outline:0;margin:0 -1px;min-width:calc(100% + 2px);width:calc(100% + 2px);border-radius:0 0 .28571429rem .28571429rem;box-shadow:0 2px 3px 0 rgba(34,36,38,.15);transition:opacity .1s}.dropdown .menu>.item:hover{background:rgba(0,0,0,.05);color:rgba(0,0,0,.95);z-index:13}.selection.dropdown .menu>.item{border-top:1px solid #fafafa;padding:.58571429rem 1.14285714rem!important;white-space:normal;word-wrap:normal}.dropdown .menu>.item{position:relative;cursor:pointer;display:block;border:none;height:auto;text-align:left;border-top:none;line-height:1em;color:rgba(0,0,0,.87);padding:.78571429rem 1.14285714rem!important;font-size:1rem;text-transform:none;font-weight:400;box-shadow:none;-webkit-touch-callout:none}.active.selection.dropdown{border-bottom-left-radius:0!important;border-bottom-right-radius:0!important}.selection.active.dropdown{border-color:#96c8da;box-shadow:0 2px 3px 0 rgba(34,36,38,.15)}.search.dropdown>input.search{border:none!important;box-shadow:none!important;cursor:text;top:0;left:1px;width:100%;outline:0;-webkit-tap-highlight-color:rgba(255,255,255,0)}.menu{border-color:#96c8da;box-shadow:0 2px 3px 0 rgba(34,36,38,.15)}.dropdown .menu{left:0;cursor:auto;position:absolute;display:none;outline:0;top:100%;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;margin:0;padding:0;background:#fff;font-size:1em;text-shadow:none;text-align:left;box-shadow:0 2px 3px 0 rgba(34,36,38,.15);border:1px solid rgba(34,36,38,.15);border-radius:.28571429rem;transition:opacity .1s;z-index:11;will-change:transform,opacity}.visible.transition{display:block!important;visibility:visible!important;transition:.7s}.transition{-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;animation-fill-mode:both;transition:.7s}.form-control-search{height:calc(1.5em + .5rem + 2px);padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem;border-bottom:0!important}.menu::-webkit-scrollbar{-webkit-appearance:none;width:10px;height:10px}.menu::-webkit-scrollbar-thumb{cursor:pointer;border-radius:5px;background:rgba(0,0,0,.25);-webkit-transition:color .2s;transition:color .2s}.menu::-webkit-scrollbar-track{background:rgba(0,0,0,.1);border-radius:0}::-moz-selection{background-color:#cce2ff;color:rgba(0,0,0,.87)}::selection{background-color:#cce2ff;color:rgba(0,0,0,.87)}.box-search{border-radius:.28571429rem!important;border:1px solid rgba(34,36,38,.15)!important}.box-search.ng-invalid.ng-touched{border-color:#dc3545!important}.box-search.ng-invalid.ng-touched:focus{border-color:#dc3545;box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}"]
        }),
        __metadata$1("design:paramtypes", [])
    ], CplxAutocompleteComponent);
    return CplxAutocompleteComponent;
}());

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CplxAutocompleteModule = /** @class */ (function () {
    function CplxAutocompleteModule() {
    }
    CplxAutocompleteModule = __decorate$2([
        NgModule({
            declarations: [CplxAutocompleteComponent, FilterPipe],
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
            exports: [CplxAutocompleteComponent, FilterPipe]
        })
    ], CplxAutocompleteModule);
    return CplxAutocompleteModule;
}());

/*
 * Public API Surface of cplx-autocomplete
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CplxAutocompleteComponent, CplxAutocompleteModule, CplxAutocompleteService, FilterPipe, ɵ0 };
//# sourceMappingURL=cplx-autocomplete.js.map