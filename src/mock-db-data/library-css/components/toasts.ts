import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const Toast: LibraryExample[] = [{
  title: 'Toast',
  exampleHtml: `
<div class="position-relative" style="border:2px solid #cfd0cb; background-color:#eee; height:500px;">
    <div class="toast-container top-0 end-0 p-3">

        <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Regular toast</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Dette er en kort og konsis driftsmelding eller endringsinformasjon.
            </div>
        </div>

        <div id="liveToast" class="toast text-bg-success-light show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Success!</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Message for successful action.
            </div>
        </div>

        <div id="liveToast" class="toast text-bg-danger-light show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Danger!</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Message about something dangerous.
            </div>
        </div>

        <div id="liveToast" class="toast text-bg-warning-light show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Warning!</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                This is a warning.
            </div>
        </div>
        
    </div>
</div>
`,
  exampleMarkdown: `
<div class="toast-container top-0 end-0 p-3">

    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">Regular toast</strong>
            <small>Just now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Dette er en kort og konsis driftsmelding eller endringsinformasjon.
        </div>
    </div>

</div>
`,
  category: categoryNames.tools
}];
