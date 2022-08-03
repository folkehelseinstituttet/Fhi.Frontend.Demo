import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const Toast: LibraryExample[] = [{
  title: 'Toast',
  exampleHtml: `
<div class="position-relative" style="border:2px solid #cfd0cb; background-color:#eee; height:250px;">
    <div class="toast-container top-0 end-0 p-3">

        <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Bootstrap</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Hello, world! This is a toast message.
            </div>
        </div>

        <div id="liveToast" class="toast text-bg-success show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Bootstrap</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Hello, world! This is a toast message.
            </div>
        </div>

    </div>
    <div class="toast-container top-0 start-0 p-3">

        <div id="liveToast" class="toast text-bg-danger show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Bootstrap</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Hello, world! This is a toast message.
            </div>
        </div>

        <div id="liveToast" class="toast text-bg-warning show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Bootstrap</strong>
                <small>Just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Hello, world! This is a toast message.
            </div>
        </div>
        
    </div>
</div>
`,
  exampleMarkdown: `
<div class="toast-container top-0 end-0 p-3">

    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Hello, world! This is a toast message.
        </div>
    </div>

</div>
`,
  category: categoryNames.tools
}];
