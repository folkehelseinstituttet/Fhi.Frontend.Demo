import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const Toast: LibraryExample[] = [{
  title: 'Toast',
  exampleHtml: `
<div class="position-relative" style="border:2px solid #cfd0cb; background-color:#fbfbfb; height:550px;">
    <div class="toast-container top-0 end-0 p-3">

        <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Generic toast</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Generic, short informational message.
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

    <!-- theme class might be added here [text-bg-success-light | text-bg-danger-light | text-bg-warning-light] -->
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">Generic toast</strong>
            <small>Just now</small>

            <!--  data-bs-dismiss="toast" if Bootstrap JS -->
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Generic, short informational message.
        </div>
    </div>

</div>
`,
documentationMarkdown: `
<p>The toast is using Bootstrap 5 markup. For functionality you can either include Bootstrap JS to your project or write your own. Remember to include the <abbr title="accessibility">a11y</abbr> principles.</p>

<p>Refer to Bootstrap documentation for details.<br>Google search: <a href="https://www.google.com/search?q=bootstrap+toasts+site%3Agetbootstrap.com">Bootstrap Toast</a></p>`
,
  category: categoryNames.tools
}];
