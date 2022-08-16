import { LibraryItem } from 'src/app/shared/models/library-example.model';

const colorHtml = (hex: string, color: string) => {
  return `
<div class="ds-color-palette d-flex flex-row">
  <div class="ds-color-palette__color ds-color-palette__color--${color}"></div>
  <div class="ds-color-palette__code ms-4 p-2">
    ${hex}
  </div>
  <div class="ds-color-palette__code ms-4 p-2 d-none d-lg-block">
    $${color}
  </div>
</div>`;
};

export const FhiColors: LibraryItem[] = [{
  title: 'Color palette',
  exampleHtml: `
<p class="text-muted small mt-2 mb-0">Light grey</p>
${colorHtml('#fbfbfb', 'fhi-grey-light-1')}
${colorHtml('#f7f6f5', 'fhi-grey-light-2')}
${colorHtml('#f0edeb', 'fhi-grey-light-3')}
${colorHtml('#e0dddb', 'fhi-grey-light-4')}

<p class="text-muted small mt-2 mb-0">Grey</p>
${colorHtml('#cfd0cb', 'fhi-grey-1')}
${colorHtml('#9f9f9f', 'fhi-grey-2')}
${colorHtml('#767676', 'fhi-grey-3')}
${colorHtml('#222222', 'fhi-grey-4')}

<p class="text-muted small mt-2 mb-0">Charcoal/Anthracite</p>
${colorHtml('#333841', 'fhi-charcoal-1')}

<p class="text-muted small mt-2 mb-0">Blue/Grey</p>
${colorHtml('#f5f8fb', 'fhi-blue-grey-1')}
${colorHtml('#dbe6ec', 'fhi-blue-grey-2')}
${colorHtml('#cbd9df', 'fhi-blue-grey-3')}
${colorHtml('#afc0c7', 'fhi-blue-grey-4')}
${colorHtml('#879ba5', 'fhi-blue-grey-5')}
${colorHtml('#435c68', 'fhi-blue-grey-6')}

<p class="text-muted small mt-2 mb-0">Light blue</p>
${colorHtml('#65adc3', 'fhi-blue-light-1')}
${colorHtml('#057e9a', 'fhi-blue-light-2')}

<p class="text-muted small mt-2 mb-0">Blue</p>
${colorHtml('#386e84', 'fhi-blue-1')}

<p class="text-muted small mt-2 mb-0">Dark blue</p>
${colorHtml('#393c61', 'fhi-blue-dark-1')}
${colorHtml('#2e3152', 'fhi-blue-dark-2')}
${colorHtml('#181B40', 'fhi-blue-dark-3')}

<p class="text-muted small mt-2 mb-0">Green</p>
${colorHtml('#cceee4', 'fhi-green-1')}
${colorHtml('#04ab79', 'fhi-green-2')}

<p class="text-muted small mt-2 mb-0">Yellow</p>
${colorHtml('#fffcce', 'fhi-yellow-1')}

<p class="text-muted small mt-2 mb-0">Orange</p>
${colorHtml('#feeed9', 'fhi-orange-1')}
${colorHtml('#f7b665', 'fhi-orange-2')}

<p class="text-muted small mt-2 mb-0">Red</p>
${colorHtml('#fd7065', 'fhi-red-1')}
${colorHtml('#d14641', 'fhi-red-2')}
${colorHtml('#9f2b26', 'fhi-red-3')}

<p class="text-muted small mt-2 mb-0">Dark pink</p>
${colorHtml('#ff859d', 'fhi-pink-dark-1')}
${colorHtml('#e22867', 'fhi-pink-dark-2')}
${colorHtml('#b10640', 'fhi-pink-dark-3')}

<p class="text-muted small mt-2 mb-0">Light pink</p>
${colorHtml('#fdf7f6', 'fhi-pink-light-1')}
${colorHtml('#faedec', 'fhi-pink-light-2')}
${colorHtml('#ffe3e2', 'fhi-pink-light-3')}`,
  codeHtml: `
<!-- NA -->`
}];
