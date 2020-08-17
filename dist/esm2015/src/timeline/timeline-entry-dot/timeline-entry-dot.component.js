import { Component, Input, HostBinding, ElementRef, EventEmitter, Renderer2, ChangeDetectorRef, Inject, ViewEncapsulation } from '@angular/core';
import { AnimationBuilder, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
export class MglTimelineEntryDotComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtZW50cnktZG90LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90aW1lbGluZS90aW1lbGluZS1lbnRyeS1kb3QvdGltZWxpbmUtZW50cnktZG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFDeEMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFDdkUsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFRM0MsTUFBTSxPQUFPLDRCQUE0QjtJQTREdkMsWUFBb0IsZ0JBQWtDLEVBQVUsVUFBc0IsRUFDOUUsUUFBbUIsRUFBVSxpQkFBb0MsRUFDL0MsUUFBUTtRQUZkLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQzlFLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQy9DLGFBQVEsR0FBUixRQUFRLENBQUE7UUE1RDFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHM0Isa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBR3hDLDBCQUFxQixHQUFHLFlBQVksQ0FBQztRQUdyQyw0QkFBdUIsR0FBRyxZQUFZLENBQUM7UUFLdkMsVUFBSyxHQUFHLFNBQVMsQ0FBQztJQTBDb0IsQ0FBQztJQXhDdkMsSUFDSSxJQUFJ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Q3ZCO0lBQ0gsQ0FBQztJQUVPLFFBQVE7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQ3RGLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7WUF0SkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHVDQUFrRDtnQkFFbEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUFSUSxnQkFBZ0I7WUFIUSxVQUFVO1lBQzFCLFNBQVM7WUFBRSxpQkFBaUI7NENBeUUxQyxNQUFNLFNBQUMsUUFBUTs7O29DQW5EZixLQUFLO3NDQUdMLEtBQUs7b0JBSUwsS0FBSyxTQUFDLE9BQU8sY0FDYixXQUFXLFNBQUMsT0FBTzttQkFHbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIEhvc3RCaW5kaW5nLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCxcbiAgQWZ0ZXJWaWV3SW5pdCwgUmVuZGVyZXIyLCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0LCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFuaW1hdGlvbkJ1aWxkZXIsIHN0eWxlLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC10aW1lbGluZS1lbnRyeS1kb3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUtZW50cnktZG90LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZWxpbmUtZW50cnktZG90LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWdsVGltZWxpbmVFbnRyeURvdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2FsdGVybmF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9tb2JpbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbml0aWFsU3R5bGU7XG4gIHByaXZhdGUgX3NpemU6IG51bWJlciA9IDUwO1xuICBwcml2YXRlIGFuaW1hdGlvbjtcblxuICBhbmltYXRpb25Eb25lID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQElucHV0KClcbiAgZXhwYW5kQW5pbWF0aW9uVGltaW5nID0gJzIwMG1zIGVhc2UnO1xuXG4gIEBJbnB1dCgpXG4gIGNvbGxhcHNlQW5pbWF0aW9uVGltaW5nID0gJzEwMG1zIGVhc2UnO1xuXG5cbiAgQElucHV0KCdjbGFzcycpXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBjbGF6eiA9ICdwcmltYXJ5JztcblxuICBASW5wdXQoKVxuICBzZXQgc2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zaXplID0gc2l6ZTtcbiAgICB0aGlzLnNldFN0eWxlKCk7XG4gIH1cblxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIHNldCBhbHRlcm5hdGUoYWx0ZXJuYXRlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYWx0ZXJuYXRlID0gYWx0ZXJuYXRlO1xuICAgIHRoaXMuc2V0U3R5bGUoKTtcbiAgfVxuXG4gIGdldCBhbHRlcm5hdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsdGVybmF0ZTtcbiAgfVxuXG4gIHNldCBtb2JpbGUobW9iaWxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9iaWxlID0gbW9iaWxlO1xuICAgIHRoaXMuc2V0U3R5bGUoKTtcbiAgfVxuXG4gIGdldCBtb2JpbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vYmlsZTtcbiAgfVxuXG4gIHNldCBleHBhbmRlZChleHBhbmRlZDogYm9vbGVhbikge1xuICAgIGNvbnN0IGFuaW1hdGUgPSB0aGlzLl9leHBhbmRlZCAhPT0gZXhwYW5kZWQ7XG4gICAgdGhpcy5fZXhwYW5kZWQgPSBleHBhbmRlZDtcbiAgICBhbmltYXRlID8gdGhpcy5hbmltYXRlKCkgOiB0aGlzLnNldFN0eWxlKClcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudCkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5pdGlhbFN0eWxlID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLnNldFN0eWxlKCk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbGxhcHNlZFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6ICc1MCUnLFxuICAgICAgbGVmdDogKHRoaXMuYWx0ZXJuYXRlIHx8IHRoaXMubW9iaWxlKSA/ICctNXB4JyA6ICdjYWxjKDEwMCUgKyA1cHgpJyxcbiAgICAgIHdpZHRoOiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgaGVpZ2h0OiB0aGlzLnNpemUgKyAncHgnLFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSkgdHJhbnNsYXRlWCgtNTAlKScsXG4gICAgICBib3hTaGFkb3c6IHRoaXMuaW5pdGlhbFN0eWxlICYmIHRoaXMuaW5pdGlhbFN0eWxlLmJveFNoYWRvdyxcbiAgICAgIGJvcmRlclJhZGl1czogJzEwMHB4J1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJhbnNpdGlvblN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmdldENvbGxhcHNlZFN0eWxlKCksXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgIGJveFNoYWRvdzogJ25vbmUnXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFeHBhbmRlZFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmdldFRyYW5zaXRpb25TdHlsZSgpLFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSB0cmFuc2xhdGVZKC01MCUpJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBib3JkZXJSYWRpdXM6IDBcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGUoKSB7XG4gICAgdGhpcy5kZXN0cm95QW5pbWF0aW9uKCk7XG4gICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb25CdWlsZGVyXG4gICAgICAgIC5idWlsZChbXG4gICAgICAgICAgc3R5bGUodGhpcy5nZXRDb2xsYXBzZWRTdHlsZSgpKSxcbiAgICAgICAgICBhbmltYXRlKHRoaXMuZXhwYW5kQW5pbWF0aW9uVGltaW5nLCBzdHlsZSh0aGlzLmdldFRyYW5zaXRpb25TdHlsZSgpKSksXG4gICAgICAgICAgYW5pbWF0ZSh0aGlzLmV4cGFuZEFuaW1hdGlvblRpbWluZywgc3R5bGUodGhpcy5nZXRFeHBhbmRlZFN0eWxlKCkpKSxcbiAgICAgICAgXSlcbiAgICAgICAgLmNyZWF0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAgIHRoaXMuYW5pbWF0aW9uLm9uRG9uZSgoKSA9PiB0aGlzLmFuaW1hdGlvbkRvbmUuZW1pdCh7IHRvU3RhdGU6ICdleHBhbmRlZCcgfSkpO1xuICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uQnVpbGRlclxuICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbkJ1aWxkZXJcbiAgICAgICAgLmJ1aWxkKFtcbiAgICAgICAgICBzdHlsZSh0aGlzLmdldEV4cGFuZGVkU3R5bGUoKSksXG4gICAgICAgICAgYW5pbWF0ZSh0aGlzLmNvbGxhcHNlQW5pbWF0aW9uVGltaW5nLCBzdHlsZSh0aGlzLmdldFRyYW5zaXRpb25TdHlsZSgpKSksXG4gICAgICAgICAgYW5pbWF0ZSh0aGlzLmNvbGxhcHNlQW5pbWF0aW9uVGltaW5nLCBzdHlsZSh0aGlzLmdldENvbGxhcHNlZFN0eWxlKCkpKSxcbiAgICAgICAgXSlcbiAgICAgICAgLmNyZWF0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAgIHRoaXMuYW5pbWF0aW9uLm9uRG9uZSgoKSA9PiB0aGlzLmFuaW1hdGlvbkRvbmUuZW1pdCh7IHRvU3RhdGU6ICdjb2xsYXBzZWQnIH0pKTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFN0eWxlKCkge1xuICAgIHRoaXMuZGVzdHJveUFuaW1hdGlvbigpO1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IHRoaXMuZXhwYW5kZWQgPyB0aGlzLmdldEV4cGFuZGVkU3R5bGUoKSA6IHRoaXMuZ2V0Q29sbGFwc2VkU3R5bGUoKTtcbiAgICBPYmplY3Qua2V5cyhiYXNlU3R5bGUpLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcHJvcGVydHksIGJhc2VTdHlsZVtwcm9wZXJ0eV0pXG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveUFuaW1hdGlvbigpIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLmRlc3Ryb3koKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmFuaW1hdGlvbjtcbiAgICB9XG4gIH1cblxufVxuIl19