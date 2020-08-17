import { AnimationBuilder, style, animate } from '@angular/animations';
import { Component, EventEmitter, ElementRef, Renderer2, ViewEncapsulation, Input } from '@angular/core';
export class MglTimelineEntryContentComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtZW50cnktY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdGltZWxpbmUvdGltZWxpbmUtZW50cnktY29udGVudC90aW1lbGluZS1lbnRyeS1jb250ZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBaUIsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF4SCxNQUFNLE9BQU8sZ0NBQWdDO0lBd0IzQyxZQUFvQixVQUFzQixFQUFVLGdCQUFrQyxFQUFVLFFBQW1CO1FBQS9GLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXJCbkgsMEJBQXFCLEdBQUcsWUFBWSxDQUFDO1FBR3JDLDRCQUF1QixHQUFHLFlBQVksQ0FBQztRQUd2QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFaEMsY0FBUyxHQUFZLEtBQUssQ0FBQztJQWFvRixDQUFDO0lBWHhILElBQUksUUFBUSxDQUFDLFFBQWlCO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1FBQ2hFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQzFDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUlELGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUNoRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixPQUFPO1lBQ0wsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFBO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSTtTQUNsQyxDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjtpQkFDcEMsS0FBSyxDQUFDO2dCQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQzthQUNwRSxDQUFDO2lCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ3hDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUVsQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFBO1lBQ3JCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0I7aUJBQ3BDLEtBQUssQ0FBQztnQkFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7YUFDdkUsQ0FBQztpQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUN4QyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDdEYsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDOzs7WUE5RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLGdEQUFzRDtnQkFFdEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUFQaUMsVUFBVTtZQURuQyxnQkFBZ0I7WUFDb0MsU0FBUzs7O29DQVVuRSxLQUFLO3NDQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyLCBzdHlsZSwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIFJlbmRlcmVyMiwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21nbC10aW1lbGluZS1lbnRyeS1jb250ZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVsaW5lLWVudHJ5LWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW1lbGluZS1lbnRyeS1jb250ZW50LmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWdsVGltZWxpbmVFbnRyeUNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKVxuICBleHBhbmRBbmltYXRpb25UaW1pbmcgPSAnMjAwbXMgZWFzZSc7XG5cbiAgQElucHV0KClcbiAgY29sbGFwc2VBbmltYXRpb25UaW1pbmcgPSAnMTAwbXMgZWFzZSc7XG5cbiAgcHJpdmF0ZSBjb250ZW50SGVpZ2h0O1xuICBhbmltYXRpb25Eb25lID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzZXQgZXhwYW5kZWQoZXhwYW5kZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNvbnRlbnRIZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgY29uc3QgYW5pbWF0ZSA9IHRoaXMuX2V4cGFuZGVkICE9PSBleHBhbmRlZDtcbiAgICB0aGlzLl9leHBhbmRlZCA9IGV4cGFuZGVkO1xuICAgIGFuaW1hdGUgPyB0aGlzLmFuaW1hdGUoKSA6IHRoaXMuc2V0U3R5bGVcbiAgfVxuXG4gIGdldCBleHBhbmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlciwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50SGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgIHRoaXMuc2V0U3R5bGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29sbGFwc2VkU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogJzBweCdcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEV4cGFuZGVkU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogdGhpcy5jb250ZW50SGVpZ2h0ICsgJ3B4J1xuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGUoKSB7XG4gICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9uQnVpbGRlclxuICAgICAgICAuYnVpbGQoW1xuICAgICAgICAgIHN0eWxlKHRoaXMuZ2V0Q29sbGFwc2VkU3R5bGUoKSksXG4gICAgICAgICAgYW5pbWF0ZSh0aGlzLmV4cGFuZEFuaW1hdGlvblRpbWluZywgc3R5bGUodGhpcy5nZXRFeHBhbmRlZFN0eWxlKCkpKSxcbiAgICAgICAgXSlcbiAgICAgICAgLmNyZWF0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAgIGFuaW1hdGlvbi5vbkRvbmUoKCkgPT4gdGhpcy5hbmltYXRpb25Eb25lLmVtaXQoeyB0b1N0YXRlOiAnZXhwYW5kZWQnIH0pKTtcbiAgICAgIGFuaW1hdGlvbi5wbGF5KCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hbmltYXRpb25CdWlsZGVyXG4gICAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbkJ1aWxkZXJcbiAgICAgICAgLmJ1aWxkKFtcbiAgICAgICAgICBzdHlsZSh0aGlzLmdldEV4cGFuZGVkU3R5bGUoKSksXG4gICAgICAgICAgYW5pbWF0ZSh0aGlzLmNvbGxhcHNlQW5pbWF0aW9uVGltaW5nLCBzdHlsZSh0aGlzLmdldENvbGxhcHNlZFN0eWxlKCkpKSxcbiAgICAgICAgXSlcbiAgICAgICAgLmNyZWF0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAgIGFuaW1hdGlvbi5vbkRvbmUoKCkgPT4gdGhpcy5hbmltYXRpb25Eb25lLmVtaXQoeyB0b1N0YXRlOiAnY29sbGFwc2VkJyB9KSk7XG4gICAgICBhbmltYXRpb24ucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0eWxlKCkge1xuICAgIGNvbnN0IGJhc2VTdHlsZSA9IHRoaXMuZXhwYW5kZWQgPyB0aGlzLmdldEV4cGFuZGVkU3R5bGUoKSA6IHRoaXMuZ2V0Q29sbGFwc2VkU3R5bGUoKTtcbiAgICBPYmplY3Qua2V5cyhiYXNlU3R5bGUpLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgcHJvcGVydHksIGJhc2VTdHlsZVtwcm9wZXJ0eV0pXG4gICAgfSlcbiAgfVxuXG59XG4iXX0=