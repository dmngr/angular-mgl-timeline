import { ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MglTimelineEntryComponent } from './../timeline-entry/timeline-entry.component';
import { Component, Input, ContentChildren, HostListener } from '@angular/core';
export class MglTimelineComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3RpbWVsaW5lL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBdUMsWUFBWSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQVEzSSxNQUFNLE9BQU8sb0JBQW9CO0lBd0MvQixZQUFvQixVQUFzQixFQUFVLGlCQUFvQztRQUFwRSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXJDeEYsV0FBTSxHQUFZLElBQUksQ0FBQztRQUd2Qix5QkFBb0IsR0FBVyxHQUFHLENBQUM7UUFHbkMsY0FBUyxHQUFZLElBQUksQ0FBQztRQUcxQixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBV2QsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFZckIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBS2lELENBQUM7SUExQjdGLElBQUksTUFBTSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFh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O3VCQXdDekMsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5TGlzdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZ2xUaW1lbGluZUVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi8uLi90aW1lbGluZS1lbnRyeS90aW1lbGluZS1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ29udGVudENoaWxkcmVuLCBBZnRlclZpZXdJbml0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWdsLXRpbWVsaW5lJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVsaW5lLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZWxpbmUuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNZ2xUaW1lbGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKVxuICB0b2dnbGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIG1vYmlsZVdpZHRoVGhyZXNob2xkOiBudW1iZXIgPSA2NDA7XG5cbiAgQElucHV0KClcbiAgYWx0ZXJuYXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzaWRlOiBzdHJpbmcgPSAnbGVmdCc7XG5cbiAgc2V0IG1vYmlsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuY29udGVudCAmJiB0aGlzLmNvbnRlbnQuZm9yRWFjaChlbnRyeSA9PiBlbnRyeS5tb2JpbGUgPSB2YWx1ZSk7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbW9iaWxlJywgdmFsdWUpXG4gIH1cblxuICBnZXQgbW9iaWxlKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21vYmlsZScpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9jdXNPbk9wZW4gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZm9jdXNPbk9wZW4oZm9jdXNPbk9wZW4pIHtcbiAgICB0aGlzLmNvbnRlbnQgJiYgdGhpcy5jb250ZW50LmZvckVhY2goZW50cnkgPT4gZW50cnkuZm9jdXNPbk9wZW4gPSBmb2N1c09uT3Blbik7XG4gICAgdGhpcy5fZm9jdXNPbk9wZW4gPSBmb2N1c09uT3BlbjtcbiAgfVxuXG4gIGdldCBmb2N1c09uT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNPbk9wZW47XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNZ2xUaW1lbGluZUVudHJ5Q29tcG9uZW50KVxuICBwcml2YXRlIGNvbnRlbnQ6IFF1ZXJ5TGlzdDxNZ2xUaW1lbGluZUVudHJ5Q29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy51cGRhdGVDb250ZW50KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubW9iaWxlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGggPCB0aGlzLm1vYmlsZVdpZHRoVGhyZXNob2xkO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVDb250ZW50KCkpO1xuICAgIHRoaXMuY29udGVudC5jaGFuZ2VzLnN1YnNjcmliZShjaGFuZ2VzID0+IHtcbiAgICAgIHRoaXMudXBkYXRlQ29udGVudCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZW50KCkge1xuICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICB0aGlzLmNvbnRlbnQuZm9yRWFjaCgoZW50cnksIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZSkge1xuICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgZW50cnkuY2hhbmdlZC5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZmlsdGVyKGUgPT4gZSAhPT0gZW50cnkpLmZvckVhY2goZSA9PiBlLmNvbGxhcHNlKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZW50cnkuYWx0ZXJuYXRlID0gdGhpcy5hbHRlcm5hdGUgPyAoaW5kZXggJSAyICE9PSAwKSA6ICh0aGlzLnNpZGUgPT09ICdyaWdodCcpO1xuICAgICAgICBlbnRyeS5tb2JpbGUgPSB0aGlzLm1vYmlsZTtcbiAgICAgICAgZW50cnkuZm9jdXNPbk9wZW4gPSB0aGlzLmZvY3VzT25PcGVuO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIG9uUmVzaXplKGV2OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5tb2JpbGUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCA8IHRoaXMubW9iaWxlV2lkdGhUaHJlc2hvbGQ7XG4gIH1cbn1cbiJdfQ==