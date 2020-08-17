import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
export class MglTimelineEntrySideComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtZW50cnktc2lkZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdGltZWxpbmUvdGltZWxpbmUtZW50cnktc2lkZS90aW1lbGluZS1lbnRyeS1zaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFTLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVFoRixNQUFNLE9BQU8sNkJBQTZCO0lBVXhDLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBUi9DLElBQUksU0FBUyxDQUFDLEtBQUs7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLEtBQUs7UUFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMscUNBQW1EO2dCQUVuRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVAwQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXRpbWVsaW5lLWVudHJ5LXNpZGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUtZW50cnktc2lkZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RpbWVsaW5lLWVudHJ5LXNpZGUuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNZ2xUaW1lbGluZUVudHJ5U2lkZUNvbXBvbmVudCB7XG5cbiAgc2V0IGFsdGVybmF0ZSh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2FsdGVybmF0ZScsIHZhbHVlKTtcbiAgfVxuXG4gIHNldCBtb2JpbGUodmFsdWUpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtb2JpbGUnLCB2YWx1ZSk7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XG5cbn1cbiJdfQ==