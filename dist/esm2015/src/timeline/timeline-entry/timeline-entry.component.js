import { HostBinding, ViewEncapsulation } from '@angular/core';
import { MglTimelineEntrySideComponent } from './../timeline-entry-side/timeline-entry-side.component';
import { MglTimelineEntryDotComponent } from './../timeline-entry-dot/timeline-entry-dot.component';
import { Component, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { MglTimelineEntryContentComponent } from '../timeline-entry-content/timeline-entry-content.component';
import { MglTimelineEntryHeaderComponent } from '../timeline-entry-header/timeline-entry-header.component';
export class MglTimelineEntryComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtZW50cnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3RpbWVsaW5lL3RpbWVsaW5lLWVudHJ5L3RpbWVsaW5lLWVudHJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBRXZHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3BHLE9BQU8sRUFDTCxTQUFTLEVBQWlCLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFhLFVBQVUsRUFDcEYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDOUcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFRM0csTUFBTSxPQUFPLHlCQUF5QjtJQTJDcEMsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXpDbEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBRTNDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBZ0JyQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBYWpDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBR3RDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQU9HLENBQUM7SUFyQy9DLElBQUksUUFBUSxDQUFDLFFBQVE7UUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDOUI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtTQUNqQztR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TSxDQUFDLEtBQWlCO1FBQ3RCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFDNUUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUN0RSxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRU8sY0FBYyxDQUFDLFVBQXNCLEVBQUUsSUFBWTtRQUN6RCxJQUFJLFdBQVcsR0FBWSxVQUFVLENBQUMsTUFBaUIsQ0FBQztRQUN4RCxPQUFPLFdBQVcsRUFBRTtZQUNsQixJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUNsQyxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7U0FDekM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OztZQW5IRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsd1pBQThDO2dCQUU5QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVYwRSxVQUFVOzs7dUJBMEJsRixXQUFXLFNBQUMsZ0JBQWdCO3NCQWlCNUIsTUFBTSxTQUFDLFFBQVE7NEJBR2YsTUFBTTtzQkFHTixZQUFZLFNBQUMsZ0NBQWdDO3FCQUM3QyxZQUFZLFNBQUMsK0JBQStCO2tCQUM1QyxZQUFZLFNBQUMsNEJBQTRCO21CQUN6QyxZQUFZLFNBQUMsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIb3N0QmluZGluZywgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWdsVGltZWxpbmVFbnRyeVNpZGVDb21wb25lbnQgfSBmcm9tICcuLy4uL3RpbWVsaW5lLWVudHJ5LXNpZGUvdGltZWxpbmUtZW50cnktc2lkZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgTWdsVGltZWxpbmVFbnRyeURvdENvbXBvbmVudCB9IGZyb20gJy4vLi4vdGltZWxpbmUtZW50cnktZG90L3RpbWVsaW5lLWVudHJ5LWRvdC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkLCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZ2xUaW1lbGluZUVudHJ5Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4uL3RpbWVsaW5lLWVudHJ5LWNvbnRlbnQvdGltZWxpbmUtZW50cnktY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWdsVGltZWxpbmVFbnRyeUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4uL3RpbWVsaW5lLWVudHJ5LWhlYWRlci90aW1lbGluZS1lbnRyeS1oZWFkZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXRpbWVsaW5lLWVudHJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVsaW5lLWVudHJ5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZWxpbmUtZW50cnkuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNZ2xUaW1lbGluZUVudHJ5Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgZm9jdXNPbk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzZXQgZXhwYW5kZWQoZXhwYW5kZWQpIHtcbiAgICBpZiAodGhpcy5kb3QgJiYgZXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuZG90LmV4cGFuZGVkID0gZXhwYW5kZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGVudC5leHBhbmRlZCA9IGV4cGFuZGVkXG4gICAgfVxuICAgIHRoaXMuY2hhbmdlZC5lbWl0KGV4cGFuZGVkKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZXhwYW5kZWQnKVxuICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZG90ID8gKHRoaXMuZG90LmV4cGFuZGVkICYmIHRoaXMuY29udGVudC5leHBhbmRlZCkgOiB0aGlzLmNvbnRlbnQuZXhwYW5kZWQ7XG4gIH1cblxuICBwcml2YXRlIF9tb2JpbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzZXQgbW9iaWxlKHZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbW9iaWxlJywgdmFsdWUpO1xuICAgIGlmICh0aGlzLmRvdCkge1xuICAgICAgdGhpcy5kb3QubW9iaWxlID0gdmFsdWU7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpZGUpIHtcbiAgICAgIHRoaXMuc2lkZS5tb2JpbGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdleHBhbmQnKVxuICBjaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBPdXRwdXQoKVxuICBhbmltYXRpb25Eb25lID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChNZ2xUaW1lbGluZUVudHJ5Q29udGVudENvbXBvbmVudCkgY29udGVudDogTWdsVGltZWxpbmVFbnRyeUNvbnRlbnRDb21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGQoTWdsVGltZWxpbmVFbnRyeUhlYWRlckNvbXBvbmVudCkgaGVhZGVyOiBNZ2xUaW1lbGluZUVudHJ5SGVhZGVyQ29tcG9uZW50O1xuICBAQ29udGVudENoaWxkKE1nbFRpbWVsaW5lRW50cnlEb3RDb21wb25lbnQpIGRvdDogTWdsVGltZWxpbmVFbnRyeURvdENvbXBvbmVudDtcbiAgQENvbnRlbnRDaGlsZChNZ2xUaW1lbGluZUVudHJ5U2lkZUNvbXBvbmVudCkgc2lkZTogTWdsVGltZWxpbmVFbnRyeVNpZGVDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuZG90KSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmRvdC5hbmltYXRpb25Eb25lLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnZXhwYW5kZWQnKSB7XG4gICAgICAgICAgdGhpcy5jb250ZW50LmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRvbmUuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5jb250ZW50LmFuaW1hdGlvbkRvbmUuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZG90ICYmIGV2ZW50LnRvU3RhdGUgPT09ICdjb2xsYXBzZWQnKSB7XG4gICAgICAgICAgdGhpcy5kb3QuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5mb2N1c09uT3Blbikge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRG9uZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIHNldCBhbHRlcm5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdhbHRlcm5hdGUnLCB2YWx1ZSk7XG4gICAgaWYgKHRoaXMuZG90KSB7XG4gICAgICB0aGlzLmRvdC5hbHRlcm5hdGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2lkZSkge1xuICAgICAgdGhpcy5zaWRlLmFsdGVybmF0ZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gIH1cblxuXG4gIHRvZ2dsZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGNvbnN0IGhlYWRlckZvdW5kID0gdGhpcy5jb250YWluc0luUGF0aChldmVudCwgJ21nbC10aW1lbGluZS1lbnRyeS1oZWFkZXInKTtcbiAgICBjb25zdCBkb3RGb3VuZCA9IHRoaXMuY29udGFpbnNJblBhdGgoZXZlbnQsICdtZ2wtdGltZWxpbmUtZW50cnktZG90Jyk7XG4gICAgaWYgKGhlYWRlckZvdW5kIHx8IGRvdEZvdW5kKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb250YWluc0luUGF0aChtb3VzZUV2ZW50OiBNb3VzZUV2ZW50LCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgY3VycmVudEVsZW06IEVsZW1lbnQgPSBtb3VzZUV2ZW50LnRhcmdldCBhcyBFbGVtZW50O1xuICAgIHdoaWxlIChjdXJyZW50RWxlbSkge1xuICAgICAgaWYgKGN1cnJlbnRFbGVtLmxvY2FsTmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRFbGVtID0gY3VycmVudEVsZW0ucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=