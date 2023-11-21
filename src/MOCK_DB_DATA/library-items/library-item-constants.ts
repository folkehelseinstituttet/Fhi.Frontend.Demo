const bootstrapVersion = '5.2';
const bootstrapDocBaseUrl = `https://getbootstrap.com/docs/${bootstrapVersion}`;
const npmBaseUrl = 'https://www.npmjs.com/package/@folkehelseinstituttet';
const githubBaseUrl = 'https://github.com/folkehelseinstituttet';
const githubFrontendDemoUrl = `${githubBaseUrl}/Fhi.Frontend.Demo/tree/dev`;

export class LibraryItemConstants {
  static BootstrapBaseUrl = bootstrapDocBaseUrl;
  static BootstrapComponentsBaseUrl = `${bootstrapDocBaseUrl}/components`;
  static BootstrapContentBaseUrl = `${bootstrapDocBaseUrl}/content`;
  static BootstrapFormsBaseUrl = `${bootstrapDocBaseUrl}/forms`;
  static BootstrapUtilitiesBaseUrl = `${bootstrapDocBaseUrl}/utilities`;

  static FhiAngularComponentsNpmUrl = `${npmBaseUrl}/angular-components`;
  static FhiAngularComponentsGithubUrl = `${githubFrontendDemoUrl}/projects/fhi-angular-components`;
  static FhiAngularComponentsGithubLibUrl = `${this.FhiAngularComponentsGithubUrl}/src/lib`;

  static FhiAngularHighchartsNpmUrl = `${npmBaseUrl}/angular-highcharts`;
  static FhiAngularHighchartsGithubUrl = `${githubFrontendDemoUrl}/projects/fhi-angular-highcharts`;
  static FhiAngularHighchartsGithubLibUrl = `${this.FhiAngularHighchartsGithubUrl}/src/lib`;

  static ExampleComponentsGithubUrl = `${githubFrontendDemoUrl}/src/app/views/shared/dynamic-library-examples/example-components`;

  static NgBootstrapComponentsBaseUrl = 'https://ng-bootstrap.github.io/#/components';

  static voidURL = 'javascript:void(0)';

  static languageLocaleId_NO = 'no';
}
