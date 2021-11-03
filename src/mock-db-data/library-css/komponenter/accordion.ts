import { LibraryExample } from 'src/app/shared/models/library-example.model';
import { LibraryMenuLevel2Categories } from 'src/app/_felles/konstanter/library-menu-level-2-categories';

const categoryNames = LibraryMenuLevel2Categories.cssKomponentCategories;

export const Accordion: LibraryExample[] = [{
  title: 'Accordion',
  exampleHtml: `
<div class="accordion mb-6" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-fhi-parent="#accordionExample">
      <div class="accordion-body">
        <p><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-fhi-parent="#accordionExample">
      <div class="accordion-body">
        <p>This is the second item's accordion body.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-fhi-parent="#accordionExample">
      <div class="accordion-body">
        <p>This is the third item's accordion body.</p>
      </div>
    </div>
  </div>
</div>


<div class="accordion accordion-boxed" id="accordionExample-2">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne-2">
      <button class="accordion-button" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseOne-2" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne-2" class="accordion-collapse collapse show" aria-labelledby="headingOne-2" data-fhi-parent="#accordionExample-2">
      <div class="accordion-body">
        <p><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo-2">
      <button class="accordion-button collapsed" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseTwo-2" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo-2" class="accordion-collapse collapse" aria-labelledby="headingTwo-2" data-fhi-parent="#accordionExample-2">
      <div class="accordion-body">
        <p>This is the second item's accordion body.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThr-2ee">
      <button class="accordion-button collapsed" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseThree-2" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree-2" class="accordion-collapse collapse" aria-labelledby="headingThr-2ee" data-fhi-parent="#accordionExample-2">
      <div class="accordion-body">
        <p>This is the third item's accordion body.</p>
      </div>
    </div>
  </div>
</div>
`,
  exampleMarkdown: `
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-fhi-parent="#accordionExample">
      <div class="accordion-body">
        <p><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-fhi-parent="#accordionExample">
      <div class="accordion-body">
        <p>This is the second item's accordion body.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-fhi-parent="#accordionExample">
      <div class="accordion-body">
        <p>This is the third item's accordion body.</p>
      </div>
    </div>
  </div>
</div>

<!-- alternative: add .accordion-boxed -->
<div class="accordion accordion-boxed" id="accordionExample-2">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne-2">
      <button class="accordion-button" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseOne-2" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne-2" class="accordion-collapse collapse show" aria-labelledby="headingOne-2" data-fhi-parent="#accordionExample-2">
      <div class="accordion-body">
        <p><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo-2">
      <button class="accordion-button collapsed" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseTwo-2" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo-2" class="accordion-collapse collapse" aria-labelledby="headingTwo-2" data-fhi-parent="#accordionExample-2">
      <div class="accordion-body">
        <p>This is the second item's accordion body.</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThr-2ee">
      <button class="accordion-button collapsed" type="button" data-fhi-toggle="collapse" data-fhi-target="#collapseThree-2" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree-2" class="accordion-collapse collapse" aria-labelledby="headingThr-2ee" data-fhi-parent="#accordionExample-2">
      <div class="accordion-body">
        <p>This is the third item's accordion body.</p>
      </div>
    </div>
  </div>
</div>`,
  category: categoryNames.structuredContent
}];
