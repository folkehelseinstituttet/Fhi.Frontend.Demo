import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssComponentCategories;

export const Accordion: LibraryExample[] = [{
  title: 'Accordion',
  exampleHtml: `
<div class="accordion accordion-flush mb-6 pt-6" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1 (White accordion | .accordion-flush)
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p>This is the second item's accordion body.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p>This is the third item's accordion body.</p>
      </div>
    </div>
  </div>
</div>


<div class="accordion pt-6" id="accordionExample-2">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne-2">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne-2" aria-expanded="false" aria-controls="collapseOne">
        Accordion Item #1 (Blue accordion)
      </button>
    </h2>
    <div id="collapseOne-2" class="accordion-collapse collapse" aria-labelledby="headingOne-2">
      <div class="accordion-body">
        <p><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo-2">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo-2" aria-expanded="true" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo-2" class="accordion-collapse collapse show" aria-labelledby="headingTwo-2">
      <div class="accordion-body">
        <p>This is the second item's accordion body.</p>
        <p>This example is without the <code>data-bs-parent</code> attribute, allowing multiple accordion elements to be open simultaneously.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree-2">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree-2" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree-2" class="accordion-collapse collapse" aria-labelledby="headingThree-2">
      <div class="accordion-body">
        <p>This is the third item's accordion body.</p>
      </div>
    </div>
  </div>
</div>
`,
  exampleMarkdown: `
<!-- First example | .accordion-flush (white), remove .accordion-flush for blue -->

<div class="accordion accordion-flush" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p>This is the second item's accordion body.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p>This is the third item's accordion body.</p>
      </div>
    </div>
  </div>
</div>`,
  documentationMarkdown: `
<p>The accordion is using Bootstrap 5 markup. For functionality you can either include Bootstrap JS to your project or write your own. Remember to include the <abbr title="accessibility">a11y</abbr> principles.</p>

<p>If you decide to write your own functionality, you might concider changing the <code>data-bs-</code> prefixes to <code>data-fhi-</code></p>

<p>Google search: <a href="https://www.google.com/search?q=bootstrap+accordion+site%3Agetbootstrap.com">Bootstrap Accordion</a></p>`
  ,
  category: categoryNames.structuredContent
}];
