import { Component, ViewEncapsulation, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef, Inject, Input, HostBinding, Output, ContentChild, ContentChildren, HostListener, NgModule } from '@angular/core';
import { style, animate, AnimationBuilder } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

class MglTimelineEntryHeaderComponent {
}
MglTimelineEntryHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-header',
                template: "<ng-content></ng-content>",
                encapsulation: ViewEncapsulation.None,
                styles: ["mgl-timeline-entry-header{display:block;overflow:hidden;padding:15px;position:relative;text-align:center}"]
            },] }
];

class MglTimelineEntryDotComponent {
    constructor(animationBuilder, elementRef, renderer, changeDetectorRef, document) {
        this.animationBuilder = animationBuilder;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.document = document;
        this._expanded = false;
        this._alternate = false;
        this._mobile = false;
        this._size = 50;
        this.animationDone = new EventEmitter();
        this.expandAnimationTiming = '200ms ease';
        this.collapseAnimationTiming = '100ms ease';
        this.clazz = 'primary';
    }
    set size(size) {
        this._size = size;
        this.setStyle();
    }
    get size() {
        return this._size;
    }
    set alternate(alternate) {
        this._alternate = alternate;
        this.setStyle();
    }
    get alternate() {
        return this._alternate;
    }
    set mobile(mobile) {
        this._mobile = mobile;
        this.setStyle();
    }
    get mobile() {
        return this._mobile;
    }
    set expanded(expanded) {
        const animate = this._expanded !== expanded;
        this._expanded = expanded;
        animate ? this.animate() : this.setStyle();
    }
    get expanded() {
        return this._expanded;
    }
    ngAfterViewInit() {
        this.initialStyle = this.document.defaultView.getComputedStyle(this.elementRef.nativeElement);
        this.setStyle();
        this.changeDetectorRef.detectChanges();
    }
    getCollapsedStyle() {
        return {
            top: '50%',
            left: (this.alternate || this.mobile) ? '-5px' : 'calc(100% + 5px)',
            width: this.size + 'px',
            height: this.size + 'px',
            opacity: 1,
            transform: 'translateY(-50%) translateX(-50%)',
            boxShadow: this.initialStyle && this.initialStyle.boxShadow,
            borderRadius: '100px'
        };
    }
    getTransitionStyle() {
        return Object.assign(Object.assign({}, this.getCollapsedStyle()), { left: '50%', opacity: 0.5, boxShadow: 'none' });
    }
    getExpandedStyle() {
        return Object.assign(Object.assign({}, this.getTransitionStyle()), { left: '0', transform: 'translateX(0) translateY(-50%)', width: '100%', height: '100%', opacity: 1, borderRadius: 0 });
    }
    animate() {
        this.destroyAnimation();
        if (this.expanded) {
            this.animation = this.animationBuilder
                .build([
                style(this.getCollapsedStyle()),
                animate(this.expandAnimationTiming, style(this.getTransitionStyle())),
                animate(this.expandAnimationTiming, style(this.getExpandedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            this.animation.onDone(() => this.animationDone.emit({ toState: 'expanded' }));
            this.animation.play();
        }
        else {
            this.animationBuilder;
            this.animation = this.animationBuilder
                .build([
                style(this.getExpandedStyle()),
                animate(this.collapseAnimationTiming, style(this.getTransitionStyle())),
                animate(this.collapseAnimationTiming, style(this.getCollapsedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            this.animation.onDone(() => this.animationDone.emit({ toState: 'collapsed' }));
            this.animation.play();
        }
    }
    setStyle() {
        this.destroyAnimation();
        const baseStyle = this.expanded ? this.getExpandedStyle() : this.getCollapsedStyle();
        Object.keys(baseStyle).forEach(property => {
            this.renderer.setStyle(this.elementRef.nativeElement, property, baseStyle[property]);
        });
    }
    destroyAnimation() {
        if (this.animation) {
            this.animation.destroy();
            delete this.animation;
        }
    }
}
MglTimelineEntryDotComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-dot',
                template: "<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["mgl-timeline-entry-dot{display:block;position:absolute}"]
            },] }
];
MglTimelineEntryDotComponent.ctorParameters = () => [
    { type: AnimationBuilder },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MglTimelineEntryDotComponent.propDecorators = {
    expandAnimationTiming: [{ type: Input }],
    collapseAnimationTiming: [{ type: Input }],
    clazz: [{ type: Input, args: ['class',] }, { type: HostBinding, args: ['class',] }],
    size: [{ type: Input }]
};

class MglTimelineEntryContentComponent {
    constructor(elementRef, animationBuilder, renderer) {
        this.elementRef = elementRef;
        this.animationBuilder = animationBuilder;
        this.renderer = renderer;
        this.expandAnimationTiming = '200ms ease';
        this.collapseAnimationTiming = '100ms ease';
        this.animationDone = new EventEmitter();
        this._expanded = false;
    }
    set expanded(expanded) {
        this.contentHeight = this.elementRef.nativeElement.scrollHeight;
        const animate = this._expanded !== expanded;
        this._expanded = expanded;
        animate ? this.animate() : this.setStyle;
    }
    get expanded() {
        return this._expanded;
    }
    ngAfterViewInit() {
        this.contentHeight = this.elementRef.nativeElement.scrollHeight;
        this.setStyle();
    }
    getCollapsedStyle() {
        return {
            height: '0px'
        };
    }
    getExpandedStyle() {
        return {
            height: this.contentHeight + 'px'
        };
    }
    animate() {
        if (this.expanded) {
            const animation = this.animationBuilder
                .build([
                style(this.getCollapsedStyle()),
                animate(this.expandAnimationTiming, style(this.getExpandedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            animation.onDone(() => this.animationDone.emit({ toState: 'expanded' }));
            animation.play();
        }
        else {
            this.animationBuilder;
            const animation = this.animationBuilder
                .build([
                style(this.getExpandedStyle()),
                animate(this.collapseAnimationTiming, style(this.getCollapsedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            animation.onDone(() => this.animationDone.emit({ toState: 'collapsed' }));
            animation.play();
        }
    }
    setStyle() {
        const baseStyle = this.expanded ? this.getExpandedStyle() : this.getCollapsedStyle();
        Object.keys(baseStyle).forEach(property => {
            this.renderer.setStyle(this.elementRef.nativeElement, property, baseStyle[property]);
        });
    }
}
MglTimelineEntryContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-content',
                template: "<div><ng-content></ng-content></div>",
                encapsulation: ViewEncapsulation.None,
                styles: ["mgl-timeline-entry-content{display:block;overflow:hidden;position:relative}mgl-timeline-entry-content>div{padding:10px}"]
            },] }
];
MglTimelineEntryContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: AnimationBuilder },
    { type: Renderer2 }
];
MglTimelineEntryContentComponent.propDecorators = {
    expandAnimationTiming: [{ type: Input }],
    collapseAnimationTiming: [{ type: Input }]
};

class MglTimelineEntrySideComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    set alternate(value) {
        this.elementRef.nativeElement.classList.toggle('alternate', value);
    }
    set mobile(value) {
        this.elementRef.nativeElement.classList.toggle('mobile', value);
    }
}
MglTimelineEntrySideComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-side',
                template: "<ng-content></ng-content>",
                encapsulation: ViewEncapsulation.None,
                styles: ["mgl-timeline-entry-side{left:100%;position:absolute;text-align:center;top:0;width:100%}mgl-timeline-entry-side.alternate{left:-100%}mgl-timeline-entry-side.mobile{display:none}"]
            },] }
];
MglTimelineEntrySideComponent.ctorParameters = () => [
    { type: ElementRef }
];

class MglTimelineEntryComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.subscriptions = [];
        this.focusOnOpen = false;
        this._mobile = false;
        this.changed = new EventEmitter();
        this.animationDone = new EventEmitter();
    }
    set expanded(expanded) {
        if (this.dot && expanded) {
            this.dot.expanded = expanded;
        }
        else {
            this.content.expanded = expanded;
        }
        this.changed.emit(expanded);
    }
    get expanded() {
        return this.dot ? (this.dot.expanded && this.content.expanded) : this.content.expanded;
    }
    set mobile(value) {
        this.elementRef.nativeElement.classList.toggle('mobile', value);
        if (this.dot) {
            this.dot.mobile = value;
        }
        if (this.side) {
            this.side.mobile = value;
        }
    }
    ngAfterViewInit() {
        if (this.dot) {
            this.subscriptions.push(this.dot.animationDone.subscribe(event => {
                if (event.toState === 'expanded') {
                    this.content.expanded = true;
                }
                else {
                    this.animationDone.emit(event);
                }
            }));
        }
        if (this.content) {
            this.subscriptions.push(this.content.animationDone.subscribe(event => {
                if (this.dot && event.toState === 'collapsed') {
                    this.dot.expanded = false;
                }
                else {
                    if (this.focusOnOpen) {
                        this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    this.animationDone.emit(event);
                }
            }));
        }
    }
    set alternate(value) {
        this.elementRef.nativeElement.classList.toggle('alternate', value);
        if (this.dot) {
            this.dot.alternate = value;
        }
        if (this.side) {
            this.side.alternate = value;
        }
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    collapse() {
        this.expanded = false;
    }
    expand() {
        this.expanded = true;
    }
    toggle(event) {
        const headerFound = this.containsInPath(event, 'mgl-timeline-entry-header');
        const dotFound = this.containsInPath(event, 'mgl-timeline-entry-dot');
        if (headerFound || dotFound) {
            this.expanded = !this.expanded;
        }
    }
    containsInPath(mouseEvent, name) {
        let currentElem = mouseEvent.target;
        while (currentElem) {
            if (currentElem.localName === name) {
                return true;
            }
            currentElem = currentElem.parentElement;
        }
        return false;
    }
}
MglTimelineEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry',
                template: "<ng-content select=\"mgl-timeline-entry-side\"></ng-content>\n<div class=\"mgl-timeline-entry-card\">\n  <div class=\"mgl-timeline-entry-card-header\" (click)=\"toggle($event)\">\n    <ng-content select=\"mgl-timeline-entry-dot\"></ng-content>\n    <ng-content select=\"mgl-timeline-entry-header\"></ng-content>\n  </div>\n  <ng-content select=\"mgl-timeline-entry-content\"></ng-content>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: ["mgl-timeline-entry{display:block;margin-bottom:50px;position:relative;width:calc(50% - 5px)}mgl-timeline-entry.alternate{margin-left:calc(50% + 5px)}mgl-timeline-entry.mobile{margin-left:30px;width:calc(100% - 30px)}mgl-timeline-entry .mgl-timeline-entry-card{background-color:#f0f0f0}mgl-timeline-entry .mgl-timeline-entry-card .mgl-timeline-entry-card-header{background-color:#e6e6e6;position:relative}"]
            },] }
];
MglTimelineEntryComponent.ctorParameters = () => [
    { type: ElementRef }
];
MglTimelineEntryComponent.propDecorators = {
    expanded: [{ type: HostBinding, args: ['class.expanded',] }],
    changed: [{ type: Output, args: ['expand',] }],
    animationDone: [{ type: Output }],
    content: [{ type: ContentChild, args: [MglTimelineEntryContentComponent,] }],
    header: [{ type: ContentChild, args: [MglTimelineEntryHeaderComponent,] }],
    dot: [{ type: ContentChild, args: [MglTimelineEntryDotComponent,] }],
    side: [{ type: ContentChild, args: [MglTimelineEntrySideComponent,] }]
};

class MglTimelineComponent {
    constructor(elementRef, changeDetectorRef) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.toggle = true;
        this.mobileWidthThreshold = 640;
        this.alternate = true;
        this.side = 'left';
        this._focusOnOpen = false;
        this.subscriptions = [];
    }
    set mobile(value) {
        this.content && this.content.forEach(entry => entry.mobile = value);
        this.elementRef.nativeElement.classList.toggle('mobile', value);
    }
    get mobile() {
        return this.elementRef.nativeElement.classList.contains('mobile');
    }
    set focusOnOpen(focusOnOpen) {
        this.content && this.content.forEach(entry => entry.focusOnOpen = focusOnOpen);
        this._focusOnOpen = focusOnOpen;
    }
    get focusOnOpen() {
        return this._focusOnOpen;
    }
    ngOnChanges(simpleChanges) {
        this.updateContent();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    ngAfterViewInit() {
        this.mobile = this.elementRef.nativeElement.clientWidth < this.mobileWidthThreshold;
        setTimeout(() => this.updateContent());
        this.content.changes.subscribe(changes => {
            this.updateContent();
        });
    }
    updateContent() {
        this.ngOnDestroy();
        if (this.content) {
            this.content.forEach((entry, index) => {
                if (this.toggle) {
                    this.subscriptions.push(entry.changed.subscribe(state => {
                        if (state === true) {
                            this.content.filter(e => e !== entry).forEach(e => e.collapse());
                        }
                    }));
                }
                entry.alternate = this.alternate ? (index % 2 !== 0) : (this.side === 'right');
                entry.mobile = this.mobile;
                entry.focusOnOpen = this.focusOnOpen;
            });
        }
    }
    onResize(ev) {
        this.mobile = this.elementRef.nativeElement.clientWidth < this.mobileWidthThreshold;
    }
}
MglTimelineComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline',
                template: "<div class=\"mgl-timeline-line\"></div>\n<ng-content></ng-content>",
                encapsulation: ViewEncapsulation.None,
                styles: ["mgl-timeline{display:block;padding:50px 0;position:relative}mgl-timeline .mgl-timeline-line{background-color:#a0a0a0;height:100%;left:50%;position:absolute;top:0;transform:translateX(-50%);width:10px}mgl-timeline.mobile .mgl-timeline-line{left:20px;transform:none}"]
            },] }
];
MglTimelineComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
MglTimelineComponent.propDecorators = {
    toggle: [{ type: Input }],
    mobileWidthThreshold: [{ type: Input }],
    alternate: [{ type: Input }],
    side: [{ type: Input }],
    focusOnOpen: [{ type: Input }],
    content: [{ type: ContentChildren, args: [MglTimelineEntryComponent,] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};

class MglTimelineModule {
}
MglTimelineModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MglTimelineComponent,
                    MglTimelineEntryComponent,
                    MglTimelineEntryHeaderComponent,
                    MglTimelineEntrySideComponent,
                    MglTimelineEntryContentComponent,
                    MglTimelineEntryDotComponent
                ],
                exports: [
                    MglTimelineComponent,
                    MglTimelineEntryComponent,
                    MglTimelineEntryHeaderComponent,
                    MglTimelineEntrySideComponent,
                    MglTimelineEntryContentComponent,
                    MglTimelineEntryDotComponent
                ]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { MglTimelineModule, MglTimelineComponent as ɵa, MglTimelineEntryComponent as ɵb, MglTimelineEntryContentComponent as ɵc, MglTimelineEntryHeaderComponent as ɵd, MglTimelineEntryDotComponent as ɵe, MglTimelineEntrySideComponent as ɵf };
//# sourceMappingURL=angular-mgl-timeline.js.map
