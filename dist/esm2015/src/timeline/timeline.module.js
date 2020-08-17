import { MglTimelineEntryHeaderComponent } from './timeline-entry-header/timeline-entry-header.component';
import { MglTimelineEntryDotComponent } from './timeline-entry-dot/timeline-entry-dot.component';
import { MglTimelineEntryContentComponent } from './timeline-entry-content/timeline-entry-content.component';
import { MglTimelineEntrySideComponent } from './timeline-entry-side/timeline-entry-side.component';
import { MglTimelineEntryComponent } from './timeline-entry/timeline-entry.component';
import { MglTimelineComponent } from './timeline/timeline.component';
import { NgModule } from '@angular/core';
export class MglTimelineModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RpbWVsaW5lL3RpbWVsaW5lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBbUJ6QyxNQUFNLE9BQU8saUJBQWlCOzs7WUFsQjdCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osb0JBQW9CO29CQUNwQix5QkFBeUI7b0JBQ3pCLCtCQUErQjtvQkFDL0IsNkJBQTZCO29CQUM3QixnQ0FBZ0M7b0JBQ2hDLDRCQUE0QjtpQkFDN0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG9CQUFvQjtvQkFDcEIseUJBQXlCO29CQUN6QiwrQkFBK0I7b0JBQy9CLDZCQUE2QjtvQkFDN0IsZ0NBQWdDO29CQUNoQyw0QkFBNEI7aUJBQzdCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZ2xUaW1lbGluZUVudHJ5SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lbGluZS1lbnRyeS1oZWFkZXIvdGltZWxpbmUtZW50cnktaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZ2xUaW1lbGluZUVudHJ5RG90Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lbGluZS1lbnRyeS1kb3QvdGltZWxpbmUtZW50cnktZG90LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZ2xUaW1lbGluZUVudHJ5Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vdGltZWxpbmUtZW50cnktY29udGVudC90aW1lbGluZS1lbnRyeS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZ2xUaW1lbGluZUVudHJ5U2lkZUNvbXBvbmVudCB9IGZyb20gJy4vdGltZWxpbmUtZW50cnktc2lkZS90aW1lbGluZS1lbnRyeS1zaWRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZ2xUaW1lbGluZUVudHJ5Q29tcG9uZW50IH0gZnJvbSAnLi90aW1lbGluZS1lbnRyeS90aW1lbGluZS1lbnRyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWdsVGltZWxpbmVDb21wb25lbnQgfSBmcm9tICcuL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWdsVGltZWxpbmVDb21wb25lbnQsXG4gICAgTWdsVGltZWxpbmVFbnRyeUNvbXBvbmVudCxcbiAgICBNZ2xUaW1lbGluZUVudHJ5SGVhZGVyQ29tcG9uZW50LFxuICAgIE1nbFRpbWVsaW5lRW50cnlTaWRlQ29tcG9uZW50LFxuICAgIE1nbFRpbWVsaW5lRW50cnlDb250ZW50Q29tcG9uZW50LFxuICAgIE1nbFRpbWVsaW5lRW50cnlEb3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1nbFRpbWVsaW5lQ29tcG9uZW50LFxuICAgIE1nbFRpbWVsaW5lRW50cnlDb21wb25lbnQsXG4gICAgTWdsVGltZWxpbmVFbnRyeUhlYWRlckNvbXBvbmVudCxcbiAgICBNZ2xUaW1lbGluZUVudHJ5U2lkZUNvbXBvbmVudCxcbiAgICBNZ2xUaW1lbGluZUVudHJ5Q29udGVudENvbXBvbmVudCxcbiAgICBNZ2xUaW1lbGluZUVudHJ5RG90Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWdsVGltZWxpbmVNb2R1bGUgeyB9XG4iXX0=