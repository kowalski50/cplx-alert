import { OnInit, PipeTransform, EventEmitter, ElementRef, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import { ControlValueAccessor, AbstractControl, NgControl } from '@angular/forms';
export declare class RequiredDirective implements OnInit {
    private ngControl;
    renderer: Renderer2;
    elementRef: ElementRef;
    hasRequiredField(abstractControl: AbstractControl): boolean;
    ngOnInit(): void;
    constructor(ngControl: NgControl, renderer: Renderer2, elementRef: ElementRef);
}
export declare class ReadOnlyDirective implements OnInit {
    private ngControl;
    renderer: Renderer2;
    elementRef: ElementRef;
    hasRequiredField(abstractControl: AbstractControl): boolean;
    ngOnInit(): void;
    constructor(ngControl: NgControl, renderer: Renderer2, elementRef: ElementRef);
}
export declare class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, visible: boolean, params?: string[]): any;
    matchValue(data: any[], value: string): boolean;
    matchValueParams(data: any[], value: string, params: string[]): boolean;
}
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class CplxAutocompleteComponent implements OnInit, OnChanges, ControlValueAccessor {
    constructor();
    visible: boolean;
    idcontainer: string;
    params: string[];
    data: any[];
    placeholder: string;
    filter: boolean;
    selectedObject: EventEmitter<any>;
    textChange: EventEmitter<String>;
    timeout: number;
    minlength: number;
    loading: boolean;
    isdisabled: boolean;
    reflectparam: any;
    reflectvalue: any;
    isrequired: boolean;
    search: string;
    inputSearch: ElementRef;
    ngOnInit(): void;
    select(object: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    completar(): void;
    onClick(targetElement: any): void;
    private _value;
    get value(): any;
    set value(v: any);
    writeValue(value: any): void;
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
}
