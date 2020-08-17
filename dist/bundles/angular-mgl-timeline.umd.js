(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-mgl-timeline', ['exports', '@angular/core', '@angular/animations', '@angular/common'], factory) :
    (global = global || self, factory(global['angular-mgl-timeline'] = {}, global.ng.core, global.ng.animations, global.ng.common));
}(this, (function (exports, core, animations, common) { 'use strict';

    var MglTimelineEntryHeaderComponent = /** @class */ (function () {
        function MglTimelineEntryHeaderComponent() {
        }
        return MglTimelineEntryHeaderComponent;
    }());
    MglTimelineEntryHeaderComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mgl-timeline-entry-header',
                    template: "<ng-content></ng-content>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["mgl-timeline-entry-header{display:block;overflow:hidden;padding:15px;position:relative;text-align:center}"]
                },] }
    ];

    var MglTimelineEntryDotComponent = /** @class */ (function () {
        function MglTimelineEntryDotComponent(animationBuilder, elementRef, renderer, changeDetectorRef, document) {
            this.animationBuilder = animationBuilder;
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.changeDetectorRef = changeDetectorRef;
            this.document = document;
            this._expanded = false;
            this._alternate = false;
            this._mobile = false;
            this._size = 50;
            this.animationDone = new core.EventEmitter();
            this.expandAnimationTiming = '200ms ease';
            this.collapseAnimationTiming = '100ms ease';
            this.clazz = 'primary';
        }
        Object.defineProperty(MglTimelineEntryDotComponent.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (size) {
                this._size = size;
                this.setStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MglTimelineEntryDotComponent.prototype, "alternate", {
            get: function () {
                return this._alternate;
            },
            set: function (alternate) {
                this._alternate = alternate;
                this.setStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MglTimelineEntryDotComponent.prototype, "mobile", {
            get: function () {
                return this._mobile;
            },
            set: function (mobile) {
                this._mobile = mobile;
                this.setStyle();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MglTimelineEntryDotComponent.prototype, "expanded", {
            get: function () {
                return this._expanded;
            },
            set: function (expanded) {
                var animate = this._expanded !== expanded;
                this._expanded = expanded;
                animate ? this.animate() : this.setStyle();
            },
            enumerable: false,
            configurable: true
        });
        MglTimelineEntryDotComponent.prototype.ngAfterViewInit = function () {
            this.initialStyle = this.document.defaultView.getComputedStyle(this.elementRef.nativeElement);
            this.setStyle();
            this.changeDetectorRef.detectChanges();
        };
        MglTimelineEntryDotComponent.prototype.getCollapsedStyle = function () {
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
        };
        MglTimelineEntryDotComponent.prototype.getTransitionStyle = function () {
            return Object.assign(Object.assign({}, this.getCollapsedStyle()), { left: '50%', opacity: 0.5, boxShadow: 'none' });
        };
        MglTimelineEntryDotComponent.prototype.getExpandedStyle = function () {
            return Object.assign(Object.assign({}, this.getTransitionStyle()), { left: '0', transform: 'translateX(0) translateY(-50%)', width: '100%', height: '100%', opacity: 1, borderRadius: 0 });
        };
        MglTimelineEntryDotComponent.prototype.animate = function () {
            var _this = this;
            this.destroyAnimation();
            if (this.expanded) {
                this.animation = this.animationBuilder
                    .build([
                    animations.style(this.getCollapsedStyle()),
                    animations.animate(this.expandAnimationTiming, animations.style(this.getTransitionStyle())),
                    animations.animate(this.expandAnimationTiming, animations.style(this.getExpandedStyle())),
                ])
                    .create(this.elementRef.nativeElement);
                this.animation.onDone(function () { return _this.animationDone.emit({ toState: 'expanded' }); });
                this.animation.play();
            }
            else {
                this.animationBuilder;
                this.animation = this.animationBuilder
                    .build([
                    animations.style(this.getExpandedStyle()),
                    animations.animate(this.collapseAnimationTiming, animations.style(this.getTransitionStyle())),
                    animations.animate(this.collapseAnimationTiming, animations.style(this.getCollapsedStyle())),
                ])
                    .create(this.elementRef.nativeElement);
                this.animation.onDone(function () { return _this.animationDone.emit({ toState: 'collapsed' }); });
                this.animation.play();
            }
        };
        MglTimelineEntryDotComponent.prototype.setStyle = function () {
            var _this = this;
            this.destroyAnimation();
            var baseStyle = this.expanded ? this.getExpandedStyle() : this.getCollapsedStyle();
            Object.keys(baseStyle).forEach(function (property) {
                _this.renderer.setStyle(_this.elementRef.nativeElement, property, baseStyle[property]);
            });
        };
        MglTimelineEntryDotComponent.prototype.destroyAnimation = function () {
            if (this.animation) {
                this.animation.destroy();
                delete this.animation;
            }
        };
        return MglTimelineEntryDotComponent;
    }());
    MglTimelineEntryDotComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mgl-timeline-entry-dot',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["mgl-timeline-entry-dot{display:block;position:absolute}"]
                },] }
    ];
    MglTimelineEntryDotComponent.ctorParameters = function () { return [
        { type: animations.AnimationBuilder },
        { type: core.ElementRef },
        { type: core.Renderer2 },
        { type: core.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    MglTimelineEntryDotComponent.propDecorators = {
        expandAnimationTiming: [{ type: core.Input }],
        collapseAnimationTiming: [{ type: core.Input }],
        clazz: [{ type: core.Input, args: ['class',] }, { type: core.HostBinding, args: ['class',] }],
        size: [{ type: core.Input }]
    };

    var MglTimelineEntryContentComponent = /** @class */ (function () {
        function MglTimelineEntryContentComponent(elementRef, animationBuilder, renderer) {
            this.elementRef = elementRef;
            this.animationBuilder = animationBuilder;
            this.renderer = renderer;
            this.expandAnimationTiming = '200ms ease';
            this.collapseAnimationTiming = '100ms ease';
            this.animationDone = new core.EventEmitter();
            this._expanded = false;
        }
        Object.defineProperty(MglTimelineEntryContentComponent.prototype, "expanded", {
            get: function () {
                return this._expanded;
            },
            set: function (expanded) {
                this.contentHeight = this.elementRef.nativeElement.scrollHeight;
                var animate = this._expanded !== expanded;
                this._expanded = expanded;
                animate ? this.animate() : this.setStyle;
            },
            enumerable: false,
            configurable: true
        });
        MglTimelineEntryContentComponent.prototype.ngAfterViewInit = function () {
            this.contentHeight = this.elementRef.nativeElement.scrollHeight;
            this.setStyle();
        };
        MglTimelineEntryContentComponent.prototype.getCollapsedStyle = function () {
            return {
                height: '0px'
            };
        };
        MglTimelineEntryContentComponent.prototype.getExpandedStyle = function () {
            return {
                height: this.contentHeight + 'px'
            };
        };
        MglTimelineEntryContentComponent.prototype.animate = function () {
            var _this = this;
            if (this.expanded) {
                var animation = this.animationBuilder
                    .build([
                    animations.style(this.getCollapsedStyle()),
                    animations.animate(this.expandAnimationTiming, animations.style(this.getExpandedStyle())),
                ])
                    .create(this.elementRef.nativeElement);
                animation.onDone(function () { return _this.animationDone.emit({ toState: 'expanded' }); });
                animation.play();
            }
            else {
                this.animationBuilder;
                var animation = this.animationBuilder
                    .build([
                    animations.style(this.getExpandedStyle()),
                    animations.animate(this.collapseAnimationTiming, animations.style(this.getCollapsedStyle())),
                ])
                    .create(this.elementRef.nativeElement);
                animation.onDone(function () { return _this.animationDone.emit({ toState: 'collapsed' }); });
                animation.play();
            }
        };
        MglTimelineEntryContentComponent.prototype.setStyle = function () {
            var _this = this;
            var baseStyle = this.expanded ? this.getExpandedStyle() : this.getCollapsedStyle();
            Object.keys(baseStyle).forEach(function (property) {
                _this.renderer.setStyle(_this.elementRef.nativeElement, property, baseStyle[property]);
            });
        };
        return MglTimelineEntryContentComponent;
    }());
    MglTimelineEntryContentComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mgl-timeline-entry-content',
                    template: "<div><ng-content></ng-content></div>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["mgl-timeline-entry-content{display:block;overflow:hidden;position:relative}mgl-timeline-entry-content>div{padding:10px}"]
                },] }
    ];
    MglTimelineEntryContentComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: animations.AnimationBuilder },
        { type: core.Renderer2 }
    ]; };
    MglTimelineEntryContentComponent.propDecorators = {
        expandAnimationTiming: [{ type: core.Input }],
        collapseAnimationTiming: [{ type: core.Input }]
    };

    var MglTimelineEntrySideComponent = /** @class */ (function () {
        function MglTimelineEntrySideComponent(elementRef) {
            this.elementRef = elementRef;
        }
        Object.defineProperty(MglTimelineEntrySideComponent.prototype, "alternate", {
            set: function (value) {
                this.elementRef.nativeElement.classList.toggle('alternate', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MglTimelineEntrySideComponent.prototype, "mobile", {
            set: function (value) {
                this.elementRef.nativeElement.classList.toggle('mobile', value);
            },
            enumerable: false,
            configurable: true
        });
        return MglTimelineEntrySideComponent;
    }());
    MglTimelineEntrySideComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mgl-timeline-entry-side',
                    template: "<ng-content></ng-content>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["mgl-timeline-entry-side{left:100%;position:absolute;text-align:center;top:0;width:100%}mgl-timeline-entry-side.alternate{left:-100%}mgl-timeline-entry-side.mobile{display:none}"]
                },] }
    ];
    MglTimelineEntrySideComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };

    var MglTimelineEntryComponent = /** @class */ (function () {
        function MglTimelineEntryComponent(elementRef) {
            this.elementRef = elementRef;
            this.subscriptions = [];
            this.focusOnOpen = false;
            this._mobile = false;
            this.changed = new core.EventEmitter();
            this.animationDone = new core.EventEmitter();
        }
        Object.defineProperty(MglTimelineEntryComponent.prototype, "expanded", {
            get: function () {
                return this.dot ? (this.dot.expanded && this.content.expanded) : this.content.expanded;
            },
            set: function (expanded) {
                if (this.dot && expanded) {
                    this.dot.expanded = expanded;
                }
                else {
                    this.content.expanded = expanded;
                }
                this.changed.emit(expanded);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MglTimelineEntryComponent.prototype, "mobile", {
            set: function (value) {
                this.elementRef.nativeElement.classList.toggle('mobile', value);
                if (this.dot) {
                    this.dot.mobile = value;
                }
                if (this.side) {
                    this.side.mobile = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        MglTimelineEntryComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.dot) {
                this.subscriptions.push(this.dot.animationDone.subscribe(function (event) {
                    if (event.toState === 'expanded') {
                        _this.content.expanded = true;
                    }
                    else {
                        _this.animationDone.emit(event);
                    }
                }));
            }
            if (this.content) {
                this.subscriptions.push(this.content.animationDone.subscribe(function (event) {
                    if (_this.dot && event.toState === 'collapsed') {
                        _this.dot.expanded = false;
                    }
                    else {
                        if (_this.focusOnOpen) {
                            _this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
                        }
                        _this.animationDone.emit(event);
                    }
                }));
            }
        };
        Object.defineProperty(MglTimelineEntryComponent.prototype, "alternate", {
            set: function (value) {
                this.elementRef.nativeElement.classList.toggle('alternate', value);
                if (this.dot) {
                    this.dot.alternate = value;
                }
                if (this.side) {
                    this.side.alternate = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        MglTimelineEntryComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        };
        MglTimelineEntryComponent.prototype.collapse = function () {
            this.expanded = false;
        };
        MglTimelineEntryComponent.prototype.expand = function () {
            this.expanded = true;
        };
        MglTimelineEntryComponent.prototype.toggle = function (event) {
            var headerFound = this.containsInPath(event, 'mgl-timeline-entry-header');
            var dotFound = this.containsInPath(event, 'mgl-timeline-entry-dot');
            if (headerFound || dotFound) {
                this.expanded = !this.expanded;
            }
        };
        MglTimelineEntryComponent.prototype.containsInPath = function (mouseEvent, name) {
            var currentElem = mouseEvent.target;
            while (currentElem) {
                if (currentElem.localName === name) {
                    return true;
                }
                currentElem = currentElem.parentElement;
            }
            return false;
        };
        return MglTimelineEntryComponent;
    }());
    MglTimelineEntryComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mgl-timeline-entry',
                    template: "<ng-content select=\"mgl-timeline-entry-side\"></ng-content>\n<div class=\"mgl-timeline-entry-card\">\n  <div class=\"mgl-timeline-entry-card-header\" (click)=\"toggle($event)\">\n    <ng-content select=\"mgl-timeline-entry-dot\"></ng-content>\n    <ng-content select=\"mgl-timeline-entry-header\"></ng-content>\n  </div>\n  <ng-content select=\"mgl-timeline-entry-content\"></ng-content>\n</div>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["mgl-timeline-entry{display:block;margin-bottom:50px;position:relative;width:calc(50% - 5px)}mgl-timeline-entry.alternate{margin-left:calc(50% + 5px)}mgl-timeline-entry.mobile{margin-left:30px;width:calc(100% - 30px)}mgl-timeline-entry .mgl-timeline-entry-card{background-color:#f0f0f0}mgl-timeline-entry .mgl-timeline-entry-card .mgl-timeline-entry-card-header{background-color:#e6e6e6;position:relative}"]
                },] }
    ];
    MglTimelineEntryComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    MglTimelineEntryComponent.propDecorators = {
        expanded: [{ type: core.HostBinding, args: ['class.expanded',] }],
        changed: [{ type: core.Output, args: ['expand',] }],
        animationDone: [{ type: core.Output }],
        content: [{ type: core.ContentChild, args: [MglTimelineEntryContentComponent,] }],
        header: [{ type: core.ContentChild, args: [MglTimelineEntryHeaderComponent,] }],
        dot: [{ type: core.ContentChild, args: [MglTimelineEntryDotComponent,] }],
        side: [{ type: core.ContentChild, args: [MglTimelineEntrySideComponent,] }]
    };

    var MglTimelineComponent = /** @class */ (function () {
        function MglTimelineComponent(elementRef, changeDetectorRef) {
            this.elementRef = elementRef;
            this.changeDetectorRef = changeDetectorRef;
            this.toggle = true;
            this.mobileWidthThreshold = 640;
            this.alternate = true;
            this.side = 'left';
            this._focusOnOpen = false;
            this.subscriptions = [];
        }
        Object.defineProperty(MglTimelineComponent.prototype, "mobile", {
            get: function () {
                return this.elementRef.nativeElement.classList.contains('mobile');
            },
            set: function (value) {
                this.content && this.content.forEach(function (entry) { return entry.mobile = value; });
                this.elementRef.nativeElement.classList.toggle('mobile', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MglTimelineComponent.prototype, "focusOnOpen", {
            get: function () {
                return this._focusOnOpen;
            },
            set: function (focusOnOpen) {
                this.content && this.content.forEach(function (entry) { return entry.focusOnOpen = focusOnOpen; });
                this._focusOnOpen = focusOnOpen;
            },
            enumerable: false,
            configurable: true
        });
        MglTimelineComponent.prototype.ngOnChanges = function (simpleChanges) {
            this.updateContent();
        };
        MglTimelineComponent.prototype.ngOnDestroy = function () {
            this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        };
        MglTimelineComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.mobile = this.elementRef.nativeElement.clientWidth < this.mobileWidthThreshold;
            setTimeout(function () { return _this.updateContent(); });
            this.content.changes.subscribe(function (changes) {
                _this.updateContent();
            });
        };
        MglTimelineComponent.prototype.updateContent = function () {
            var _this = this;
            this.ngOnDestroy();
            if (this.content) {
                this.content.forEach(function (entry, index) {
                    if (_this.toggle) {
                        _this.subscriptions.push(entry.changed.subscribe(function (state) {
                            if (state === true) {
                                _this.content.filter(function (e) { return e !== entry; }).forEach(function (e) { return e.collapse(); });
                            }
                        }));
                    }
                    entry.alternate = _this.alternate ? (index % 2 !== 0) : (_this.side === 'right');
                    entry.mobile = _this.mobile;
                    entry.focusOnOpen = _this.focusOnOpen;
                });
            }
        };
        MglTimelineComponent.prototype.onResize = function (ev) {
            this.mobile = this.elementRef.nativeElement.clientWidth < this.mobileWidthThreshold;
        };
        return MglTimelineComponent;
    }());
    MglTimelineComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'mgl-timeline',
                    template: "<div class=\"mgl-timeline-line\"></div>\n<ng-content></ng-content>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["mgl-timeline{display:block;padding:50px 0;position:relative}mgl-timeline .mgl-timeline-line{background-color:#a0a0a0;height:100%;left:50%;position:absolute;top:0;transform:translateX(-50%);width:10px}mgl-timeline.mobile .mgl-timeline-line{left:20px;transform:none}"]
                },] }
    ];
    MglTimelineComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    MglTimelineComponent.propDecorators = {
        toggle: [{ type: core.Input }],
        mobileWidthThreshold: [{ type: core.Input }],
        alternate: [{ type: core.Input }],
        side: [{ type: core.Input }],
        focusOnOpen: [{ type: core.Input }],
        content: [{ type: core.ContentChildren, args: [MglTimelineEntryComponent,] }],
        onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
    };

    var MglTimelineModule = /** @class */ (function () {
        function MglTimelineModule() {
        }
        return MglTimelineModule;
    }());
    MglTimelineModule.decorators = [
        { type: core.NgModule, args: [{
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

    exports.MglTimelineModule = MglTimelineModule;
    exports.ɵa = MglTimelineComponent;
    exports.ɵb = MglTimelineEntryComponent;
    exports.ɵc = MglTimelineEntryContentComponent;
    exports.ɵd = MglTimelineEntryHeaderComponent;
    exports.ɵe = MglTimelineEntryDotComponent;
    exports.ɵf = MglTimelineEntrySideComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-mgl-timeline.umd.js.map
